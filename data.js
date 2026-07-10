/* ============================================================
   TRAJECTORY — Curriculum & Syllabus Data
   ============================================================ */

window.DEFAULT_DB = {
  profile: { name: "", startDate: "", createdAt: "" },
  settings: { theme: "lavender" },
  schedule: { currentIndex: 0, offsetDays: 0, weekStatus: {}, weekTaskDone: {} },
  academics: { subjects: [] },
  projects: { shipped: {}, started: {}, meta: {}, custom: [] },
  progress: { dsaSolved: 0 },
  prep: { done: {} },
  timeSync: { offsetMs: 0, lastSynced: null, verified: false },
  tracking: { dailyLogs: {}, historicalPerformance: [] },
  github: { username: "", profile: null, repos: [], events: [], lastSyncedAt: null }
};

const CURRICULUM = {
  years: [
    {
      id: 1, label: "Year 1", window: "2026–27", theme: "Foundation",
      goal: "Build an unshakable foundation",
      months: [
        { name:"Month 1", focus:["Python basics — variables, loops, functions, lists, dicts, file I/O","Tooling — VS Code, Git, GitHub, Linux (WSL/Ubuntu)","CS theory — binary, decimal, hex, memory & CPU basics","AI literacy — what is AI, ML vs DL, how LLMs work"],
          dsa:20, project:"Scientific Calculator (CLI)", desc:"CLI calculator covering arithmetic, memory and basic scientific functions.", stack:["PYTHON"] },
        { name:"Month 2", focus:["Python OOP, exceptions, virtual environments","Web — HTML5 & CSS3","Git — branches, merge, pull requests","Linux — file system, bash basics, permissions"],
          dsa:20, project:"Personal Portfolio Website", desc:"Responsive personal site deployed on GitHub Pages.", stack:["HTML","CSS"] },
        { name:"Month 3", focus:["C++ basics — pointers (intro), STL (vector, pair)","Responsive CSS — Flexbox, Grid","OS concepts — processes & threads","AI — neural networks & transformers (concept)"],
          dsa:20, project:"Expense Tracker", desc:"Track daily expenses with local file-based storage.", stack:["PYTHON","FILE I/O"] },
        { name:"Month 4", focus:["JavaScript — variables, DOM, events, fetch API","SQL — SELECT / INSERT / UPDATE / DELETE","Linux shell scripting"],
          dsa:15, project:"Weather App (API-driven)", desc:"Live weather lookup by city using a public weather API.", stack:["JAVASCRIPT","API"] },
        { name:"Month 5", focus:["Revision month — consolidate the whole semester","Update GitHub profile, publish first technical blog"],
          dsa:10, project:"Student Result Manager", desc:"Store and query student results with SQL persistence.", stack:["SQL","CRUD"] },
        { name:"Month 6 (Winter Break)", focus:["React, npm, REST APIs, JSON, HTTP fundamentals"],
          dsa:10, project:"Notes App", desc:"First React app — create, edit and delete notes.", stack:["REACT"] },
        { name:"Month 7", focus:["Python — advanced OOP & packages","React — components, props, state"],
          dsa:15, project:"To-Do App", desc:"Task manager built with React components, props and state.", stack:["REACT"] },
        { name:"Month 8", focus:["Backend — FastAPI or Node.js","SQL — joins, indexes, normalization","AI — prompt engineering & model limitations"],
          dsa:10, project:"Notes API", desc:"REST backend for notes with joins, indexing and normalization.", stack:["FASTAPI","SQL"] },
        { name:"Month 9", focus:["Auth — JWT, cookies, sessions","Deployment — Render, Vercel, GitHub Actions"],
          dsa:10, project:"Authentication System", desc:"JWT-based signup/login flow with sessions and deployment.", stack:["JWT","AUTH"] },
        { name:"Month 10", focus:["Networking — DNS, HTTP, HTTPS","AI — embeddings & vector databases (concept)"],
          dsa:10, project:"Chat Application", desc:"Basic real-time chat using HTTP polling or sockets.", stack:["JAVASCRIPT","NETWORKING"] },
        { name:"Month 11", focus:["Docker basics — containers, images, volumes"],
          dsa:5, project:"Dockerize earlier projects", desc:"Containerize previous builds with Docker images & volumes.", stack:["DOCKER"] },
        { name:"Month 12 (Summer Break)", focus:["Full review — Python, Git, React, SQL, Linux","DSA intensive — arrays through trees, push to 150–200 total"],
          dsa:30, project:"Personal Dashboard", desc:"Capstone dashboard tying together the year's stack.", stack:["FULL STACK"] }
      ],
      milestones: [["CGPA","8.5 – 9.5+"],["DSA problems","150–200 solved"],["Projects shipped","6–8 deployed"],["GitHub commits","300+"],["Portfolio","Live website"],["Blog posts","3–5 published"]]
    },
    {
      id: 2, label: "Year 2", window: "2027–28", theme: "Engineer",
      goal: "Become an engineer, not just a coder",
      months: [
        { name:"Month 1", focus:["C++ — classes, objects, constructors, inheritance, polymorphism","DSA — arrays, binary search, two pointers, prefix sum","Backend — FastAPI or Node.js + Express"],
          dsa:25, project:"Student Management System (CLI)", desc:"C++ CLI app modelling students with OOP fundamentals.", stack:["C++","OOP"] },
        { name:"Month 2", focus:["OOP consolidation, Digital Logic concepts","DSA — linked list, stack, queue, deque","REST APIs, CRUD, JSON, Postman · PostgreSQL keys & relations"],
          dsa:25, project:"Library Management API", desc:"CRUD REST API backed by PostgreSQL.", stack:["POSTGRESQL","REST"] },
        { name:"Month 3", focus:["SOLID principles · Design patterns — Singleton, Factory, Strategy","Professional Git — rebase, cherry-pick, conflict resolution","DSA — hash maps, sets, priority queues, heaps"],
          dsa:25, project:"Expense Tracker API", desc:"Authenticated expense API using design patterns & clean Git flow.", stack:["API","AUTH"] },
        { name:"Month 4", focus:["Computer Organization — registers, cache, virtual memory, instruction cycle","Cloud deploy — Render / Railway","DSA — binary trees, BST, traversals"],
          dsa:30, project:"Task Management API", desc:"Task API built on a cloud-deployed, computer-organization-aware backend.", stack:["API","CLOUD"] },
        { name:"Month 5", focus:["Revision — OOP, DSA, SQL, Computer Organization"],
          dsa:15, project:"Full Stack Task Manager", desc:"Capstone — React + FastAPI + Postgres, deployed publicly.", stack:["REACT","FASTAPI","POSTGRESQL"] },
        { name:"Month 6 (Winter Break)", focus:["Auth — JWT, OAuth basics, password hashing","Docker — images, containers, Docker Compose"],
          dsa:10, project:"Authentication Service", desc:"Standalone JWT/OAuth auth microservice, containerized.", stack:["JWT","DOCKER"] },
        { name:"Month 7", focus:["Algorithms — Divide & Conquer, Greedy","AI — ML fundamentals (regression, classification, clustering)"],
          dsa:20, project:"Sorting Visualizer", desc:"Visualize divide & conquer and greedy sorting algorithms.", stack:["JAVASCRIPT","ALGORITHMS"] },
        { name:"Month 8", focus:["Algorithms — intro to Dynamic Programming","React — routing, Context API, hooks","Database — transactions, indexing, normalization"],
          dsa:20, project:"Blog Platform", desc:"Full blog app with routing, Context API and a normalized DB.", stack:["REACT","SQL"] },
        { name:"Month 9", focus:["Computer Architecture — cache hierarchy, paging, pipelining, branch prediction","AI — embeddings, tokenization, vector search"],
          dsa:15, project:"AI PDF Chat Assistant", desc:"Chat over PDFs using embeddings and vector search.", stack:["AI","EMBEDDINGS"] },
        { name:"Month 10", focus:["DevOps — Docker Compose, env vars, NGINX, GitHub Actions CI/CD"],
          dsa:10, project:"Containerize the Blog Platform", desc:"Docker Compose, env vars and NGINX in front of the blog.", stack:["DOCKER","NGINX"] },
        { name:"Month 11", focus:["Networking — HTTP, HTTPS, DNS, TCP/IP, WebSockets","Redis & caching strategies"],
          dsa:15, project:"Real-Time Chat Application", desc:"WebSocket chat backed by Redis pub/sub.", stack:["WEBSOCKETS","REDIS"] },
        { name:"Month 12", focus:["Capstone revision — Algorithms, Architecture, SQL, React, Backend, Docker","Open source — aim for 2–5 merged pull requests","Reading — Clean Code, The Pragmatic Programmer"],
          dsa:15, project:"AI Study Assistant", desc:"Notes + search + PDF upload + AI chat — capstone for the year.", stack:["AI","FULL STACK"] }
      ],
      milestones: [["CGPA","8.5 – 9.5+"],["DSA problems","350–450 cumulative"],["Projects shipped","12–15 polished apps"],["GitHub commits","700+"],["Open source","2–5 merged PRs"],["Blog posts","8–10 published"]]
    },
    {
      id: 3, label: "Year 3", window: "2028–29", theme: "Industry Ready",
      goal: "Become industry ready",
      months: [
        { name:"Month 1", focus:["DBMS — transactions, ACID, isolation levels, indexing, query optimization","OS — introduction & core paradigms","Backend — advanced SQL, ORMs (SQLAlchemy/Prisma), repository pattern"],
          dsa:25, project:"Student ERP Backend", desc:"JWT + RBAC ERP backend on Postgres, fully containerized.", stack:["POSTGRESQL","RBAC"] },
        { name:"Month 2", focus:["OS deep-dive — scheduling, synchronization, deadlocks, virtual memory","Linux — SSH, bash scripting, cron jobs, monitoring","AWS — IAM, EC2, S3"],
          dsa:20, project:"Cloud-Native Infra Deployment", desc:"Migrate the ERP onto AWS EC2, S3 and IAM.", stack:["AWS","CLOUD"] },
        { name:"Month 3", focus:["Automata Theory — DFA/NFA, regular expressions, CFGs","System Design — scalability, load balancers, reverse proxy, caching","AI — embeddings, vector databases, RAG pipelines"],
          dsa:20, project:"Enterprise AI Document Assistant", desc:"Secure PDF RAG pipeline with citations and streaming chat.", stack:["RAG","VECTOR DB"] },
        { name:"Month 4", focus:["DevOps — Docker Compose, GitHub Actions CI/CD, NGINX","Testing — unit, integration, API endpoint suites","DSA — BFS, DFS, shortest path"],
          dsa:30, project:"Scalable Learning Management System", desc:"React + FastAPI + Postgres LMS with full Docker orchestration.", stack:["REACT","FASTAPI"] },
        { name:"Month 5", focus:["Microprocessors — registers, interrupts, instruction execution, assembly","AI — prompt evaluation, function calling, context window, tokenization"],
          dsa:15, project:"AI-Powered Resume Analyzer", desc:"Deployed resume analyzer using LLM tooling & public auth.", stack:["AI","LLM"] },
        { name:"Month 6 (Winter Break + Networks)", focus:["Placement prep — resume, LinkedIn, mock interviews","Computer Networks — TCP/IP, UDP, HTTP/HTTPS, DNS, routing, OSI","Redis, WebSockets, distributed session management"],
          dsa:15, project:"Real-Time Collaboration Platform", desc:"Distributed real-time collaboration over WebSockets & Redis.", stack:["WEBSOCKETS","REDIS"] },
        { name:"Month 7", focus:["Software Engineering — SDLC, Agile/Scrum, UML, requirements, design patterns","Git workflows — PRs, code review, branching strategy (Gitflow)"],
          dsa:10, project:"Enterprise Issue Tracking System", desc:"Agile issue tracker with structured Git workflows.", stack:["REACT","AGILE"] },
        { name:"Month 8", focus:["Serverless — AWS Lambda, API Gateway, RDS","Telemetry — CloudWatch, unified logging, alerting"],
          dsa:10, project:"Serverless URL Shortener", desc:"AWS Lambda + API Gateway + RDS, monitored via CloudWatch.", stack:["AWS LAMBDA","SERVERLESS"] },
        { name:"Month 9", focus:["Distributed Systems — consistent hashing, message queues, CDN, CAP theorem","AI — autonomous agents, tool calling, memory, evaluation"],
          dsa:10, project:"Multi-Agent Research Assistant Engine", desc:"Autonomous AI agents with tool calling and shared memory.", stack:["AI AGENTS","TOOL CALLING"] },
        { name:"Month 10", focus:["Security — OAuth 2.0, JWT, HTTPS, E2E encryption, password hashing, OWASP Top 10","Performance — profiling, micro-benchmarking, optimization"],
          dsa:10, project:"Hardened Auth & Identity Microservice", desc:"OAuth2 identity service hardened against the OWASP Top 10.", stack:["OAUTH2","SECURITY"] },
        { name:"Month 11", focus:["Open source — resolve issues, improve docs, manage PR reviews (5–10 merged)","Portfolio v2 — architecture diagrams, live demos, case studies"],
          dsa:10, project:"Portfolio Platform v2", desc:"Portfolio v2 with architecture diagrams and live demos.", stack:["PORTFOLIO","DOCS"] },
        { name:"Month 12", focus:["Full review — DBMS, OS, Networks, Software Engineering, System Design","Tool review — Docker, AWS, Linux administration"],
          dsa:10, project:"Capstone (pick one)", desc:"Choose one: AI Workspace, Agile Hub, Cloud Storage or Code Editor.", stack:["CAPSTONE"] }
      ],
      milestones: [["CGPA","8.5 – 9.5+"],["DSA problems","600–700 cumulative"],["Projects shipped","18–20 repositories"],["GitHub commits","1,200+"],["Open source","5–10 merged PRs"],["AI systems shipped","3 production apps"]]
    },
    {
      id: 4, label: "Year 4", window: "2029–30", theme: "AI-Proof Engineer",
      goal: "Solve real problems, lead projects, launch a career",
      months: [
        { name:"Month 1", focus:["Finalize electives & scope the Major Project, secure a guide","System Design — API design, scalability, DB selection, monolith vs microservices","Lock in an AI specialization — LLM apps / ML pipelines / CV / NLP"],
          dsa:10, project:"Major Project — Engineering Plan", desc:"Requirements doc, architecture diagrams and DB schema for the capstone.", stack:["SYSTEM DESIGN"] },
        { name:"Month 2", focus:["Cloud — AWS ECS, ECR, VPC, Route 53","DevOps — Terraform IaC, secrets management"],
          dsa:10, project:"Major Project — Core Backend", desc:"Decoupled microservices layer on AWS ECS/ECR/VPC.", stack:["AWS","MICROSERVICES"] },
        { name:"Month 3", focus:["AI Engineering — model evaluation, agent architectures, function calling, structured outputs","Edge security — secure API design, rate limiting, input validation"],
          dsa:10, project:"Major Project — AI Integration", desc:"Agent architectures, function calling and structured outputs.", stack:["AI AGENTS"] },
        { name:"Month 4", focus:["Distributed Systems — message queues, Kafka, event-driven architecture","Observability — Prometheus, Grafana, centralized logging"],
          dsa:10, project:"Major Project — Telemetry", desc:"Prometheus, Grafana and centralized logging hooked in.", stack:["OBSERVABILITY"] },
        { name:"Month 5", focus:["Interview review — DSA, OS, DBMS, Networks, OOP + mock system design"],
          dsa:15, project:"Major Project — Phase I Beta", desc:"Containerized public beta with baseline validation.", stack:["DEPLOYMENT"] },
        { name:"Month 6 (Winter Break)", focus:["Placement sprint — mock interviews, resume, portfolio, behavioral prep","UX polish, query optimization, E2E tests","Advanced AI — fine-tuning, LoRA, quantization, local LLMs"],
          dsa:10, project:"Major Project — UX Refinement", desc:"UI/UX polish, query optimization and end-to-end tests.", stack:["UX","TESTING"] },
        { name:"Month 7", focus:["Open source — target 10–15 merged pull requests"],
          dsa:10, project:"Major Project — Public Release v1.0", desc:"Production launch with public docs and a live codebase.", stack:["RELEASE"] },
        { name:"Month 8", focus:["Target tier-1 companies, AI startups, research labs, grad programs","Overhaul resume, GitHub, LinkedIn, personal website"],
          dsa:10, project:"Digital Profile Overhaul", desc:"Resume, GitHub and personal site rebuilt for recruiting season.", stack:["CAREER"] },
        { name:"Month 9", focus:["Refactoring — design pattern overhaul, clean architecture, domain-driven design"],
          dsa:5, project:"Major Project — Architectural Refactor", desc:"Clean architecture and DDD boundaries enforced across the codebase.", stack:["REFACTOR","DDD"] },
        { name:"Month 10", focus:["Read AI/DL papers, distributed systems whitepapers, top engineering blogs","Technical authorship — blog posts, case studies"],
          dsa:5, project:"Technical Case Studies", desc:"Deep-dive write-ups on solved scalability bottlenecks.", stack:["WRITING"] },
        { name:"Month 11", focus:["Final review sprints — DSA, System Design, SQL, OS, DBMS, Networks, OOP","Live mock interviews & behavioral practice"],
          dsa:10, project:"Interview Rehearsal", desc:"Rehearse system design & DSA defenses for interviews.", stack:["INTERVIEW PREP"] },
        { name:"Month 12", focus:["Major Project Phase II submission, viva prep, GitHub cleanup","Onboarding prep for chosen team / lab"],
          dsa:5, project:"Major Project — Final Submission", desc:"Phase II submission, viva and final GitHub cleanup.", stack:["CAPSTONE"] }
      ],
      milestones: [["CGPA","8.5 – 9.5+"],["DSA problems","800–1,000 cumulative"],["Projects shipped","22–25 repositories"],["GitHub commits","1,800+"],["Open source","10–15 merged PRs"],["Career offers","1–3 tier-1 offers"]]
    }
  ],

  prep: {
    title: "Get ahead before day one",
    tasks: [
      "Install and set up VS Code",
      "Create a GitHub account and install Git",
      "Set up a Linux environment (WSL/Ubuntu) or dual boot",
      "Learn Python basics — variables, loops, functions",
      "Read the first 3 chapters of \"Automate the Boring Stuff with Python\"",
      "Understand binary, decimal and hexadecimal number systems",
      "Learn what AI, ML, DL and LLMs are at a conceptual level",
      "Solve 10 easy problems on LeetCode to get comfortable with the platform"
    ]
  }
};

function buildCurriculumWeekBlueprints(){
  const weeks = [];
  CURRICULUM.years.forEach(year=>{
    year.months.forEach(month=>{
      const dsaPerWeek = Math.max(1, Math.round((month.dsa || 0) / 4));
      const focusPool = Array.isArray(month.focus) && month.focus.length ? month.focus : ["Consolidate & review"];
      for(let weekIndex = 0; weekIndex < 4; weekIndex++){
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
   OFFICIAL B.TECH IT SYLLABUS — by semester
   Each semester ≈ 6 months, 8 semesters across 4 years (aligned
   1:1 with the 48-month roadmap above — semesterIndex = floor(monthGlobalIndex/6))
   ============================================================ */
const SYLLABUS = [
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
window.SYLLABUS = SYLLABUS;
window.REVISION_CYCLE = REVISION_CYCLE;
