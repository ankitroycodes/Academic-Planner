/* ============================================================
   core.js — TRAJECTORY shared foundation.
   ============================================================
   Merged from (original module boundaries, preserved as section
   headers below so behavior/ownership stays traceable):
     - components.js  (reusable HTML-string builders)
     - sub/utils.js   (pure helpers, no DB/DOM access)
     - sub/storage.js (DB state + localStorage persistence)
     - sub/ui.js      (toast notices, shared dialog, theme, custom <select>)
     - sub/router.js  (top-level page switching)

   Load-order note: within a single file, all `function` declarations
   are hoisted, so the storage/ui/router sections below can reference
   each other (e.g. saveDB() calling showNotice()) regardless of the
   order they appear in — same effective behavior as the original
   cross-file imports, now same-file references instead.
   ============================================================ */
import { DEFAULT_COLLEGE_ID } from "./data.js";

/* ============================================================
   SECTION: components.js — Reusable UI components
   ============================================================
   Small, dependency-free HTML-string builders for interface pieces
   that recur across pages (Home, Academics, Projects, Progress,
   Resume, Settings). Each function takes plain data and returns a
   markup string — no DOM binding, no state. Callers still own their
   own event wiring, exactly as before.

   None of this changes CSS class names — every component renders the
   same classes the hand-written markup already used, so style.css
   requires no changes.
   ============================================================ */

/** Escapes a value for safe interpolation into HTML text/attributes. */
function escapeHTML(value){
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[ch]));
}

/* ---------------- Badge ----------------
   Small pill label. Variant selects the color treatment; all variants
   are pre-existing CSS classes (badge-planned, badge-progress, ...).
------------------------------------------------------------------ */
const BADGE_VARIANTS = new Set([
  "planned", "progress", "shipped", "verified", "recommended",
  "domain-rotation", "module", "engineering"
]);

/**
 * Badge({ label, variant, title, icon })
 * variant: one of BADGE_VARIANTS (default "planned")
 * icon: optional raw HTML (e.g. a checkmark) prepended to the label
 */
export function Badge({ label, variant = "planned", title = "", icon = "" } = {}){
  const cls = BADGE_VARIANTS.has(variant) ? `badge-${variant}` : "badge-planned";
  const titleAttr = title ? ` title="${escapeHTML(title)}"` : "";
  return `<span class="badge ${cls}"${titleAttr}>${icon}${escapeHTML(label)}</span>`;
}

/** Shared status → badge config, used by project cards and anywhere else a shipped/progress/planned state needs a badge. */
function statusBadgeConfig(status){
  return {
    variant: status === "shipped" ? "shipped" : status === "progress" ? "progress" : "planned",
    label: status === "shipped" ? "SHIPPED" : status === "progress" ? "IN PROGRESS" : "PLANNED"
  };
}
export function StatusBadge(status){
  return Badge(statusBadgeConfig(status));
}

/* ---------------- Chip (status-chip) ----------------
   Rounded, dotted status indicator — used for "Verified identity",
   "Rank #123", "Rating 1450", etc.
------------------------------------------------------------------ */
/**
 * Chip({ label, dot })
 * dot: whether to show the small glowing indicator dot (default true)
 */
export function Chip({ label, dot = true } = {}){
  return `<span class="status-chip">${dot ? `<span class="dot"></span>` : ""}${escapeHTML(label)}</span>`;
}

/* ---------------- Tag / TagList ----------------
   Small rounded tag pills for stack/skill/topic lists.
------------------------------------------------------------------ */
/** Tag(label, variant) — variant selects the CSS class ("pc-tag" default, or e.g. "topic-tag"). */
export function Tag(label, variant = "pc-tag"){
  return `<span class="${variant}">${escapeHTML(label)}</span>`;
}
/** TagList(items, variant) — replaces the old tagPillsHTML(items) helper 1:1 when variant is omitted. */
export function TagList(items, variant = "pc-tag"){
  return (items || []).map(t => Tag(t, variant)).join("");
}

