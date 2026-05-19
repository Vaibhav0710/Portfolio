/**
 * Strongly-typed configurations and centralized static data
 * for Vaibhav Jain's Portfolio System.
 * Centralizes all core static content into clean, typed schemas.
 */

export interface NavLink {
  name: string;
  href: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  tech: string[];
  description: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface ProjectService {
  name: string;
  link: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  tags: string[];
  year: string;
  category: string;
  link: string;
  services?: ProjectService[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

// ==========================================
// 1. Navigation Configuration
// ==========================================
export const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#resume' },
  { name: 'Education', href: '#education' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

// ==========================================
// 2. Shared Skills & Tech Stack Configuration
// ==========================================
export const COMPANY_TECH: string[] = [
  ".NET Core",
  "ASP.NET Core",
  "Python",
  "Flask",
  "Redis",
  "Google Cloud Platform",
  "Git",
  "PostgreSQL",
  "Express.js/Node.js",
  "MongoDB",
  "Firebase/Firestore",
  "Swagger"
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages",
    items: ["C# (.NET)", "Java", "Python", "JavaScript", "SQL"]
  },
  {
    category: "Frameworks",
    items: ["ASP.NET Core", "Spring Boot", "Microservices Architecture", "Spring Cloud", "Express.js", "Flask", "EF Core"]
  },
  {
    category: "Cloud & DevOps",
    items: ["Google Cloud Platform (GCP)", "Docker", "Kubernetes", "Kafka", "CI/CD", "Git"]
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "Redis", "MySQL", "MongoDB", "Firestore"]
  }
];

// ==========================================
// 3. Work Experience Configuration
// ==========================================
export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    role: "Junior Software Developer",
    company: "IntelligentDX",
    location: "Pune, India",
    period: "Nov 2025 — Present",
    tech: COMPANY_TECH,
    description: "As a Junior Software Developer at IntelligentDX, I have taken a lead role in engineering high-performance API solutions, most notably a complex appointment rescheduling system that processes over 12,000 monthly transactions with a 99.9% success rate. I architected and implemented a distributed caching strategy using Redis, which not only optimized data retrieval times but directly resulted in a 40% reduction in end-to-end request latency. My responsibilities further evolved into leading the migration of 4,000+ critical business rules from legacy storage to a centralized, high-availability Redis instance. To prepare our platform for future scale, I orchestrated the transition from monolithic processing to a robust, event-driven architecture using Google Cloud Platform (GCP) Pub/Sub and Kafka, enabling asynchronous communication across microservices and improving system fault tolerance."
  },
  {
    role: "Software Engineer Intern",
    company: "IntelligentDX",
    location: "Pune, India",
    period: "Apr 2025 — Oct 2025",
    tech: COMPANY_TECH,
    description: "During my tenure as a Software Engineer Intern, I successfully spearheaded the mission-critical migration of core data layers from MongoDB to PostgreSQL, focusing on complex schema design and data integrity for high-relational healthcare datasets. Security was a primary focus; I implemented enterprise-grade AES-256 encryption for Protected Health Information (PHI) to ensure rigorous HIPAA compliance across all storage layers. I also designed and deployed a centralized Single Sign-On (SSO) authentication system using OAuth 2.0 and OpenID Connect, significantly improving the security posture for 150+ internal personnel. Beyond development, I established the foundation for our API ecosystem by authoring comprehensive Swagger and OpenAPI documentation for over 25 critical endpoints, reducing developer onboarding time by 30%."
  }
];

