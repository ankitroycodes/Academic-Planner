/* ============================================================
   profile.js — TRAJECTORY "my work / output" domain.
   ============================================================
   Merged from (original module boundaries, preserved as section
   headers below so behavior/ownership stays traceable):
     - sub/projects.js  (curated project catalog, engineering badge/
                         skill derivation, project card rendering,
                         roadmap summary, skill matrix, guided
                         repo-submission verification pipeline)
     - sub/resume.js    (resume content derivation from project/
                         profile state; text/Markdown/print-PDF export)
     - sub/github.js    (GitHub/LeetCode/Codeforces/CodeChef profile
                         sync integrations)

   Load-order note: within a single file, all `function`/`const`
   declarations are hoisted or evaluated top-to-bottom in module
   order, same as before — resume.js's dependency on projects.js's
   CURATED_PROJECTS/coreProjectsForUser works the same way it did
   as a cross-file import, now as a same-file reference, because
   this file places the projects.js section first.
   ============================================================ */
import { COLLEGES, collegeFullLabel } from "./data.js";
import {
  Badge, StatusBadge, TagList, ProgressBar, Card,
  getDB, saveDB, showNotice, openDialog,
  uid, hoursIconSVG, difficultyStarsHTML, hoursRangeText, ChecklistRow
} from "./core.js";
import { currentSemesterIndex } from "./dashboard.js";

/* ============================================================
   SECTION: sub/projects.js — the curated project catalog,
   engineering badge/skill derivation, project card rendering
   (curated + custom), the roadmap summary and skill matrix panels,
   and the guided repo-submission verification pipeline.
   ============================================================ */
