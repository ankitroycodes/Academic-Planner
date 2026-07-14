
const DB_KEY = "trajectoryDB_v3";
const HISTORY_KEY = "trajectoryDB_history_v1";
const DB_VERSION = 3;

const DEFAULT_DB = window.DEFAULT_DB || {
  profile: { name: "", startDate: "", createdAt: "", track: null },
  settings: { theme: "lavender", college: DEFAULT_COLLEGE_ID },
  schedule: { currentIndex: 0, offsetDays: 0, weekStatus: {}, weekTaskDone: {} },
  academics: { subjects: [] },
  projects: { shipped: {}, started: {}, meta: {}, custom: [], submissions: [] },
  progress: { dsaSolved: 0 },
  prep: { done: {} },
  timeSync: { offsetMs: 0, lastSynced: null, verified: false },
  tracking: { dailyLogs: {}, historicalPerformance: [] },
  github: { username: "", profile: null, repos: [], events: [], lastSyncedAt: null, verifiedIdentity: false },
  leetcode: { username: "", profile: null, lastSyncedAt: null },
  codeforces: { username: "", profile: null, lastSyncedAt: null },
  codechef: { username: "", profile: null, lastSyncedAt: null },
  resume: { email: "", phone: "", location: "", linkedin: "", portfolio: "", targetRole: "", summary: "" }
};

let DB = null;
let WEEKS = [];
let MONTHS = [];
let projectsFilter = "all";
let activeTrackingViewport = "month";
let selectedTrackingMonthIndex = null;
let selectedTrackingWeekIndex = null;
let onboardCollege = DEFAULT_COLLEGE_ID;
let obQuizIndex = 0;
let obQuizAnswers = {};
let obResultTrack = null;

const CURATED_PROJECTS = {
  beginner: [
    { id: "b1", name: "Developer Toolbox CLI", category: "Productivity & Dev Tools", desc: "Command-line interface loaded with automated file/string transformations and development tools.", stack: ["Node.js", "Commander", "Chalk"] },
    { id: "b2", name: "Smart File Organizer", category: "Productivity & Dev Tools", desc: "Background script or utility that watches directories and auto-organizes downloads based on file type.", stack: ["Python", "Watchdog"] },
    { id: "b3", name: "Markdown Knowledge Base", category: "Productivity & Dev Tools", desc: "A fast, plain-text wiki rendering internal Markdown documentation links into hyperlinked notes.", stack: ["React", "Markdown-it"], required: true },
    { id: "b4", name: "Portfolio CMS", category: "Web Applications", desc: "A lightweight administrative engine allowing real-time edits to professional showcase sections.", stack: ["React", "Node.js", "Express", "MongoDB"], required: true },
    { id: "b5", name: "Habit & Study Tracker", category: "Web Applications", desc: "Log personal habits, compute daily streaks, and chart study curves over time.", stack: ["Vue.js", "LocalStorage"] },
    { id: "b6", name: "Bookmark Manager", category: "Web Applications", desc: "Organize collections of engineering resource references with custom search tagging dashboards.", stack: ["HTML5", "CSS3", "JavaScript"] },
    { id: "b7", name: "Receipt & Expense Tracker", category: "Business Utilities", desc: "Scan, log, and parse company expenses to output instant downloadable monthly financial lists.", stack: ["React", "Tailwind CSS"], required: true },
    { id: "b8", name: "Invoice Generator", category: "Business Utilities", desc: "A dynamic quote and bill engine compiling professional client-facing PDFs securely.", stack: ["Node.js", "PDFKit", "Express"] },
    { id: "b9", name: "URL Shortener", category: "Business Utilities", desc: "Core lookup service mapping short tokens to long URLs alongside real-time click tracking arrays.", stack: ["Node.js", "Redis", "Express"], required: true }
  ],
  intermediate: [
    { id: "i1", name: "CRM Lite", category: "Business Software", desc: "Track Customers, manage incoming Leads, record call Notes, and map out interactive Sales Pipelines.", stack: ["Next.js", "Prisma", "PostgreSQL"], required: true },
    { id: "i2", name: "Inventory & Billing System", category: "Business Software", desc: "Monitor stock levels, integrate simulated Barcodes, compile direct Invoices, and output profit Reports.", stack: ["React Native", "SQLite"] },
    { id: "i3", name: "Helpdesk & Ticketing", category: "Business Software", desc: "Coordinate customer support issues using granular Priorities, custom assignees, and media Attachments.", stack: ["Django", "PostgreSQL"] },
    { id: "i4", name: "Appointment Booking SaaS", category: "Business Software", desc: "Multi-tenant slot allocation software perfectly tailored for Doctors, Salons, and Tutors.", stack: ["SvelteKit", "Supabase"], required: true },
    { id: "i5", name: "Project Management Platform", category: "Business Software", desc: "Collaborative agile tracking board engineered with collaborative Kanbans, Teams, and detailed Tasks.", stack: ["Angular", "NestJS", "MongoDB"] },
    { id: "i6", name: "Personal Finance Dashboard", category: "Productivity", desc: "Aggregate ongoing Expenses, configure test investment portfolios, and establish future automated saving Goals.", stack: ["React", "Chart.js", "FastAPI"], required: true }
  ],
  major: [
    { id: "m1", name: "AI Academic OS (Trajectory)", category: "Capstone", desc: "Complete ecosystem managing Academic Planning, Milestones, Resumes, and predictive AI analytics.", stack: ["Next.js", "OpenAI", "Python", "PostgreSQL"], required: true },
    { id: "m2", name: "Business ERP Lite", category: "Capstone", desc: "All-in-one company backend managing master Inventory, Employee payroll lists, Sales pipelines, and operational Reports.", stack: ["Spring Boot", "React", "Docker", "AWS"], required: true },
    { id: "m3", name: "AI Knowledge Platform", category: "Capstone", desc: "Upload complex PDF documents to invoke contextual Semantic Chat pipelines with automatic abstract Summaries.", stack: ["FastAPI", "LangChain", "Pinecone", "Next.js"] }
  ]
};

/* ---------------- storage ---------------- */
function clone(obj){ return obj === undefined ? {} : JSON.parse(JSON.stringify(obj)); }

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
  dialog.classList.remove("modal-has-error");
  document.getElementById("appDialogCopy").classList.remove("field-error-text");
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

let historyCache = [];

function storageGet(key){
  try{ return localStorage.getItem(key); }catch(e){ return null; }
}
function storageSet(key, value){
  try{ localStorage.setItem(key, value); return true; }catch(e){ console.warn("storage.set failed", key, e); return false; }
}
function storageDelete(key){
  try{ localStorage.removeItem(key); }catch(e){ /* nothing to delete */ }
}

