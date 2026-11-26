/**
 * All text on the portfolio lives in this one file.
 *
 * Source of truth: career/master_profile.yaml (ids in the comments, e.g. [exp_1.b34]),
 * with wording taken from the approved CV (career/cv/cv_general.tex) and the
 * LinkedIn/Naukri pack (career/packs/2026-10-08_linkedin_naukri_pack.md).
 * Select, reorder and reword only. Never add a number, tool or claim that is not in the master profile.
 */

export interface NavLink {
  name: string;
  href: string;
}

export interface ChartLine {
  text: string;
}

/** A number that counts up on scroll; the page always ends on `value` */
export interface Stat {
  value: number;
  decimals: number;
  suffix: string;
  /** The suffix as a screen reader should say it ("1.5 years", not "1.5 yrs") */
  spokenSuffix: string;
  label: string;
}

export interface Pitch {
  n: string;
  title: string;
  body: string;
}

export interface RoleBullet {
  title: string;
  text: string;
}

export interface Role {
  title: string;
  type: string;
  period: string;
  bullets: RoleBullet[];
}

export interface Company {
  name: string;
  description: string;
  location: string;
  period: string;
  stack: string;
  roles: Role[];
}

/** One stop on the journey of a vote through the voting system */
export interface Step {
  n: string;
  title: string;
  body: string;
  tech: string;
}

export interface FlowNode {
  title: string;
  note: string;
}

export interface Proof {
  figure: string;
  title: string;
  body: string;
}

export interface RepoLink {
  name: string;
  link: string;
}

export interface Project {
  title: string;
  period: string;
  stack: string;
  summary: string;
  link: string;
}

export interface MinorProject {
  name: string;
  description: string;
  links: RepoLink[];
}

/** where: "work" = used in paid work at IntelligentDX, "projects" = personal projects and training only */
export interface Skill {
  name: string;
  where: "work" | "projects";
}

export interface SkillGroup {
  category: string;
  items: Skill[];
}

export interface SkillFilter {
  id: "all" | Skill["where"];
  label: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  /** A short description, shown as its own paragraph */
  note?: string;
  /** Shown on the institution line after the period */
  grade?: string;
  modules?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
  /** Public link to the certificate; leave out while the file is not publicly viewable */
  link?: string;
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
}

// ==========================================
// Person and links [personal]
// ==========================================
export const PERSON = {
  name: "Vaibhav Jain",
  role: "Java backend developer",
  // Approved headline (targets/naukri.yaml, first rotation entry, shortened)
  headline: "Java Spring Boot Developer | Backend, 1.5 yrs | Spring Boot, Spring Security, Spring Data JPA, Microservices",
  email: "vaibhav.jain.careers@gmail.com",
  // Shown in Contact (decided 2026-11-22)
  phone: "+91 8600948208",
  phoneLink: "tel:+918600948208",
  location: "Pune, India",
  linkedin: "https://www.linkedin.com/in/-vaibhavjain/",
  linkedinLabel: "linkedin.com/in/-vaibhavjain",
  github: "https://github.com/Vaibhav0710",
  githubLabel: "github.com/Vaibhav0710",
  sourceCode: "https://github.com/Vaibhav0710/Portfolio",
  photo: "/api/profile-photo",
  // CV lives in Google Drive (career/cv PDF, replaced with "Upload new version" so this link never changes)
  cv: "https://drive.google.com/uc?export=download&id=1Xc38Mk7qPtW-W6wwbd1RVbXLqIZ8Odv4",
  siteUrl: "https://vaibhav-jain.dev",
  // [qa_bank: notice_period, relocation]
  noticePeriod: "30 days",
  openTo: "any city in India, remote, or relocating to the UAE, Europe, Japan, Canada or the USA",
};

// Button and link labels shared by the navbar and the hero, not claims
export const ACTION_LABELS = {
  email: "Email me",
  cv: "Download CV",
  linkedin: "LinkedIn profile",
  github: "GitHub profile",
};

