import { useState, useEffect } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────────────────────

const FEATURED_PROJECTS = [
  {
    id: "pers-engine",
    tag: "AI / Full Stack",
    tagColor: "purple",
    title: "PersAI: pers-engine",
    subtitle: "AI-powered UX analysis tool",
    status: "Live",
    statusColor: "green",
    url: "https://gray-moss-0a4c7ec0f.7.azurestaticapps.net/",
    github: "https://github.com/pal7/pers-engine",
    iframeUrl: "https://gray-moss-0a4c7ec0f.7.azurestaticapps.net/",
    summary:
      "Submit any URL and PersAI scrapes the page with an agentic Playwright session, runs it through Azure OpenAI GPT-5.2 vision, and returns structured UX issues with severity scoring and A/B experiment hypotheses.",
    detail: [
      {
        heading: "How it works",
        body: "A 7-step Playwright agent navigates the URL, captures runtime signals, takes above-fold/mid-page/post-CTA screenshots, detects the tech stack across 58+ tools in 14 categories, and synthesises everything into a structured analysis payload. Screenshots are stored in Azure Blob Storage and returned as public URLs rendered in the UI with vision-analysis captions.",
      },
      {
        heading: "AI layer",
        body: "Azure OpenAI GPT-5.2 (deployed via Azure AI Foundry, Canada Central) handles the analysis. Vision runs on each screenshot; captions are shown in the UI. The next step is feeding those captions into the main analysis prompt so issues can reference actual visual observations (e.g. 'CTA is buried below the hero').",
      },
      {
        heading: "What the output looks like",
        body: "Issues return with severity (high / med / low), description, and recommendation. Experiment cards are expandable accordions showing hypothesis, variant change, target metric, and implementation hint. A 'Generate more experiments' premium tier is UI-complete but not yet wired.",
      },
      {
        heading: "Infrastructure",
        body: "React/Vite/TypeScript frontend on Azure Static Web Apps. Node/Express backend on Azure Container Apps with managed identity reading secrets from Key Vault, no secrets in env files. Cosmos DB for result caching. GitHub Actions CI/CD on every push to main.",
      },
    ],
    stack: ["React 18", "TypeScript", "Vite", "Node/Express", "Playwright", "Azure OpenAI GPT-5.2", "Azure Container Apps", "Azure Static Web Apps", "Cosmos DB", "Azure Blob Storage", "Azure AI Foundry", "Docker"],
    roadmap: [
      { label: "Live", color: "green", item: "Agentic Playwright · GPT-5.2 vision · Screenshot gallery · Tech stack detection (58 tools)" },
      { label: "Next", color: "blue", item: "Wire vision captions into main prompt · Cosmos DB caching · Annotated screenshot overlays (canvas/SVG bounding boxes)" },
      { label: "Planned", color: "amber", item: "PDF report export · 'Generate more' auth gate · Experiment card screenshot context" },
      { label: "Vision", color: "purple", item: "Multi-site benchmarking · Integration with Adobe Target / Optimizely · RAG over crawled history" },
    ],
  },
  {
    id: "kanmani",
    tag: "AI / Mobile",
    tagColor: "coral",
    title: "Kanmani (கண்மணி)",
    subtitle: "Bilingual Tamil-English AI chat",
    status: "In Progress",
    statusColor: "amber",
    url: null,
    github: "https://github.com/pal7/kanmani",
    summary:
      "A production-quality bilingual AI chat PWA built for Tamil speakers in Toronto and around the world. Users switch between English and Tamil mid-conversation; the app routes to different Azure OpenAI models per language and mirrors the user's register (formal, casual, Tanglish code-mixed).",
    detail: [
      {
        heading: "The gap it fills",
        body: "Existing Tamil AI tools (Lavanya, Chat AI Tamil, TamilAI.in) are basic wrappers with no real bilingual UX. Kanmani is designed mobile-first (Android PWA), installable, with an offline shell, and it responds in the script and register the user is actually writing in, including code-mixed Tanglish.",
      },
      {
        heading: "Bilingual architecture",
        body: "Language is first-class: it determines the UI strings, system prompt, font stack, and AI model. Tamil routes to GPT-4o (full model, since Tamil tokenization runs 3-4x denser than English). English routes to GPT-4o-mini for cost efficiency. Auto-generated chat titles always use gpt-4o-mini regardless of language. Mid-chat language switch rotates the system prompt live.",
      },
      {
        heading: "Streaming & infra",
        body: "SSE (Server-Sent Events) for token-by-token streaming, chosen over WebSockets because the stream is one-directional and SSE survives most corporate proxies. Context window is token-aware via tiktoken (o200k_base), not message-count, which matters a lot given Tamil's token density. Auth via Supabase (email + Google OAuth) with RLS-enforced Postgres.",
      },
      {
        heading: "Design system",
        body: "Warm paper palette (#FAF6F0 background, terracotta accent #C24A2D) with a subtle Kolam (கோலம்) motif on empty states. Brand mark is the Tamil character ஃ. Noto Sans Tamil is self-hosted since Google Fonts CDN is unreliable in India. Fraunces for display, DM Sans for Latin body copy.",
      },
    ],
    stack: ["React 18", "TypeScript", "Vite", "TailwindCSS", "Zustand", "Node/Express", "SSE", "Azure AI Foundry", "GPT-4o", "GPT-4o-mini", "Phi-4", "Supabase Auth", "Supabase Postgres", "PWA / Workbox", "Azure Static Web Apps", "tiktoken"],
    roadmap: [
      { label: "MVP", color: "blue", item: "Auth · English + Tamil streaming chat · Chat history sidebar · Android PWA install · Azure deployment" },
      { label: "Phase 2", color: "amber", item: "Voice input + TTS (Azure Speech) · Markdown rendering · Dark mode · Shareable chat links · Phi-4 A/B test" },
    ],
  },
];