export const CURATED_PROJECTS = {
  beginner: [
    // ---- Shared fundamentals (core for every track) ----
    { id: "b1", name: "Dynamic Resume Builder", category: "Generalist", track: "generalist", difficulty: 2, hours: [15, 20], desc: "A form-driven app that generates a downloadable, styled PDF resume from user input, with saved versions.", stack: ["React", "PDFKit", "LocalStorage"], concepts: ["Form state management", "PDF generation", "Data persistence"], required: true },
    { id: "b2", name: "Markdown Knowledge Base", category: "Generalist", track: "generalist", difficulty: 2, hours: [15, 20], desc: "A fast, plain-text wiki rendering internal Markdown documentation into hyperlinked, searchable notes.", stack: ["React", "Markdown-it"], concepts: ["Markdown parsing", "Client-side routing", "Search/filter UI"], required: true },
    { id: "b3", name: "Pomodoro Productivity Timer", category: "Generalist", track: "generalist", difficulty: 1, hours: [8, 12], desc: "A focus timer with task logging, streaks, and sound alerts — deployed and usable daily.", stack: ["JavaScript", "LocalStorage"], concepts: ["Timers & intervals", "Local persistence", "State machines"], required: true },
    { id: "b16", name: "Personal Link Hub", category: "Generalist", track: "generalist", difficulty: 2, hours: [12, 16], desc: "A Linktree-style personal page with a drag-to-reorder link list, click analytics, and a public shareable URL.", stack: ["React", "LocalStorage"], concepts: ["Drag-and-drop", "Analytics counting", "Shareable views"], interdisciplinary: "Click analytics is a small Data-tracking skill layered onto a simple UI build." },
    // ---- Full-Stack & Web ----
    { id: "b4", name: "Weather Aggregator", category: "Full-Stack & Web", track: "fullstack", difficulty: 3, hours: [20, 28], desc: "Pulls forecasts from multiple APIs to compare them side by side, with interactive charts and a saved-locations account.", stack: ["Next.js", "Chart.js", "Auth"], concepts: ["API integration", "Authentication", "Chart rendering"], required: true, interdisciplinary: "Adds real user accounts (auth), a skill borrowed from Systems/Security work." },
    { id: "b5", name: "Portfolio CMS", category: "Full-Stack & Web", track: "fullstack", difficulty: 3, hours: [24, 32], desc: "A lightweight admin engine allowing real-time edits to a professional showcase site, backed by a real database and deployed live.", stack: ["React", "Node.js", "Express", "MongoDB"], concepts: ["REST API design", "Schema design", "CRUD operations"], required: true, interdisciplinary: "Requires a live cloud deployment, not just localhost — a Systems/Cloud skill." },
    { id: "b18", name: "URL Shortener with Analytics", category: "Full-Stack & Web", track: "fullstack", difficulty: 4, hours: [26, 34], desc: "Shorten links, redirect through a real backend, and chart click counts, referrers, and geography per link.", stack: ["Node.js", "Express", "PostgreSQL", "Chart.js"], concepts: ["Hash generation", "DB indexing", "Rate limiting"], required: true, interdisciplinary: "Click geography/analytics pulls in a Data-visualization skill." },
    { id: "b19", name: "Job Application Tracker", category: "Full-Stack & Web", track: "fullstack", difficulty: 4, hours: [24, 32], desc: "A Kanban-style board for tracking job applications by stage, with reminders and a deployed multi-user login.", stack: ["Next.js", "PostgreSQL", "Auth"], concepts: ["Schema design", "Authentication", "State transitions"] },
    // ---- AI & ML ----
    { id: "b6", name: "Smart CLI Assistant", category: "AI & ML", track: "ai-ml", difficulty: 3, hours: [16, 22], desc: "A terminal tool that turns natural language into shell commands using an LLM API, packaged as an installable CLI.", stack: ["Python", "OpenAI API", "Click"], concepts: ["LLM API integration", "Prompt design", "CLI packaging"], required: true, interdisciplinary: "Packaging and distributing a CLI tool is a Systems-adjacent skill (not just a notebook)." },
    { id: "b7", name: "Sentiment Analysis API", category: "AI & ML", track: "ai-ml", difficulty: 3, hours: [18, 24], desc: "A fast, deployed API that receives text and returns a sentiment score using a pre-trained model, with request logging.", stack: ["FastAPI", "Transformers", "Docker"], concepts: ["Model inference", "REST API design", "Containerization"], required: true, interdisciplinary: "Wrapping a model behind a real deployed API (not a script) borrows from Full-Stack/Systems." },
    { id: "b8", name: "Resume Parser", category: "AI & ML", track: "ai-ml", difficulty: 3, hours: [18, 24], desc: "Extracts key entities — skills, education, experience — from uploaded PDF resumes and stores results per user.", stack: ["Python", "spaCy", "SQLite"], concepts: ["Entity extraction", "File uploads", "Schema design"], required: true, interdisciplinary: "Persisting parsed results per user pulls in basic Data/DB modeling." },
    { id: "b20", name: "Image Classifier Web Demo", category: "AI & ML", track: "ai-ml", difficulty: 3, hours: [20, 28], desc: "Train a small image classifier and serve predictions through a deployed web app with drag-and-drop uploads.", stack: ["PyTorch", "FastAPI", "React"], concepts: ["Model training", "Inference serving", "File uploads"], interdisciplinary: "Serving predictions behind a web UI borrows a Full-Stack skill." },
    // ---- Systems & Cloud ----
    { id: "b9", name: "Static Site on Cloud Storage", category: "Systems & Cloud", track: "systems", difficulty: 3, hours: [16, 22], desc: "Deploy a portfolio via cloud object storage and a CDN, provisioned with Terraform, with a CI step that redeploys on push.", stack: ["Terraform", "AWS S3", "CloudFront", "GitHub Actions"], concepts: ["Infrastructure as Code", "CDN & hosting", "CI/CD basics"], required: true, interdisciplinary: "The CI redeploy step is a Full-Stack/DevOps workflow skill, not pure infra." },
    { id: "b10", name: "Containerized CRUD App", category: "Systems & Cloud", track: "systems", difficulty: 3, hours: [18, 24], desc: "Write a Dockerfile and docker-compose.yml for a small Node/Mongo application with a real login flow.", stack: ["Docker", "Node.js", "MongoDB", "Auth"], concepts: ["Containerization", "Orchestration", "Authentication"], required: true, interdisciplinary: "Adds authentication — usually a Full-Stack/Security concern — to an infra-focused build." },
    { id: "b11", name: "Uptime Monitor", category: "Systems & Cloud", track: "systems", difficulty: 3, hours: [16, 22], desc: "A script that pings a list of URLs on a schedule, logs failures, and charts response-time trends on a small dashboard.", stack: ["Go", "Cron", "SQLite"], concepts: ["Scheduled jobs", "Health checks", "Time-series logging"], required: true, interdisciplinary: "The trend dashboard is a Data-visualization skill layered onto an infra tool." },
    { id: "b22", name: "Self-Hosted Git Backup Tool", category: "Systems & Cloud", track: "systems", difficulty: 2, hours: [12, 18], desc: "A CLI/cron tool that mirrors a list of GitHub repos to a private cloud bucket nightly, with a Slack alert on failure.", stack: ["Python", "Cron", "AWS S3"], concepts: ["Scheduled jobs", "Cloud storage", "Notifications"], interdisciplinary: "The Slack alert integration is a small API/Full-Stack skill." },
    // ---- Data & Analytics ----
    { id: "b12", name: "Web Scraper to CSV", category: "Data & Analytics", track: "data", difficulty: 2, hours: [14, 20], desc: "Extracts structured data from a website on a schedule, writes it to CSV, and serves it through a small API.", stack: ["Python", "BeautifulSoup", "FastAPI"], concepts: ["HTML parsing", "Scheduled jobs", "REST API design"], required: true, interdisciplinary: "Serving scraped data through an API is a Full-Stack/backend skill." },
    { id: "b13", name: "Interactive Data Dashboard", category: "Data & Analytics", track: "data", difficulty: 2, hours: [14, 20], desc: "Visualize a static dataset — housing prices, sales, etc. — with filters, charts, and a shareable deployed link.", stack: ["Python", "Streamlit"], concepts: ["Data visualization", "Filtering & aggregation", "Cloud deployment"], required: true, interdisciplinary: "Deploying and sharing it publicly is a Systems/Cloud skill." },
    { id: "b24", name: "ETL Pipeline for Public Datasets", category: "Data & Analytics", track: "data", difficulty: 3, hours: [18, 24], desc: "A scheduled pipeline that pulls a public dataset, cleans and normalizes it, and loads it into a queryable database.", stack: ["Python", "Pandas", "PostgreSQL", "Cron"], concepts: ["ETL pipeline design", "Data cleaning", "Schema design"], required: true, interdisciplinary: "Scheduling the pipeline reliably is a Systems/DevOps skill." },
    { id: "b25", name: "Survey Data Analyzer", category: "Data & Analytics", track: "data", difficulty: 2, hours: [14, 20], desc: "Upload a CSV of survey responses and auto-generate summary stats, correlation charts, and a downloadable report.", stack: ["Python", "Pandas", "Matplotlib"], concepts: ["Statistical summarization", "Data visualization", "Report generation"] },
    // ---- Security & Low-Level ----
    { id: "b14", name: "Custom HTTP Server", category: "Security & Low-Level", track: "security", difficulty: 4, hours: [24, 32], desc: "A basic web server built from scratch handling GET/POST requests without a framework, with basic auth headers implemented by hand.", stack: ["C", "Sockets"], concepts: ["Socket programming", "HTTP internals", "Request lifecycle"], required: true, interdisciplinary: "Hand-rolling auth headers ties directly into Full-Stack authentication concepts." },
    { id: "b15", name: "Key-Value Store (In-Memory)", category: "Security & Low-Level", track: "security", difficulty: 4, hours: [24, 32], desc: "A simple Redis clone supporting GET, SET, and DEL operations over a socket, with a tiny CLI client for it.", stack: ["Rust", "TCP"], concepts: ["Socket programming", "In-memory data structures", "Protocol design"], required: true, interdisciplinary: "Writing the CLI client mirrors the CLI-tooling skill from the AI/ML track's beginner project." },
    { id: "b26", name: "Password Strength & Breach Checker", category: "Security & Low-Level", track: "security", difficulty: 2, hours: [12, 18], desc: "A CLI/web tool that scores password strength and checks it against known breach hashes via a k-anonymity API call.", stack: ["Python", "Requests", "Hashing"], concepts: ["Password hashing", "API integration", "Input validation"], required: true, interdisciplinary: "The web front-end for it is a small Full-Stack skill." },
  ],
  intermediate: [
    // ---- Shared fundamentals (core for every track) ----
    { id: "i1", name: "Real-Time Chat App", category: "Generalist", track: "generalist", difficulty: 4, hours: [30, 40], desc: "Instant messaging with user presence (online/offline), multiple chat rooms, and persisted message history.", stack: ["WebSockets", "Node.js", "PostgreSQL"], concepts: ["WebSockets", "Presence tracking", "Real-time state sync"], required: true },
    { id: "i2", name: "Personal Finance Dashboard", category: "Generalist", track: "generalist", difficulty: 3, hours: [26, 34], desc: "Aggregate expenses, model test investment portfolios, and track savings goals over time, deployed with real auth.", stack: ["React", "Chart.js", "FastAPI", "Auth"], concepts: ["Data aggregation", "Authentication", "Chart rendering"], required: true },
    { id: "i13", name: "Collaborative Document Editor", category: "Generalist", track: "generalist", difficulty: 5, hours: [40, 55], desc: "A Google-Docs-lite app with live multi-cursor editing, version history, and shareable read/write links.", stack: ["WebSockets", "React", "PostgreSQL"], concepts: ["Conflict resolution", "WebSockets", "Version history"], required: true, interdisciplinary: "Conflict resolution for concurrent edits borrows a Systems/distributed-state skill." },
    { id: "i14", name: "Team Wiki with Permissions", category: "Generalist", track: "generalist", difficulty: 3, hours: [28, 36], desc: "A multi-user knowledge base with role-based page permissions, revision history, and full-text search.", stack: ["Next.js", "PostgreSQL", "Auth"], concepts: ["Role-based permissions", "Full-text search", "Revision history"] },
    // ---- Full-Stack & Web ----
    { id: "i3", name: "Multi-Tenant E-Commerce Storefront", category: "Full-Stack & Web", track: "fullstack", difficulty: 5, hours: [40, 55], desc: "A functional shopping cart with Stripe payments, a basic admin panel for inventory, and an AI-generated product description feature.", stack: ["Next.js", "Stripe", "Postgres", "OpenAI API"], concepts: ["Payment integration", "Admin panels", "Authentication"], required: true, interdisciplinary: "The AI product-description feature borrows an AI/ML integration skill." },
    { id: "i4", name: "Event Ticketing Platform", category: "Full-Stack & Web", track: "fullstack", difficulty: 4, hours: [32, 42], desc: "Users create events; others reserve or buy tickets, with QR code generation, deployed via a full CI/CD pipeline.", stack: ["Next.js", "Prisma", "PostgreSQL", "GitHub Actions"], concepts: ["QR code generation", "CI/CD pipelines", "Schema design"], required: true, interdisciplinary: "Wiring up real CI/CD is a Systems/DevOps skill applied to a product build." },
    { id: "i15", name: "Marketplace with Reviews & Search", category: "Full-Stack & Web", track: "fullstack", difficulty: 5, hours: [40, 55], desc: "A two-sided marketplace (listings + buyers) with full-text search, ratings, and a moderation queue for new listings.", stack: ["Next.js", "PostgreSQL", "Elasticsearch"], concepts: ["Full-text search", "Marketplace modeling", "Moderation workflows"], required: true, interdisciplinary: "Full-text search infrastructure borrows a Data/Systems skill." },
    { id: "i16", name: "Booking & Scheduling System", category: "Full-Stack & Web", track: "fullstack", difficulty: 4, hours: [28, 38], desc: "A Calendly-style booking flow with timezone handling, availability rules, and automated email confirmations.", stack: ["Next.js", "PostgreSQL", "Auth"], concepts: ["Timezone handling", "Scheduling logic", "Transactional email"] },
    // ---- AI & ML ----
    { id: "i5", name: "RAG Document Q&A", category: "AI & ML", track: "ai-ml", difficulty: 4, hours: [32, 42], desc: "Upload a long PDF, embed it into a vector database, and chat with an LLM about its contents through a deployed, authenticated web app.", stack: ["LangChain", "Pinecone", "Python", "Next.js", "Auth"], concepts: ["Vector embeddings", "RAG", "Document chunking"], required: true, interdisciplinary: "Wrapping the pipeline in a real authenticated web app is a Full-Stack skill, not just a script." },
    { id: "i6", name: "Voice-to-Text Meeting Summarizer", category: "AI & ML", track: "ai-ml", difficulty: 4, hours: [28, 36], desc: "Transcribe audio with Whisper, generate action items with an LLM, and store transcripts per user in a database.", stack: ["Whisper API", "Python", "PostgreSQL"], concepts: ["Speech-to-text", "LLM summarization", "Schema design"], required: true, interdisciplinary: "Storing and querying transcripts per user pulls in Data/DB modeling." },
    { id: "i17", name: "Fine-Tuned Domain Classifier", category: "AI & ML", track: "ai-ml", difficulty: 5, hours: [40, 55], desc: "Fine-tune a small open model on a labeled domain-specific dataset and serve it behind a rate-limited API with a live demo UI.", stack: ["PyTorch", "HuggingFace", "FastAPI"], concepts: ["Model fine-tuning", "Dataset labeling", "Rate limiting"], required: true, interdisciplinary: "Rate-limiting the served API is a Systems/Security skill." },
    { id: "i18", name: "Recommendation Engine", category: "AI & ML", track: "ai-ml", difficulty: 4, hours: [30, 40], desc: "A collaborative-filtering recommender for a small product catalog, with a deployed API and a simple explore/rate UI.", stack: ["Python", "Scikit-learn", "FastAPI", "React"], concepts: ["Collaborative filtering", "Feature engineering", "Evaluation metrics"] },
    // ---- Systems & Cloud ----
    { id: "i7", name: "Full CI/CD Pipeline", category: "Systems & Cloud", track: "systems", difficulty: 4, hours: [26, 34], desc: "A GitHub Actions workflow that lints, tests, builds a Docker image, and deploys a real full-stack app to staging on push.", stack: ["GitHub Actions", "Docker"], concepts: ["CI/CD pipelines", "Automated testing", "Docker builds"], required: true, interdisciplinary: "Requires an actual app with tests behind it — a Full-Stack/QA skill, not infra in isolation." },
    { id: "i8", name: "Serverless Image Processor", category: "Systems & Cloud", track: "systems", difficulty: 4, hours: [26, 34], desc: "A Lambda function triggered by an upload that resizes images, generates thumbnails, and logs processing metrics to a dashboard.", stack: ["AWS Lambda", "S3", "CloudWatch"], concepts: ["Serverless functions", "Event triggers", "Object storage"], required: true, interdisciplinary: "The metrics dashboard is a Data-visualization skill on top of serverless infra." },
    { id: "i19", name: "Infrastructure-as-Code Multi-Environment Setup", category: "Systems & Cloud", track: "systems", difficulty: 5, hours: [36, 48], desc: "Provision matching dev/staging/prod environments with Terraform modules and a one-command promotion workflow between them.", stack: ["Terraform", "AWS", "GitHub Actions"], concepts: ["Infrastructure as Code", "Multi-environment provisioning", "CI/CD pipelines"], required: true, interdisciplinary: "The promotion workflow needs a real deployable app behind it — a Full-Stack skill." },
    { id: "i20", name: "Log Aggregation & Alerting Stack", category: "Systems & Cloud", track: "systems", difficulty: 4, hours: [28, 36], desc: "Ship logs from multiple services into a central store, build searchable dashboards, and configure threshold-based alerts.", stack: ["ELK Stack", "Docker"], concepts: ["Log aggregation", "Alerting rules", "Dashboarding"] },
    // ---- Data & Analytics ----
    { id: "i9", name: "Real-Time Crypto Price Tracker", category: "Data & Analytics", track: "data", difficulty: 4, hours: [28, 36], desc: "Ingest live price streams into a time-series database, chart the moving average, and expose alerts through a deployed API.", stack: ["Python", "InfluxDB", "WebSockets", "FastAPI"], concepts: ["Time-series databases", "WebSocket streaming", "Alerting logic"], required: true, interdisciplinary: "Exposing alerts via a live API is a Full-Stack/backend skill on top of the pipeline." },
    { id: "i10", name: "Batch Processing with PySpark", category: "Data & Analytics", track: "data", difficulty: 4, hours: [30, 40], desc: "Process a 1GB+ dataset with Spark to extract aggregated metrics, running as a scheduled containerized job.", stack: ["PySpark", "Python", "Docker"], concepts: ["Batch processing", "Data aggregation at scale", "Job scheduling"], required: true, interdisciplinary: "Containerizing and scheduling the job is a Systems/DevOps skill." },
    { id: "i21", name: "Data Warehouse + BI Dashboard", category: "Data & Analytics", track: "data", difficulty: 5, hours: [36, 48], desc: "Model a star schema for a sample business dataset, load it into a warehouse, and build a live BI dashboard on top.", stack: ["dbt", "PostgreSQL", "Metabase"], concepts: ["Star schema modeling", "Data warehousing", "BI dashboarding"], required: true, interdisciplinary: "Serving the dashboard to multiple users touches a Full-Stack/auth concern." },
    { id: "i22", name: "A/B Test Analysis Toolkit", category: "Data & Analytics", track: "data", difficulty: 3, hours: [22, 30], desc: "Simulate experiment data, compute statistical significance, and present results through an interactive report generator.", stack: ["Python", "SciPy", "Streamlit"], concepts: ["Significance testing", "Experiment simulation", "Report generation"] },
    // ---- Security & Low-Level ----
    { id: "i11", name: "Rate Limiting Middleware", category: "Security & Low-Level", track: "security", difficulty: 4, hours: [26, 34], desc: "Implement token bucket or sliding window algorithms to protect a real deployed API from abuse, with a small dashboard of blocked requests.", stack: ["Go", "Redis"], concepts: ["Rate limiting algorithms", "Middleware design", "Abuse prevention"], required: true, interdisciplinary: "The blocked-requests dashboard is a Data-visualization skill layered on a security tool." },
    { id: "i12", name: "Custom Load Balancer", category: "Security & Low-Level", track: "security", difficulty: 4, hours: [28, 36], desc: "A proxy server that distributes incoming HTTP requests across backend instances, load-testing against a real deployed app.", stack: ["Go", "Round Robin"], concepts: ["Load balancing", "Proxy servers", "Load testing"], required: true, interdisciplinary: "Load-testing against a real app connects it to Full-Stack/Systems work." },
    { id: "i23", name: "JWT Auth Server from Scratch", category: "Security & Low-Level", track: "security", difficulty: 5, hours: [34, 44], desc: "Hand-roll a token-based auth server — signing, verification, refresh rotation — and issue tokens to a real client app.", stack: ["Rust", "JWT", "PostgreSQL"], concepts: ["JWT signing/verification", "Token rotation", "Schema design"], required: true, interdisciplinary: "Issuing tokens to a real client app is a Full-Stack integration skill." },
    { id: "i24", name: "Vulnerability Scanner for Web Apps", category: "Security & Low-Level", track: "security", difficulty: 4, hours: [24, 32], desc: "A CLI tool that checks a target URL for common misconfigurations (missing headers, open CORS, verbose errors) and reports findings.", stack: ["Python", "Requests"], concepts: ["Misconfig detection", "HTTP header analysis", "CLI tooling"] },
  ],
  major: [
    // ---- Shared fundamentals (core for every track) ----
    { id: "m1", name: "AI Academic OS (Trajectory)", category: "Generalist", track: "generalist", difficulty: 5, hours: [200, 320], desc: "Complete ecosystem managing academic planning, milestones, resumes, and predictive AI analytics — full-stack, deployed, with real auth and a database.", stack: ["Next.js", "OpenAI", "Python", "PostgreSQL", "Auth"], concepts: ["Full-stack architecture", "Authentication", "Predictive analytics"], required: true },
    { id: "m7", name: "Multi-Product SaaS Platform", category: "Generalist", track: "generalist", difficulty: 5, hours: [220, 340], desc: "A billed, multi-tenant SaaS with team workspaces, role permissions, Stripe subscriptions, and an admin analytics console.", stack: ["Next.js", "Stripe", "PostgreSQL", "Auth"], concepts: ["Multi-tenancy", "Subscription billing", "Access control"], required: true, interdisciplinary: "Subscription billing and tenant isolation pull in Systems/Security concerns." },
    // ---- Full-Stack & Web ----
    { id: "m2", name: "Collaborative Kanban Board", category: "Full-Stack & Web", track: "fullstack", difficulty: 5, hours: [160, 240], desc: "A Trello clone with real-time state sync, drag-and-drop, user roles, activity logs, and an AI feature that auto-suggests task priority.", stack: ["Next.js", "WebSockets", "Postgres", "OpenAI API"], concepts: ["Real-time state sync", "Drag-and-drop UI", "Access control"], required: true, interdisciplinary: "The AI-suggested priority feature pulls in an ML integration skill on top of the product build." },
    { id: "m8", name: "Video Conferencing MVP", category: "Full-Stack & Web", track: "fullstack", difficulty: 5, hours: [180, 260], desc: "A WebRTC-based video calling app with screen share, chat sidebar, and recorded-session playback, deployed for real multi-user rooms.", stack: ["WebRTC", "Next.js", "PostgreSQL"], concepts: ["Real-time media", "Signaling", "Session recording"], interdisciplinary: "Real-time media routing at scale borrows a Systems/infra skill." },
    // ---- AI & ML ----
    { id: "m3", name: "Autonomous AI Support Agent", category: "AI & ML", track: "ai-ml", difficulty: 5, hours: [180, 260], desc: "An agentic system that queries an internal DB, drafts responses, and executes actions with human-in-the-loop approval, deployed behind a monitored, rate-limited API.", stack: ["LangChain", "MCP", "Python", "Redis", "Monitoring"], concepts: ["Agentic workflows", "Human-in-the-loop approval", "Rate limiting"], required: true, interdisciplinary: "Rate limiting and monitoring the agent's API is a Systems/Security skill, not just prompt design." },
    { id: "m9", name: "Multi-Modal Content Moderation Platform", category: "AI & ML", track: "ai-ml", difficulty: 5, hours: [180, 260], desc: "A pipeline that classifies uploaded text/image content for policy violations in real time, with a human-review dashboard and audit log.", stack: ["PyTorch", "FastAPI", "PostgreSQL", "React"], concepts: ["Multi-modal inference", "Classification pipelines", "Audit logging"], interdisciplinary: "The review dashboard and audit log are a Full-Stack/Data-tracking skill on top of the models." },
    // ---- Systems & Cloud ----
    { id: "m4", name: "High-Availability Kubernetes Cluster", category: "Systems & Cloud", track: "systems", difficulty: 5, hours: [160, 240], desc: "Deploy a real multi-service app to a managed Kubernetes cluster with auto-scaling, load balancing, integrated monitoring, and a usage-analytics dashboard.", stack: ["Kubernetes", "Prometheus", "Grafana"], concepts: ["Kubernetes orchestration", "Auto-scaling", "Load balancing"], required: true, interdisciplinary: "The usage-analytics dashboard is a Data-visualization skill built on top of the infra." },
    { id: "m10", name: "Multi-Region Disaster Recovery Setup", category: "Systems & Cloud", track: "systems", difficulty: 5, hours: [160, 240], desc: "Architect and implement automated failover between two cloud regions for a live app, with health checks and a status-page dashboard.", stack: ["Terraform", "AWS", "Route 53"], concepts: ["Multi-region architecture", "Automated failover", "Health checks"], interdisciplinary: "The public status page consuming health data is a Full-Stack skill." },
    // ---- Data & Analytics ----
    { id: "m5", name: "Distributed Clickstream Pipeline", category: "Data & Analytics", track: "data", difficulty: 5, hours: [180, 260], desc: "Capture simulated clicks, stream them through Kafka, process in real time, and serve live analytics through an authenticated web dashboard.", stack: ["Kafka", "Python", "Next.js", "Auth"], concepts: ["Event streaming", "Real-time processing", "Pipeline design"], required: true, interdisciplinary: "The authenticated dashboard consuming the pipeline is a Full-Stack skill." },
    { id: "m11", name: "ML Feature Store & Model-Serving Platform", category: "Data & Analytics", track: "data", difficulty: 5, hours: [180, 260], desc: "A versioned feature store feeding multiple models in production, with a serving API, drift monitoring, and a metrics dashboard.", stack: ["Python", "Redis", "FastAPI", "Grafana"], concepts: ["Feature store design", "Model versioning", "Drift monitoring"], interdisciplinary: "Drift monitoring and dashboards borrow an AI/ML + Systems skill combo." },
    // ---- Security & Low-Level ----
    { id: "m6", name: "Distributed Message Queue", category: "Security & Low-Level", track: "security", difficulty: 5, hours: [200, 300], desc: "A custom broker handling topics, partitions, and subscriber acknowledgments — focused on throughput and fault tolerance, with a monitoring dashboard exposing queue health.", stack: ["Rust", "TCP", "Consensus", "Grafana"], concepts: ["Broker internals", "Partitioning", "Fault tolerance"], required: true, interdisciplinary: "Exposing queue health on a dashboard borrows Data-visualization and Systems/monitoring skills." },
    { id: "m12", name: "Zero-Trust Service Mesh", category: "Security & Low-Level", track: "security", difficulty: 5, hours: [180, 260], desc: "Implement mutual TLS and policy-based access control between a set of microservices, with an access-log audit dashboard.", stack: ["Rust", "mTLS", "Envoy"], concepts: ["Mutual TLS", "Policy-based access control", "Service mesh"], interdisciplinary: "The audit dashboard consuming access logs is a Full-Stack/Data skill." },
  ]
};