function mergeWithDefaults(parsed){
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
    codeforces: Object.assign(clone(DEFAULT_DB.codeforces), parsed.codeforces),
    codechef: Object.assign(clone(DEFAULT_DB.codechef), parsed.codechef),
    resume: Object.assign(clone(DEFAULT_DB.resume), parsed.resume)
  });
}

 function loadDB(){
  try{
    const raw = storageGet(DB_KEY);
    if(raw){
      DB = mergeWithDefaults(JSON.parse(raw));
    } else {
      const oldRaw = storageGet("trajectoryDB_v2") || storageGet("trajectoryDB_v1");
      DB = oldRaw ? mergeWithDefaults(JSON.parse(oldRaw)) : clone(DEFAULT_DB);
    }
  }catch(e){
    console.warn("DB load failed, using defaults", e);
    DB = clone(DEFAULT_DB);
  }
  try{
    const rawHistory = storageGet(HISTORY_KEY);
    historyCache = rawHistory ? JSON.parse(rawHistory) : [];
  }catch(e){
    historyCache = [];
  }
  return DB;
}
function getHistory(){
  return historyCache;
}
function saveDB(reason){
  try{
    DB.schemaVersion = DB_VERSION;
    DB.updatedAt = new Date().toISOString();
    const serialized = JSON.stringify(DB);
    const ok = storageSet(DB_KEY, serialized);
    if(!ok){
      showNotice("Couldn't save your changes (browser storage is unavailable or blocked). Your last action may be lost on refresh.", "error");
      return false;
    }

    const latest = historyCache[0] && historyCache[0].data;
    const comparable = clone(DB); delete comparable.updatedAt;
    const previous = latest ? clone(latest) : null;
    if(previous) delete previous.updatedAt;
    if(!previous || JSON.stringify(comparable) !== JSON.stringify(previous)){
      const snapshot = { id: uid() + Date.now().toString(36), at: DB.updatedAt, reason: reason || "Update", data: clone(DB) };
      historyCache.unshift(snapshot);
      historyCache = historyCache.slice(0, 40);
      const historyOk = storageSet(HISTORY_KEY, JSON.stringify(historyCache));
      if(!historyOk){
        console.warn("history save failed (main data still saved)");
      }
    }
    return true;
  }catch(e){
    console.warn("save failed", e);
    const isQuota = e && (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED" || e.code === 22);
    showNotice(
      isQuota
        ? "Storage is full — your last change wasn't saved. Export a backup from Settings, then clear old data to free up space."
        : "Couldn't save your changes (browser storage is unavailable or blocked). Your last action may be lost on refresh.",
      "error"
    );
    return false;
  }
}

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
          : [`Advance chosen roadmap milestone`, "Log a concrete deliverable before the next week"];
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
  const history = Array.isArray(DB.tracking?.historicalPerformance) ? DB.tracking.historicalPerformance : [];
  const entry = history.find(item => String(item.monthIndex) === String(monthIndex));
  if (entry && entry.value !== undefined) {
    return Math.max(0, Math.min(1, Number(entry.value)));
  }

  const WEIGHTS = { project: 3.0, skill: 2.0, academic: 1.5, base: 1.0 };
  let earned = 0;
  let possible = 0;
  const baseWeek = monthIndex * 4;

  for (let w = 0; w < 4; w++) {
    const weekIdx = baseWeek + w;
    const weekData = WEEKS[weekIdx];
    if (!weekData) continue;

    const doneTasks = DB.schedule.weekTaskDone[String(weekIdx)] || [];
    weekData.tasks.forEach(task => {
      let weight = WEIGHTS.base;
      if (/project|milestone|ship|deploy|build/i.test(task.text)) weight = WEIGHTS.project;
      else if (/dsa|solve|code|algorithm/i.test(task.text)) weight = WEIGHTS.skill;
      else if (/review|summary|concept|study/i.test(task.text)) weight = WEIGHTS.academic;

      possible += weight;
      if (doneTasks.includes(task.id)) earned += weight;
    });

    const weekDate = weekDueDate(weekIdx);
    if (weekDate) {
      for (let d = 0; d < 7; d++) {
        const dayKey = getWeekKey(addDays(weekDate, d));
        const dayLogs = DB.tracking?.dailyLogs?.[dayKey] || {};
        
        Object.entries(dayLogs).forEach(([taskId, isDone]) => {
          let weight = WEIGHTS.base;
          if (taskId.startsWith("project:")) weight = WEIGHTS.project;
          else if (taskId.startsWith("skill:")) weight = WEIGHTS.skill;
          else if (taskId.startsWith("academic:")) weight = WEIGHTS.academic;
          
          const dailyPulseWeight = weight * 0.15;
          possible += dailyPulseWeight;
          if (isDone) earned += dailyPulseWeight;
        });
      }
    }
    
    if (possible === 0) {
      const status = DB.schedule.weekStatus[weekIdx];
      possible += 1;
      if (status === "done") earned += 1;
      else if (status === "partial") earned += 0.5;
    }
  }

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
  showNotice("Calendar file downloaded — import it into Google Calendar, Outlook, or Apple Calendar.", "success");
}

class RepoValidationError extends Error {
  constructor(step, message){
    super(message);
    this.name = "RepoValidationError";
    this.step = step; // which pipeline stage failed, for display/logging
  }
}
async function verifyAndSubmitRepo(projectKey, repoString, projectLabel){
  const trimmed = (repoString || "").trim();
  const attempt = { id: uid(), projectKey, projectLabel: projectLabel || projectKey, input: trimmed, at: new Date().toISOString() };

  const fail = (step, message)=>{
    attempt.ok = false; attempt.step = step; attempt.error = message;
    DB.projects.submissions = DB.projects.submissions || [];
    DB.projects.submissions.unshift(attempt);
    DB.projects.submissions = DB.projects.submissions.slice(0, 100);
    saveDB();
    throw new RepoValidationError(step, message);
  };

  // Step 1 — URL format validation
  if(!trimmed) fail("format", "Enter a GitHub repository URL.");
  const matched = trimmed.match(/^(?:https?:\/\/)?(?:www\.)?github\.com[/:]([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+?)(?:\.git)?\/?$/i)
    || trimmed.match(/^([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)$/);
  if(!matched) fail("format", "That doesn't look like a valid GitHub repo URL. Use https://github.com/owner/repo or owner/repo.");
  const [, owner, repo] = matched;

  const connectedUsername = (DB.github && DB.github.username || "").trim();
  if(!connectedUsername) fail("identity", "Connect your GitHub account in Settings before submitting a repository.");

  let response;
  try{
    response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "Trajectory-App" }
    });
  }catch(networkErr){
    fail("network", "Couldn't reach GitHub. Check your connection and try again.");
  }
  if(response.status === 404) fail("existence", `Repository "${owner}/${repo}" doesn't exist or isn't visible.`);
  if(response.status === 403) fail("network", "GitHub is rate-limiting this browser. Wait a bit and try again.");
  if(!response.ok) fail("existence", `GitHub returned an error (${response.status}) looking up this repository.`);
  const data = await response.json();

  if(data.private) fail("visibility", `"${owner}/${repo}" is private. Only public repositories can be submitted.`);

  const repoOwner = (data.owner && data.owner.login || owner).toLowerCase();
  if(repoOwner !== connectedUsername.toLowerCase()){
    fail("ownership", `"${owner}/${repo}" belongs to @${repoOwner}, not your connected account @${connectedUsername}. Submit a repository you own.`);
  }

  let readmeAvailable = false;
  try{
    const readmeRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "Trajectory-App" }
    });
    readmeAvailable = readmeRes.ok;
  }catch(e){ /* best-effort; missing README shouldn't block submission */ }

  const meta = {
    repo: `https://github.com/${owner}/${repo}`,
    repoName: `${owner}/${repo}`,
    description: data.description || "",
    language: data.language || "",
    license: data.license ? data.license.spdx_id : null,
    topics: Array.isArray(data.topics) ? data.topics : [],
    visibility: data.private ? "private" : "public",
    stars: data.stargazers_count,
    forks: data.forks_count,
    openIssues: data.open_issues_count,
    defaultBranch: data.default_branch,
    createdAt: data.created_at,
    pushedAt: data.pushed_at,
    readmeAvailable,
    verifiedOwner: connectedUsername,
    verifiedAt: new Date().toISOString(),
    lastSyncedAt: new Date().toISOString()
  };
  meta.qualityScore = computeRepoQualityScore(meta, data);

  DB.projects.meta[projectKey] = Object.assign(DB.projects.meta[projectKey] || {}, meta);
  DB.projects.shipped[projectKey] = true;
  DB.projects.started[projectKey] = true;

  attempt.ok = true; attempt.step = "complete"; attempt.qualityScore = meta.qualityScore; attempt.repoName = meta.repoName;
  DB.projects.submissions = DB.projects.submissions || [];
  DB.projects.submissions.unshift(attempt);
  DB.projects.submissions = DB.projects.submissions.slice(0, 100);

  const saved = saveDB(`Shipped ${meta.repoName}`);
  if(!saved){
    throw new Error("Repository was verified, but your progress couldn't be saved. See the notice above for details.");
  }
  renderProjects(); renderHome(); renderResume();
  return DB.projects.meta[projectKey];
}

function computeRepoQualityScore(meta, raw){
  let score = 0;
  if(meta.readmeAvailable) score += 30;
  if(meta.license) score += 15;
  if(meta.description && meta.description.trim().length >= 10) score += 15;
  if(meta.topics && meta.topics.length > 0) score += 10;
  if(!raw.archived) score += 5;
  const pushedDaysAgo = meta.pushedAt ? (Date.now() - new Date(meta.pushedAt).getTime()) / 86400000 : Infinity;
  if(pushedDaysAgo <= 30) score += 15;
  else if(pushedDaysAgo <= 90) score += 8;
  if((raw.size || 0) > 20) score += 10; // non-trivial repo (size in KB)
  return Math.max(0, Math.min(100, score));
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
    lastSyncedAt: new Date().toISOString(),
    verifiedIdentity: true
  };
  saveDB("GitHub profile sync");
  renderSettings();
  renderProjects();
}

