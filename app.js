/* ============================================================
   TRAJECTORY — App logic
   ============================================================ */

const DB_KEY = "trajectoryDB_v3";
const HISTORY_KEY = "trajectoryDB_history_v1";
const DB_VERSION = 3;

const DEFAULT_DB = window.DEFAULT_DB || {
  profile: { name: "", startDate: "", createdAt: "" },
  settings: { theme: "lavender", college: "hitk" },
  schedule: { currentIndex: 0, offsetDays: 0, weekStatus: {}, weekTaskDone: {} },
  academics: { subjects: [] },
  projects: { shipped: {}, started: {}, meta: {}, custom: [] },
  progress: { dsaSolved: 0 },
  prep: { done: {} },
  timeSync: { offsetMs: 0, lastSynced: null, verified: false },
  tracking: { dailyLogs: {}, historicalPerformance: [] },
  github: { username: "", profile: null, repos: [], events: [], lastSyncedAt: null },
  leetcode: { username: "", profile: null, lastSyncedAt: null }
};

let DB = null;
let WEEKS = [];
let MONTHS = [];
let projectsFilter = "all";
let activeTrackingViewport = "month";
let selectedTrackingMonthIndex = null;
let selectedTrackingWeekIndex = null;
let onboardCollege = "hitk";

/* ---------------- storage ---------------- */
function clone(obj){ return JSON.parse(JSON.stringify(obj)); }

/* ---------------- in-app feedback ---------------- */
let noticeTimer = null;
function showNotice(message, type="info"){
  const notice = document.getElementById("appNotice");
  if(!notice) return;
  notice.textContent = message;
  notice.className = `app-notice${type === "error" ? " is-error" : type === "success" ? " is-success" : ""}`;
  notice.hidden = false;
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(()=>notice.hidden = true, 4200);
}
function openDialog({ eyebrow="TRAJECTORY", title, copy="", fields=[], confirmLabel="Continue", danger=false, onConfirm }){
  const dialog = document.getElementById("appDialog");
  const fieldsHost = document.getElementById("appDialogFields");
  const confirm = document.getElementById("appDialogConfirm");
  const cancel = document.getElementById("appDialogCancel");
  document.getElementById("appDialogEyebrow").textContent = eyebrow;
  document.getElementById("appDialogTitle").textContent = title;
  document.getElementById("appDialogCopy").textContent = copy;
  fieldsHost.innerHTML = fields.map(field=>`<label class="field-label" for="dialog-${field.id}">${field.label}<${field.multiline ? "textarea" : "input"} class="field-input" id="dialog-${field.id}" ${field.multiline ? "" : `type="${field.type || "text"}"`} placeholder="${field.placeholder || ""}">${field.multiline ? field.value || "" : ""}</${field.multiline ? "textarea" : "input"}>`).join("");
  fields.forEach(field=>{ const input = document.getElementById(`dialog-${field.id}`); if(input && !field.multiline) input.value = field.value || ""; });
  confirm.textContent = confirmLabel;
  confirm.classList.toggle("btn-danger", danger);
  confirm.classList.toggle("btn-primary", !danger);
  dialog.hidden = false;
  const close = ()=>{ dialog.hidden = true; confirm.onclick = null; cancel.onclick = null; };
  cancel.onclick = close;
  confirm.onclick = ()=>{
    const values = Object.fromEntries(fields.map(field=>[field.id, document.getElementById(`dialog-${field.id}`).value]));
    const keepOpen = onConfirm && onConfirm(values);
    if(keepOpen !== false) close();
  };
  const firstInput = fieldsHost.querySelector("input, textarea");
  (firstInput || confirm).focus();
}

function loadDB(){
  try{
    const raw = localStorage.getItem(DB_KEY);
    if(!raw){
      // migrate earlier local-only databases without losing the existing profile
      const oldRaw = localStorage.getItem("trajectoryDB_v2") || localStorage.getItem("trajectoryDB_v1");
      if(oldRaw){ try{ const old = JSON.parse(oldRaw); return Object.assign(clone(DEFAULT_DB), old); }catch(e){} }
      return clone(DEFAULT_DB);
    }
    const parsed = JSON.parse(raw);
    return Object.assign(clone(DEFAULT_DB), parsed, {
      profile: Object.assign({}, DEFAULT_DB.profile, parsed.profile),
      settings: Object.assign({}, DEFAULT_DB.settings, parsed.settings),
      schedule: Object.assign(clone(DEFAULT_DB.schedule), parsed.schedule),
      academics: Object.assign(clone(DEFAULT_DB.academics), parsed.academics),
      projects: Object.assign(clone(DEFAULT_DB.projects), parsed.projects),
      progress: Object.assign(clone(DEFAULT_DB.progress), parsed.progress),
      prep: Object.assign(clone(DEFAULT_DB.prep), parsed.prep),
      timeSync: Object.assign(clone(DEFAULT_DB.timeSync), parsed.timeSync),
      tracking: Object.assign(clone(DEFAULT_DB.tracking), parsed.tracking),
      github: Object.assign(clone(DEFAULT_DB.github), parsed.github),
      leetcode: Object.assign(clone(DEFAULT_DB.leetcode), parsed.leetcode),
      resume: Object.assign(clone(DEFAULT_DB.resume), parsed.resume)
    });
  }catch(e){ console.warn("DB load failed, using defaults", e); return clone(DEFAULT_DB); }
}
function getHistory(){
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]"); } catch(e) { return []; }
}
function saveDB(reason){
  try{
    DB.schemaVersion = DB_VERSION;
    DB.updatedAt = new Date().toISOString();
    localStorage.setItem(DB_KEY, JSON.stringify(DB));
    const history = getHistory();
    const latest = history[0] && history[0].data;
    const comparable = clone(DB); delete comparable.updatedAt;
    const previous = latest ? clone(latest) : null;
    if(previous) delete previous.updatedAt;
    if(!previous || JSON.stringify(comparable) !== JSON.stringify(previous)){
      const snapshot = { id: uid() + Date.now().toString(36), at: DB.updatedAt, reason: reason || "Update", data: clone(DB) };
      history.unshift(snapshot);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 40)));
    }
  }catch(e){ console.warn("save failed", e); }
}

/* ---------------- data flattening ---------------- */
function buildScheduleData(){
  const weeks = [], months = [];
  const weekBlueprints = Array.isArray(CURRICULUM.weeks) ? CURRICULUM.weeks : [];
  CURRICULUM.years.forEach(year=>{
    year.months.forEach((month, mi)=>{
      const monthGlobalIndex = months.length;
      months.push({
        globalIndex: monthGlobalIndex, yearId: year.id, yearLabel: year.label,
        monthIndexInYear: mi, name: month.name, project: month.project,
        desc: month.desc || "", stack: month.stack || [], dsa: month.dsa
      });
      const dsaPerWeek = Math.max(1, Math.round(month.dsa / 4));
      for(let w=0; w<4; w++){
        const weekIndex = weeks.length;
        const blueprint = weekBlueprints[weekIndex] || null;
        const focusText = month.focus[w] || month.focus[month.focus.length-1] || "Consolidate & review";
        const skillTasks = Array.isArray(blueprint?.skill?.tasks) && blueprint.skill.tasks.length
          ? blueprint.skill.tasks
          : [focusText, `Solve ${dsaPerWeek} DSA problems`];
        const academicTasks = Array.isArray(blueprint?.academic?.tasks) && blueprint.academic.tasks.length
          ? blueprint.academic.tasks
          : [`Review ${month.name} concepts`, "Capture one concise summary for later revision"];
        const projectTasks = Array.isArray(blueprint?.project?.tasks) && blueprint.project.tasks.length
          ? blueprint.project.tasks
          : [`Advance ${month.project || "the milestone"}`, "Log a concrete deliverable before the next week"];
        const tasks = [
          ...skillTasks.map((text, ti)=>({ id:`s${ti}`, text })),
          ...academicTasks.map((text, ti)=>({ id:`a${ti}`, text })),
          ...projectTasks.map((text, ti)=>({ id:`p${ti}`, text }))
        ];
        weeks.push({
          index: weekIndex, yearId: year.id, yearLabel: year.label,
          monthGlobalIndex, monthName: month.name, weekInMonth: w+1, project: month.project,
          skill: blueprint?.skill || { title: "Skill sprint", tasks: skillTasks },
          academic: blueprint?.academic || { title: "Academic focus", tasks: academicTasks },
          project: blueprint?.project || { title: "Project push", tasks: projectTasks },
          tasks: tasks.map((t,ti)=>({ id:`t${ti}`, text: t.text }))
        });
      }
    });
  });
  return { weeks, months };
}

/* ---------------- date helpers ---------------- */
function nowDate(){ return new Date(Date.now() + (DB && DB.timeSync ? DB.timeSync.offsetMs||0 : 0)); }
function todayMidnight(){ const d=nowDate(); d.setHours(0,0,0,0); return d; }
function parseDate(s){ if(!s) return null; const d=new Date(s+"T00:00:00"); return isNaN(d) ? null : d; }
function addDays(date, days){ const d=new Date(date); d.setDate(d.getDate()+days); return d; }
function diffDays(a,b){ return Math.round((a - b) / 86400000); }
function fmtShort(d){ return d.toLocaleDateString(undefined,{ month:"short", day:"numeric" }); }
function fmtLong(d){ return d.toLocaleDateString(undefined,{ weekday:"long", month:"long", day:"numeric", year:"numeric" }); }
function uid(){ return Math.random().toString(36).slice(2,9); }
function getWeekKey(d){ const onejan=new Date(d.getFullYear(),0,1); const wk=Math.ceil((((d-onejan)/86400000)+onejan.getDay()+1)/7); return `${d.getFullYear()}-W${wk}`; }

function weekDueDate(idx){
  const start = parseDate(DB.profile.startDate);
  if(!start) return null;
  return addDays(start, idx*7 + DB.schedule.offsetDays);
}

/* ---------------- live time authentication ---------------- */
async function syncTime(){
  const label = document.getElementById("clockSyncLabel");
  const syncEl = document.getElementById("clockSync");
  try{
    const controller = new AbortController();
    const t = setTimeout(()=>controller.abort(), 4000);
    const res = await fetch("https://worldtimeapi.org/api/timezone/Etc/UTC", { signal: controller.signal });
    clearTimeout(t);
    if(!res.ok) throw new Error("bad response");
    const data = await res.json();
    const serverNow = new Date(data.utc_datetime).getTime();
    DB.timeSync = { offsetMs: serverNow - Date.now(), lastSynced: Date.now(), verified: true };
  }catch(e){
    DB.timeSync = { offsetMs: DB.timeSync.offsetMs||0, lastSynced: DB.timeSync.lastSynced||null, verified: false };
  }
  saveDB();
  if(syncEl){
    syncEl.classList.toggle("verified", DB.timeSync.verified);
    syncEl.classList.toggle("unverified", !DB.timeSync.verified);
  }
  if(label) label.textContent = DB.timeSync.verified ? "LIVE · VERIFIED" : "LOCAL CLOCK";
  runAutoUpdate();
  renderAll();
}

function tickClock(){
  const d = nowDate();
  const timeEl = document.getElementById("clockTime");
  const dateEl = document.getElementById("clockDate");
  if(timeEl) timeEl.textContent = d.toLocaleTimeString(undefined, { hour12:false });
  if(dateEl) dateEl.textContent = d.toLocaleDateString(undefined, { weekday:"short", month:"short", day:"numeric", year:"numeric" });
}

/* ---------------- scheduling engine ---------------- */
function calculateCurrentTimeline(){
  const start = parseDate(DB.profile.startDate);
  const today = todayMidnight();
  if(!start){
    return { currentWeekIndex: 0, currentMonthIndex: 0, elapsedDays: 0, isFuture: true, today };
  }
  const elapsedDays = Math.max(0, diffDays(today, start));
  const currentWeekIndex = Math.min(Math.max(0, Math.floor(elapsedDays / 7)), Math.max(0, WEEKS.length - 1));
  const currentMonthIndex = Math.min(Math.max(0, Math.floor(currentWeekIndex / 4)), Math.max(0, MONTHS.length - 1));
  return { currentWeekIndex, currentMonthIndex, elapsedDays, isFuture: start > today, today };
}

function runAutoUpdate(){
  if(!DB || !WEEKS.length) return;
  const timeline = calculateCurrentTimeline();
  if(!DB.profile.startDate || timeline.isFuture){
    DB.schedule.currentIndex = 0;
    saveDB();
    return;
  }
  DB.schedule.currentIndex = timeline.currentWeekIndex;
  saveDB();
}