const BMO_GROUPS = [
  {
    id: "personalization",
    label: "Personalization & A/B Testing",
    description: "End-to-end ownership of the personalization and experimentation stack across bmo.com — all lines of business — covering campaign implementation, site audits, A/B and multivariate testing, internal tooling, and live-test monitoring.",
    stack: [
      "Adobe Target", "A4T", "A/B Testing", "MVT", "Experience Targeting",
      "Adobe Analytics", "Adobe Launch", "Salesforce Marketing Cloud",
      "Angular 19", "TypeScript", "RxJS", "React", "Gatsby",
    ],
    summary: "Subject matter expert in Adobe Target, delivering A/B, multivariate (MVT), and experience targeting campaigns across bmo.com and all lines of business. Integrated Adobe Analytics via A4T (Analytics for Target) for campaign-level reporting and lift measurement. Conducted site audits to identify personalization opportunities and assess page readiness for targeting. Integrated Salesforce Marketing Cloud for triggered email journeys tied to in-app actions. Instrumented Adobe Analytics with a typed Angular service layer covering 100+ tracked interactions.",
    tools: [
      {
        id: "pers-lib",
        title: "pers-lib",
        status: "Shipped · Internal",
        summary: "Internal npm component library for the personalization team, structured after Material UI — atoms, organisms, and layout components consumed via package imports rather than copy-pasting markup across campaigns. Built in React with TypeScript, it covered buttons, modals, banners, overlays, and form elements all pre-styled to BMO brand standards. Shipped with a live-reload dev server so experience developers could compose and preview Target variants without a full rebuild cycle.",
        stack: ["React", "TypeScript", "npm", "Webpack", "Live Reload"],
      },
      {
        id: "pers-tsc-gen",
        title: "pers-tsc-gen",
        status: "Shipped · Internal",
        summary: "Command-line TypeScript scaffolding tool for Adobe Target experience scripts. Engineers authored experiences in TypeScript — with full type safety, IDE autocompletion, and shared type definitions for BMO's data layer and Adobe Target's mbox and profile objects — and pers-tsc-gen compiled output to ES5-compatible JavaScript ready to deploy directly into Target's code editor. Cut campaign setup time by approximately 60% by eliminating manual boilerplate and enforcing a consistent script structure across the team.",
        stack: ["TypeScript", "Node.js", "Babel", "Adobe Target", "ES5"],
      },
      {
        id: "pct",
        title: "PCT: Personalization Campaign Tracker",
        status: "UI built · not shipped",
        summary: "Internal tool to detect silently broken Adobe Target activities caused by DOM changes, ID updates, or content shifts that Adobe's dashboard doesn't surface. Built the Gatsby frontend UI, a health dashboard showing live test status (OK / warning / broken) with expandable detail per campaign, backed by a Puppeteer headless Chrome validation service.",
        stack: ["Gatsby", "TypeScript", "Puppeteer", "REST APIs"],
      },
    ],
  },
  {
    id: "wealth",
    label: "BMO Wealth Digital",
    description: "Frontend engineering across two flagship investing platforms serving Canadian retail and self-directed investors.",
    products: [
      {
        id: "investorline",
        name: "BMO InvestorLine",
        type: "Self-directed investing platform",
        tagColor: "blue",
        links: {
          web: "https://www.secure.bmoinvestorline.com/ILClientWeb/login/DisplayLogin.jsp?refresh=true&lang=E",
          ios: "https://apps.apple.com/ca/app/bmo-invest/id1600976936",
          android: "https://play.google.com/store/apps/details?id=com.bmo.invest",
        },
        contribution: "Built trading dashboard components, Redoc micro-app, multi-step reactive forms, account flows, and ongoing feature delivery across web and mobile (Angular + Capacitor).",
        stack: ["Angular 19", "Capacitor", "TypeScript", "RxJS", "Redoc", "Azure DevOps"],
        previewImg: "/previews/il.png",
      },
      {
        id: "smartfolio",
        name: "BMO Smartfolio",
        type: "Robo-advisory / guided investing platform",
        tagColor: "green",
        links: {
          web: "https://www.bmosmartfolio.com/client/#/onboarding/expectation-setting",
        },
        contribution: "Led the migration from legacy AngularJS to Angular 19, rebuilding components, services, and routing to modern Angular patterns while keeping the platform live.",
        stack: ["Angular 19", "AngularJS", "TypeScript", "RxJS"],
        previewImg: "/previews/sf.png",
      },
    ],
  },
  {
    id: "compliance",
    label: "Compliance & Security",
    description: "Privacy, consent, and security implementations across InvestorLine and Smartfolio.",
    items: [
      {
        id: "onetrust",
        name: "OneTrust Cookie Consent",
        tagColor: "coral",
        type: "GDPR / CCPA compliance",
        summary: "Implemented OneTrust SDK across Smartfolio and InvestorLine. Built consent-aware script blocking where third-party tags (analytics, marketing, functional) fire conditionally based on user consent state. Coordinated with legal to map cookie categories to OneTrust groups.",
        stack: ["OneTrust SDK", "Angular", "TypeScript", "GDPR", "CCPA"],
      },
      {
        id: "phishlabs",
        name: "PhishLabs Security Integration",
        tagColor: "purple",
        type: "Threat intelligence",
        summary: "Integrated PhishLabs detection scripts into InvestorLine via Angular service wrappers, surfacing real-time phishing and spoofing alerts to protect client accounts without disrupting trading workflows.",
        stack: ["PhishLabs", "Angular", "TypeScript", "RxJS"],
      },
    ],
  },
];

