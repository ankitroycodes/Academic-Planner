/* ============================================================
   TRAJECTORY — Curriculum & Syllabus Data
   ============================================================
   ES module: every symbol other modules need is `export`ed below.
   The window.DEFAULT_DB stub that used to live here was a stale,
   incomplete duplicate of the real default DB shape (storage.js
   owns the authoritative one, see the old comment further down
   this file explaining why the `window.X =` re-exports silently
   never ran) — it has been removed rather than fixed. storage.js's
   own literal is the single source of truth for DEFAULT_DB.
   ============================================================ */

export const CURRICULUM = {
  years: [
    {
      id: 1, label: "Year 1", window: "2026–27", theme: "Programming Foundations",
      goal: "Learn to code, think logically, and build simple but polished software.",
      months: [
        { name:"Month 1", focus:["C++ / Python", "Functions", "Loops", "File I/O"],
          dsa:20, project:"Developer Toolbox CLI", desc:"Build a calculator, unit converter, password generator, and file organizer.", stack:["C++", "PYTHON"] },
        { name:"Month 2", focus:["HTML", "CSS", "GitHub Pages"],
          dsa:20, project:"Portfolio Website", desc:"Develop a responsive website featuring About, Projects, and Resume sections.", stack:["HTML", "CSS"] },
        { name:"Month 3", focus:["OOP", "File Handling"],
          dsa:20, project:"Expense Tracker", desc:"Create an object-oriented expense tracker with add/edit/delete features, categories, and a monthly summary.", stack:["PYTHON / C++"] },
        { name:"Month 4", focus:["JavaScript", "APIs", "Async Programming"],
          dsa:15, project:"Weather & News Dashboard", desc:"Fetch real-time data from external sources and display it dynamically using the Fetch API.", stack:["JAVASCRIPT", "API"] },
        { name:"Month 5", focus:["SQL", "Database Basics", "CRUD"],
          dsa:10, project:"Student Grade Manager", desc:"Build a database-backed manager for student records, tracking basic CRUD operations.", stack:["SQL"] },
        { name:"Month 6 (Winter Break)", focus:["React", "Components", "State"],
          dsa:10, project:"Notes App", desc:"Create a fast, component-driven application to store and manage text notes.", stack:["REACT"] },
        { name:"Month 7", focus:["React", "Local Storage", "Charts"],
          dsa:15, project:"Habit Tracker", desc:"Build a habit logging tool with visual progress charts and browser local storage persistence.", stack:["REACT", "LOCAL STORAGE"] },
        { name:"Month 8", focus:["Node.js / Express", "REST APIs"],
          dsa:10, project:"Student Resource API", desc:"Construct a backend server to deliver academic resources via standard RESTful endpoints.", stack:["NODE.JS", "EXPRESS"] },
        { name:"Month 9", focus:["JWT", "Sessions", "Security Basics"],
          dsa:10, project:"Authentication System", desc:"Secure user routes using token-based authentication and basic security hashing.", stack:["JWT", "AUTH"] },
        { name:"Month 10", focus:["WebSockets", "Socket.io"],
          dsa:10, project:"Realtime Chat App", desc:"Engineer a live, synchronized messaging room for users using two-way socket connections.", stack:["WEBSOCKETS", "SOCKET.IO"] },
        { name:"Month 11", focus:["Docker", "Deployment Basics"],
          dsa:5, project:"Dockerize Previous Projects", desc:"Wrap existing applications into standard containers for easy distribution and setup.", stack:["DOCKER"] },
        { name:"Month 12 (Summer Break)", focus:["Full Stack", "Consolidation"],
          dsa:30, project:"Academic Planner v1", desc:"Combines everything learned. ⭐ Optional Challenge: Deploy everything online (Frontend to Vercel, Backend to Render).", stack:["FULL STACK"] }
      ],
      milestones: [["CGPA","8.5 – 9.5+"],["DSA problems","60–80 solved"],["Projects shipped","2–3 deployed"],["GitHub commits","80–120"],["Portfolio","Basic profile set up"],["Blog posts","1–2 (optional)"]]
    },
    {
      id: 2, label: "Year 2", window: "2027–28", theme: "Full Stack Development",
      goal: "Become internship ready.",
      months: [
        { name:"Month 1", focus:["PostgreSQL", "Express", "React"],
          dsa:25, project:"Student Management System (Phase 1)", desc:"Build relational data models, secure login gates, and backend attendance logic.", stack:["POSTGRESQL", "EXPRESS"] },
        { name:"Month 2", focus:["PostgreSQL", "Express", "React"],
          dsa:25, project:"Student Management System (Phase 2)", desc:"Construct the interactive frontend dashboard for viewing attendance and grades.", stack:["REACT", "FULL STACK"] },
        { name:"Month 3", focus:["Full Stack", "Authentication"],
          dsa:25, project:"Task Management Platform (Phase 1)", desc:"Engineer backend logic for teams, boards, and secure task assignments.", stack:["NODE.JS", "EXPRESS"] },
        { name:"Month 4", focus:["Full Stack", "Authentication"],
          dsa:30, project:"Task Management Platform (Phase 2)", desc:"Develop frontend boards and status workflows for seamless task management.", stack:["REACT", "FULL STACK"] },
        { name:"Month 5", focus:["SQL", "Backend", "Forms"],
          dsa:15, project:"College Event Portal (Phase 1)", desc:"Set up event registration backend routes and complex form validation.", stack:["SQL", "BACKEND"] },
        { name:"Month 6 (Winter Break)", focus:["SQL", "Backend", "Forms"],
          dsa:10, project:"College Event Portal (Phase 2)", desc:"Implement automated certificate generation and full event management controls.", stack:["FULL STACK"] },
        { name:"Month 7", focus:["APIs", "Charts", "Data Visualization"],
          dsa:20, project:"GitHub + LeetCode Dashboard (Phase 1)", desc:"Write automated scripts to fetch live coding metrics and stats from public APIs.", stack:["APIs", "JAVASCRIPT"] },
        { name:"Month 8", focus:["APIs", "Charts", "Data Visualization"],
          dsa:20, project:"GitHub + LeetCode Dashboard (Phase 2)", desc:"Render dynamic charts displaying GitHub stats and LeetCode progress.", stack:["CHARTS", "DATA VIS"] },
        { name:"Month 9", focus:["Full Stack", "CRUD", "Search"],
          dsa:15, project:"Blogging Platform (Phase 1)", desc:"Build a rich text editor and secure authoring workflows for creating content.", stack:["FULL STACK", "AUTH"] },
        { name:"Month 10", focus:["Full Stack", "CRUD", "Search"],
          dsa:10, project:"Blogging Platform (Phase 2)", desc:"Implement nested commenting systems and full-text search capabilities.", stack:["FULL STACK", "SEARCH"] },
        { name:"Month 11", focus:["Academics", "Attendance", "Projects Tracking"],
          dsa:15, project:"Trajectory v2 (Phase 1)", desc:"Combine academics, attendance, and project tracking into one unified schema.", stack:["REACT", "POSTGRESQL"] },
        { name:"Month 12", focus:["GitHub", "LeetCode", "Integration"],
          dsa:15, project:"Trajectory v2 (Phase 2)", desc:"Integrate external API stats. ⭐ Optional Challenge: Add real-time notifications.", stack:["FULL STACK"] }
      ],
      milestones: [["CGPA","8.5 – 9.5+"],["DSA problems","350–450 cumulative"],["Projects shipped","12–15 polished apps"],["GitHub commits","700+"],["Open source","2–5 merged PRs"],["Blog posts","8–10 published"]]
    },
    {
      id: 3, label: "Year 3", window: "2028–29", theme: "Industry Ready",
      goal: "Build production-quality applications.",
      months: [
        { name:"Month 1", focus:["Architecture", "Large Databases"],
          dsa:25, project:"College ERP (Phase 1: Architecture)", desc:"Design the master database schema for tracking Students, Faculty, and Grades.", stack:["ARCHITECTURE", "DATABASES"] },
        { name:"Month 2", focus:["Architecture", "Large Databases"],
          dsa:20, project:"College ERP (Phase 2: Core Modules)", desc:"Develop robust APIs and endpoints for student attendance and faculty grading.", stack:["BACKEND", "SQL"] },
        { name:"Month 3", focus:["Architecture", "Large Databases"],
          dsa:20, project:"College ERP (Phase 3: Timetable Engine)", desc:"Write conflict-detection logic and complex queries for automated course scheduling.", stack:["ALGORITHMS", "DATABASES"] },
        { name:"Month 4", focus:["Architecture", "Large Databases"],
          dsa:30, project:"College ERP (Phase 4: Optimization)", desc:"Finalize administrative interfaces and tune query performance for scale.", stack:["OPTIMIZATION", "FULL STACK"] },
        { name:"Month 5", focus:["OpenAI API", "Prompt Engineering", "RAG Basics"],
          dsa:15, project:"AI Study Assistant (Phase 1: PDF Chat)", desc:"Build secure pipelines to upload, extract, and chunk text from study PDFs.", stack:["OPENAI API", "RAG"] },
        { name:"Month 6 (Winter Break)", focus:["OpenAI API", "Prompt Engineering", "RAG Basics"],
          dsa:15, project:"AI Study Assistant (Phase 2: Smart Notes)", desc:"Wire extracted text into conversational AI prompts for smart note generation.", stack:["PROMPT ENGINEERING"] },
        { name:"Month 7", focus:["OpenAI API", "Prompt Engineering", "RAG Basics"],
          dsa:10, project:"AI Study Assistant (Phase 3: Flashcards)", desc:"Generate automated, structured flashcards directly from uploaded lecture notes.", stack:["AI", "REACT"] },
        { name:"Month 8", focus:["OpenAI API", "Prompt Engineering", "RAG Basics"],
          dsa:10, project:"AI Study Assistant (Phase 4: Quiz Generator)", desc:"Engineer an LLM-driven quiz generator enforcing strict JSON structural outputs.", stack:["AI", "FULL STACK"] },
        { name:"Month 9", focus:["Full Stack", "PDF Generation", "Advanced UI"],
          dsa:10, project:"Placement Portal (Phase 1: Resume Builder)", desc:"Engineer a dynamic, responsive form that generates formatted, exportable PDFs.", stack:["FULL STACK", "PDF GEN"] },
        { name:"Month 10", focus:["Full Stack", "PDF Generation", "Advanced UI"],
          dsa:10, project:"Placement Portal (Phase 2: Job Tracker)", desc:"Build a robust application tracking pipeline and a master company database.", stack:["ADVANCED UI", "DATABASE"] },
        { name:"Month 11", focus:["Full Stack", "PDF Generation", "Advanced UI"],
          dsa:10, project:"Placement Portal (Phase 3: Analytics)", desc:"Generate success rate metrics and collaborative interview note repositories.", stack:["FULL STACK", "ANALYTICS"] },
        { name:"Month 12", focus:["Full Stack", "Advanced UI", "Optimization"],
          dsa:10, project:"Placement Portal (Phase 4: Wrap & Deploy)", desc:"Finalize the portal. ⭐ Optional Challenge: Add Redis caching, background jobs, Docker Compose, and Cloud deployment.", stack:["DEPLOYMENT", "REDIS"] }
      ],
      milestones: [["CGPA","8.5 – 9.5+"],["DSA problems","600–700 cumulative"],["Projects shipped","18–20 repositories"],["GitHub commits","1,200+"],["Open source","5–10 merged PRs"],["AI systems shipped","3 production apps"]]
    },
    {
      id: 4, label: "Year 4", window: "2029–30", theme: "Capstone",
      goal: "One entire year. Students choose one domain (e.g. AI Academic Planner, Healthcare, SaaS).",
      months: [
        { name:"Month 1", focus:["Planning", "Requirements"],
          dsa:10, project:"Capstone: Planning & Requirements", desc:"Select a major domain, define user stories, and outline system requirements.", stack:["SYSTEM DESIGN"] },
        { name:"Month 2", focus:["Architecture"],
          dsa:10, project:"Capstone: Architecture", desc:"Draft technical specs, map complex database schemas, and define API boundaries.", stack:["ARCHITECTURE"] },
        { name:"Month 3", focus:["Database", "Authentication"],
          dsa:10, project:"Capstone: Database & Auth", desc:"Establish secure authentication layers and implement the production database.", stack:["DATABASE", "AUTH"] },
        { name:"Month 4", focus:["Backend"],
          dsa:10, project:"Capstone: Core Backend", desc:"Engineer the foundational backend services, REST/GraphQL APIs, and server logic.", stack:["BACKEND"] },
        { name:"Month 5", focus:["Frontend", "Responsive Design"],
          dsa:15, project:"Capstone: Frontend Foundation", desc:"Develop the primary user interface components and ensure mobile responsiveness.", stack:["FRONTEND"] },
        { name:"Month 6 (Winter Break)", focus:["Dashboards"],
          dsa:10, project:"Capstone: Dashboards & UI", desc:"Connect UI components to backend endpoints and finalize master dashboards.", stack:["DASHBOARDS"] },
        { name:"Month 7", focus:["AI Features", "Recommendations"],
          dsa:10, project:"Capstone: AI Integration", desc:"Integrate intelligent recommendations or search optimization features.", stack:["AI"] },
        { name:"Month 8", focus:["Automation"],
          dsa:10, project:"Capstone: Automation Workflows", desc:"Implement background processing, cron jobs, and automated platform workflows.", stack:["AUTOMATION"] },
        { name:"Month 9", focus:["Testing"],
          dsa:5, project:"Capstone: Testing & QA", desc:"Write comprehensive unit/integration test suites and execute end-to-end bug hunts.", stack:["TESTING"] },
        { name:"Month 10", focus:["Optimization", "Deployment"],
          dsa:5, project:"Capstone: Optimization & Deploy", desc:"Optimize application performance and set up CI/CD pipelines for cloud deployment.", stack:["DEPLOYMENT"] },
        { name:"Month 11", focus:["Documentation", "Portfolio"],
          dsa:10, project:"Capstone: Documentation & Polish", desc:"Write extensive technical READMEs, API docs, and prepare a live portfolio demo.", stack:["DOCS", "PORTFOLIO"] },
        { name:"Month 12", focus:["Presentation", "Placement Prep"],
          dsa:5, project:"Capstone: Presentation & Launch", desc:"Prepare the final project presentation, rehearsal, and rigorous placement interview prep.", stack:["CAREER", "INTERVIEW PREP"] }
      ],
      milestones: [["CGPA","8.5 – 9.5+"],["DSA problems","800–1,000 cumulative"],["Projects shipped","22–25 repositories"],["GitHub commits","1,800+"],["Open source","10–15 merged PRs"],["Career offers","1–3 tier-1 offers"]]
    }
  ],

  prep: {
    title: "Get ahead before day one",
    skill: {
      title: "Skill sprint",
      tasks: [
        { id:"skill-hello-python", tier:1, text:"Install Python and run your first script — print your name and today's date" },
        { id:"skill-vars", tier:1, text:"Learn Python variables, data types and basic operators" },
        { id:"skill-cli", tier:2, text:"Learn basic command-line tools (ls, cd, grep, cat, mkdir) well enough to navigate without a GUI" },
        { id:"skill-control-flow", tier:2, text:"Learn Python control flow — if/else, loops, and writing your first functions" },
        { id:"skill-functions-depth", tier:3, text:"Learn Python functions in depth — parameters, return values, default args, and scope" },
        { id:"skill-leetcode20", tier:3, text:"Solve 20 easy problems on LeetCode (arrays, strings, basic loops) to build real fluency before Month 1's DSA targets start" },
        { id:"skill-atbswp", tier:4, text:"Read the first 5 chapters of \"Automate the Boring Stuff with Python\"" }
      ]
    },
    academic: {
      title: "Academic focus",
      tasks: [
        { id:"ac-numbersystems", tier:1, text:"Understand binary, decimal and hexadecimal number systems, and practice converting between them by hand" },
        { id:"ac-ai-concepts", tier:1, text:"Learn what AI, ML, DL and LLMs are at a conceptual level, well enough to explain each in one sentence" },
        { id:"ac-bigo", tier:2, text:"Learn what time complexity and Big-O notation mean, and classify 5 simple code snippets by their complexity" },
        { id:"ac-cpu", tier:3, text:"Read about how a computer executes a program at a high level (what a CPU actually does)" },
        { id:"ac-git-internals", tier:4, text:"Read a short primer on how Git actually tracks changes (commits, staging, working directory) — not just the commands" }
      ]
    },
    project: {
      title: "Project push",
      tasks: [
        { id:"proj-setup-tools", tier:1, text:"Install VS Code, set up the Python extension, and set up a Linux environment (WSL/Ubuntu) or dual boot" },
        { id:"proj-github-first-commit", tier:1, text:"Create a GitHub account, install Git, and make your first commit to a scratch repo" },
        { id:"proj-calc-basic", tier:2, text:"Write a 20-line Python script that adds, subtracts, multiplies and divides two numbers from user input — a rough first pass at Month 1's project" },
        { id:"proj-calc-menu-validate", tier:3, text:"Extend that script with a menu loop and input validation — handle divide-by-zero and non-numeric input without crashing" },
        { id:"proj-calc-push", tier:4, text:"Push the finished script to GitHub as your first real repo, with a short README describing what it does and how to run it" }
      ]
    }
  },

  advanced_track: {
    title: "⭐ Advanced Challenges (15+ LPA Track)",
    description: "These never replace the main roadmap. They appear as optional stretch goals.",
    categories: [
      {
        name: "Backend",
        skills: ["Redis", "GraphQL", "Microservices", "gRPC", "WebRTC"]
      },
      {
        name: "Cloud",
        skills: ["AWS", "Terraform", "Kubernetes", "CI/CD Pipelines"]
      },
      {
        name: "AI",
        skills: ["LangChain", "MCP", "Multi-Agent Systems", "Fine-Tuning", "LoRA", "Vector Databases"]
      },
      {
        name: "Software Engineering",
        skills: ["System Design", "Design Patterns", "Event-Driven Architecture", "Distributed Systems", "Observability", "Performance Optimization"]
      }
    ]
  }
};