// Shared completion checklist per tier — what "done" means beyond "the code
// runs", per doc feedback: a project isn't finished at the demo, it's
// finished when it looks like something a hiring engineer would trust.
// Kept once per tier instead of duplicated 63x so the bar can be raised
// (or tuned per tier) in one place.
export const TIER_DELIVERABLES = {
  beginner: [
    "Public GitHub repository",
    "README with setup instructions",
    "Live deployment or working local demo",
    "At least one screenshot or short demo GIF",
    ".env.example for any config/secrets",
    "License file"
  ],
  intermediate: [
    "Public GitHub repository",
    "Professional README (setup, features, screenshots)",
    "Live deployment",
    "Demo GIF or short video walkthrough",
    ".env.example for any config/secrets",
    "License file",
    "Dockerized (Dockerfile or docker-compose)",
    "Basic CI pipeline (lint/build/test on push)",
    "At least a handful of automated tests",
    "Basic API documentation (if the project exposes an API)"
  ],
  major: [
    "Public GitHub repository with Releases/tags",
    "Professional README (setup, features, architecture, screenshots)",
    "Live deployment on real infrastructure",
    "Demo GIF or recorded walkthrough",
    "Architecture diagram",
    ".env.example for any config/secrets",
    "License file",
    "Dockerized and containerized for deployment",
    "Full CI/CD pipeline (build, test, deploy)",
    "Automated test suite (unit + integration, ideally some E2E)",
    "API documentation",
    "Basic monitoring/logging in production",
    "Issues and milestones tracked on GitHub"
  ]
};

