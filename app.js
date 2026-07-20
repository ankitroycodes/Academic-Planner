/* ============================================================
   app.js — TRAJECTORY entrypoint + configuration domain.
   ============================================================
   Merged from (original module boundaries, preserved as section
   headers below so behavior/ownership stays traceable):
     - sub/onboarding.js  (first-run wizard: profile basics, track
                           quiz, recommended-track result screen; also
                           "retake quiz" from Settings)
     - sub/settings.js    (Settings page: profile/college/theme
                           controls, external sync cards, version
                           history, danger-zone reset)
     - app.js             (original entrypoint: renderAll() umbrella
                           re-render + init() app boot)

   Load-order note: within a single file, all `function`/`export let`
   declarations are hoisted or evaluated top-to-bottom in module
   order, same as before. init() below still runs last (as a call at
   the bottom of the file), same as the original app.js.
   ============================================================ */
import { DEFAULT_COLLEGE_ID, setActiveCollege, QUIZ, TRACKS, COLLEGES, collegeShortLabel, collegeFullLabel } from "./data.js";
import {
  getDB, loadDB, setDB, DB_KEY, HISTORY_KEY, storageDelete, saveDB,
  getHistory, clearHistoryCache, DEFAULT_DB,
  applyTheme, enhanceAllSelects, openDialog, showNotice, goToPage, clone,
  Chip, DetailList, HistoryRow, TimelineRow, PulsePanel
} from "./core.js";
import {
  buildScheduleData, tickClock, syncTime, runAutoUpdate, switchTrackingView, renderProgress,
  exportCalendarSchedule, renderHome, renderAcademics, populateAcademicPickers, initAcademicsEvents
} from "./dashboard.js";
import {
  renderProjects, initProjectsEvents, renderResume, initResumeEvents, getShippedProjects,
  wireAsyncSyncButton, syncGitHubProfile, syncLeetCodeProfile, syncCodeforcesProfile, syncCodeChefProfile
} from "./profile.js";

/* ============================================================
   SECTION: sub/onboarding.js — the first-run wizard: profile
   basics, the track quiz, and the recommended-track result screen.
   Also handles "retake quiz" from Settings, which reuses the same
   wizard UI.
   ============================================================ */
export let onboardCollege = DEFAULT_COLLEGE_ID;
let obQuizIndex = 0;
let obQuizAnswers = {};
let obResultTrack = null;

export function renderOnboardCollegePicker(){
  const sel = document.getElementById("obCollege");
  if(sel) sel.value = onboardCollege;
}

/** Resets wizard state for a fresh first-run (called once from app.js's init() when no profile exists yet). */
export function resetOnboardingState(){
  obQuizIndex = 0; obQuizAnswers = {}; obResultTrack = null;
  onboardCollege = getDB().settings.college || DEFAULT_COLLEGE_ID;
}

export function goToObStep(n){
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

/**
 * Wires the onboarding wizard's navigation, quiz, and final submit, plus
 * the "retake quiz" entry point from Settings. `onComplete` runs the full
 * app-boot sequence (rebuild schedule, populate pickers, renderAll) shared
 * by both first-run onboarding and settings-triggered retakes — owned by
 * app.js since it touches nearly every module.
 */
export function initOnboardingEvents(onComplete){
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
    const DB = getDB();
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
    onComplete();
  });

  const retakeBtn = document.getElementById("stRetakeQuiz");
  if(retakeBtn) retakeBtn.addEventListener("click", ()=>{
    const DB = getDB();
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
}

/* ============================================================
   SECTION: sub/settings.js — the Settings page: profile/college/
   theme controls, external sync cards (GitHub/LeetCode/Codeforces/
   CodeChef), version history, and the danger-zone reset entry point
   (the actual reset handler is wired in the app.js section below,
   since it also needs storageDelete + location.reload()).
   ============================================================ */
export function populateCollegeSelects(){
  const optionsHTML = Object.values(COLLEGES)
    .map(c => `<option value="${c.id}">${collegeShortLabel(c)}</option>`)
    .join("");
  ["obCollege", "collegePicker"].forEach(id=>{
    const sel = document.getElementById(id);
    if(sel) sel.innerHTML = optionsHTML;
  });
}

function renderSubmissionHistory(){
  const DB = getDB();
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
      return TimelineRow({
        state: "ok",
        titleHTML: `<strong>${s.projectLabel}</strong> <span class="submission-repo">${s.repoName || s.input}</span>`,
        metaHTML: `Verified &amp; shipped · quality ${s.qualityScore}/100 · ${when}`
      });
    }
    return TimelineRow({
      state: "fail",
      titleHTML: `<strong>${s.projectLabel}</strong> <span class="submission-repo">${s.input || "—"}</span>`,
      metaHTML: `Failed at <em>${s.step}</em> — ${s.error} · ${when}`
    });
  }).join("");
}