function completeCurrentWeek(){
  const idx = calculateCurrentTimeline().currentWeekIndex;
  if(idx >= WEEKS.length) return;
  DB.schedule.weekStatus[idx] = "done";
  DB.schedule.currentIndex = Math.min(idx + 1, WEEKS.length - 1);
  saveDB(); renderAll();
}
function missCurrentWeek(){
  const idx = calculateCurrentTimeline().currentWeekIndex;
  if(idx >= WEEKS.length) return;
  DB.schedule.weekStatus[idx] = "missed";
  DB.schedule.currentIndex = Math.min(idx + 1, WEEKS.length - 1);
  saveDB(); renderAll();
}
function toggleTask(weekIdx, taskId){
  if(weekIdx > calculateCurrentTimeline().currentWeekIndex) return;
  const key = String(weekIdx);
  if(!DB.schedule.weekTaskDone[key]) DB.schedule.weekTaskDone[key] = [];
  const arr = DB.schedule.weekTaskDone[key];
  const pos = arr.indexOf(taskId);
  if(pos>-1) arr.splice(pos,1); else arr.push(taskId);
  saveDB();
}

function currentMonthGlobalIndex(){
  const timeline = calculateCurrentTimeline();
  if(timeline.isFuture) return -1;
  return timeline.currentMonthIndex;
}
function currentSemesterIndex(){
  const mg = currentMonthGlobalIndex();
  if(mg < 0) return 0;
  return Math.min(Math.floor(mg/6), SYLLABUS.length-1);
}

function setTrackingViewport(view){
  activeTrackingViewport = view;
  document.querySelectorAll(".viewport-pane").forEach(panel=>panel.classList.toggle("active", panel.id === `viewport-${view}`));
  document.querySelectorAll(".crumb").forEach(btn=>btn.classList.toggle("active", btn.dataset.viewport === view));
}

function switchTrackingView(targetScope){
  if(!["month","week","day"].includes(targetScope)) return;
  activeTrackingViewport = targetScope;
  setTrackingViewport(targetScope);
  if(targetScope === "month") renderMonthHeatmap();
  else renderTrackingDashboard();
}

function getMonthPerformanceRatio(monthIndex) {
  // 1. Check if a frozen historical score already exists
  const history = Array.isArray(DB.tracking?.historicalPerformance) ? DB.tracking.historicalPerformance : [];
  const entry = history.find(item => String(item.monthIndex) === String(monthIndex));
  if (entry && entry.value !== undefined) {
    return Math.max(0, Math.min(1, Number(entry.value)));
  }

  // --- ADVANCED TRAJECTORY ALGORITHM ---
  // Internal difficulty grading weights
  const WEIGHTS = { project: 3.0, skill: 2.0, academic: 1.5, base: 1.0 };
  
  let earned = 0;
  let possible = 0;
  const baseWeek = monthIndex * 4;

  for (let w = 0; w < 4; w++) {
    const weekIdx = baseWeek + w;
    const weekData = WEEKS[weekIdx];
    if (!weekData) continue;

    // Phase A: Grade Weekly Plan Tasks
    const doneTasks = DB.schedule.weekTaskDone[String(weekIdx)] || [];
    weekData.tasks.forEach(task => {
      // Dynamically infer difficulty based on task vocabulary
      let weight = WEIGHTS.base;
      if (/project|milestone|ship|deploy|build/i.test(task.text)) weight = WEIGHTS.project;
      else if (/dsa|solve|code|algorithm/i.test(task.text)) weight = WEIGHTS.skill;
      else if (/review|summary|concept|study/i.test(task.text)) weight = WEIGHTS.academic;

      possible += weight;
      if (doneTasks.includes(task.id)) earned += weight;
    });

    // Phase B: Grade Daily Logs (Day-wise Micro-Pulse)
    const weekDate = weekDueDate(weekIdx);
    if (weekDate) {
      for (let d = 0; d < 7; d++) {
        const dayKey = getWeekKey(addDays(weekDate, d));
        const dayLogs = DB.tracking?.dailyLogs?.[dayKey] || {};
        
        Object.entries(dayLogs).forEach(([taskId, isDone]) => {
          let weight = WEIGHTS.base;
          // Exploit structured prefixes from daily tracking
          if (taskId.startsWith("project:")) weight = WEIGHTS.project;
          else if (taskId.startsWith("skill:")) weight = WEIGHTS.skill;
          else if (taskId.startsWith("academic:")) weight = WEIGHTS.academic;
          
          // Daily tasks act as fractional micro-increments to create day-to-day graph movement
          const dailyPulseWeight = weight * 0.15;
          possible += dailyPulseWeight;
          if (isDone) earned += dailyPulseWeight;
        });
      }
    }
    
    // Phase C: Fallback to high-level week status if no granular tasks are scheduled
    if (possible === 0) {
      const status = DB.schedule.weekStatus[weekIdx];
      possible += 1;
      if (status === "done") earned += 1;
      else if (status === "partial") earned += 0.5;
    }
  }

  // Calculate the final rolling percentage
  return possible === 0 ? 0 : Math.max(0, Math.min(1, earned / possible));
}

function renderMonthHeatmap(){
  const monthGrid = document.getElementById("monthHeatmapGrid");
  const monthSelect = document.getElementById("monthPickerSelect");
  const monthPrev = document.getElementById("monthPrevBtn");
  const monthNext = document.getElementById("monthNextBtn");
  const monthCurrent = document.getElementById("monthCurrentBtn");
  if(!monthGrid) return;
  const timeline = calculateCurrentTimeline();
  const selectedMonthIndex = selectedTrackingMonthIndex !== null ? selectedTrackingMonthIndex : Math.max(0, timeline.currentMonthIndex);
  selectedTrackingMonthIndex = selectedMonthIndex;

  if(monthSelect){
    monthSelect.innerHTML = MONTHS.map((month, idx)=>{
      const locked = idx > timeline.currentMonthIndex;
      return `<option value="${idx}" ${idx === selectedMonthIndex ? "selected" : ""}>${month.name} · ${month.yearLabel}${locked ? " • Locked" : ""}</option>`;
    }).join("");
    monthSelect.value = String(selectedMonthIndex);
    monthSelect.onchange = ()=>{
      selectedTrackingMonthIndex = Number(monthSelect.value);
      selectedTrackingWeekIndex = selectedTrackingMonthIndex * 4;
      renderMonthHeatmap();
    };
  }

  if(monthPrev){
    monthPrev.onclick = ()=>{
      const nextIndex = Math.max(0, selectedTrackingMonthIndex - 1);
      selectedTrackingMonthIndex = nextIndex;
      selectedTrackingWeekIndex = nextIndex * 4;
      renderMonthHeatmap();
    };
  }

  if(monthNext){
    monthNext.onclick = ()=>{
      const nextIndex = Math.min(MONTHS.length - 1, selectedTrackingMonthIndex + 1);
      selectedTrackingMonthIndex = nextIndex;
      selectedTrackingWeekIndex = nextIndex * 4;
      renderMonthHeatmap();
    };
  }

  if(monthCurrent){
    monthCurrent.onclick = ()=>{
      const currentIndex = Math.max(0, timeline.currentMonthIndex);
      selectedTrackingMonthIndex = currentIndex;
      selectedTrackingWeekIndex = currentIndex * 4;
      renderMonthHeatmap();
    };
  }

  const selectedMonth = MONTHS[selectedMonthIndex] || MONTHS[0];
  const ratio = getMonthPerformanceRatio(selectedMonthIndex);
  const density = 0.18 + ratio * 0.72;
  const cells = [0,1,2,3].map((weekOffset)=>{
    const status = DB.schedule.weekStatus[selectedMonthIndex * 4 + weekOffset] || "";
    const cellClass = status === "done" ? "done" : status === "missed" ? "missed" : status === "partial" ? "partial" : "";
    return `<span class="heatmap-cell ${cellClass}" style="opacity:${0.35 + density * 0.55}"></span>`;
  }).join("");

  monthGrid.innerHTML = `
    <div class="heatmap-focus-card">
      <div class="heatmap-focus-head">
        <div>
          <div class="card-eyebrow">Selected month</div>
          <h3>${selectedMonth.name}</h3>
          <div class="heatmap-month-meta">${selectedMonth.yearLabel}</div>
        </div>
        <button class="btn btn-ghost btn-sm" type="button" data-open-week="true">Open week plan</button>
      </div>
      <div class="heatmap-cells heatmap-cells-large">${cells}</div>
      <div class="heatmap-focus-foot">${selectedMonth.desc || "Keep the momentum steady and close the month out cleanly."}</div>
    </div>`;

  const openWeekBtn = monthGrid.querySelector("[data-open-week]");
  if(openWeekBtn){
    openWeekBtn.addEventListener("click", ()=>{
      selectedTrackingWeekIndex = selectedTrackingMonthIndex * 4;
      switchTrackingView("week");
    });
  }
}