/**
 * GoalStack(labels) — the wrapped pill list used for weekly academic
 * goals on Home and Academics (identical markup, previously duplicated).
 */
export function GoalStack(labels){
  return `<div class="goal-stack">${(labels || []).map(l => `<div class="goal-pill">${escapeHTML(l)}</div>`).join("")}</div>`;
}

/* ---------------- ProgressBar ----------------
   Thin horizontal bar used for quality scores, year completion, and
   roadmap tier completion. All three previously had separate near-
   identical markup (quality-bar / year-bar-track / roadmap-tier-track);
   this covers all of them via a `style` switch since each has its own
   CSS sizing, while keeping one shared implementation.
------------------------------------------------------------------ */
/**
 * ProgressBar({ pct, style, tier, color })
 * style: "quality" | "year" (default "year")
 *   - "quality": thin 4px bar with tier-based color (high/mid/low), used on project cards
 *   - "year":    thicker 8px bar with glow, used for year/tier completion
 * tier: for style="quality" — "high"|"mid"|"low"; auto-derived from pct if omitted
 * color: for style="year" — CSS color/var() override (e.g. "var(--amber)")
 */
export function ProgressBar({ pct = 0, style = "year", tier, color } = {}){
  const clamped = Math.max(0, Math.min(100, pct));
  if(style === "quality"){
    const t = tier || (clamped >= 70 ? "high" : clamped >= 40 ? "mid" : "low");
    return `<span class="quality-bar"><span class="quality-bar-fill" data-tier="${t}" style="width:${clamped}%"></span></span>`;
  }
  const colorStyle = color ? ` background:${color}` : "";
  return `<div class="year-bar-track"><div class="year-bar-fill" style="width:${clamped}%;${colorStyle}"></div></div>`;
}

/* ---------------- Card ----------------
   The base `.card` container used everywhere. Most call sites build
   custom bodies, so Card() takes pre-built bodyHTML rather than trying
   to model every possible card layout — it standardizes the eyebrow/
   title header and the outer classes/attributes instead.
------------------------------------------------------------------ */
/**
 * Card({ eyebrow, title, bodyHTML, variant, baseClass, attrs })
 * variant: extra class(es) appended to baseClass, e.g. "accent-card", "danger-card"
 * baseClass: the container's own root class (default "card"). Some card-
 *   shaped elements (e.g. "subject-card") define their look independently
 *   of ".card" rather than as a modifier on it — pass baseClass to swap
 *   the root class entirely instead of stacking onto ".card".
 * attrs: raw extra HTML attributes string, e.g. 'id="myCard"'
 * If both eyebrow and title are omitted, bodyHTML alone is wrapped.
 */
export function Card({ eyebrow = "", title = "", bodyHTML = "", variant = "", baseClass = "card", attrs = "" } = {}){
  const cls = [baseClass, variant].filter(Boolean).join(" ");
  const head = [
    eyebrow ? `<div class="card-eyebrow">${escapeHTML(eyebrow)}</div>` : "",
    title ? `<h2>${escapeHTML(title)}</h2>` : ""
  ].join("");
  return `<div class="${cls}"${attrs ? " " + attrs : ""}>${head}${bodyHTML}</div>`;
}

/**
 * DetailList(rows) — a stack of label/value rows, e.g. institution details.
 * rows: array of { label, value }
 */
export function DetailList(rows){
  return (rows || []).map(r => `<div class="institution-detail-row"><span>${escapeHTML(r.label)}</span><strong>${escapeHTML(r.value)}</strong></div>`).join("");
}