/* ============================================================
   FIELD QUIZ — helps a new user pick a starting specialization.
   Confusion is an explicit, first-class outcome: Q4's third option
   force-selects the generalist track regardless of the other answers.
   ============================================================ */
export const TRACKS = {
  "ai-ml": {
    id: "ai-ml", label: "AI & Machine Learning", tagline: "Models, data, and systems that learn.",
    blurb: "You lean toward building intelligent systems — recommenders, LLM apps, computer vision, predictive models. Lean into the AI electives and ML fundamentals threaded through every year."
  },
  "fullstack": {
    id: "fullstack", label: "Full-Stack / Product Engineering", tagline: "Ship products people actually use.",
    blurb: "You like owning a feature end-to-end, UI down to the database. Lean into React, backend APIs, and shipping polished, deployed products every month."
  },
  "systems": {
    id: "systems", label: "Backend & Systems Engineering", tagline: "Performance, infrastructure, and things that scale.",
    blurb: "You're drawn to how things work under the hood — OS internals, databases, distributed systems, cloud infra. Lean into Computer Organization, OS, Networks and DevOps electives."
  },
  "data": {
    id: "data", label: "Data & Analytics", tagline: "Numbers, patterns, and decisions.",
    blurb: "You like turning raw data into insight — dashboards, statistics, pipelines. Lean into SQL depth, data-engineering electives and analytics-flavored project variants."
  },
  "security": {
    id: "security", label: "Cybersecurity & Security Engineering", tagline: "Break it, then defend it.",
    blurb: "You think like an attacker so you can build better defenses. Lean into networks, cryptography, OWASP practice and the security electives."
  },
  "generalist": {
    id: "generalist", label: "Full-Stack Generalist", tagline: "A bit of everything, fundamentals first.",
    blurb: "No pressure to pick yet — this keeps you broad across web, backend, DSA and a taste of AI so you can specialize later once you've actually seen more of the field."
  }
};

// Each option maps to a track (or null/"generalist"). Each question also
// carries a `weight` — how strongly that single question, on its own, tends
// to predict someone's actual specialization. Questions that ask directly
// about what someone wants to build/work on are highly diagnostic (weight 3);
// questions about adjacent preferences (debugging style, work rhythm) are
// still relevant but weaker signals on their own (weight 1-2). Scoring sums
// weight per track rather than counting raw picks, so one strong answer can
// outweigh several weak ones pointing elsewhere — see computeTrackFromAnswers.
export const QUIZ = [
  {
    id: "q1", weight: 3,
    prompt: "What are you most excited to build?",
    options: [
      { label: "An app people open every day", track: "fullstack" },
      { label: "A model that predicts or generates something", track: "ai-ml" },
      { label: "Infrastructure that keeps big systems running", track: "systems" },
      { label: "Not sure yet", track: "generalist" }
    ]
  },
  {
    id: "q2", weight: 3,
    prompt: "Pick a weekend side project.",
    options: [
      { label: "Scrape and visualize a dataset you're curious about", track: "data" },
      { label: "Build a small SaaS landing page and signup flow", track: "fullstack" },
      { label: "Poke at your own home network's security (legally)", track: "security" },
      { label: "Fine-tune a tiny model on data you collected", track: "ai-ml" }
    ]
  },
  {
    id: "q3", weight: 3,
    prompt: "Which headline would you actually click on?",
    options: [
      { label: "\"New framework cuts frontend load time in half\"", track: "fullstack" },
      { label: "\"Researchers train a model to do X with less data\"", track: "ai-ml" },
      { label: "\"How this company handles a million requests a second\"", track: "systems" },
      { label: "\"Breach exposes millions of records — here's how\"", track: "security" }
    ]
  },
  {
    id: "q4", weight: 2,
    prompt: "What's most fun to actually debug at 2am?",
    options: [
      { label: "A UI component that won't render right", track: "fullstack" },
      { label: "A training loop whose loss won't drop", track: "ai-ml" },
      { label: "A server that keeps falling over under load", track: "systems" },
      { label: "A query that's leaking data it shouldn't", track: "security" }
    ]
  },
  {
    id: "q5", weight: 2,
    prompt: "In a group project, which piece do you volunteer for?",
    options: [
      { label: "The UI/UX and making it feel polished", track: "fullstack" },
      { label: "The data pipeline and reporting numbers", track: "data" },
      { label: "The deployment, servers, and making sure it stays up", track: "systems" },
      { label: "Whatever's needed — I like seeing the whole picture", track: "generalist" }
    ]
  },
  {
    id: "q6", weight: 2,
    prompt: "Which of these would you rather spend a whole afternoon reading about?",
    options: [
      { label: "Design systems and component libraries", track: "fullstack" },
      { label: "How neural networks actually learn", track: "ai-ml" },
      { label: "How databases index and query data at scale", track: "systems" },
      { label: "Real-world exploits and how they were patched", track: "security" }
    ]
  },
  {
    id: "q7", weight: 2,
    prompt: "A dataset lands on your desk with no instructions. What's your instinct?",
    options: [
      { label: "Clean it up and find the story in the numbers", track: "data" },
      { label: "See if a model could predict something useful from it", track: "ai-ml" },
      { label: "Figure out where it should live and how to query it fast", track: "systems" },
      { label: "Check if it should even have left wherever it came from", track: "security" }
    ]
  },
  {
    id: "q8", weight: 1,
    prompt: "Preferred pace of feedback on your work?",
    options: [
      { label: "Instant — I want to see it change on screen as I type", track: "fullstack" },
      { label: "Slower and quantitative — metrics improving over training runs", track: "ai-ml" },
      { label: "Doesn't matter, as long as it's correct and stays correct", track: "systems" },
      { label: "No strong preference", track: "generalist" }
    ]
  },
  {
    id: "q9", weight: 1,
    prompt: "Which tool would you be happiest getting really good at?",
    options: [
      { label: "React or a modern frontend framework", track: "fullstack" },
      { label: "PyTorch or a similar ML framework", track: "ai-ml" },
      { label: "SQL and a BI/analytics tool", track: "data" },
      { label: "A pentesting or network-analysis toolkit", track: "security" }
    ]
  },
  {
    id: "q10", weight: 1,
    prompt: "How locked-in is your specialization, honestly?",
    options: [
      { label: "Pretty confident — I know roughly what I want", track: null },
      { label: "I have a leaning, but I'm not locked in", track: null },
      { label: "No idea yet — show me a bit of everything", track: "generalist", forceGeneralist: true }
    ]
  }
];

/* ============================================================
   WEEK_BLUEPRINTS — hand-authored, project-specific weekly tasks
   192 entries (4 years × 12 months × 4 weeks). Each week's skill,
   academic and project tasks are tied to that month's actual
   project, stack and focus topics rather than generic filler.
   ============================================================ */