// Engineering badges are DERIVED from a project's stack/concepts/track,
// never hand-set — this keeps them from silently drifting out of sync as
// projects are added or edited. A badge only appears if the underlying
// stack or concept list actually supports it.
export function badgesForProject(p){
  const stack = (p.stack || []).join(" ").toLowerCase();
  const concepts = (p.concepts || []).join(" ").toLowerCase();
  const all = stack + " " + concepts;
  const badges = [];

  if (/docker/.test(all)) badges.push("Dockerized");
  if (/ci\/cd|github actions|ci pipeline|deployment automation/.test(all)) badges.push("CI/CD");
  if (/test/.test(concepts)) badges.push("Tested");
  if (/auth|jwt|oauth/.test(all)) badges.push("Secure Auth");
  if (/rate limit|input validation|hashing|csrf|xss|sql injection|mutual tls|policy-based access/.test(all)) badges.push("Security-Hardened");
  if (/monitoring|observability|prometheus|grafana|cloudwatch|alerting/.test(all)) badges.push("Monitored");
  if (/kubernetes|terraform|lambda|s3|cloudfront|aws|serverless|multi-region/.test(all)) badges.push("Cloud Deployed");
  if (/chart|dashboard|visualization/.test(all)) badges.push("Data Visualized");
  if (/websocket|real-time/.test(all)) badges.push("Real-Time");
  if (/responsive|react|next\.js/.test(stack)) badges.push("Responsive UI");

  return badges;
}