/* ---------------- StatusRow ----------------
   Icon/avatar + title + meta line + optional trailing chip/action.
   Covers: dev-status-item (home GitHub/LeetCode widgets), pulse-panel
   identity rows (Settings sync cards), and history-item rows — all of
   which were hand-rolled with the same visual shape.
------------------------------------------------------------------ */
/**
 * StatusRow({ avatarHTML, iconLabel, titleHTML, metaHTML, trailingHTML, wrapperClass })
 * Exactly one of avatarHTML or iconLabel is normally supplied:
 *   avatarHTML: raw <img> markup for a real avatar
 *   iconLabel:  short text (e.g. "GH", "LC") rendered in a circular badge
 * titleHTML / metaHTML / trailingHTML: raw HTML (caller controls links etc.)
 * wrapperClass: e.g. "dev-status-item" (default) — lets the same shape
 *   render inside different containers without changing spacing rules.
 */
export function StatusRow({ avatarHTML = "", iconLabel = "", titleHTML = "", metaHTML = "", trailingHTML = "", wrapperClass = "dev-status-item" } = {}){
  const leading = avatarHTML || (iconLabel ? `<div class="dev-status-icon">${escapeHTML(iconLabel)}</div>` : "");
  const body = titleHTML || metaHTML
    ? `<div class="dev-status-body">${titleHTML}${metaHTML ? `<span class="dev-status-meta">${metaHTML}</span>` : ""}</div>`
    : "";
  return `<div class="${wrapperClass}">${leading}${body}${trailingHTML}</div>`;
}

/* ---------------- Timeline / TimelineRow ----------------
   Vertical list of dated entries with a state-colored marker — covers
   submission history (pass/fail) and version history (restore) rows,
   which previously had separate near-identical markup.
------------------------------------------------------------------ */
/**
 * TimelineRow({ state, titleHTML, metaHTML, trailingHTML })
 * state: "ok" | "fail" | "neutral" — controls the row's accent class
 * Renders a `.submission-row` shaped block (reused as-is; the class
 * name predates this component but the visual shape is generic enough
 * to serve any "what happened, when" log entry).
 */
export function TimelineRow({ state = "neutral", titleHTML = "", metaHTML = "", trailingHTML = "" } = {}){
  const stateCls = state === "ok" ? "submission-ok" : state === "fail" ? "submission-fail" : "";
  return `
    <div class="submission-row ${stateCls}">
      <div class="submission-row-main">${titleHTML}${trailingHTML}</div>
      ${metaHTML ? `<div class="submission-row-meta">${metaHTML}</div>` : ""}
    </div>`;
}

/**
 * HistoryRow({ titleHTML, metaHTML, actionHTML })
 * The simpler "history-item" shape (version history list): title/date
 * on the left, one action button on the right.
 */
export function HistoryRow({ titleHTML = "", metaHTML = "", actionHTML = "" } = {}){
  return `<div class="history-item"><div><strong>${titleHTML}</strong><span>${metaHTML}</span></div>${actionHTML}</div>`;
}

/**
 * ChecklistRow({ priority, textHTML, dueLabel })
 * The "resume-check-item" shape: a colored dot (by priority) + a
 * description line + a due/label line. Same family as TimelineRow but
 * with a priority-colored dot marker instead of a left-border state.
 */
export function ChecklistRow({ priority = "low", textHTML = "", dueLabel = "" } = {}){
  return `
    <div class="resume-check-item ${priority}">
      <span class="resume-check-dot"></span>
      <div class="resume-check-body">
        <div class="resume-check-text">${textHTML}</div>
        <div class="resume-check-due">${escapeHTML(dueLabel)}</div>
      </div>
    </div>`;
}

/* ---------------- Modal ----------------
   The app already has a single shared dialog instance (#appDialog,
   driven by openDialog() further down this file) for confirmations
   and small forms — that IS the reusable modal component and is left
   as-is here to avoid changing its call sites. ModalField below
   standardizes just the per-field markup fragment it builds
   internally, since that part was assembled with template-literal
   ternaries inline.
------------------------------------------------------------------ */
/**
 * ModalField({ id, label, type, placeholder, value, multiline })
 * Mirrors the field shape openDialog() already expects/consumes.
 */