function drawTrajectoryPerformanceGraph(){
  const canvas = document.getElementById("trajectoryTrendGraph");
  if(!canvas) return;
  const ctx = canvas.getContext("2d");
  const width = canvas.clientWidth || 640;
  const height = canvas.clientHeight || 220;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#8b7cff";
  const muted = "rgba(255,255,255,0.16)";
  const padX = 24;
  const padY = 22;
  const plotH = height - padY * 2;

  ctx.strokeStyle = muted;
  ctx.lineWidth = 1;
  for(let y=0; y<=4; y++){
    const yy = padY + y * (plotH / 4);
    ctx.beginPath(); ctx.moveTo(padX, yy); ctx.lineTo(width - padX, yy); ctx.stroke();
  }

  const series = Array.isArray(DB.tracking?.historicalPerformance) && DB.tracking.historicalPerformance.length
    ? DB.tracking.historicalPerformance
    : MONTHS.map((month, idx)=>({ monthIndex: idx, value: getMonthPerformanceRatio(idx) }));
  const values = series.map(entry=>typeof entry === "number" ? entry : (entry.value ?? entry.ratio ?? entry.score ?? 0));
  const max = Math.max(...values, 1);
  const stepX = (width - padX * 2) / Math.max(values.length - 1, 1);
  const points = values.map((value, idx)=>({
    x: padX + idx * stepX,
    y: padY + (1 - (value / max)) * plotH
  }));

  ctx.beginPath();
  points.forEach((point, idx)=>{
    if(idx===0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.lineTo(width - padX, height - padY);
  ctx.lineTo(padX, height - padY);
  ctx.closePath();
  ctx.fillStyle = "rgba(139,124,255,0.16)";
  ctx.fill();

  ctx.beginPath();
  points.forEach((point, idx)=>{
    if(idx===0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2;
  ctx.stroke();

  points.forEach(point=>{
    ctx.beginPath();
    ctx.arc(point.x, point.y, 3.2, 0, Math.PI * 2);
    ctx.fillStyle = accent;
    ctx.fill();
  });
}

function exportCalendarSchedule(){
  const start = parseDate(DB.profile.startDate);
  if(!start){ showNotice("Set a start date before exporting your schedule.", "error"); return; }
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Trajectory//Engineering Roadmap//EN",
    "CALSCALE:GREGORIAN"
  ];
  for(let i=0; i<52; i++){
    const due = addDays(start, i * 7);
    const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
    const uid = `trajectory-week-${i + 1}@local`;
    const summary = `Weekly milestone ${i + 1}`;
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${uid}`);
    lines.push(`DTSTAMP:${stamp}`);
    lines.push(`DTSTART;VALUE=DATE:${due.toISOString().slice(0,10).replace(/-/g, "")}`);
    lines.push(`SUMMARY:${summary}`);
    lines.push("END:VEVENT");
  }
  lines.push("END:VCALENDAR");
  const blob = new Blob([lines.join("\r\n")], { type:"text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url; link.download = "trajectory-schedule.ics"; link.click();
  URL.revokeObjectURL(url);
}

async function syncProjectGitHubMetrics(projectKey, repoString){
  const trimmed = (repoString || "").trim();
  const matched = trimmed.match(/github\.com[/:]([^/]+)\/([^/]+)(?:\/|$)/i) || trimmed.match(/^([^/]+)\/([^/]+)$/);
  if(!matched){ throw new Error("Use a GitHub repo in owner/repo format."); }
  const [, owner, repo] = matched;
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: { Accept: "application/vnd.github+json", "User-Agent": "Trajectory-App" }
  });
  if(!response.ok) throw new Error("GitHub sync failed");
  const data = await response.json();
  DB.projects.meta[projectKey] = Object.assign(DB.projects.meta[projectKey] || {}, {
    repo: `https://github.com/${owner}/${repo}`,
    repoName: `${owner}/${repo}`,
    stars: data.stargazers_count,
    language: data.language,
    openIssues: data.open_issues_count,
    pushes: data.pushed_at,
    lastSyncedAt: new Date().toISOString()
  });
  saveDB();
  renderProjects();
  return DB.projects.meta[projectKey];
}

async function syncGitHubProfile(username){
  const clean = (username || "").trim().replace(/^@/, "");
  if(!clean) throw new Error("Enter a GitHub username first.");
  const headers = { Accept: "application/vnd.github+json" };
  const [profileResponse, reposResponse, eventsResponse] = await Promise.all([
    fetch(`https://api.github.com/users/${encodeURIComponent(clean)}`, { headers }),
    fetch(`https://api.github.com/users/${encodeURIComponent(clean)}/repos?sort=updated&per_page=12`, { headers }),
    fetch(`https://api.github.com/users/${encodeURIComponent(clean)}/events/public?per_page=10`, { headers })
  ]);
  if(!profileResponse.ok) throw new Error(profileResponse.status === 404 ? "GitHub user not found." : "GitHub is rate-limiting this browser. Try again later.");
  const profile = await profileResponse.json();
  DB.github = {
    username: clean,
    profile: { login: profile.login, name: profile.name, avatar: profile.avatar_url, url: profile.html_url, followers: profile.followers, publicRepos: profile.public_repos, bio: profile.bio },
    repos: reposResponse.ok ? (await reposResponse.json()).map(repo=>({ name:repo.name, url:repo.html_url, language:repo.language, stars:repo.stargazers_count, updatedAt:repo.updated_at })) : [],
    events: eventsResponse.ok ? (await eventsResponse.json()).map(event=>({ type:event.type, repo:event.repo && event.repo.name, at:event.created_at })) : [],
    lastSyncedAt: new Date().toISOString()
  };
  saveDB("GitHub profile sync");
  renderSettings();
}

async function syncLeetCodeProfile(username){
  const clean = (username || "").trim();
  if(!clean) throw new Error("Enter a LeetCode username first.");
  
  // Use a modern, active proxy endpoint that bypasses Cloudflare blocks
  const response = await fetch(`https://alfa-leetcode-api.onrender.com/${encodeURIComponent(clean)}`);
  
  if(!response.ok) throw new Error("LeetCode API is rate-limiting or unavailable. Try again later.");
  
  const stats = await response.json();
  
  // The API returns an 'errors' array if the user doesn't exist
  if(stats.errors || stats.message === "User not found") {
    throw new Error("LeetCode user not found.");
  }
  
  DB.leetcode = {
    username: clean,
    profile: {
      ranking: stats.ranking ?? null,
      totalSolved: stats.totalSolved ?? 0,
      totalQuestions: stats.totalQuestions ?? 0,
      easySolved: stats.easySolved ?? 0,
      mediumSolved: stats.mediumSolved ?? 0,
      hardSolved: stats.hardSolved ?? 0,
      acceptanceRate: stats.acceptanceRate ?? null
    },
    lastSyncedAt: new Date().toISOString()
  };
  
  saveDB("LeetCode profile sync");
  renderSettings();
}

// Weekly academic targets should surface theory only — labs, workshops, projects,
// internships, viva/presentation logistics and pure-practice blocks are excluded here.
// This does NOT touch the full syllabus reference view on the Academics page, only
// the weekly target generation below. Curated per-college from the actual syllabus
// content (subject name alone isn't reliable — e.g. JUIT names many theory-heavy
// subjects "X & Lab" while still listing genuinely conceptual topics).
const PRACTICAL_SUBJECT_EXCLUDE = new Set([
  // HITK
  "physics & electronics labs", "design thinking lab", "industry competence lab",
  "internship & major project phase-i", "major project-ii", "comprehensive viva",
  "skill development", "final presentation",
  // JUIT
  "workshop", "life skills & professional communication lab", "engineering drawing & design",
  "unix programming lab", "competitive programming-i", "competitive programming-ii",
  "competitive programming-iii", "summer training-i", "summer training-ii", "summer training-iii",
  "full stack development lab", "logical and quantitative techniques-i",
  "logical and quantitative techniques-ii", "selected value-added course",
  "soft skills for employability", "minor project", "major project part-1", "major project part-2"
]);
const PRACTICAL_TOPIC_EXCLUDE = new Set([
  "laboratory instrumentation", "experimental verification", "experimental setups"
]);
function isTheoryOnlySubject(subjectName){
  return !PRACTICAL_SUBJECT_EXCLUDE.has(String(subjectName || "").trim().toLowerCase());
}
function isTheoryOnlyTopic(topic){
  return !PRACTICAL_TOPIC_EXCLUDE.has(String(topic || "").trim().toLowerCase());
}

function buildAcademicGoalEntries(subjects, weekKey){
  const today = todayMidnight();
  const entries = [];
  (subjects || []).filter(subject=>isTheoryOnlySubject(subject.name)).forEach(subject=>{
    const topicList = (Array.isArray(subject.topics) ? subject.topics : []).filter(isTheoryOnlyTopic);
    const examDate = parseDate(subject.examDate);
    const daysToExam = examDate ? diffDays(examDate, today) : null;
    // Reserve the last 12 weeks for revision. The remaining syllabus is distributed
    // in weekly batches so a semester is completed 2–3 months before the exam.
    const finishBufferWeeks = Math.max(8, Math.min(12, Number(subject.finishBufferWeeks) || 12));
    const syllabusWeeks = daysToExam === null ? 1 : Math.max(1, Math.ceil(daysToExam / 7) - finishBufferWeeks);
    const topicsPerWeek = Math.max(1, Math.ceil(topicList.length / syllabusWeeks));
    const studyWeek = daysToExam === null ? 0 : Math.max(0, syllabusWeeks - Math.ceil(Math.max(daysToExam, 0) / 7));
    const scheduledTopics = daysToExam !== null && daysToExam <= finishBufferWeeks * 7
      ? topicList.filter(topic=>!(subject.topicDone && subject.topicDone[topic]))
      : topicList.slice(studyWeek * topicsPerWeek, (studyWeek + 1) * topicsPerWeek);
    const subjectName = (subject.name || "").trim();
    (scheduledTopics.length ? scheduledTopics : topicList.slice(0, topicsPerWeek)).forEach(topic=>{
      const cleanTopic = String(topic || "").trim();
      if(!cleanTopic) return;
      const topicLower = cleanTopic.toLowerCase();
      let action = "Study";
      if(/rev|review|revision|recap|summary|notes|consolidat|exam|mock|formula|theorem|proof|definition|core/i.test(topicLower)) action = "Review";
      else if(/pract|problem|exercise|example|code|build|implement|debug|apply|application|solve|question|lab/i.test(topicLower)) action = "Practice";
      else if(/understand|learn|foundation|basics|concept|principle|intro|overview/i.test(topicLower)) action = "Build";
      else action = "Master";
      const urgency = daysToExam === null ? 0 : daysToExam < 0 ? 4 : daysToExam <= 7 ? 3 : daysToExam <= 21 ? 2 : 1;
      const actionScore = action === "Review" ? 3 : action === "Practice" ? 2 : action === "Build" ? 1 : 0;
      const labelPrefix = subjectName ? `${subjectName} · ` : "";
      entries.push({
        topic: cleanTopic,
        label: `${labelPrefix}${action} ${cleanTopic}`,
        priority: urgency + actionScore,
        daysToExam,
        weekKey,
        finishBufferWeeks,
        topicsPerWeek
      });
    });
  });
  return entries.sort((a,b)=>b.priority-a.priority || a.label.localeCompare(b.label));
}

function renderTrackingDashboard(){
  drawTrajectoryPerformanceGraph();
  renderMonthHeatmap();
  const weekSkill = document.getElementById("weekSkillTracker");
  const weekAcademic = document.getElementById("weekAcademicTracker");
  const weekProject = document.getElementById("weekProjectTracker");
  const timeline = calculateCurrentTimeline();
  const selectedWeekIndex = selectedTrackingWeekIndex !== null ? selectedTrackingWeekIndex : timeline.currentWeekIndex;
  const activeWeek = WEEKS[selectedWeekIndex] || WEEKS[0] || null;
  const weekKey = getWeekKey(weekDueDate(selectedWeekIndex) || todayMidnight());
  const academicGoals = buildAcademicGoalEntries(DB.academics?.subjects || [], weekKey).slice(0, 6);
  if(activeWeek){
    weekSkill.innerHTML = `<ul class="task-list">${(activeWeek.skill?.tasks || []).map(task=>`<li><label>${task}</label></li>`).join("")}</ul>`;
    weekAcademic.innerHTML = academicGoals.length
      ? `<ul class="task-list">${academicGoals.map(goal=>`<li><label>${goal.label}</label></li>`).join("")}</ul>`
      : `<div class="empty-sub">Add academic topics to shape this week’s goals.</div>`;
    weekProject.innerHTML = `<ul class="task-list">${(activeWeek.project?.tasks || []).map(task=>`<li><label>${task}</label></li>`).join("")}</ul>`;
  }

  const dayChecklist = document.getElementById("dayTaskChecklistContainer");
  if(dayChecklist && activeWeek){
    const key = getWeekKey(todayMidnight());
    const checked = DB.tracking?.dailyLogs?.[key] || {};
    const tasks = [
      ...(activeWeek.skill?.tasks || []).map(task=>({ id:`skill:${task}`, text:task })),
      ...(activeWeek.academic?.tasks || []).map(task=>({ id:`academic:${task}`, text:task })),
      ...(activeWeek.project?.tasks || []).map(task=>({ id:`project:${task}`, text:task }))
    ];
    dayChecklist.innerHTML = `<ul class="task-list">${tasks.map(task=>`
      <li class="${checked[task.id]?"done":""}">
        <input type="checkbox" data-day-task="${task.id}" ${checked[task.id]?"checked":""}>
        <label>${task.text}</label>
      </li>`).join("")}</ul>`;
    dayChecklist.querySelectorAll("[data-day-task]").forEach(cb=>{
      cb.addEventListener("change", ()=>{
        if(!DB.tracking.dailyLogs[key]) DB.tracking.dailyLogs[key] = {};
        DB.tracking.dailyLogs[key][cb.dataset.dayTask] = cb.checked;
        saveDB(); renderTrackingDashboard();
      });
    });
  }

  setTrackingViewport(activeTrackingViewport);
}

/* ---------------- navigation ---------------- */
function goToPage(page){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById("page-"+page).classList.add("active");
  document.querySelectorAll(".nav-link").forEach(b=>b.classList.toggle("active", b.dataset.page===page));
  document.querySelectorAll(".tab-link").forEach(b=>b.classList.toggle("active", b.dataset.page===page));
  window.scrollTo({top:0, behavior:"instant"});
}

/* ---------------- RENDER: HOME ---------------- */
function renderHome(){
  const start = parseDate(DB.profile.startDate);
  const today = todayMidnight();
  document.getElementById("homeGreeting").textContent = `WELCOME BACK, ${(DB.profile.name||"ENGINEER").toUpperCase()}`;
  document.getElementById("brandOp").textContent = `OP: ${(DB.profile.name||"—").toUpperCase()}`;

  const dayCounter = document.getElementById("dayCounter");
  const prepBanner = document.getElementById("prepBanner");

  if(start && start > today){
    const daysTo = diffDays(start, today);
    dayCounter.textContent = `T-MINUS ${daysTo}D`;
    prepBanner.hidden = false;
    const prepSections = [
      ["skill", CURRICULUM.prep.skill],
      ["academic", CURRICULUM.prep.academic],
      ["project", CURRICULUM.prep.project]
    ];
    const totalTasks = prepSections.reduce((sum, [,sec])=>sum + sec.tasks.length, 0);
    const doneCount = Object.keys(DB.prep.done).filter(k=>DB.prep.done[k]).length;
    const pct = totalTasks ? Math.round((doneCount/totalTasks)*100) : 0;
    const ringCirc = 251.2;
    const ringOffset = ringCirc - (ringCirc * pct / 100);
    const allDone = doneCount === totalTasks && totalTasks > 0;

    prepBanner.innerHTML = `
      <div class="prep-head-row">
        <div class="prep-ring-wrap">
          <svg class="prep-ring" viewBox="0 0 90 90">
            <circle class="prep-ring-track" cx="45" cy="45" r="40"></circle>
            <circle class="prep-ring-fill" cx="45" cy="45" r="40" style="stroke-dashoffset:${ringOffset}"></circle>
          </svg>
          <div class="prep-ring-center">
            <div class="prep-ring-pct">${pct}%</div>
            <div class="prep-ring-label">READY</div>
          </div>
        </div>
        <div class="prep-head-copy">
          <div style="font-weight:700;font-size:16px">Your course starts ${fmtLong(start)}</div>
          <div class="sem-meta">${daysTo} day${daysTo===1?"":"s"} to get ahead · ${doneCount}/${totalTasks} done</div>
        </div>
        <div class="prep-ready-badge ${allDone?"":"locked"}">${allDone?"✓ MISSION READY":"IN PROGRESS"}</div>
      </div>
      <div class="prep-grid">
        ${prepSections.map(([key, sec])=>{
          const sectionDone = sec.tasks.filter((_,i)=>DB.prep.done[key+":"+i]).length;
          return `
          <div class="prep-track-card">
            <div class="prep-track-head">
              <div class="prep-track-title">${sec.title}</div>
              <div class="prep-track-count">${sectionDone}/${sec.tasks.length}</div>
            </div>
            <ul class="prep-track-list">
              ${sec.tasks.map((t,i)=>{
                const isDone = !!DB.prep.done[key+":"+i];
                return `
                <li class="${isDone?"done":""}">
                  <input type="checkbox" data-prep="${key}:${i}" ${isDone?"checked":""}>
                  <label>${t}</label>
                </li>`;
              }).join("")}
            </ul>
          </div>`;
        }).join("")}
      </div>`;
    prepBanner.querySelectorAll("[data-prep]").forEach(cb=>{
      cb.addEventListener("change", ()=>{ DB.prep.done[cb.dataset.prep]=cb.checked; saveDB(); renderHome(); });
    });
  } else {
    prepBanner.hidden = true;
    if(start){
      const d = diffDays(today, start);
      dayCounter.textContent = `DAY ${String(d).padStart(3,"0")}`;
    }
  }

  const cwTitle = document.getElementById("cwTitle");
  const cwDue = document.getElementById("cwDue");
  const cwTasks = document.getElementById("cwTasks");
  const academicSummary = document.getElementById("acWeeklySummary");
  const idx = DB.schedule.currentIndex;

  if(!start || start > today){
    const previewWeek = WEEKS[0] || null;
    if(previewWeek){
      cwTitle.textContent = `${previewWeek.yearLabel} · ${previewWeek.monthName} · Week ${previewWeek.weekInMonth}`;
      cwDue.textContent = start ? `Unlocks ${fmtShort(start)} — preview` : "Set your start date in Settings to unlock this";
      cwTasks.innerHTML = `<div class="week-locked-banner">🔒 Locked until your course starts — here's what Week 1 looks like</div>` +
        previewWeek.tasks.map(t=>`
        <li class="locked">
          <input type="checkbox" disabled>
          <label>${t.text}</label>
          <span class="prep-lock-icon">LOCKED</span>
        </li>`).join("");
    } else {
      cwTitle.textContent = "Ready when you are";
      cwDue.textContent = start ? `Weekly targets unlock on ${fmtShort(start)}` : "Set your start date in Settings";
      cwTasks.innerHTML = "";
    }
  } else if(idx >= WEEKS.length){
    cwTitle.textContent = "🎉 Trajectory complete";
    cwDue.textContent = "You've cleared all four years. Time to look back at Progress.";
    cwTasks.innerHTML = "";
  } else {
    const wk = WEEKS[idx];
    cwTitle.textContent = `${wk.yearLabel} · ${wk.monthName} · Week ${wk.weekInMonth}`;
    const due = weekDueDate(idx);
    cwDue.textContent = `Due ${fmtLong(due)}`;
    const doneIds = DB.schedule.weekTaskDone[String(idx)] || [];
    cwTasks.innerHTML = wk.tasks.map(t=>`
      <li class="${doneIds.includes(t.id)?'done':''}">
        <input type="checkbox" data-task="${t.id}" ${doneIds.includes(t.id)?'checked':''}>
        <label>${t.text}</label>
      </li>`).join("");
    cwTasks.querySelectorAll("[data-task]").forEach(cb=>{
      cb.addEventListener("change", ()=>{ toggleTask(idx, cb.dataset.task); renderHome(); });
    });
  }

  const homeSem = SYLLABUS[currentSemesterIndex()] || SYLLABUS[0];
  const homeFallbackSubjects = (homeSem?.subjects || []).map(subject=>({ name: subject.name, topics: subject.topics || [] }));
  const homeSourceSubjects = (DB.academics?.subjects || []).length ? DB.academics.subjects : homeFallbackSubjects;
  const homeAcademicGoals = buildAcademicGoalEntries(homeSourceSubjects, getWeekKey(today)).slice(0, 5);
  const homeAcademicBlock = document.getElementById("homeAcademicGoals");
  if(homeAcademicBlock){
    homeAcademicBlock.innerHTML = homeAcademicGoals.length
      ? `<div class="goal-stack">${homeAcademicGoals.map(goal=>`<div class="goal-pill">${goal.label}</div>`).join("")}</div>`
      : `<div class="empty-sub">No academic goals yet.</div>`;
  }

  const total = WEEKS.length;
  const doneCount = Object.values(DB.schedule.weekStatus).filter(s=>s==="done").length;
  const missedCount = Object.values(DB.schedule.weekStatus).filter(s=>s==="missed").length;
  const pct = total ? Math.round((doneCount/total)*100) : 0;
  const circumference = 326.7;
  document.getElementById("ringFill").style.strokeDashoffset = circumference - (circumference*pct/100);
  document.getElementById("ringPct").textContent = pct+"%";
  document.getElementById("statDone").textContent = doneCount;
  document.getElementById("statMissed").textContent = missedCount;
  const curYear = (start && idx < total) ? WEEKS[Math.min(idx,total-1)].yearId : (idx>=total ? 4 : 1);
  document.getElementById("statYear").textContent = curYear;

  const homeGithubStatus = document.getElementById("homeGithubStatus");
  if(homeGithubStatus){
    const gh = DB.github || {};
    if(gh.profile){
      homeGithubStatus.innerHTML = `<img src="${gh.profile.avatar}" alt=""><div class="dev-status-body"><a href="${gh.profile.url}" target="_blank" rel="noopener">@${gh.profile.login}</a><span class="dev-status-meta">GitHub · ${gh.profile.publicRepos} repos · ${gh.profile.followers} followers</span></div>`;
    } else {
      homeGithubStatus.innerHTML = `<div class="dev-status-icon">GH</div><div class="dev-status-body"><span class="dev-status-empty">GitHub not connected — add a username in Settings.</span></div>`;
    }
  }
  const homeLeetcodeStatus = document.getElementById("homeLeetcodeStatus");
  if(homeLeetcodeStatus){
    const lt = DB.leetcode || {};
    if(lt.profile){
      homeLeetcodeStatus.innerHTML = `<div class="dev-status-icon">LC</div><div class="dev-status-body"><a href="https://leetcode.com/${lt.username}/" target="_blank" rel="noopener">@${lt.username}</a><span class="dev-status-meta">LeetCode · ${lt.profile.totalSolved} solved · Rank #${lt.profile.ranking ?? "—"}</span></div>`;
    } else {
      homeLeetcodeStatus.innerHTML = `<div class="dev-status-icon">LC</div><div class="dev-status-body"><span class="dev-status-empty">LeetCode not connected — add a username in Settings.</span></div>`;
    }
  }

  const track = document.getElementById("track");
  track.innerHTML = CURRICULUM.years.map(year=>{
    const cells = year.months.map((m, mi)=>{
      const base = (year.id-1)*48 + mi*4;
      const statuses = [0,1,2,3].map(w=>DB.schedule.weekStatus[base+w]);
      const doneAll = statuses.every(s=>s==="done");
      const anyMissed = statuses.some(s=>s==="missed");
      const anyDone = statuses.some(s=>s==="done");
      let cls = "";
      if(doneAll) cls="done"; else if(anyMissed) cls="missed"; else if(anyDone) cls="partial";
      const isCurrent = start && start<=today && idx>=base && idx<base+4;
      if(isCurrent) cls += " current";
      return `<div class="track-month ${cls}" data-label="${m.name}"></div>`;
    }).join("");
    return `<div class="track-year"><div class="track-year-label">Y${year.id}</div><div class="track-months">${cells}</div></div>`;
  }).join("");

  const upcoming = document.getElementById("upcomingList");
  if(!start || start > today || idx >= total){
    upcoming.innerHTML = `<li><span>Nothing scheduled yet</span></li>`;
  } else {
    const items = [];
    for(let i=idx+1; i<Math.min(idx+6, total); i++){
      const w = WEEKS[i];
      items.push(`<li><span>${w.yearLabel} · ${w.monthName} · Week ${w.weekInMonth}</span><span class="u-date">${fmtShort(weekDueDate(i))}</span></li>`);
    }
    upcoming.innerHTML = items.length ? items.join("") : `<li><span>That's the last stretch — finish strong.</span></li>`;
  }

  renderTrackingDashboard();
}

/* ---------------- RENDER: ACADEMICS ---------------- */
function populateAcademicPickers(){
  const semPick = document.getElementById("acSemPick");
  semPick.innerHTML = SYLLABUS.map(s=>`<option value="${s.sem}">Semester ${s.sem} (Year ${s.year})</option>`).join("");
  updateSubjectOptions();
  semPick.onchange = updateSubjectOptions;
}
function updateSubjectOptions(){
  const sem = document.getElementById("acSemPick").value || "1";
  const s = SYLLABUS.find(x=>String(x.sem)===String(sem));
  document.getElementById("acSubjectPick").innerHTML = s.subjects.map(sub=>`<option value="${sub.name}">${sub.name}</option>`).join("");
}

function renderSemesterPanel(){
  const semIdx = currentSemesterIndex();
  const sem = SYLLABUS[semIdx];
  const start = parseDate(DB.profile.startDate);
  const today = todayMidnight();
  const started = start && start<=today;

  document.getElementById("semBadge").textContent = "S"+sem.sem;
  document.getElementById("semYearLabel").textContent = `Year ${sem.year} · Semester ${sem.sem}`;

  if(started){
    const semStartMonth = semIdx*6;
    document.getElementById("semDateRange").textContent = `Currently active · began around month ${semStartMonth+1} of your trajectory`;
  } else {
    document.getElementById("semDateRange").textContent = "Unlocks once your course begins";
  }

  const fallbackSubjects = sem.subjects.map(subject=>({ name: subject.name, topics: subject.topics || [] }));
  const sourceSubjects = (DB.academics?.subjects || []).length ? DB.academics.subjects : fallbackSubjects;
  const goalEntries = buildAcademicGoalEntries(sourceSubjects, getWeekKey(today)).slice(0, 8);
  document.getElementById("semGoalList").innerHTML = goalEntries.length
    ? `<ul class="goal-checklist">${goalEntries.map(entry=>`<li class="goal-check-item goal-view-item"><span class="goal-view-dot"></span><span>${entry.label}</span></li>`).join("")}</ul>`
    : `<div class="empty-sub">Add your own weekly topic targets to see smart academic goals here.</div>`;

  document.getElementById("semSyllabusList").innerHTML = sem.subjects.map(s=>`
    <div class="semester-subject-block">
      <div class="semester-subject-title">${s.name}</div>
      <div class="topic-tag-list">${s.topics.slice(0, 8).map(t=>`<span class="topic-tag">${t}</span>`).join("")}${s.topics.length > 8 ? '<span class="topic-tag more">+ more</span>' : ''}</div>
    </div>
  `).join("");
}

function renderAcademics(){
  renderSemesterPanel();

  const list = document.getElementById("acList");
  const empty = document.getElementById("acEmpty");
  const weeklySummary = document.getElementById("acWeeklySummary");
  const subjects = DB.academics.subjects;
  empty.hidden = subjects.length>0;
  const today = todayMidnight();

  const sem = SYLLABUS[currentSemesterIndex()] || SYLLABUS[0];
  const fallbackSubjects = (sem?.subjects || []).map(subject=>({ name: subject.name, topics: subject.topics || [] }));
  const sourceSubjects = subjects.length ? subjects : fallbackSubjects;
  const weeklyGoalEntries = buildAcademicGoalEntries(sourceSubjects, getWeekKey(today)).slice(0, 8);
  weeklySummary.innerHTML = weeklyGoalEntries.length
    ? `<div class="goal-stack">${weeklyGoalEntries.map(entry=>`<div class="goal-pill">${entry.label}</div>`).join("")}</div>`
    : `<div class="empty-sub">No weekly academic goals yet. Add topics above and they’ll appear here.</div>`;

  list.innerHTML = subjects.map(s=>{
    const examDate = parseDate(s.examDate);
    const days = examDate ? diffDays(examDate, today) : null;
    let daysCls = "", daysLabel = "No date set";
    if(days!==null){
      if(days < 0){ daysCls="past"; daysLabel = `Exam was ${Math.abs(days)}d ago`; }
      else if(days<=7){ daysCls="soon"; daysLabel = days===0 ? "Exam is today" : `${days}d to go`; }
      else daysLabel = `${days}d to go`;
    }
    const weeksLeft = days!==null ? Math.ceil(Math.max(days,0)/7) : null;
    let taskIdx = 0;
    if(weeksLeft!==null){
      if(weeksLeft<=0) taskIdx = REVISION_CYCLE.length-1;
      else if(weeksLeft>=REVISION_CYCLE.length) taskIdx = 0;
      else taskIdx = REVISION_CYCLE.length - weeksLeft;
    }
    const wk = getWeekKey(today);
    const taskDone = (s.tasksDone && s.tasksDone[wk]) || false;
    const sem = SYLLABUS[currentSemesterIndex()] || SYLLABUS[0];
    const topicSource = sem.subjects.find(item => item.name === s.name);
    const topics = Array.isArray(s.topics) && s.topics.length
      ? s.topics
      : (topicSource && Array.isArray(topicSource.topics) && topicSource.topics.length ? topicSource.topics : ["Core concepts"]);
    if(!Array.isArray(s.topics) || !s.topics.length) s.topics = topics.slice();
    const academicGoals = buildAcademicGoalEntries([s], wk).slice(0, 4);
    const finishBufferWeeks = Math.max(8, Math.min(12, Number(s.finishBufferWeeks) || 12));
    const studyWeeks = days===null ? null : Math.max(0, Math.ceil(days/7) - finishBufferWeeks);
    const topicHTML = academicGoals.map(entry=>`
      <div class="topic-schedule-item">
        <span class="topic-marker"></span>
        <span>${entry.label}</span>
      </div>`).join("");
    return `
      <div class="subject-card">
        <button class="subject-remove" data-remove="${s.id}">×</button>
        <h3>${s.name}</h3>
        <div class="subject-days ${daysCls}">${daysLabel}${examDate ? " · "+fmtShort(examDate) : ""}</div>
        <div class="subject-week-target">Weekly target</div>
        <div class="subject-view-pill">This week: ${REVISION_CYCLE[taskIdx]}</div>
        <div class="subject-plan-note">${studyWeeks===null ? "Set an exam date to create a finish-early plan." : studyWeeks > 0 ? `Syllabus lane: ${Math.max(1, Math.ceil(topics.length/studyWeeks))} topic${Math.ceil(topics.length/studyWeeks)===1?"":"s"}/week · revision begins ${finishBufferWeeks} weeks before exams.` : `Revision lane active · syllabus target was ${finishBufferWeeks} weeks before exams.`}</div>
        <div class="topic-schedule-list">${topicHTML}</div>
      </div>`;
  }).join("");

  list.querySelectorAll("[data-remove]").forEach(b=>{
    b.addEventListener("click", ()=>{
      DB.academics.subjects = DB.academics.subjects.filter(s=>s.id!==b.dataset.remove);
      saveDB(); renderAcademics();
    });
  });
  list.querySelectorAll("[data-acstask]").forEach(cb=>{
    cb.addEventListener("change", ()=>{
      const s = DB.academics.subjects.find(x=>x.id===cb.dataset.acstask);
      if(!s) return;
      if(!s.tasksDone) s.tasksDone = {};
      s.tasksDone[cb.dataset.key] = cb.checked;
      saveDB();
    });
  });
  list.querySelectorAll("[data-topic-check]").forEach(cb=>{
    cb.addEventListener("change", ()=>{
      const s = DB.academics.subjects.find(x=>x.id===cb.dataset.topicCheck);
      if(!s) return;
      if(!s.topicDone) s.topicDone = {};
      if(!s.topicDone[cb.dataset.key]) s.topicDone[cb.dataset.key] = {};
      s.topicDone[cb.dataset.key][cb.dataset.topicName] = cb.checked;
      saveDB(); renderAcademics();
    });
  });
}

/* ---------------- RENDER: PROJECTS (Mission Control ladder) ---------------- */
function starsFor(globalIndex){ return Math.min(6, 1 + Math.floor(globalIndex/8)); }

function statusFor(mo){
  if(DB.projects.shipped[mo.globalIndex]) return "shipped";
  if(DB.projects.started[mo.globalIndex]) return "progress";
  const cur = currentMonthGlobalIndex();
  if(cur === mo.globalIndex) return "progress";
  return "planned";
}

function cycleStatus(globalIndex){
  const shipped = !!DB.projects.shipped[globalIndex];
  const started = !!DB.projects.started[globalIndex];
  if(!started && !shipped){ DB.projects.started[globalIndex] = true; }
  else if(started && !shipped){ DB.projects.shipped[globalIndex] = true; }
  else { DB.projects.shipped[globalIndex] = false; DB.projects.started[globalIndex] = false; }
  saveDB(); renderProjects();
}

function projectCardHTML(mo, opts){
  opts = opts || {};
  const status = statusFor(mo);
  const badgeCls = status==="shipped" ? "badge-shipped" : status==="progress" ? "badge-progress" : "badge-planned";
  const badgeLabel = status==="shipped" ? "SHIPPED" : status==="progress" ? "IN PROGRESS" : "PLANNED";
  const stars = opts.stars!==undefined ? opts.stars : starsFor(mo.globalIndex);
  const starHTML = "★".repeat(stars) + "☆".repeat(6-stars);
  const meta = DB.projects.meta[mo.globalIndex] || {};
  const metaLine = meta.repo
    ? `<a href="${meta.repo}" target="_blank" rel="noopener">Repo ↗</a>`
    : "No Repo";
  const liveLine = meta.live
    ? ` | <a href="${meta.live}" target="_blank" rel="noopener">Live ↗</a>`
    : " | Not Live";
  const githubStats = meta.lastSyncedAt ? `<div class="project-github-stats">GitHub · ${meta.language || "code"} · ${meta.stars || 0} stars · ${meta.openIssues || 0} open issues</div>` : "";
  const isCurrent = status==="progress";
  const btnLabel = status==="planned" ? "START" : status==="progress" ? "IN PROGRESS" : "SHIPPED ✓";

  return `
    <div class="project-card ${isCurrent?'is-current':''}" data-gidx="${mo.globalIndex}">
      <div class="pc-top">
        <div class="pc-badges">
          <span class="badge ${badgeCls}">${badgeLabel}</span>
          <span class="badge badge-module">${opts.tag || "M"+(mo.globalIndex+1)}</span>
        </div>
        <div class="pc-stars">${starHTML}</div>
      </div>
      <div class="pc-title">${mo.project}</div>
      <div class="pc-desc">${mo.desc || ""}</div>
      <div class="pc-stack">${(mo.stack||[]).map(t=>`<span class="pc-tag">${t}</span>`).join("")}</div>
      ${githubStats}
      <div class="pc-foot">
        <div class="pc-meta">${metaLine}${liveLine}</div>
        <div class="pc-actions">
          <button class="btn btn-primary btn-sm" data-start="${mo.globalIndex}">${btnLabel}</button>
          <button class="pc-code-btn" data-repo="${mo.globalIndex}" title="Set repo link">&lt;/&gt;</button>
        </div>
      </div>
    </div>`;
}

function customCardHTML(c){
  const starHTML = "★".repeat(c.stars) + "☆".repeat(6-c.stars);
  const badgeCls = c.status==="shipped" ? "badge-shipped" : c.status==="progress" ? "badge-progress" : "badge-planned";
  const badgeLabel = c.status==="shipped" ? "SHIPPED" : c.status==="progress" ? "IN PROGRESS" : "PLANNED";
  const btnLabel = c.status==="planned" ? "START" : c.status==="progress" ? "IN PROGRESS" : "SHIPPED ✓";
  return `
    <div class="project-card" data-custom="${c.id}">
      <div class="pc-top">
        <div class="pc-badges"><span class="badge ${badgeCls}">${badgeLabel}</span><span class="badge badge-module">CUSTOM</span></div>
        <div class="pc-stars">${starHTML}</div>
      </div>
      <div class="pc-title">${c.name}</div>
      <div class="pc-desc">${c.desc||""}</div>
      <div class="pc-stack">${(c.stack||[]).map(t=>`<span class="pc-tag">${t}</span>`).join("")}</div>
      <div class="pc-foot">
        <div class="pc-meta">Custom build</div>
        <div class="pc-actions">
          <button class="btn btn-primary btn-sm" data-custom-start="${c.id}">${btnLabel}</button>
          <button class="pc-code-btn" data-custom-remove="${c.id}" title="Remove">✕</button>
        </div>
      </div>
    </div>`;
}

function renderProjects(){
  const filtered = MONTHS.filter(m => projectsFilter==="all" || String(m.yearId)===projectsFilter);
  const byStar = {};
  filtered.forEach(m=>{
    const s = starsFor(m.globalIndex);
    (byStar[s] = byStar[s]||[]).push(m);
  });

  document.querySelectorAll("#yearTabs .tab-btn").forEach(b=>b.classList.toggle("active", b.dataset.filter===projectsFilter));

  let html = "";

  if(projectsFilter==="all" && DB.projects.custom.length){
    html += `<div class="phase-block"><div class="phase-head"><div class="phase-num">+</div><div class="phase-title">Custom Builds</div></div>
      <div class="project-grid">${DB.projects.custom.map(customCardHTML).join("")}</div></div>`;
  }

  Object.keys(byStar).sort((a,b)=>a-b).forEach(star=>{
    html += `<div class="phase-block">
      <div class="phase-head"><div class="phase-num">${star}</div><div class="phase-title">Phase ${star}</div></div>
      <div class="project-grid">${byStar[star].map(m=>projectCardHTML(m)).join("")}</div>
    </div>`;
  });

  const container = document.getElementById("phaseContainer");
  container.innerHTML = html || `<div class="card empty-state"><div class="empty-title">Nothing here yet</div></div>`;

  container.querySelectorAll("[data-start]").forEach(btn=>{
    btn.addEventListener("click", ()=>cycleStatus(parseInt(btn.dataset.start,10)));
  });
  container.querySelectorAll("[data-repo]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const idx = parseInt(btn.dataset.repo,10);
      const cur = DB.projects.meta[idx] || {};
      openDialog({
        eyebrow:"PROJECT LINKS", title:"Connect project links", copy:"Add the repository and optional live deployment for this build.", confirmLabel:"Save links",
        fields:[
          { id:"repo", label:"Repository URL", placeholder:"https://github.com/you/project", value:cur.repo||"" },
          { id:"live", label:"Live URL (optional)", placeholder:"https://your-project.example", value:cur.live||"" }
        ],
        onConfirm:({repo, live})=>{
          DB.projects.meta[idx] = { repo: repo.trim(), live: live.trim() };
          saveDB("Project repository linked"); renderProjects();
          if(repo.trim()) syncProjectGitHubMetrics(idx, repo).catch(err=>showNotice(err.message || "Repository details could not be synced.", "error"));
        }
      });
    });
  });
  container.querySelectorAll("[data-custom-start]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const c = DB.projects.custom.find(x=>x.id===btn.dataset.customStart);
      if(!c) return;
      c.status = c.status==="planned" ? "progress" : c.status==="progress" ? "shipped" : "planned";
      saveDB(); renderProjects();
    });
  });
  container.querySelectorAll("[data-custom-remove]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      DB.projects.custom = DB.projects.custom.filter(x=>x.id!==btn.dataset.customRemove);
      saveDB(); renderProjects();
    });
  });
}