async function syncLeetCodeProfile(username){
  const clean = (username || "").trim();
  if(!clean) throw new Error("Enter a LeetCode username first.");
  const response = await fetch(`https://alfa-leetcode-api.onrender.com/${encodeURIComponent(clean)}`);
  if(!response.ok) throw new Error("LeetCode API is rate-limiting or unavailable. Try again later.");
  const stats = await response.json();
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

async function syncCodeforcesProfile(username){
  const clean = (username || "").trim();
  if(!clean) throw new Error("Enter a Codeforces handle first.");
  let response;
  try{
    response = await fetch(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(clean)}`);
  }catch(networkErr){
    throw new Error("Codeforces couldn't be reached from the browser (their API doesn't allow direct browser requests). Try again later — this isn't a problem with your handle.");
  }
  if(!response.ok) throw new Error("Codeforces API is unavailable right now. Try again later.");
  const payload = await response.json();
  if(payload.status !== "OK" || !payload.result || !payload.result[0]){
    throw new Error("Codeforces handle not found.");
  }
  const p = payload.result[0];
  DB.codeforces = {
    username: clean,
    profile: {
      handle: p.handle,
      rating: p.rating ?? null,
      maxRating: p.maxRating ?? null,
      rank: p.rank ?? null,
      maxRank: p.maxRank ?? null,
      avatar: p.avatar || p.titlePhoto || ""
    },
    lastSyncedAt: new Date().toISOString()
  };
  saveDB("Codeforces profile sync");
  renderSettings();
}

async function syncCodeChefProfile(username){
  const clean = (username || "").trim();
  if(!clean) throw new Error("Enter a CodeChef username first.");
  let response;
  try{
    response = await fetch(`https://codechef-api.vercel.app/handle/${encodeURIComponent(clean)}`);
  }catch(networkErr){
    throw new Error("CodeChef sync is temporarily unavailable (unofficial API unreachable). Try again later.");
  }
  if(!response.ok) throw new Error("CodeChef sync is temporarily unavailable. Try again later.");
  const stats = await response.json();
  if(stats.success === false || !stats.username){
    throw new Error("CodeChef username not found.");
  }
  DB.codechef = {
    username: clean,
    profile: {
      rating: stats.currentRating ?? stats.rating ?? null,
      highestRating: stats.highestRating ?? null,
      stars: stats.stars ?? null,
      globalRank: stats.globalRank ?? null,
      countryRank: stats.countryRank ?? null
    },
    lastSyncedAt: new Date().toISOString()
  };
  saveDB("CodeChef profile sync");
  renderSettings();
}

function wireAsyncSyncButton(buttonId, inputId, action, errorFallback){
  const button = document.getElementById(buttonId);
  if(!button) return;
  button.addEventListener("click", async ()=>{
    button.disabled = true; button.classList.add("btn-loading");
    try {
      const inputEl = inputId ? document.getElementById(inputId) : null;
      await action(inputEl ? inputEl.value : undefined);
    } catch(err) {
      showNotice(err.message || errorFallback, "error");
    } finally {
      button.disabled = false; button.classList.remove("btn-loading");
    }
  });
}

const PRACTICAL_SUBJECT_EXCLUDE = new Set([
  "physics & electronics labs", "design thinking lab", "industry competence lab",
  "internship & major project phase-i", "major project-ii", "comprehensive viva",
  "skill development", "final presentation", "workshop", "life skills & professional communication lab",
  "engineering drawing & design", "unix programming lab", "competitive programming-i", "competitive programming-ii",
  "competitive programming-iii", "summer training-i", "summer training-ii", "summer training-iii",
  "full stack development lab", "logical and quantitative techniques-i", "logical and quantitative techniques-ii",
  "selected value-added course", "soft skills for employability", "minor project", "major project part-1", "major project part-2"
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

  const trackBadge = document.getElementById("homeTrackBadge");
  if(trackBadge){
    const track = TRACKS[DB.profile.track];
    if(track){ trackBadge.hidden = false; trackBadge.textContent = track.label; }
    else trackBadge.hidden = true;
  }

  const dayCounter = document.getElementById("dayCounter");
  const prepBanner = document.getElementById("prepBanner");

  if(start && start > today){
    const daysTo = diffDays(start, today);
    dayCounter.textContent = `T-MINUS ${daysTo}D`;
    prepBanner.hidden = false;

    const tierCap = daysTo <= 10 ? 1 : daysTo <= 30 ? 2 : daysTo <= 60 ? 3 : 4;
    const modeLabel = daysTo <= 10 ? "SPRINT MODE — ESSENTIALS ONLY" : daysTo <= 30 ? "FOUNDATIONS MODE" : daysTo <= 60 ? "BUILDING MOMENTUM" : "FULL RUNWAY";

    const prepSections = [
      ["skill", CURRICULUM.prep.skill],
      ["academic", CURRICULUM.prep.academic],
      ["project", CURRICULUM.prep.project]
    ];
    const visibleOf = sec => sec.tasks.filter(t => t.tier <= tierCap || DB.prep.done[t.id]);
    const totalTasks = prepSections.reduce((sum, [,sec])=>sum + visibleOf(sec).length, 0);
    const doneCount = prepSections.reduce((sum, [,sec])=>sum + visibleOf(sec).filter(t=>DB.prep.done[t.id]).length, 0);
    const pct = totalTasks ? Math.round((doneCount/totalTasks)*100) : 0;
    const ringCirc = 251.2;
    const ringOffset = ringCirc - (ringCirc * pct / 100);
    const allDone = doneCount === totalTasks && totalTasks > 0;
    const hiddenTaskCount = prepSections.reduce((sum, [,sec])=>sum + sec.tasks.filter(t=>t.tier > tierCap && !DB.prep.done[t.id]).length, 0);

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
          <div class="sem-meta">${daysTo} day${daysTo===1?"":"s"} to get ahead · ${doneCount}/${totalTasks} done${hiddenTaskCount ? ` · ${hiddenTaskCount} more unlock as your date gets closer` : ""}</div>
        </div>
        <div class="prep-ready-badge ${allDone?"":"locked"}">${allDone?"✓ MISSION READY":modeLabel}</div>
      </div>
      <div class="prep-grid">
        ${prepSections.map(([key, sec])=>{
          const tasks = visibleOf(sec);
          const sectionDone = tasks.filter(t=>DB.prep.done[t.id]).length;
          return `
          <div class="prep-track-card">
            <div class="prep-track-head">
              <div class="prep-track-title">${sec.title}</div>
              <div class="prep-track-count">${sectionDone}/${tasks.length}</div>
            </div>
            <ul class="prep-track-list">
              ${tasks.map(t=>{
                const isDone = !!DB.prep.done[t.id];
                return `
                <li class="${isDone?"done":""}">
                  <input type="checkbox" data-prep="${key}:${t.id}" data-prep-id="${t.id}" ${isDone?"checked":""}>
                  <label>${t.text}</label>
                </li>`;
              }).join("")}
            </ul>
          </div>`;
        }).join("")}
      </div>`;
    prepBanner.querySelectorAll("[data-prep]").forEach(cb=>{
      cb.addEventListener("change", ()=>{ DB.prep.done[cb.dataset.prepId]=cb.checked; saveDB(); renderHome(); });
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
}

/* ---------------- RENDER: PROJECTS (Gamified Choice-Based Roadmaps) ---------------- */
// "Shipped" is no longer a manual toggle — it is only set by a verified repo
// submission (see verifyAndSubmitRepo). This just moves planned -> in-progress,
// or lets you step back to planned before you've shipped.
function toggleStartedStatus(id){
  if(DB.projects.shipped[id]) return; // shipped projects are locked; verified submission is the only path off "shipped"
  DB.projects.started[id] = !DB.projects.started[id];
  saveDB(); renderProjects(); renderHome(); renderResume();
}

function qualityScoreHTML(meta){
  if(typeof meta.qualityScore !== "number") return "";
  const tier = meta.qualityScore>=70 ? "high" : meta.qualityScore>=40 ? "mid" : "low";
  return `<div class="project-quality-score" data-score-tier="${tier}">
    <span>Quality ${meta.qualityScore}/100</span>
    <span class="quality-bar"><span class="quality-bar-fill" data-tier="${tier}" style="width:${meta.qualityScore}%"></span></span>
  </div>`;
}

/** Shared badge class/label pair for a project's shipped/progress/planned status. */
function statusBadge(status){
  return {
    cls: status==="shipped" ? "badge-shipped" : status==="progress" ? "badge-progress" : "badge-planned",
    label: status==="shipped" ? "SHIPPED" : status==="progress" ? "IN PROGRESS" : "PLANNED"
  };
}

/** Shared "tag pill" list renderer, e.g. tech stack or skill tags. */
function tagPillsHTML(items){
  return (items||[]).map(t=>`<span class="pc-tag">${t}</span>`).join("");
}

/** Star rating markup, e.g. "★★★★☆☆" for count=4 out of 6. */
function starRatingHTML(count){
  const c = Math.max(0, Math.min(6, count));
  return "★".repeat(c) + "☆".repeat(6-c);
}

/**
 * Shared card renderer for both curated and custom projects. The two kinds
 * differ only in: id source, category/module label, description styling,
 * star count derivation, meta-line content, and submit-button dataset flag —
 * everything else (badges, quality score, verified badge, actions shell)
 * was previously duplicated verbatim between projectCardHTML/customCardHTML.
 */
function projectCardHTMLShared({ id, name, desc, descClass, stack, category, stars, status, metaLineHTML, githubStatsHTML, isCustom, isRecommended }){
  const isShipped = status === "shipped";
  const badge = statusBadge(status);
  const meta = DB.projects.meta[id] || {};
  const qualityLine = isShipped ? qualityScoreHTML(meta) : "";
  const verifiedBadge = isShipped && meta.verifiedOwner ? `<span class="badge badge-verified" title="Owner verified at submission">✓ @${meta.verifiedOwner}</span>` : "";
  const recommendedBadge = isRecommended ? `<span class="badge badge-recommended" title="Part of the suggested 4/3/2 core build path">Core pick</span>` : "";
  const isCurrent = status === "progress";

  const startBtn = isShipped
    ? `<button class="btn btn-primary btn-sm" disabled>Shipped ✓</button>`
    : `<button class="btn btn-ghost btn-sm" data-${isCustom ? "custom-start" : "toggle-start-pid"}="${id}">${status==="progress" ? "In progress" : "Start"}</button>`;
  const submitBtn = `<button class="pc-code-btn" data-submit-pid="${id}"${isCustom ? ' data-submit-custom="1"' : ""} title="${isShipped ? "View or replace" : "Submit"} verified repository">${isShipped ? "&lt;/&gt;" : "Submit repo"}</button>`;

  return `
    <div class="project-card ${isCurrent?'is-current':''} ${isShipped?'is-shipped':''}" data-${isCustom ? "custom" : "pid"}="${id}">
      <div class="pc-top">
        <div class="pc-badges">
          <span class="badge ${badge.cls}">${badge.label}</span>
          <span class="badge badge-module">${category}</span>
          ${recommendedBadge}
          ${verifiedBadge}
        </div>
      </div>
      <div class="pc-title">${name}</div>
      <div class="${descClass}">${desc || ""}</div>
      <div class="pc-stack">${tagPillsHTML(stack)}</div>
      ${githubStatsHTML || ""}
      ${qualityLine}
      <div class="pc-foot">
        <div class="pc-meta">${metaLineHTML}</div>
        <div class="pc-actions">
          ${startBtn}
          ${submitBtn}
        </div>
      </div>
    </div>`;
}

function projectCardHTML(proj, level){
  const id = proj.id;
  const isShipped = !!DB.projects.shipped[id];
  const isStarted = !!DB.projects.started[id];
  const status = isShipped ? "shipped" : isStarted ? "progress" : "planned";

  const starCountMap = { beginner: 2, intermediate: 4, major: 6 };
  const meta = DB.projects.meta[id] || {};
  const metaLineHTML = (meta.repo ? `<a href="${meta.repo}" target="_blank" rel="noopener">Repo ↗</a>` : "No Repo")
    + (meta.live ? ` | <a href="${meta.live}" target="_blank" rel="noopener">Live ↗</a>` : " | Not Live");
  const githubStatsHTML = meta.lastSyncedAt
    ? `<div class="project-github-stats">GitHub · ${meta.language || "code"} · ${meta.stars || 0} stars · ${meta.openIssues || 0} open issues</div>`
    : "";

  return projectCardHTMLShared({
    id, name: proj.name, desc: proj.desc, descClass: "pc-desc", stack: proj.stack,
    category: proj.category, stars: starCountMap[level] || 2, status, metaLineHTML, githubStatsHTML, isCustom: false, isRecommended: !!proj.required
  });
}

function customCardHTML(c){
  return projectCardHTMLShared({
    id: c.id, name: c.name, desc: c.desc, descClass: "pc-desc pc-desc-mono", stack: c.stack,
    category: "CUSTOM AI BUILD", stars: c.stars || 5, status: c.status, metaLineHTML: "Custom Scoped", isCustom: true
  });
}

function renderProjectsSummary() {
  const tierMeta = {
    beginner: { label: "Beginner Projects", colorVar: "--accent", dimVar: "--accent-dim" },
    intermediate: { label: "Intermediate Projects", colorVar: "--amber", dimVar: "--amber-dim" },
    major: { label: "Major Capstone", colorVar: "--green", dimVar: "--green-dim" }
  };

  const groups = ["beginner", "intermediate", "major"].map(key=>{
    const all = CURATED_PROJECTS[key];
    const required = all.filter(p=>p.required);
    const requiredShipped = required.filter(p=>DB.projects.shipped[p.id]).length;
    const totalShipped = all.filter(p=>DB.projects.shipped[p.id]).length;
    return { key, ...tierMeta[key], requiredTotal: required.length, requiredShipped, allTotal: all.length, totalShipped };
  });

  const cards = groups.map(g=>{
    const complete = g.requiredShipped >= g.requiredTotal;
    const pct = g.requiredTotal ? Math.round((g.requiredShipped / g.requiredTotal) * 100) : 0;
    const bonusShipped = g.totalShipped - g.requiredShipped;
    const bonusNote = bonusShipped > 0 ? `<div class="roadmap-tier-bonus">+${bonusShipped} bonus build${bonusShipped===1?"":"s"} shipped</div>` : "";
    return `
      <div class="roadmap-tier-card" style="--tier-color:var(${g.colorVar}); --tier-dim:var(${g.dimVar})">
        <div class="roadmap-tier-top">
          <span class="roadmap-tier-label">${g.label}</span>
          ${complete ? `<span class="roadmap-tier-done">Core done</span>` : ""}
        </div>
        <div class="roadmap-tier-count"><strong>${g.requiredShipped}</strong><span>/${g.requiredTotal} core shipped</span></div>
        <div class="year-bar-track roadmap-tier-track"><div class="year-bar-fill" style="width:${pct}%; background:var(--tier-color)"></div></div>
        <div class="roadmap-tier-foot">
          <span>${g.allTotal - g.requiredTotal} more optional in this tier</span>
          ${bonusNote}
        </div>
      </div>`;
  }).join("");

  return `
    <div class="card roadmap-summary-card">
      <div class="card-head-row">
        <div>
          <div class="card-eyebrow">Trajectory Project Roadmap</div>
          <h2 class="roadmap-summary-title">Recommended build path</h2>
        </div>
      </div>
      <p class="pc-desc roadmap-summary-sub">A suggested core of 4 beginner, 3 intermediate, and 2 capstone builds across your four years — the rest are optional, ship them any time for extra depth.</p>
      <div class="roadmap-tier-grid">${cards}</div>
    </div>
  `;
}

function renderProjects(){
  // Gracefully remap legacy numeric string filters down to explicit phase scopes
  let levelFilter = projectsFilter;
  if(levelFilter === "1") levelFilter = "beginner";
  if(levelFilter === "2") levelFilter = "intermediate";
  if(levelFilter === "3" || levelFilter === "4") levelFilter = "major";

  document.querySelectorAll("#yearTabs .tab-btn").forEach(b=>b.classList.toggle("active", b.dataset.filter===projectsFilter));

  let html = renderProjectsSummary();
  let hasAnyCards = false;

  if((levelFilter==="all" || levelFilter==="custom") && DB.projects.custom && DB.projects.custom.length){
    hasAnyCards = true;
    html += `<div class="phase-block"><div class="phase-head"><div class="phase-num">+</div><div class="phase-title">Custom AI-Guided Infrastructure</div><div class="phase-count">${DB.projects.custom.filter(c=>c.status==="shipped").length}/${DB.projects.custom.length} shipped</div></div>
      <div class="project-grid">${DB.projects.custom.map(customCardHTML).join("")}</div></div>`;
  }

  const targetedLevels = ["beginner", "intermediate", "major"].filter(lvl => levelFilter === "all" || levelFilter === lvl);
  const phaseTitles = { beginner: "Beginner Milestone Core (2-3 Weeks Each)", intermediate: "Intermediate Agile Engine (6-8 Weeks Each)", major: "Major Production Capstone (4-8 Months Run)" };
  const phaseNums = { beginner: "I", intermediate: "II", major: "III" };

  targetedLevels.forEach(lvl => {
    hasAnyCards = true;
    const shippedCount = CURATED_PROJECTS[lvl].filter(p=>DB.projects.shipped[p.id]).length;
    html += `<div class="phase-block">
      <div class="phase-head"><div class="phase-num">${phaseNums[lvl]}</div><div class="phase-title">${phaseTitles[lvl]}</div><div class="phase-count">${shippedCount}/${CURATED_PROJECTS[lvl].length} shipped</div></div>
      <div class="project-grid">${CURATED_PROJECTS[lvl].map(p=>projectCardHTML(p, lvl)).join("")}</div>
    </div>`;
  });

  if(!hasAnyCards){
    html += `<div class="empty-state">
      <div class="empty-title">No projects in this view</div>
      <p class="empty-sub">Try a different filter, or add a custom AI-guided build to get started.</p>
    </div>`;
  }

  const container = document.getElementById("phaseContainer");
  if(container) {
    container.innerHTML = html;
  }

  // Bind events
  container.querySelectorAll("[data-toggle-start-pid]").forEach(btn=>{
    btn.addEventListener("click", ()=>toggleStartedStatus(btn.dataset.toggleStartPid));
  });

  container.querySelectorAll("[data-submit-pid]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const pid = btn.dataset.submitPid;
      const isCustom = btn.dataset.submitCustom === "1";
      const label = isCustom
        ? (DB.projects.custom.find(x=>x.id===pid) || {}).name
        : (Object.values(CURATED_PROJECTS).flat().find(p=>p.id===pid) || {}).name;
      openRepoSubmissionDialog(pid, label);
    });
  });

  container.querySelectorAll("[data-custom-start]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const c = DB.projects.custom.find(x=>x.id===btn.dataset.customStart);
      if(!c || c.status === "shipped") return; // shipped is locked; only a verified submission changes it
      c.status = c.status==="planned" ? "progress" : "planned";
      saveDB(); renderProjects(); renderHome(); renderResume();
    });
  });
  container.querySelectorAll("[data-custom-remove]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      DB.projects.custom = DB.projects.custom.filter(x=>x.id!==btn.dataset.customRemove);
      saveDB(); renderProjects(); renderHome(); renderResume();
    });
  });
}

/**
 * Opens the guided repo submission dialog. Runs the full verification pipeline
 * on confirm and surfaces field-level validation errors (not a silent failure)
 * by re-opening the dialog with a copy line describing exactly what failed.
 */
function openRepoSubmissionDialog(pid, label, errorCopy){
  const cur = DB.projects.meta[pid] || {};
  const connected = DB.github && DB.github.username;
  const baseCopy = connected
    ? `Submitting verifies the repo is public, exists, and is owned by your connected account (@${connected}) before marking this build shipped.`
    : `Connect your GitHub account in Settings first — ownership verification needs it to confirm you authored this repo.`;
  openRepoDialogInternal(pid, label, cur.repo || "", errorCopy || baseCopy, !!errorCopy);
}

function openRepoDialogInternal(pid, label, prefillRepo, copy, isError){
  openDialog({
    eyebrow: "SUBMIT PROJECT",
    title: `Verify & ship "${label || pid}"`,
    copy,
    confirmLabel: "Verify & submit",
    fields: [
      { id:"repo", label:"GitHub repository URL", placeholder:"https://github.com/owner/repo", value: prefillRepo }
    ],
    onConfirm: ({repo})=>{
      submitProjectRepo(pid, label, repo);
      return false; // keep our own control over closing; submitProjectRepo manages the dialog lifecycle
    }
  });
  if(isError){
    const dialog = document.getElementById("appDialog");
    dialog.classList.add("modal-has-error");
    const copyEl = document.getElementById("appDialogCopy");
    if(copyEl) copyEl.classList.add("field-error-text");
  }
}

async function submitProjectRepo(pid, label, repoInput){
  const confirmBtn = document.getElementById("appDialogConfirm");
  const dialog = document.getElementById("appDialog");
  if(confirmBtn){ confirmBtn.disabled = true; confirmBtn.classList.add("btn-loading"); }
  try{
    const meta = await verifyAndSubmitRepo(pid, repoInput, label);
    if(dialog) dialog.hidden = true;
    showNotice(`Verified and shipped — ${meta.repoName} (quality ${meta.qualityScore}/100).`, "success");
  }catch(err){
    if(err instanceof RepoValidationError){
      // Re-open the dialog with the specific failure surfaced inline, prefilled with what they typed.
      openRepoDialogInternal(pid, label, repoInput, err.message, true);
    }else{
      showNotice(err.message || "Verification failed unexpectedly. Try again.", "error");
    }
  }finally{
    if(confirmBtn){ confirmBtn.disabled = false; confirmBtn.classList.remove("btn-loading"); }
  }
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
function getShippedProjects(){
  const fromRoadmap = [];
  ["beginner", "intermediate", "major"].forEach(lvl => {
    CURATED_PROJECTS[lvl].forEach(p => {
      if (DB.projects.shipped[p.id]) {
        const meta = DB.projects.meta[p.id] || {};
        fromRoadmap.push({
          name: p.name, desc: p.desc || "", stack: p.stack || [],
          repo: meta.repo || "", live: meta.live || "",
          yearLabel: lvl.toUpperCase(), monthName: p.category || "", globalIndex: p.id, custom: false
        });
      }
    });
  });

  const fromCustom = (DB.projects.custom || [])
    .filter(c => c.status === "shipped")
    .map(c => ({
      name: c.name, desc: c.desc || "", stack: c.stack || [], repo: "", live: "",
      yearLabel: "CUSTOM BUILD", monthName: "AI Scoped", globalIndex: c.id, custom: true
    }));

  return [...fromRoadmap, ...fromCustom];
}

function getInProgressProjects(){
  const fromRoadmap = [];
  ["beginner", "intermediate", "major"].forEach(lvl => {
    CURATED_PROJECTS[lvl].forEach(p => {
      if (DB.projects.started[p.id] && !DB.projects.shipped[p.id]) {
        fromRoadmap.push({ name: p.name, globalIndex: p.id });
      }
    });
  });

  const fromCustom = (DB.projects.custom || [])
    .filter(c => c.status === "progress")
    .map(c => ({ name: c.name, globalIndex: c.id }));

  return [...fromRoadmap, ...fromCustom];
}

function getResumeSkills(){
  const tags = new Set();
  ["beginner", "intermediate", "major"].forEach(lvl => {
    CURATED_PROJECTS[lvl].forEach(p => {
      if (DB.projects.shipped[p.id] || DB.projects.started[p.id]) {
        (p.stack||[]).forEach(t=>tags.add(String(t).toUpperCase()));
      }
    });
  });
  (DB.projects.custom || []).forEach(c=>{
    if(c.status === "shipped" || c.status === "progress") {
      (c.stack||[]).forEach(t=>tags.add(String(t).toUpperCase()));
    }
  });
  return Array.from(tags);
}

function computeResumeReadiness(){
  const items = [];
  const shipped = getShippedProjects();
  const inProgress = getInProgressProjects();

  inProgress.forEach(p=>{
    items.push({
      priority: "high",
      text: `Refine and ship "${p.name}" — compile dependencies into a production profile deployment to land it on your portfolio.`,
      due: null, dueLabel: "Target: Active Pipeline Sprint"
    });
  });

  const requiredBeginner = CURATED_PROJECTS.beginner.filter(p=>p.required);
  const requiredIntermediate = CURATED_PROJECTS.intermediate.filter(p=>p.required);
  const requiredMajor = CURATED_PROJECTS.major.filter(p=>p.required);
  const bShipped = requiredBeginner.filter(p => DB.projects.shipped[p.id]).length;
  const iShipped = requiredIntermediate.filter(p => DB.projects.shipped[p.id]).length;
  const mShipped = requiredMajor.filter(p => DB.projects.shipped[p.id]).length;

  if (bShipped < requiredBeginner.length) {
    const remaining = requiredBeginner.length - bShipped;
    items.push({ priority: "medium", text: `Complete ${remaining} more Beginner project${remaining===1?'':'s'} to finish your recommended core (${bShipped}/${requiredBeginner.length}).`, due: null, dueLabel: "Roadmap Objective" });
  }
  if (iShipped < requiredIntermediate.length) {
    const remaining = requiredIntermediate.length - iShipped;
    items.push({ priority: "medium", text: `Complete ${remaining} more Intermediate project${remaining===1?'':'s'} to finish your recommended core (${iShipped}/${requiredIntermediate.length}).`, due: null, dueLabel: "Roadmap Objective" });
  }
  if (mShipped < requiredMajor.length) {
    const remaining = requiredMajor.length - mShipped;
    items.push({ priority: "high", text: `Design and launch ${remaining} more Major Capstone build${remaining===1?'':'s'} to finish your recommended core (${mShipped}/${requiredMajor.length}).`, due: null, dueLabel: "Roadmap Objective" });
  }

  const missingLinks = shipped.filter(p=>!p.custom && !p.repo);
  if(missingLinks.length){
    items.push({
      priority: "high",
      text: `Link raw repositories to ${missingLinks.length} shipped architecture tracks (${missingLinks.slice(0,3).map(p=>p.name).join(", ")}) for technical auditing.`,
      due: null, dueLabel: "Audit Preparation Check"
    });
  }

  if(!DB.github || !DB.github.profile){
    items.push({ priority:"low", text:"Sync your GitHub profile in Settings — it feeds live repo activity into your portfolio story.", due:null, dueLabel:"Anytime" });
  }
  if(!DB.resume.email || !DB.resume.phone){
    items.push({ priority:"high", text:"Add your email and phone number in the contact panel below — recruiters need a way to reach you.", due:null, dueLabel:"Before you export" });
  }
  if(!DB.resume.summary){
    items.push({ priority:"low", text:"Write a 1–2 line summary describing what you build and what you're aiming for.", due:null, dueLabel:"Before you export" });
  }

  const rank = { high:0, medium:1, low:2 };
  return items.sort((a,b)=>rank[a.priority]-rank[b.priority]);
}

function buildResumeText(){
  const p = DB.profile, r = DB.resume;
  const college = COLLEGES[DB.settings.college];
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
  const eduLabel = collegeFullLabel(college);
  lines.push(`${eduLabel}${eduLabel?" — ":""}Semester ${sem}${DB.progress.dsaSolved ? ` · ${DB.progress.dsaSolved} DSA problems solved` : ""}`);
  if(college && college.university) lines.push(`Affiliated to ${college.university}`);

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

function buildJakesResumeHTML(){
  const r = DB.resume;
  const p = DB.profile;
  const skills = getResumeSkills();
  const shipped = getShippedProjects();
  const college = (window.COLLEGES && window.COLLEGES[DB.settings.college]) || null;

  const esc = (str) => String(str||"").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
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
        <li>${esc(proj.desc || "Developed full-stack application logic and production-ready code infrastructure.")}</li>
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
      <div class="jr-row"><span class="jr-left jr-bold">${esc(college ? college.collegeName : (DB.settings.college || "University"))}</span><span class="jr-right"></span></div>
      <div class="jr-row jr-sub"><span class="jr-left">${esc(college ? [college.degree, college.branch].filter(Boolean).join(", ") : "Bachelor of Technology (or Equivalent)")}</span><span class="jr-right">${esc(college && college.university ? `Affiliated to ${college.university}` : "")}</span></div>
    </div>
  </section>

  <section>
    <h2>Experience</h2>
    <div class="jr-item">
      <div class="jr-row"><span class="jr-left jr-bold">Trajectory Tracked Builder</span><span class="jr-right">Continuous</span></div>
      <div class="jr-row jr-sub"><span class="jr-left">Continuous Engineering Roadmap Execution</span><span class="jr-right"></span></div>
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
      ? tagPillsHTML(skills)
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
            <div class="pc-stack">${tagPillsHTML(proj.stack)}</div>
            <div class="pc-meta">${proj.repo ? `<a href="${proj.repo}" target="_blank" rel="noopener">Repo ↗</a>` : "No repo linked"}${proj.live ? ` · <a href="${proj.live}" target="_blank" rel="noopener">Live ↗</a>` : ""}</div>
          </div>`).join("")
      : `<div class="empty-sub">No shipped projects yet — mark a build "SHIPPED" on the Projects page and it will land here.</div>`;
  }

  renderResumeChecklist();

  const preview = document.getElementById("resumePreviewText");
  if(preview) preview.textContent = buildResumeText();
}

/* ---------------- RENDER: SETTINGS ---------------- */
// Populates every college <select> in the app from the COLLEGES registry,
// so adding a college/branch to data.js is enough — no HTML edits needed.
function populateCollegeSelects(){
  const optionsHTML = Object.values(COLLEGES)
    .map(c => `<option value="${c.id}">${collegeShortLabel(c)}</option>`)
    .join("");
  ["obCollege", "collegePicker"].forEach(id=>{
    const sel = document.getElementById(id);
    if(sel) sel.innerHTML = optionsHTML;
  });
}

function renderOnboardCollegePicker(){
  const sel = document.getElementById("obCollege");
  if(sel) sel.value = onboardCollege;
}

/* ---------------- ONBOARDING WIZARD ---------------- */
function goToObStep(n){
  [1,2,3].forEach(i=>{
    const panel = document.getElementById(`obPanel${i}`);
    if(panel) panel.hidden = (i !== n);
    const dot = document.querySelector(`.onboard-step-dot[data-step="${i}"]`);
    if(dot){
      dot.classList.toggle("active", i === n);
      dot.classList.toggle("complete", i < n);
    }
  });
  if(n === 2) renderQuizQuestion();
  if(n === 3) renderTrackResult();
}

function computeTrackFromAnswers(answers){
  const values = Object.values(answers);
  if(values.some(a=>a && a.forceGeneralist)) return "generalist";
  const scores = {};
  QUIZ.forEach(q=>{
    const a = answers[q.id];
    if(a && a.track){
      const w = q.weight || 1;
      scores[a.track] = (scores[a.track]||0) + w;
    }
  });
  const entries = Object.entries(scores);
  if(!entries.length) return "generalist";
  entries.sort((a,b)=>b[1]-a[1]);
  const topScore = entries[0][1];
  const topTied = entries.filter(([,s])=>s===topScore);
  if(topTied.length > 1) return "generalist";
  return entries[0][0];
}

function renderQuizQuestion(){
  const host = document.getElementById("quizHost");
  const fill = document.getElementById("quizProgressFill");
  if(!host) return;
  const q = QUIZ[obQuizIndex];
  if(!q){
    obResultTrack = computeTrackFromAnswers(obQuizAnswers);
    goToObStep(3);
    return;
  }
  if(fill) fill.style.width = `${Math.round((obQuizIndex / QUIZ.length) * 100)}%`;
  const selected = obQuizAnswers[q.id];
  host.innerHTML = `
    <div class="quiz-question">
      <div class="quiz-question-count">QUESTION ${obQuizIndex+1} OF ${QUIZ.length}</div>
      <div class="quiz-question-prompt">${q.prompt}</div>
      <div class="quiz-options">
        ${q.options.map((opt,oi)=>`<button type="button" class="quiz-option${selected && selected.label===opt.label ? " selected" : ""}" data-opt="${oi}">${opt.label}</button>`).join("")}
      </div>
    </div>`;
  host.querySelectorAll("[data-opt]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const opt = q.options[parseInt(btn.dataset.opt, 10)];
      obQuizAnswers[q.id] = opt;
      obQuizIndex++;
      setTimeout(renderQuizQuestion, 160);
    });
  });
}