export function ModalField({ id, label, type = "text", placeholder = "", value = "", multiline = false }){
  const tag = multiline ? "textarea" : "input";
  const typeAttr = multiline ? "" : ` type="${type}"`;
  const inner = multiline ? escapeHTML(value) : "";
  return `<label class="field-label" for="dialog-${id}">${escapeHTML(label)}<${tag} class="field-input" id="dialog-${id}"${typeAttr} placeholder="${escapeHTML(placeholder)}">${inner}</${tag}>`;
}

/* ---------------- Pulse Panel ----------------
   The GitHub/LeetCode/Codeforces/CodeChef sync summaries in Settings
   were four near-identical blocks: identity row (avatar/handle/sub-
   line) + optional trailing chip + a row of stat callouts + a "Synced
   at" footer, wrapped in the same empty-state fallback when nothing is
   connected yet. This is that shape, generalized over the pieces that
   actually differ per-service.
------------------------------------------------------------------ */
/**
 * PulsePanel({ connected, emptyText, avatarHTML, handleHTML, subline, trailingChipHTML, stats, extraHTML, syncedAt })
 * connected: if false, renders the empty-state panel with emptyText and returns early
 * avatarHTML: raw <img>/icon markup, optional
 * handleHTML: raw HTML for the linked handle/username line
 * subline: plain text under the handle (escaped)
 * trailingChipHTML: raw HTML for a Chip()/similar shown at the row's end
 * stats: array of { value, label } rendered as pulse-stat callouts
 * extraHTML: raw HTML inserted between the identity row and the stats
 *   (used by GitHub for the repo list)
 * syncedAt: ISO date string; renders the "Synced ..." footer if present
 */
export function PulsePanel({ connected = false, emptyText = "", avatarHTML = "", handleHTML = "", subline = "", trailingChipHTML = "", stats = [], extraHTML = "", syncedAt = "" } = {}){
  if(!connected){
    return `<div class="pulse-panel pulse-panel-empty">${escapeHTML(emptyText)}</div>`;
  }
  const statsHTML = stats.length
    ? `<div class="pulse-stat-row">${stats.map(s => `<div class="pulse-stat stat-accent"><strong>${escapeHTML(s.value)}</strong><span>${escapeHTML(s.label)}</span></div>`).join("")}</div>`
    : "";
  const footerHTML = syncedAt
    ? `<div class="pulse-sync-note"><span>Synced ${escapeHTML(new Date(syncedAt).toLocaleString())}</span></div>`
    : "";
  return `
    <div class="pulse-panel">
      <div class="pulse-identity-row">
        <div class="pulse-identity-main">
          ${avatarHTML}
          <div class="pulse-identity-text">
            ${handleHTML}
            <div class="pulse-identity-sub">${escapeHTML(subline)}</div>
          </div>
        </div>
        ${trailingChipHTML}
      </div>
      ${extraHTML}
      ${statsHTML}
      ${footerHTML}
    </div>`;
}

/* ============================================================
   SECTION: sub/utils.js — pure, dependency-free helper functions.
   No DB access, no DOM access (except where explicitly a date/format
   helper needs `Date`/`Intl`, which are language builtins, not DOM).
   ============================================================ */

export function clone(obj){ return obj === undefined ? {} : JSON.parse(JSON.stringify(obj)); }

export function uid(){ return Math.random().toString(36).slice(2,9); }