const WEBSITES = [
  {
    title: "Burnaby Chiropractic",
    url: "https://www.burnabychiro.com",
    year: "2020",
    type: "Client Project",
    typeColor: "teal",
    hosting: "Wireframe · Design · Full build · Maintenance",
    previewImg: "/previews/burnabychiro.png",
    summary: "End-to-end design and build for a chiropractic clinic in Burnaby, BC, from initial wireframes through visual design to production. First client project. Appeared in the first 10 Google search results within 2 months of launch.",
    bullets: [
      "Owned the full product design lifecycle: user research, wireframing, visual design, and frontend build, all working solo",
      "Designed for local conversion with clear CTAs, trust signals, and a contact flow optimized for appointment bookings",
      "Achieved first-page Google ranking within 2 months via semantic HTML5, schema.org local business markup, and on-page SEO",
      "Custom reviews and treatments sliders in vanilla JS, modular and framework-free, built for easy client handoff",
      "Optimized Core Web Vitals: sub-2s LCP on mobile, zero CLS",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "Figma / Wireframing", "SEO", "Schema.org"],
  },
  {
    title: "Canada Nagarathar Sangam",
    url: "https://www.canadanagaratharsangam.com",
    year: "2024",
    type: "Volunteer",
    typeColor: "purple",
    hosting: "OVH · Docker",
    summary: "Full-stack web application for the Canada chapter of a Tamil cultural organization, covering events, gallery, membership, and community features. Built with TypeScript, Node/Express, and Docker on OVH. UI designed with Claude. Volunteer contribution alongside two other developers. Private repo.",
    bullets: [
      "TypeScript full-stack: Vite frontend + Node/Express backend, containerized with Docker and deployed via a custom shell deploy script to OVH",
      "Docker Compose deployment where the script auto-installs Docker on the target server, builds the image, and runs the app; supports --init-db flag for first-time database seeding",
      "Server-side SQLite with optional matrimonial and login/signup feature flags via environment config",
      "Mobile-first responsive layout covering events calendar, gallery, and membership",
    ],
    roadmap: [
      "Member login portal with authenticated accounts, profile pages, and a member directory",
      "Interactive event planning with RSVP, potluck coordination, and volunteer sign-up for community events",
      "Member-to-member features to see who else is attending and connect with other members",
      "Full PWA, installable on Android and iOS with an offline shell and push notifications for events",
    ],
    stack: ["TypeScript", "Node.js", "Express", "Vite", "Docker", "SQLite", "OVH", "Shell"],
    previewImg: "/previews/cns.png",
  },
];

// ─── SVG ICON PATHS ───────────────────────────────────────────────────────────

const ICONS = {
  linkedin: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  github: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  email: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
};

function SvgIcon({ name, size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d={ICONS[name]} />
    </svg>
  );
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

const TAG_STYLE = {
  blue:   { bg: "#E6F1FB", text: "#0C447C" },
  teal:   { bg: "#E1F5EE", text: "#085041" },
  coral:  { bg: "#FAECE7", text: "#993C1D" },
  purple: { bg: "#EEEDFE", text: "#3C3489" },
  amber:  { bg: "#FAEEDA", text: "#854F0B" },
  green:  { bg: "#EAF3DE", text: "#3B6D11" },
};

function Tag({ label, color = "blue", small = false }) {
  const c = TAG_STYLE[color] || TAG_STYLE.blue;
  return (
    <span style={{
      background: c.bg, color: c.text,
      fontSize: small ? 10 : 11,
      fontWeight: 600,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      padding: small ? "2px 7px" : "3px 10px",
      borderRadius: 4,
      display: "inline-block",
      whiteSpace: "nowrap",
    }}>{label}</span>
  );
}

function Pill({ label }) {
  return (
    <span style={{
      background: "#f3f4f6", color: "var(--text-secondary)",
      fontSize: 11, padding: "3px 9px", borderRadius: 4,
      fontFamily: "'SF Mono','Fira Code',monospace",
      border: "0.5px solid var(--border)", whiteSpace: "nowrap",
    }}>{label}</span>
  );
}

function Dot() {
  return <span style={{
    display: "inline-block", width: 4, height: 4,
    borderRadius: "50%", background: "#d1d5db",
    position: "absolute", left: 0, top: "0.6em",
  }} />;
}

function BulletList({ items, color = "#374151", size = 14 }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
      {items.map((b, i) => (
        <li key={i} style={{ fontSize: size, color, lineHeight: 1.7, marginBottom: 6, paddingLeft: 16, position: "relative" }}>
          <Dot />{b}
        </li>
      ))}
    </ul>
  );
}

function ToggleButton({ expanded }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      title={expanded ? "Collapse" : "Expand"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 28, height: 28, borderRadius: "50%",
        background: hovered ? "var(--accent-blue)" : "var(--bg-inset)",
        border: hovered ? "1px solid var(--accent-blue)" : "1px solid var(--border)",
        color: hovered ? "#ffffff" : "var(--text-secondary)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", transition: "all 0.2s ease", flexShrink: 0,
        fontSize: 18,
        transform: expanded ? "rotate(45deg)" : "rotate(0deg)",
      }}
    >+</button>
  );
}

