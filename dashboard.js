/* ============================================================
   dashboard.js — TRAJECTORY "what should I be doing" domain.
   ============================================================
   Merged from (original module boundaries, preserved as section
   headers below so behavior/ownership stays traceable):
     - sub/home.js       (Home page: greeting, prep checklist, week
                           tasks, academic goals summary, dev-status
                           widgets, trajectory strip, learn-card hero)
     - sub/academics.js  (syllabus panel, subject tracker, the shared
                           "what to study this week" scheduling engine)
     - sub/tracking.js   (scheduling engine: weeks/months, elapsed
                           time, Progress + Tracking dashboard pages)
     - sub/analytics.js  (trend graph canvas + .ics calendar export)

   Load-order note: within a single file, all `function` declarations
   are hoisted, so sections below can reference each other (e.g.
   tracking's renderTrackingDashboard() calling analytics'
   drawTrajectoryPerformanceGraph()) regardless of the order they
   appear in — same effective behavior as the original cross-file
   imports, now same-file references instead. The analytics section's
   setAnalyticsSource() indirection layer is no longer structurally
   needed (it existed purely to avoid a circular import between two
   separate files) but is left in place undisturbed to minimize
   behavioral drift; it now simply wires to functions in this file.
   ============================================================ */
import { CURRICULUM, TRACKS, SYLLABUS, REVISION_CYCLE, getDomainRotationTask } from "./data.js";
import {
  Badge, GoalStack, StatusRow, Card, TagList, ProgressBar,
  getDB, saveDB, showNotice, goToPage,
  parseDate, diffDays, fmtShort, fmtLong, getWeekKey, addDays,
  isTheoryOnlySubject, isTheoryOnlyTopic, uid
} from "./core.js";

/* ============================================================
   SECTION: sub/academics.js — the syllabus/semester panel, the
   subject tracker (exam dates + topic checklists), and
   buildAcademicGoalEntries(), the shared "what should I study this
   week" engine also consumed by Home and the Tracking dashboard.
   ============================================================ */

/**
 * Turns a subject list into a prioritized list of "what to study this
 * week" entries. Pure function of (subjects, weekKey) — no DB writes —
 * shared by Home, Academics, and the Tracking week panel so all three
 * surfaces stay in sync using one scheduling algorithm.
 */
