

window.DEFAULT_DB = {
  profile: { name: "", startDate: "", createdAt: "", track: null },
  settings: { theme: "lavender", college: "hitk" },
  schedule: { currentIndex: 0, offsetDays: 0, weekStatus: {}, weekTaskDone: {} },
  academics: { subjects: [] },
  projects: { shipped: {}, started: {}, meta: {}, custom: [], submissions: [] },
  progress: { dsaSolved: 0 },
  prep: { done: {} },
  timeSync: { offsetMs: 0, lastSynced: null, verified: false },
  tracking: { dailyLogs: {}, historicalPerformance: [] },
  github: { username: "", profile: null, repos: [], events: [], lastSyncedAt: null, verifiedIdentity: false },
  leetcode: { username: "", profile: null, lastSyncedAt: null },
  resume: { email: "", phone: "", location: "", linkedin: "", portfolio: "", targetRole: "", summary: "" }
};

const CURRICULUM = {
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
      milestones: [["CGPA","8.5 – 9.5+"],["DSA problems","150–200 solved"],["Projects shipped","6–8 deployed"],["GitHub commits","300+"],["Portfolio","Live website"],["Blog posts","3–5 published"]]
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


const TRACKS = {
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









const QUIZ = [
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


const WEEK_BLUEPRINTS = [
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 1", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn Python variables, data types and operators", "Solve 5 DSA problems on arrays/strings"] },
    academic: { title: "Academic focus", tasks: ["Understand binary, decimal and hexadecimal conversions by hand", "Solve 10 base-conversion practice problems"] },
    project: { title: "Project push", tasks: ["Design the calculator's menu and core arithmetic functions (add/sub/mul/div)", "Implement input validation for divide-by-zero and bad input"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 1", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn loops, conditionals and functions in Python", "Solve 5 DSA problems on loops/conditionals"] },
    academic: { title: "Academic focus", tasks: ["Learn how memory and the CPU execute a program (fetch-decode-execute)", "Diagram the fetch-decode-execute cycle from memory"] },
    project: { title: "Project push", tasks: ["Add memory functions (M+, M-, MR, MC) with persistent state", "Write unit tests for arithmetic and memory operations"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 1", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn lists, dicts, tuples and file I/O in Python", "Solve 5 DSA problems using lists/dicts"] },
    academic: { title: "Academic focus", tasks: ["Read what AI, ML and DL are and how they differ", "Write a 1-paragraph explanation of ML vs DL in your own words"] },
    project: { title: "Project push", tasks: ["Add scientific functions: sqrt, power, percentage, factorial", "Handle edge cases: negative sqrt, overflow, invalid factorial input"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 1", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Set up VS Code, Git, GitHub and WSL/Ubuntu end to end", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn conceptually how an LLM turns text into tokens and predictions", "Explain to someone else, in plain language, what an LLM does"] },
    project: { title: "Project push", tasks: ["Polish the CLI UX (clear prompts, error messages, history log)", "Push the finished calculator to GitHub with a README and usage examples"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 2", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn Python OOP — classes, objects, `self`, constructors", "Solve 5 DSA problems, OOP-flavored where possible"] },
    academic: { title: "Academic focus", tasks: ["Learn Git branching and how to create/merge a branch locally", "Practice 3 merges with intentional (small) conflicts to resolve"] },
    project: { title: "Project push", tasks: ["Wireframe the portfolio (hero, about, projects, contact) on paper or Figma", "Build the HTML skeleton for all four sections"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 2", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn Python exceptions (try/except/finally) and virtual environments", "Solve 5 DSA problems on exception-safe logic"] },
    academic: { title: "Academic focus", tasks: ["Learn pull requests — open, review and merge a PR on a test repo", "Write a checklist of what makes a good PR description"] },
    project: { title: "Project push", tasks: ["Style the layout with CSS — typography, spacing, color palette", "Make the nav bar sticky and add smooth-scroll to sections"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 2", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn HTML5 semantic structure — sections, headers, nav, forms", "Solve 5 DSA problems on strings"] },
    academic: { title: "Academic focus", tasks: ["Refactor your calculator project into a proper class-based structure", "Add exception handling to at least 3 methods that lacked it"] },
    project: { title: "Project push", tasks: ["Add your calculator project as a showcased project card with a link", "Make the layout responsive across mobile, tablet and desktop widths"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 2", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn CSS3 — box model, selectors, positioning, basic responsiveness", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Set up a Python virtual environment for a new project from scratch", "Document the venv setup steps in a personal notes file"] },
    project: { title: "Project push", tasks: ["Deploy the site to GitHub Pages", "Share the live link and fix any deployment issues that show up"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 3", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn C++ basics — syntax, variables, control flow", "Solve 5 DSA problems in C++"] },
    academic: { title: "Academic focus", tasks: ["Learn what a process is and how the OS schedules it", "Diagram process states (new/ready/running/waiting/terminated)"] },
    project: { title: "Project push", tasks: ["Design the expense record schema (date, category, amount, note)", "Implement add-expense and list-expenses using local file storage"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 3", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn pointers (intro) and references in C++", "Solve 5 DSA problems using pointers/references"] },
    academic: { title: "Academic focus", tasks: ["Learn the difference between a process and a thread", "Write 3 real-world examples of multithreaded programs you use"] },
    project: { title: "Project push", tasks: ["Implement edit and delete for existing expense entries", "Add input validation for dates and amounts"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 3", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn the STL vector and pair, and basic iterators", "Solve 5 DSA problems using vector/pair"] },
    academic: { title: "Academic focus", tasks: ["Read about neural networks conceptually — neurons, weights, layers", "Sketch a 3-layer neural network diagram by hand"] },
    project: { title: "Project push", tasks: ["Add category-wise and monthly summary reports", "Add a simple text-based chart (bar-of-asterisks) for spending by category"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 3", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn Flexbox and CSS Grid for layout", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read about transformers conceptually — attention, context window", "Write a 3-sentence explanation of 'attention' in your own words"] },
    project: { title: "Project push", tasks: ["Refactor the codebase into functions/modules cleanly", "Push to GitHub with a README explaining the storage format"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 4", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn JavaScript variables, functions and the DOM", "Solve 5 DSA problems in JavaScript"] },
    academic: { title: "Academic focus", tasks: ["Learn Linux shell scripting basics — variables, if, loops in bash", "Write a bash script that renames files in a folder by pattern"] },
    project: { title: "Project push", tasks: ["Sign up for a weather API key and test a basic fetch call", "Build the HTML/CSS shell for the search input and result card"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 4", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn JS events (click, input, submit) and event listeners", "Solve 5 DSA problems on event-driven logic patterns"] },
    academic: { title: "Academic focus", tasks: ["Learn shell scripting — piping, redirection, grep/awk basics", "Write a script that searches log files for a keyword and counts matches"] },
    project: { title: "Project push", tasks: ["Wire up the search input to fetch live weather by city name", "Handle loading and error states (city not found, network failure)"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 4", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn the fetch API and working with async/await + JSON", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Practice SQL joins conceptually (even before Month 8's deep dive)", "Write 3 SQL SELECT queries against a sample dataset"] },
    project: { title: "Project push", tasks: ["Display temperature, condition, humidity and wind with icons", "Add a 5-day forecast section using the API's forecast endpoint"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 4", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn SQL basics — SELECT, INSERT, UPDATE, DELETE", "Solve 5 SQL practice queries on a sample database"] },
    academic: { title: "Academic focus", tasks: ["Review the month — JS, fetch API, SQL, shell scripting", "Write a one-page personal cheat sheet covering all four topics"] },
    project: { title: "Project push", tasks: ["Add unit toggling (Celsius/Fahrenheit) and polish the UI", "Deploy the app and add it to your portfolio site"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 5", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Revise Python fundamentals — write 3 small scripts from scratch, no notes", "Solve 8 DSA problems, mixed review of the semester"] },
    academic: { title: "Academic focus", tasks: ["Update your GitHub profile README with a summary of Month 1-4 projects", "Pin your 4 best repos on your GitHub profile"] },
    project: { title: "Project push", tasks: ["Design the SQL schema for students, subjects and results", "Set up the database and write the CREATE TABLE statements"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 5", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Revise Git/GitHub workflow — branch, commit, PR, merge on a scratch repo", "Solve 8 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Outline a blog post about one thing you learned this semester", "Write the first full draft of the blog post"] },
    project: { title: "Project push", tasks: ["Implement adding a student and entering their subject-wise marks", "Implement querying a student's full result with computed percentage"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 5", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Revise HTML/CSS/JS by rebuilding one small page from memory", "Solve 8 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Edit and publish your first technical blog post", "Share the post link on your resume/profile notes"] },
    project: { title: "Project push", tasks: ["Implement class-wide reports (topper, average, pass/fail counts)", "Add input validation and handle duplicate student entries"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 5", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Revise Linux/bash basics — file system navigation and permissions", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Do a full semester retro — what's solid, what's shaky, what to fix next", "Write down 3 concrete goals for Month 6 onward"] },
    project: { title: "Project push", tasks: ["Clean up the SQL queries and add comments explaining each one", "Push to GitHub with sample data and a README"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 6 (Winter Break)", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn what React is conceptually and set up your first React project", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read how a React component tree renders to the DOM", "Draw the component tree for the Spaced-Repetition Lecture Notes App you're about to build"] },
    project: { title: "Project push", tasks: ["Scaffold the React app and build the static layout for note cards", "Set up local state to hold an array of notes"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 6 (Winter Break)", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn npm — package.json, installing/removing packages, scripts", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn the difference between props and local component data", "Write a short note contrasting props with plain JS variables"] },
    project: { title: "Project push", tasks: ["Implement creating a new note via a form", "Implement deleting a note from the list"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 6 (Winter Break)", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn REST API conventions and JSON structure", "Solve 5 DSA problems on JSON-shaped data"] },
    academic: { title: "Academic focus", tasks: ["Learn common HTTP status codes (200, 201, 400, 404, 500) and when each applies", "Match 10 real API error scenarios to the correct status code"] },
    project: { title: "Project push", tasks: ["Implement editing an existing note in place", "Persist notes so they survive a page refresh (in-memory app state or simple storage)"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 6 (Winter Break)", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn HTTP fundamentals — methods, status codes, headers", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review the whole break module — React, npm, REST, HTTP", "Write a one-page cheat sheet for the four topics"] },
    project: { title: "Project push", tasks: ["Polish styling and empty/loading states", "Deploy the Spaced-Repetition Lecture Notes App and link it from your portfolio"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 7", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn advanced Python OOP — inheritance, polymorphism, magic methods", "Solve 5 DSA problems using OOP structures"] },
    academic: { title: "Academic focus", tasks: ["Refactor one earlier Python project to use classes and inheritance", "Write a short note on when inheritance helps vs over-complicates"] },
    project: { title: "Project push", tasks: ["Design the task data shape (id, text, done, priority) and component layout", "Build the TaskList and TaskItem components with props"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 7", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn to build and use a Python package/module structure", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Package one of your Python scripts as an installable module locally", "Document the module's functions with docstrings"] },
    project: { title: "Project push", tasks: ["Implement adding a new task via a controlled form input", "Implement marking a task complete/incomplete"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 7", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Deepen React — component composition and prop drilling", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Study how React re-renders when state changes", "Write a short explanation of the React render cycle in your own words"] },
    project: { title: "Project push", tasks: ["Implement deleting a task and filtering by status (all/active/done)", "Add task counts and an empty-state message"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 7", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn React state with useState and controlled inputs", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Compare your Sleep-Cycle & Study-Habit Tracker's component structure with a reference example", "List 2 improvements you'd make to your component breakdown"] },
    project: { title: "Project push", tasks: ["Polish UI, add priority color-coding", "Deploy the Sleep-Cycle & Study-Habit Tracker and add it to your portfolio"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 8", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn FastAPI (or Node/Express) basics — routes and request handling", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn prompt engineering basics — clear instructions, examples, constraints", "Write 3 prompts for the same task, compare the outputs"] },
    project: { title: "Project push", tasks: ["Set up the FastAPI/Express project structure and a health-check route", "Connect the backend to your SQL database"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 8", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn how to connect your backend to a SQL database", "Solve 5 DSA problems on hash-based lookups"] },
    academic: { title: "Academic focus", tasks: ["Learn common LLM limitations — hallucination, context limits, bias", "Write 3 real examples where an LLM could plausibly get something wrong"] },
    project: { title: "Project push", tasks: ["Implement CRUD endpoints for notes (create, read, update, delete)", "Add request validation for note fields"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 8", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn SQL joins — inner, left, and when to use each", "Write 5 practice queries using joins"] },
    academic: { title: "Academic focus", tasks: ["Design the normalized schema for the Library Reservation & Notes API (notes, tags, users)", "Draw an ER diagram for the schema"] },
    project: { title: "Project push", tasks: ["Implement tagging notes and a join-based endpoint to filter notes by tag", "Add pagination to the list-notes endpoint"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 8", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn indexing and basic normalization (1NF, 2NF, 3NF)", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review joins, indexing and normalization together", "Rewrite one earlier unindexed query to use an index and explain why it helps"] },
    project: { title: "Project push", tasks: ["Write API docs (route list, params, example responses)", "Push to GitHub and test all endpoints with a REST client"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 9", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn how JWTs are structured and how they're signed/verified", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Compare JWT-based auth vs session-based auth for a given app", "Write a short note on which you'd choose for the Library Reservation & Notes API and why"] },
    project: { title: "Project push", tasks: ["Build the signup endpoint with password hashing", "Build the login endpoint that issues a JWT on success"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 9", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn cookies vs sessions and where each is stored/used", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn how HTTPS protects credentials in transit", "Write a 3-sentence explanation of why auth over HTTP is unsafe"] },
    project: { title: "Project push", tasks: ["Add middleware to protect routes using the JWT", "Add token expiry and a refresh-token flow"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 9", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn password hashing (bcrypt/argon2) and why plaintext storage is unsafe", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Study a real signup/login flow from a well-known app (conceptually)", "List the steps their flow takes from signup to first authenticated request"] },
    project: { title: "Project push", tasks: ["Add basic session handling and logout", "Write tests for signup, login, and access to protected routes"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 9", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn deployment basics — environment variables, build steps, hosting", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review JWT, sessions, hashing and deployment together", "Write a one-page cheat sheet for the auth stack"] },
    project: { title: "Project push", tasks: ["Deploy the auth system to Render or Vercel", "Set up environment variables securely and confirm the deployed version works end to end"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 10", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn DNS — how a domain name resolves to an IP", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Trace a request from typing a URL to receiving a response (DNS, TCP, HTTP)", "Diagram the full request lifecycle from browser to server"] },
    project: { title: "Project push", tasks: ["Design the chat data model (messages, rooms, timestamps, sender)", "Build the basic UI — message list and input box"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 10", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn HTTP vs HTTPS in more depth (handshake, certificates)", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Compare HTTP polling vs WebSockets for real-time communication", "Write a short note on the tradeoffs for your Chat App's use case"] },
    project: { title: "Project push", tasks: ["Implement sending a message and appending it to the message list", "Implement polling (or a basic socket connection) to fetch new messages"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 10", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn embeddings conceptually — turning text into vectors", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read a short explainer on how embeddings power semantic search", "Write 2 example use cases where embeddings would help a normal app"] },
    project: { title: "Project push", tasks: ["Add multiple chat rooms/channels", "Add usernames and message timestamps to the UI"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 10", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn vector databases conceptually — similarity search basics", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review networking + embeddings/vector DB concepts together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Polish the chat UI (auto-scroll, read state, empty state)", "Deploy the chat app and link it from your portfolio"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 11", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn Docker basics — what a container and image actually are", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Compare running an app locally vs inside a container — what changes", "Write a short note on 2 problems Docker solves that you've personally hit"] },
    project: { title: "Project push", tasks: ["Write a Dockerfile for the Appliance Load & Electricity Bill Tracker and get it running in a container", "Write a Dockerfile for the Local Market Price & Weather Advisory App and get it running in a container"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 11", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn to write a Dockerfile for a Python or Node app", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read about image layers and why smaller images build/deploy faster", "Check the image size of one of your Dockerfiles and try to shrink it"] },
    project: { title: "Project push", tasks: ["Write a Dockerfile for the Library Reservation & Notes API, mounting a volume for persistent data", "Confirm the Library Reservation & Notes API container survives a restart with data intact"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 11", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn Docker volumes and why they matter for persistent data", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn `.dockerignore` and why it matters for build speed", "Add a `.dockerignore` file to one of your projects"] },
    project: { title: "Project push", tasks: ["Write a Dockerfile for the Hostel Room & Mess-Card Auth System with environment variables passed in", "Test the containerized auth system end to end"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 11", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn basic Docker Compose to run multiple containers together", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review Docker concepts as a whole", "Write a one-page Docker cheat sheet (build, run, exec, logs, volumes)"] },
    project: { title: "Project push", tasks: ["Write a docker-compose.yml that runs at least 2 of these projects together", "Push all Dockerfiles to their respective GitHub repos with usage instructions"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 12 (Summer Break)", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Full review — rebuild one Python script and one React component from memory, no notes", "Solve 8 DSA problems on arrays and strings"] },
    academic: { title: "Academic focus", tasks: ["Review the entire year's focus topics in one sitting — Python, Git, HTML/CSS/JS, SQL", "Write a consolidated one-page cheat sheet covering the whole year"] },
    project: { title: "Project push", tasks: ["Design the dashboard layout that will surface data from your year's projects (GitHub stats, DSA count, project links)", "Build the dashboard shell in React with placeholder sections"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 12 (Summer Break)", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Full review — redo a Git branch/merge/PR cycle and a SQL query set from memory", "Solve 8 DSA problems on hashing and two pointers"] },
    academic: { title: "Academic focus", tasks: ["Review Linux/bash, React, REST APIs and auth concepts together", "Add these topics to the same consolidated cheat sheet"] },
    project: { title: "Project push", tasks: ["Wire up the GitHub stats section (repo count, recent commits) via the GitHub API", "Wire up a DSA progress section showing problems solved this year"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 12 (Summer Break)", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["DSA intensive — study linked lists and stacks/queues", "Solve 8 DSA problems on linked lists and stacks/queues"] },
    academic: { title: "Academic focus", tasks: ["Review networking, Docker and embeddings/vector DB concepts", "Finish the consolidated cheat sheet — one document covering the full year"] },
    project: { title: "Project push", tasks: ["Add a projects showcase section linking to all shipped Year 1 projects", "Add a simple notes/journal section for ongoing reflections"] }
  },
  {
    yearId: 1, yearLabel: "Year 1", monthName: "Month 12 (Summer Break)", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["DSA intensive — study binary trees and basic traversals", "Solve 6 DSA problems on trees, push toward 150-200 total for the year"] },
    academic: { title: "Academic focus", tasks: ["Do a full year retro — strongest area, weakest area, what surprised you", "Write 3 specific goals for Year 2 based on this retro"] },
    project: { title: "Project push", tasks: ["Polish the dashboard styling and make it responsive", "Deploy the dashboard as the new centerpiece of your portfolio"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 1", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn C++ classes and objects — members, constructors, destructors", "Solve 6 DSA problems on arrays with binary search"] },
    academic: { title: "Academic focus", tasks: ["Set up a FastAPI or Express project skeleton alongside your C++ work", "Build a single working GET endpoint as a sanity check"] },
    project: { title: "Project push", tasks: ["Design the Student class (name, roll no, marks, attendance) with constructors", "Implement adding and listing students via the CLI"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 1", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn C++ inheritance and polymorphism (virtual functions)", "Solve 6 DSA problems on binary search variants"] },
    academic: { title: "Academic focus", tasks: ["Learn route parameters and query parameters in your chosen backend framework", "Build 2 endpoints that accept path and query params"] },
    project: { title: "Project push", tasks: ["Implement inheritance — create a GraduateStudent subclass with extra fields", "Implement polymorphic display logic for base vs derived student types"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 1", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn the two-pointer technique and where it applies", "Solve 6 DSA problems using two pointers"] },
    academic: { title: "Academic focus", tasks: ["Learn request body parsing and response formatting (JSON)", "Build a POST endpoint that accepts and returns JSON"] },
    project: { title: "Project push", tasks: ["Implement search and sort of students by roll number or marks", "Add basic file persistence so student records survive a restart"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 1", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn prefix sums and difference arrays", "Solve 6 DSA problems using prefix sums"] },
    academic: { title: "Academic focus", tasks: ["Review C++ OOP and backend routing together", "Write a short note comparing OOP structure in C++ vs the backend framework"] },
    project: { title: "Project push", tasks: ["Add input validation and error handling throughout", "Push to GitHub with a README explaining the OOP design decisions"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 2", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn linked lists — singly and doubly linked, insert/delete", "Solve 6 DSA problems on linked lists"] },
    academic: { title: "Academic focus", tasks: ["Learn REST API conventions in depth — resource naming, verbs, status codes", "Audit one of your earlier APIs against REST conventions and note violations"] },
    project: { title: "Project push", tasks: ["Design the schema — books, members, loans — with foreign keys", "Set up PostgreSQL and create the tables with proper relations"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 2", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn stacks and their applications (matching brackets, undo)", "Solve 6 DSA problems on stacks"] },
    academic: { title: "Academic focus", tasks: ["Learn CRUD design patterns and idempotency", "Write a short note on which of your endpoints are/aren't idempotent"] },
    project: { title: "Project push", tasks: ["Implement CRUD endpoints for books and members", "Implement a checkout-book endpoint that creates a loan record"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 2", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn queues and deques and their applications", "Solve 6 DSA problems on queues/deques"] },
    academic: { title: "Academic focus", tasks: ["Learn to use Postman (or similar) for structured API testing", "Build a Postman collection testing all planned Library API endpoints"] },
    project: { title: "Project push", tasks: ["Implement a return-book endpoint that closes the loan and updates availability", "Add a join-based endpoint listing a member's current loans"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 2", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn PostgreSQL keys and relations (primary, foreign, one-to-many)", "Write 5 practice queries joining related tables"] },
    academic: { title: "Academic focus", tasks: ["Review linked lists/stacks/queues and PostgreSQL relations together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Add validation (can't checkout an already-borrowed book) and error responses", "Push to GitHub with a Postman collection and README"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 3", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn SOLID principles — Single Responsibility and Open/Closed", "Solve 6 DSA problems on hash maps"] },
    academic: { title: "Academic focus", tasks: ["Refactor your Library API's book-search logic to follow Single Responsibility", "Write a short note on what changed and why it's cleaner"] },
    project: { title: "Project push", tasks: ["Design the expense schema with categories, users and auth in mind", "Implement user signup/login with JWT auth reused from Month 9 last year"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 3", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn SOLID principles — Liskov, Interface Segregation, Dependency Inversion", "Solve 6 DSA problems on sets"] },
    academic: { title: "Academic focus", tasks: ["Apply the Factory pattern to how you create expense category objects", "Write a short note on when Factory is worth the extra indirection"] },
    project: { title: "Project push", tasks: ["Implement CRUD endpoints for expenses, scoped to the authenticated user", "Apply the Strategy pattern to support multiple report formats (summary vs detailed)"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 3", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn the Singleton and Factory design patterns with real examples", "Solve 6 DSA problems on priority queues/heaps"] },
    academic: { title: "Academic focus", tasks: ["Practice resolving a real Git merge conflict end to end on a scratch repo", "Document your conflict-resolution steps for future reference"] },
    project: { title: "Project push", tasks: ["Implement category-wise and date-range filtering endpoints", "Add validation and proper error handling using consistent response shapes"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 3", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn the Strategy pattern and professional Git (rebase, cherry-pick)", "Solve 6 DSA problems, mixed review; practice a rebase and a cherry-pick"] },
    academic: { title: "Academic focus", tasks: ["Review SOLID and design patterns as a whole", "Write a one-page cheat sheet mapping each principle/pattern to a concrete example from your own code"] },
    project: { title: "Project push", tasks: ["Clean commit history using rebase/cherry-pick on a feature branch", "Push to GitHub with a README documenting the patterns used and why"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 4", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn CPU registers and their role in instruction execution", "Solve 8 DSA problems on binary trees"] },
    academic: { title: "Academic focus", tasks: ["Diagram how cache hierarchy (L1/L2/L3) speeds up memory access", "Relate cache locality to why indexing speeds up SQL queries"] },
    project: { title: "Project push", tasks: ["Design the task schema (title, status, priority, due date, assignee)", "Build CRUD endpoints for tasks with a Postgres backend"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 4", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn cache and virtual memory concepts", "Solve 8 DSA problems on BST operations"] },
    academic: { title: "Academic focus", tasks: ["Study how virtual memory lets programs use more memory than physically exists", "Write a short note connecting virtual memory to paging"] },
    project: { title: "Project push", tasks: ["Implement status transitions (todo → in-progress → done) with validation", "Implement filtering tasks by status, priority and due date"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 4", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn the instruction cycle (fetch-decode-execute-store) in depth", "Solve 8 DSA problems on tree traversals (inorder/preorder/postorder)"] },
    academic: { title: "Academic focus", tasks: ["Trace through the instruction cycle for a simple arithmetic operation", "Diagram the cycle step by step for `a = b + c`"] },
    project: { title: "Project push", tasks: ["Set up a Render/Railway deployment pipeline for the API", "Deploy the API and confirm all endpoints work against the live database"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 4", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn cloud deployment basics on Render or Railway", "Solve 6 DSA problems, mixed tree review"] },
    academic: { title: "Academic focus", tasks: ["Review computer organization concepts as a whole", "Write a one-page cheat sheet covering registers, cache, virtual memory and instruction cycle"] },
    project: { title: "Project push", tasks: ["Add basic rate limiting or request logging", "Push to GitHub with deployment instructions in the README"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 5", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Revise OOP — rebuild the Roommate Allocation Engine's class hierarchy from memory", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Design the combined architecture — React frontend, FastAPI backend, Postgres DB", "Sketch the full request flow from UI click to DB write and back"] },
    project: { title: "Project push", tasks: ["Build the React UI for task boards (columns for todo/in-progress/done)", "Connect the UI to the backend's task CRUD endpoints"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 5", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Revise DSA — redo 3 problems each from linked lists, trees and hashing without notes", "Solve 8 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Set up the React frontend project and the FastAPI backend project side by side", "Confirm CORS is configured and the frontend can call the backend"] },
    project: { title: "Project push", tasks: ["Implement drag-and-drop or click-to-move status transitions in the UI", "Wire up filtering and sorting in the frontend"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 5", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Revise SQL — rewrite 3 join queries and 2 aggregate queries from memory", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Wire up JWT auth end to end between frontend and backend", "Test the full login → protected request → logout flow manually"] },
    project: { title: "Project push", tasks: ["Add user auth to the frontend (login form, protected routes)", "Deploy the frontend and backend together (e.g. Vercel + Render)"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 5", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Revise Computer Organization — explain cache and virtual memory out loud to check gaps", "Solve 4 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Do a mid-year retro — compare Year 2 skills against Year 1", "Write 3 goals for the second half of Year 2"] },
    project: { title: "Project push", tasks: ["Polish the UI and fix any bugs found during end-to-end testing", "Write a full README and add this capstone to your portfolio"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 6 (Winter Break)", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn OAuth 2.0 basics — authorization code flow conceptually", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Compare building your own JWT auth vs using an OAuth provider", "Write a short note on tradeoffs for a solo-developer project"] },
    project: { title: "Project push", tasks: ["Design the auth service as a standalone microservice (separate from other APIs)", "Implement signup/login endpoints with bcrypt/argon2 hashing"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 6 (Winter Break)", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn password hashing algorithms in depth — bcrypt vs argon2 tradeoffs", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read about common auth vulnerabilities (token theft, replay attacks)", "List 3 mitigations for the vulnerabilities you read about"] },
    project: { title: "Project push", tasks: ["Implement JWT issuing with refresh tokens", "Add a basic OAuth-style social login stub (even if mocked)"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 6 (Winter Break)", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn Docker images vs containers in more depth", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn Docker networking — how containers talk to each other", "Diagram how your auth service container would talk to a DB container"] },
    project: { title: "Project push", tasks: ["Write a Dockerfile for the auth service", "Write a docker-compose.yml running the service with its own DB container"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 6 (Winter Break)", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn Docker Compose — services, networks, environment files", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review OAuth, hashing and Docker Compose together", "Write a one-page cheat sheet for the module"] },
    project: { title: "Project push", tasks: ["Test the full containerized flow — signup, login, refresh, protected route", "Push to GitHub with setup instructions for running it via Docker Compose"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 7", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn Divide & Conquer algorithm design (merge sort, quick sort)", "Solve 6 DSA problems using divide & conquer"] },
    academic: { title: "Academic focus", tasks: ["Trace through merge sort by hand on a small array, step by step", "Trace through quick sort by hand on the same array and compare"] },
    project: { title: "Project push", tasks: ["Build the UI shell — array bars and a control panel (play/pause/speed)", "Implement bubble sort and insertion sort animations"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 7", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn Greedy algorithm design and when greedy choices work", "Solve 6 DSA problems using greedy strategies"] },
    academic: { title: "Academic focus", tasks: ["Read a short explainer on linear regression with a worked example", "Solve one linear regression example by hand (small dataset)"] },
    project: { title: "Project push", tasks: ["Implement merge sort animation, visualizing the divide and merge steps", "Implement quick sort animation, visualizing the partition step"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 7", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn supervised vs unsupervised vs reinforcement learning conceptually", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read a short explainer on classification with a worked example (e.g. spam detection)", "Write 2 real examples each of classification and clustering problems"] },
    project: { title: "Project push", tasks: ["Implement a greedy algorithm visualization (e.g. activity selection)", "Add step-by-step commentary explaining what's happening at each frame"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 7", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn regression vs classification vs clustering with simple examples", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review Divide & Conquer, Greedy and ML fundamentals together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Polish the UI (speed slider, array size control, reset button)", "Deploy the visualizer and add it to your portfolio"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 8", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn intro Dynamic Programming — memoization vs tabulation", "Solve 6 DSA problems using memoization"] },
    academic: { title: "Academic focus", tasks: ["Learn database transactions — what ACID means in practice", "Write a short example of a transaction that needs atomicity"] },
    project: { title: "Project push", tasks: ["Design the schema — posts, authors, comments, tags — normalized", "Set up React Router with routes for home, post detail and author pages"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 8", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn classic DP problems (knapsack intro, Fibonacci variants)", "Solve 6 DSA problems using tabulation"] },
    academic: { title: "Academic focus", tasks: ["Learn indexing strategies and when an index helps vs hurts", "Add an index to one query in a past project and note the difference"] },
    project: { title: "Project push", tasks: ["Build the backend CRUD API for posts and comments", "Wire up the frontend to list and view posts from the API"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 8", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn React Router for multi-page navigation", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review normalization (1NF-3NF) by normalizing a messy sample schema", "Draw the before/after ER diagrams for the normalization exercise"] },
    project: { title: "Project push", tasks: ["Add a Context-based auth state so only logged-in users can comment/post", "Implement the comment submission flow end to end"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 8", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn the React Context API and custom hooks", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review DP, React Router/Context and DB concepts together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Add tag-based filtering and a simple search bar", "Deploy the full blog platform and add it to your portfolio"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 9", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn cache hierarchy in more depth — L1/L2/L3 and hit/miss rates", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Study branch prediction and pipelining conceptually", "Write a short note on why branch mispredictions slow down execution"] },
    project: { title: "Project push", tasks: ["Build a PDF upload and text-extraction pipeline", "Chunk the extracted text into passages suitable for embedding"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 9", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn paging and page tables conceptually", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read how a basic vector database performs a similarity search", "Write a 3-sentence explanation of cosine similarity in your own words"] },
    project: { title: "Project push", tasks: ["Generate embeddings for each chunk and store them in a vector index", "Implement a basic similarity search over the stored chunks"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 9", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn embeddings in more depth — how text becomes a vector", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Research an embeddings API/library and read its quickstart", "Run a minimal script that embeds 3 sentences and compares similarity"] },
    project: { title: "Project push", tasks: ["Wire up a chat interface that retrieves relevant chunks for a question", "Send retrieved chunks + question to an LLM and display the answer"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 9", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn tokenization and vector search (cosine similarity) conceptually", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review architecture + embeddings/vector search topics together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Add citations linking answers back to the source PDF section", "Deploy the assistant and add it to your portfolio"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 10", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn multi-container Docker Compose setups (app + DB + reverse proxy)", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read how a reverse proxy routes traffic to multiple backend services", "Diagram NGINX sitting in front of your blog's frontend and backend"] },
    project: { title: "Project push", tasks: ["Write Dockerfiles for the Mess-Menu Nutrition Planner Blog's frontend and backend", "Write a docker-compose.yml wiring frontend, backend and Postgres together"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 10", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn environment variable management across services", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn how secrets/env vars should be handled in CI/CD (not hardcoded)", "Audit your Mess-Menu Nutrition Planner Blog repo for any hardcoded secrets"] },
    project: { title: "Project push", tasks: ["Add NGINX as a reverse proxy in front of the frontend and backend", "Configure NGINX routing rules and test locally"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 10", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn NGINX basics — reverse proxy and static file serving", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read a sample GitHub Actions workflow that runs tests on push", "Write (but don't necessarily finalize) a workflow YAML for your repo"] },
    project: { title: "Project push", tasks: ["Move all secrets/config into environment files, out of source code", "Add a GitHub Actions workflow that builds the containers on push"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 10", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn GitHub Actions basics — workflow YAML, triggers, jobs", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review Docker Compose, NGINX and CI/CD together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Run the full stack via `docker-compose up` and verify everything works end to end", "Push to GitHub with full setup docs in the README"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 11", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn HTTP/HTTPS and DNS in more depth (building on Year 1)", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Compare WebSockets vs your Year 1 polling-based chat approach", "Write a short note on the tradeoffs and why WebSockets scale better"] },
    project: { title: "Project push", tasks: ["Set up a WebSocket server and a basic client connection", "Implement sending/receiving messages over the WebSocket in real time"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 11", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn TCP/IP basics and how WebSockets differ from plain HTTP", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read how Redis pub/sub can fan out messages to multiple chat clients", "Diagram a message flowing from sender through Redis to all subscribers"] },
    project: { title: "Project push", tasks: ["Add Redis pub/sub so messages fan out across multiple server instances", "Implement multiple chat rooms backed by Redis channels"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 11", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn Redis basics — key-value storage and pub/sub", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn about connection management — reconnects, heartbeats", "Write a short note on how you'd handle a dropped WebSocket connection"] },
    project: { title: "Project push", tasks: ["Add online/offline presence indicators using Redis", "Implement reconnect logic on the client when the connection drops"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 11", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn caching strategies (cache-aside, TTL, invalidation)", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review WebSockets, Redis and caching together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Polish the UI and test with multiple simultaneous clients", "Deploy the app and add it to your portfolio"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 12", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Capstone revision — redo one algorithm each from Divide & Conquer and DP from memory", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read a chapter of 'Clean Code' and note 3 practices to adopt", "Refactor one function in an old project using a practice from the chapter"] },
    project: { title: "Project push", tasks: ["Design the AI Study Assistant for Lab Manuals — notes storage, search, and PDF upload combined", "Build the notes CRUD backend, reusing patterns from the Library Reservation & Notes API"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 12", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Capstone revision — rebuild one React Context flow and one Docker Compose file from memory", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read a chapter of 'The Pragmatic Programmer' and note 3 takeaways", "Apply one takeaway to how you structure your capstone project"] },
    project: { title: "Project push", tasks: ["Wire up PDF upload and embedding-based search (reusing Month 9's pipeline)", "Build the search UI that returns relevant notes and PDF passages"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 12", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Find 2-3 open source issues labeled 'good first issue' in relevant repos", "Submit your first pull request to an open source project"] },
    academic: { title: "Academic focus", tasks: ["Do a full Year 2 review — Algorithms, Architecture, SQL, React, Backend, Docker", "Write a consolidated one-page cheat sheet for the whole year"] },
    project: { title: "Project push", tasks: ["Add an AI chat interface that answers questions using notes + PDFs as context", "Add citations so answers link back to the source note or PDF"] }
  },
  {
    yearId: 2, yearLabel: "Year 2", monthName: "Month 12", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Follow up on PR feedback and start reading 'Clean Code'", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Aim to get a second open source PR opened or merged", "Write a short reflection on what open source contribution taught you"] },
    project: { title: "Project push", tasks: ["Polish the full app UI and deploy it as your Year 2 capstone", "Write a full README and add it to your portfolio as the headline project"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 1", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn database transactions and ACID properties in depth", "Solve 6 DSA problems, mixed review"] },
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
    skill: { title: "Skill sprint", tasks: ["Learn indexing strategies and query optimization techniques", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Compare raw SQL vs ORM-based queries for the same operation", "Write the same query both ways and note the tradeoffs"] },
    project: { title: "Project push", tasks: ["Implement course enrollment and grade-entry endpoints with transaction safety", "Add indexes on frequently-queried columns and measure the improvement"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 1", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn an ORM (SQLAlchemy or Prisma) and the repository pattern", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review transactions, isolation levels and ORMs together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Write Dockerfile and docker-compose for the ERP backend + Postgres", "Push to GitHub with full setup and RBAC documentation"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 2", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn OS scheduling algorithms conceptually (FCFS, round robin, priority)", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn AWS EC2 basics — launching and connecting to an instance", "Launch a free-tier EC2 instance and SSH into it"] },
    project: { title: "Project push", tasks: ["Set up an IAM user/role with least-privilege access for deployment", "Launch an EC2 instance to host the ERP backend"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 2", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn Linux SSH — key-based auth, remote access", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn AWS S3 basics — buckets, objects, permissions", "Upload and retrieve a file from an S3 bucket via the CLI or console"] },
    project: { title: "Project push", tasks: ["SSH into the instance and set up the runtime environment (Docker, etc.)", "Deploy the ERP backend container to the EC2 instance"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 2", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn bash scripting for automation and cron jobs", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn monitoring basics — what to watch on a live server", "Write a short note on 3 metrics you'd monitor for your ERP backend"] },
    project: { title: "Project push", tasks: ["Set up an S3 bucket for file uploads (e.g. student documents)", "Wire the ERP backend to read/write files from S3"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 2", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn AWS IAM — users, roles, policies", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review Linux administration, IAM, EC2 and S3 together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Write a bash script to automate redeployment", "Document the full AWS deployment process in the README"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 3", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn Automata Theory basics — DFA and NFA", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Draw a DFA for a simple pattern-matching problem by hand", "Write the equivalent regex for the same pattern"] },
    project: { title: "Project push", tasks: ["Design the secure document assistant architecture — auth, storage, RAG pipeline", "Build document upload with per-user access control"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 3", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn regular expressions and context-free grammars conceptually", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn RAG (Retrieval-Augmented Generation) pipeline architecture", "Diagram a RAG pipeline from document ingestion to answer generation"] },
    project: { title: "Project push", tasks: ["Build the ingestion pipeline — extract, chunk and embed documents", "Store embeddings in a vector database with metadata for citations"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 3", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn system design fundamentals — scalability and horizontal vs vertical scaling", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Study how a load balancer distributes traffic across servers", "Write a short note on load balancing strategies (round robin vs least connections)"] },
    project: { title: "Project push", tasks: ["Build the chat interface with streaming responses from the LLM", "Implement citation links back to the exact document passage used"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 3", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn load balancers, reverse proxies and caching layers", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review automata, system design and RAG together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Add access control so users only see their own documents in search results", "Deploy the assistant and add it to your portfolio"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 4", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn Docker Compose for multi-service orchestration in depth", "Solve 8 DSA problems on BFS"] },
    academic: { title: "Academic focus", tasks: ["Write unit tests for 3 core functions in a past project that lacked them", "Measure test coverage and identify the biggest gaps"] },
    project: { title: "Project push", tasks: ["Design the LMS schema — courses, lessons, enrollments, progress tracking", "Build the React frontend shell for course browsing and lesson viewing"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 4", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn GitHub Actions CI/CD pipelines — build, test, deploy stages", "Solve 8 DSA problems on DFS"] },
    academic: { title: "Academic focus", tasks: ["Write integration tests for one API endpoint chain (e.g. signup → login → protected route)", "Add these tests to a CI pipeline that runs on push"] },
    project: { title: "Project push", tasks: ["Build the FastAPI backend CRUD for courses, lessons and enrollments", "Wire the frontend to the backend and implement progress tracking"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 4", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn NGINX configuration for routing and load balancing", "Solve 8 DSA problems on shortest path (Dijkstra)"] },
    academic: { title: "Academic focus", tasks: ["Learn API endpoint test suites using a framework (pytest, Jest, etc.)", "Write an endpoint test suite for 5 of your LMS's routes"] },
    project: { title: "Project push", tasks: ["Write unit and integration tests covering the core LMS flows", "Set up a GitHub Actions workflow to run tests on every push"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 4", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn testing — unit tests, integration tests, API endpoint test suites", "Solve 6 DSA problems, mixed graph review"] },
    academic: { title: "Academic focus", tasks: ["Review testing strategies and CI/CD together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Containerize the full stack with Docker Compose and NGINX in front", "Deploy the LMS and add it to your portfolio"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 5", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn microprocessor registers and their roles", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn function calling in LLM APIs — how a model requests a tool call", "Write a minimal script that has an LLM call a mock function"] },
    project: { title: "Project push", tasks: ["Build resume upload and text extraction (PDF/DOCX parsing)", "Design the analysis criteria (skills match, formatting, keyword gaps)"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 5", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn interrupts and how the CPU handles them", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn about context windows and how token limits constrain prompts", "Calculate the approximate token count for one of your longer prompts"] },
    project: { title: "Project push", tasks: ["Build the LLM-based analysis pipeline that scores a resume against a target role", "Implement structured output parsing from the LLM's response"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 5", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn instruction execution and basic assembly concepts", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn tokenization in more depth — how words become tokens", "Compare token counts for 3 sentences of varying complexity"] },
    project: { title: "Project push", tasks: ["Build the results UI showing strengths, gaps and suggestions", "Add public auth so users can save and revisit past analyses"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 5", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn prompt evaluation techniques — comparing outputs against criteria", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review microprocessors and LLM tooling concepts together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Polish the UI and handle edge cases (bad file formats, empty resumes)", "Deploy the analyzer and add it to your portfolio"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 6 (Winter Break + Networks)", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Update your resume and LinkedIn with Year 3 projects so far", "Do one mock interview (with a peer or by recording yourself) and review it"] },
    academic: { title: "Academic focus", tasks: ["Learn Redis in more depth — data structures beyond key-value", "Write 3 example use cases for Redis lists/sets/sorted sets"] },
    project: { title: "Project push", tasks: ["Design the collaboration platform — shared documents/whiteboards with live cursors", "Set up the WebSocket infrastructure for real-time updates"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 6 (Winter Break + Networks)", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn TCP/IP and UDP — differences and use cases", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn WebSockets in more depth — building on Year 2's chat app", "Write a short note on scaling WebSocket connections across servers"] },
    project: { title: "Project push", tasks: ["Implement operational transforms or a simple conflict-resolution strategy for concurrent edits", "Wire Redis for distributed session and presence management"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 6 (Winter Break + Networks)", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn HTTP/HTTPS, DNS and routing in more depth (building on Years 1-2)", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn distributed session management — how sessions work across multiple servers", "Diagram a distributed session flow using Redis as the shared store"] },
    project: { title: "Project push", tasks: ["Implement live cursor/presence indicators for connected users", "Add room-based collaboration (multiple independent documents)"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 6 (Winter Break + Networks)", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn the OSI model layer by layer", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review networking (OSI/TCP/UDP) and distributed sessions together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Load-test with multiple simultaneous clients and fix sync bugs", "Deploy the platform and add it to your portfolio"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 7", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn the SDLC — waterfall vs iterative models", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Write a requirements doc for the Issue Tracking System using SDLC principles", "Break the requirements into a backlog of user stories"] },
    project: { title: "Project push", tasks: ["Build the schema — issues, projects, sprints, assignees, statuses", "Build CRUD endpoints for issues and projects"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 7", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn Agile/Scrum — sprints, standups, backlogs, story points", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Draw a UML class diagram for the Issue Tracker's core entities", "Draw a UML sequence diagram for the 'create and assign issue' flow"] },
    project: { title: "Project push", tasks: ["Build the React UI — kanban-style board with drag-and-drop status changes", "Implement sprint assignment and story-point estimation fields"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 7", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn UML basics — class diagrams and sequence diagrams", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Set up a Gitflow branching structure on the Issue Tracker repo", "Practice a feature-branch → PR → code-review → merge cycle"] },
    project: { title: "Project push", tasks: ["Implement a comment/activity log per issue", "Add filtering by assignee, sprint and status"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 7", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn Gitflow — feature branches, release branches, hotfixes", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review SDLC, Agile and Gitflow together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Do a self-review of the codebase using a PR checklist as if it were a real team review", "Deploy the tracker and add it to your portfolio"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 8", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn AWS Lambda basics — functions, triggers, cold starts", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Compare serverless vs containerized deployment for a small API", "Write a short note on cost/complexity tradeoffs for each"] },
    project: { title: "Project push", tasks: ["Design the schema for short URLs, click counts and expiry", "Write the Lambda function to generate and store a shortened URL"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 8", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn API Gateway — routing requests to Lambda functions", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn about Lambda cold starts and how to mitigate them", "Write a short note on 2 mitigation strategies"] },
    project: { title: "Project push", tasks: ["Set up API Gateway routes for create-short-URL and redirect", "Connect the Lambda functions to an RDS Postgres instance"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 8", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn AWS RDS basics — managed relational databases", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn CloudWatch alerting — setting a threshold alarm", "Design 2 alarms you'd want for a production URL shortener"] },
    project: { title: "Project push", tasks: ["Implement click tracking and a basic analytics endpoint", "Set up CloudWatch logging for all Lambda invocations"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 8", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn CloudWatch basics — logs, metrics, alarms", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review Lambda, API Gateway, RDS and CloudWatch together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Add a CloudWatch alarm for error rate or high latency", "Deploy fully and document the serverless architecture in the README"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 9", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn consistent hashing and its role in distributed systems", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read about the CAP theorem with a concrete example (e.g. a distributed cache)", "Write a short note on which two of C/A/P your projects have prioritized so far"] },
    project: { title: "Project push", tasks: ["Design the multi-agent architecture — planner agent, search agent, summarizer agent", "Implement the planner agent that breaks a research query into sub-tasks"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 9", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn message queues (e.g. basic pub/sub or task queues)", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn how AI agent evaluation works — measuring task success", "Write 3 evaluation criteria you'd use for a research-assistant agent"] },
    project: { title: "Project push", tasks: ["Implement the search/tool-calling agent that gathers information for each sub-task", "Implement shared memory so agents can pass context between each other"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 9", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn CDNs and the CAP theorem conceptually", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn tool-calling patterns for AI agents (function registries, structured calls)", "Sketch the tool interface your research agent will expose"] },
    project: { title: "Project push", tasks: ["Implement the summarizer agent that synthesizes sub-task results into a final answer", "Add a task queue so agents can run sub-tasks concurrently"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 9", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn autonomous AI agents — planning, tool calling, memory", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review distributed systems and AI agent concepts together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Add basic evaluation logging (did each sub-task actually get answered)", "Deploy the engine and add it to your portfolio"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 10", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn OAuth 2.0 flows in depth — authorization code, client credentials", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Audit an earlier auth project against 3 OWASP Top 10 vulnerabilities", "Fix at least one real vulnerability you find"] },
    project: { title: "Project push", tasks: ["Build the identity microservice with full OAuth2 authorization code flow", "Implement password hashing, HTTPS enforcement and secure cookie flags"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 10", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn HTTPS/TLS and end-to-end encryption basics", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn rate limiting and brute-force protection for login endpoints", "Implement basic rate limiting on a login endpoint"] },
    project: { title: "Project push", tasks: ["Harden the service against injection, broken auth and sensitive data exposure (OWASP)", "Add rate limiting and brute-force lockout on login attempts"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 10", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn the OWASP Top 10 — study the first 5 in depth", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn micro-benchmarking — measuring endpoint response time under load", "Benchmark 2 endpoints and note the slowest one"] },
    project: { title: "Project push", tasks: ["Profile the service's endpoints and optimize the slowest ones", "Write security-focused tests (e.g. attempt SQL injection, verify it's blocked)"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 10", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Study the remaining OWASP Top 10 items and learn profiling/benchmarking basics", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review OAuth2, OWASP and performance profiling together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Document the security measures taken in the README", "Deploy the hardened service and add it to your portfolio"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 11", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Find and resolve 2-3 more open source issues", "Improve documentation on an open source project you use"] },
    academic: { title: "Academic focus", tasks: ["Review your GitHub contribution graph and identify any quiet months", "Write a short plan to keep contributions consistent going into Year 4"] },
    project: { title: "Project push", tasks: ["Redesign the portfolio site's information architecture (nav, sections, project grid)", "Rebuild the site shell with the new architecture"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 11", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Manage a PR review on your own repo as if reviewing someone else's code", "Aim for 5-10 merged PRs across your open source contributions this year"] },
    academic: { title: "Academic focus", tasks: ["Read 2-3 strong developer portfolio sites for structure/inspiration", "List 3 specific improvements you want to make to your own site"] },
    project: { title: "Project push", tasks: ["Add architecture diagrams to your top 3 project pages", "Add live demo links and embedded screenshots/GIFs for each major project"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 11", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn how to create clear architecture diagrams for a portfolio piece", "Draw an architecture diagram for one of your Year 3 capstone-level projects"] },
    academic: { title: "Academic focus", tasks: ["Write full case studies for your top 3 Year 1-3 projects", "Get feedback on the case studies from a peer or mentor if possible"] },
    project: { title: "Project push", tasks: ["Write and publish the full case studies for your top 3 projects", "Add an open-source contributions section listing merged PRs"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 11", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn to write a compelling project case study (problem, approach, result)", "Draft a case study outline for 2 of your best Year 3 projects"] },
    academic: { title: "Academic focus", tasks: ["Review open source contribution and portfolio-writing skills together", "Write a one-page cheat sheet on what makes a strong project write-up"] },
    project: { title: "Project push", tasks: ["Polish styling, performance and mobile responsiveness", "Deploy Portfolio v2 and retire the old version"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 12", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Full review — DBMS (transactions, indexing, normalization)", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Consolidate all Year 3 cheat sheets into a single master review document", "Identify your weakest topic from the year and spend extra time on it"] },
    project: { title: "Project push", tasks: ["Build the core data model and backend CRUD for your chosen capstone", "Set up auth and base API structure"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 12", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Full review — OS (scheduling, memory, processes/threads) and Networks", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Do a full Year 3 retro — compare growth against the Year 3 milestones", "Write 3 specific goals for Year 4"] },
    project: { title: "Project push", tasks: ["Build the core frontend flows for the chosen capstone", "Wire the frontend to the backend for the primary user journey"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 12", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Full review — Software Engineering (SDLC, Agile) and System Design", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Choose your capstone (AI Workspace, Agile Hub, Cloud Storage, or Code Editor) and scope it", "Write the requirements doc and architecture plan for the chosen capstone"] },
    project: { title: "Project push", tasks: ["Add the capstone's signature feature (e.g. AI chat, real-time collab, file storage, code execution)", "Write tests covering the core flows"] }
  },
  {
    yearId: 3, yearLabel: "Year 3", monthName: "Month 12", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Tool review — Docker, AWS and Linux administration", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Set up the project skeleton (repo, CI, base structure) for the capstone", "Plan the 4-week build timeline you'll actually build during this month"] },
    project: { title: "Project push", tasks: ["Containerize and deploy the capstone", "Write a full README with architecture notes and add it to your portfolio"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 1", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Research and shortlist 2-3 Major Project ideas that match your interests and skill level", "Reach out to potential guides/mentors about your top idea"] },
    academic: { title: "Academic focus", tasks: ["Lock in your electives for the semester", "Confirm your Major Project guide and get the topic formally approved"] },
    project: { title: "Project push", tasks: ["Write the full requirements document for the Major Project", "Define the core user stories and success criteria"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 1", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn system design fundamentals — API design and contract-first thinking", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Research your chosen AI specialization (LLM apps / ML pipelines / CV / NLP)", "Read 2-3 reference projects/papers in your chosen specialization"] },
    project: { title: "Project push", tasks: ["Design the system architecture — components, data flow, API boundaries", "Draw the architecture diagram (monolith vs microservices decision included)"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 1", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn scalability patterns — vertical/horizontal scaling, stateless services", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn DB selection tradeoffs — SQL vs NoSQL for your capstone's needs", "Write a short note justifying your DB choice for the Major Project"] },
    project: { title: "Project push", tasks: ["Design the database schema and ER diagram", "Get guide feedback on the architecture and requirements doc"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 1", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn monolith vs microservices tradeoffs for a project at your scale", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review system design and specialization research together", "Write a one-page cheat sheet summarizing your architecture decisions"] },
    project: { title: "Project push", tasks: ["Finalize the engineering plan document incorporating feedback", "Set up the project repo, README and initial folder structure"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 2", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn AWS ECS basics — task definitions, services, clusters", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn Terraform basics — providers, resources, state", "Write a minimal Terraform script provisioning one AWS resource"] },
    project: { title: "Project push", tasks: ["Build the core backend services per the architecture from Month 1", "Implement the primary data models and repository layer"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 2", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn AWS ECR — pushing and pulling container images", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn secrets management (AWS Secrets Manager or similar)", "Move one hardcoded secret from a past project into a secrets manager"] },
    project: { title: "Project push", tasks: ["Push a working container image to ECR", "Set up a VPC with appropriate subnets and security groups"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 2", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn AWS VPC basics — subnets, security groups, routing", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Compare ECS vs plain EC2 deployment for your Major Project's needs", "Write a short note justifying your deployment choice"] },
    project: { title: "Project push", tasks: ["Deploy the core backend service to ECS", "Configure Route 53 for a custom domain (or subdomain) pointing to the service"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 2", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn Route 53 basics — DNS management on AWS", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review AWS ECS/ECR/VPC and Terraform together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Test the deployed backend end to end against the planned API contract", "Document the AWS deployment steps in the README"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 3", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn model evaluation techniques for LLM-integrated features", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Design the evaluation criteria for your Major Project's AI feature", "Write 5 test cases you'll use to evaluate the AI feature's quality"] },
    project: { title: "Project push", tasks: ["Design the AI feature's integration points into the core backend", "Implement the function-calling/tool interface for the AI feature"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 3", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn agent architectures relevant to your Major Project's AI feature", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn prompt injection risks and basic mitigations for AI-facing APIs", "Write a short note on 2 mitigations you'll apply to your project"] },
    project: { title: "Project push", tasks: ["Implement structured output parsing and validation from the LLM", "Wire the AI feature into the main application flow"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 3", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn function calling and structured outputs from LLM APIs", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn rate limiting strategies specific to LLM-cost-sensitive endpoints", "Design a rate-limiting policy for your AI feature's endpoint"] },
    project: { title: "Project push", tasks: ["Add rate limiting and input validation on the AI-facing endpoint", "Run your 5 evaluation test cases and note the results"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 3", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn edge security — rate limiting and input validation for AI-facing endpoints", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review AI integration and edge security together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Fix issues found during evaluation and re-test", "Document the AI integration architecture in the README"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 4", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn message queues in more depth — Kafka basics (topics, producers, consumers)", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn centralized logging concepts (structured logs, log aggregation)", "Add structured logging to one service in your Major Project"] },
    project: { title: "Project push", tasks: ["Instrument the core backend with Prometheus metrics", "Set up a Prometheus server to scrape your service's metrics"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 4", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn event-driven architecture patterns", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Compare event-driven vs request-response architecture for your project's needs", "Write a short note on where an event-driven approach would help"] },
    project: { title: "Project push", tasks: ["Build a Grafana dashboard visualizing key metrics (latency, error rate, throughput)", "Set up centralized logging across all Major Project services"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 4", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn Prometheus basics — metrics, scraping, exporters", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn what makes a good dashboard (signal vs noise, key metrics)", "Sketch the dashboard layout you'll build for your Major Project"] },
    project: { title: "Project push", tasks: ["If applicable, add an event queue for one async workflow in your project", "Test the telemetry setup by simulating load and watching the dashboard"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 4", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn Grafana basics — dashboards built on Prometheus data", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review Kafka/event-driven patterns and observability together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Add basic alerting for critical thresholds", "Document the observability setup in the README"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 5", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Interview review — redo 5 DSA problems from Year 1-2 topics without notes", "Solve 8 DSA problems, mixed interview-style review"] },
    academic: { title: "Academic focus", tasks: ["Write a mock system design doc for a well-known app (e.g. a URL shortener at scale)", "Get feedback on the mock design from a peer or online community"] },
    project: { title: "Project push", tasks: ["Freeze scope for Phase I and fix any remaining critical bugs", "Run through the full primary user journey manually end to end"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 5", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Interview review — explain OS process/thread concepts and DBMS transactions out loud", "Solve 8 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review your Major Project against production-readiness checklist items (logging, auth, error handling)", "Fix the top 3 gaps found in the checklist review"] },
    project: { title: "Project push", tasks: ["Containerize all Major Project services consistently", "Set up a staging/beta deployment environment"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 5", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Interview review — explain 2 networking concepts and 2 OOP concepts out loud", "Solve 8 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Prepare a validation plan for the beta — what needs to work before it's shareable", "Write test scenarios covering the full primary user journey"] },
    project: { title: "Project push", tasks: ["Run your validation test scenarios against the beta deployment", "Fix issues found during validation testing"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 5", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Interview review — do one mock system design interview (with a peer or recorded)", "Solve 6 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review interview prep and production-readiness together", "Write a one-page cheat sheet of your weakest interview topics"] },
    project: { title: "Project push", tasks: ["Do a final review pass on error handling and edge cases", "Share the beta with a few trusted testers and collect feedback"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 6 (Winter Break)", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Do 2 mock interviews focused on behavioral questions (STAR method)", "Update your resume with Major Project details and quantified impact"] },
    academic: { title: "Academic focus", tasks: ["Learn LLM fine-tuning basics conceptually", "Write a short note on when fine-tuning beats prompt engineering"] },
    project: { title: "Project push", tasks: ["Audit the beta feedback from last month and prioritize the top UX fixes", "Implement proper loading and empty states across the app"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 6 (Winter Break)", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn UX polish principles — loading states, error states, empty states", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Learn LoRA and quantization conceptually", "Write a short note on why these techniques reduce compute cost"] },
    project: { title: "Project push", tasks: ["Implement improved error messaging based on real feedback", "Profile and optimize the slowest queries identified during beta testing"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 6 (Winter Break)", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn query optimization techniques applicable to your Major Project's slow queries", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Research running a small local LLM and note the hardware/software requirements", "Write a short feasibility note on using a local LLM in a future project"] },
    project: { title: "Project push", tasks: ["Write E2E tests for the primary user journey using Playwright/Cypress", "Add these E2E tests to your CI pipeline"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 6 (Winter Break)", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn end-to-end (E2E) testing frameworks (Playwright/Cypress)", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review advanced AI topics and UX/testing concepts together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Do a final UX pass — consistency, accessibility basics, mobile responsiveness", "Re-share the polished version with testers for a final round of feedback"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 7", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Find and open 2-3 open source issues to work on", "Submit PRs for the issues you've worked on"] },
    academic: { title: "Academic focus", tasks: ["Write the full public README — setup, usage, architecture overview", "Write a CONTRIBUTING.md if you want outside contributions"] },
    project: { title: "Project push", tasks: ["Tag and prepare the v1.0 release branch", "Run the full test suite one final time before release"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 7", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Follow up on PR review feedback across your open source contributions", "Aim for 10-15 merged PRs across the semester"] },
    academic: { title: "Academic focus", tasks: ["Write user-facing documentation (how to use the deployed app)", "Record a short demo walkthrough (video or GIF) for the docs"] },
    project: { title: "Project push", tasks: ["Deploy the production v1.0 build to its permanent hosting", "Verify the production deployment against the full test scenario list"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 7", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn how to write clear public documentation for an open source-style release", "Draft the public docs outline for your Major Project"] },
    academic: { title: "Academic focus", tasks: ["Do a final security and dependency audit before public release", "Fix any critical issues found in the audit"] },
    project: { title: "Project push", tasks: ["Publish the public documentation and demo alongside the release", "Announce the release (portfolio, LinkedIn, relevant communities)"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 7", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn semantic versioning and changelog conventions", "Write your Major Project's first CHANGELOG entry for v1.0"] },
    academic: { title: "Academic focus", tasks: ["Review documentation writing and release practices together", "Write a one-page checklist for future releases"] },
    project: { title: "Project push", tasks: ["Monitor the live deployment for the first issues post-launch", "Triage and fix any launch-week bugs quickly"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 8", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Research target companies/labs — tier-1 companies matching your interests", "Research AI startups and research labs matching your specialization"] },
    academic: { title: "Academic focus", tasks: ["Rewrite your resume with quantified impact from all 4 years of projects", "Get resume feedback from a mentor, senior, or career service"] },
    project: { title: "Project push", tasks: ["Finalize the resume — one version tuned for your primary target role", "Create a second resume variant if targeting a notably different role type"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 8", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Research grad program options as a backup/parallel path", "Shortlist 10-15 target opportunities across all three categories"] },
    academic: { title: "Academic focus", tasks: ["Rebuild your GitHub profile README to highlight your Major Project and top work", "Pin your 6 best repos with clear descriptions"] },
    project: { title: "Project push", tasks: ["Finalize the GitHub profile overhaul", "Finalize the personal website overhaul"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 8", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Learn what makes a resume pass ATS screening", "Audit your current resume against ATS best practices"] },
    academic: { title: "Academic focus", tasks: ["Rebuild your personal website's homepage messaging around your target roles", "Update your LinkedIn headline, About section and featured projects"] },
    project: { title: "Project push", tasks: ["Finalize the LinkedIn overhaul including a status update about your Major Project launch", "Request 2-3 recommendations/endorsements from mentors or collaborators"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 8", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Learn what strong GitHub profiles include (pinned repos, README, contribution graph)", "Audit your GitHub profile against these criteria"] },
    academic: { title: "Academic focus", tasks: ["Do a full profile review across resume, GitHub, LinkedIn and website for consistency", "Write down 3 people who could refer or introduce you at target companies"] },
    project: { title: "Project push", tasks: ["Do a final cross-check that resume, GitHub, LinkedIn and website tell the same consistent story", "Start applying to your shortlisted target opportunities"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 9", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Learn Clean Architecture principles — layers and dependency direction", "Solve 4 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Read a case study on a real-world refactor to Clean Architecture", "Write a short note on 2 lessons applicable to your project"] },
    project: { title: "Project push", tasks: ["Refactor the first bounded context to enforce clean domain/infrastructure separation", "Write/update tests to confirm behavior didn't change"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 9", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Learn Domain-Driven Design (DDD) basics — entities, value objects, aggregates", "Solve 4 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Map your Major Project's current modules to DDD bounded contexts", "Identify where domain logic is currently leaking into infrastructure code"] },
    project: { title: "Project push", tasks: ["Refactor the second bounded context using the same approach", "Write/update tests for this context as well"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 9", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Identify design pattern anti-patterns present in your Major Project's current code", "Solve 4 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Write the target architecture doc post-refactor", "Get a second opinion on the target architecture if possible"] },
    project: { title: "Project push", tasks: ["Refactor any remaining shared/cross-cutting concerns (auth, logging) into clean boundaries", "Run the full test suite and fix any regressions"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 9", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Plan the refactor scope — which modules need boundary changes most", "Solve 3 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review Clean Architecture and DDD together", "Write a one-page cheat sheet for the month"] },
    project: { title: "Project push", tasks: ["Do a final code review pass against the target architecture doc", "Update the README's architecture section to reflect the refactor"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 10", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Read 1-2 AI/DL papers relevant to your specialization", "Write a short summary of each paper's core contribution"] },
    academic: { title: "Academic focus", tasks: ["Identify 2-3 real scalability bottlenecks you solved across your projects", "Outline the technical case study structure (problem, investigation, fix, result)"] },
    project: { title: "Project push", tasks: ["Publish the first technical case study on your blog/portfolio", "Share it in relevant developer communities for feedback/visibility"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 10", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Read a distributed systems whitepaper (e.g. on consistency or consensus)", "Write a short summary connecting it to a project you've built"] },
    academic: { title: "Academic focus", tasks: ["Draft the first technical case study in full", "Get feedback on the draft from a peer or mentor"] },
    project: { title: "Project push", tasks: ["Publish the second technical case study", "Cross-link both case studies from your portfolio's project pages"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 10", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Read 3-5 top engineering blog posts on scalability or architecture", "Note 2 techniques you haven't tried yet"] },
    academic: { title: "Academic focus", tasks: ["Draft the second technical case study in full", "Revise both case studies based on feedback"] },
    project: { title: "Project push", tasks: ["Write a short retrospective blog post on your Major Project's journey end to end", "Publish the retrospective"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 10", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Continue applying to target opportunities from Month 8's list", "Follow up on any pending applications"] },
    academic: { title: "Academic focus", tasks: ["Review technical writing and reading together", "Write a one-page cheat sheet on what makes a strong engineering write-up"] },
    project: { title: "Project push", tasks: ["Review all published writing for consistency and fix any issues", "Add the published pieces to your resume/LinkedIn as writing samples"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 11", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Final DSA review — redo 5 hard problems spanning arrays through graphs", "Solve 8 DSA problems, timed, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Do a live mock technical interview with a peer, mentor or platform", "Write down and address the 3 weakest points from the mock"] },
    project: { title: "Project push", tasks: ["Rehearse explaining your Major Project's architecture clearly in under 3 minutes", "Rehearse explaining one hard technical decision you made and why"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 11", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Final review — System Design (do one full mock system design interview)", "Solve 8 DSA problems, timed, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Do a live mock system design interview", "Write down and address the 3 weakest points from the mock"] },
    project: { title: "Project push", tasks: ["Rehearse walking through your Major Project's AI integration in interview style", "Prepare answers for likely follow-up/deep-dive questions"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 11", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Final review — SQL, OS, DBMS (explain each concept out loud without notes)", "Solve 8 DSA problems, timed, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Do a live mock behavioral interview using the STAR method", "Refine your top 5 STAR stories based on the feedback"] },
    project: { title: "Project push", tasks: ["Rehearse a live coding walkthrough of one project feature end to end", "Time yourself and tighten the explanation"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 11", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Final review — Networks and OOP (explain each concept out loud without notes)", "Solve 6 DSA problems, timed, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Review all interview prep areas together", "Write a final one-page cheat sheet of your personal weak spots to review right before interviews"] },
    project: { title: "Project push", tasks: ["Do one final full mock interview combining DSA, system design and project deep-dive", "Note any last gaps and do focused review on just those"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 12", weekInMonth: 1,
    skill: { title: "Skill sprint", tasks: ["Finalize any remaining Phase II features per your original engineering plan", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Write the final Major Project thesis/report following your college's format", "Get the report reviewed by your guide"] },
    project: { title: "Project push", tasks: ["Complete Phase II final implementation items", "Run full testing and structural verification across the entire system"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 12", weekInMonth: 2,
    skill: { title: "Skill sprint", tasks: ["Do a full regression test pass across the whole Major Project", "Solve 5 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Revise the report based on guide feedback", "Finalize and submit the written thesis"] },
    project: { title: "Project push", tasks: ["Fix any bugs found during final testing", "Confirm the deployed production version matches the submitted codebase exactly"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 12", weekInMonth: 3,
    skill: { title: "Skill sprint", tasks: ["Prepare the viva presentation slides — problem, architecture, results, learnings", "Solve 4 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Clean up the GitHub repo — remove dead code, finalize README and docs", "Tag the final submission commit/release"] },
    project: { title: "Project push", tasks: ["Compile the thesis document with final results, screenshots and architecture diagrams", "Submit the thesis and project repository per college requirements"] }
  },
  {
    yearId: 4, yearLabel: "Year 4", monthName: "Month 12", weekInMonth: 4,
    skill: { title: "Skill sprint", tasks: ["Rehearse the viva presentation out loud at least twice", "Solve 4 DSA problems, mixed review"] },
    academic: { title: "Academic focus", tasks: ["Prepare onboarding notes for your chosen team/lab if already placed", "Do a final full review of resume, GitHub and portfolio before graduating"] },
    project: { title: "Project push", tasks: ["Deliver the formal viva defence", "Do a final personal retrospective on the full 4-year journey and what's next"] }
  },
];



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


const SYLLABUS_HITK = [
  { sem:1, year:1, subjects:[
    { name:"Physics-I", topics:["Central Forces","Oscillations and Vibrations","Wave Optics","Polarization","Quantum Mechanics","Schrödinger Equation","Particle in a Box"] },
    { name:"Mathematics-I", topics:["Matrices","Rank & Inverse","Eigenvalues & Eigenvectors","Vector Calculus","Gradient, Divergence, Curl","Differential Equations","Infinite Series","Multiple Integration","Green's, Gauss & Stokes Theorems"] },
    { name:"Electronics Devices & Circuits", topics:["Semiconductor Physics","PN Junction","Diodes","Rectifiers","BJT","MOSFET","JFET","Operational Amplifier","Feedback Amplifiers"] },
    { name:"Universal Human Values", topics:["Ethics","Human Values","Society","Professional Conduct","Sustainability","Environmental Ethics","Technology & Society"] },
    { name:"Physics & Electronics Labs", topics:["Physics Laboratory","Electronics Laboratory","Workshop Practices","Engineering Graphics (CAD & Drawing)"] }
  ]},
  { sem:2, year:1, subjects:[
    { name:"Chemistry", topics:["Thermodynamics","Electrochemistry","Batteries","Fuel Cells","Molecular Structure","Quantum Chemistry","Spectroscopy","Organic Reactions","Stereochemistry","Drug Chemistry"] },
    { name:"Mathematics-II", topics:["Probability","Statistics","Numerical Methods","Graph Theory","Trees","Dijkstra Algorithm","BFS","DFS","Laplace Transform"] },
    { name:"Programming for Problem Solving", topics:["Computer Fundamentals","Number Systems","Algorithms","Flowcharts","C Programming","Loops","Functions","Arrays","Pointers","Structures","Files","Dynamic Memory"] },
    { name:"Basic Electrical Engineering", topics:["DC Circuits","AC Circuits","Three Phase Systems","Transformers","DC Machines","Induction Motors","Magnetic Circuits"] },
    { name:"English for Technical Writing", topics:["Business Communication","Technical Writing","Email Writing","Report Writing","Presentation Skills","Professional Communication"] }
  ]},
  { sem:3, year:2, subjects:[
    { name:"Discrete Mathematics", topics:["Logic","Sets","Relations","Functions","Graph Theory","Combinatorics","Boolean Algebra"] },
    { name:"Microprocessor & Microcontroller", topics:["CPU Architecture","8086","8051","Memory","Assembly Language","Interfacing"] },
    { name:"Digital Circuit Design", topics:["Logic Gates","Boolean Algebra","K-Maps","Combinational Circuits","Sequential Circuits","Flip Flops","Counters"] },
    { name:"Data Structures & Algorithms", topics:["Arrays","Linked Lists","Stack","Queue","Trees","Binary Search Tree","Heap","Graph","Searching","Sorting","Complexity Analysis"] },
    { name:"Computer Organization & Architecture", topics:["CPU","Memory","Registers","ALU","Cache","Pipelining","Instruction Cycle","Addressing Modes"] }
  ]},
  { sem:4, year:2, subjects:[
    { name:"Algebraic Structures", topics:["Groups","Rings","Fields","Modular Arithmetic"] },
    { name:"Object-Oriented Programming", topics:["Classes","Objects","Inheritance","Polymorphism","Encapsulation","Abstraction","Exception Handling"] },
    { name:"Design & Analysis of Algorithms", topics:["Divide & Conquer","Greedy","Dynamic Programming","Backtracking","Branch & Bound","Graph Algorithms","Complexity"] },
    { name:"Database Management Systems", topics:["ER Model","Relational Model","SQL","Normalization","Transactions","Concurrency","Indexing"] },
    { name:"Computer Networks", topics:["OSI Model","TCP/IP","Routing","Switching","IPv4","IPv6","Transport Layer","Application Layer"] },
    { name:"Design Thinking Lab", topics:["Innovation","Problem Solving","Product Design","Prototyping"] }
  ]},
  { sem:5, year:3, subjects:[
    { name:"Advanced Java & Web Technology", topics:["Advanced Java","Servlets/Frameworks","Web development fundamentals"] },
    { name:"Artificial Intelligence & Machine Learning", topics:["Search","Knowledge Representation","Supervised Learning","Unsupervised Learning"] },
    { name:"Operating Systems", topics:["Processes","Threads","Scheduling","Synchronization","Deadlocks","Memory Management"] },
    { name:"Formal Languages & Automata Theory", topics:["DFA","NFA","Regular Expressions","Context-Free Grammars"] },
    { name:"Professional Elective", topics:["Computer Graphics","Distributed DBMS","Cyber Security"] },
    { name:"Open Elective", topics:["Linear Algebra","Statistics","Sensors","VLSI","Network Analysis"] }
  ]},
  { sem:6, year:3, subjects:[
    { name:"Economics for Engineers", topics:["Micro & macro economics for engineering decisions"] },
    { name:"Software Engineering", topics:["SDLC","Agile/Scrum","UML","Requirements Engineering","Design Patterns"] },
    { name:"Cryptography & Network Security", topics:["Ciphers","Key Exchange","Hashing","Network Security"] },
    { name:"Professional Elective A", topics:["Big Data","Compiler Design","Image Processing","Advanced AI","Multimedia"] },
    { name:"Professional Elective B", topics:["Internet Technology","Distributed Computing","Pattern Recognition","Blockchain","Data Science"] },
    { name:"Open Elective", topics:["Cloud Computing","Biology","Computational Biology"] },
    { name:"Industry Competence Lab", topics:["Seminar","Technical Paper"] }
  ]},
  { sem:7, year:4, subjects:[
    { name:"Principles of Management", topics:["Management fundamentals for engineers"] },
    { name:"Professional Elective", topics:["Internet of Things","Mobile Computing","Real-Time Systems","Quantum Computing"] },
    { name:"Open Elective", topics:["DevOps","5G Communication","Software Defined Radio","Optimization"] },
    { name:"MOOC Elective", topics:["Ethical Hacking","Cyber Security","Industry 4.0","Industrial IoT","Sustainability"] },
    { name:"Internship & Major Project Phase-I", topics:["Industrial training","Project scoping & Phase-I work"] }
  ]},
  { sem:8, year:4, subjects:[
    { name:"Major Project-II", topics:["Project completion & deployment"] },
    { name:"Comprehensive Viva", topics:["Viva preparation across the curriculum"] },
    { name:"Skill Development", topics:["Industry certification"] },
    { name:"Final Presentation", topics:["Presentation prep & delivery"] }
  ]}
];


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


const COLLEGES = {
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





function collegeShortLabel(college){
  if(!college) return "";
  const words = (college.branch || "").trim().split(/\s+/).filter(Boolean);
  const branchAbbrev = words.length > 1 ? words.map(w=>w[0]).join("").toUpperCase() : (words[0] || "");
  return branchAbbrev ? `${college.shortName} · ${branchAbbrev}` : college.shortName;
}


function collegeFullLabel(college){
  if(!college) return "";
  const degreeBranch = [college.degree, college.branch].filter(Boolean).join(", ");
  return [college.collegeName, degreeBranch].filter(Boolean).join(" — ");
}




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



const DEFAULT_COLLEGE_ID = Object.keys(COLLEGES)[0];

let SYLLABUS = COLLEGES[DEFAULT_COLLEGE_ID].syllabus;

function setActiveCollege(key){
  const college = COLLEGES[key] || COLLEGES[DEFAULT_COLLEGE_ID];
  SYLLABUS = college.syllabus;
  window.SYLLABUS = SYLLABUS;
  return college;
}

const REVISION_CYCLE = [
  "Skim through all lecture notes for this subject",
  "Rework 2 previous years' question papers",
  "Summarize weak topics on one page",
  "Solve numericals / derivations from memory",
  "Group study or teach-back session",
  "Timed mock test under exam conditions",
  "Final formula sheet & quick revision pass"
];

window.DEFAULT_DB = DEFAULT_DB;
window.CURRICULUM = CURRICULUM;
window.TRACKS = TRACKS;
window.QUIZ = QUIZ;
window.SYLLABUS = SYLLABUS;
window.COLLEGES = COLLEGES;
window.DEFAULT_COLLEGE_ID = DEFAULT_COLLEGE_ID;
window.setActiveCollege = setActiveCollege;
window.collegeShortLabel = collegeShortLabel;
window.collegeFullLabel = collegeFullLabel;
window.REVISION_CYCLE = REVISION_CYCLE;