/* ---------------- RENDER: PROGRESS ---------------- */
function renderProgress(){
  const yearBars = document.getElementById("yearBars");
  yearBars.innerHTML = CURRICULUM.years.map(year=>{
    const base = (year.id-1)*48;
    let done=0;
    for(let i=base; i<base+48; i++) if(DB.schedule.weekStatus[i]==="done") done++;
    const pct = Math.round((done/48)*100);
    return `<div class="year-bar-card">
        <div class="year-bar-label">${year.label.toUpperCase()} · ${year.theme}</div>
        <div class="year-bar-track"><div class="year-bar-fill" style="width:${pct}%"></div></div>
        <div class="year-bar-pct">${pct}%</div>
      </div>`;
  }).join("");

  document.getElementById("dsaBigNumber").textContent = DB.progress.dsaSolved;
  const monthGlobal = currentMonthGlobalIndex();
  let target = 0;
  for(let i=0; i<=Math.max(monthGlobal,0); i++) target += MONTHS[i] ? MONTHS[i].dsa : 0;
  if(monthGlobal < 0) target = 0;
  document.getElementById("dsaTargetLine").textContent = `Target so far: ${target}`;
  document.getElementById("dsaInput").value = DB.progress.dsaSolved || "";

  const start = parseDate(DB.profile.startDate);
  const idx = DB.schedule.currentIndex;
  const curYearId = (start && idx<WEEKS.length) ? WEEKS[Math.min(idx,WEEKS.length-1)].yearId : 1;
  const year = CURRICULUM.years.find(y=>y.id===curYearId) || CURRICULUM.years[0];
  document.getElementById("milestoneList").innerHTML = year.milestones.map(([label,val])=>
    `<li>${label}<span>${val}</span></li>`).join("");
}