export function buildAcademicGoalEntries(subjects, weekKey){
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

/* ---------------- pickers ---------------- */
export function populateAcademicPickers(){
  const semPick = document.getElementById("acSemPick");
  semPick.innerHTML = SYLLABUS.map(s=>`<option value="${s.sem}">Semester ${s.sem} (Year ${s.year})</option>`).join("");
  updateSubjectOptions();
  semPick.onchange = updateSubjectOptions;
}
export function updateSubjectOptions(){
  const sem = document.getElementById("acSemPick").value || "1";
  const s = SYLLABUS.find(x=>String(x.sem)===String(sem));
  document.getElementById("acSubjectPick").innerHTML = s.subjects.map(sub=>`<option value="${sub.name}">${sub.name}</option>`).join("");
}

/* ---------------- RENDER: current semester panel ---------------- */
export function renderSemesterPanel(){
  const DB = getDB();
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
      <div class="topic-tag-list">${TagList(s.topics, "topic-tag")}</div>
    </div>
  `).join("");
}

/* ---------------- RENDER: ACADEMICS ---------------- */
export function renderAcademics(){
  const DB = getDB();
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
    ? GoalStack(weeklyGoalEntries.map(e=>e.label))
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
    return Card({
      baseClass: "subject-card",
      bodyHTML: `
        <button class="subject-remove" data-remove="${s.id}">×</button>
        <h3>${s.name}</h3>
        <div class="subject-days ${daysCls}">${daysLabel}${examDate ? " · "+fmtShort(examDate) : ""}</div>
        <div class="subject-week-target">Weekly target</div>
        <div class="subject-view-pill">This week: ${REVISION_CYCLE[taskIdx]}</div>
        <div class="subject-plan-note">${studyWeeks===null ? "Set an exam date to create a finish-early plan." : studyWeeks > 0 ? `Syllabus lane: ${Math.max(1, Math.ceil(topics.length/studyWeeks))} topic${Math.ceil(topics.length/studyWeeks)===1?"":"s"}/week · revision begins ${finishBufferWeeks} weeks before exams.` : `Revision lane active · syllabus target was ${finishBufferWeeks} weeks before exams.`}</div>
        <div class="topic-schedule-list">${topicHTML}</div>`
    });
  }).join("");

  list.querySelectorAll("[data-remove]").forEach(b=>{
    b.addEventListener("click", ()=>{
      DB.academics.subjects = DB.academics.subjects.filter(s=>s.id!==b.dataset.remove);
      saveDB(); renderAcademics();
    });
  });
}

/** Wires the "Add subject" form on the Academics page. Called once from app.js's init(). */
export function initAcademicsEvents(){
  document.getElementById("acAdd").addEventListener("click", ()=>{
    const DB = getDB();
    const name = document.getElementById("acSubjectPick").value.trim();
    const examDate = document.getElementById("acExamDate").value;
    const topics = document.getElementById("acTopics").value.split(",").map(topic=>topic.trim()).filter(Boolean);
    if(!name){ showNotice("Pick a subject to track.", "error"); return; }
    DB.academics.subjects.push({ id: uid(), name, examDate, topics, tasksDone:{} });
    saveDB(); document.getElementById("acExamDate").value = ""; document.getElementById("acTopics").value = "";
    renderAcademics();
  });
}

/* ============================================================
   SECTION: sub/tracking.js — the scheduling engine: flattens
   curriculum data into weeks/months, tracks elapsed time against the
   user's start date, and owns the Progress + Tracking (month/week/
   day) dashboard pages.
   ============================================================ */

// Flattened schedule, built once at startup (and rebuilt if the user's
// track changes, since domain-rotation tasks depend on it) via buildScheduleData().
export let WEEKS = [];
export let MONTHS = [];

let activeTrackingViewport = "month";
let selectedTrackingMonthIndex = null;
let selectedTrackingWeekIndex = null;

// Originally (sub/analytics.js): "Lazily bound to avoid a circular
// import with tracking.js (which needs renderMonthHeatmap/
// drawTrajectoryPerformanceGraph at module scope). tracking.js calls
// setAnalyticsSource() once at startup with itself." Both sides now
// live in this same file; `source` is declared here (ahead of the
// self-wiring call directly below) so the call doesn't hit a
// temporal-dead-zone error now that there's no file boundary between
// the declaration and the call. Behavior is unchanged either way.
let source = { MONTHS: [], getMonthPerformanceRatio: () => 0 };
export function setAnalyticsSource(next){ source = next; }

// Give the analytics section (drawTrajectoryPerformanceGraph, further
// down this file) live access to this section's MONTHS/ratio function.
setAnalyticsSource({ get MONTHS(){ return MONTHS; }, getMonthPerformanceRatio: (idx)=>getMonthPerformanceRatio(idx) });

/* ---------------- data flattening ---------------- */
export function buildScheduleData(){
  const DB = getDB();
  const weeks = [], months = [];
  const weekBlueprints = Array.isArray(CURRICULUM.weeks) ? CURRICULUM.weeks : [];
  const userTrack = (DB && DB.profile && DB.profile.track) || null;
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

        // Year 1 stays fully shared/foundational (no domain rotation task).
        // From Year 2 onward, every week gets one extra "Domain rotation"
        // task reinforcing all-round competence — see getDomainRotationTask
        // in data.js for the specialist/cross-domain/generalist logic.
        const domainTask = (year.id >= 2 && typeof getDomainRotationTask === "function")
          ? getDomainRotationTask(weekIndex, userTrack)
          : null;

        const tasks = [
          ...skillTasks.map((text, ti)=>({ id:`s${ti}`, text })),
          ...academicTasks.map((text, ti)=>({ id:`a${ti}`, text })),
          ...projectTasks.map((text, ti)=>({ id:`p${ti}`, text })),
          ...(domainTask ? [{ id:"d0", text: domainTask.text }] : [])
        ];
        weeks.push({
          index: weekIndex, yearId: year.id, yearLabel: year.label,
          monthGlobalIndex, monthName: month.name, weekInMonth: w+1, project: month.project,
          skill: blueprint?.skill || { title: "Skill sprint", tasks: skillTasks },
          academic: blueprint?.academic || { title: "Academic focus", tasks: academicTasks },
          project: blueprint?.project || { title: "Project push", tasks: projectTasks },
          domain: domainTask,
          tasks: tasks.map((t,ti)=>({ id:`t${ti}`, text: t.text }))
        });
      }
    });
  });
  WEEKS = weeks; MONTHS = months;
  return { weeks, months };
}

/* ---------------- date helpers that depend on DB (time sync + schedule offset) ---------------- */
export function nowDate(){ const DB = getDB(); return new Date(Date.now() + (DB && DB.timeSync ? DB.timeSync.offsetMs||0 : 0)); }
export function todayMidnight(){ const d=nowDate(); d.setHours(0,0,0,0); return d; }
export function weekDueDate(idx){
  const DB = getDB();
  const start = parseDate(DB.profile.startDate);
  if(!start) return null;
  return addDays(start, idx*7 + DB.schedule.offsetDays);
}

/* ---------------- live time authentication ---------------- */
export async function syncTime(){
  const DB = getDB();
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
  // renderAll() is triggered by the caller (app.js) after syncTime() resolves,
  // to avoid a circular import between tracking.js and the top-level renderer.
}

export function tickClock(){
  const d = nowDate();
  const timeEl = document.getElementById("clockTime");
  const dateEl = document.getElementById("clockDate");
  if(timeEl) timeEl.textContent = d.toLocaleTimeString(undefined, { hour12:false });
  if(dateEl) dateEl.textContent = d.toLocaleDateString(undefined, { weekday:"short", month:"short", day:"numeric", year:"numeric" });
}

/* ---------------- scheduling engine ---------------- */
export function calculateCurrentTimeline(){
  const DB = getDB();
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

export function runAutoUpdate(){
  const DB = getDB();
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

export function completeCurrentWeek(renderAll){
  const DB = getDB();
  const idx = calculateCurrentTimeline().currentWeekIndex;
  if(idx >= WEEKS.length) return;
  DB.schedule.weekStatus[idx] = "done";
  DB.schedule.currentIndex = Math.min(idx + 1, WEEKS.length - 1);
  saveDB(); renderAll();
}
export function missCurrentWeek(renderAll){
  const DB = getDB();
  const idx = calculateCurrentTimeline().currentWeekIndex;
  if(idx >= WEEKS.length) return;
  DB.schedule.weekStatus[idx] = "missed";
  DB.schedule.currentIndex = Math.min(idx + 1, WEEKS.length - 1);
  saveDB(); renderAll();
}
export function toggleTask(weekIdx, taskId){
  const DB = getDB();
  if(weekIdx > calculateCurrentTimeline().currentWeekIndex) return;
  const key = String(weekIdx);
  if(!DB.schedule.weekTaskDone[key]) DB.schedule.weekTaskDone[key] = [];
  const arr = DB.schedule.weekTaskDone[key];
  const pos = arr.indexOf(taskId);
  if(pos>-1) arr.splice(pos,1); else arr.push(taskId);
  saveDB();
}

export function currentMonthGlobalIndex(){
  const timeline = calculateCurrentTimeline();
  if(timeline.isFuture) return -1;
  return timeline.currentMonthIndex;
}
export function currentSemesterIndex(){
  const mg = currentMonthGlobalIndex();
  if(mg < 0) return 0;
  return Math.min(Math.floor(mg/6), SYLLABUS.length-1);
}

export function getTrackingViewportState(){
  return { activeTrackingViewport, selectedTrackingMonthIndex, selectedTrackingWeekIndex };
}
export function setSelectedTrackingMonthIndex(idx){ selectedTrackingMonthIndex = idx; }
export function setSelectedTrackingWeekIndex(idx){ selectedTrackingWeekIndex = idx; }

export function setTrackingViewport(view){
  activeTrackingViewport = view;
  document.querySelectorAll(".viewport-pane").forEach(panel=>panel.classList.toggle("active", panel.id === `viewport-${view}`));
  document.querySelectorAll(".crumb").forEach(btn=>btn.classList.toggle("active", btn.dataset.viewport === view));
}

export function switchTrackingView(targetScope){
  if(!["month","week","day"].includes(targetScope)) return;
  activeTrackingViewport = targetScope;
  setTrackingViewport(targetScope);
  if(targetScope === "month") renderMonthHeatmap();
  else renderTrackingDashboard();
}

export function renderMonthHeatmap(){
  const DB = getDB();
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

/** Month-level completion ratio, used by the heatmap and trend graph. */
export function getMonthPerformanceRatio(monthIndex) {
  const DB = getDB();
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

export function renderTrackingDashboard(){
  const DB = getDB();
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
    // Was hardcoded to getWeekKey(todayMidnight()) regardless of which
    // week is actually being displayed (selectedWeekIndex, set by
    // browsing the month/week picker above). That meant checking a task
    // for a browsed week wrote it into *today's* bucket under that other
    // week's task-id strings — never matching today's real tasks, and
    // never matching anything else either. Use the same weekKey the
    // displayed tasks (and academicGoals) are already keyed by, so what
    // you check off is stored against the week it actually belongs to.
    const key = weekKey;
    const checked = DB.tracking?.dailyLogs?.[key] || {};
    const tasks = [
      ...(activeWeek.skill?.tasks || []).map(task=>({ id:`skill:${task}`, text:task })),
      ...(activeWeek.academic?.tasks || []).map(task=>({ id:`academic:${task}`, text:task })),
      ...(activeWeek.project?.tasks || []).map(task=>({ id:`project:${task}`, text:task })),
      ...(activeWeek.domain ? [{ id:`domain:${activeWeek.domain.text}`, text: activeWeek.domain.text, isDomain: true, domainLabel: activeWeek.domain.sourceLabel }] : [])
    ];
    dayChecklist.innerHTML = `<ul class="task-list">${tasks.map(task=>`
      <li class="${checked[task.id]?"done":""}${task.isDomain?" is-domain-task":""}">
        <input type="checkbox" data-day-task="${task.id}" ${checked[task.id]?"checked":""}>
        <label>${task.isDomain ? Badge({ label: task.domainLabel, variant: "domain-rotation" }) : ""}${task.text}</label>
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

/* ---------------- RENDER: PROGRESS ---------------- */
export function renderProgress(){
  const DB = getDB();
  const yearBars = document.getElementById("yearBars");
  yearBars.innerHTML = CURRICULUM.years.map(year=>{
    const base = (year.id-1)*48;
    let done=0;
    for(let i=base; i<base+48; i++) if(DB.schedule.weekStatus[i]==="done") done++;
    const pct = Math.round((done/48)*100);
    return `<div class="year-bar-card">
        <div class="year-bar-label">${year.label.toUpperCase()} · ${year.theme}</div>
        ${ProgressBar({ pct, style: "year" })}
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

/* ============================================================
   SECTION: sub/analytics.js — standalone visualizations and exports
   that read tracking data but don't own any tracking state
   themselves: the canvas trend graph and the .ics calendar export.
   ============================================================ */

// `source` and setAnalyticsSource() are declared earlier in this file
// (tracking section) — see the note there. This function just reads
// from that same shared `source` binding.
export function drawTrajectoryPerformanceGraph(){
  const canvas = document.getElementById("trajectoryTrendGraph");
  if(!canvas) return;

  // The canvas has a fixed-resolution backing bitmap that has to match
  // its rendered CSS size (times devicePixelRatio) or it ends up
  // stretched/blurred — visually indistinguishable from a scaled-up
  // static image instead of a crisp live chart. It was only ever drawn
  // once, from renderTrackingDashboard(); if that first draw happened
  // while the canvas was hidden (e.g. renderAll() firing from a
  // different active page) clientWidth reads 0 and the code falls back
  // to a fixed 640x220 buffer — then nothing ever redraws it at the
  // right size again, so every future paint just stretches that same
  // undersized bitmap. Wire a ResizeObserver once so any real size
  // change (switching back to Home, window resize, sidebar width
  // change, etc.) triggers a fresh, correctly-sized redraw.
  if(!canvas.__trendResizeObserverAttached){
    canvas.__trendResizeObserverAttached = true;
    let scheduled = false;
    const ro = new ResizeObserver(entries=>{
      const entry = entries[0];
      if(!entry) return;
      if(!entry.contentRect.width || !entry.contentRect.height) return; // still hidden — ignore
      if(scheduled) return;
      scheduled = true;
      requestAnimationFrame(()=>{ scheduled = false; drawTrajectoryPerformanceGraph(); });
    });
    ro.observe(canvas);
  }

  const DB = getDB();
  const { MONTHS, getMonthPerformanceRatio } = source;
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

export function exportCalendarSchedule(){
  const DB = getDB();
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
    const uidStr = `trajectory-week-${i + 1}@local`;
    const summary = `Weekly milestone ${i + 1}`;
    lines.push("BEGIN:VEVENT");
    lines.push(`UID:${uidStr}`);
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

/* ============================================================
   SECTION: sub/home.js — the Home page: greeting header,
   pre-course "prep mode" checklist, current-week task list, weekly
   academic goals summary, GitHub/LeetCode status widgets,
   year/month trajectory strip, upcoming weeks list, and the
   Duolingo-style "learn card" hero.
   ============================================================
   This is the one page that reaches into nearly every other domain
   (schedule, academics, projects/dev-status, tracking) at once, which
   is why it lived on its own rather than inside any single domain
   module — same reasoning tracking.js documented for its relationship
   to analytics.js. Both now live together in this dashboard.js file.
   ============================================================ */

/**
 * renderHome(deps)
 * deps.renderHome: home.js couldn't import itself, but several
 *   handlers wired inside this render (prep checkboxes, week-task
 *   checkboxes) need to re-run the whole Home render after a DB
 *   write — same deps-injection pattern projects.js/settings.js use
 *   to avoid a circular import, rather than each other module owning
 *   a reference to renderHome directly. Preserved as-is.
 */
export function renderHome(deps){
  const DB = getDB();
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
      cb.addEventListener("change", ()=>{ DB.prep.done[cb.dataset.prepId]=cb.checked; saveDB(); deps.renderHome(); });
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
    // wk.tasks is the flat, remapped list (t0, t1, ...) built in
    // buildScheduleData; the domain rotation task, when present, is always
    // appended last, so match by position rather than by id.
    const domainTaskIndex = wk.domain ? wk.tasks.length - 1 : -1;
    cwTasks.innerHTML = wk.tasks.map((t, ti)=>{
      const isDomainTask = ti === domainTaskIndex;
      const domainBadge = isDomainTask
        ? Badge({ label: wk.domain.sourceLabel, variant: "domain-rotation", title: wk.domain.isCrossDomain ? "Borrowed from an adjacent domain to keep you well-rounded" : "Reinforces your specialization" })
        : "";
      return `
      <li class="${doneIds.includes(t.id)?'done':''}${isDomainTask?' is-domain-task':''}">
        <input type="checkbox" data-task="${t.id}" ${doneIds.includes(t.id)?'checked':''}>
        <label>${domainBadge}${t.text}</label>
      </li>`;
    }).join("");
    cwTasks.querySelectorAll("[data-task]").forEach(cb=>{
      cb.addEventListener("change", ()=>{ toggleTask(idx, cb.dataset.task); deps.renderHome(); });
    });
  }

  const homeSem = SYLLABUS[currentSemesterIndex()] || SYLLABUS[0];
  const homeFallbackSubjects = (homeSem?.subjects || []).map(subject=>({ name: subject.name, topics: subject.topics || [] }));
  const homeSourceSubjects = (DB.academics?.subjects || []).length ? DB.academics.subjects : homeFallbackSubjects;
  const homeAcademicGoals = buildAcademicGoalEntries(homeSourceSubjects, getWeekKey(today)).slice(0, 5);
  const homeAcademicBlock = document.getElementById("homeAcademicGoals");
  if(homeAcademicBlock){
    homeAcademicBlock.innerHTML = homeAcademicGoals.length
      ? GoalStack(homeAcademicGoals.map(g=>g.label))
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
    homeGithubStatus.innerHTML = gh.profile
      ? StatusRow({
          avatarHTML: `<img src="${gh.profile.avatar}" alt="">`,
          titleHTML: `<a href="${gh.profile.url}" target="_blank" rel="noopener">@${gh.profile.login}</a>`,
          metaHTML: `GitHub · ${gh.profile.publicRepos} repos · ${gh.profile.followers} followers`
        })
      : StatusRow({ iconLabel: "GH", metaHTML: `<span class="dev-status-empty">GitHub not connected — add a username in Settings.</span>` });
  }
  const homeLeetcodeStatus = document.getElementById("homeLeetcodeStatus");
  if(homeLeetcodeStatus){
    const lt = DB.leetcode || {};
    homeLeetcodeStatus.innerHTML = lt.profile
      ? StatusRow({
          iconLabel: "LC",
          titleHTML: `<a href="https://leetcode.com/${lt.username}/" target="_blank" rel="noopener">@${lt.username}</a>`,
          metaHTML: `LeetCode · ${lt.profile.totalSolved} solved · Rank #${lt.profile.ranking ?? "—"}`
        })
      : StatusRow({ iconLabel: "LC", metaHTML: `<span class="dev-status-empty">LeetCode not connected — add a username in Settings.</span>` });
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
  renderLearnCard();
}

/* ---------------- RENDER: LEARN / GREETING ---------------- */
/**
 * Duolingo-style hero: time-of-day greeting, a bold "N tasks left"
 * headline, the current year/month/week + date, a progress bar for
 * this week's task list, and a Continue button that jumps into
 * today's checklist. Pure read of existing data — adds no new DB
 * fields. (Task completion here is tracked per-week via
 * DB.tracking.dailyLogs, same store the day-checklist on Home already
 * uses — there's no separate daily granularity in the DB.)
 */
function greetingForHour(h){
  if(h < 5) return "Still up";
  if(h < 12) return "Good morning";
  if(h < 17) return "Good afternoon";
  if(h < 21) return "Good evening";
  return "Good evening";
}

export function renderLearnCard(){
  const DB = getDB();
  const eyebrowEl = document.getElementById("learnGreetingEyebrow");
  const titleEl = document.getElementById("learnGreetingTitle");
  const metaEl = document.getElementById("learnGreetingSub");
  const startBtn = document.getElementById("learnStartBtn");
  const startLabel = document.getElementById("learnStartLabel");
  const progressCount = document.getElementById("learnProgressCount");
  const progressFill = document.getElementById("learnProgressFill");
  if(!titleEl || !metaEl || !startBtn) return;
  const name = (DB.profile.name || "").trim();
  const hour = nowDate().getHours();
  eyebrowEl.textContent = name ? `${greetingForHour(hour)}, ${name}.` : `${greetingForHour(hour)}.`;

  const monthGlobal = currentMonthGlobalIndex();
  const month = monthGlobal >= 0 ? MONTHS[monthGlobal] : null;
  const track = DB.profile.track ? TRACKS[DB.profile.track] : null;
  const timeline = calculateCurrentTimeline();

  if(!month){
    // Course hasn't started (or schedule is exhausted) — no lesson to
    // launch into yet, so point at setup instead of a fake task/progress bar.
    titleEl.textContent = track ? `Ready when your course starts.` : `Let's find your track.`;
    metaEl.textContent = track
      ? `You're set on ${track.label} — lessons and tasks show up here once your course begins.`
      : `Take the field quiz in Settings to unlock a personalized daily lesson.`;
    startLabel.textContent = track ? "Preview the track" : "Take the field quiz";
    startBtn.onclick = () => goToPage("settings");
    if(progressCount) progressCount.textContent = "0/0";
    if(progressFill) progressFill.style.width = "0%";
    return;
  }

  const activeWeek = WEEKS[timeline.currentWeekIndex] || null;
  const weekKey = getWeekKey(todayMidnight());
  const checked = DB.tracking?.dailyLogs?.[weekKey] || {};
  const weekTasks = activeWeek ? [
    ...(activeWeek.skill?.tasks || []).map(t=>({ id:`skill:${t}`, text:t })),
    ...(activeWeek.academic?.tasks || []).map(t=>({ id:`academic:${t}`, text:t })),
    ...(activeWeek.project?.tasks || []).map(t=>({ id:`project:${t}`, text:t })),
    ...(activeWeek.domain ? [{ id:`domain:${activeWeek.domain.text}`, text: activeWeek.domain.text }] : [])
  ] : [];
  const doneCount = weekTasks.filter(t => checked[t.id]).length;
  const totalCount = weekTasks.length;
  const remaining = totalCount - doneCount;
  const pct = totalCount ? Math.round((doneCount/totalCount)*100) : 0;

  titleEl.textContent = remaining > 0
    ? `You have ${remaining} task${remaining===1?"":"s"} left this week.`
    : totalCount > 0 ? `This week's tasks are all done.` : `Nothing queued for this week yet.`;
  metaEl.textContent = `${activeWeek?.yearLabel || ""} · ${month.name} · Week ${activeWeek?.weekInMonth ?? ""} · ${fmtLong(todayMidnight())}`;
  startLabel.textContent = remaining > 0 ? "Continue" : "Review week";

  startBtn.onclick = () => {
    goToPage("home");
    document.getElementById("crumb-day")?.click();
    document.getElementById("dayTaskChecklistContainer")?.scrollIntoView({ behavior:"smooth", block:"center" });
  };

  if(progressCount) progressCount.textContent = `${doneCount}/${totalCount}`;
  if(progressFill) progressFill.style.width = `${pct}%`;
}