// Engineering-concept coverage per project, used to build the cross-project
// Skill Matrix. Buckets are intentionally broader than `concepts` (which is
// per-project and specific) — this groups every project's concepts into a
// fixed set of dimensions so coverage can be compared/aggregated across the
// whole curriculum.
export const SKILL_DIMENSIONS = ["Frontend", "Backend", "Databases", "DevOps/Cloud", "Testing", "AI/ML", "Security", "Data/Analytics", "System Design", "Networking"];

export function skillDimensionsForProject(p){
  const stack = (p.stack || []).join(" ").toLowerCase();
  const concepts = (p.concepts || []).join(" ").toLowerCase();
  const all = stack + " " + concepts;
  const dims = new Set();

  if (/react|next\.js|vue|frontend|ui|drag-and-drop|component/.test(all)) dims.add("Frontend");
  if (/node\.js|express|fastapi|api design|rest|graphql|server|backend/.test(all)) dims.add("Backend");
  if (/postgres|mongo|sqlite|redis|database|schema design|indexing|warehous/.test(all)) dims.add("Databases");
  if (/docker|kubernetes|terraform|ci\/cd|github actions|lambda|serverless|cloud|deployment/.test(all)) dims.add("DevOps/Cloud");
  if (/test/.test(all)) dims.add("Testing");
  if (/openai|llm|langchain|pytorch|huggingface|transformers|embedding|model|ml\b|ai\b|nlp|spacy/.test(all)) dims.add("AI/ML");
  if (/auth|jwt|security|hashing|csrf|xss|sql injection|rate limit|mutual tls|access control|vulnerability/.test(all)) dims.add("Security");
  if (/pandas|spark|kafka|etl|analytics|data pipeline|streamlit|dashboard|warehous|statistical/.test(all)) dims.add("Data/Analytics");
  if (/architecture|distributed|consensus|partition|design|scale|scalab/.test(all)) dims.add("System Design");
  if (/socket|tcp|http protocol|proxy|load balanc|network/.test(all)) dims.add("Networking");

  return Array.from(dims);
}

export const TRACK_FILTER_META = {
  generalist: "Generalist",
  fullstack: "Full-Stack",
  "ai-ml": "AI & ML",
  systems: "Systems & Cloud",
  data: "Data",
  security: "Security"
};

// Tiny 12px stroke icons for the domain filter chips — mirrors lucide's
// Zap/Target/GitBranch/Brain/Cloud/Database/Shield glyphs without pulling
// in a library, since this app is plain HTML/CSS/JS.
export const TRACK_FILTER_ICONS = {
  all: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  generalist: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  fullstack: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>`,
  "ai-ml": `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2a2.5 2.5 0 0 1 2.5 2.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.44-4.06Z"/><path d="M14.5 2a2.5 2.5 0 0 0-2.5 2.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.44-4.06Z"/></svg>`,
  systems: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
  data: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  security: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>`
};

// A project counts toward someone's "core" path only if it's track-agnostic
// (generalist) or matches their chosen specialization. Without this, the
// core count/progress would include every specialization's required build,
// which nobody is meant to ship all of — used by renderProjectsSummary,
// projectCardHTML's "Core pick" badge, and computeResumeReadiness so they
// never disagree with each other.
export function coreProjectsForUser(tierProjects){
  const DB = getDB();
  const userTrack = (DB.profile && DB.profile.track) || null;
  return tierProjects.filter(p => p.required && (p.track === "generalist" || p.track === userTrack));
}

let projectsFilter = "all";
let trackProjectsFilter = "all";

function qualityScoreHTML(meta){
  if(typeof meta.qualityScore !== "number") return "";
  const tier = meta.qualityScore>=70 ? "high" : meta.qualityScore>=40 ? "mid" : "low";
  return `<div class="project-quality-score" data-score-tier="${tier}">
    <span>Quality ${meta.qualityScore}/100</span>
    ${ProgressBar({ pct: meta.qualityScore, style: "quality", tier })}
  </div>`;
}

/**
 * Shared card renderer for both curated and custom projects. The two kinds
 * differ only in: id source, category/module label, description styling,
 * star count derivation, meta-line content, and submit-button dataset flag —
 * everything else (badges, quality score, verified badge, actions shell)
 * was previously duplicated verbatim between projectCardHTML/customCardHTML.
 */
function projectCardHTMLShared({ id, name, desc, descClass, stack, concepts, difficulty, hours, badges, category, status, metaLineHTML, githubStatsHTML, isCustom, isRecommended, interdisciplinaryNote }){
  const DB = getDB();
  const isShipped = status === "shipped";
  const meta = DB.projects.meta[id] || {};
  const qualityLine = isShipped ? qualityScoreHTML(meta) : "";
  const verifiedBadge = isShipped && meta.verifiedOwner
    ? Badge({ label: `@${meta.verifiedOwner}`, variant: "verified", title: "Owner verified at submission", icon: "✓ " })
    : "";
  const recommendedBadge = isRecommended
    ? Badge({ label: "Core pick", variant: "recommended", title: "Part of your track's core build path" })
    : "";
  const isCurrent = status === "progress";
  const crossSkillHTML = interdisciplinaryNote ? `<div class="pc-cross-skill"><span class="pc-cross-skill-label">Cross-domain skill</span> ${interdisciplinaryNote}</div>` : "";

  const difficultyHTML = difficulty ? `<span class="pc-difficulty" title="Difficulty ${difficulty}/5"><span class="pc-difficulty-stars">${difficultyStarsHTML(difficulty)}</span></span>` : "";
  const hoursHTML = hours ? `<span class="pc-hours">${hoursIconSVG}${hoursRangeText(hours)}</span>` : "";

  const conceptsHTML = (concepts && concepts.length) ? `
      <div class="pc-concepts">
        <div class="pc-concepts-label">Engineering concepts</div>
        <div class="pc-stack pc-concepts-list">${TagList(concepts)}</div>
      </div>` : "";

  const engBadgesHTML = (badges && badges.length)
    ? `<div class="pc-eng-badges">${badges.map(b => Badge({ label: b, variant: "engineering" })).join("")}</div>`
    : "";

  const startBtn = isShipped
    ? `<button class="btn btn-primary btn-sm" disabled>Shipped ✓</button>`
    : `<button class="btn btn-ghost btn-sm" data-${isCustom ? "custom-start" : "toggle-start-pid"}="${id}">${status==="progress" ? "In progress" : "Start"}</button>`;
  const submitBtn = `<button class="pc-code-btn" data-submit-pid="${id}"${isCustom ? ' data-submit-custom="1"' : ""} title="${isShipped ? "View or replace" : "Submit"} verified repository">${isShipped ? "&lt;/&gt;" : "Submit repo"}</button>`;

  return `
    <div class="project-card ${isCurrent?'is-current':''} ${isShipped?'is-shipped':''}" data-${isCustom ? "custom" : "pid"}="${id}">
      <div class="pc-top">
        <div class="pc-badges">
          ${StatusBadge(status)}
          ${Badge({ label: category, variant: "module" })}
          ${recommendedBadge}
          ${verifiedBadge}
        </div>
        ${difficultyHTML}
      </div>
      <div class="pc-title">${name}</div>
      <div class="${descClass}">${desc || ""}</div>
      <div class="pc-stack-label">Stack</div>
      <div class="pc-stack">${TagList(stack)}</div>
      ${conceptsHTML}
      ${engBadgesHTML}
      ${crossSkillHTML}
      ${githubStatsHTML || ""}
      ${qualityLine}
      <div class="pc-foot">
        <div class="pc-meta">${hoursHTML}${metaLineHTML ? ` · ${metaLineHTML}` : ""}</div>
        <div class="pc-actions">
          ${startBtn}
          ${submitBtn}
        </div>
      </div>
    </div>`;
}

function projectCardHTML(proj, level){
  const DB = getDB();
  const id = proj.id;
  const isShipped = !!DB.projects.shipped[id];
  const isStarted = !!DB.projects.started[id];
  const status = isShipped ? "shipped" : isStarted ? "progress" : "planned";

  const meta = DB.projects.meta[id] || {};
  const repoPart = meta.repo ? `<a href="${meta.repo}" target="_blank" rel="noopener">Repo ↗</a>` : "No repo";
  const livePart = meta.live ? `<a href="${meta.live}" target="_blank" rel="noopener">Live ↗</a>` : (meta.repo ? "Not live" : "");
  const metaLineHTML = livePart ? `${repoPart} · ${livePart}` : repoPart;
  const githubStatsHTML = meta.lastSyncedAt
    ? `<div class="project-github-stats">GitHub · ${meta.language || "code"} · ${meta.stars || 0} stars · ${meta.openIssues || 0} open issues</div>`
    : "";

  // "Core pick" only applies if this project is track-agnostic (generalist)
  // or matches the user's chosen specialization — mirrors
  // renderProjectsSummary so the badge and the core progress count never
  // disagree.
  const isCoreForUser = coreProjectsForUser([proj]).length > 0;

  return projectCardHTMLShared({
    id, name: proj.name, desc: proj.desc, descClass: "pc-desc", stack: proj.stack,
    concepts: proj.concepts, difficulty: proj.difficulty, hours: proj.hours, badges: badgesForProject(proj),
    category: proj.category, status, metaLineHTML, githubStatsHTML, isCustom: false, isRecommended: isCoreForUser,
    interdisciplinaryNote: proj.interdisciplinary || ""
  });
}

function customCardHTML(c){
  return projectCardHTMLShared({
    id: c.id, name: c.name, desc: c.desc, descClass: "pc-desc pc-desc-mono", stack: c.stack,
    category: "CUSTOM AI BUILD", stars: c.stars || 5, status: c.status, metaLineHTML: "Custom Scoped", isCustom: true
  });
}

function renderProjectsSummary() {
  const DB = getDB();
  const tierMeta = {
    beginner: { label: "Beginner Projects", tier: "I", weeks: "2–3 WEEKS EACH", colorVar: "--accent", dimVar: "--accent-dim" },
    intermediate: { label: "Intermediate Projects", tier: "II", weeks: "6–8 WEEKS EACH", colorVar: "--amber", dimVar: "--amber-dim" },
    major: { label: "Major Capstone", tier: "III", weeks: "4–8 MONTHS", colorVar: "--green", dimVar: "--green-dim" }
  };

  // A project only counts toward someone's "core" if it's track-agnostic
  // (generalist) or matches their chosen specialization — otherwise the core
  // count would include every track's required build, which nobody is
  // meant to ship all of.
  const groups = ["beginner", "intermediate", "major"].map(key=>{
    const all = CURATED_PROJECTS[key];
    const required = coreProjectsForUser(all);
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
        <div class="roadmap-tier-top" data-weeks="${g.weeks}">
          <span class="roadmap-tier-label">Tier ${g.tier}</span>
          ${complete ? `<span class="roadmap-tier-done">Core done</span>` : ""}
        </div>
        <div class="roadmap-tier-count"><strong>${g.requiredShipped}</strong><span>/${g.requiredTotal} core</span></div>
        <div class="roadmap-tier-track">${ProgressBar({ pct, style: "year", color: "var(--tier-color)" })}</div>
        <div class="roadmap-tier-foot" data-label="${g.label}">
          <span>${g.allTotal - g.requiredTotal} more optional</span>
          ${bonusNote}
        </div>
      </div>`;
  }).join("");

  return Card({
    variant: "roadmap-summary-card",
    bodyHTML: `
      <div class="card-head-row">
        <div>
          <div class="card-eyebrow">Trajectory Project Roadmap</div>
          <h2 class="roadmap-summary-title">Recommended build path</h2>
        </div>
      </div>
      <p class="pc-desc roadmap-summary-sub">Your core path: 3 shared fundamentals per tier for everyone, plus 3 more in your chosen specialization at beginner and intermediate (generalists stick to the shared 3) — the rest are optional, ship them any time for extra depth.</p>
      <div class="roadmap-tier-grid">${cards}</div>`
  });
}