/* ---------------- RESUME BUILDER ---------------- */

// Pull every shipped build (roadmap projects + custom builds) into one shape.
function getShippedProjects(){
  const fromRoadmap = MONTHS
    .filter(mo => DB.projects.shipped[mo.globalIndex])
    .map(mo => {
      const meta = DB.projects.meta[mo.globalIndex] || {};
      return {
        name: mo.project, desc: mo.desc || "", stack: mo.stack || [],
        repo: meta.repo || "", live: meta.live || "",
        yearLabel: mo.yearLabel, monthName: mo.name, globalIndex: mo.globalIndex, custom: false
      };
    });
  const fromCustom = (DB.projects.custom || [])
    .filter(c => c.status === "shipped")
    .map(c => ({ name: c.name, desc: c.desc || "", stack: c.stack || [], repo: "", live: "", yearLabel: "Custom", monthName: "", globalIndex: -1, custom: true }));
  return [...fromRoadmap, ...fromCustom].sort((a,b)=>a.globalIndex - b.globalIndex);
}

function getInProgressProjects(){
  const fromRoadmap = MONTHS
    .filter(mo => DB.projects.started[mo.globalIndex] && !DB.projects.shipped[mo.globalIndex])
    .map(mo => ({ name: mo.project, globalIndex: mo.globalIndex }));
  const fromCustom = (DB.projects.custom || [])
    .filter(c => c.status === "progress")
    .map(c => ({ name: c.name, globalIndex: -1 }));
  return [...fromRoadmap, ...fromCustom];
}