// UI labels for the section links, not claims
export const NAV_LINKS: NavLink[] = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

// ==========================================
// Hero [sum_1, sum_5, proj_1.b6, proj_1.b9, proj_1.b10, qa_bank: notice_period, relocation]
// ==========================================
export const HERO = {
  badge: "Open to work · 30-day notice",
  pitch:
    "1.5 years shipping production APIs in healthtech (Python, Node.js, C#/.NET on Google Cloud), and Java with Spring Boot in a 6-service system I load-tested, chaos-tested and covered with 254 tests.",
  locations: ["Pune, India", "Remote, any city in India", "Relocating: UAE, Europe, Japan, Canada, USA"],
  // UI labels for the chart, not claims
  chartHint: "Scroll to bring the chart into focus, or move the lens over it.",
  chartLabel: "Focus chart",
};

// Lines of the focus chart, largest first [sum_5, sum_1]
export const CHART_LINES: ChartLine[] = [
  { text: "Java" },
  { text: "Spring Boot" },
  { text: "Microservices · Kafka" },
  { text: "PostgreSQL · Redis · Docker" },
  { text: "1.5 years of production APIs" },
  { text: "Pune · remote · relocation" },
];

// The chart's last line, and the Contact heading [pack A2 closing line]
export const CLOSING_LINE = "If you can read this, we should talk.";

// ==========================================
// About [pack A2, sum_1, edu_1, edu_2]
// The statement is split so each part fills in turn on scroll.
// ==========================================
// UI label, not a claim
export const ABOUT_LABEL = "About";

export const ABOUT_STATEMENT: string[] = [
  "I'm a backend developer who builds ",
  "reliable APIs, background jobs ",
  "and data pipelines. ",
  "I care about idempotent APIs, ",
  "honest metrics ",
  "and code other people can maintain.",
];

export const ABOUT_STORY =
  "I studied mechanical engineering, then moved to software through CDAC's PG-DAC programme, where Java became my core language. Since April 2025 I've shipped production backend services at IntelligentDX, a healthtech company building software for eye-care practices: an internship that turned into a full-time role.";

// UI label, not a claim
export const NUMBERS_LABEL = "In numbers";

// UI label, not a claim
export const WORK_LABEL = "Work";

// [sum_1, sum_2, sum_6, exp_1.b38]
export const STATS: Stat[] = [
  {
    value: 1.5,
    decimals: 1,
    suffix: " yrs",
    spokenSuffix: " years",
    label: "shipping production backend services on Google Cloud in Python, Node.js and C#/.NET",
  },
  { value: 400, decimals: 0, suffix: "+", spokenSuffix: "+", label: "pull requests authored" },
  { value: 180, decimals: 0, suffix: "+", spokenSuffix: "+", label: "pull requests reviewed" },
  { value: 59, decimals: 0, suffix: "", spokenSuffix: "", label: "design, API-contract and runbook documents written" },
];

// UI labels for the "What you get" section, not claims
export const WHY_SECTION = {
  label: "Why hire me",
  eyebrow: "For hiring managers",
  heading: "What you get if you hire me",
};

// "What you get if you hire me" [sum_1, exp_1.b34, proj_1.b10, proj_1.b9, proj_1.b6, exp_1.b23, proj_1.b5, exp_1.b38]
export const WHY: Pitch[] = [
  {
    n: "1",
    title: "Production experience, not only projects",
    body: "1.5 years shipping backend services to production on Google Cloud. My treatment-plan booking API has been live since September 2026.",
  },
  {
    n: "2",
    title: "Java and Spring Boot you can inspect",
    body: "A 6-service Spring Boot system with 254 automated tests, a Gatling load test and a chaos test. All of it is public on GitHub.",
  },
  {
    n: "3",
    title: "I build for failure",
    body: "Idempotency keys, audit trails, HTTP 207 on partial success, circuit breakers with safe fallbacks. I design for the retry, the timeout and the partial failure, not only the happy path.",
  },
  {
    n: "4",
    title: "I write things down",
    body: "59 design, API-contract and runbook documents and 180+ pull requests reviewed, so the next person can pick up my work.",
  },
];

