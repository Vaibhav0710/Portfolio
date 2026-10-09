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

export interface Role {
  title: string;
  type: string;
  period: string;
  bullets: string[];
}

export interface Company {
  name: string;
  description: string;
  location: string;
  period: string;
  stack: string;
  roles: Role[];
}

export interface RepoLink {
  name: string;
  link: string;
}

export interface Project {
  title: string;
  period: string;
  status?: string;
  summary: string;
  bullets: string[];
  stack: string;
  link: string;
  repos?: RepoLink[];
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

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  note?: string;
  modules?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  detail?: string;
  /** Public link to the certificate; leave out while the file is not publicly viewable */
  link?: string;
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
  location: "Pune, India",
  linkedin: "https://www.linkedin.com/in/-vaibhavjain/",
  linkedinLabel: "linkedin.com/in/-vaibhavjain",
  github: "https://github.com/Vaibhav0710",
  githubLabel: "github.com/Vaibhav0710",
  sourceCode: "https://github.com/Vaibhav0710/Portfolio",
  photo: "/api/profile-photo",
  cv: "/Vaibhav_Jain_Java_Backend_Developer_CV.pdf",
  siteUrl: "https://vaibhavjain-portfolio.vercel.app",
  // [qa_bank: notice_period, relocation]
  noticePeriod: "30 days",
  openTo: "Any city in India, remote, or relocating to the UAE, Europe, Japan, Canada or the USA",
};

export const NAV_LINKS: NavLink[] = [
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Connect", href: "#contact" },
];

// ==========================================
// Hero: lines of the eye-test chart, largest first.
// Acuity marks use the 6 m notation printed on charts in India.
// [positioning.headlines, sum_1, pack A2 closing line]
// ==========================================
export const CHART_LINES: { text: string; acuity: string }[] = [
  { text: "Vaibhav", acuity: "6/60" },
  { text: "Jain", acuity: "6/36" },
  { text: "Java backend developer", acuity: "6/24" },
  { text: "Spring Boot, microservices, PostgreSQL", acuity: "6/18" },
  { text: "1.5 years shipping production APIs in healthtech", acuity: "6/12" },
  { text: "Based in Pune. Open to any city in India, remote or relocation", acuity: "6/9" },
];

export const CHART_LAST_LINE = { text: "If you can read this, we should talk.", acuity: "6/6" };

// ==========================================
// About [pack A2, sum_1, sum_5, sum_6, edu_1, edu_2]
// ==========================================
export const ABOUT_PARAGRAPHS: string[] = [
  "I'm a backend developer who builds reliable APIs, background jobs and data pipelines. I studied mechanical engineering, then moved to software through CDAC's PG-DAC programme, where Java became my core language. I use it for my own systems: a 6-service Spring Boot microservices platform and a Spring Boot and React courier platform secured with Spring Security and JWT.",
  "At IntelligentDX, a healthtech company building software for eye-care practices, I've spent 1.5 years (an internship that turned into a full-time role) shipping production backend services on Google Cloud in Python, Node.js and C#/.NET.",
  "I care about idempotent APIs, honest metrics and code other people can maintain. So far that's 400+ pull requests authored, 180+ reviewed and 59 design, API-contract and runbook documents written.",
];