// ==========================================
// 4. Education Configuration (Includes HTML Highlighting)
// ==========================================
export const EDUCATION_ITEMS: EducationItem[] = [
  {
    degree: "P.G. Diploma in Advanced Computing (PG-DAC)",
    institution: "Sunbeam Institute of Information Technology, Pune",
    period: "Sep 2024 — Feb 2025",
    description: "Completed an intensive, <span class=\"text-on-surface font-semibold\">900-hour full-time program</span> specialized in high-level software engineering. Developed deep expertise in <span class=\"text-primary font-bold\">Enterprise Java (J2EE), .NET Framework (C#), and Modern Web Technologies</span>. Mastered advanced concepts in <span class=\"text-on-surface font-semibold\">Operating Systems (Linux/Unix), Relational Database Management (RDBMS)</span>, and Software Development Methodologies. The program culminated in a 120-hour capstone project focusing on full-stack system architecture and distributed logic."
  },
  {
    degree: "B.E. in Mechanical Engineering",
    institution: "Savitribai Phule Pune University",
    period: "July 2021 — March 2025",
    description: "Graduated with a <span class=\"text-primary font-bold\">CGPA of 7.48</span>, developing a robust foundation in <span class=\"text-on-surface font-semibold\">Systems Thinking and Computational Modeling</span>. Leveraged mathematical rigor and physics-based logic to solve complex mechanical problems—skills that I now translate directly into <span class=\"text-primary font-bold\">backend system design and algorithmic optimization</span>. Experienced in full-cycle product development, from requirements gathering and 3D systems modeling to performance testing and quality validation."
  }
];

// ==========================================
// 5. Featured Projects Configuration
// ==========================================
export const PROJECT_ITEMS: ProjectItem[] = [
  {
    title: "Blockchain-Inspired Voting System",
    description: "A complex, multi-repository microservices ecosystem engineered with Java and Spring Boot for secure, blockchain-inspired online voting. Orchestrates multiple specialized services—including User Identity, Candidate Lifecycle, and Voting Logic—using Spring Cloud Netflix (Eureka) for discovery and Spring Cloud Gateway for centralized routing. Features robust event-driven communication via Kafka and high-speed state management with Redis.",
    tags: ["Java", "Spring Boot", "Microservices", "Spring Cloud", "Kafka", "Redis", "Eureka", "API Gateway"],
    year: "2026",
    category: "Distributed Systems / Microservices",
    link: "https://github.com/Vaibhav0710/Voting_System",
    services: [
      { name: "User Service", link: "https://github.com/Vaibhav0710/Voting_User_Service" },
      { name: "Candidate Service", link: "https://github.com/Vaibhav0710/Voting_Candidate_Service" },
      { name: "API Gateway", link: "https://github.com/Vaibhav0710/Voting_Api-Gateway" },
      { name: "Eureka Server", link: "https://github.com/Vaibhav0710/Voting_Eureka_Server" }
    ]
  },
  {
    title: "Courier Management System",
    description: "A full-stack logistics platform featuring distinct modules for Admin operations, User shipments, and Delivery Partner tracking. Built with a ReactJS frontend and Spring Boot backend for real-time shipment status updates.",
    tags: ["ReactJS", "Spring Boot", "REST API", "MySQL"],
    year: "2025",
    category: "Full-Stack / Logistics",
    link: "https://github.com/Vaibhav0710/Courier-management-system"
  },
  {
    title: "Daily DSA Engine",
    description: "A comprehensive library of optimized data structures and algorithms implemented in Java. Includes rigorous implementations of graphs, trees, and dynamic programming patterns to maintain high-performance algorithmic logic.",
    tags: ["Java", "Algorithms", "DSA", "Logic Optimization"],
    year: "2026",
    category: "Algorithms / Foundation",
    link: "https://github.com/Vaibhav0710/Daily_DSA"
  },
  {
    title: "Rent-A-Car Platform",
    description: "A robust Java-based backend system for vehicle rental management. Features automated booking confirmation, inventory tracking, and secure payment processing integrations.",
    tags: ["Java", "Backend", "JDBC", "Architecture"],
    year: "2025",
    category: "Backend / Management",
    link: "https://github.com/Vaibhav0710/Rent_A_Car"
  }
];

// ==========================================
// 6. External Links & Media Configuration
// ==========================================
export const EXTERNAL_LINKS = {
  // Google Drive CDN link for direct embedding of the profile photo
  PROFILE_PHOTO: "/api/profile-photo",
  
  // Google Drive sharing view link for the resume (seamless PDF viewing in browser)
  RESUME_VIEW: "https://drive.google.com/file/d/1UZ2y_ER-wKaBP7KIc2PIHicbERs4zSWQ/view?usp=sharing",
  
  // Google Drive direct download link for downloading the PDF resume
  RESUME_DOWNLOAD: "https://drive.google.com/uc?export=download&id=1UZ2y_ER-wKaBP7KIc2PIHicbERs4zSWQ"
};