function renderTrackResult(){
  const card = document.getElementById("trackResultCard");
  if(!card) return;
  const track = TRACKS[obResultTrack] || TRACKS.generalist;
  card.innerHTML = `
    <div class="track-result-eyebrow">SUGGESTED TRACK</div>
    <div class="track-result-label">${track.label}</div>
    <div class="track-result-tagline">${track.tagline}</div>
    <div class="track-result-blurb">${track.blurb}</div>
    <div class="track-pick-label">Not feeling it? Pick your own track instead:</div>
    <div class="track-pick-list">
      ${Object.values(TRACKS).map(t=>`<button type="button" class="track-pick-chip${t.id===track.id?" selected":""}" data-track="${t.id}">${t.label}</button>`).join("")}
    </div>`;
  card.querySelectorAll("[data-track]").forEach(chip=>{
    chip.addEventListener("click", ()=>{
      obResultTrack = chip.dataset.track;
      renderTrackResult();
    });
  });
}

function renderSubmissionHistory(){
  const host = document.getElementById("submissionHistory");
  if(!host) return;
  const submissions = (DB.projects && DB.projects.submissions) || [];
  if(!submissions.length){
    host.innerHTML = `<div class="empty-sub">No submissions yet. Verified repos you ship will show up here.</div>`;
    return;
  }
  host.innerHTML = submissions.slice(0, 20).map(s=>{
    const when = new Date(s.at).toLocaleString();
    if(s.ok){
      return `<div class="submission-row submission-ok">
        <div class="submission-row-main"><strong>${s.projectLabel}</strong> <span class="submission-repo">${s.repoName || s.input}</span></div>
        <div class="submission-row-meta">Verified &amp; shipped · quality ${s.qualityScore}/100 · ${when}</div>
      </div>`;
    }
    return `<div class="submission-row submission-fail">
      <div class="submission-row-main"><strong>${s.projectLabel}</strong> <span class="submission-repo">${s.input || "—"}</span></div>
      <div class="submission-row-meta">Failed at <em>${s.step}</em> — ${s.error} · ${when}</div>
    </div>`;
  }).join("");
}