/**
 * Cross-project skill matrix: how many SHIPPED projects touch each
 * engineering dimension (Frontend, Backend, Databases, DevOps/Cloud,
 * Testing, AI/ML, Security, Data/Analytics, System Design, Networking).
 * Rendered as a single stacked analytical bar — one segment per dimension,
 * width proportional to its share of shipped coverage — with a colour-coded
 * index underneath, rather than ten separate progress bars.
 */
const SKILL_DIMENSION_COLORS = {
  "Frontend": "#8B7FE8", "Backend": "#5FB8D9", "Databases": "#DDA75E",
  "DevOps/Cloud": "#6FCF97", "Testing": "#D9C15E",
  "AI/ML": "#C77FE0", "Security": "#E0778E", "Data/Analytics": "#5ED9B8",
  "System Design": "#E0A05E", "Networking": "#7F9CE8"
};

/** Depends on getShippedProjects (resume.js), injected to avoid a resume.js<->projects.js cycle. */
export function renderSkillMatrix(getShippedProjects){
  const shipped = getShippedProjects();
  const counts = {};
  SKILL_DIMENSIONS.forEach(d => counts[d] = 0);
  shipped.forEach(p=>{
    if(p.custom) return; // custom builds don't have a fixed concept list to bucket
    const src = Object.values(CURATED_PROJECTS).flat().find(cp=>cp.id===p.globalIndex);
    if(!src) return;
    skillDimensionsForProject(src).forEach(d => { if(counts[d] !== undefined) counts[d]++; });
  });

  const total = Object.values(counts).reduce((a,b)=>a+b, 0);
  const covered = SKILL_DIMENSIONS.filter(d=>counts[d]>0);

  // Build stacked segments proportional to each dimension's share of shipped coverage.
  // Dimensions with zero coverage don't get a segment on the bar itself — they only
  // show up as muted entries in the index below, so the bar reads as "what's covered".
  const segmentsHTML = covered.map(d=>{
    const pct = (counts[d] / total) * 100;
    return `<div class="skill-bar-segment" style="width:${pct}%; background:${SKILL_DIMENSION_COLORS[d]}"></div>`;
  }).join("");
  const emptyNoticeHTML = total === 0 ? `<div class="skill-bar-empty">No shipped projects yet — ship something to fill in this bar</div>` : "";

  const indexHTML = SKILL_DIMENSIONS.map(d=>{
    const c = counts[d];
    const isGap = c === 0;
    return `
      <div class="skill-index-item ${isGap ? "is-gap" : ""}">
        <span class="skill-index-dot" style="background:${isGap ? "var(--border)" : SKILL_DIMENSION_COLORS[d]}"></span>
        <span class="skill-index-label">${d}</span>
        <span class="skill-index-count">${isGap ? "gap" : c}</span>
      </div>`;
  }).join("");

  return `
    <div class="card skill-matrix-card">
      <div class="card-eyebrow">Cross-Project Coverage</div>
      <h2 class="roadmap-summary-title">Skill matrix</h2>
      <p class="pc-desc roadmap-summary-sub">Each segment is a dimension's share of your shipped coverage — width shows relative weight, not an absolute target. Greyed-out entries in the index are real gaps worth shipping something to close.</p>
      ${emptyNoticeHTML}
      <div class="skill-bar">${segmentsHTML}</div>
      <div class="skill-index-grid">${indexHTML}</div>
    </div>`;
}

/**
 * Shared "what counts as done" checklist for a tier. Not tracked per-project
 * in DB (it's a completion bar, not a to-do list) — it's a <details> panel
 * so it doesn't clutter the tier header for anyone who already knows the
 * drill, but stays one click away. (Currently unused by any render path —
 * preserved as-is from the pre-modular app.js rather than removed, since
 * dead-code cleanup is out of scope for this refactor.)
 */
export function tierDeliverablesHTML(lvl){
  const items = TIER_DELIVERABLES[lvl] || [];
  if(!items.length) return "";
  const tierLabel = { beginner: "Beginner", intermediate: "Intermediate", major: "Capstone" }[lvl] || lvl;
  return `
    <details class="tier-deliverables">
      <summary>What counts as "done" for a ${tierLabel} project <span class="tier-deliverables-count">${items.length} items</span></summary>
      <ul class="tier-deliverables-list">
        ${items.map(i=>`<li>${i}</li>`).join("")}
      </ul>
    </details>`;
}

/**
 * "Shipped is only set by a verified repo submission" (see verifyAndSubmitRepo).
 * This just moves planned -> in-progress, or lets you step back to planned
 * before you've shipped.
 */
function toggleStartedStatus(id, rerenderAll){
  const DB = getDB();
  if(DB.projects.shipped[id]) return; // shipped projects are locked; verified submission is the only path off "shipped"
  DB.projects.started[id] = !DB.projects.started[id];
  saveDB(); rerenderAll();
}