function NavButton({ label, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "none", border: "none", cursor: "pointer",
        fontSize: 13, padding: 0, fontFamily: "inherit",
        color: hovered ? "#ffffff" : "#9ca3af",
        transition: "color 0.2s",
      }}
    >{label}</button>
  );
}

function HeroSocialLink({ label, href, iconName, primary }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 7,
        fontSize: 13, textDecoration: "none",
        padding: "7px 16px", borderRadius: "var(--radius-sm)",
        opacity: hovered ? 0.8 : 1,
        transition: "opacity 0.2s",
        ...(primary
          ? { color: "var(--accent-blue)", background: "var(--accent-bg)", border: "0.5px solid var(--accent-border)" }
          : { color: "var(--text-secondary)", border: "0.5px solid var(--border)" }),
      }}
    >
      <SvgIcon name={iconName} size={15} />
      {label}
    </a>
  );
}

function FooterSocialLink({ label, href, iconName }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 7,
        fontSize: 13, textDecoration: "none",
        color: hovered ? "#9ca3af" : "#ffffff",
        transition: "color 0.2s",
      }}
    >
      <SvgIcon name={iconName} size={13} />
      {label}
    </a>
  );
}

// ─── FEATURED PROJECT CARD ────────────────────────────────────────────────────

function FeaturedCard({ project }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);
  const statusC = TAG_STYLE[project.statusColor] || TAG_STYLE.green;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "0.5px solid var(--border)", borderRadius: "var(--radius-lg)",
        overflow: "hidden", background: "var(--bg-card)",
        marginBottom: 16,
        transition: "all 0.2s ease",
        boxShadow: hovered ? "var(--shadow-md)" : "var(--shadow-sm)",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
      }}
    >
      <div
        onClick={() => setOpen(v => !v)}
        style={{
          padding: "1.75rem 1.75rem 1.5rem",
          cursor: "pointer",
          display: "flex", flexDirection: "column", gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <Tag label={project.tag} color={project.tagColor} />
            <span style={{
              fontSize: 11, fontWeight: 500,
              background: statusC.bg, color: statusC.text,
              padding: "2px 8px", borderRadius: 4,
              textTransform: "uppercase", letterSpacing: "0.05em",
            }}>{project.status}</span>
          </div>
          <ToggleButton expanded={open} />
        </div>

        <div>
          <h3 style={{
            fontSize: 21, fontWeight: 700, margin: "0 0 4px",
            color: "var(--text-primary)", fontFamily: "'Georgia',serif", letterSpacing: "-0.02em",
          }}>{project.title}</h3>
          <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>{project.subtitle}</p>
        </div>

        <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
          {project.summary}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 2 }}>
          {project.stack.map(t => <Pill key={t} label={t} />)}
        </div>
      </div>

      {open && (
        <div style={{ borderTop: "0.5px solid #f3f4f6", padding: "1.5rem 1.75rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.25rem 2rem", marginBottom: "1.5rem" }}>
            {project.detail.map(d => (
              <div key={d.heading}>
                <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", margin: "0 0 6px" }}>
                  {d.heading}
                </p>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>{d.body}</p>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "0.5px solid #f3f4f6", paddingTop: "1.25rem", marginBottom: "1.25rem" }}>
            <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", margin: "0 0 10px" }}>
              Roadmap
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {project.roadmap.map(r => {
                const c = TAG_STYLE[r.color] || TAG_STYLE.blue;
                return (
                  <div key={r.label} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 600, background: c.bg, color: c.text,
                      padding: "2px 7px", borderRadius: 3, textTransform: "uppercase",
                      letterSpacing: "0.05em", flexShrink: 0,
                    }}>{r.label}</span>
                    <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6 }}>{r.item}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {project.iframeUrl && (
            <div style={{ borderTop: "0.5px solid var(--border-light)", paddingTop: "1.25rem", marginBottom: "1.25rem" }}>
              <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", margin: "0 0 10px" }}>
                Live preview
              </p>
              <div style={{
                borderRadius: "var(--radius-md)", overflow: "hidden",
                border: "0.5px solid var(--border)", boxShadow: "var(--shadow-md)",
              }}>
                <div style={{
                  height: 30, background: "var(--border-light)",
                  borderBottom: "0.5px solid var(--border)",
                  display: "flex", alignItems: "center", padding: "0 10px", gap: 5,
                }}>
                  {["#f87171","#fbbf24","#34d399"].map(c => (
                    <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.8 }} />
                  ))}
                  <div style={{
                    flex: 1, height: 15, background: "var(--bg-subtle)",
                    borderRadius: 10, marginLeft: 8,
                    display: "flex", alignItems: "center", paddingLeft: 10, gap: 8,
                  }}>
                    <span style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "monospace" }}>
                      {project.iframeUrl.replace("https://", "")}
                    </span>
                    {iframeLoading && !iframeError && (
                      <span style={{ fontSize: 9, color: "var(--text-muted)", fontStyle: "italic" }}>Loading preview…</span>
                    )}
                  </div>
                  <a href={project.iframeUrl} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 9, color: "var(--accent-blue)", textDecoration: "none", marginLeft: 6, flexShrink: 0 }}>
                    ↗
                  </a>
                </div>
                {iframeError ? (
                  <div style={{
                    height: 380, display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    background: "var(--bg-subtle)", gap: 12,
                  }}>
                    <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>Preview unavailable</p>
                    <a href={project.iframeUrl} target="_blank" rel="noopener noreferrer" style={{
                      fontSize: 13, color: "var(--accent-blue)", textDecoration: "none",
                      border: "0.5px solid var(--accent-border)", padding: "6px 14px",
                      borderRadius: "var(--radius-sm)", background: "var(--accent-bg)",
                    }}>Try it →</a>
                  </div>
                ) : (
                  <iframe
                    src={project.iframeUrl}
                    title={`${project.title} live preview`}
                    style={{ width: "100%", height: 380, border: "none", display: "block" }}
                    loading="lazy"
                    onLoad={() => setIframeLoading(false)}
                    onError={() => { setIframeLoading(false); setIframeError(true); }}
                  />
                )}
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" style={{
                fontSize: 13, color: "var(--accent-blue)", textDecoration: "none",
                border: "0.5px solid var(--accent-border)", padding: "6px 14px",
                borderRadius: "var(--radius-sm)", background: "var(--accent-bg)",
              }}>Try it →</a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
                fontSize: 13, color: "var(--text-secondary)", textDecoration: "none",
                border: "0.5px solid var(--border)", padding: "6px 14px", borderRadius: "var(--radius-sm)",
              }}>GitHub ↗</a>
            )}
            {project.githubNote && !project.github && (
              <span style={{
                fontSize: 12, color: "var(--text-muted)",
                fontStyle: "italic",
              }}>⏳ {project.githubNote}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PCT ARCHITECTURE DIAGRAM ────────────────────────────────────────────────

// ─── BMO GROUP COMPONENTS ─────────────────────────────────────────────────────

function AppLinks({ links }) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
      {links.web && (
        <a href={links.web} target="_blank" rel="noopener noreferrer" style={{
          fontSize: 11, color: "#185FA5", textDecoration: "none",
          border: "0.5px solid #B5D4F4", padding: "5px 11px",
          borderRadius: 5, background: "#E6F1FB",
        }}>Visit website ↗</a>
      )}
      {links.ios && (
        <a href={links.ios} target="_blank" rel="noopener noreferrer" style={{
          display: "flex", alignItems: "center", gap: 5,
          fontSize: 11, color: "var(--text-secondary)", textDecoration: "none",
          border: "0.5px solid #d1d5db", padding: "5px 11px",
          borderRadius: 5, background: "var(--bg-subtle)",
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
          App Store
        </a>
      )}
      {links.android && (
        <a href={links.android} target="_blank" rel="noopener noreferrer" style={{
          display: "flex", alignItems: "center", gap: 5,
          fontSize: 11, color: "var(--text-secondary)", textDecoration: "none",
          border: "0.5px solid #d1d5db", padding: "5px 11px",
          borderRadius: 5, background: "var(--bg-subtle)",
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.523 15.341 4.59 22.279a1.015 1.015 0 0 1-1.085-.07l8.261-8.262 5.757 1.394zm1.537-1.07a1.01 1.01 0 0 0 .44-.85v-.002a1.01 1.01 0 0 0-.44-.85l-2.132-1.228-6.112 6.113 2.132 1.228 6.112-3.41zM3.06 2.79a1.015 1.015 0 0 0-.06.43v17.56c0 .16.03.3.06.43l8.493-8.493L3.06 2.79zm1.53.93 12.933 6.938-5.757 5.757-7.176-12.695z"/></svg>
          Google Play
        </a>
      )}
    </div>
  );
}

function BMOProductCard({ p }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: "0.5px solid var(--border)", borderRadius: "var(--radius-md)",
        overflow: "hidden", background: "var(--bg-subtle)",
        transition: "all 0.2s ease",
        boxShadow: hovered ? "var(--shadow-md)" : "var(--shadow-sm)",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
      }}
    >
      <SitePreview url={p.links.web} src={p.previewImg} title={p.name} />
      <div style={{ padding: "1rem" }}>
        <div style={{ marginBottom: 7 }}>
          <Tag label={p.type} color={p.tagColor} small />
        </div>
        <h4 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 5px", color: "var(--text-primary)", fontFamily: "'Georgia',serif", letterSpacing: "-0.01em" }}>{p.name}</h4>
        <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.65, margin: "0 0 10px" }}>{p.contribution}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 8 }}>
          {p.stack.map(t => <Pill key={t} label={t} />)}
        </div>
        <AppLinks links={p.links} />
      </div>
    </div>
  );
}