function renderSettings(){
  document.getElementById("stName").value = DB.profile.name || "";
  document.getElementById("stDate").value = DB.profile.startDate || "";
  const trackSummary = document.getElementById("stTrackSummary");
  if(trackSummary){
    const track = TRACKS[DB.profile.track] || TRACKS.generalist;
    trackSummary.innerHTML = `
      <div class="settings-track-card">
        <div>
          <div class="track-label">${track.label}</div>
          <div class="track-tagline">${track.tagline}</div>
        </div>
      </div>`;
  }
  document.querySelectorAll(".theme-swatch").forEach(btn=>btn.classList.toggle("active", btn.dataset.theme === DB.settings.theme));
  const collegeSel = document.getElementById("collegePicker");
  if(collegeSel) collegeSel.value = DB.settings.college || DEFAULT_COLLEGE_ID;
  const institutionDetail = document.getElementById("institutionDetail");
  if(institutionDetail){
    const college = COLLEGES[DB.settings.college || DEFAULT_COLLEGE_ID];
    institutionDetail.innerHTML = college ? `
      <div class="institution-detail-row"><span>College</span><strong>${college.collegeName}</strong></div>
      <div class="institution-detail-row"><span>Degree</span><strong>${college.degree}</strong></div>
      <div class="institution-detail-row"><span>Branch</span><strong>${college.branch}</strong></div>
      <div class="institution-detail-row"><span>University</span><strong>${college.university}</strong></div>
    ` : "";
  }
  const ghInput = document.getElementById("ghUsername");
  const ghSummary = document.getElementById("ghSummary");
  if(ghInput) ghInput.value = DB.github?.username || "";
  if(ghSummary){
    const gh = DB.github || {};
    if(gh.profile){
      const repos = (gh.repos || []).slice(0,3).map(repo=>`<a href="${repo.url}" target="_blank" rel="noopener">${repo.name}${repo.language ? ` · ${repo.language}` : ""}</a>`).join("");
      const identityBadge = gh.verifiedIdentity ? `<span class="badge badge-shipped" style="margin-left:8px">VERIFIED IDENTITY</span>` : "";
      ghSummary.innerHTML = `<div class="gh-profile"><img src="${gh.profile.avatar}" alt=""><div><a href="${gh.profile.url}" target="_blank" rel="noopener">@${gh.profile.login}</a>${identityBadge}<span>${gh.profile.publicRepos} public repos · ${gh.profile.followers} followers</span></div></div><div class="gh-repos">${repos || "No recent public repositories found."}</div><div class="sync-note">Synced ${new Date(gh.lastSyncedAt).toLocaleString()}</div>`;
    } else ghSummary.innerHTML = `<div class="empty-sub">Your public GitHub activity will appear here after a sync — this becomes your verified development identity for project submissions.</div>`;
  }
  renderSubmissionHistory();
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
  const cfInput = document.getElementById("cfUsername");
  const cfSummary = document.getElementById("cfSummary");
  if(cfInput) cfInput.value = DB.codeforces?.username || "";
  if(cfSummary){
    const cf = DB.codeforces || {};
    if(cf.profile){
      const p = cf.profile;
      cfSummary.innerHTML = `<div class="gh-profile"><div><a href="https://codeforces.com/profile/${cf.username}" target="_blank" rel="noopener">@${cf.username}</a><span>Rating ${p.rating ?? "—"} (max ${p.maxRating ?? "—"}) · ${p.rank || "unrated"}</span></div></div><div class="sync-note">Synced ${new Date(cf.lastSyncedAt).toLocaleString()}</div>`;
    } else cfSummary.innerHTML = `<div class="empty-sub">Your public Codeforces rating will appear here after a sync. Note: Codeforces' API doesn't allow direct browser requests, so sync may fail even with a valid handle.</div>`;
  }
  const ccInput = document.getElementById("ccUsername");
  const ccSummary = document.getElementById("ccSummary");
  if(ccInput) ccInput.value = DB.codechef?.username || "";
  if(ccSummary){
    const cc = DB.codechef || {};
    if(cc.profile){
      const p = cc.profile;
      ccSummary.innerHTML = `<div class="gh-profile"><div><a href="https://www.codechef.com/users/${cc.username}" target="_blank" rel="noopener">@${cc.username}</a><span>Rating ${p.rating ?? "—"} (max ${p.highestRating ?? "—"}) · Global rank ${p.globalRank ?? "—"}</span></div></div><div class="sync-note">Synced ${new Date(cc.lastSyncedAt).toLocaleString()}</div>`;
    } else ccSummary.innerHTML = `<div class="empty-sub">Your public CodeChef rating will appear here after a sync. This uses an unofficial API and may occasionally be unavailable.</div>`;
  }
  const historyList = document.getElementById("historyList");
  if(historyList){
    const history = getHistory().slice(0, 8);
    historyList.innerHTML = history.length ? history.map(item=>`<div class="history-item"><div><strong>${item.reason || "Update"}</strong><span>${new Date(item.at).toLocaleString()}</span></div><button class="btn btn-ghost btn-sm" data-restore-version="${item.id}">Restore</button></div>`).join("") : `<div class="empty-sub">No saved versions yet.</div>`;
    historyList.querySelectorAll("[data-restore-version]").forEach(btn=>btn.addEventListener("click", ()=>{
      const version = getHistory().find(item=>item.id===btn.dataset.restoreVersion);
      if(!version){ showNotice("That version is no longer available.", "error"); return; }
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

/* ---------------- CUSTOM SELECT ---------------- */
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

  new MutationObserver(()=>{ buildPanel(); syncLabel(); }).observe(select, {childList:true});

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
  setActiveCollege(DB.settings.college || DEFAULT_COLLEGE_ID);
  populateCollegeSelects();
  const built = buildScheduleData();
  WEEKS = built.weeks; MONTHS = built.months;
  applyTheme();
  tickClock();
  setInterval(tickClock, 1000);

  onboardCollege = DB.settings.college || DEFAULT_COLLEGE_ID;
  renderOnboardCollegePicker();

  if(!DB.profile.name || !DB.profile.startDate){
    document.getElementById("onboardOverlay").hidden = false;
    document.getElementById("app").hidden = true;
    obQuizIndex = 0; obQuizAnswers = {}; obResultTrack = null;
    goToObStep(1);
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

  document.getElementById("obNext1").addEventListener("click", ()=>{
    const name = document.getElementById("obName").value.trim();
    const date = document.getElementById("obDate").value;
    if(!name || !date){ showNotice("Please add your name and a start date.", "error"); return; }
    obQuizIndex = 0; obQuizAnswers = {};
    goToObStep(2);
  });

  document.getElementById("obBack2").addEventListener("click", ()=> goToObStep(1));
  document.getElementById("obSkipQuiz").addEventListener("click", ()=>{ obResultTrack = "generalist"; goToObStep(3); });
  document.getElementById("obRetakeQuiz").addEventListener("click", ()=>{ obQuizIndex = 0; obQuizAnswers = {}; goToObStep(2); });

  document.getElementById("obSubmit").addEventListener("click", ()=>{
    const name = document.getElementById("obName").value.trim();
    const date = document.getElementById("obDate").value;
    if(!name || !date){ showNotice("Please add your name and a start date.", "error"); goToObStep(1); return; }
    DB.profile.name = name;
    DB.profile.startDate = date;
    DB.profile.createdAt = new Date().toISOString();
    DB.profile.track = obResultTrack || "generalist";
    DB.settings.college = onboardCollege || DEFAULT_COLLEGE_ID;
    setActiveCollege(DB.settings.college);
    saveDB();
    document.getElementById("onboardOverlay").hidden = true;
    document.getElementById("app").hidden = false;
    runAutoUpdate();
    populateAcademicPickers();
    renderAll();
  });

  const retakeBtn = document.getElementById("stRetakeQuiz");
  if(retakeBtn) retakeBtn.addEventListener("click", ()=>{
    obQuizIndex = 0; obQuizAnswers = {};
    obResultTrack = DB.profile.track || null;
    document.getElementById("obName").value = DB.profile.name || "";
    document.getElementById("obDate").value = DB.profile.startDate || "";
    onboardCollege = DB.settings.college || DEFAULT_COLLEGE_ID;
    document.getElementById("obCollege").value = onboardCollege;
    document.getElementById("app").hidden = true;
    document.getElementById("onboardOverlay").hidden = false;
    goToObStep(2);
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
    if(key === (DB.settings.college || DEFAULT_COLLEGE_ID)) return;
    const prevKey = DB.settings.college || DEFAULT_COLLEGE_ID;
    openDialog({
      eyebrow: "SWITCH COLLEGE",
      title: `Switch academics to ${collegeFullLabel(COLLEGES[key]) || key}?`,
      copy: "This swaps the semester syllabus and subject list app-wide. Roadmaps are unaffected.",
      confirmLabel: "Switch college",
      onConfirm: ()=>{
        DB.settings.college = key; setActiveCollege(key); saveDB("College changed");
        populateAcademicPickers(); renderAll();
        showNotice(`Academics switched to ${collegeFullLabel(COLLEGES[key]) || key}.`, "success");
      }
    });
    e.target.value = prevKey;
  });

  wireAsyncSyncButton("ghSync", "ghUsername", syncGitHubProfile, "GitHub sync failed.");
  wireAsyncSyncButton("ltSync", "ltUsername", syncLeetCodeProfile, "LeetCode sync failed.");
  wireAsyncSyncButton("cfSync", "cfUsername", syncCodeforcesProfile, "Codeforces sync failed.");
  wireAsyncSyncButton("ccSync", "ccUsername", syncCodeChefProfile, "CodeChef sync failed.");

  document.getElementById("acAdd").addEventListener("click", ()=>{
    const name = document.getElementById("acSubjectPick").value.trim();
    const examDate = document.getElementById("acExamDate").value;
    const topics = document.getElementById("acTopics").value.split(",").map(topic=>topic.trim()).filter(Boolean);
    if(!name){ showNotice("Pick a subject to track.", "error"); return; }
    DB.academics.subjects.push({ id: uid(), name, examDate, topics, tasksDone:{} });
    saveDB(); document.getElementById("acExamDate").value = ""; document.getElementById("acTopics").value = "";
    renderAcademics();
  });

  document.getElementById("dsaSave").addEventListener("click", ()=>{
    const v = parseInt(document.getElementById("dsaInput").value, 10);
    DB.progress.dsaSolved = isNaN(v) ? 0 : v; saveDB(); renderProgress();
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
    try{
      const blob = new Blob([JSON.stringify(DB, null, 2)], { type:"application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `trajectory-backup-${DB.profile.startDate||"data"}.json`;
      a.click(); URL.revokeObjectURL(url);
      showNotice("Backup downloaded.", "success");
    }catch(err){
      showNotice("Export failed — your browser blocked the download. Try again or check download settings.", "error");
    }
  });
  document.getElementById("stImport").addEventListener("click", ()=>{
    openDialog({
      eyebrow:"LOCAL DATABASE", title:"Import backup JSON", copy:"Paste the full contents of a Trajectory backup.",
      confirmLabel:"Import backup", fields:[{ id:"backup", label:"Backup JSON", multiline:true, placeholder:"{ ... }" }],
      onConfirm:({backup})=>{
        let parsed;
        try{
          parsed = JSON.parse(backup);
        }catch(err){
          showNotice("That text couldn't be read as valid JSON — check for missing quotes or brackets.", "error");
          return false;
        }
        if(!parsed || typeof parsed !== "object" || Array.isArray(parsed) || !parsed.profile){
          showNotice("That JSON doesn't look like a Trajectory backup (missing profile data). Nothing was imported.", "error");
          return false;
        }
        DB = Object.assign(clone(DEFAULT_DB), parsed);
        const saved = saveDB("Backup imported");
        if(!saved) return false; // saveDB already surfaced the specific storage error
        applyTheme();
        document.getElementById("onboardOverlay").hidden = true; document.getElementById("app").hidden = false;
        runAutoUpdate(); populateAcademicPickers(); renderAll(); showNotice("Backup imported.", "success");
      }
    });
  });
  document.getElementById("stReset").addEventListener("click", ()=>{
    openDialog({ eyebrow:"DANGER ZONE", title:"Reset all local data?", copy:"This permanently erases your profile progress from this browser.", confirmLabel:"Reset all data", danger:true, onConfirm:()=>{
      [DB_KEY, HISTORY_KEY, "trajectoryDB_v1", "trajectoryDB_v2"].forEach(key=>storageDelete(key));
      location.reload();
    }});
  });
  document.getElementById("stClearHistory").addEventListener("click", ()=>{
    openDialog({ eyebrow:"VERSION HISTORY", title:"Clear saved versions?", copy:"Your current database will remain intact.", confirmLabel:"Clear history", danger:true, onConfirm:()=>{
      historyCache = [];
      storageDelete(HISTORY_KEY);
      renderSettings(); showNotice("Saved versions cleared.", "success");
    }});
  });

  document.getElementById("rsSave").addEventListener("click", ()=>{
    ["email","phone","location","linkedin","portfolio","targetRole","summary"].forEach(key=>{
      const el = document.getElementById("rs"+key.charAt(0).toUpperCase()+key.slice(1));
      if(el) DB.resume[key] = el.value.trim();
    });
    saveDB("Resume details updated"); renderResume(); showNotice("Resume details saved.", "success");
  });

  document.getElementById("rsCopy").addEventListener("click", async ()=>{
    try{ await navigator.clipboard.writeText(buildResumeText()); showNotice("Resume copied to clipboard.", "success"); }
    catch(err){ showNotice("Copy failed — perform action manually.", "error"); }
  });

  document.getElementById("rsDownloadTxt").addEventListener("click", ()=>{
    const blob = new Blob([buildResumeText()], { type:"text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${(DB.profile.name||"resume").replace(/\s+/g,"_")}-resume.txt`;
    a.click(); URL.revokeObjectURL(url);
  });

  document.getElementById("rsDownloadMd").addEventListener("click", ()=>{
    const r = DB.resume; const skills = getResumeSkills(); const shipped = getShippedProjects();
    const college = collegeFullLabel(COLLEGES[DB.settings.college]); const sem = currentSemesterIndex()+1;
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
    const blob = new Blob([md], { type:"text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${(DB.profile.name||"resume").replace(/\s+/g,"_")}-resume.md`;
    a.click(); URL.revokeObjectURL(url);
  });

  document.getElementById("rsExportPdf")?.addEventListener("click", ()=>{
    const html = buildJakesResumeHTML(); const win = window.open("", "_blank");
    if(!win){ showNotice("Pop-up blocked. Could not export PDF layout.", "error"); return; }
    win.document.open(); win.document.write(html); win.document.close();
    const triggerPrint = ()=>{ win.focus(); win.print(); };
    if(win.document.fonts && win.document.fonts.ready) win.document.fonts.ready.then(triggerPrint).catch(triggerPrint);
    else win.onload = triggerPrint;
    setTimeout(triggerPrint, 1500);
  });

  document.querySelectorAll("#yearTabs .tab-btn").forEach(b=>{
    b.addEventListener("click", ()=>{ projectsFilter = b.dataset.filter; renderProjects(); });
  });

  /* ---------------- AI Guided Scoping Integration ---------------- */
  document.getElementById("newBuildBtn").addEventListener("click", ()=>{
    openDialog({
      eyebrow: "AI CO-PILOT INITIALIZATION",
      title: "Create Guided Custom Architecture",
      copy: "Pitch your product statement. Trajectory's integrated AI scoping model breaks your thesis down into an industrial roadmap: mapping technical stacks, entities database designs, and feature milestones.",
      confirmLabel: "Initialize AI Scoping Sequence",
      fields: [
        { id: "name", label: "Application Name", placeholder: "e.g., Freelancer OS / Decentralized Ledger Store", value: "" },
        { id: "concept", label: "Core Feature Statement / Pitch Problem", placeholder: "What business pipeline logic or service layer does this solve?", multiline: true, value: "" },
        { id: "stack", label: "Preferred Tech Core (Comma separated values)", placeholder: "e.g., Next.js, FastAPI, Prisma, PostgreSQL", value: "" }
      ],
      onConfirm: ({ name, concept, stack }) => {
        if(!name.trim()){ showNotice("An application identifier name is mandatory.", "error"); return false; }
        
        const stackArr = stack.split(",").map(s => s.trim().toUpperCase()).filter(Boolean);
        
        // Automated Scoping Template mapping based on your requirements list
        const aiBlueprint = `[AI SCOPE RUNWAY]
• Scope Planning: Functional MVP tracking modules configured for launch.
• Feature Roadmap: Core API authorization blocks -> Client state handling pipeline -> Production builds.
• Database Design: Multi-tenant structured relational model maps optimized with relational foreign key indexes.
• Tech Stack: Optimized around ${stackArr.length ? stackArr.join(", ") : "CUSTOM BACKEND ENGINE"}.
• Milestones: Initializing framework containers -> Designing storage migrations -> Continuous integration deployment.
• Context Statement: "${concept.trim() || "Custom product engine optimized for portfolio integration."}"`;

        DB.projects.custom.push({
          id: "custom_" + uid() + Date.now().toString(36),
          name: name.trim(),
          desc: aiBlueprint,
          stack: stackArr.length ? stackArr : ["AI-GENERATED CORE"],
          stars: 5,
          status: "planned"
        });

        saveDB("AI-guided custom project initialized");
        projectsFilter = "all";
        renderProjects();
        showNotice("✨ Production blueprint scoped and logged via AI guidance successfully!", "success");
      }
    });
  });

  enhanceAllSelects();
}

document.addEventListener("DOMContentLoaded", init);