// ==========================================
// Experience: one company, two roles [exp_1]
// Paid work is Python, Node.js and C#/.NET. Never write or imply Java here.
// ==========================================
export const EXPERIENCE: Company = {
  name: "IntelligentDX",
  description: "Healthtech software for eye-care practices",
  location: "Pune, India",
  period: "Apr 2025 – present",
  stack: "Python (Flask), Node.js (Express), C#/.NET, PostgreSQL, MongoDB, Redis, BigQuery, Google Cloud, React/TypeScript",
  roles: [
    {
      title: "Junior Software Developer",
      type: "Full-time",
      period: "Nov 2025 – present",
      bullets: [
        // [exp_1.b34]
        "Built a treatment-plan booking API that books every visit of a multi-appointment plan across up to 15 parallel lanes, with atomic slot reservation, one audit row per appointment and 200/207/422 responses. In production since September 2026.",
        // [exp_1.b29]
        "Designed background sync (Cloud Scheduler to Cloud Run Jobs to PostgreSQL) for 213 providers × 111 locations × 70 visit types, replacing slow or timing-out external calls with indexed database reads.",
        // [exp_1.b32, exp_1.b28]
        "Cut the slot-search API from about 2.7–3.6 s to 1.7–2.5 s with a concurrent pager, and moved scheduling APIs to an EHR's FHIR R4 API with unchanged API contracts.",
        // [exp_1.b20, exp_1.b21]
        "Designed an AI rule-generation platform around Claude (architecture, low-level design, API contract) with validation gates and a repair loop. Prompt caching cut cost per generated rule by about 27–31%.",
        // [exp_1.b23]
        "Built cancel and reschedule APIs on an EHR with no native reschedule: book the new slot first, retry at timed offsets, return HTTP 207 on partial success and keep a full audit trail.",
        // [exp_1.b30]
        "Owned an accuracy dashboard end to end (Flask and React/TypeScript). QA reconciliation against the database passed 228 of 229 checks.",
        // [exp_1.b38]
        "Authored 400+ pull requests, reviewed 180+, and wrote 59 design, API-contract and runbook documents.",
      ],
    },
    {
      title: "Software Engineer Intern",
      type: "Internship, converted to full-time",
      period: "Apr 2025 – Oct 2025",
      bullets: [
        // [exp_1.b1, exp_1.b2]
        "Migrated 10 API read paths across 5 C#/.NET microservices from MongoDB to PostgreSQL in about 8 weeks (PL/pgSQL functions, Dapper repository layer, feature-flag fallback). 9 reached production with identical responses.",
        // [exp_1.b7]
        "Built SSO login, token-validation and token-refresh APIs in a .NET identity service using Microsoft Azure AD.",
        // [exp_1.b13, exp_1.b14]
        "Built the first version of a claim-scrubbing integration in Node.js: an XML-to-JSON claim gateway and a Redis-first cache with PostgreSQL and Firestore fallbacks.",
      ],
    },
  ],
};

// ==========================================
// Projects [proj_1, proj_3, proj_4, proj_5]
// ==========================================
export const LEAD_PROJECT: Project = {
  title: "Blockchain-inspired online voting system",
  period: "Apr 2026 – present",
  status: "In progress: resilience, observability and load testing come next.",
  summary:
    "An election platform split into 6 Spring Boot services, built so that nobody can vote twice and any tampering with a stored vote can be detected.",
  bullets: [
    // [proj_1.b1]
    "6 Spring Boot services (user, candidate, voting, result, API gateway, Eureka discovery). Spring Cloud Gateway handles routing, rate limiting and JWT validation, and each service has its own PostgreSQL database.",
    // [proj_1.b2]
    "Double voting is blocked at three layers: a Redis check that returns 409, a database unique constraint on user and election, and Redis-backed idempotency keys. Every vote carries a SHA-256 hash for tamper detection.",
    // [proj_1.b3, proj_1.b4]
    "Results are aggregated in real time from Kafka vote events by a stateless result service. Stateless JWT authentication with Spring Security, and the whole system runs locally with Docker Compose.",
  ],
  stack: "Java 17, Spring Boot, Spring Cloud Gateway, Eureka, OpenFeign, Spring Security (JWT), Apache Kafka, Redis, PostgreSQL, Docker Compose, Maven",
  link: "https://github.com/Vaibhav0710/Voting_System",
  repos: [
    { name: "User service", link: "https://github.com/Vaibhav0710/Voting_User_Service" },
    { name: "Candidate service", link: "https://github.com/Vaibhav0710/Voting_Candidate_Service" },
    { name: "Voting service", link: "https://github.com/Vaibhav0710/Voting_Voting_Service" },
    { name: "Result service", link: "https://github.com/Vaibhav0710/Voting_Result_Service" },
    { name: "API gateway", link: "https://github.com/Vaibhav0710/Voting_Api-Gateway" },
    { name: "Eureka server", link: "https://github.com/Vaibhav0710/Voting_Eureka_Server" },
  ],
};