/**
 * Wires the beginner/intermediate/major tier tabs and the "New custom
 * build" AI-scoping dialog. Called once from app.js's init().
 */
export function initProjectsEvents(deps){
  const DB = getDB();
  document.querySelectorAll("#yearTabs .tab-btn").forEach(b=>{
    b.addEventListener("click", ()=>{ projectsFilter = b.dataset.filter; renderProjects(deps); });
  });

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
        renderProjects(deps);
        showNotice("✨ Production blueprint scoped and logged via AI guidance successfully!", "success");
      }
    });
  });
}

/**
 * Renders the Projects page. `deps` carries the small set of cross-module
 * pieces this page needs (shipped-projects list for the skill matrix, and
 * the re-render callbacks for Home/Resume that a status change also affects)
 * so projects.js doesn't import resume.js/home directly.
 */
export function renderProjects(deps){
  const DB = getDB();
  const { getShippedProjects, renderHome, renderResume } = deps;
  const rerenderAll = ()=>{ renderProjects(deps); renderHome(); renderResume(); };

  // Gracefully remap legacy numeric string filters down to explicit phase scopes
  let levelFilter = projectsFilter;
  if(levelFilter === "1") levelFilter = "beginner";
  if(levelFilter === "2") levelFilter = "intermediate";
  if(levelFilter === "3" || levelFilter === "4") levelFilter = "major";

  document.querySelectorAll("#yearTabs .tab-btn").forEach(b=>b.classList.toggle("active", b.dataset.filter===projectsFilter));

  // Domain/track filter chips — lets someone browse "Generalist" builds everyone
  // should ship plus whichever specialization(s) they care about, independent
  // of the beginner/intermediate/capstone tier tabs above.
  const trackCounts = { all: 0 };
  Object.values(CURATED_PROJECTS).flat().forEach(p=>{
    trackCounts.all++;
    trackCounts[p.track] = (trackCounts[p.track]||0) + 1;
  });
  const trackChips = ["all", ...Object.keys(TRACK_FILTER_META)]
    .filter(t => t==="all" || trackCounts[t])
    .map(t=>{
      const label = t==="all" ? "All Domains" : TRACK_FILTER_META[t];
      const icon = TRACK_FILTER_ICONS[t] || "";
      return `<button class="tab-btn tab-btn-sm ${trackProjectsFilter===t?'active':''}" data-track-filter="${t}"><span class="tab-btn-icon">${icon}</span>${label}</button>`;
    }).join("");
  const trackFilterRowHTML = `<div class="tabs-row tabs-row-sub" id="trackTabs">${trackChips}</div>`;

  let html = renderProjectsSummary() + renderSkillMatrix(getShippedProjects) + trackFilterRowHTML;
  let hasAnyCards = false;

  const matchesTrack = p => trackProjectsFilter === "all" || p.track === trackProjectsFilter;

  if((levelFilter==="all" || levelFilter==="custom") && DB.projects.custom && DB.projects.custom.length){
    hasAnyCards = true;
    html += `<div class="phase-block"><div class="phase-head">
      <div><div class="card-eyebrow">Custom AI-Guided Infrastructure</div><div class="phase-title">Your own builds</div></div>
      <div class="phase-count">${DB.projects.custom.filter(c=>c.status==="shipped").length}/${DB.projects.custom.length} shipped</div>
    </div>
      <div class="project-grid">${DB.projects.custom.map(customCardHTML).join("")}</div></div>`;
  }

  const targetedLevels = ["beginner", "intermediate", "major"].filter(lvl => levelFilter === "all" || levelFilter === lvl);
  const phaseEyebrows = { beginner: "Tier I — Beginner Milestone Core", intermediate: "Tier II — Intermediate Agile Engine", major: "Tier III — Major Production Capstone" };
  const phaseTitles = { beginner: "2–3 Weeks Each", intermediate: "6–8 Weeks Each", major: "4–8 Months Run" };

  targetedLevels.forEach(lvl => {
    const tierProjects = CURATED_PROJECTS[lvl].filter(matchesTrack);
    if(!tierProjects.length) return;
    hasAnyCards = true;
    const shippedCount = tierProjects.filter(p=>DB.projects.shipped[p.id]).length;
    html += `<div class="phase-block">
      <div class="phase-head">
        <div><div class="card-eyebrow">${phaseEyebrows[lvl]}</div><div class="phase-title">${phaseTitles[lvl]}</div></div>
        <div class="phase-count">${shippedCount}/${tierProjects.length} shipped</div>
      </div>
      <div class="project-grid">${tierProjects.map(p=>projectCardHTML(p, lvl)).join("")}</div>
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

  container.querySelectorAll("[data-track-filter]").forEach(btn=>{
    btn.addEventListener("click", ()=>{ trackProjectsFilter = btn.dataset.trackFilter; renderProjects(deps); });
  });

  // Bind events
  container.querySelectorAll("[data-toggle-start-pid]").forEach(btn=>{
    btn.addEventListener("click", ()=>toggleStartedStatus(btn.dataset.toggleStartPid, rerenderAll));
  });

  container.querySelectorAll("[data-submit-pid]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const pid = btn.dataset.submitPid;
      const isCustom = btn.dataset.submitCustom === "1";
      const label = isCustom
        ? (DB.projects.custom.find(x=>x.id===pid) || {}).name
        : (Object.values(CURATED_PROJECTS).flat().find(p=>p.id===pid) || {}).name;
      openRepoSubmissionDialog(pid, label, deps);
    });
  });

  container.querySelectorAll("[data-custom-start]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const c = DB.projects.custom.find(x=>x.id===btn.dataset.customStart);
      if(!c || c.status === "shipped") return; // shipped is locked; only a verified submission changes it
      c.status = c.status==="planned" ? "progress" : "planned";
      saveDB(); rerenderAll();
    });
  });
  container.querySelectorAll("[data-custom-remove]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      DB.projects.custom = DB.projects.custom.filter(x=>x.id!==btn.dataset.customRemove);
      saveDB(); rerenderAll();
    });
  });
}

/**
 * Opens the guided repo submission dialog. Runs the full verification pipeline
 * on confirm and surfaces field-level validation errors (not a silent failure)
 * by re-opening the dialog with a copy line describing exactly what failed.
 */
function openRepoSubmissionDialog(pid, label, deps, errorCopy){
  const DB = getDB();
  const cur = DB.projects.meta[pid] || {};
  const connected = DB.github && DB.github.username;
  const baseCopy = connected
    ? `Submitting verifies the repo is public, exists, and is owned by your connected account (@${connected}) before marking this build shipped.`
    : `Connect your GitHub account in Settings first — ownership verification needs it to confirm you authored this repo.`;
  openRepoDialogInternal(pid, label, cur.repo || "", errorCopy || baseCopy, !!errorCopy, deps);
}

function openRepoDialogInternal(pid, label, prefillRepo, copy, isError, deps){
  openDialog({
    eyebrow: "SUBMIT PROJECT",
    title: `Verify & ship "${label || pid}"`,
    copy,
    confirmLabel: "Verify & submit",
    fields: [
      { id:"repo", label:"GitHub repository URL", placeholder:"https://github.com/owner/repo", value: prefillRepo }
    ],
    onConfirm: ({repo})=>{
      submitProjectRepo(pid, label, repo, deps);
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

async function submitProjectRepo(pid, label, repoInput, deps){
  const confirmBtn = document.getElementById("appDialogConfirm");
  const dialog = document.getElementById("appDialog");
  if(confirmBtn){ confirmBtn.disabled = true; confirmBtn.classList.add("btn-loading"); }
  try{
    const meta = await verifyAndSubmitRepo(pid, repoInput, label, deps);
    if(dialog) dialog.hidden = true;
    showNotice(`Verified and shipped — ${meta.repoName} (quality ${meta.qualityScore}/100).`, "success");
  }catch(err){
    if(err instanceof RepoValidationError){
      // Re-open the dialog with the specific failure surfaced inline, prefilled with what they typed.
      openRepoDialogInternal(pid, label, repoInput, err.message, true, deps);
    }else{
      showNotice(err.message || "Verification failed unexpectedly. Try again.", "error");
    }
  }finally{
    if(confirmBtn){ confirmBtn.disabled = false; confirmBtn.classList.remove("btn-loading"); }
  }
}

/* ---------------- Reinforced submission: repo ownership verification ---------------- */

// A typed error so the UI can render a specific, field-level validation message
// instead of a generic failure notice.
export class RepoValidationError extends Error {
  constructor(step, message){
    super(message);
    this.name = "RepoValidationError";
    this.step = step; // which pipeline stage failed, for display/logging
  }
}

export function computeRepoQualityScore(meta, raw){
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

/**
 * Runs the full submission verification pipeline for a repo URL against a project.
 * Steps: format -> existence -> visibility -> ownership -> metadata fetch.
 * Returns the enriched meta object on success; throws RepoValidationError on any failure.
 * Every attempt (pass or fail) is appended to DB.projects.submissions for history/audit.
 */
export async function verifyAndSubmitRepo(projectKey, repoString, projectLabel, deps){
  const DB = getDB();
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

  // Step 2 — connected identity required before we can check ownership
  const connectedUsername = (DB.github && DB.github.username || "").trim();
  if(!connectedUsername) fail("identity", "Connect your GitHub account in Settings before submitting a repository.");

  // Step 3 — repository existence
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

  // Step 4 — visibility: must be public
  if(data.private) fail("visibility", `"${owner}/${repo}" is private. Only public repositories can be submitted.`);

  // Step 5 — ownership: repo owner must match the connected GitHub account
  const repoOwner = (data.owner && data.owner.login || owner).toLowerCase();
  if(repoOwner !== connectedUsername.toLowerCase()){
    fail("ownership", `"${owner}/${repo}" belongs to @${repoOwner}, not your connected account @${connectedUsername}. Submit a repository you own.`);
  }

  // Step 6 — fetch supporting metadata (README + license are separate calls, best-effort)
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
    // saveDB already surfaced the storage-specific error via showNotice.
    // The verification itself succeeded, but persisting it did not — don't
    // report a false "shipped" success to the caller.
    throw new Error("Repository was verified, but your progress couldn't be saved. See the notice above for details.");
  }
  deps.renderProjects(deps); deps.renderHome(); deps.renderResume();
  return DB.projects.meta[projectKey];
}

/* ============================================================
   SECTION: sub/resume.js — derives resume content (skills, shipped
   projects, readiness checklist) from project/profile state, and
   owns every export format: plain text, Markdown, and the
   print-to-PDF layout.
   ============================================================ */
export function getShippedProjects(){
  const DB = getDB();
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

export function getInProgressProjects(){
  const DB = getDB();
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

export function getResumeSkills(){
  const DB = getDB();
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

export function computeResumeReadiness(){
  const DB = getDB();
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

  const requiredBeginner = coreProjectsForUser(CURATED_PROJECTS.beginner);
  const requiredIntermediate = coreProjectsForUser(CURATED_PROJECTS.intermediate);
  const requiredMajor = coreProjectsForUser(CURATED_PROJECTS.major);
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

export function buildResumeText(){
  const DB = getDB();
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

export function buildResumeMarkdown(){
  const DB = getDB();
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
  return md;
}

function buildJakesResumeHTML(){
  const DB = getDB();
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

export function renderResumeChecklist(){
  const host = document.getElementById("resumeChecklist");
  if(!host) return;
  const items = computeResumeReadiness();
  host.innerHTML = items.length
    ? items.map(item=>ChecklistRow({ priority: item.priority, textHTML: item.text, dueLabel: item.dueLabel })).join("")
    : `<div class="empty-sub">Your resume looks solid — nothing outstanding right now.</div>`;
}

export function renderResume(){
  const DB = getDB();
  const r = DB.resume;
  ["email","phone","location","linkedin","portfolio","targetRole","summary"].forEach(key=>{
    const el = document.getElementById("rs"+key.charAt(0).toUpperCase()+key.slice(1));
    if(el) el.value = r[key] || "";
  });

  const skills = getResumeSkills();
  const skillsHost = document.getElementById("resumeSkills");
  if(skillsHost){
    skillsHost.innerHTML = skills.length
      ? TagList(skills)
      : `<div class="empty-sub">Ship or start a project to build up your skills list automatically.</div>`;
  }

  const shipped = getShippedProjects();
  const projHost = document.getElementById("resumeProjectsList");
  if(projHost){
    projHost.innerHTML = shipped.length
      ? shipped.map(proj=>Card({
          bodyHTML: `
            <h3>${proj.name}</h3>
            <div class="pc-desc">${proj.desc || ""}</div>
            <div class="pc-stack">${TagList(proj.stack)}</div>
            <div class="pc-meta">${proj.repo ? `<a href="${proj.repo}" target="_blank" rel="noopener">Repo ↗</a>` : "No repo linked"}${proj.live ? ` · <a href="${proj.live}" target="_blank" rel="noopener">Live ↗</a>` : ""}</div>`,
          baseClass: "subject-card"
        })).join("")
      : `<div class="empty-sub">No shipped projects yet — mark a build "SHIPPED" on the Projects page and it will land here.</div>`;
  }

  renderResumeChecklist();

  const preview = document.getElementById("resumePreviewText");
  if(preview) preview.textContent = buildResumeText();
}

/** Wires the resume form's save/copy/export buttons. Called once from app.js's init(). */
export function initResumeEvents(){
  document.getElementById("rsSave").addEventListener("click", ()=>{
    const DB = getDB();
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
    const DB = getDB();
    const blob = new Blob([buildResumeText()], { type:"text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${(DB.profile.name||"resume").replace(/\s+/g,"_")}-resume.txt`;
    a.click(); URL.revokeObjectURL(url);
  });

  document.getElementById("rsDownloadMd").addEventListener("click", ()=>{
    const DB = getDB();
    const blob = new Blob([buildResumeMarkdown()], { type:"text/markdown" });
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
}

/* ============================================================
   SECTION: sub/github.js — external coding-profile sync
   integrations. Despite the filename (matching the requested
   module layout), this covers all four supported profile syncs:
   GitHub, LeetCode, Codeforces, and CodeChef. They're kept together
   rather than split into four near-empty files since each is a
   small, near-identical fetch + DB-write pair with no independent
   state of its own.
   ============================================================ */
export async function syncGitHubProfile(username, deps){
  const DB = getDB();
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
  deps.renderSettings();
  deps.renderProjects();
}

export async function syncLeetCodeProfile(username, deps){
  const DB = getDB();
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
  deps.renderSettings();
}

/**
 * Codeforces exposes a real, official, key-free public API (user.info), but
 * it does not send CORS headers — browsers block a direct fetch() from a
 * page on a different origin. We attempt the direct call first (works if
 * Codeforces ever enables CORS, or when self-hosted behind a proxy), and if
 * that fails we surface a clear, honest error rather than pretending sync
 * succeeded. This is different from a "user not found" case, so the two are
 * distinguished in the thrown message.
 */
export async function syncCodeforcesProfile(username, deps){
  const DB = getDB();
  const clean = (username || "").trim();
  if(!clean) throw new Error("Enter a Codeforces handle first.");
  let response;
  try{
    response = await fetch(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(clean)}`);
  }catch(networkErr){
    // Typically a CORS rejection — codeforces.com's API does not send
    // Access-Control-Allow-Origin, so browser-side requests can fail even
    // though the API itself is up and the handle is valid.
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
  deps.renderSettings();
}

/**
 * CodeChef has no official public API. This uses a third-party, unofficial
 * scraper-backed service (same category of dependency as the LeetCode sync
 * above) — it can go offline or change shape without notice, so failures
 * here are expected occasionally and are surfaced as "unavailable" rather
 * than treated as a bug in this app.
 */
export async function syncCodeChefProfile(username, deps){
  const DB = getDB();
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
  deps.renderSettings();
}

/**
 * Wires a "sync" button: disables it + shows a loading state while an async
 * action runs, restores it afterwards, and reports failures via the shared
 * notice banner. Used by all four profile syncs (identical pattern,
 * previously duplicated verbatim at each call site).
 */
export function wireAsyncSyncButton(buttonId, inputId, action, errorFallback, deps){
  const button = document.getElementById(buttonId);
  if(!button) return;
  button.addEventListener("click", async ()=>{
    button.disabled = true; button.classList.add("btn-loading");
    try {
      const inputEl = inputId ? document.getElementById(inputId) : null;
      await action(inputEl ? inputEl.value : undefined, deps);
    } catch(err) {
      showNotice(err.message || errorFallback, "error");
    } finally {
      button.disabled = false; button.classList.remove("btn-loading");
    }
  });
}