// ==========================================
// Experience: one company, two roles [exp_1]
// Paid work is Python, Node.js and C#/.NET. Never write or imply Java here.
// ==========================================
const ROLES: Role[] = [
  {
    title: "Junior Software Developer",
    type: "Full-time",
    period: "Nov 2025 – present",
    bullets: [
      {
        // [exp_1.b34]
        title: "Treatment-plan booking API",
        text: "Books every visit of a multi-appointment plan across up to 15 parallel lanes, with atomic slot reservation, one audit row per appointment and 200/207/422 responses. In production since September 2026.",
      },
      {
        // [exp_1.b29]
        title: "Background sync at scale",
        text: "Designed background sync (Cloud Scheduler to Cloud Run Jobs to PostgreSQL) for 213 providers × 111 locations × 70 visit types, replacing slow or timing-out external calls with indexed database reads.",
      },
      {
        // [exp_1.b32, exp_1.b28]
        title: "Faster slot search, FHIR R4 move",
        text: "Cut the slot-search API from about 2.7–3.6 s to 1.7–2.5 s with a concurrent pager, and moved scheduling APIs to an EHR’s FHIR R4 API with unchanged API contracts.",
      },
      {
        // [exp_1.b20, exp_1.b21]
        title: "AI rule-generation platform",
        text: "Designed a rule-generation platform around Claude (architecture, low-level design, API contract) with validation gates and a repair loop. Prompt caching cut cost per generated rule by about 27–31%.",
      },
      {
        // [exp_1.b23]
        title: "Cancel and reschedule, safely",
        text: "Built cancel and reschedule APIs on an EHR with no native reschedule: book the new slot first, retry at timed offsets, return HTTP 207 on partial success and keep a full audit trail.",
      },
      {
        // [exp_1.b30]
        title: "Accuracy dashboard, end to end",
        text: "Owned an accuracy dashboard (Flask and React/TypeScript) and redefined its metric to count only verified rows. QA reconciliation against the database passed 228 of 229 checks.",
      },
    ],
  },
  {
    title: "Software Engineer Intern",
    type: "Internship, converted to full-time",
    period: "Apr 2025 – Oct 2025",
    bullets: [
      {
        // [exp_1.b1, exp_1.b2]
        title: "MongoDB to PostgreSQL migration",
        text: "Migrated 10 API read paths across 5 C#/.NET microservices in about 8 weeks (PL/pgSQL functions, Dapper repository layer, feature-flag fallback). 9 reached production with identical responses.",
      },
      {
        // [exp_1.b7]
        title: "SSO with Azure AD",
        text: "Built SSO login, token-validation and token-refresh APIs in a .NET identity service using Microsoft Azure AD.",
      },
      {
        // [exp_1.b13, exp_1.b14]
        title: "Claim-scrubbing integration",
        text: "Built the first version in Node.js: an XML-to-JSON claim gateway and a Redis-first cache with PostgreSQL and Firestore fallbacks.",
      },
    ],
  },
];

export const EXPERIENCE: Company = {
  name: "IntelligentDX",
  description: "Healthtech software for eye-care practices",
  location: "Pune, India",
  period: "Apr 2025 – present",
  stack: "Python (Flask), Node.js (Express), C#/.NET, PostgreSQL, MongoDB, Redis, BigQuery, Google Cloud",
  roles: ROLES,
};

// ==========================================
// Lead project: the voting system [proj_1]
// One PostgreSQL database with a schema per service [proj_1.b1], never "a database per service".
// ==========================================
export const LEAD_PROJECT: Project = {
  title: "Blockchain-inspired online voting system",
  period: "Apr 2026 – present",
  stack: "Java 17, Spring Boot",
  summary:
    "An election platform split into 6 Spring Boot services, built so that nobody can vote twice and any tampering with a stored vote can be detected.",
  link: "https://github.com/Vaibhav0710/Voting_System",
};