// Aggregate a clean, de-duplicated skill list from shipped + in-flight work.
function getResumeSkills(){
  const tags = new Set();
  MONTHS.forEach(mo=>{
    if(DB.projects.shipped[mo.globalIndex] || DB.projects.started[mo.globalIndex]){
      (mo.stack||[]).forEach(t=>tags.add(t));
    }
  });
  (DB.projects.custom || []).forEach(c=>{
    if(c.status === "shipped" || c.status === "progress") (c.stack||[]).forEach(t=>tags.add(String(t).toUpperCase()));
  });
  return Array.from(tags);
}

// Parse the low end of a milestone string like "150–200 solved" or "6-8 deployed" -> 150 / 6
function parseMilestoneFloor(val){
  const match = String(val||"").match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

function currentYearAndWindow(){
  const start = parseDate(DB.profile.startDate);
  const idx = DB.schedule.currentIndex;
  const curYearId = (start && WEEKS.length) ? WEEKS[Math.min(Math.max(idx,0), WEEKS.length-1)].yearId : 1;
  const year = CURRICULUM.years.find(y=>y.id===curYearId) || CURRICULUM.years[0];
  const yearStartWeek = (year.id - 1) * 48;
  const yearEndDate = start ? weekDueDate(yearStartWeek + 47) : null;
  return { year, yearEndDate };
}

// Build a prioritized, deadline-aware list of what to do before this resume is application-ready.
function computeResumeReadiness(){
  const items = [];
  const shipped = getShippedProjects();
  const inProgress = getInProgressProjects();
  const { year, yearEndDate } = currentYearAndWindow();

  inProgress.forEach(p=>{
    let due = null;
    if(p.globalIndex >= 0){
      due = weekDueDate(p.globalIndex * 4 + 3); // due date of that month's final week
    }
    items.push({
      priority: "high",
      text: `Finish and ship "${p.name}" — mark it shipped once it's live so it can go straight on your resume.`,
      due, dueLabel: due ? `Target: week of ${fmtShort(due)}` : "No fixed date — finish when ready"
    });
  });

  if(year && Array.isArray(year.milestones)){
    const projectMilestone = year.milestones.find(([label])=>/project/i.test(label));
    const dsaMilestone = year.milestones.find(([label])=>/dsa/i.test(label));
    if(projectMilestone){
      const floor = parseMilestoneFloor(projectMilestone[1]);
      if(floor && shipped.length < floor){
        items.push({
          priority: "medium",
          text: `Ship ${floor - shipped.length} more project${floor - shipped.length===1?"":"s"} to hit the ${year.label} target of ${projectMilestone[1]} shipped builds.`,
          due: yearEndDate, dueLabel: yearEndDate ? `By end of ${year.label}: ${fmtShort(yearEndDate)}` : `By end of ${year.label}`
        });
      }
    }
    if(dsaMilestone){
      const floor = parseMilestoneFloor(dsaMilestone[1]);
      if(floor && (DB.progress.dsaSolved||0) < floor){
        items.push({
          priority: "medium",
          text: `Solve ${floor - (DB.progress.dsaSolved||0)} more DSA problems to reach the ${year.label} bar of ${dsaMilestone[1]} — a strong number to quote on your resume.`,
          due: yearEndDate, dueLabel: yearEndDate ? `By end of ${year.label}: ${fmtShort(yearEndDate)}` : `By end of ${year.label}`
        });
      }
    }
  }

  const missingLinks = shipped.filter(p=>!p.custom && !p.repo);
  if(missingLinks.length){
    items.push({
      priority: "high",
      text: `Add a repo link to ${missingLinks.length} shipped project${missingLinks.length===1?"":"s"} (${missingLinks.slice(0,3).map(p=>p.name).join(", ")}${missingLinks.length>3?"…":""}) so recruiters can see the code.`,
      due: null, dueLabel: "Do this before you start applying"
    });
  }

  if(!DB.github || !DB.github.profile){
    items.push({ priority:"low", text:"Sync your GitHub profile in Settings — it feeds live repo activity into your portfolio story.", due:null, dueLabel:"Anytime" });
  }

  if(!DB.resume.email || !DB.resume.phone){
    items.push({ priority:"high", text:"Add your email and phone number in the contact panel below — recruiters need a way to reach you.", due:null, dueLabel:"Before you export" });
  }
  if(!DB.resume.linkedin && !DB.resume.portfolio){
    items.push({ priority:"low", text:"Add a LinkedIn or portfolio link — resumes with a live link get more callbacks.", due:null, dueLabel:"Before you export" });
  }
  if(!DB.resume.summary){
    items.push({ priority:"low", text:"Write a 1–2 line summary describing what you build and what you're aiming for.", due:null, dueLabel:"Before you export" });
  }
  if(!shipped.length){
    items.push({ priority:"high", text:"Ship your first project — even a small one gives you something concrete to put on the page.", due:null, dueLabel:"Start this week" });
  }

  const rank = { high:0, medium:1, low:2 };
  return items.sort((a,b)=>{
    if(a.due && b.due) return a.due - b.due;
    if(a.due) return -1;
    if(b.due) return 1;
    return rank[a.priority]-rank[b.priority];
  });
}

function buildResumeText(){
  const p = DB.profile, r = DB.resume;
  const college = COLLEGES[DB.settings.college]?.label || "";
  const shipped = getShippedProjects();
  const skills = getResumeSkills();
  const lines = [];
  lines.push((p.name || "Your Name").toUpperCase());
  const contactBits = [r.email, r.phone, r.location, r.linkedin, r.portfolio].filter(Boolean);
  if(contactBits.length) lines.push(contactBits.join(" · "));
  if(r.targetRole) lines.push(`Target role: ${r.targetRole}`);
  if(r.summary){ lines.push(""); lines.push(r.summary); }

  lines.push("", "EDUCATION");
  const sem = currentSemesterIndex()+1;
  lines.push(`${college}${college?" — ":""}Semester ${sem}${DB.progress.dsaSolved ? ` · ${DB.progress.dsaSolved} DSA problems solved` : ""}`);

  if(skills.length){
    lines.push("", "SKILLS");
    lines.push(skills.join(", "));
  }

  if(shipped.length){
    lines.push("", "PROJECTS");
    shipped.forEach(proj=>{
      lines.push(`${proj.name}${proj.stack.length ? ` (${proj.stack.join(", ")})` : ""}`);
      if(proj.desc) lines.push(`  ${proj.desc}`);
      const links = [proj.repo ? `Repo: ${proj.repo}` : "", proj.live ? `Live: ${proj.live}` : ""].filter(Boolean).join("  ·  ");
      if(links) lines.push(`  ${links}`);
    });
  }

  if(DB.github && DB.github.profile){
    lines.push("", "GITHUB");
    lines.push(`@${DB.github.profile.login} — ${DB.github.profile.publicRepos} public repos, ${DB.github.profile.followers} followers (${DB.github.profile.url})`);
  }

  return lines.join("\n");
}

// Build a standalone, print-ready HTML document replicating the Jake's Resume layout,
// set in Computer Modern Serif, populated from tracked data. Used for PDF export via window.print().
function buildJakesResumeHTML(){
  const r = DB.resume;
  const p = DB.profile;
  const skills = getResumeSkills();
  const shipped = getShippedProjects();
  const college = (window.COLLEGES && window.COLLEGES[DB.settings.college])
    ? window.COLLEGES[DB.settings.college].label
    : (DB.settings.college || "University");

  const esc = (str) => String(str||"")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const bareUrl = (u) => esc(String(u||"").replace(/^https?:\/\//, ""));

  const contactBits = [];
  if(r.phone) contactBits.push(esc(r.phone));
  if(r.email) contactBits.push(`<a href="mailto:${esc(r.email)}">${esc(r.email)}</a>`);
  if(r.linkedin) contactBits.push(`<a href="${esc(r.linkedin)}">${bareUrl(r.linkedin)}</a>`);
  if(r.portfolio) contactBits.push(`<a href="${esc(r.portfolio)}">${bareUrl(r.portfolio)}</a>`);

  const projectsHTML = shipped.map(proj => `
    <div class="jr-item">
      <div class="jr-row">
        <span class="jr-left"><span class="jr-bold">${esc(proj.name)}</span>${proj.stack.length ? ` <span class="jr-emph">| ${esc(proj.stack.join(", "))}</span>` : ""}</span>
        <span class="jr-right">${[proj.repo ? `<a href="${esc(proj.repo)}">Repo</a>` : "", proj.live ? `<a href="${esc(proj.live)}">Live</a>` : ""].filter(Boolean).join(" | ")}</span>
      </div>
      <ul class="jr-bullets">
        <li>${esc(proj.desc || "Developed full-stack application logic and architecture.")}</li>
      </ul>
    </div>`).join("");

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${esc(p.name || "Resume")}</title>
<link href="https://cdn.jsdelivr.net/gh/vsalvino/computer-modern@main/fonts/serif.css" rel="stylesheet">
<style>
  @page{ size:letter; margin:0.6in; }
  *{ box-sizing:border-box; }
  body{
    font-family:"Computer Modern Serif", "CMU Serif", Georgia, serif;
    color:#000; font-size:11pt; line-height:1.35; margin:0; padding:0.6in;
    max-width:8.5in;
  }
  a{ color:#000; text-decoration:underline; }
  .jr-header{ text-align:center; margin-bottom:10pt; }
  .jr-name{ font-size:26pt; font-weight:700; font-variant-caps:small-caps; letter-spacing:0.5px; }
  .jr-contact{ font-size:10pt; margin-top:4pt; }
  .jr-contact span{ margin:0 4pt; }
  section{ margin-top:2pt; }
  h2{
    font-size:12.5pt; font-variant-caps:small-caps; font-weight:700; letter-spacing:0.5px;
    border-bottom:1px solid #000; padding-bottom:1pt; margin:10pt 0 5pt;
  }
  .jr-item{ margin-bottom:6pt; }
  .jr-row{ display:flex; justify-content:space-between; align-items:baseline; gap:10pt; }
  .jr-left{ text-align:left; }
  .jr-right{ text-align:right; white-space:nowrap; }
  .jr-bold{ font-weight:700; }
  .jr-emph{ font-style:italic; font-weight:400; }
  .jr-sub .jr-left, .jr-sub .jr-right{ font-style:italic; font-size:10.3pt; }
  .jr-bullets{ margin:2pt 0 0 14pt; padding:0; }
  .jr-bullets li{ font-size:10.3pt; margin-bottom:1pt; }
  .jr-skills{ font-size:10.3pt; }
  .jr-skills b{ font-weight:700; }
  @media print{ body{ padding:0; } }
</style>
</head>
<body>
  <div class="jr-header">
    <div class="jr-name">${esc(p.name || "Your Name")}</div>
    <div class="jr-contact">${contactBits.join(" <span>|</span> ")}</div>
  </div>

  <section>
    <h2>Education</h2>
    <div class="jr-item">
      <div class="jr-row"><span class="jr-left jr-bold">${esc(college)}</span><span class="jr-right"></span></div>
      <div class="jr-row jr-sub"><span class="jr-left">Bachelor of Technology (or Equivalent)</span><span class="jr-right"></span></div>
    </div>
  </section>

  <section>
    <h2>Experience</h2>
    <div class="jr-item">
      <div class="jr-row"><span class="jr-left jr-bold">Trajectory Tracked Builder</span><span class="jr-right">Current</span></div>
      <div class="jr-row jr-sub"><span class="jr-left">Continuous Engineering Roadmap</span><span class="jr-right"></span></div>
      <ul class="jr-bullets">
        <li>Solved ${DB.progress.dsaSolved || 0} Data Structures and Algorithms problems</li>
      </ul>
    </div>
  </section>

  <section>
    <h2>Projects</h2>
    ${projectsHTML || `<div class="jr-item">No shipped projects yet.</div>`}
  </section>

  <section>
    <h2>Technical Skills</h2>
    <div class="jr-skills"><b>Languages &amp; Frameworks:</b> ${esc(skills.join(", "))}</div>
  </section>
</body>
</html>`;
}



function renderResumeChecklist(){
  const host = document.getElementById("resumeChecklist");
  if(!host) return;
  const items = computeResumeReadiness();
  host.innerHTML = items.length
    ? items.map(item=>`
        <div class="resume-check-item ${item.priority}">
          <span class="resume-check-dot"></span>
          <div class="resume-check-body">
            <div class="resume-check-text">${item.text}</div>
            <div class="resume-check-due">${item.dueLabel}</div>
          </div>
        </div>`).join("")
    : `<div class="empty-sub">Your resume looks solid — nothing outstanding right now.</div>`;
}

function renderResume(){
  const r = DB.resume;
  ["email","phone","location","linkedin","portfolio","targetRole","summary"].forEach(key=>{
    const el = document.getElementById("rs"+key.charAt(0).toUpperCase()+key.slice(1));
    if(el) el.value = r[key] || "";
  });

  const skills = getResumeSkills();
  const skillsHost = document.getElementById("resumeSkills");
  if(skillsHost){
    skillsHost.innerHTML = skills.length
      ? skills.map(s=>`<span class="pc-tag">${s}</span>`).join("")
      : `<div class="empty-sub">Ship or start a project to build up your skills list automatically.</div>`;
  }

  const shipped = getShippedProjects();
  const projHost = document.getElementById("resumeProjectsList");
  if(projHost){
    projHost.innerHTML = shipped.length
      ? shipped.map(proj=>`
          <div class="subject-card">
            <h3>${proj.name}</h3>
            <div class="pc-desc">${proj.desc || ""}</div>
            <div class="pc-stack">${(proj.stack||[]).map(t=>`<span class="pc-tag">${t}</span>`).join("")}</div>
            <div class="pc-meta">${proj.repo ? `<a href="${proj.repo}" target="_blank" rel="noopener">Repo ↗</a>` : "No repo linked"}${proj.live ? ` · <a href="${proj.live}" target="_blank" rel="noopener">Live ↗</a>` : ""}</div>
          </div>`).join("")
      : `<div class="empty-sub">No shipped projects yet — mark a build "SHIPPED" on the Projects page and it will land here.</div>`;
  }

  renderResumeChecklist();

  const preview = document.getElementById("resumePreviewText");
  if(preview) preview.textContent = buildResumeText();
}

/* ---------------- RENDER: SETTINGS ---------------- */
function renderOnboardCollegePicker(){
  const sel = document.getElementById("obCollege");
  if(sel) sel.value = onboardCollege;
}

function renderSettings(){
  document.getElementById("stName").value = DB.profile.name || "";
  document.getElementById("stDate").value = DB.profile.startDate || "";
  document.querySelectorAll(".theme-swatch").forEach(btn=>btn.classList.toggle("active", btn.dataset.theme === DB.settings.theme));
  const collegeSel = document.getElementById("collegePicker");
  if(collegeSel) collegeSel.value = DB.settings.college || "hitk";
  const ghInput = document.getElementById("ghUsername");
  const ghSummary = document.getElementById("ghSummary");
  if(ghInput) ghInput.value = DB.github?.username || "";
  if(ghSummary){
    const gh = DB.github || {};
    if(gh.profile){
      const repos = (gh.repos || []).slice(0,3).map(repo=>`<a href="${repo.url}" target="_blank" rel="noopener">${repo.name}${repo.language ? ` · ${repo.language}` : ""}</a>`).join("");
      ghSummary.innerHTML = `<div class="gh-profile"><img src="${gh.profile.avatar}" alt=""><div><a href="${gh.profile.url}" target="_blank" rel="noopener">@${gh.profile.login}</a><span>${gh.profile.publicRepos} public repos · ${gh.profile.followers} followers</span></div></div><div class="gh-repos">${repos || "No recent public repositories found."}</div><div class="sync-note">Synced ${new Date(gh.lastSyncedAt).toLocaleString()}</div>`;
    } else ghSummary.innerHTML = `<div class="empty-sub">Your public GitHub activity will appear here after a sync.</div>`;
  }
  const ltInput = document.getElementById("ltUsername");
  const ltSummary = document.getElementById("ltSummary");
  if(ltInput) ltInput.value = DB.leetcode?.username || "";
  if(ltSummary){
    const lt = DB.leetcode || {};
    if(lt.profile){
      const p = lt.profile;
      ltSummary.innerHTML = `<div class="gh-profile"><div><a href="https://leetcode.com/${lt.username}/" target="_blank" rel="noopener">@${lt.username}</a><span>${p.totalSolved}/${p.totalQuestions} solved · Rank #${p.ranking ?? "—"}</span></div></div><div class="gh-repos"><span>${p.easySolved} easy</span><span>${p.mediumSolved} medium</span><span>${p.hardSolved} hard</span></div><div class="sync-note">Synced ${new Date(lt.lastSyncedAt).toLocaleString()}</div>`;
    } else ltSummary.innerHTML = `<div class="empty-sub">Your public LeetCode stats will appear here after a sync.</div>`;
  }
  const historyList = document.getElementById("historyList");
  if(historyList){
    const history = getHistory().slice(0, 8);
    historyList.innerHTML = history.length ? history.map(item=>`<div class="history-item"><div><strong>${item.reason || "Update"}</strong><span>${new Date(item.at).toLocaleString()}</span></div><button class="btn btn-ghost btn-sm" data-restore-version="${item.id}">Restore</button></div>`).join("") : `<div class="empty-sub">No saved versions yet.</div>`;
    historyList.querySelectorAll("[data-restore-version]").forEach(btn=>btn.addEventListener("click", ()=>{
      const version = getHistory().find(item=>item.id===btn.dataset.restoreVersion);
      if(!version) return;
      openDialog({ eyebrow:"VERSION HISTORY", title:"Restore this version?", copy:`Restore the version from ${new Date(version.at).toLocaleString()}? Your current state will first be saved as a new version.`, confirmLabel:"Restore version", onConfirm:()=>{
        DB = clone(version.data); saveDB("Restored previous version"); applyTheme(); renderAll(); showNotice("Previous version restored.", "success");
      }});
    }));
  }
  const ts = DB.timeSync;
  if(ts.verified){
    document.getElementById("stTimeStatus").textContent = `Verified against an internet time server ${ts.lastSynced ? "· last synced " + new Date(ts.lastSynced).toLocaleTimeString() : ""}. Your device clock can't be changed to skip ahead.`;
  } else {
    document.getElementById("stTimeStatus").textContent = "Couldn't reach a time server (offline, or blocked) — falling back to your device's clock.";
  }
}

function renderAll(){
  renderHome(); renderAcademics(); renderProjects(); renderProgress(); renderResume(); renderSettings();
}

/* ---------------- theme ---------------- */
function applyTheme(){
  const legacy = { dark:"lavender", light:"orchid", ocean:"tide", forest:"tide" };
  const theme = legacy[DB.settings.theme] || DB.settings.theme || "lavender";
  DB.settings.theme = theme;
  document.documentElement.classList.remove("orchid", "auric", "tide");
  if(theme !== "lavender") document.documentElement.classList.add(theme);
  document.getElementById("themeIcon").textContent = DB.settings.theme==="light" ? "☀" : "☾";
  document.getElementById("themeLabel").textContent = ({ lavender:"Nocturne", auric:"Graphite Brass", tide:"Cobalt Slate", orchid:"Soft Orchid" })[theme];
}

/* ---------------- init & events ---------------- */
/* ---------------- CUSTOM SELECT (in-app dropdowns, not browser-native) ---------------- */
function enhanceSelect(select){
  if(!select || select.dataset.enhanced) return;
  select.dataset.enhanced = "1";

  const wrap = document.createElement("div");
  wrap.className = "custom-select-wrap";
  if(select.getAttribute("style")){
    wrap.setAttribute("style", select.getAttribute("style"));
    select.removeAttribute("style");
  }
  select.parentNode.insertBefore(wrap, select);
  wrap.appendChild(select);

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "custom-select-trigger";
  const triggerLabel = document.createElement("span");
  triggerLabel.className = "custom-select-label";
  const chevron = document.createElement("span");
  chevron.className = "custom-select-chevron";
  chevron.textContent = "▾";
  trigger.appendChild(triggerLabel);
  trigger.appendChild(chevron);
  wrap.appendChild(trigger);

  const panel = document.createElement("div");
  panel.className = "custom-select-panel";
  wrap.appendChild(panel);

  function currentLabel(){
    const opt = select.options[select.selectedIndex];
    return opt ? opt.textContent : "";
  }

  function closePanel(){ wrap.classList.remove("open"); }
  function openPanel(){
    document.querySelectorAll(".custom-select-wrap.open").forEach(w=>{ if(w!==wrap) w.classList.remove("open"); });
    wrap.classList.add("open");
    const sel = panel.querySelector(".custom-select-option.selected");
    if(sel) sel.scrollIntoView({block:"nearest"});
  }
  function togglePanel(){ wrap.classList.contains("open") ? closePanel() : openPanel(); }

  function buildPanel(){
    panel.innerHTML = "";
    Array.from(select.options).forEach(opt=>{
      const item = document.createElement("div");
      item.className = "custom-select-option" + (opt.disabled ? " disabled" : "") + (opt.value===select.value ? " selected" : "");
      item.textContent = opt.textContent;
      item.dataset.value = opt.value;
      if(!opt.disabled){
        item.addEventListener("click", ()=>{
          select.value = opt.value;
          select.dispatchEvent(new Event("change", {bubbles:true}));
          closePanel();
        });
      }
      panel.appendChild(item);
    });
  }

  function syncLabel(){
    triggerLabel.textContent = currentLabel();
    trigger.classList.toggle("is-disabled", select.disabled);
    panel.querySelectorAll(".custom-select-option").forEach(el=>{
      el.classList.toggle("selected", el.dataset.value === select.value);
    });
  }

  trigger.addEventListener("click", (e)=>{
    e.stopPropagation();
    if(select.disabled) return;
    togglePanel();
  });
  document.addEventListener("click", (e)=>{ if(!wrap.contains(e.target)) closePanel(); });
  document.addEventListener("keydown", (e)=>{ if(e.key === "Escape") closePanel(); });

  // Underlying <option> list gets rebuilt dynamically elsewhere (e.g. via .innerHTML) — watch for that.
  new MutationObserver(()=>{ buildPanel(); syncLabel(); }).observe(select, {childList:true});

  // App code sometimes sets `select.value = x` directly; intercept so the custom UI stays in sync.
  const valueDescriptor = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, "value");
  Object.defineProperty(select, "value", {
    configurable:true,
    get(){ return valueDescriptor.get.call(this); },
    set(v){ valueDescriptor.set.call(this, v); syncLabel(); }
  });

  select.addEventListener("change", syncLabel);

  buildPanel();
  syncLabel();
}

function enhanceAllSelects(root=document){
  root.querySelectorAll("select").forEach(enhanceSelect);
}

function init(){
  DB = loadDB();
  setActiveCollege(DB.settings.college || "hitk");
  const built = buildScheduleData();
  WEEKS = built.weeks; MONTHS = built.months;
  applyTheme();
  tickClock();
  setInterval(tickClock, 1000);

  onboardCollege = DB.settings.college || "hitk";
  renderOnboardCollegePicker();

  if(!DB.profile.name || !DB.profile.startDate){
    document.getElementById("onboardOverlay").hidden = false;
    document.getElementById("app").hidden = true;
  } else {
    document.getElementById("onboardOverlay").hidden = true;
    document.getElementById("app").hidden = false;
    runAutoUpdate();
    populateAcademicPickers();
    renderAll();
  }
  syncTime();
  setInterval(syncTime, 5*60*1000);

  document.getElementById("obCollege").addEventListener("change", (e)=>{
    onboardCollege = e.target.value;
  });

  document.getElementById("obSubmit").addEventListener("click", ()=>{
    const name = document.getElementById("obName").value.trim();
    const date = document.getElementById("obDate").value;
    if(!name || !date){ showNotice("Please add your name and a start date.", "error"); return; }
    DB.profile.name = name;
    DB.profile.startDate = date;
    DB.profile.createdAt = new Date().toISOString();
    DB.settings.college = onboardCollege || "hitk";
    setActiveCollege(DB.settings.college);
    saveDB();
    document.getElementById("onboardOverlay").hidden = true;
    document.getElementById("app").hidden = false;
    runAutoUpdate();
    populateAcademicPickers();
    renderAll();
  });

  document.querySelectorAll(".nav-link, .tab-link").forEach(btn=>{
    btn.addEventListener("click", ()=>goToPage(btn.dataset.page));
  });
  document.querySelectorAll(".crumb").forEach(btn=>{
    btn.addEventListener("click", ()=>switchTrackingView(btn.dataset.viewport));
  });

  document.getElementById("themeToggle").addEventListener("click", ()=>{
    DB.settings.theme = DB.settings.theme === "orchid" ? "lavender" : "orchid";
    saveDB("Theme changed"); applyTheme(); renderSettings();
  });
  document.querySelectorAll(".theme-swatch").forEach(btn=>btn.addEventListener("click", ()=>{
    DB.settings.theme = btn.dataset.theme;
    saveDB("Theme changed"); applyTheme(); renderSettings();
  }));
  document.getElementById("collegePicker").addEventListener("change", (e)=>{
    const key = e.target.value;
    if(key === (DB.settings.college || "hitk")) return;
    const prevKey = DB.settings.college || "hitk";
    openDialog({
      eyebrow: "SWITCH COLLEGE",
      title: `Switch academics to ${COLLEGES[key]?.label || key}?`,
      copy: "This swaps the semester syllabus and subject list app-wide. Your roadmap, projects and DSA progress are unaffected, but any subjects you've already added under Academics were built for the previous college and won't match the new syllabus — you may want to remove and re-add them.",
      confirmLabel: "Switch college",
      onConfirm: ()=>{
        DB.settings.college = key;
        setActiveCollege(key);
        saveDB("College changed");
        populateAcademicPickers();
        renderAll();
        showNotice(`Academics switched to ${COLLEGES[key]?.label || key}.`, "success");
      }
    });
    e.target.value = prevKey;
  });
  document.getElementById("ghSync").addEventListener("click", async ()=>{
    const button = document.getElementById("ghSync");
    button.disabled = true; button.textContent = "Syncing…";
    try { await syncGitHubProfile(document.getElementById("ghUsername").value); }
    catch(err) { showNotice(err.message || "GitHub sync failed.", "error"); }
    finally { button.disabled = false; button.textContent = "Sync GitHub"; }
  });
  document.getElementById("ltSync").addEventListener("click", async ()=>{
    const button = document.getElementById("ltSync");
    button.disabled = true; button.textContent = "Syncing…";
    try { await syncLeetCodeProfile(document.getElementById("ltUsername").value); }
    catch(err) { showNotice(err.message || "LeetCode sync failed.", "error"); }
    finally { button.disabled = false; button.textContent = "Sync LeetCode"; }
  });

  document.getElementById("acAdd").addEventListener("click", ()=>{
    const name = document.getElementById("acSubjectPick").value.trim();
    const examDate = document.getElementById("acExamDate").value;
    const topics = document.getElementById("acTopics").value
      .split(",")
      .map(topic=>topic.trim())
      .filter(Boolean);
    if(!name){ showNotice("Pick a subject to track.", "error"); return; }
    DB.academics.subjects.push({ id: uid(), name, examDate, topics, tasksDone:{} });
    saveDB();
    document.getElementById("acExamDate").value = "";
    document.getElementById("acTopics").value = "";
    renderAcademics();
  });

  document.getElementById("dsaSave").addEventListener("click", ()=>{
    const v = parseInt(document.getElementById("dsaInput").value, 10);
    DB.progress.dsaSolved = isNaN(v) ? 0 : v;
    saveDB(); renderProgress();
  });

  document.getElementById("stSave").addEventListener("click", ()=>{
    const name = document.getElementById("stName").value.trim();
    const date = document.getElementById("stDate").value;
    if(!name || !date){ showNotice("Name and start date are required.", "error"); return; }
    DB.profile.name = name; DB.profile.startDate = date;
    saveDB(); runAutoUpdate(); renderAll();
  });
  document.getElementById("stResync").addEventListener("click", syncTime);

  document.getElementById("stExport").addEventListener("click", ()=>{
    const blob = new Blob([JSON.stringify(DB, null, 2)], { type:"application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `trajectory-backup-${DB.profile.startDate||"data"}.json`;
    a.click(); URL.revokeObjectURL(url);
  });
  document.getElementById("stImport").addEventListener("click", ()=>{
    openDialog({
      eyebrow:"LOCAL DATABASE", title:"Import backup JSON", copy:"Paste the full contents of a Trajectory backup. This will replace the data currently stored in this browser.",
      confirmLabel:"Import backup", fields:[{ id:"backup", label:"Backup JSON", multiline:true, placeholder:"{ ... }" }],
      onConfirm:({backup})=>{
        try{
          const parsed = JSON.parse(backup);
          DB = Object.assign(clone(DEFAULT_DB), parsed);
          saveDB(); applyTheme();
          document.getElementById("onboardOverlay").hidden = true;
          document.getElementById("app").hidden = false;
          runAutoUpdate(); populateAcademicPickers(); renderAll();
          showNotice("Backup imported.", "success");
        }catch(err){ showNotice("That text couldn't be read as a valid backup.", "error"); }
      }
    });
  });
  document.getElementById("stReset").addEventListener("click", ()=>{
    openDialog({ eyebrow:"DANGER ZONE", title:"Reset all local data?", copy:"This permanently erases your profile, schedule progress, subjects, and saved versions from this browser.", confirmLabel:"Reset all data", danger:true, onConfirm:()=>{
      // Clear every schema generation so the migration path cannot restore old data.
      [DB_KEY, HISTORY_KEY, "trajectoryDB_v1", "trajectoryDB_v2"].forEach(key=>localStorage.removeItem(key));
      location.reload();
    }});
  });
  document.getElementById("stClearHistory").addEventListener("click", ()=>{
    openDialog({ eyebrow:"VERSION HISTORY", title:"Clear saved versions?", copy:"Your current database will remain, but all prior versions will be removed.", confirmLabel:"Clear history", danger:true, onConfirm:()=>{
      localStorage.removeItem(HISTORY_KEY); renderSettings(); showNotice("Saved versions cleared.", "success");
    }});
  });

  document.getElementById("rsSave").addEventListener("click", ()=>{
    ["email","phone","location","linkedin","portfolio","targetRole","summary"].forEach(key=>{
      const el = document.getElementById("rs"+key.charAt(0).toUpperCase()+key.slice(1));
      if(el) DB.resume[key] = el.value.trim();
    });
    saveDB("Resume details updated");
    renderResume();
    showNotice("Resume details saved.", "success");
  });

  document.getElementById("rsCopy").addEventListener("click", async ()=>{
    try{
      await navigator.clipboard.writeText(buildResumeText());
      showNotice("Resume copied to clipboard.", "success");
    }catch(err){
      showNotice("Couldn't copy automatically — select the text and copy manually.", "error");
    }
  });

  document.getElementById("rsDownloadTxt").addEventListener("click", ()=>{
    const blob = new Blob([buildResumeText()], { type:"text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${(DB.profile.name||"resume").replace(/\s+/g,"_")}-resume.txt`;
    a.click(); URL.revokeObjectURL(url);
  });

  document.getElementById("rsDownloadMd").addEventListener("click", ()=>{
    const r = DB.resume;
    const skills = getResumeSkills();
    const shipped = getShippedProjects();
    const college = COLLEGES[DB.settings.college]?.label || "";
    const sem = currentSemesterIndex()+1;
    let md = `# ${DB.profile.name || "Your Name"}\n\n`;
    const contactBits = [r.email, r.phone, r.location, r.linkedin, r.portfolio].filter(Boolean);
    if(contactBits.length) md += `${contactBits.join(" · ")}\n\n`;
    if(r.targetRole) md += `**Target role:** ${r.targetRole}\n\n`;
    if(r.summary) md += `${r.summary}\n\n`;
    md += `## Education\n${college}${college?" — ":""}Semester ${sem}${DB.progress.dsaSolved ? ` · ${DB.progress.dsaSolved} DSA problems solved` : ""}\n\n`;
    if(skills.length) md += `## Skills\n${skills.join(", ")}\n\n`;
    if(shipped.length){
      md += `## Projects\n`;
      shipped.forEach(proj=>{
        md += `**${proj.name}**${proj.stack.length ? ` — ${proj.stack.join(", ")}` : ""}\n`;
        if(proj.desc) md += `${proj.desc}\n`;
        const links = [proj.repo ? `[Repo](${proj.repo})` : "", proj.live ? `[Live](${proj.live})` : ""].filter(Boolean).join(" · ");
        if(links) md += `${links}\n`;
        md += `\n`;
      });
    }
    if(DB.github && DB.github.profile){
      md += `## GitHub\n[@${DB.github.profile.login}](${DB.github.profile.url}) — ${DB.github.profile.publicRepos} public repos, ${DB.github.profile.followers} followers\n`;
    }
    const blob = new Blob([md], { type:"text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${(DB.profile.name||"resume").replace(/\s+/g,"_")}-resume.md`;
    a.click(); URL.revokeObjectURL(url);
  });

  document.getElementById("rsExportPdf")?.addEventListener("click", ()=>{
    const html = buildJakesResumeHTML();
    const win = window.open("", "_blank");
    if(!win){
      showNotice("Couldn't open the export window — check your browser's pop-up blocker.", "error");
      return;
    }
    win.document.open();
    win.document.write(html);
    win.document.close();
    const triggerPrint = ()=>{ win.focus(); win.print(); };
    if(win.document.fonts && win.document.fonts.ready){
      win.document.fonts.ready.then(triggerPrint).catch(triggerPrint);
    } else {
      win.onload = triggerPrint;
    }
    // Fallback in case font loading hangs
    setTimeout(triggerPrint, 1500);
  });

  document.querySelectorAll("#yearTabs .tab-btn").forEach(b=>{
    b.addEventListener("click", ()=>{ projectsFilter = b.dataset.filter; renderProjects(); });
  });
  document.getElementById("newBuildBtn").addEventListener("click", ()=>{
    document.getElementById("newBuildModal").hidden = false;
  });
  document.getElementById("nbCancel").addEventListener("click", ()=>{
    document.getElementById("newBuildModal").hidden = true;
  });
  document.getElementById("nbSave").addEventListener("click", ()=>{
    const name = document.getElementById("nbName").value.trim();
    if(!name){ showNotice("Give your build a name.", "error"); return; }
    const desc = document.getElementById("nbDesc").value.trim();
    const stack = document.getElementById("nbStack").value.split(",").map(s=>s.trim().toUpperCase()).filter(Boolean);
    const stars = parseInt(document.getElementById("nbStars").value,10);
    DB.projects.custom.push({ id: uid(), name, desc, stack, stars, status:"planned" });
    saveDB();
    document.getElementById("nbName").value = "";
    document.getElementById("nbDesc").value = "";
    document.getElementById("nbStack").value = "";
    document.getElementById("newBuildModal").hidden = true;
    projectsFilter = "all";
    renderProjects();
  });

  enhanceAllSelects();
}

document.addEventListener("DOMContentLoaded", init);
