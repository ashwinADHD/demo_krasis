export const hero = {
  headline: "Human Intuition × Machine Velocity",
  subheadline: "Full-Spectrum Engineering.",
  lead: "Engineered by Systems Architects. Accelerated by AI.",
  body: "We design, build, and harden mission-critical software, custom PCB silicon, medical IoT hardware, and sovereign cloud infrastructure. By pairing senior systems engineers with autonomous AI pipelines, we deliver production systems at 3x velocity with zero security regressions.",
  ctaPrimary: "Schedule Technical Scoping",
  ctaSecondary: "Review Architecture Stack",
};

export const trustVectors = [
  {
    title: "100% IP & Source Ownership",
    body: "Every schematic, board layout, firmware repository, and cloud infrastructure-as-code template transfers cleanly to your organization.",
  },
  {
    title: "Deterministic Human Sign-Off",
    body: "AI accelerates scaffolding and automated fuzzing, but every physical trace and cryptographic boundary is validated by senior engineers.",
  },
  {
    title: "Continuous Compliance-as-Code",
    body: "Built-in policy engines monitor multi-cloud infrastructure and embedded firmware against SOC 2, ISO 27001, HIPAA, and IEC 62304 standards.",
  },
];

export const about = {
  kicker: "About Us",
  title: "The Human × AI Engineering Paradigm",
  intro:
    "Modern engineering faces a fundamental fork: traditional software development is bogged down by manual boilerplate and slow testing iterations, while pure unsupervised AI generation creates unmaintainable spaghetti code, hallucinated dependencies, and fatal physical-layer vulnerabilities.",
  thesis:
    "We operate a synchronized engineering engine where machine speed serves human architectural rigor:",
};

export const engineeringPhases = [
  {
    phase: "Discovery & Architecture",
    ai: "Generates structural schema variations, models cloud threat trees, drafts boilerplate contracts.",
    human:
      "Validates domain topology, sets fault-tolerance limits, governs cost models and regulatory requirements.",
  },
  {
    phase: "Core Development & Routing",
    ai: "Performs real-time code generation, API adapter scaffolding, and automated trace routing optimization.",
    human:
      "Authors mission-critical business logic, reviews cryptographic primitives, and signs off on PCB physical schematics.",
  },
  {
    phase: "Verification & Testing",
    ai: "Executes autonomous multi-vector fuzzing, generates synthetic load matrices, and tracks memory leaks.",
    human:
      "Conducts physical bench testing, thermal chamber runs, fault injection, and manual fail-safe audits.",
  },
  {
    phase: "Security & Compliance",
    ai: "Runs automated static/dynamic code analysis (SAST/DAST), tracks CVEs, and monitors infrastructure drift.",
    human:
      "Performs manual adversary penetration testing, air-gapped system reviews, and final regulatory audit approvals.",
  },
];

export const engagementModels = [
  {
    title: "Turnkey Product Development",
    subtitle: "From initial circuit schematic to scaled cloud production.",
    points: [
      "End-to-end hardware, firmware, and cloud orchestration.",
      "Design for Manufacturability (DFM) and component resilience.",
      "Full intellectual property and deployment manifest transfer.",
    ],
  },
  {
    title: "Dedicated Engineering Squads",
    subtitle: "AI-accelerated engineering units embedded in your workflow.",
    points: [
      "Direct integration into your GitHub, Jira, and CI/CD pipelines.",
      "Rapid feature acceleration, technical refactoring, and test suites.",
      "Specialized talent in embedded C/Rust, distributed systems, and React.",
    ],
  },
  {
    title: "Strategic Technology Consultancy",
    subtitle: "High-impact architectural audits and regulatory roadmaps.",
    points: [
      "Cloud security posture and infrastructure cost-reduction audits.",
      "Pre-audit compliance gap analysis (SOC 2, ISO 27001, FDA/MDR).",
      "Hardware failure analysis and physical signal integrity audits.",
    ],
  },
];

export const capabilities = [
  {
    title: "Enterprise Platforms & Custom ERP",
    body: "Bespoke software platforms tailored to complex operations — custom ERP and logistics engines, real-time supply-chain reconciliation, and resilient cloud platform engineering across AWS, GCP, and Azure with active-active multi-region failover.",
  },
  {
    title: "Embedded Systems, PCB & Medical IoT",
    body: "High-speed multi-layer PCB design, medical IoT and diagnostic hardware under IEC 62304 and ISO 13485, plus low-level firmware, RTOS BSPs, and cryptographically signed OTA update engines.",
  },
  {
    title: "Cyber Security & DevSecOps",
    body: "Cloud security telemetry, shift-left SAST/DAST automation, dependency and secret-leak tracking, SBOM generation, and zero-trust architecture with mTLS microservices and hardware-enforced cryptographic boundaries.",
  },
  {
    title: "Continuous Compliance Engine",
    body: "Policy-as-code guardrails for Terraform and Helm against SOC 2, ISO 27001, HIPAA, PCI-DSS, and NIST SP 800-53 — with automated evidence harvesting and unified firmware-to-cloud traceability.",
  },
];

export const contact = {
  kicker: "Contact Us",
  title: "Get in Touch",
  body: "Connect directly with our senior engineering architects. Reach out via email or phone for immediate consultation.",
};

export const footer = {
  engineeringEmail: "krasistech@gmail.com",
  location: "Chennai & Hybrid Global Engineering Clusters",
  privacy: "Zero-tracking privacy commitment. No third-party analytics cookies by default.",
};

export const engagementTypes = [
  { value: "turnkey", label: "Turnkey Product Development" },
  { value: "squad", label: "Dedicated Engineering Squad" },
  { value: "advisory", label: "Strategic Technology Advisory" },
] as const;

export const technicalDomains = [
  { value: "erp-cloud", label: "Custom ERP / Cloud" },
  { value: "pcb-iot", label: "PCB / Medical IoT" },
  { value: "security-compliance", label: "Cyber Security / Compliance" },
] as const;