// One vote, start to finish [proj_1.b1, proj_1.b2, proj_1.b3, proj_1.b5]
export const JOURNEY: Step[] = [
  {
    n: "01",
    title: "API gateway",
    body: "Spring Cloud Gateway routes the request, applies rate limits and validates the JWT. Eureka handles service discovery.",
    // The gateway validates the JWT without Spring Security, which lives in the user service [proj_1.b4]
    tech: "Spring Cloud Gateway · Eureka · JWT",
  },
  {
    n: "02",
    title: "Idempotency first",
    body: "If this voter already used the same idempotency key, the original receipt comes back (200) instead of a new vote.",
    tech: "Redis · PostgreSQL",
  },
  {
    n: "03",
    title: "Three double-vote guards",
    body: "A Redis check that returns 409.\nA database unique constraint on user and election.\nRedis-backed idempotency keys.",
    tech: "Redis · PostgreSQL",
  },
  {
    n: "04",
    title: "Resilient candidate check",
    body: "Retry, circuit breaker and bulkhead around the candidate service. If it is down, a Kafka-fed Redis cache answers; an unknown candidate gets 503, never a blind accept.",
    tech: "Resilience4j · OpenFeign",
  },
  {
    n: "05",
    title: "SHA-256 hash chain",
    body: "Every vote carries a SHA-256 hash, so any tampering with a stored vote can be detected.",
    tech: "Tamper detection",
  },
  {
    n: "06",
    title: "Kafka vote event",
    body: "The stored vote is published as an event for the rest of the system.",
    tech: "Apache Kafka",
  },
  {
    n: "07",
    title: "Result service",
    body: "A stateless result service aggregates results in real time from the vote events.",
    tech: "Spring Boot · Kafka consumer",
  },
];

// The flow diagram, client to result service [proj_1.b1, proj_1.b2, proj_1.b3, proj_1.b5]
export const NODES: FlowNode[] = [
  { title: "Client", note: "Voter with a JWT" },
  { title: "API gateway", note: "Routing, rate limits, JWT · Eureka" },
  { title: "Voting service", note: "Idempotency, Redis check, Resilience4j" },
  { title: "PostgreSQL", note: "Unique user + election, hash chain" },
  { title: "Kafka", note: "Vote events" },
  { title: "Result service", note: "Real-time tallies" },
];

// The order of checks in the vote demo, as in the voting service: the hash is built before the insert [proj_1.b2, proj_1.b5]
export const VOTE_STEP_LABELS: string[] = [
  "Idempotency key used before by this voter?",
  "Redis: already voted in this election?",
  "Candidate valid? (Resilience4j, cache fallback)",
  "SHA-256 hash, chained to the previous vote",
  "Insert vote (unique user + election)",
  "Publish vote event to Kafka",
];

// UI labels for the voting project sections, not claims; the flow description restates NODES [proj_1.b1, proj_1.b2, proj_1.b3, proj_1.b5]
export const VOTING_SECTIONS = {
  galleryLabel: "Lead project",
  galleryCue: "Follow one vote through it.",
  flowHeading: "The architecture, one vote at a time",
  flowIntro: "Keep scrolling: the vote travels from the client to the result service, lighting up each part it passes.",
  flowDescription:
    "Client calls the API gateway, which uses Eureka for discovery and routes to the voting service. The voting service checks Redis, validates the candidate, stores the vote in PostgreSQL with a SHA-256 hash chain, and publishes an event to Kafka, which the result service consumes to tally results in real time.",
  demoEyebrow: "Try it",
  demoHeading: "Try to vote twice",
  demoIntro:
    "Cast a vote, then try again with a new request, or retry the exact same one. The checks run in the same order as the real voting service, with the same status codes and messages.",
  proofEyebrow: "Voting system",
  proofHeading: "Tested, broken on purpose, measured",
  codeButton: "View the code",
};