/**
 * Renders the Settings page. `deps` supplies the small set of other
 * pages' render functions Settings needs to refresh after actions that
 * cascade app-wide (theme, college switch, version restore, import).
 */
export function renderSettings(deps){
  const DB = getDB();
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
    institutionDetail.innerHTML = college ? DetailList([
      { label: "College", value: college.collegeName },
      { label: "Degree", value: college.degree },
      { label: "Branch", value: college.branch },
      { label: "University", value: college.university }
    ]) : "";
  }
  const linkIconSVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 17H7a5 5 0 010-10h2M15 7h2a5 5 0 010 10h-2M8 12h8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`;

  const ghInput = document.getElementById("ghUsername");
  const ghSummary = document.getElementById("ghSummary");
  if(ghInput) ghInput.value = DB.github?.username || "";
  if(ghSummary){
    const gh = DB.github || {};
    const repos = (gh.profile ? (gh.repos || []) : []).slice(0,3)
      .map(repo=>`<a class="pulse-repo-row" href="${repo.url}" target="_blank" rel="noopener">${linkIconSVG}<span class="repo-name">${repo.name}</span>${repo.language ? `<span class="repo-lang">${repo.language}</span>` : ""}</a>`).join("");
    ghSummary.innerHTML = PulsePanel({
      connected: !!gh.profile,
      emptyText: "Your public GitHub activity will appear here after a sync — this becomes your verified development identity for project submissions.",
      avatarHTML: gh.profile ? `<img class="pulse-avatar" src="${gh.profile.avatar}" alt="">` : "",
      handleHTML: gh.profile ? `<a href="${gh.profile.url}" target="_blank" rel="noopener">@${gh.profile.login}</a>` : "",
      subline: gh.profile ? `${gh.profile.publicRepos} public repos · ${gh.profile.followers} follower${gh.profile.followers===1?"":"s"}` : "",
      trailingChipHTML: gh.verifiedIdentity ? Chip({ label: "Verified identity" }) : "",
      extraHTML: gh.profile ? `<div class="pulse-repo-list">${repos || `<div class="pulse-panel-empty">No recent public repositories found.</div>`}</div>` : "",
      syncedAt: gh.lastSyncedAt
    });
  }
  renderSubmissionHistory();

  const ltInput = document.getElementById("ltUsername");
  const ltSummary = document.getElementById("ltSummary");
  if(ltInput) ltInput.value = DB.leetcode?.username || "";
  if(ltSummary){
    const lt = DB.leetcode || {};
    const p = lt.profile || {};
    ltSummary.innerHTML = PulsePanel({
      connected: !!lt.profile,
      emptyText: "Your public LeetCode stats will appear here after a sync.",
      handleHTML: lt.profile ? `<a href="https://leetcode.com/${lt.username}/" target="_blank" rel="noopener">@${lt.username}</a>` : "",
      subline: lt.profile ? `${p.totalSolved}/${p.totalQuestions} solved` : "",
      trailingChipHTML: lt.profile ? Chip({ label: `Rank #${p.ranking ?? "—"}` }) : "",
      stats: lt.profile ? [
        { value: p.easySolved, label: "Easy" },
        { value: p.mediumSolved, label: "Medium" },
        { value: p.hardSolved, label: "Hard" }
      ] : [],
      syncedAt: lt.lastSyncedAt
    });
  }

  const cfInput = document.getElementById("cfUsername");
  const cfSummary = document.getElementById("cfSummary");
  if(cfInput) cfInput.value = DB.codeforces?.username || "";
  if(cfSummary){
    const cf = DB.codeforces || {};
    const p = cf.profile || {};
    cfSummary.innerHTML = PulsePanel({
      connected: !!cf.profile,
      emptyText: "Your public Codeforces rating will appear here after a sync. Note: Codeforces' API doesn't allow direct browser requests, so sync may fail even with a valid handle.",
      handleHTML: cf.profile ? `<a href="https://codeforces.com/profile/${cf.username}" target="_blank" rel="noopener">@${cf.username}</a>` : "",
      subline: cf.profile ? (p.rank || "unrated") : "",
      trailingChipHTML: cf.profile ? Chip({ label: `Rating ${p.rating ?? "—"}` }) : "",
      stats: cf.profile ? [
        { value: p.maxRating ?? "—", label: "Max rating" },
        { value: p.maxRank ? p.maxRank.replace(/\b\w/g, c=>c.toUpperCase()) : "—", label: "Best rank" }
      ] : [],
      syncedAt: cf.lastSyncedAt
    });
  }

  const ccInput = document.getElementById("ccUsername");
  const ccSummary = document.getElementById("ccSummary");
  if(ccInput) ccInput.value = DB.codechef?.username || "";
  if(ccSummary){
    const cc = DB.codechef || {};
    const p = cc.profile || {};
    ccSummary.innerHTML = PulsePanel({
      connected: !!cc.profile,
      emptyText: "Your public CodeChef rating will appear here after a sync. This uses an unofficial API and may occasionally be unavailable.",
      handleHTML: cc.profile ? `<a href="https://www.codechef.com/users/${cc.username}" target="_blank" rel="noopener">@${cc.username}</a>` : "",
      subline: cc.profile ? (p.stars ? `${p.stars}★` : "Unrated") : "",
      trailingChipHTML: cc.profile ? Chip({ label: `Rating ${p.rating ?? "—"}` }) : "",
      stats: cc.profile ? [
        { value: p.highestRating ?? "—", label: "Max rating" },
        { value: p.globalRank ?? "—", label: "Global rank" }
      ] : [],
      syncedAt: cc.lastSyncedAt
    });
  }
  const historyList = document.getElementById("historyList");
  if(historyList){
    const history = getHistory().slice(0, 8);
    historyList.innerHTML = history.length ? history.map(item=>HistoryRow({
      titleHTML: item.reason || "Update",
      metaHTML: new Date(item.at).toLocaleString(),
      actionHTML: `<button class="btn btn-ghost btn-sm" data-restore-version="${item.id}">Restore</button>`
    })).join("") : `<div class="empty-sub">No saved versions yet.</div>`;
    historyList.querySelectorAll("[data-restore-version]").forEach(btn=>btn.addEventListener("click", ()=>{
      const version = getHistory().find(item=>item.id===btn.dataset.restoreVersion);
      if(!version){ showNotice("That version is no longer available.", "error"); return; }
      openDialog({ eyebrow:"VERSION HISTORY", title:"Restore this version?", copy:`Restore the version from ${new Date(version.at).toLocaleString()}? Your current state will first be saved as a new version.`, confirmLabel:"Restore version", onConfirm:()=>{
        setDB(clone(version.data)); saveDB("Restored previous version"); applyTheme(); deps.renderAll(); showNotice("Previous version restored.", "success");
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

/**
 * Wires every Settings-page control. `deps` supplies the cross-module
 * hooks Settings actions cascade into: renderAll (theme/college/restore/
 * import all touch every page), populateAcademicPickers + runAutoUpdate
 * (college switch rebuilds the academics pickers and re-anchors the
 * schedule), and syncTime (manual resync button).
 */
export function initSettingsEvents(deps){
  document.getElementById("themeToggle").addEventListener("click", ()=>{
    const DB = getDB();
    DB.settings.theme = DB.settings.theme === "orchid" ? "lavender" : "orchid";
    saveDB("Theme changed"); applyTheme(); renderSettings(deps);
  });
  document.querySelectorAll(".theme-swatch").forEach(btn=>btn.addEventListener("click", ()=>{
    const DB = getDB();
    DB.settings.theme = btn.dataset.theme;
    saveDB("Theme changed"); applyTheme(); renderSettings(deps);
  }));
  document.getElementById("collegePicker").addEventListener("change", (e)=>{
    const DB = getDB();
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
        deps.populateAcademicPickers(); deps.renderAll();
        showNotice(`Academics switched to ${collegeFullLabel(COLLEGES[key]) || key}.`, "success");
      }
    });
    e.target.value = prevKey;
  });

  wireAsyncSyncButton("ghSync", "ghUsername", syncGitHubProfile, "GitHub sync failed.", deps);
  wireAsyncSyncButton("ltSync", "ltUsername", syncLeetCodeProfile, "LeetCode sync failed.", deps);
  wireAsyncSyncButton("cfSync", "cfUsername", syncCodeforcesProfile, "Codeforces sync failed.", deps);
  wireAsyncSyncButton("ccSync", "ccUsername", syncCodeChefProfile, "CodeChef sync failed.", deps);

  document.getElementById("stSave").addEventListener("click", ()=>{
    const DB = getDB();
    const name = document.getElementById("stName").value.trim();
    const date = document.getElementById("stDate").value;
    if(!name || !date){ showNotice("Name and start date are required.", "error"); return; }
    DB.profile.name = name; DB.profile.startDate = date;
    saveDB(); deps.runAutoUpdate(); deps.renderAll();
  });
  document.getElementById("stResync").addEventListener("click", deps.syncTime);

  document.getElementById("stExport").addEventListener("click", ()=>{
    const DB = getDB();
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
        setDB(Object.assign(clone(DEFAULT_DB), parsed));
        const saved = saveDB("Backup imported");
        if(!saved) return false; // saveDB already surfaced the specific storage error
        applyTheme();
        document.getElementById("onboardOverlay").hidden = true; document.getElementById("app").hidden = false;
        deps.runAutoUpdate(); deps.populateAcademicPickers(); deps.renderAll(); showNotice("Backup imported.", "success");
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
      clearHistoryCache();
      storageDelete(HISTORY_KEY);
      renderSettings(deps); showNotice("Saved versions cleared.", "success");
    }});
  });
}

/* ============================================================
   SECTION: app.js (original) — TRAJECTORY entrypoint.
   ============================================================
   Owns only: renderAll() (the umbrella re-render) and init() (app
   boot). Every actual feature lives in its own section/module; this
   part's job is wiring them together via a shared `deps` object,
   since a few sections (projects, settings, home) need to call back
   into renderers owned by other sections without creating circular
   references.
   ============================================================ */

/**
 * The `deps` bag every render/init function that can't safely call its
 * callers directly is handed (avoids circular-call ordering issues
 * between e.g. projects <-> home <-> resume). Built once here so every
 * section sees the same live references.
 */
const deps = {
  renderAll,
  renderHome: () => renderHome(deps),
  renderAcademics,
  renderProjects: () => renderProjects(deps),
  renderProgress,
  renderResume,
  renderSettings: () => renderSettings(deps),
  getShippedProjects,
  populateAcademicPickers,
  runAutoUpdate,
  syncTime
};

/** Re-renders every page. Called after any change that could affect more than one page's data (imports, college switch, onboarding completion, etc). */
function renderAll(){
  renderHome(deps);
  renderAcademics();
  renderProjects(deps);
  renderProgress();
  renderResume();
  renderSettings(deps);
}

async function init(){
  loadDB();
  const DB = getDB();
  setActiveCollege(DB.settings.college || DEFAULT_COLLEGE_ID);
  populateCollegeSelects();
  buildScheduleData();
  applyTheme();
  tickClock();
  setInterval(tickClock, 1000);

  resetOnboardingState();
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

  // Wired FIRST and defensively: if any other page's init*Events() below
  // throws (e.g. a missing/renamed element id), that must not be able to
  // silently prevent the onboarding "Continue"/"Begin trajectory" buttons
  // from getting their click listeners — that's the one interaction a
  // first-run user cannot work around.
  initOnboardingEvents(()=>{
    buildScheduleData();
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

  // Each page's event wiring is independent — one page's missing/renamed
  // element id shouldn't be able to take down every other page's buttons
  // (including the ones above). Failures are logged, not swallowed.
  const wireSafely = (label, fn) => {
    try { fn(); }
    catch(err){ console.error(`[Trajectory] ${label} failed to wire up:`, err); }
  };
  wireSafely("Academics", initAcademicsEvents);
  wireSafely("Projects", () => initProjectsEvents(deps));
  wireSafely("Resume", initResumeEvents);
  wireSafely("Settings", () => initSettingsEvents(deps));

  document.getElementById("exportIcalBtn")?.addEventListener("click", exportCalendarSchedule);

  document.getElementById("stReset")?.addEventListener("click", ()=>{
    openDialog({
      eyebrow:"DANGER ZONE", title:"Reset all local data?",
      copy:"This permanently erases your profile progress from this browser.",
      confirmLabel:"Reset all data", danger:true,
      onConfirm:()=>{
        [DB_KEY, HISTORY_KEY, "trajectoryDB_v1", "trajectoryDB_v2"].forEach(key=>storageDelete(key));
        location.reload();
      }
    });
  });

  enhanceAllSelects();
}

init();