/* ---------------- date helpers ---------------- */
export function parseDate(s){ if(!s) return null; const d=new Date(s+"T00:00:00"); return isNaN(d) ? null : d; }
export function addDays(date, days){ const d=new Date(date); d.setDate(d.getDate()+days); return d; }
export function diffDays(a,b){ return Math.round((a - b) / 86400000); }
export function fmtShort(d){ return d.toLocaleDateString(undefined,{ month:"short", day:"numeric" }); }
export function fmtLong(d){ return d.toLocaleDateString(undefined,{ weekday:"long", month:"long", day:"numeric", year:"numeric" }); }
export function getWeekKey(d){ const onejan=new Date(d.getFullYear(),0,1); const wk=Math.ceil((((d-onejan)/86400000)+onejan.getDay()+1)/7); return `${d.getFullYear()}-W${wk}`; }

/* ---------------- academics: theory-only filtering ---------------- */
export const PRACTICAL_SUBJECT_EXCLUDE = new Set([
  "physics & electronics labs", "design thinking lab", "industry competence lab",
  "internship & major project phase-i", "major project-ii", "comprehensive viva",
  "skill development", "final presentation", "workshop", "life skills & professional communication lab",
  "engineering drawing & design", "unix programming lab", "competitive programming-i", "competitive programming-ii",
  "competitive programming-iii", "summer training-i", "summer training-ii", "summer training-iii",
  "full stack development lab", "logical and quantitative techniques-i", "logical and quantitative techniques-ii",
  "selected value-added course", "soft skills for employability", "minor project", "major project part-1", "major project part-2"
]);
export const PRACTICAL_TOPIC_EXCLUDE = new Set([
  "laboratory instrumentation", "experimental verification", "experimental setups"
]);
export function isTheoryOnlySubject(subjectName){
  return !PRACTICAL_SUBJECT_EXCLUDE.has(String(subjectName || "").trim().toLowerCase());
}
export function isTheoryOnlyTopic(topic){
  return !PRACTICAL_TOPIC_EXCLUDE.has(String(topic || "").trim().toLowerCase());
}

/* ---------------- misc shared markup fragments ---------------- */
// Small clock glyph used before the estimated-hours line in a project card's footer.
export const hoursIconSVG = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-1px;margin-right:4px"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;

/** Difficulty star rating markup, e.g. "★★★☆☆" for difficulty=3 out of 5. */
export function difficultyStarsHTML(difficulty){
  const d = Math.max(1, Math.min(5, difficulty || 1));
  return "★".repeat(d) + "☆".repeat(5-d);
}

/** Formats an [min,max] hours estimate, e.g. "15–20 hrs" or "200–320 hrs (capstone)". */
export function hoursRangeText(hours){
  if(!Array.isArray(hours) || hours.length !== 2) return "";
  const [lo, hi] = hours;
  return lo >= 100 ? `${lo}–${hi} hrs (multi-month)` : `${lo}–${hi} hrs`;
}

/* ============================================================
   SECTION: sub/storage.js — DB state + localStorage persistence layer.
   Owns the single source of truth (`DB`) and all reads/writes to
   localStorage, including versioned history snapshots.
   ============================================================ */

export const DB_KEY = "trajectoryDB_v3";
export const HISTORY_KEY = "trajectoryDB_history_v1";
export const DB_VERSION = 3;