// UI labels for the vote demo, not claims; the explanations restate proj_1.b2 and proj_1.b5
export const VOTE_DEMO = {
  castNew: "Cast vote (new request)",
  retrySame: "Retry same request",
  reset: "Reset",
  requestLabel: "Request",
  checksLabel: "Checks",
  responseLabel: "Response",
  responseBodyLabel: "Response body",
  waiting: "waiting",
  waitingBody: '// Press "Cast vote" to send the request.',
  explainCreated:
    "A new vote: every check passed, the vote was hashed into the chain and published to Kafka for the result service.",
  explainReplay:
    "Same idempotency key as before: the original receipt comes back and no second vote is stored.",
  explainConflict:
    "A new request from a voter who already voted: the Redis check stops it before anything is stored. If it slipped past, the unique constraint on user and election would still refuse it.",
  caption: "Simulated in your browser: ids and hashes are random. The real endpoint lives in the voting service on GitHub.",
  stepStatus: {
    idle: "not run",
    run: "checking",
    pass: "pass",
    hit: "replay",
    stop: "stopped",
    skip: "skipped",
  },
};

// [proj_1.b10, proj_1.b9, proj_1.b6, proj_1.b8, proj_1.b7]
// The load run is 1,000 votes ramped over 60 s, never "1,000 concurrent votes".
export const PROOF: Proof[] = [
  {
    figure: "254",
    title: "Automated tests",
    body: "Across the 6 services, including Testcontainers integration tests on PostgreSQL 16 and an 80% line-coverage gate on the voting service.",
  },
  {
    figure: "0 errors",
    title: "1,000 votes, ramped over 60 s",
    body: "Gatling load test: p95 163 ms, p99 282 ms, every vote stored once and the hash chain valid.",
  },
  {
    figure: "1 of 100",
    title: "Near-simultaneous votes",
    body: "100 near-simultaneous votes from one voter stored exactly one.",
  },
  {
    figure: "8 / 8",
    title: "Chaos checks passed",
    body: "Stopped the candidate service mid-election: known candidates kept voting from the cache, unknown ones got 503, and the gateway circuit closed again after the restart.",
  },
  {
    figure: "12 pods",
    title: "Kubernetes on a local kind cluster",
    body: "Kustomize manifests with probes and replicas; the 14-check end-to-end test passed through the gateway.",
  },
  {
    figure: "6 / 6",
    title: "Services observed",
    // Eureka has metrics and logs but no tracing [proj_1.b7]
    body: "Prometheus metrics from all 6 services through Micrometer, a Grafana dashboard, plus Zipkin tracing and JSON logs shipped to Elasticsearch and Kibana.",
  },
];

// One public repo per service [proj_1.evidence_base]
export const VOTING_REPOS: RepoLink[] = [
  { name: "User service", link: "https://github.com/Vaibhav0710/Voting_User_Service" },
  { name: "Candidate service", link: "https://github.com/Vaibhav0710/Voting_Candidate_Service" },
  { name: "Voting service", link: "https://github.com/Vaibhav0710/Voting_Voting_Service" },
  { name: "Result service", link: "https://github.com/Vaibhav0710/Voting_Result_Service" },
  { name: "API gateway", link: "https://github.com/Vaibhav0710/Voting_Api-Gateway" },
  { name: "Eureka server", link: "https://github.com/Vaibhav0710/Voting_Eureka_Server" },
];

// ==========================================
// Other projects [proj_3, proj_4, proj_5, ach_1]
// ==========================================
export const COURIER_PROJECT: Project = {
  // [proj_3.b1, proj_3.b2]
  title: "Courier management system",
  period: "2025",
  stack: "Java, Spring Boot",
  summary:
    "A full-stack courier platform with Admin, User and Delivery Partner modules. Spring Boot REST backend with Spring Data JPA and MySQL, secured with Spring Security and JWT, validated with Bean Validation and documented with springdoc OpenAPI. React frontend.",
  link: "https://github.com/Vaibhav0710/Courier-management-system",
};