export const PROJECTS: Project[] = [
  {
    title: "Courier management system",
    period: "2025",
    summary: "A full-stack courier platform with separate Admin, User and Delivery Partner modules.",
    bullets: [
      // [proj_3.b1, proj_3.b2]
      "Spring Boot REST backend with Spring Data JPA and MySQL, and a React frontend.",
      "The API is secured with Spring Security and JWT, validates requests with Bean Validation and is documented with springdoc OpenAPI.",
    ],
    stack: "Java, Spring Boot, Spring Data JPA, Spring Security, JWT, MySQL, React",
    link: "https://github.com/Vaibhav0710/Courier-management-system",
  },
];

export const MINOR_PROJECTS: MinorProject[] = [
  {
    // [proj_4] console app: no React, no Spring Boot, no payments
    name: "Rent_A_Car",
    description: "A console car-rental system with admin and customer menus and bookings. Core Java, JDBC, MySQL and Maven.",
    links: [{ name: "Code", link: "https://github.com/Vaibhav0710/Rent_A_Car" }],
  },
  {
    // [proj_4] console app: no React, no Spring Boot, no Tailwind
    name: "Pizza-Shop",
    description: "A console pizza-ordering system with sign-up, sign-in, menu, cart and orders. Core Java, JDBC and MySQL.",
    links: [{ name: "Code", link: "https://github.com/Vaibhav0710/Pizza-Shop" }],
  },
  {
    // [proj_5]
    name: "DSA practice",
    description: "Data-structures and algorithms practice, solved in Java.",
    links: [
      { name: "Leetcode-solution", link: "https://github.com/Vaibhav0710/Leetcode-solution" },
      { name: "Daily_DSA", link: "https://github.com/Vaibhav0710/Daily_DSA" },
    ],
  },
];

// ==========================================
// Skills: backend only, Java first [skills, CV skill rows]
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
    category: "Cloud and tools",
    items: [
      { name: "Google Cloud (Cloud Run, Cloud Run Jobs, Cloud Scheduler, Cloud Build)", where: "work" },
      { name: "Docker", where: "work" },
      { name: "Git", where: "work" },
      { name: "CI/CD", where: "work" },
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

// ==========================================
// Education and certifications [edu_1, edu_2, cert_1..3]
// ==========================================
export const EDUCATION: EducationItem[] = [
  {
    degree: "Post Graduate Diploma in Advanced Computing (PG-DAC, CDAC)",
    institution: "Sunbeam Institute of Information Technology, Pune",
    period: "Sep 2024 – Feb 2025",
    // [edu_1] Module names follow C-DAC's official PG-DAC syllabus (cdac.in, checked 2026-10-09), confirmed by Vaibhav
    note: "C-DAC's full-time, 900-hour advanced computing programme, where Java became my core language. It ended with a 120-hour capstone project.",
    modules: [
      "Object-Oriented Programming with Java",
      "Algorithms and Data Structures using Java",
      "Web-based Java Programming (J2EE)",
      "Database Technologies (RDBMS)",
      "Operating Systems (Linux/Unix) and Software Development Methodologies",
      "Microsoft .NET Technologies (C#)",
    ],
  },
  {
    degree: "Bachelor of Technology (B.Tech), Mechanical Engineering",
    institution: "Modern Education Society's College of Engineering, Pune",
    period: "2019 – 2023",
    note: "CGPA 7.48",
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "Java Full Stack LIVE Course",
    issuer: "Spark 2.0",
    link: "https://drive.google.com/file/d/1wzmtmsWBLMzwFw_TAUU_146hK4m3yOVL/view?usp=sharing",
  },
  {
    // Course name as printed on the certificate (career/certificates/certificate-alpha-batch-20-*.pdf)
    name: "Alpha: DSA with Java",
    issuer: "Apna College",
    link: "https://drive.google.com/file/d/16F2l1VdV4U1mn0OftWz9VgqM8YpyMFwY/view?usp=sharing",
  },
  {
    name: "Google Cloud Bootcamp",
    issuer: "GeeksforGeeks",
    // The Drive file is private (HTTP 401 on 2026-10-09). Share it as "Anyone with the link", then restore:
    // link: "https://drive.google.com/file/d/1gm-ZbaVoeAYDpNedGDUW_rH_zjdzWren/view?usp=drive_link",
  },
  {
    // [ach_1]
    name: "100 Days Badge 2024",
    issuer: "LeetCode",
    detail: "Solved problems on 100+ days in 2024.",
  },
];