// data.js (loaded before this module, per index.html's import order) sets
// window.DEFAULT_DB as a side effect — historically an incomplete/stale
// duplicate of the object below. Preserved as a fallback exactly as before
// for behavioral parity; in practice this module's own complete literal is
// what's actually used, since data.js always runs first.
export const DEFAULT_DB = window.DEFAULT_DB || {
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

// Mutable module state. Other modules import `getDB()`/`setDB()` rather than
// reaching into a shared global, so the single source of truth stays here.
export let DB = null;
let historyCache = [];

export function getDB(){ return DB; }
export function setDB(next){ DB = next; return DB; }

export function storageGet(key){
  try{ return localStorage.getItem(key); }catch(e){ return null; }
}
export function storageSet(key, value){
  try{ localStorage.setItem(key, value); return true; }catch(e){ console.warn("storage.set failed", key, e); return false; }
}
export function storageDelete(key){
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

/**
 * Loads DB + history from localStorage. Synchronous, called once at
 * startup in init(). Falls back to defaults if nothing is stored yet,
 * including migrating old v1/v2 keys if present.
 */
export function loadDB(){
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
export function getHistory(){
  return historyCache;
}
export function clearHistoryCache(){
  historyCache = [];
}

/**
 * Persists DB to localStorage and returns true/false so callers can react
 * to a failed save instead of assuming it worked. Failures are surfaced to
 * the user via the notice banner — e.g. a full storage quota or disabled
 * storage (private browsing in some browsers) means the change wasn't
 * actually saved even though the rest of the UI proceeds.
 */
export function saveDB(reason){
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
        // Main DB save above already succeeded — losing version history is
        // a lesser failure, so warn quietly rather than blocking the
        // user's action with an error toast for a non-critical write.
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

/* ============================================================
   SECTION: sub/ui.js — generic UI chrome shared across pages: toast
   notices, the single reusable confirmation/form dialog, theme
   switching, and the custom <select> enhancement. No feature-specific
   logic lives here.
   ============================================================ */

/* ---------------- in-app feedback ---------------- */
let noticeTimer = null;
export function showNotice(message, type="info"){
  const notice = document.getElementById("appNotice");
  if(!notice) return;
  notice.textContent = message;
  notice.className = `app-notice${type === "error" ? " is-error" : type === "success" ? " is-success" : ""}`;
  notice.hidden = false;
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(()=>notice.hidden = true, 4200);
}

/* ---------------- shared modal dialog ---------------- */
export function openDialog({ eyebrow="TRAJECTORY", title, copy="", fields=[], confirmLabel="Continue", danger=false, onConfirm }){
  const dialog = document.getElementById("appDialog");
  const fieldsHost = document.getElementById("appDialogFields");
  const confirm = document.getElementById("appDialogConfirm");
  const cancel = document.getElementById("appDialogCancel");
  document.getElementById("appDialogEyebrow").textContent = eyebrow;
  document.getElementById("appDialogTitle").textContent = title;
  document.getElementById("appDialogCopy").textContent = copy;
  dialog.classList.remove("modal-has-error");
  document.getElementById("appDialogCopy").classList.remove("field-error-text");
  fieldsHost.innerHTML = fields.map(field=>ModalField(field)).join("");
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

/* ---------------- theme ---------------- */
export function applyTheme(){
  const DB = getDB();
  const legacy = { dark:"lavender", light:"orchid", ocean:"tide", forest:"tide" };
  const theme = legacy[DB.settings.theme] || DB.settings.theme || "lavender";
  DB.settings.theme = theme;
  document.documentElement.classList.remove("orchid", "auric", "tide");
  if(theme !== "lavender") document.documentElement.classList.add(theme);
  document.getElementById("themeIcon").textContent = DB.settings.theme==="light" ? "☀" : "☾";
  document.getElementById("themeLabel").textContent = ({ lavender:"Nocturne", auric:"Graphite Brass", tide:"Cobalt Slate", orchid:"Soft Orchid" })[theme];
}

/* ---------------- CUSTOM SELECT ---------------- */
export function enhanceSelect(select){
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

export function enhanceAllSelects(root=document){
  root.querySelectorAll("select").forEach(enhanceSelect);
}

/* ============================================================
   SECTION: sub/router.js — top-level page switching (Home /
   Academics / Projects / Progress / Resume / Settings). Pages are
   all pre-rendered by renderAll(); this only toggles visibility +
   active nav state.
   ============================================================ */
export function goToPage(page){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById("page-"+page).classList.add("active");
  document.querySelectorAll(".nav-link").forEach(b=>b.classList.toggle("active", b.dataset.page===page));
  document.querySelectorAll(".tab-link").forEach(b=>b.classList.toggle("active", b.dataset.page===page));
  window.scrollTo({top:0, behavior:"instant"});
}