// UI labels for the other projects, not claims
export const OTHER_PROJECTS = {
  label: "Other projects",
  courierLink: "Code on GitHub",
  earlierHeading: "Earlier practice",
};

export const MINOR_PROJECTS: MinorProject[] = [
  {
    // [proj_5, ach_1]
    name: "DSA practice in Java",
    description: "Leetcode-solution and Daily_DSA repositories. LeetCode 100 Days Badge 2024.",
    links: [
      { name: "Leetcode-solution", link: "https://github.com/Vaibhav0710/Leetcode-solution" },
      { name: "Daily_DSA", link: "https://github.com/Vaibhav0710/Daily_DSA" },
    ],
  },
  {
    // [proj_4] console app: no React, no Spring Boot, no payments
    name: "Rent_A_Car",
    description: "Console car-rental system with admin and customer menus. Core Java, JDBC, MySQL, Maven.",
    links: [{ name: "Code", link: "https://github.com/Vaibhav0710/Rent_A_Car" }],
  },
  {
    // [proj_4] console app: no React, no Spring Boot, no Tailwind
    name: "Pizza-Shop",
    description: "Console pizza-ordering system with sign-up, menu, cart and orders. Core Java, JDBC, MySQL.",
    links: [{ name: "Code", link: "https://github.com/Vaibhav0710/Pizza-Shop" }],
  },
];

// ==========================================
// Skills: backend only, Java first [skills, proj_1.b10]
// ==========================================
export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Languages",
    items: [
      { name: "Java", where: "projects" },
      { name: "Python", where: "work" },
      { name: "JavaScript (Node.js)", where: "work" },
      { name: "C#", where: "work" },
      { name: "SQL (PL/pgSQL)", where: "work" },
    ],
  },
  {
    category: "Frameworks",
    items: [
      { name: "Spring Boot", where: "projects" },
      { name: "Spring Security", where: "projects" },
      { name: "Spring Data JPA", where: "projects" },
      { name: "Spring Cloud Gateway", where: "projects" },
      { name: "Flask", where: "work" },
      { name: "Express.js", where: "work" },
      { name: "ASP.NET Core", where: "work" },
    ],
  },
  {
    category: "Data",
    items: [
      { name: "PostgreSQL", where: "work" },
      { name: "Redis", where: "work" },
      { name: "MongoDB", where: "work" },
      { name: "BigQuery", where: "work" },
      { name: "Firestore", where: "work" },
      { name: "Apache Kafka", where: "projects" },
      { name: "MySQL", where: "projects" },
    ],
  },
  {
    category: "Reliability and testing",
    items: [
      { name: "Resilience4j", where: "projects" },
      { name: "JUnit 5", where: "projects" },
      { name: "Mockito", where: "projects" },
      { name: "Testcontainers", where: "projects" },
      { name: "Gatling", where: "projects" },
    ],
  },
  {
    category: "Cloud and ops",
    items: [
      { name: "Google Cloud (Cloud Run, Cloud Run Jobs, Cloud Scheduler, Cloud Build)", where: "work" },
      { name: "Docker", where: "work" },
      { name: "Git", where: "work" },
      { name: "CI/CD", where: "work" },
      // Local kind cluster only, never a cloud or production cluster [proj_1.b8]
      { name: "Kubernetes (local kind)", where: "projects" },
      { name: "Prometheus and Grafana", where: "projects" },
    ],
  },
  {
    category: "Practices",
    items: [
      { name: "REST API design", where: "work" },
      { name: "Microservices", where: "work" },
      { name: "Idempotency and audit trails", where: "work" },
      { name: "Concurrency", where: "work" },
      { name: "Caching", where: "work" },
      { name: "FHIR R4", where: "work" },
      { name: "LLM integration", where: "work" },
    ],
  },
];