const WEEK_BLUEPRINTS = [
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 1", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn Python variables, data types, operators and input/output", "Solve 5 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Understand binary, decimal and hexadecimal conversions by hand", "Solve 10 base-conversion practice problems"] },
    project: { title: "Project push", tasks: ["Design the CLI's menu system and core calculator (add/sub/mul/div)", "Implement input validation for divide-by-zero and bad input"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 1", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn loops, conditionals and functions in Python", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn how memory and the CPU execute a program (fetch-decode-execute)", "Diagram the fetch-decode-execute cycle from memory"] },
    project: { title: "Project push", tasks: ["Add a unit converter module (length, weight, temperature)", "Wire the converter into the CLI menu with clean input prompts"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 1", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn Python lists, dicts, tuples and file I/O", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read what AI, ML and DL are and how they differ", "Write a 1-paragraph explanation of ML vs DL in your own words"] },
    project: { title: "Project push", tasks: ["Add a password generator with length and character-set options", "Add a file organizer that sorts files in a folder by extension"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 1", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Set up VS Code, Git, GitHub and a Linux/WSL environment end to end", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn conceptually how an LLM turns text into tokens and predictions", "Explain to someone else, in plain language, what an LLM does"] },
    project: { title: "Project push", tasks: ["Polish the CLI UX across all four tools (prompts, errors, history log)", "Push the finished Developer Toolbox CLI to GitHub with a README and usage examples"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 2", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn HTML5 semantic structure — sections, headers, nav, forms", "Solve 5 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Learn Git branching and how to create/merge a branch locally", "Practice 3 merges with intentional (small) conflicts to resolve"] },
    project: { title: "Project push", tasks: ["Wireframe the portfolio (hero, about, projects, contact) on paper or Figma", "Build the HTML skeleton for all four sections"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 2", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn CSS3 box model, selectors and positioning", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn pull requests — open, review and merge a PR on a test repo", "Write a checklist of what makes a good PR description"] },
    project: { title: "Project push", tasks: ["Style the layout with CSS — typography, spacing and a color palette", "Build the nav bar with Flexbox and make it sticky"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 2", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn Flexbox for one-dimensional layouts", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Refactor your calculator project into a proper class-based structure", "Add exception handling to at least 3 methods that lacked it"] },
    project: { title: "Project push", tasks: ["Lay out the projects grid with CSS Grid and add project cards", "Make the layout responsive across mobile, tablet and desktop widths"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 2", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn CSS Grid and basic responsive breakpoints", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Set up a Python virtual environment for a new project from scratch", "Document the venv setup steps in a personal notes file"] },
    project: { title: "Project push", tasks: ["Add smooth-scroll navigation and a working contact form layout", "Deploy the site to GitHub Pages and link it from your GitHub profile"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 3", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn Python/C++ OOP — classes, objects, constructors", "Solve 5 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Learn what a process is and how the OS schedules it", "Diagram process states (new/ready/running/waiting/terminated)"] },
    project: { title: "Project push", tasks: ["Design the Expense class and category schema (date, category, amount, note)", "Implement add-expense and list-expenses using local file storage"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 3", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn encapsulation and basic exception handling", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn the difference between a process and a thread", "Write 3 real-world examples of multithreaded programs you use"] },
    project: { title: "Project push", tasks: ["Implement edit and delete for existing expense entries", "Add input validation for dates and amounts"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 3", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn file-based persistence (reading/writing structured data)", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read about neural networks conceptually — neurons, weights, layers", "Sketch a 3-layer neural network diagram by hand"] },
    project: { title: "Project push", tasks: ["Add category-wise and monthly summary reports", "Add a simple text-based chart (bar-of-asterisks) for spending by category"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 3", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Review OOP design by refactoring a small existing script", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read about transformers conceptually — attention, context window", "Write a 3-sentence explanation of 'attention' in your own words"] },
    project: { title: "Project push", tasks: ["Refactor the codebase into clean classes/modules", "Push to GitHub with a README explaining the storage format"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 4", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn JavaScript variables, functions and DOM manipulation", "Solve 4 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Learn Linux shell scripting basics — variables, if, loops in bash", "Write a bash script that renames files in a folder by pattern"] },
    project: { title: "Project push", tasks: ["Sign up for a weather API key and test a basic fetch call", "Build the HTML/CSS shell for the search input and result card"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 4", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn JS events (click, input, submit) and event listeners", "Solve 4 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn shell scripting — piping, redirection, grep/awk basics", "Write a script that searches log files for a keyword and counts matches"] },
    project: { title: "Project push", tasks: ["Wire up the search input to fetch live weather by city name", "Handle loading and error states (city not found, network failure)"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 4", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn the Fetch API and working with async/await + JSON", "Solve 4 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Practice SQL joins conceptually (even before Month 8's deep dive)", "Write 3 SQL SELECT queries against a sample dataset"] },
    project: { title: "Project push", tasks: ["Display temperature, condition, humidity and wind with icons", "Add a 5-day forecast section using the API's forecast endpoint"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 4", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn error handling patterns for network requests", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review the month — JS, fetch API, SQL, shell scripting", "Write a one-page personal cheat sheet covering all four topics"] },
    project: { title: "Project push", tasks: ["Add unit toggling (Celsius/Fahrenheit) and polish the UI", "Deploy the app and add it to your portfolio"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 5", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn SQL basics — SELECT, INSERT, UPDATE, DELETE", "Solve 3 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Update your GitHub profile README with a summary of Month 1-4 projects", "Pin your 4 best repos on your GitHub profile"] },
    project: { title: "Project push", tasks: ["Design the SQL schema for students, subjects and results", "Set up the database and write the CREATE TABLE statements"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 5", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn SQL WHERE, ORDER BY and aggregate functions (SUM, AVG, COUNT)", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Outline a blog post about one thing you learned this semester", "Write the first full draft of the blog post"] },
    project: { title: "Project push", tasks: ["Implement adding a student and entering their subject-wise marks", "Implement querying a student's full result with computed percentage"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 5", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn SQL joins conceptually and GROUP BY for summaries", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Edit and publish your first technical blog post", "Share the post link on your resume/profile notes"] },
    project: { title: "Project push", tasks: ["Implement class-wide reports (topper, average, pass/fail counts)", "Add input validation and handle duplicate student entries"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 5", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn basic schema design — primary keys and simple constraints", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Do a full semester retro — what's solid, what's shaky, what to fix next", "Write down 3 concrete goals for Month 6 onward"] },
    project: { title: "Project push", tasks: ["Clean up the SQL queries and add comments explaining each one", "Push to GitHub with sample data and a README"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 6 (Winter Break)", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn what React is conceptually and set up your first React project", "Solve 3 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Read how a React component tree renders to the DOM", "Draw the component tree for the Spaced-Repetition Lecture Notes App you're about to build"] },
    project: { title: "Project push", tasks: ["Scaffold the React app and build the static layout for note cards", "Set up local state to hold an array of notes"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 6 (Winter Break)", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn JSX, props and component composition", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn the difference between props and local component data", "Write a short note contrasting props with plain JS variables"] },
    project: { title: "Project push", tasks: ["Implement creating a new note via a controlled form", "Implement deleting a note from the list"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 6 (Winter Break)", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn React state with useState and controlled inputs", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn common HTTP status codes (200, 201, 400, 404, 500) and when each applies", "Match 10 real API error scenarios to the correct status code"] },
    project: { title: "Project push", tasks: ["Implement editing an existing note in place", "Persist notes so they survive a page refresh (localStorage)"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 6 (Winter Break)", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn conditional rendering and rendering lists with keys", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review the whole break module — React, npm, REST, HTTP", "Write a one-page cheat sheet for the four topics"] },
    project: { title: "Project push", tasks: ["Polish styling and add empty/loading states", "Deploy the Notes App and link it from your portfolio"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 7", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn useEffect and syncing state with localStorage", "Solve 4 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Refactor one earlier Python project to use classes and inheritance", "Write a short note on when inheritance helps vs over-complicates"] },
    project: { title: "Project push", tasks: ["Design the habit data shape (id, name, streak, log-by-date) and component layout", "Build the HabitList and HabitItem components with props"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 7", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn lifting state up and passing data between sibling components", "Solve 4 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Package one of your Python scripts as an installable module locally", "Document the module's functions with docstrings"] },
    project: { title: "Project push", tasks: ["Implement adding a new habit via a controlled form input", "Implement marking a habit done/undone for today"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 7", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn conditional styling and simple derived state (streaks, totals)", "Solve 4 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Study how React re-renders when state changes", "Write a short explanation of the React render cycle in your own words"] },
    project: { title: "Project push", tasks: ["Compute and display streaks, and persist all habit data to localStorage", "Add a simple weekly progress chart per habit"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 7", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn basic charting with a lightweight library or plain SVG", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Compare your Sleep-Cycle & Study-Habit Tracker's component structure with a reference example", "List 2 improvements you'd make to your component breakdown"] },
    project: { title: "Project push", tasks: ["Polish UI, add empty state and habit-delete confirmation", "Deploy the Habit Tracker and add it to your portfolio"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 8", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn Node.js and Express basics — routes and request handling", "Solve 3 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Learn prompt engineering basics — clear instructions, examples, constraints", "Write 3 prompts for the same task, compare the outputs"] },
    project: { title: "Project push", tasks: ["Set up the Express project structure and a health-check route", "Connect the backend to your SQL database"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 8", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn connecting an Express backend to a SQL database", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn common LLM limitations — hallucination, context limits, bias", "Write 3 real examples where an LLM could plausibly get something wrong"] },
    project: { title: "Project push", tasks: ["Implement CRUD endpoints for academic resources (create, read, update, delete)", "Add request validation for resource fields"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 8", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn REST conventions and structuring resource endpoints", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Design the normalized schema for the Library Reservation & Notes API (notes, tags, users)", "Draw an ER diagram for the schema"] },
    project: { title: "Project push", tasks: ["Implement filtering resources by subject/tag and add pagination", "Handle and return consistent error responses"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 8", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn API documentation basics and testing with a REST client", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review joins, indexing and normalization together", "Rewrite one earlier unindexed query to use an index and explain why it helps"] },
    project: { title: "Project push", tasks: ["Write API docs (route list, params, example responses)", "Push to GitHub and test all endpoints with a REST client"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 9", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn how JWTs are structured and how they're signed/verified", "Solve 3 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Compare JWT-based auth vs session-based auth for a given app", "Write a short note on which you'd choose for the Library Reservation & Notes API and why"] },
    project: { title: "Project push", tasks: ["Build the signup endpoint with password hashing", "Build the login endpoint that issues a JWT on success"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 9", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn password hashing (bcrypt) and why plaintext storage is unsafe", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn how HTTPS protects credentials in transit", "Write a 3-sentence explanation of why auth over HTTP is unsafe"] },
    project: { title: "Project push", tasks: ["Add middleware to protect routes using the JWT", "Add token expiry and a refresh-token flow"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 9", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn middleware patterns for protecting routes", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Study a real signup/login flow from a well-known app (conceptually)", "List the steps their flow takes from signup to first authenticated request"] },
    project: { title: "Project push", tasks: ["Add basic session handling and logout", "Write tests for signup, login, and access to protected routes"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 9", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn deployment basics — environment variables and build steps", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review JWT, sessions, hashing and deployment together", "Write a one-page cheat sheet for the auth stack"] },
    project: { title: "Project push", tasks: ["Deploy the auth system to Render or Vercel", "Set up environment variables securely and confirm the deployed version works end to end"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 10", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn how WebSockets differ from plain HTTP requests", "Solve 3 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Trace a request from typing a URL to receiving a response (DNS, TCP, HTTP)", "Diagram the full request lifecycle from browser to server"] },
    project: { title: "Project push", tasks: ["Design the chat data model (messages, rooms, timestamps, sender)", "Build the basic UI — message list and input box"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 10", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn Socket.io basics — connecting, emitting and listening for events", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Compare HTTP polling vs WebSockets for real-time communication", "Write a short note on the tradeoffs for your Chat App's use case"] },
    project: { title: "Project push", tasks: ["Wire up a Socket.io server and connect the client", "Implement sending a message and broadcasting it to all connected clients"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 10", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn broadcasting to rooms/channels with Socket.io", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read a short explainer on how embeddings power semantic search", "Write 2 example use cases where embeddings would help a normal app"] },
    project: { title: "Project push", tasks: ["Add multiple chat rooms/channels using Socket.io rooms", "Add usernames and message timestamps to the UI"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 10", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn handling disconnects and reconnect logic", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review networking + embeddings/vector DB concepts together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Polish the chat UI (auto-scroll, read state, empty state)", "Deploy the chat app and link it from your portfolio"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 11", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn Docker basics — what a container and image actually are", "Solve 2 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Compare running an app locally vs inside a container — what changes", "Write a short note on 2 problems Docker solves that you've personally hit"] },
    project: { title: "Project push", tasks: ["Write a Dockerfile for the Developer Toolbox CLI and get it running in a container", "Write a Dockerfile for the Weather & News Dashboard and get it running in a container"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 11", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn to write a Dockerfile for a Python or Node app", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read about image layers and why smaller images build/deploy faster", "Check the image size of one of your Dockerfiles and try to shrink it"] },
    project: { title: "Project push", tasks: ["Write a Dockerfile for the Student Resource API, mounting a volume for persistent data", "Confirm the Student Resource API container survives a restart with data intact"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 11", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn Docker volumes and why they matter for persistent data", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn `.dockerignore` and why it matters for build speed", "Add a `.dockerignore` file to one of your projects"] },
    project: { title: "Project push", tasks: ["Write a Dockerfile for the Authentication System with environment variables passed in", "Test the containerized auth system end to end"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 11", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn basic Docker Compose to run multiple containers together", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review Docker concepts as a whole", "Write a one-page Docker cheat sheet (build, run, exec, logs, volumes)"] },
    project: { title: "Project push", tasks: ["Write a docker-compose.yml that runs at least 2 of these projects together", "Push all Dockerfiles to their respective GitHub repos with usage instructions"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 12 (Summer Break)", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Full review — rebuild one Python script and one React component from memory, no notes", "Solve 8 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Review the entire year's focus topics in one sitting — Python, Git, HTML/CSS/JS, SQL", "Write a consolidated one-page cheat sheet covering the whole year"] },
    project: { title: "Project push", tasks: ["Design the dashboard layout that will surface data from your year's projects (GitHub stats, DSA count, project links)", "Build the dashboard shell in React with placeholder sections"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 12 (Summer Break)", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Full review — redo a Git branch/merge/PR cycle and a SQL query set from memory", "Solve 8 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review Linux/bash, React, REST APIs and auth concepts together", "Add these topics to the same consolidated cheat sheet"] },
    project: { title: "Project push", tasks: ["Wire up the GitHub stats section (repo count, recent commits) via the GitHub API", "Wire up a DSA progress section showing problems solved this year"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 12 (Summer Break)", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Full review — redo an Express CRUD endpoint and a JWT auth flow from memory", "Solve 7 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review networking, Docker and embeddings/vector DB concepts", "Finish the consolidated cheat sheet — one document covering the full year"] },
    project: { title: "Project push", tasks: ["Add a projects showcase section linking to all shipped Year 1 projects", "Add a simple notes/journal section for ongoing reflections"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 12 (Summer Break)", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Full review — redo a Docker build and a deployment from memory", "Solve 7 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Do a full year retro — strongest area, weakest area, what surprised you", "Write 3 specific goals for Year 2 based on this retro"] },
    project: { title: "Project push", tasks: ["Polish the dashboard styling and make it responsive", "Deploy Academic Planner v1 as the new centerpiece of your portfolio"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 1", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn PostgreSQL fundamentals — tables, keys and relations", "Solve 7 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Set up a FastAPI or Express project skeleton alongside your C++ work", "Build a single working GET endpoint as a sanity check"] },
    project: { title: "Project push", tasks: ["Design the schema — students, classes, attendance — with foreign keys", "Set up PostgreSQL and create the tables with proper relations"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 1", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn PostgreSQL foreign keys and one-to-many relationships", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn route parameters and query parameters in your chosen backend framework", "Build 2 endpoints that accept path and query params"] },
    project: { title: "Project push", tasks: ["Build the Express project structure and connect it to PostgreSQL", "Implement the signup/login endpoints with password hashing"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 1", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn connecting Express to PostgreSQL (pg or an ORM)", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn request body parsing and response formatting (JSON)", "Build a POST endpoint that accepts and returns JSON"] },
    project: { title: "Project push", tasks: ["Implement CRUD endpoints for students and classes", "Implement an attendance-marking endpoint scoped to a class and date"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 1", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn writing parameterized queries safely (avoiding SQL injection)", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review C++ OOP and backend routing together", "Write a short note comparing OOP structure in C++ vs the backend framework"] },
    project: { title: "Project push", tasks: ["Add validation and consistent error responses across endpoints", "Push to GitHub with a Postman collection and README"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 2", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn React Router for multi-page navigation", "Solve 7 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Learn REST API conventions in depth — resource naming, verbs, status codes", "Audit one of your earlier APIs against REST conventions and note violations"] },
    project: { title: "Project push", tasks: ["Set up React Router with routes for login, dashboard and class views", "Build the login form wired to the Phase 1 auth endpoints"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 2", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn fetching and displaying backend data in React (loading/error states)", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn CRUD design patterns and idempotency", "Write a short note on which of your endpoints are/aren't idempotent"] },
    project: { title: "Project push", tasks: ["Build the attendance dashboard that lists students per class", "Wire up marking attendance from the UI to the backend endpoint"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 2", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn building forms in React that submit to your Express API", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn to use Postman (or similar) for structured API testing", "Build a Postman collection testing all planned Library API endpoints"] },
    project: { title: "Project push", tasks: ["Build the grades view showing per-student, per-subject marks", "Add a summary view of attendance percentage per student"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 2", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn basic authenticated routes on the frontend (protecting pages)", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review linked lists/stacks/queues and PostgreSQL relations together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Polish the UI and handle empty/error states throughout", "Deploy the frontend and backend together and add it to your portfolio"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 3", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn SOLID principles — Single Responsibility and Open/Closed", "Solve 7 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Refactor your Library API's book-search logic to follow Single Responsibility", "Write a short note on what changed and why it's cleaner"] },
    project: { title: "Project push", tasks: ["Design the schema for teams, boards and tasks with ownership", "Implement user signup/login with JWT auth reused from Year 1 Month 9"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 3", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn the Repository and Factory design patterns with real examples", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Apply the Factory pattern to how you create expense category objects", "Write a short note on when Factory is worth the extra indirection"] },
    project: { title: "Project push", tasks: ["Implement CRUD endpoints for boards, scoped to the authenticated user's team", "Apply the Repository pattern to separate data access from route logic"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 3", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn structuring an Express app into controllers/services/routes", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Practice resolving a real Git merge conflict end to end on a scratch repo", "Document your conflict-resolution steps for future reference"] },
    project: { title: "Project push", tasks: ["Implement task assignment endpoints (assign/unassign a team member)", "Add validation and proper error handling using consistent response shapes"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 3", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn professional Git — rebase and cherry-pick", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review SOLID and design patterns as a whole", "Write a one-page cheat sheet mapping each principle/pattern to a concrete example from your own code"] },
    project: { title: "Project push", tasks: ["Clean commit history using rebase/cherry-pick on a feature branch", "Push to GitHub with a README documenting the patterns used and why"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 4", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn drag-and-drop interactions in React (or click-to-move as a simpler alternative)", "Solve 8 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Diagram how cache hierarchy (L1/L2/L3) speeds up memory access", "Relate cache locality to why indexing speeds up SQL queries"] },
    project: { title: "Project push", tasks: ["Build the React UI for task boards (columns for todo/in-progress/done)", "Connect the UI to the backend's task CRUD endpoints"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 4", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn managing complex UI state across multiple boards/columns", "Solve 8 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Study how virtual memory lets programs use more memory than physically exists", "Write a short note connecting virtual memory to paging"] },
    project: { title: "Project push", tasks: ["Implement drag-and-drop or click-to-move status transitions in the UI", "Wire up filtering and sorting in the frontend"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 4", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn cloud deployment basics on Render or Railway", "Solve 7 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Trace through the instruction cycle for a simple arithmetic operation", "Diagram the cycle step by step for `a = b + c`"] },
    project: { title: "Project push", tasks: ["Set up a Render/Railway deployment pipeline for the API", "Deploy the API and confirm all endpoints work against the live database"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 4", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn basic rate limiting and request logging on the backend", "Solve 7 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review computer organization concepts as a whole", "Write a one-page cheat sheet covering registers, cache, virtual memory and instruction cycle"] },
    project: { title: "Project push", tasks: ["Add basic rate limiting or request logging", "Push to GitHub with deployment instructions in the README"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 5", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn SQL joins in more depth — inner, left, and when to use each", "Solve 4 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Design the combined architecture — React frontend, FastAPI backend, Postgres DB", "Sketch the full request flow from UI click to DB write and back"] },
    project: { title: "Project push", tasks: ["Design the event registration schema (events, attendees, slots)", "Build the event-creation and event-listing endpoints"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 5", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn form validation patterns on the backend (required fields, formats)", "Solve 4 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Set up the React frontend project and the FastAPI backend project side by side", "Confirm CORS is configured and the frontend can call the backend"] },
    project: { title: "Project push", tasks: ["Implement the attendee registration endpoint with capacity checks", "Add complex form validation (required fields, duplicate registration prevention)"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 5", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn designing endpoints for multi-step workflows (registration flows)", "Solve 4 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Wire up JWT auth end to end between frontend and backend", "Test the full login → protected request → logout flow manually"] },
    project: { title: "Project push", tasks: ["Implement an endpoint listing registrations per event with attendee counts", "Add basic auth so only organizers can create/edit events"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 5", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn writing aggregate queries for reporting (counts, capacity checks)", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Do a mid-year retro — compare Year 2 skills against Year 1", "Write 3 goals for the second half of Year 2"] },
    project: { title: "Project push", tasks: ["Polish error handling and edge cases (full events, closed registration)", "Push to GitHub with a full README and sample data"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 6 (Winter Break)", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn generating PDFs/certificates programmatically from templates", "Solve 3 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Compare building your own JWT auth vs using an OAuth provider", "Write a short note on tradeoffs for a solo-developer project"] },
    project: { title: "Project push", tasks: ["Design the certificate template and the data it needs to fill in", "Implement automated PDF certificate generation per attendee"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 6 (Winter Break)", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn sending automated emails from a backend (e.g. via a mail API)", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read about common auth vulnerabilities (token theft, replay attacks)", "List 3 mitigations for the vulnerabilities you read about"] },
    project: { title: "Project push", tasks: ["Wire up sending the certificate by email after an event closes", "Add an admin dashboard listing all events with quick stats"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 6 (Winter Break)", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn building an admin-only dashboard view with role checks", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn Docker networking — how containers talk to each other", "Diagram how your auth service container would talk to a DB container"] },
    project: { title: "Project push", tasks: ["Implement event-closing logic that triggers certificate generation for all attendees", "Add manual override controls for organizers (resend, edit attendee)"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 6 (Winter Break)", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn end-to-end testing a multi-step workflow manually", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review OAuth, hashing and Docker Compose together", "Write a one-page cheat sheet for the module"] },
    project: { title: "Project push", tasks: ["Test the full event lifecycle end to end (create → register → close → certify)", "Deploy the completed College Event Portal and add it to your portfolio"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 7", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn calling the GitHub REST API and handling auth/rate limits", "Solve 5 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Trace through merge sort by hand on a small array, step by step", "Trace through quick sort by hand on the same array and compare"] },
    project: { title: "Project push", tasks: ["Write a script that fetches your GitHub profile stats (repos, commits) via the API", "Write a script that fetches your public LeetCode solved-count stats"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 7", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn calling a public LeetCode stats API (or scraping public profile data)", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read a short explainer on linear regression with a worked example", "Solve one linear regression example by hand (small dataset)"] },
    project: { title: "Project push", tasks: ["Store the fetched stats in a small local database or JSON store", "Add a scheduled job that refreshes the stats periodically"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 7", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn scheduling recurring data fetches (polling or a simple scheduled job)", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read a short explainer on classification with a worked example (e.g. spam detection)", "Write 2 real examples each of classification and clustering problems"] },
    project: { title: "Project push", tasks: ["Add basic caching so repeated requests don't re-hit the APIs unnecessarily", "Handle API errors and rate-limit responses gracefully"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 7", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn caching API responses to avoid hitting rate limits", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review Divide & Conquer, Greedy and ML fundamentals together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Write a small API layer that serves the combined stats to a frontend", "Push the fetch scripts and API to GitHub with setup instructions"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 8", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn a charting library (Chart.js or Recharts) — bar and line charts", "Solve 5 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Learn database transactions — what ACID means in practice", "Write a short example of a transaction that needs atomicity"] },
    project: { title: "Project push", tasks: ["Build the dashboard shell in React and fetch stats from Phase 1's API", "Render a bar chart of commits per day/week"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 8", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn designing a dashboard layout for at-a-glance stats", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn indexing strategies and when an index helps vs hurts", "Add an index to one query in a past project and note the difference"] },
    project: { title: "Project push", tasks: ["Render a line chart of LeetCode problems solved over time", "Add summary stat cards (total repos, total problems solved, streak)"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 8", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn rendering trend data over time (commits/problems per week)", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review normalization (1NF-3NF) by normalizing a messy sample schema", "Draw the before/after ER diagrams for the normalization exercise"] },
    project: { title: "Project push", tasks: ["Add a language-breakdown chart from your GitHub repo data", "Make all charts responsive and add loading states"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 8", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn polishing data visualizations (tooltips, colors, responsiveness)", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review DP, React Router/Context and DB concepts together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Polish the full dashboard styling", "Deploy the GitHub + LeetCode Dashboard and add it to your portfolio"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 9", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn integrating a rich text editor (e.g. a WYSIWYG library) in React", "Solve 4 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Study branch prediction and pipelining conceptually", "Write a short note on why branch mispredictions slow down execution"] },
    project: { title: "Project push", tasks: ["Design the schema — posts, authors, tags — normalized", "Set up auth so only logged-in users can create posts"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 9", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn designing a schema for posts, authors and tags", "Solve 4 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read how a basic vector database performs a similarity search", "Write a 3-sentence explanation of cosine similarity in your own words"] },
    project: { title: "Project push", tasks: ["Integrate a rich text editor for writing posts", "Build the create-post endpoint and form, saving as draft or published"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 9", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn authoring workflows — draft vs published states", "Solve 4 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Research an embeddings API/library and read its quickstart", "Run a minimal script that embeds 3 sentences and compares similarity"] },
    project: { title: "Project push", tasks: ["Implement editing and deleting a post, restricted to its author", "Add tag assignment when creating/editing a post"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 9", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn securing authoring endpoints so only the author can edit their post", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review architecture + embeddings/vector search topics together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Add a public listing page for published posts", "Push to GitHub with a README describing the authoring flow"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 10", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn building a nested comment system (parent/child replies)", "Solve 3 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Read how a reverse proxy routes traffic to multiple backend services", "Diagram NGINX sitting in front of your blog's frontend and backend"] },
    project: { title: "Project push", tasks: ["Design the comments schema supporting nested replies", "Implement the comment submission and nested-reply endpoints"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 10", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn implementing full-text search (SQL LIKE/ILIKE or a search index)", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn how secrets/env vars should be handled in CI/CD (not hardcoded)", "Audit your Mess-Menu Nutrition Planner Blog repo for any hardcoded secrets"] },
    project: { title: "Project push", tasks: ["Build the comment UI with nested replies rendered correctly", "Add full-text search across post titles and content"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 10", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn pagination and infinite-scroll patterns for post lists", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read a sample GitHub Actions workflow that runs tests on push", "Write (but don't necessarily finalize) a workflow YAML for your repo"] },
    project: { title: "Project push", tasks: ["Add tag-based filtering and a search bar on the frontend", "Add pagination to the post list and search results"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 10", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn tag-based filtering on the frontend and backend", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review Docker Compose, NGINX and CI/CD together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Polish the full blog platform UI", "Deploy the full Blogging Platform and add it to your portfolio"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 11", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn designing a unified schema spanning multiple domains (academics, attendance, projects)", "Solve 4 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Compare WebSockets vs your Year 1 polling-based chat approach", "Write a short note on the tradeoffs and why WebSockets scale better"] },
    project: { title: "Project push", tasks: ["Design a unified PostgreSQL schema combining academics, attendance and projects", "Set up the database and write migration scripts for the unified schema"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 11", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn structuring a larger React app — folders, shared components, hooks", "Solve 4 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read how Redis pub/sub can fan out messages to multiple chat clients", "Diagram a message flowing from sender through Redis to all subscribers"] },
    project: { title: "Project push", tasks: ["Build the Express endpoints that serve combined academic + attendance data", "Build the Express endpoints that serve project-tracking data"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 11", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn combining data from multiple backend sources into one view", "Solve 4 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn about connection management — reconnects, heartbeats", "Write a short note on how you'd handle a dropped WebSocket connection"] },
    project: { title: "Project push", tasks: ["Build the React shell with shared layout and navigation for the unified app", "Wire up the academics and attendance views to the new endpoints"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 11", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn basic data-migration thinking (moving from scattered data to one schema)", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review WebSockets, Redis and caching together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Wire up the project-tracking view to the new endpoints", "Push to GitHub with a README explaining the unified schema"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 12", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn integrating multiple external APIs into a single settings/sync flow", "Solve 4 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Read a chapter of 'Clean Code' and note 3 practices to adopt", "Refactor one function in an old project using a practice from the chapter"] },
    project: { title: "Project push", tasks: ["Wire up GitHub and LeetCode stat syncing into the unified app (reusing Year 2 Month 7-8 work)", "Add a settings page for connecting/disconnecting external accounts"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 12", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn basic real-time notifications (polling or a simple WebSocket channel)", "Solve 4 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read a chapter of 'The Pragmatic Programmer' and note 3 takeaways", "Apply one takeaway to how you structure your capstone project"] },
    project: { title: "Project push", tasks: ["Add a real-time or polling-based notification for upcoming deadlines", "Add a combined progress view merging DSA, projects and academics"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 12", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn writing a comprehensive README for a multi-part project", "Solve 4 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Do a full Year 2 review — Algorithms, Architecture, SQL, React, Backend, Docker", "Write a consolidated one-page cheat sheet for the whole year"] },
    project: { title: "Project push", tasks: ["Find 2-3 open source issues labeled 'good first issue' in relevant repos", "Submit your first pull request to an open source project"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 12", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn preparing a project for open-source contribution (issues, CONTRIBUTING.md)", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Aim to get a second open source PR opened or merged", "Write a short reflection on what open source contribution taught you"] },
    project: { title: "Project push", tasks: ["Polish the full app UI and deploy it as your Year 2 capstone", "Write a full README and add it to your portfolio as the headline project"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 1", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn database transactions and ACID properties in depth", "Solve 7 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Read what OS is as a discipline and its core paradigms (kernels, syscalls)", "Write a short note on what a kernel is responsible for"] },
    project: { title: "Project push", tasks: ["Design the ERP schema — students, courses, roles, permissions", "Set up the ORM models and repository layer for students and courses"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 1", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn isolation levels (read committed, repeatable read, serializable)", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn advanced SQL — window functions, CTEs", "Write 3 practice queries using window functions or CTEs"] },
    project: { title: "Project push", tasks: ["Implement JWT auth with role-based access control (RBAC) — admin/teacher/student roles", "Add middleware enforcing role-based permissions on protected routes"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 1", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn indexing strategies and basic query optimization", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Compare raw SQL vs ORM-based queries for the same operation", "Write the same query both ways and note the tradeoffs"] },
    project: { title: "Project push", tasks: ["Implement course enrollment and grade-entry endpoints with transaction safety", "Add indexes on frequently-queried columns and measure the improvement"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 1", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn an ORM (Prisma or SQLAlchemy) and the repository pattern", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review transactions, isolation levels and ORMs together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Write a Dockerfile and docker-compose for the ERP backend + Postgres", "Push to GitHub with full setup and RBAC documentation"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 2", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn structuring a larger Express/FastAPI backend into modules", "Solve 5 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Learn AWS EC2 basics — launching and connecting to an instance", "Launch a free-tier EC2 instance and SSH into it"] },
    project: { title: "Project push", tasks: ["Design and build the attendance-marking module (per class, per session)", "Implement bulk attendance entry and correction endpoints"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 2", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn writing complex SQL queries with multiple joins and subqueries", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn AWS S3 basics — buckets, objects, permissions", "Upload and retrieve a file from an S3 bucket via the CLI or console"] },
    project: { title: "Project push", tasks: ["Design and build the grading module (assignments, exams, weighted totals)", "Implement endpoints for entering and updating grades per student"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 2", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn attendance/grading data modeling at scale", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn monitoring basics — what to watch on a live server", "Write a short note on 3 metrics you'd monitor for your ERP backend"] },
    project: { title: "Project push", tasks: ["Build reporting endpoints — attendance percentage and grade summaries per student", "Add faculty-only endpoints for reviewing their own classes"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 2", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn API versioning and backward-compatible endpoint design", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review Linux administration, IAM, EC2 and S3 together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Write integration tests covering attendance and grading flows", "Push to GitHub with updated API documentation"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 3", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn constraint-satisfaction thinking for scheduling problems", "Solve 5 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Draw a DFA for a simple pattern-matching problem by hand", "Write the equivalent regex for the same pattern"] },
    project: { title: "Project push", tasks: ["Design the timetable schema (rooms, time slots, courses, faculty)", "Implement conflict-detection logic for room/faculty double-booking"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 3", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn graph coloring / interval scheduling algorithm concepts", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn RAG (Retrieval-Augmented Generation) pipeline architecture", "Diagram a RAG pipeline from document ingestion to answer generation"] },
    project: { title: "Project push", tasks: ["Implement a scheduling algorithm that assigns courses to slots avoiding conflicts", "Add manual override endpoints for admin adjustments"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 3", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn writing complex conflict-detection queries in SQL", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Study how a load balancer distributes traffic across servers", "Write a short note on load balancing strategies (round robin vs least connections)"] },
    project: { title: "Project push", tasks: ["Add complex queries to check faculty availability across the week", "Optimize the scheduling algorithm for larger course loads"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 3", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn optimizing an algorithm's runtime for realistic input sizes", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review automata, system design and RAG together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Build a simple UI or API view to display the generated timetable", "Push to GitHub with a README explaining the scheduling approach"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 4", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn query performance profiling (EXPLAIN ANALYZE) and fixing slow queries", "Solve 8 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Write unit tests for 3 core functions in a past project that lacked them", "Measure test coverage and identify the biggest gaps"] },
    project: { title: "Project push", tasks: ["Profile the slowest ERP endpoints using EXPLAIN ANALYZE and identify bottlenecks", "Add appropriate indexes and query rewrites to fix them"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 4", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn caching strategies (cache-aside, TTL) for read-heavy endpoints", "Solve 8 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Write integration tests for one API endpoint chain (e.g. signup → login → protected route)", "Add these tests to a CI pipeline that runs on push"] },
    project: { title: "Project push", tasks: ["Add a caching layer for frequently-read, rarely-changed data (e.g. course lists)", "Build the final admin interface tying together students, courses and timetable"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 4", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn writing unit and integration tests for a larger codebase", "Solve 7 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn API endpoint test suites using a framework (pytest, Jest, etc.)", "Write an endpoint test suite for 5 of your LMS's routes"] },
    project: { title: "Project push", tasks: ["Write unit and integration tests covering the ERP's core flows", "Set up a GitHub Actions workflow to run tests on every push"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 4", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn setting up a GitHub Actions CI pipeline to run tests automatically", "Solve 7 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review testing strategies and CI/CD together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Do a final performance pass under simulated load", "Deploy the completed College ERP and add it to your portfolio"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 5", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn calling the OpenAI API and structuring prompts", "Solve 4 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Learn function calling in LLM APIs — how a model requests a tool call", "Write a minimal script that has an LLM call a mock function"] },
    project: { title: "Project push", tasks: ["Build a secure PDF upload endpoint and extract raw text from uploaded files", "Chunk the extracted text into passages suitable for embedding"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 5", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn extracting text from PDFs programmatically", "Solve 4 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn about context windows and how token limits constrain prompts", "Calculate the approximate token count for one of your longer prompts"] },
    project: { title: "Project push", tasks: ["Generate embeddings for each chunk using the OpenAI API and store them in a vector index", "Implement a basic similarity search over the stored chunks"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 5", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn chunking text into passages suitable for embedding", "Solve 4 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn tokenization in more depth — how words become tokens", "Compare token counts for 3 sentences of varying complexity"] },
    project: { title: "Project push", tasks: ["Wire up a chat interface that retrieves relevant chunks for a question", "Send retrieved chunks + question to the OpenAI API and display the answer"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 5", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn generating and storing embeddings for a chunk of text", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review microprocessors and LLM tooling concepts together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Add citations linking answers back to the source PDF section", "Deploy the PDF Chat assistant and add it to your portfolio"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 6 (Winter Break)", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn prompt engineering fundamentals — role, context, format instructions", "Solve 4 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: [] },
    project: { title: "Project push", tasks: ["Design prompts that turn extracted PDF text into concise study notes", "Wire the note-generation prompt into the existing PDF pipeline"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 6 (Winter Break)", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn few-shot prompting and structured output prompting", "Solve 4 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: [] },
    project: { title: "Project push", tasks: ["Add few-shot examples to improve note formatting consistency", "Test the prompt against 5+ real documents and refine based on failures"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 6 (Winter Break)", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn iterating on a prompt using real failure cases", "Solve 4 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: [] },
    project: { title: "Project push", tasks: ["Add a UI for reviewing and editing AI-generated notes", "Add regeneration with adjustable tone/length options"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 6 (Winter Break)", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn controlling output length and tone via prompting", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: [] },
    project: { title: "Project push", tasks: ["Polish the smart notes feature and fix edge cases (very short/long PDFs)", "Deploy the Smart Notes phase and add it to your portfolio"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 7", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn designing prompts that output structured flashcard data (Q&A pairs)", "Solve 3 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Write a requirements doc for the Issue Tracking System using SDLC principles", "Break the requirements into a backlog of user stories"] },
    project: { title: "Project push", tasks: ["Design a prompt that generates flashcards (question/answer pairs) from lecture notes", "Parse and validate the LLM's flashcard output before storing it"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 7", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn parsing and validating LLM output before using it in your app", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Draw a UML class diagram for the Issue Tracker's core entities", "Draw a UML sequence diagram for the 'create and assign issue' flow"] },
    project: { title: "Project push", tasks: ["Build the flashcard data model and storage tied to a source document", "Build the flashcard review UI (flip card, next/previous)"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 7", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn building a flashcard review UI in React (flip card, next/prev)", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Set up a Gitflow branching structure on the Issue Tracker repo", "Practice a feature-branch → PR → code-review → merge cycle"] },
    project: { title: "Project push", tasks: ["Implement a simple spaced-repetition scheduling algorithm", "Track review history per flashcard (correct/incorrect, next-due date)"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 7", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn spaced-repetition scheduling basics (simple interval algorithm)", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review SDLC, Agile and Gitflow together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Polish the flashcard UI and add a progress summary", "Deploy the Flashcards phase and add it to your portfolio"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 8", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn enforcing strict JSON structured outputs from an LLM", "Solve 3 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Compare serverless vs containerized deployment for a small API", "Write a short note on cost/complexity tradeoffs for each"] },
    project: { title: "Project push", tasks: ["Design a prompt that generates quiz questions in strict JSON format from notes", "Add JSON schema validation and a repair/retry step for malformed output"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 8", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn validating and repairing malformed LLM JSON output", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn about Lambda cold starts and how to mitigate them", "Write a short note on 2 mitigation strategies"] },
    project: { title: "Project push", tasks: ["Build the quiz data model (questions, options, correct answer, difficulty)", "Build the quiz-taking UI with multiple-choice selection"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 8", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn building a quiz-taking UI with scoring logic", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn CloudWatch alerting — setting a threshold alarm", "Design 2 alarms you'd want for a production URL shortener"] },
    project: { title: "Project push", tasks: ["Implement scoring logic and a results summary screen", "Add difficulty tiering so quizzes mix easy/medium/hard questions"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 8", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn generating difficulty-tiered questions via prompting", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review Lambda, API Gateway, RDS and CloudWatch together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Polish the full AI Study Assistant (PDF chat, notes, flashcards, quizzes) into one app", "Deploy the completed AI Study Assistant and add it to your portfolio"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 9", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn building dynamic, responsive multi-section forms in React", "Solve 3 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Read about the CAP theorem with a concrete example (e.g. a distributed cache)", "Write a short note on which two of C/A/P your projects have prioritized so far"] },
    project: { title: "Project push", tasks: ["Design the resume data schema (sections: experience, education, skills, projects)", "Build the multi-section form for entering resume data"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 9", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn generating PDFs programmatically from form data (e.g. via a PDF library)", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn how AI agent evaluation works — measuring task success", "Write 3 evaluation criteria you'd use for a research-assistant agent"] },
    project: { title: "Project push", tasks: ["Build a live preview pane that reflects form data in real time", "Add reordering of sections/entries within the form"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 9", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn structuring resume data into reusable sections (experience, education, skills)", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn tool-calling patterns for AI agents (function registries, structured calls)", "Sketch the tool interface your research agent will expose"] },
    project: { title: "Project push", tasks: ["Implement exporting the resume as a formatted, downloadable PDF", "Add 2-3 selectable resume templates/layouts"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 9", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn live-preview patterns (form updates reflected instantly in a preview pane)", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review distributed systems and AI agent concepts together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Polish the form UX and PDF output styling", "Deploy the Resume Builder and add it to your portfolio"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 10", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn designing a relational schema for companies, applications and stages", "Solve 3 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Audit an earlier auth project against 3 OWASP Top 10 vulnerabilities", "Fix at least one real vulnerability you find"] },
    project: { title: "Project push", tasks: ["Design the schema for companies, job applications and pipeline stages", "Build CRUD endpoints for adding and updating applications"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 10", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn building advanced UI patterns — kanban-style board, filters, sort", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn rate limiting and brute-force protection for login endpoints", "Implement basic rate limiting on a login endpoint"] },
    project: { title: "Project push", tasks: ["Build the kanban-style board UI for tracking application stages", "Implement moving an application between stages (applied/interview/offer/rejected)"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 10", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn implementing status-pipeline transitions (applied → interview → offer)", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn micro-benchmarking — measuring endpoint response time under load", "Benchmark 2 endpoints and note the slowest one"] },
    project: { title: "Project push", tasks: ["Build a searchable, filterable table view of all applications", "Add company database features (notes, contacts, links per company)"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 10", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn building a searchable, filterable data table in React", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review OAuth2, OWASP and performance profiling together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Polish the tracker UI and add basic stats (applications this month, response rate)", "Deploy the Job Tracker phase and add it to your portfolio"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 11", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn computing derived metrics from raw application data (success rates, funnels)", "Solve 3 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Review your GitHub contribution graph and identify any quiet months", "Write a short plan to keep contributions consistent going into Year 4"] },
    project: { title: "Project push", tasks: ["Build endpoints that compute success-rate and funnel metrics from application data", "Build an analytics dashboard visualizing these metrics with charts"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 11", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn building analytics charts (funnel chart, conversion rates)", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read 2-3 strong developer portfolio sites for structure/inspiration", "List 3 specific improvements you want to make to your own site"] },
    project: { title: "Project push", tasks: ["Design and build a collaborative interview-notes feature per application", "Implement adding and timestamping interview notes"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 11", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn designing a collaborative notes feature (shared, timestamped entries)", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Write full case studies for your top 3 Year 1-3 projects", "Get feedback on the case studies from a peer or mentor if possible"] },
    project: { title: "Project push", tasks: ["Add filtering analytics by company, role type and date range", "Add an export of analytics data (CSV or PDF summary)"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 11", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn structuring an interview-notes repository tied to specific applications", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review open source contribution and portfolio-writing skills together", "Write a one-page cheat sheet on what makes a strong project write-up"] },
    project: { title: "Project push", tasks: ["Polish the analytics dashboard styling", "Deploy the Analytics phase and add it to your portfolio"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 12", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn Redis basics — key-value caching and simple pub/sub", "Solve 3 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Consolidate all Year 3 cheat sheets into a single master review document", "Identify your weakest topic from the year and spend extra time on it"] },
    project: { title: "Project push", tasks: ["Add Redis caching for frequently-read data (dashboard stats, company list)", "Add a background job for periodic analytics recalculation"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 12", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn background job processing (queues, scheduled tasks)", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Do a full Year 3 retro — compare growth against the Year 3 milestones", "Write 3 specific goals for Year 4"] },
    project: { title: "Project push", tasks: ["Write Dockerfiles for the frontend and backend, and a docker-compose.yml wiring them with Postgres and Redis", "Test the full containerized stack locally end to end"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 12", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn writing a docker-compose setup for a multi-service app", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Choose your capstone (AI Workspace, Agile Hub, Cloud Storage, or Code Editor) and scope it", "Write the requirements doc and architecture plan for the chosen capstone"] },
    project: { title: "Project push", tasks: ["Set up cloud deployment for the containerized app with a managed database", "Configure environment variables and secrets securely for production"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 12", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn cloud deployment for a full-stack app with a managed database", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Set up the project skeleton (repo, CI, base structure) for the capstone", "Plan the 4-week build timeline you'll actually build during this month"] },
    project: { title: "Project push", tasks: ["Do a final QA pass across all four Placement Portal phases", "Deploy the completed Placement Portal and add it to your portfolio as a capstone project"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 1", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn system design fundamentals — functional vs non-functional requirements", "Solve 3 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Lock in your electives for the semester", "Confirm your Major Project guide and get the topic formally approved"] },
    project: { title: "Project push", tasks: ["Choose your capstone domain and write a one-page problem statement", "List the target users and their core needs"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 1", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn writing clear user stories and acceptance criteria", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Research your chosen AI specialization (LLM apps / ML pipelines / CV / NLP)", "Read 2-3 reference projects/papers in your chosen specialization"] },
    project: { title: "Project push", tasks: ["Write user stories covering the main flows of the application", "Define acceptance criteria for each core user story"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 1", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn scoping an MVP vs a full feature set", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn DB selection tradeoffs — SQL vs NoSQL for your capstone's needs", "Write a short note justifying your DB choice for the Major Project"] },
    project: { title: "Project push", tasks: ["Scope the MVP feature set vs stretch goals", "Research 2-3 similar existing products and note what to do differently"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 1", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn evaluating tradeoffs between competing technical approaches", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review system design and specialization research together", "Write a one-page cheat sheet summarizing your architecture decisions"] },
    project: { title: "Project push", tasks: ["Write the full system requirements document", "Get feedback on the requirements from a peer or mentor and revise"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 2", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn drafting a technical spec — architecture diagrams and data flow", "Solve 3 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Learn Terraform basics — providers, resources, state", "Write a minimal Terraform script provisioning one AWS resource"] },
    project: { title: "Project push", tasks: ["Draft the high-level architecture diagram (frontend, backend, database, external services)", "Choose and justify your tech stack for each layer"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 2", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn mapping complex database schemas with multiple related entities", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn secrets management (AWS Secrets Manager or similar)", "Move one hardcoded secret from a past project into a secrets manager"] },
    project: { title: "Project push", tasks: ["Map the full database schema with all entities and relationships", "Identify which entities need indexes or special constraints"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 2", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn defining clean API boundaries between frontend and backend", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Compare ECS vs plain EC2 deployment for your Major Project's needs", "Write a short note justifying your deployment choice"] },
    project: { title: "Project push", tasks: ["Define the API boundary — list all major endpoints and their contracts", "Write example request/response payloads for the core endpoints"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 2", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn choosing a tech stack based on the project's actual requirements", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review AWS ECS/ECR/VPC and Terraform together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Review the architecture for gaps or risks and revise it", "Write the technical spec document and share it for feedback"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 3", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn implementing a production-grade database from a finalized schema", "Solve 3 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Design the evaluation criteria for your Major Project's AI feature", "Write 5 test cases you'll use to evaluate the AI feature's quality"] },
    project: { title: "Project push", tasks: ["Set up the production database and implement the finalized schema", "Write initial migration scripts for the schema"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 3", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn secure authentication patterns (hashing, JWT, session management)", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn prompt injection risks and basic mitigations for AI-facing APIs", "Write a short note on 2 mitigations you'll apply to your project"] },
    project: { title: "Project push", tasks: ["Implement signup and login endpoints with secure password hashing", "Implement JWT issuing and refresh-token handling"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 3", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn role-based or permission-based access control design", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn rate limiting strategies specific to LLM-cost-sensitive endpoints", "Design a rate-limiting policy for your AI feature's endpoint"] },
    project: { title: "Project push", tasks: ["Implement role-based or permission-based access control across protected routes", "Write tests covering auth edge cases (expired token, wrong role)"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 3", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn writing database migrations safely", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review AI integration and edge security together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Seed the database with realistic sample data for development", "Push to GitHub with schema diagrams and auth flow documentation"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 4", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn structuring a large backend into clean modules/services", "Solve 3 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Learn centralized logging concepts (structured logs, log aggregation)", "Add structured logging to one service in your Major Project"] },
    project: { title: "Project push", tasks: ["Implement the core domain models and repository/service layer", "Build the primary CRUD endpoints for your main entities"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 4", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn designing REST (or GraphQL) endpoints for your core domain", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Compare event-driven vs request-response architecture for your project's needs", "Write a short note on where an event-driven approach would help"] },
    project: { title: "Project push", tasks: ["Implement the core business logic unique to your capstone (the feature that makes it useful)", "Add thorough input validation and consistent error responses"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 4", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn implementing business logic with proper validation and error handling", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn what makes a good dashboard (signal vs noise, key metrics)", "Sketch the dashboard layout you'll build for your Major Project"] },
    project: { title: "Project push", tasks: ["Implement any secondary endpoints needed to support the frontend", "Write integration tests covering the core backend flows"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 4", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn writing integration tests for backend services", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review Kafka/event-driven patterns and observability together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Do a code review pass and refactor rough edges", "Push to GitHub with updated API documentation"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 5", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn structuring a larger React app — routing, shared components, hooks", "Solve 4 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Write a mock system design doc for a well-known app (e.g. a URL shortener at scale)", "Get feedback on the mock design from a peer or online community"] },
    project: { title: "Project push", tasks: ["Set up the React app structure with routing and a shared layout/nav", "Build the core reusable UI components (buttons, forms, cards, modals)"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 5", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn building accessible, responsive UI components from scratch", "Solve 4 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review your Major Project against production-readiness checklist items (logging, auth, error handling)", "Fix the top 3 gaps found in the checklist review"] },
    project: { title: "Project push", tasks: ["Build the primary views for your main entities, wired to the backend API", "Implement the main create/edit forms with validation"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 5", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn state management approaches for a larger app (Context, or a library)", "Solve 4 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Prepare a validation plan for the beta — what needs to work before it's shareable", "Write test scenarios covering the full primary user journey"] },
    project: { title: "Project push", tasks: ["Add authenticated routes and login/logout flows on the frontend", "Ensure the UI is responsive across mobile, tablet and desktop"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 5", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn connecting frontend forms and views to your backend API", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review interview prep and production-readiness together", "Write a one-page cheat sheet of your weakest interview topics"] },
    project: { title: "Project push", tasks: ["Polish the core UI's visual design and consistency", "Push to GitHub and do a full click-through test of the main flows"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 6 (Winter Break)", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn designing a dashboard layout that surfaces key metrics at a glance", "Solve 3 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Learn LLM fine-tuning basics conceptually", "Write a short note on when fine-tuning beats prompt engineering"] },
    project: { title: "Project push", tasks: ["Design the main dashboard layout and identify the 3-5 most important metrics to surface", "Build the dashboard shell with placeholder sections"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 6 (Winter Break)", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn wiring multiple backend endpoints into one cohesive dashboard view", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn LoRA and quantization conceptually", "Write a short note on why these techniques reduce compute cost"] },
    project: { title: "Project push", tasks: ["Wire up each dashboard section to its backend endpoint", "Add charts/visualizations for the key metrics"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 6 (Winter Break)", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn adding charts/visualizations for your capstone's key data", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Research running a small local LLM and note the hardware/software requirements", "Write a short feasibility note on using a local LLM in a future project"] },
    project: { title: "Project push", tasks: ["Finalize navigation and information architecture across all views", "Add empty/loading/error states to every dashboard section"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 6 (Winter Break)", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn finalizing navigation and information architecture across the app", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review advanced AI topics and UX/testing concepts together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Polish the full dashboard's styling and responsiveness", "Do a full walkthrough of the app end to end and fix rough edges"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 7", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn where AI genuinely adds value in your specific capstone (recommendations, search, generation)", "Solve 3 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Write the full public README — setup, usage, architecture overview", "Write a CONTRIBUTING.md if you want outside contributions"] },
    project: { title: "Project push", tasks: ["Decide the specific AI feature to add (recommendations, smart search, content generation, etc.) and scope it", "Build the backend integration calling the LLM/ML API"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 7", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn calling an LLM or ML API from your backend", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Write user-facing documentation (how to use the deployed app)", "Record a short demo walkthrough (video or GIF) for the docs"] },
    project: { title: "Project push", tasks: ["Wire the AI feature into your core domain logic", "Build the frontend UI for the AI feature"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 7", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn designing prompts or model inputs specific to your domain", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Do a final security and dependency audit before public release", "Fix any critical issues found in the audit"] },
    project: { title: "Project push", tasks: ["Test the AI feature against 10+ real inputs from your app and refine prompts/logic", "Add graceful fallbacks for when the AI feature fails or times out"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 7", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn evaluating AI feature output quality and handling failures gracefully", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review documentation writing and release practices together", "Write a one-page checklist for future releases"] },
    project: { title: "Project push", tasks: ["Polish the AI feature's UX (loading states, explanations of results)", "Push to GitHub with documentation of how the AI integration works"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 8", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn background job processing (queues, workers)", "Solve 3 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Rewrite your resume with quantified impact from all 4 years of projects", "Get resume feedback from a mentor, senior, or career service"] },
    project: { title: "Project push", tasks: ["Identify 2-3 workflows in your capstone that should run automatically (notifications, cleanups, syncs)", "Set up a background job queue/worker system"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 8", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn scheduling recurring tasks with cron jobs", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Rebuild your GitHub profile README to highlight your Major Project and top work", "Pin your 6 best repos with clear descriptions"] },
    project: { title: "Project push", tasks: ["Implement the first automated workflow as a background job", "Add a scheduled cron job for a recurring task"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 8", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn designing idempotent automated workflows (safe to retry)", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Rebuild your personal website's homepage messaging around your target roles", "Update your LinkedIn headline, About section and featured projects"] },
    project: { title: "Project push", tasks: ["Implement the remaining automated workflows, ensuring they're safe to retry", "Add logging so you can see when/whether jobs ran successfully"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 8", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn monitoring/logging for background jobs", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Do a full profile review across resume, GitHub, LinkedIn and website for consistency", "Write down 3 people who could refer or introduce you at target companies"] },
    project: { title: "Project push", tasks: ["Test all automated workflows under failure conditions (retry, partial failure)", "Push to GitHub with documentation of each automated workflow"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 9", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn writing comprehensive unit tests for critical business logic", "Solve 2 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Read a case study on a real-world refactor to Clean Architecture", "Write a short note on 2 lessons applicable to your project"] },
    project: { title: "Project push", tasks: ["Write unit tests covering all critical business logic in the backend", "Write integration tests for the core multi-step flows (signup → core action → result)"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 9", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn writing integration tests covering multi-step flows", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Map your Major Project's current modules to DDD bounded contexts", "Identify where domain logic is currently leaking into infrastructure code"] },
    project: { title: "Project push", tasks: ["Write end-to-end tests simulating a full user session through the app", "Set up these tests to run automatically via GitHub Actions"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 9", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn basic end-to-end testing (simulating a real user session)", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Write the target architecture doc post-refactor", "Get a second opinion on the target architecture if possible"] },
    project: { title: "Project push", tasks: ["Run a structured manual bug hunt using an edge-case checklist", "Log and triage all bugs found by severity"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 9", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn structured manual bug-hunting (test plans, edge case checklists)", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review Clean Architecture and DDD together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Fix the highest-severity bugs found during QA", "Re-test the fixed areas and confirm no regressions"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 10", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn profiling and optimizing frontend performance (bundle size, load time)", "Solve 2 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Identify 2-3 real scalability bottlenecks you solved across your projects", "Outline the technical case study structure (problem, investigation, fix, result)"] },
    project: { title: "Project push", tasks: ["Profile frontend load performance and reduce bundle size/lazy-load where useful", "Profile backend response times and fix the slowest endpoints"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 10", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn profiling and optimizing backend performance (query times, response times)", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Draft the first technical case study in full", "Get feedback on the draft from a peer or mentor"] },
    project: { title: "Project push", tasks: ["Set up a CI/CD pipeline that runs tests and deploys automatically on push to main", "Configure staging vs production environments"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 10", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn setting up a full CI/CD pipeline for automated deployment", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Draft the second technical case study in full", "Revise both case studies based on feedback"] },
    project: { title: "Project push", tasks: ["Deploy the full app to production with a managed database", "Set up basic uptime/error monitoring"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 10", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn production environment configuration (env vars, secrets, scaling basics)", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review technical writing and reading together", "Write a one-page cheat sheet on what makes a strong engineering write-up"] },
    project: { title: "Project push", tasks: ["Do a final load/performance pass under realistic usage", "Confirm the production deployment is stable end to end"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 11", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn writing a comprehensive project README (setup, architecture, usage)", "Solve 3 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Do a live mock technical interview with a peer, mentor or platform", "Write down and address the 3 weakest points from the mock"] },
    project: { title: "Project push", tasks: ["Write the full project README — setup instructions, architecture overview, tech stack", "Write API documentation covering every public endpoint"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 11", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn writing clear API documentation for external consumers", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Do a live mock system design interview", "Write down and address the 3 weakest points from the mock"] },
    project: { title: "Project push", tasks: ["Record a short demo video or prepare a live walkthrough of the app", "Polish remaining rough UI edges found during the walkthrough"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 11", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn preparing a polished live portfolio demo of a large project", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Do a live mock behavioral interview using the STAR method", "Refine your top 5 STAR stories based on the feedback"] },
    project: { title: "Project push", tasks: ["Write a case study covering the problem, architecture decisions and tradeoffs made", "Add the capstone as the headline project on your portfolio site"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 11", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn writing a project case study explaining decisions and tradeoffs", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review all interview prep areas together", "Write a final one-page cheat sheet of your personal weak spots to review right before interviews"] },
    project: { title: "Project push", tasks: ["Get feedback on the documentation and demo from a peer or mentor", "Make final revisions based on that feedback"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 12", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn structuring a technical project presentation (problem, solution, demo, results)", "Solve 2 DSA problems related to this week's topic"] },
    academic: { title: "Academic focus", tasks: ["Write the final Major Project thesis/report following your college's format", "Get the report reviewed by your guide"] },
    project: { title: "Project push", tasks: ["Build the slide deck and script for presenting your capstone", "Rehearse the presentation and refine timing/clarity"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 12", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn answering deep technical questions about your own architecture decisions", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Revise the report based on guide feedback", "Finalize and submit the written thesis"] },
    project: { title: "Project push", tasks: ["Prepare answers for likely deep-dive technical questions about your architecture", "Do a mock technical interview focused on your capstone with a peer"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 12", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn behavioral interview prep — structuring stories with a clear framework", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Clean up the GitHub repo — remove dead code, finalize README and docs", "Tag the final submission commit/release"] },
    project: { title: "Project push", tasks: ["Prepare 5-6 behavioral stories from your 4 years of projects using a clear framework", "Do a mock behavioral interview and refine weak answers"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 12", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn negotiating and evaluating offers", "Solve 2 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Prepare onboarding notes for your chosen team/lab if already placed", "Do a final full review of resume, GitHub and portfolio before graduating"] },
    project: { title: "Project push", tasks: ["Give the final capstone presentation", "Wrap up — publish the project, update your resume and LinkedIn with the finished capstone"] }
  },
];

// Fallback generator — only used if a (year, month, week) combination
// is missing from WEEK_BLUEPRINTS above, so the app never breaks.
function buildCurriculumWeekBlueprints(){
  const weeks = [];
  CURRICULUM.years.forEach(year=>{
    year.months.forEach((month, mi)=>{
      const dsaPerWeek = Math.max(1, Math.round((month.dsa || 0) / 4));
      const focusPool = Array.isArray(month.focus) && month.focus.length ? month.focus : ["Consolidate & review"];
      for(let weekIndex = 0; weekIndex < 4; weekIndex++){
        const existing = WEEK_BLUEPRINTS.find(w => w.yearId === year.id && w.monthName === month.name && w.weekInMonth === weekIndex + 1);
        if(existing){ weeks.push(existing); continue; }
        const focusText = focusPool[weekIndex] || focusPool[focusPool.length - 1] || "Consolidate & review";
        weeks.push({
          yearId: year.id,
          yearLabel: year.label,
          monthName: month.name,
          weekInMonth: weekIndex + 1,
          project: month.project || "",
          skill: {
            title: "Skill sprint",
            tasks: [focusText, `Solve ${dsaPerWeek} DSA problems`]
          },
          academic: {
            title: "Academic focus",
            tasks: [`Review ${month.name} concepts`, "Capture one concise summary for later revision"]
          },
          project: {
            title: "Project push",
            tasks: [`Advance ${month.project || "the milestone"}`, "Log a concrete deliverable before the next week"]
          }
        });
      }
    });
  });
  return weeks;
}

CURRICULUM.weeks = buildCurriculumWeekBlueprints();

/* ============================================================
   DOMAIN ROTATION — weekly reinforcement tasks
   ------------------------------------------------------------
   The 192-week curriculum above is one shared spine (same for
   everyone, Year 1 foundations especially). On top of it, every
   week from Year 2 onward gets ONE extra task pulled from here:
     - Specialists (fullstack/ai-ml/systems/data/security) mostly
       get tasks from their own domain, reinforcing depth.
     - Every few weeks, a specialist instead gets a task borrowed
       from an ADJACENT domain ("give and take") — the same
       all-round competence the interdisciplinary projects push —
       so nobody stays purely siloed in one skill.
     - Generalists rotate through ALL domains in sequence, one
       track's task at a time, staying broad across the board.
   Tasks are written at the level a 10+ LPA interview actually
   probes: depth of the "why", not just "do the tutorial".
   ============================================================ */
const DOMAIN_ROTATION_TASKS = {
  fullstack: [
    "Learn how the browser rendering pipeline works (parse, style, layout, paint) and explain it out loud in under a minute",
    "Read about optimistic UI updates and add one to an existing project",
    "Learn the tradeoffs between SSR, SSG, and CSR — write 3 lines on when you'd pick each",
    "Add proper loading/error/empty states to one screen you've been ignoring them on",
    "Learn how JWT vs session-based auth actually differ, and which your projects use and why",
    "Profile one of your pages with browser devtools and fix the biggest render bottleneck",
    "Learn what N+1 queries are and check if any of your APIs have one",
    "Write one integration test for a critical user flow you don't currently test",
    "Learn accessibility basics (semantic HTML, ARIA, keyboard nav) and audit one page",
    "Learn how CORS actually works by breaking it on purpose locally, then fixing it",
    "Design a REST API versioning strategy and apply it to one existing endpoint",
    "Learn optimistic locking vs pessimistic locking for concurrent writes"
  ],
  "ai-ml": [
    "Learn the bias-variance tradeoff and identify which side one of your models leans toward",
    "Read about embeddings and manually compute cosine similarity between two short texts",
    "Learn what overfitting looks like in a loss curve and check one of your training runs for it",
    "Learn the difference between precision, recall, and F1 — pick the right one for a project and justify it",
    "Learn how prompt injection attacks work against LLM apps, and check if any of your builds are exposed",
    "Learn token limits and context windows, and estimate the cost of one of your LLM calls",
    "Read about RAG failure modes (retrieval miss vs generation miss) and diagnose which one hurts your Q&A project more",
    "Learn what a confusion matrix tells you that accuracy doesn't, and generate one for a model you've trained",
    "Learn the basics of model versioning/experiment tracking (even just a spreadsheet counts) and apply it",
    "Read one paper abstract + intro (skip the math) on a technique you're using and summarize it in your own words",
    "Learn why data leakage happens between train/test splits and audit one of your pipelines for it",
    "Learn the cost/latency tradeoffs between a hosted LLM API and a locally-run smaller model"
  ],
  systems: [
    "Learn the difference between horizontal and vertical scaling, and which one your last deployment used",
    "Learn what a health check endpoint should actually verify, and add a real one (not just 200 OK)",
    "Read about the CAP theorem and place one of your projects on it honestly",
    "Learn how DNS resolution works end-to-end, from typing a URL to a response",
    "Learn the difference between blue-green and rolling deployments, and pick one for a project",
    "Learn what backpressure is in a system, and identify where one of your services could apply it",
    "Learn how TLS/SSL handshakes work at a level you could explain in an interview",
    "Read about idempotency keys and add one to a POST endpoint that currently lacks it",
    "Learn what a circuit breaker pattern does and sketch where you'd add one to a real project",
    "Learn the tradeoffs between synchronous and async/queue-based processing for one workflow you built",
    "Learn how container image layers and caching work, and shrink one of your Dockerfiles",
    "Learn what observability (logs, metrics, traces) means beyond just 'add logging', and add one metric that matters"
  ],
  data: [
    "Learn the difference between OLTP and OLAP and classify one of your projects' databases",
    "Learn what a star schema is and sketch one for a dataset you've worked with",
    "Read about data quality dimensions (completeness, consistency, timeliness) and check one dataset against them",
    "Learn window functions in SQL and rewrite one query you'd previously done with a loop",
    "Learn the difference between batch and streaming pipelines, and which fits one of your projects better",
    "Learn what a slowly changing dimension is and how you'd model one",
    "Learn indexing strategies (B-tree vs hash) and check if a slow query of yours is missing one",
    "Read about survivorship bias in datasets and check if one of your analyses has it",
    "Learn the tradeoffs of denormalization for read-heavy workloads, apply it to one table",
    "Learn what a data contract is between producer and consumer services, and write one for a pipeline you built",
    "Learn how to profile a dataset for outliers before trusting any summary statistic from it",
    "Learn the basics of A/B test statistical significance, and design one for a feature you'd ship"
  ],
  security: [
    "Learn the OWASP Top 10 and audit one of your own deployed apps against the first three",
    "Learn how SQL injection actually works by exploiting a deliberately vulnerable local app, then patch it",
    "Learn the difference between authentication and authorization, and check one project doesn't conflate them",
    "Learn what a JWT can and can't protect against, and where your projects might be over-trusting one",
    "Learn how rate limiting stops brute-force attacks, and verify one login endpoint you own is protected",
    "Learn the basics of hashing vs encryption vs encoding, and check nothing in your projects confuses them",
    "Learn how CSRF attacks work and whether any of your forms are exposed",
    "Read about the principle of least privilege and check one project's permission model against it",
    "Learn how a man-in-the-middle attack works and why HTTPS actually prevents it",
    "Learn what secrets management means beyond '.env files' and improve one project's approach",
    "Learn the basics of secure password storage (salting, bcrypt/argon2) and verify a project does it right",
    "Learn how dependency vulnerabilities get discovered and run a vulnerability scan on one of your repos"
  ]
};

const DOMAIN_ROTATION_TRACKS = ["fullstack", "ai-ml", "systems", "data", "security"];

// Adjacent-domain pairing used for the occasional cross-pollination task —
// deliberately not symmetric everywhere; it's "what would genuinely help
// this specialist's interviews", not just a random neighbor.
const DOMAIN_ADJACENCY = {
  fullstack: "systems",
  "ai-ml": "data",
  systems: "security",
  data: "ai-ml",
  security: "fullstack"
};

/**
 * Returns the single "Domain rotation" bonus task for a given global week
 * index and the user's chosen track. Year 1 (weeks 0-47) stays fully
 * shared/foundational, so this returns null there — see buildScheduleData.
 *   - Specialist tracks: mostly pull from their own bank; every 4th week
 *     (by design, not randomness, so it's stable across renders) pulls one
 *     task from their adjacent domain instead — the "give and take".
 *   - "generalist" (or no track chosen yet): rotates through every domain
 *     in turn, one full domain's flavor per week, cycling continuously.
 */
export function getDomainRotationTask(weekIndex, userTrack){
  const track = DOMAIN_ROTATION_TRACKS.includes(userTrack) ? userTrack : null;
  if(track){
    const useAdjacent = (weekIndex % 4) === 3;
    const sourceTrack = useAdjacent ? DOMAIN_ADJACENCY[track] : track;
    const pool = DOMAIN_ROTATION_TASKS[sourceTrack];
    const task = pool[weekIndex % pool.length];
    return useAdjacent
      ? { text: task, sourceLabel: (TRACKS[sourceTrack] || {}).label || sourceTrack, isCrossDomain: true }
      : { text: task, sourceLabel: (TRACKS[track] || {}).label || track, isCrossDomain: false };
  }
  // Generalist (or track not yet chosen): cycle through every domain in a
  // fixed rotation so they get real breadth across all four years.
  const rotationTrack = DOMAIN_ROTATION_TRACKS[weekIndex % DOMAIN_ROTATION_TRACKS.length];
  const pool = DOMAIN_ROTATION_TASKS[rotationTrack];
  const task = pool[Math.floor(weekIndex / DOMAIN_ROTATION_TRACKS.length) % pool.length];
  return { text: task, sourceLabel: (TRACKS[rotationTrack] || {}).label || rotationTrack, isCrossDomain: false };
}

/* ============================================================
   OFFICIAL B.TECH IT SYLLABUS — by semester, per college
   Each semester ≈ 6 months, 8 semesters across 4 years (aligned
   1:1 with the 48-month roadmap above — semesterIndex = floor(monthGlobalIndex/6))
   ============================================================ */
const SYLLABUS_HITK = [
  { sem:1, year:1, subjects:[
    { name:"Physics-I", topics:["Central Forces","Kepler's Laws","Oscillations","Damping","Forced Vibration","Resonance","Waves","Interference","Polarization","Quantum Mechanics","Schrödinger Equation","Particle in a Box"] },
    { name:"Mathematics-I", topics:["Matrices","Rank","Determinants","Eigenvalues","Eigenvectors","Diagonalization","Cayley-Hamilton Theorem","Orthogonal Transformation","Gradient","Divergence","Curl","Directional Derivatives","Line Integrals","Surface Integrals","Volume Integrals","Green's Theorem","Stokes Theorem","Gauss Theorem","Sequences & Convergence","Comparison Test","Ratio Test","Root Test","Raabe Test","Alternating Series","First-Order ODE","Bernoulli Equations","Exact Equations","Euler Equations","Second-Order ODE","Variation of Parameters","Partial Derivatives","Euler Theorem","Double Integration","Triple Integration"] },
    { name:"Electronics", topics:["Energy Bands","Intrinsic Semiconductor","Extrinsic Semiconductor","Drift","Diffusion","PN Junction","VI Characteristics","Rectifiers","Filters","Zener Diode","LED","BJT (CE, CB)","Biasing","Load Line","Amplification","JFET","MOSFET (Enhancement, Depletion)","Op-Amps: Comparator","Inverting Amplifier","Non-Inverting Amplifier","Integrator","Differentiator","Adder","Subtractor"] },
    { name:"Human Values", topics:["Ethics","Human Values","Society","Professional Ethics","Sustainability","Relationships","Technology Ethics","AI Ethics"] },
    { name:"Chemistry", topics:["Thermodynamics","Electrochemistry","Batteries","Fuel Cells","Hybridization","Molecular Orbitals","Band Theory","Atomic Structure","Wave Mechanics","UV Spectroscopy","IR Spectroscopy","NMR","Fluorescence","Stereochemistry","Reaction Mechanisms","Drug Synthesis"] },
    { name:"Practical Labs", topics:["Physics Lab","Chemistry Lab","Electronics Lab"] }
  ]},
  { sem:2, year:1, subjects:[
    { name:"Mathematics-II", topics:["Random Variables","Bayes Theorem","Binomial Distribution","Normal Distribution","Newton-Raphson","Bisection","Regula Falsi","LU Decomposition","Gauss Elimination","Runge-Kutta","Graphs","Trees","BFS","DFS","Dijkstra","MST","Kruskal","Prim","Laplace Transform","Inverse Laplace","Convolution","ODE Solving via Laplace"] },
    { name:"Programming for Problem Solving (C)", topics:["Computer Basics","Number Systems","Algorithms","Flowcharts","Variables","Operators","Loops","Functions","Arrays","Strings","Pointers","Structures","Dynamic Memory","Files","Preprocessor"] },
    { name:"Basic Electrical Engineering", topics:["KCL","KVL","Network Theorems","Magnetism","AC Circuits","Three-Phase Systems","Transformers","DC Motors","Induction Motors"] },
    { name:"Technical English", topics:["Phonetics","Communication","Business Writing","Reports","Emails","Proposals","SOP","Presentations"] },
    { name:"Practical Labs", topics:["C Programming Lab","Electrical Lab","Workshop","Engineering Graphics","CAD"] }
  ]},
  { sem:3, year:2, subjects:[
    { name:"Discrete Mathematics", topics:["Logic","Sets","Relations","Functions","Recurrence","Graphs","Combinatorics"] },
    { name:"Microprocessor & Microcontroller", topics:["8086","8051","Assembly","Interrupts","Timers","Interfacing"] },
    { name:"Digital Circuit Design", topics:["Logic Gates","Boolean Algebra","K-Map","Combinational Circuits","Sequential Circuits","Flip-Flops","Counters","Registers"] },
    { name:"Data Structures", topics:["Arrays","Linked Lists","Stacks","Queues","Trees","BST","Heap","Graphs","Hashing"] },
    { name:"Algorithms", topics:["Time Complexity","Recursion","Divide & Conquer","Greedy","Dynamic Programming","Backtracking","Graph Algorithms","Sorting","Searching"] },
    { name:"Computer Organization", topics:["Number Representation","CPU","ALU","Registers","Memory Hierarchy","Cache","Pipelining","I/O","Instruction Cycle"] }
  ]},
  { sem:4, year:2, subjects:[
    { name:"Algebraic Structures", topics:["Groups","Rings","Fields","Modular Arithmetic","Homomorphism"] },
    { name:"Object-Oriented Programming", topics:["Java","Classes","Objects","Inheritance","Polymorphism","Abstraction","Interfaces","Exception Handling","Collections"] },
    { name:"Database Management", topics:["ER Model","SQL","Normalization","Transactions","Indexing","Views","PL/SQL"] },
    { name:"Computer Networks", topics:["OSI","TCP/IP","Routing","Switching","IP","DNS","HTTP","TCP","UDP","Network Security Basics"] },
    { name:"Design Thinking", topics:["Innovation","Ideation","Prototyping","User-Centered Design"] },
    { name:"Environmental Science", topics:["Ecology","Pollution","Climate","Sustainability"] }
  ]},
  { sem:5, year:3, subjects:[
    { name:"Advanced Java & Web", topics:["Advanced Java","Servlets","JSP","JDBC","HTML","CSS","JavaScript","Web Architecture"] },
    { name:"Artificial Intelligence & Machine Learning", topics:["AI Basics","ML Workflow","Regression","Classification","Clustering","Model Evaluation"] },
    { name:"Operating Systems", topics:["Processes","Threads","Scheduling","Deadlocks","Memory Management","Paging","Virtual Memory","File Systems"] },
    { name:"Formal Language", topics:["DFA","NFA","Regular Expressions","CFG","PDA","Turing Machine"] },
    { name:"Professional Elective", topics:["Computer Graphics","Distributed DBMS","Cyber Security","Agile Development","Big Data","Compiler Design"] },
    { name:"Open Elective", topics:["Linear Algebra","Statistics","Information Theory","Cloud Computing","Biology","VLSI","Sensors"] }
  ]},
  { sem:6, year:3, subjects:[
    { name:"Economics", topics:["Engineering Economics","Cost Analysis","Break-Even","Finance Basics"] },
    { name:"Software Engineering", topics:["SDLC","UML","Testing","Design Patterns","Maintenance","Documentation"] },
    { name:"Cryptography & Security", topics:["Encryption","DES","AES","RSA","Hashing","Authentication","Digital Signatures"] },
    { name:"Professional Elective", topics:["Digital Image Processing","Advanced AIML","Internet Technology","Distributed Computing","Pattern Recognition","Blockchain","Data Science"] },
    { name:"Seminar", topics:["Literature Review","Technical Writing","Presentation"] },
    { name:"Industry Lab", topics:["Team Projects","Software Tools","Industrial Practices"] }
  ]},
  { sem:7, year:4, subjects:[
    { name:"Management", topics:["Planning","Leadership","HR","Project Management","Organizational Behavior"] },
    { name:"Professional Elective", topics:["Internet of Things","Mobile Computing","Real-Time Systems","Quantum Computing"] },
    { name:"Open Elective", topics:["DevOps","Optimization","Ethical Hacking","Cyber Security","Industry 4.0","5G Communication","Software Defined Radio","Sustainability","Biosensors"] },
    { name:"Internship", topics:["Industrial Exposure","Professional Development","Team Collaboration"] },
    { name:"Project I", topics:["Problem Identification","Design","Implementation","Documentation"] }
  ]},
  { sem:8, year:4, subjects:[
    { name:"Project II", topics:["Development","Testing","Deployment","Dissertation"] },
    { name:"Comprehensive Viva", topics:["Core CS Revision","Project Defense","Technical Interview"] },
    { name:"Skill Development", topics:["Industry Certification","Professional Skills","Emerging Technologies"] }
  ]}
];

/* ============================================================
   JUIT SOLAN — B.TECH CSE/IT SYLLABUS — by semester
   ============================================================ */
const SYLLABUS_JUIT = [
  { sem:1, year:1, subjects:[
    { name:"Mathematics-1", topics:["Matrices, Rank & Inverse","Eigenvalues & Eigenvectors","Differential Equations","Infinite Series","Multiple Integration","Vector Calculus"] },
    { name:"Physics-1 & Physics Lab-1", topics:["Central Forces & Oscillations","Wave Optics","Polarization","Quantum Mechanics Basics","Experimental Verification"] },
    { name:"Software Development Fundamentals-I & Lab", topics:["SDLC & Problem Solving","Flowcharts & Pseudocode","C Data Types & Operators","Control Flow (if-else, loops, switch)","1D/2D Arrays","Pointer Arithmetic","Dynamic Memory Allocation","Functions & Recursion","Structures & Unions","File Handling"] },
    { name:"Basic Electronics & Lab", topics:["Electronic Devices","Circuit Fundamentals","Laboratory Instrumentation"] },
    { name:"English", topics:["Language Proficiency","Vocabulary","Introductory Communication Skills"] },
    { name:"Workshop", topics:["Practical Engineering Trades","Hand Tools","Workshop Safety Practices"] }
  ]},
  { sem:2, year:1, subjects:[
    { name:"Mathematics-2", topics:["Advanced Calculus","Linear Algebra","Differential Equations"] },
    { name:"Physics-2 & Physics Lab-2", topics:["Advanced Physics Topics","Experimental Setups"] },
    { name:"Software Development Fundamentals-II & Lab", topics:["Procedural vs OOP","Classes, Objects & Memory Representation","Constructors & Destructors","Function/Operator Overloading","Static & Friend Functions","Inheritance (private/public/multiple)","Virtual & Pure Virtual Functions","Abstract Classes & RTTI","UML Class Diagrams","Exception Handling","Templates & STL","Linked Lists, Stacks, Queues","Recursion (Tower of Hanoi, N-Queen, Rat in Maze)"] },
    { name:"Life Skills & Professional Communication Lab", topics:["Soft Skills","Career Orientation","Verbal & Non-verbal Communication"] },
    { name:"Engineering Drawing & Design", topics:["Geometric Construction","Orthographic Projections","CAD Foundations"] },
    { name:"Universal Human Values (UHV)", topics:["Ethics","Self-exploration","Value Education"] }
  ]},
  { sem:3, year:2, subjects:[
    { name:"Mathematical Foundations for AI and Data Science", topics:["Discrete Structures","Probability","Matrices","Linear Algebra for AI"] },
    { name:"Theory of Computation", topics:["DFA/NFA & State Minimization","Moore & Mealy Machines","Context-Free Grammars & Parse Trees","Chomsky & Greibach Normal Forms","Pushdown Automata","Top-down & Bottom-up Parsing","Turing Machines","Halting Problem","Decidability & P vs NP","NP-Completeness & Reducibility"] },
    { name:"Data Structures & Lab", topics:["Arrays, Linked Lists, Stacks, Queues","Sparse Matrices via Multi-linked Lists","Hashing (Chaining, Probing)","Merge/Quick/Radix/Bucket/Count Sort","K-ary & Threaded Binary Trees","Binary, Binomial & Fibonacci Heaps","BST, AVL, Red-Black, B & B+ Trees","Graph Traversals (BFS/DFS)","Shortest Path & MST","Tries, Suffix Trees & Arrays"] },
    { name:"Database Management Systems & Lab", topics:["ER Diagrams & Constraints","Relational Algebra","SQL & PL/SQL","Stored Procedures, Functions, Cursors, Triggers","Normalization (2NF, 3NF, BCNF)","ACID Properties & Concurrency Control","Locking, Deadlocks & Recovery","Grant/Revoke Security"] },
    { name:"Unix Programming Lab", topics:["Command-line Interfaces (ls, cd, chmod)","Pipelines & I/O Redirection","grep, find & Process Control","Shell Scripting","System Calls (open, read, write, fork)","Directory Traversal","Networking (ping, ssh, scp)","tar & gzip"] },
    { name:"Object Oriented Programming using Java", topics:["JVM & Garbage Collection","Overloading, Constructors & Strings","Abstract Classes, Packages & Interfaces","Exception Handling","Java Collections Framework","Multithreading","Generics & Wildcards","Reflection & Applets"] },
    { name:"Economics", topics:["Microeconomics","Macroeconomics","Cost Analysis","Engineering Financial Applications"] },
    { name:"Competitive Programming-I", topics:["Platform Onboarding (LeetCode, HackerRank)","Arrays & String Manipulation","Basic Recursion & Pointers","Logic Puzzles under Time Constraints"] },
    { name:"Summer Training-I", topics:["4-week Foundational Industry Training"] }
  ]},
  { sem:4, year:2, subjects:[
    { name:"Digital Systems and Computer Organization & Lab", topics:["K-maps & SOP/POS","Adders, Subtractors, Mux/Demux","Encoders, Decoders & Comparators","Latches & Flip-Flops (SR/JK/T/D)","Synchronous/Asynchronous Counters","RISC vs CISC & Addressing Modes","Instruction Cycle & ALU Design","Cache Mapping & Virtual Memory","Programmed, Interrupt-driven I/O & DMA"] },
    { name:"Design and Analysis of Algorithms & Lab", topics:["Big-O, Omega, Theta & Recurrences","Divide & Conquer (Binary Search, Merge/Quick Sort, Strassen's)","Backtracking (N-Queens, Rat in Maze, Hamiltonian, TSP)","Greedy (Prim's/Kruskal's, Knapsack, Huffman)","Dynamic Programming (0/1 Knapsack, MCM, LCS)","String Matching (Rabin-Karp, KMP)","P vs NP, NP-Complete & NP-Hard"] },
    { name:"Artificial Intelligence and Machine Learning & Lab", topics:["Agents, PEAS & State-Space Search","Uninformed & Heuristic Search (BFS, DFS, A*, AO*)","Supervised/Unsupervised/Reinforcement Learning","Linear & Logistic Regression","ANN (Perceptron, Backpropagation)","k-NN, SVM Kernels, Decision Trees, Random Forests","PCA & Dimensionality Reduction","CNN Architectures (LeNet, AlexNet, VGG, ResNet)"] },
    { name:"Software Engineering", topics:["SDLC Methodologies","Requirements Engineering","Testing Architectures","Lifecycle Management"] },
    { name:"Competitive Programming-II", topics:["Intermediate Algorithmic Implementations","Data Structure Mapping","Competitive Constraint Management"] },
    { name:"Discipline Elective-1 & Lab", topics:["Data Analytics (R/Python)","Mobile App Development","Smart Systems & IoT","Compiler Design Intro","Data Engineering","Data Science Foundations","Artificial & Computational Intelligence"] },
    { name:"Environmental Studies", topics:["Ecosystem Dynamics","Sustainability","Resource Management"] }
  ]},
  { sem:5, year:3, subjects:[
    { name:"Operating Systems & Lab", topics:["Process Scheduling","Thread Safety & Synchronization","Memory Management & Paging","Virtual Memory","Disk Scheduling","File Allocation Methods"] },
    { name:"Computer Networks & Lab", topics:["OSI & TCP/IP Architectures","Routing & Switching","Error Correction","Transport Protocols","Socket Programming"] },
    { name:"Full Stack Development Lab", topics:["Modern Web Framework Setups","Front-end Styling","State Management","API Configuration","Back-end Database Orchestration"] },
    { name:"Discipline Elective-2 & Lab", topics:["Soft Computing","Computer & Cyber Security","Data Mining & Warehousing","Agile Software Processes","IoT Analytics","Big Data Analytics","Search in AI","Intelligent Robotics"] },
    { name:"Discipline Elective-3 & Lab", topics:["Image Processing & Computer Vision","Blockchain Technology","Computing for Data Science","Android Programming","Graph Theory","Computational Data Analysis","Embedded Software Development"] },
    { name:"Science Elective", topics:["Natural/Physical Sciences integrated with Computing"] },
    { name:"Indian Constitution & Traditional Knowledge", topics:["Civil Structure & Legal Fundamentals","Traditional Knowledge Roots"] },
    { name:"Summer Training-II", topics:["6-week Industry/Research Training"] },
    { name:"Competitive Programming-III", topics:["Advanced Optimizations","Advanced Trees & Graphs","Dynamic Programming Problem Tracking","Contest Strategies"] },
    { name:"Logical and Quantitative Techniques-I", topics:["Analytical Thinking","Data Interpretation","Quantitative Aptitude"] }
  ]},
  { sem:6, year:3, subjects:[
    { name:"Web Technology & Lab", topics:["Web Architectures","Server-side Frameworks","Web Security Primitives","Dynamic Content Serving"] },
    { name:"Advanced Data Structures and Algorithms & Lab", topics:["Network Optimization Schemes","Advanced Hashing","Non-linear Geometric Spaces","Approximation Methodologies"] },
    { name:"Flexi Core Option", topics:["Distributed and Cloud Computing OR Information Security and Cryptography"] },
    { name:"Discipline Elective-4", topics:["Deep Learning","Cryptocurrency Technologies","Information Retrieval & Semantic Web","Cloud Essentials (Azure/AWS)","Reinforcement Learning","Responsible AI & Ethics"] },
    { name:"Discipline Elective-5", topics:["Machine Learning & Big Data","Secure Software System Design","Fog/Edge Computing","Statistical Analysis","Time Series Analysis","Edge/Federated Learning","Retrieval-Augmented Generation (RAG)"] },
    { name:"Open Elective-1", topics:["Cyber Security & Digital Safety OR Business Intelligence & Analytics"] },
    { name:"Selected Value-Added Course", topics:["Practical Field Training / Modern Technology Stack (Audit)"] },
    { name:"Soft Skills for Employability", topics:["Interview Strategies","Workplace Dynamics","Resume Drafting","Industry Preparation"] },
    { name:"Minor Project", topics:["Independent Project applying CS Principles"] },
    { name:"Logical and Quantitative Techniques-II", topics:["Advanced Reasoning","Algorithmic Logic Puzzles","Quantitative Aptitude Modules"] }
  ]},
  { sem:7, year:4, subjects:[
    { name:"Discipline Elective-6", topics:["ML and Natural Language Processing","Ethical Hacking & Prevention","Large Scale Database Systems","DevOps","Industrial Automation & IoT","Explainable AI","Probabilistic Graphical Models","AI for IoT","Sentiment Analysis & Opinion Mining"] },
    { name:"Open Elective-2", topics:["UI/UX Design OR Software Testing Methodologies"] },
    { name:"Major Project Part-1", topics:["Formulation & Research Review","Architecture Mapping","Preliminary Prototyping"] },
    { name:"Summer Training-III", topics:["6-week Advanced Industrial Internship"] }
  ]},
  { sem:8, year:4, subjects:[
    { name:"Discipline Elective-7", topics:["AI for Healthcare & Smart Systems","Digital Forensics & Cyber Laws","Social Network Analysis","Kubernetes & Microservices","AI for Finance","Agentic AI"] },
    { name:"Open Elective-3", topics:["Social Media Analytics OR Digital Twin Concepts & Applications"] },
    { name:"Major Project Part-2", topics:["Final Implementation & Optimization","Full Testing & Structural Verification","Thesis Compilation & Formal Defence"] }
  ]}
];

/* ============================================================
   COLLEGE REGISTRY — structured institution metadata.
   Institution identity (name/branch/degree/university) is kept
   separate from the syllabus itself and from any combined display
   string, so new colleges/branches can be added without touching
   syllabus data or UI code, and so professional surfaces (resume,
   education line) can render a proper "College — Degree, Branch"
   string instead of a single hand-rolled label.

   TO ADD A NEW INSTITUTION:
   1. Create a new syllabus constant: an array of
      { sem, year, subjects:[{ name, topics:[...] }, ...] } — see
      SYLLABUS_HITK / SYLLABUS_JUIT above for the exact shape.
   2. Register one metadata object below, keyed by a short id:
        newkey: { id:"newkey", collegeName:"...", shortName:"...",
                  branch:"...", degree:"...", university:"...",
                  syllabus: SYLLABUS_NEWKEY }
   That's it. Every picker, resume export, and settings panel reads
   this registry directly, and validateSyllabus() below checks the
   shape at boot so a typo fails loudly instead of breaking silently.
   No other file or function needs to change.
   ============================================================ */
export const COLLEGES = {
  hitk: {
    id: "hitk",
    collegeName: "Heritage Institute of Technology, Kolkata",
    shortName: "HITK",
    branch: "Information Technology",
    degree: "B.Tech",
    university: "MAKAUT",
    syllabus: SYLLABUS_HITK
  },
  juit: {
    id: "juit",
    collegeName: "Jaypee University of Information Technology, Solan",
    shortName: "JUIT",
    branch: "Computer Science & Engineering",
    degree: "B.Tech",
    university: "JUIT (Autonomous)",
    syllabus: SYLLABUS_JUIT
  }
};

// Compact chip/dropdown label, e.g. "HITK · IT". Multi-word branch names are
// abbreviated to initials; single-word branches (already short, e.g. "CSE")
// pass through as-is — keeps auto-generated labels sensible for any future
// college without needing a per-college override.
export function collegeShortLabel(college){
  if(!college) return "";
  const words = (college.branch || "").trim().split(/\s+/).filter(Boolean);
  const branchAbbrev = words.length > 1 ? words.map(w=>w[0]).join("").toUpperCase() : (words[0] || "");
  return branchAbbrev ? `${college.shortName} ${branchAbbrev}` : college.shortName;
}
// Full professional label for resume/education contexts, e.g.
// "Heritage Institute of Technology, Kolkata — B.Tech, Information Technology"
export function collegeFullLabel(college){
  if(!college) return "";
  const degreeBranch = [college.degree, college.branch].filter(Boolean).join(", ");
  return [college.collegeName, degreeBranch].filter(Boolean).join(" — ");
}

// Fails loudly (console) rather than letting a malformed syllabus break
// rendering silently somewhere downstream — makes onboarding a 20th
// college low-risk instead of something that needs careful manual QA.
function validateSyllabus(collegeId, syllabus){
  const problems = [];
  if(!Array.isArray(syllabus) || !syllabus.length){ problems.push("syllabus must be a non-empty array"); return problems; }
  syllabus.forEach((entry, i)=>{
    if(typeof entry.sem !== "number") problems.push(`entry ${i}: missing numeric "sem"`);
    if(typeof entry.year !== "number") problems.push(`entry ${i}: missing numeric "year"`);
    if(!Array.isArray(entry.subjects) || !entry.subjects.length) problems.push(`entry ${i} (sem ${entry.sem}): "subjects" must be a non-empty array`);
    else entry.subjects.forEach((subj, j)=>{
      if(!subj.name) problems.push(`entry ${i} (sem ${entry.sem}), subject ${j}: missing "name"`);
      if(subj.topics && !Array.isArray(subj.topics)) problems.push(`entry ${i} (sem ${entry.sem}), subject "${subj.name}": "topics" must be an array`);
    });
  });
  if(problems.length) console.warn(`[Trajectory] Syllabus validation issues for "${collegeId}":`, problems);
  return problems;
}
Object.keys(COLLEGES).forEach(id => validateSyllabus(id, COLLEGES[id].syllabus));

// Default is simply "whichever college is registered first" — adding a
// college never requires touching this or any hardcoded id elsewhere.
export const DEFAULT_COLLEGE_ID = Object.keys(COLLEGES)[0];

// `let` + `export`: ES modules give consumers a *live binding*, so
// `import { SYLLABUS } from "../data.js"` in academics.js et al. always
// sees the current value after setActiveCollege() reassigns it below —
// no window global or re-export step needed (same pattern tracking.js
// uses for its own mutable WEEKS/MONTHS exports).
export let SYLLABUS = COLLEGES[DEFAULT_COLLEGE_ID].syllabus;

export function setActiveCollege(key){
  const college = COLLEGES[key] || COLLEGES[DEFAULT_COLLEGE_ID];
  SYLLABUS = college.syllabus;
  return college;
}

export const REVISION_CYCLE = [
  "Skim through all lecture notes for this subject",
  "Rework 2 previous years' question papers",
  "Summarize weak topics on one page",
  "Solve numericals / derivations from memory",
  "Group study or teach-back session",
  "Timed mock test under exam conditions",
  "Final formula sheet & quick revision pass"
];