function BMOWealthGroup({ group }) {
  return (
    <div style={{ borderBottom: "0.5px solid var(--border)", padding: "2rem 0" }}>
      <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 4px" }}>{group.description}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 12, marginTop: 16 }}>
        {group.products.map(p => <BMOProductCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}

function BMOPersGroup({ group }) {
  const [openTools, setOpenTools] = useState({});
  const toggle = (id) => setOpenTools(v => ({ ...v, [id]: !v[id] }));
  return (
    <div style={{ borderBottom: "0.5px solid #e5e7eb", padding: "2rem 0" }}>
      <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 10px" }}>{group.description}</p>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75, margin: "0 0 16px" }}>{group.summary}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 20 }}>
        {group.stack.map(t => <Pill key={t} label={t} />)}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {group.tools.map(tool => (
          <div key={tool.id} style={{
            border: "0.5px solid var(--border)", borderRadius: "var(--radius-sm)",
            overflow: "hidden", background: "var(--bg-subtle)",
          }}>
            <div onClick={() => toggle(tool.id)} style={{
              padding: "1rem 1.25rem", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <Tag label="Internal Tool" color="teal" small />
                  <span style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "system-ui" }}>{tool.status}</span>
                </div>
                <h4 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: "var(--text-primary)", fontFamily: "'Georgia',serif" }}>
                  {tool.title}
                </h4>
              </div>
              <ToggleButton expanded={!!openTools[tool.id]} />
            </div>
            {openTools[tool.id] && (
              <div style={{ padding: "0 1.25rem 1.25rem", borderTop: "0.5px solid #f3f4f6" }}>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, margin: "12px 0 12px" }}>{tool.summary}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {tool.stack.map(t => <Pill key={t} label={t} />)}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function BMOComplianceGroup({ group }) {
  return (
    <div style={{ borderBottom: "0.5px solid #e5e7eb", padding: "2rem 0" }}>
      <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 16px" }}>{group.description}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 12 }}>
        {group.items.map(item => (
          <div key={item.id} style={{
            border: "0.5px solid var(--border)", borderRadius: "var(--radius-md)",
            padding: "1.25rem", background: "var(--bg-subtle)",
          }}>
            <div style={{ marginBottom: 8 }}>
              <Tag label={item.type} color={item.tagColor} small />
            </div>
            <h4 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 6px", color: "var(--text-primary)", fontFamily: "'Georgia',serif" }}>{item.name}</h4>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65, margin: "0 0 10px" }}>{item.summary}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {item.stack.map(t => <Pill key={t} label={t} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SITE PREVIEW ─────────────────────────────────────────────────────────────

function SitePreview({ url, src, title }) {
  if (!src) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none" }}>
        <div style={{
          width: "100%", height: 180,
          background: "var(--bg-subtle)",
          border: "0.5px solid var(--border)",
          borderRadius: "var(--radius-md)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          gap: 8, cursor: "pointer",
          transition: "background 0.15s",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            height: 28, background: "var(--border-light)",
            borderBottom: "0.5px solid var(--border)",
            display: "flex", alignItems: "center", padding: "0 10px", gap: 5,
          }}>
            {["#f87171","#fbbf24","#34d399"].map(c => (
              <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.7 }} />
            ))}
            <div style={{
              flex: 1, height: 14, background: "var(--bg-subtle)",
              borderRadius: 10, marginLeft: 8,
              display: "flex", alignItems: "center", paddingLeft: 8,
            }}>
              <span style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "monospace" }}>
                {url.replace("https://www.", "")}
              </span>
            </div>
          </div>
          <div style={{ marginTop: 20, textAlign: "center" }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: "var(--accent-blue)", margin: 0 }}>Visit live site ↗</p>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none" }}>
      <div style={{
        width: "100%", borderRadius: "var(--radius-md)",
        border: "0.5px solid var(--border)",
        overflow: "hidden", boxShadow: "var(--shadow-md)",
      }}>
        <div style={{
          height: 28, background: "var(--border-light)",
          borderBottom: "0.5px solid var(--border)",
          display: "flex", alignItems: "center", padding: "0 10px", gap: 5,
        }}>
          {["#f87171","#fbbf24","#34d399"].map(c => (
            <div key={c} style={{ width: 8, height: 8, borderRadius: "50%", background: c, opacity: 0.8 }} />
          ))}
          <div style={{
            flex: 1, height: 14, background: "var(--bg-subtle)",
            borderRadius: 10, marginLeft: 8,
            display: "flex", alignItems: "center", paddingLeft: 8,
          }}>
            <span style={{ fontSize: 9, color: "var(--text-muted)", fontFamily: "monospace" }}>
              {url.replace("https://www.", "")}
            </span>
          </div>
        </div>
        <img src={src} alt={`${title} homepage preview`}
          style={{ width: "100%", height: 180, objectFit: "cover", objectPosition: "top", display: "block" }} />
      </div>
    </a>
  );
}

// ─── WEBSITE CARD ─────────────────────────────────────────────────────────────

function WebsiteCard({ site }) {
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--bg-card)", border: "0.5px solid var(--border)",
        borderRadius: "var(--radius-lg)", overflow: "hidden",
        display: "flex", flexDirection: "column",
        transition: "all 0.2s ease",
        boxShadow: hovered ? "var(--shadow-md)" : "var(--shadow-sm)",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
        alignSelf: "start",
      }}
    >
      <SitePreview url={site.url} src={site.previewImg} title={site.title} />

      {/* Header — always visible, clickable to expand */}
      <div
        onClick={() => setOpen(v => !v)}
        style={{ padding: "1.25rem 1.25rem 1rem", cursor: "pointer" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <Tag label={site.type} color={site.typeColor} />
            <h3 style={{
              fontSize: 16, fontWeight: 700, margin: "7px 0 2px",
              color: "var(--text-primary)", fontFamily: "'Georgia',serif", letterSpacing: "-0.01em",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>{site.title}</h3>
            <p style={{
              fontSize: 11, color: "var(--text-muted)", margin: "2px 0 0",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
            }}>
              {site.year}{site.hosting && ` · ${site.hosting}`}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <a href={site.url} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                fontSize: 11, color: "var(--accent-blue)", textDecoration: "none",
                border: "0.5px solid var(--accent-border)", padding: "5px 10px",
                borderRadius: "var(--radius-sm)", background: "var(--accent-bg)", flexShrink: 0,
              }}>Visit ↗</a>
            <ToggleButton expanded={open} />
          </div>
        </div>
      </div>

      {/* Expandable detail */}
      {open && (
        <div style={{
          padding: "1rem 1.25rem 1.25rem",
          borderTop: "0.5px solid var(--border-light)",
          display: "flex", flexDirection: "column", gap: 10,
        }}>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65, margin: 0 }}>{site.summary}</p>
          <BulletList items={site.bullets} color="var(--text-secondary)" size={12} />

          {site.roadmap && (
            <div style={{
              background: "var(--bg-subtle)", borderRadius: "var(--radius-sm)",
              padding: "10px 12px", marginTop: 2,
            }}>
              <p style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", margin: "0 0 7px" }}>
                Phase 2 Roadmap
              </p>
              {site.roadmap.map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 7, marginBottom: 5, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 3, flexShrink: 0 }}>◦</span>
                  <span style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5 }}>{r}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 2 }}>
            {site.stack.map(t => <Pill key={t} label={t} />)}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const scrollTo = id => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navItems = [
    { label: "Projects", id: "projects" },
    { label: "BMO Work", id: "bmo" },
    { label: "Websites", id: "websites" },
    { label: "About", id: "about" },
  ];

  return (
    <div style={{ background: "var(--bg-base)", minHeight: "100vh", color: "var(--text-primary)" }}>
      {/* NAV */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(17,17,17,0.97)",
        backdropFilter: "blur(10px)",
        borderBottom: "0.5px solid rgba(255,255,255,0.08)",
        padding: "0 24px",
      }}>
        <div style={{
          maxWidth: 800, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: 54,
        }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#ffffff", letterSpacing: "-0.01em" }}>
            AR
          </span>
          <div className="nav-links" style={{ display: "flex", gap: 24 }}>
            {navItems.map(n => (
              <NavButton key={n.label} label={n.label} onClick={() => scrollTo(n.id)} />
            ))}
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 20px" }}>

        {/* HERO */}
        <section className="section-hero" style={{ padding: "5rem 0 3.5rem" }}>
          <p style={{
            fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase",
            letterSpacing: "0.1em", margin: "0 0 14px",
          }}>Frontend-Focused Full-Stack Developer · Adobe Target Engineer · Toronto, CA</p>
          <h1 style={{
            fontSize: "clamp(34px,6vw,52px)", fontWeight: 700,
            margin: "0 0 18px", lineHeight: 1.15,
            letterSpacing: "-0.03em", color: "var(--text-primary)",
            fontFamily: "'Georgia',serif",
          }}>
            Ashwin{" "}
            <span style={{ color: "#9ca3af" }}>Palaniappan</span>
            <br />
            Ramani
          </h1>
          <p style={{
            fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.75,
            maxWidth: 540, margin: "0 0 28px",
          }}>
            Frontend-focused Full-Stack Developer and AI Product Engineer with 8 years of experience
            shipping production applications for Fortune 500 financial institutions. Currently at BMO
            InvestorLine via TCS, with deep roots in Angular, React, and enterprise-scale UI systems.
            Building AI-powered side projects in personalization, agentic automation, and bilingual
            product design on the side.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <HeroSocialLink label="LinkedIn" href="https://www.linkedin.com/in/ashwin-ramani/" iconName="linkedin" primary />
            <HeroSocialLink label="GitHub" href="https://github.com/pal7/" iconName="github" primary={false} />
            <HeroSocialLink label="Email" href="mailto:ashwnramani@gmail.com" iconName="email" primary={false} />
          </div>
        </section>

        {/* SKILLS STRIP */}
        <div style={{
          borderTop: "0.5px solid var(--border)", borderBottom: "0.5px solid var(--border)",
          display: "flex", flexWrap: "wrap", gap: "10px 24px",
          background: "var(--bg-subtle)",
          borderRadius: "var(--radius-sm)",
          padding: "1rem 1.25rem",
          marginBottom: "0.5rem",
        }}>
          {["Angular 19", "React", "TypeScript", "RxJS", "Adobe Target", "AT.js", "VEC", "Form-Based Composer", "Profile Scripts", "Adobe Launch", "A4T", "Adobe Analytics", "Audience Segmentation", "OneTrust", "SFMC", "Azure DevOps", "Docker", "Capacitor", "WCAG 2.1 AA"].map(s => (
            <span key={s} style={{ fontSize: 12, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{s}</span>
          ))}
        </div>

        {/* FEATURED PROJECTS */}
        <section id="projects" className="section-main" style={{ padding: "3.5rem 0 2rem" }}>
          <div style={{ marginBottom: "1.75rem" }}>
            <p style={{
              fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase",
              letterSpacing: "0.1em", margin: "0 0 6px",
            }}>Side Projects</p>
            <h2 style={{
              fontSize: 26, fontWeight: 700, margin: 0,
              color: "var(--text-primary)", fontFamily: "'Georgia',serif", letterSpacing: "-0.02em",
            }}>Personal Work</h2>
          </div>
          {FEATURED_PROJECTS.map(p => <FeaturedCard key={p.id} project={p} />)}
        </section>

        {/* BMO */}
        <section id="bmo" className="section-main" style={{ padding: "2rem 0" }}>
          <div style={{
            background: "var(--bg-warm)",
            border: "0.5px solid var(--border-light)",
            borderRadius: "var(--radius-md)",
            padding: "1.5rem",
            marginBottom: "1.75rem",
          }}>
            <p style={{
              fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase",
              letterSpacing: "0.1em", margin: "0 0 4px",
            }}>2021 to Present · via TCS</p>
            <h2 style={{
              fontSize: 24, fontWeight: 700, margin: "0 0 2px",
              color: "var(--text-primary)", fontFamily: "'Georgia',serif", letterSpacing: "-0.02em",
            }}>BMO Financial Group</h2>
            <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>Senior Frontend Engineer</p>
          </div>
          {BMO_GROUPS.map((group, idx) => {
            const labelMargin = idx === 0 ? "0 0 2px" : "2rem 0 2px";
            if (group.id === "personalization") return (
              <div key={group.id}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", margin: labelMargin, textTransform: "uppercase", letterSpacing: "0.06em" }}>{group.label}</p>
                <BMOPersGroup group={group} />
              </div>
            );
            if (group.id === "wealth") return (
              <div key={group.id}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", margin: labelMargin, textTransform: "uppercase", letterSpacing: "0.06em" }}>{group.label}</p>
                <BMOWealthGroup group={group} />
              </div>
            );
            if (group.id === "compliance") return (
              <div key={group.id}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", margin: labelMargin, textTransform: "uppercase", letterSpacing: "0.06em" }}>{group.label}</p>
                <BMOComplianceGroup group={group} />
              </div>
            );
            return null;
          })}
        </section>

        {/* WEBSITES */}
        <section id="websites" className="section-main" style={{ padding: "3rem 0" }}>
          <div style={{ marginBottom: "1.75rem" }}>
            <p style={{
              fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase",
              letterSpacing: "0.1em", margin: "0 0 6px",
            }}>Client & Volunteer</p>
            <h2 style={{
              fontSize: 26, fontWeight: 700, margin: 0,
              color: "var(--text-primary)", fontFamily: "'Georgia',serif", letterSpacing: "-0.02em",
            }}>Websites Built</h2>
          </div>
          <div className="grid-2">
            {WEBSITES.map(s => <WebsiteCard key={s.title} site={s} />)}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" style={{ borderTop: "0.5px solid var(--border)", padding: "3rem 0 5rem" }}>
          <p style={{
            fontSize: 12, color: "var(--text-muted)", textTransform: "uppercase",
            letterSpacing: "0.1em", margin: "0 0 6px",
          }}>Background</p>
          <h2 style={{
            fontSize: 26, fontWeight: 700, margin: "0 0 1.5rem",
            color: "var(--text-primary)", fontFamily: "'Georgia',serif", letterSpacing: "-0.02em",
          }}>About</h2>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem 3rem", marginBottom: "1.75rem" }}>
            <div style={{ background: "var(--bg-subtle)", borderRadius: "var(--radius-md)", padding: "1.25rem" }}>
              <p style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" }}>Education</p>
              <p style={{ fontSize: 14, color: "var(--text-primary)", margin: "0 0 2px", fontWeight: 600 }}>MEng, Product Realization, GPA 3.7</p>
              <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 12px" }}>Simon Fraser University</p>
              <p style={{ fontSize: 14, color: "var(--text-primary)", margin: "0 0 2px", fontWeight: 600 }}>BTech, Mechatronics</p>
              <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>SRM University</p>
            </div>
            <div style={{ background: "var(--bg-subtle)", borderRadius: "var(--radius-md)", padding: "1.25rem" }}>
              <p style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" }}>Previous</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["Samsung", "TransLink", "Cognizant", "Zoho / WebNMS"].map(e => (
                  <span key={e} style={{
                    background: "var(--bg-inset)", border: "0.5px solid var(--border)",
                    fontSize: 12, padding: "4px 10px", borderRadius: 20,
                    color: "var(--text-secondary)",
                  }}>{e}</span>
                ))}
              </div>
            </div>
          </div>
          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.75, maxWidth: 560 }}>
            AI Product Engineer and Full-Stack Developer with 8+ years shipping production-grade
            applications for Fortune 500 financial institutions. I specialize in building AI-powered
            products from concept to production, combining strong frontend work in React and Angular
            with backend Node.js, Azure cloud infrastructure, and hands-on AI engineering using
            GPT-5.2, RAG pipelines, and agentic browser automation. Deep MarTech background in
            Adobe Target personalization and experimentation at banking scale.
          </p>
        </section>

      </div>

      {/* FOOTER */}
      <footer style={{
        background: "#111111",
        borderTop: "0.5px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <span style={{
              fontSize: 18, fontWeight: 700, color: "#ffffff",
              fontFamily: "'Georgia',serif", letterSpacing: "-0.01em",
            }}>AR</span>
            <span style={{ fontSize: 13, color: "#666666" }}>Frontend Product Engineer · Toronto</span>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: "2rem" }}>
            <FooterSocialLink label="LinkedIn" href="https://www.linkedin.com/in/ashwin-ramani/" iconName="linkedin" />
            <FooterSocialLink label="GitHub" href="https://github.com/pal7/" iconName="github" />
            <FooterSocialLink label="Email" href="mailto:ashwnramani@gmail.com" iconName="email" />
          </div>
          <p style={{ textAlign: "center", fontSize: 12, color: "#444444", margin: 0 }}>© 2025 Ashwin Ramani</p>
        </div>
      </footer>
    </div>
  );
}