// UI labels for the skill filter, not claims
export const SKILL_FILTERS: SkillFilter[] = [
  { id: "all", label: "All" },
  { id: "work", label: "Used at work" },
  { id: "projects", label: "Projects and training" },
];

// UI labels for the skills section, not claims
export const SKILLS_SECTION = {
  label: "Skills",
  heading: "Backend, Java first",
  filterLabel: "Filter skills",
  legend: "Filled dot: used in paid work at IntelligentDX. Ring: personal projects and training.",
  // Read after each chip, since the dot itself is decorative
  workNote: "used at work",
  projectsNote: "projects and training",
};

// ==========================================
// Education and certifications [edu_1, edu_2, cert_1..4, ach_1]
// ==========================================
// [edu_1] Short forms of C-DAC's official PG-DAC module names (cdac.in, checked 2026-10-09)
const PG_DAC_MODULES: string[] = [
  "OOP with Java",
  "Algorithms and Data Structures in Java",
  "Web-based Java (J2EE)",
  "Database Technologies",
  "Operating Systems",
  ".NET (C#)",
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "PG-DAC, CDAC",
    institution: "Sunbeam Institute of Information Technology, Pune",
    period: "Sep 2024 – Feb 2025",
    note: "C-DAC's full-time, 900-hour advanced computing programme, where Java became my core language. It ended with a 120-hour capstone project.",
    modules: PG_DAC_MODULES,
  },
  {
    // [edu_2] degree title confirmed 2026-10-10 against the SPPU result sheet
    degree: "B.E., Mechanical Engineering",
    institution: "Modern Education Society's College of Engineering, Pune (Savitribai Phule Pune University)",
    period: "2019 – 2023",
    grade: "CGPA 7.48",
  },
];

// UI labels for the education section, not claims
export const EDUCATION_SECTION = {
  heading: "Education",
  certificationsHeading: "Certifications",
  certificateLink: "view certificate",
};

export const CERTIFICATIONS: Certification[] = [
  {
    // [cert_1]
    name: "Java Full Stack LIVE Course",
    issuer: "Spark 2.0",
    link: "https://drive.google.com/file/d/1wzmtmsWBLMzwFw_TAUU_146hK4m3yOVL/view?usp=sharing",
  },
  {
    // [cert_4]
    name: "Node JS Certification Course",
    issuer: "Scaler",
    date: "Feb 2024",
  },
  {
    // [cert_3] The Drive file is private (HTTP 401 on 2026-10-09), so it has no link until it is shared publicly
    name: "Google Cloud Bootcamp",
    issuer: "GeeksforGeeks",
  },
  {
    // [ach_1]
    name: "100 Days Badge 2024",
    issuer: "LeetCode",
  },
];

// ==========================================
// Contact [personal]
// ==========================================
export const CONTACT_LINKS: ContactLink[] = [
  { label: "Email", value: PERSON.email, href: `mailto:${PERSON.email}` },
  { label: "Phone", value: PERSON.phone, href: PERSON.phoneLink },
  { label: "LinkedIn", value: PERSON.linkedinLabel, href: PERSON.linkedin },
  { label: "GitHub", value: PERSON.githubLabel, href: PERSON.github },
];

// [qa_bank: notice_period, relocation]; the heading is CLOSING_LINE
export const CONTACT_SECTION = {
  label: "Connect",
  notice: `Notice period ${PERSON.noticePeriod}. Open to ${PERSON.openTo}.`,
};

// UI labels for the contact form, not claims
export const CONTACT_FORM = {
  heading: "Send a message",
  name: "Your name",
  email: "Your email",
  message: "Role or message",
  send: "Send message",
  sending: "Sending…",
  sentHeading: "Message sent",
  sentBody: "Thanks for writing. I'll reply to the email address you gave.",
  sendAnother: "Send another message",
  error: "The message couldn't be sent. Please try again, or email me at",
};
