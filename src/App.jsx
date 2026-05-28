import { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const FEATURED_PROJECTS = [
  {
    id: "pers-engine",
    tag: "AI / Full Stack",
    tagColor: "purple",
    title: "PersAI — pers-engine",
    subtitle: "AI-powered UX analysis tool",
    status: "Live",
    statusColor: "green",
    url: "https://gray-moss-0a4c7ec0f.7.azurestaticapps.net/",
    github: "https://github.com/pal7/pers-engine",
    iframeUrl: "https://gray-moss-0a4c7ec0f.7.azurestaticapps.net/",
    summary:
      "Submit any URL — PersAI scrapes the page with an agentic Playwright session, runs it through Azure OpenAI GPT-5.2 vision, and returns structured UX issues with severity scoring and A/B experiment hypotheses.",
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
        body: "React/Vite/TypeScript frontend on Azure Static Web Apps. Node/Express backend on Azure Container Apps with managed identity reading secrets from Key Vault — no .env in prod. Cosmos DB for result caching. GitHub Actions CI/CD: push to main → build → deploy both SWA and Container App.",
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
      "A production-quality bilingual AI chat PWA for Tamil speakers — diaspora in Toronto and globally. Users switch between English and Tamil mid-conversation; the app routes to different Azure OpenAI models per language and mirrors the user's register (formal, casual, Tanglish code-mixed).",
    detail: [
      {
        heading: "The gap it fills",
        body: "Existing Tamil AI tools (Lavanya, Chat AI Tamil, TamilAI.in) are basic wrappers with no real bilingual UX. Kanmani is designed mobile-first (Android PWA), installable, with an offline shell — and it responds in the script and register the user is actually writing in, including code-mixed Tanglish.",
      },
      {
        heading: "Bilingual architecture",
        body: "Language is first-class: it determines the UI strings, system prompt, font stack, and AI model. Tamil routes to GPT-4o (full model — Tamil needs it; tokenization is 3-4× denser than English). English routes to GPT-4o-mini for cost efficiency. Auto-generated chat titles always use gpt-4o-mini regardless of language. Mid-chat language switch rotates the system prompt live.",
      },
      {
        heading: "Streaming & infra",
        body: "SSE (Server-Sent Events) for token-by-token streaming — chosen over WebSockets because the stream is one-directional and SSE survives most corporate proxies. Context window is token-aware via tiktoken (o200k_base), not message-count — critical for Tamil's token density. Auth via Supabase (email + Google OAuth) with RLS-enforced Postgres.",
      },
      {
        heading: "Design system",
        body: "Warm paper palette (#FAF6F0 background, terracotta accent #C24A2D) with a subtle Kolam (கோலம்) motif on empty states. Brand mark is the Tamil character ஃ. Noto Sans Tamil is self-hosted — Google Fonts CDN is unreliable in India. Fraunces for display, DM Sans for Latin body copy.",
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
        contribution: "Led migration from legacy AngularJS to Angular 19 — rebuilt components, services, and routing to modern Angular patterns while keeping the platform live.",
        stack: ["Angular 19", "AngularJS", "TypeScript", "RxJS"],
        previewImg: "/previews/sf.png",
      },
    ],
  },
  {
    id: "personalization",
    label: "Personalization & A/B Testing",
    description: "End-to-end ownership of the personalization and experimentation stack for InvestorLine — campaign implementation, internal tooling, and live-test monitoring.",
    stack: [
      "Adobe Target", "A/B Testing", "MVT", "Experience Targeting",
      "Adobe Analytics", "Adobe Launch", "Salesforce Marketing Cloud",
      "Angular 19", "TypeScript", "RxJS", "React", "Gatsby",
    ],
    summary: "Designed and delivered A/B, multivariate (MVT), and experience targeting campaigns via Adobe Target across trading dashboard and onboarding flows. Built pers-tsc-gen, an internal TypeScript code generator that scaffolded Adobe Target scripts and reduced campaign setup time ~60%. Integrated Salesforce Marketing Cloud for triggered email journeys tied to in-app actions. Instrumented Adobe Analytics with a typed Angular service layer covering 100+ tracked interactions.",
    pct: {
      title: "PCT — Personalization Campaign Tracker",
      summary: "Internal tool to detect silently broken Adobe Target activities caused by DOM changes, ID updates, or content shifts that Adobe's dashboard doesn't surface. Built the Gatsby frontend UI — a health dashboard showing live test status (OK / warning / broken) with expandable detail per campaign, backed by a Puppeteer headless Chrome validation service.",
      status: "UI built · Not shipped (cloud funding not approved)",
      stack: ["Gatsby", "TypeScript", "Puppeteer", "REST APIs"],
      diagram: true,
    },
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
        summary: "Implemented OneTrust SDK across InvestorLine and Smartfolio. Built consent-aware script blocking — third-party tags (analytics, marketing, functional) fire conditionally based on user consent state. Coordinated with legal to map cookie categories to OneTrust groups.",
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

// To add previews: take a screenshot of each homepage (Cmd+Shift+4 full browser window)
// Save to public/previews/ as burnabychiro.png and cns.png
// Then change previewImg: null to previewImg: "/previews/burnabychiro.png" etc.
const WEBSITES = [
  {
    title: "Burnaby Chiropractic",
    url: "https://www.burnabychiro.com",
    year: "2020",
    type: "Client Project",
    typeColor: "teal",
    hosting: "Ongoing maintenance",
    previewImg: "/previews/burnabychiro.png",
    summary: "End-to-end design and build for a chiropractic clinic in Burnaby, BC — from initial wireframes through visual design to production. First client project. Appeared in the first 10 Google search results within 2 months of launch.",
    bullets: [
      "Owned the full product design lifecycle: user research, wireframing, visual design, and frontend build — solo",
      "Designed for local conversion: clear CTAs, trust signals, and a contact flow optimized for appointment bookings",
      "Achieved first-page Google ranking within 2 months via semantic HTML5, schema.org local business markup, and on-page SEO",
      "Custom reviews and treatments sliders in vanilla JS — modular, no framework dependency, built for easy client handoff",
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
    summary: "Full-stack web application for the Canada chapter of a Tamil cultural organization — events, gallery, membership, and community features. Built with TypeScript, Node/Express, and Docker on OVH. UI designed with Claude. Volunteer contribution alongside two other developers. Private repo.",
    bullets: [
      "TypeScript full-stack: Vite frontend + Node/Express backend, containerized with Docker and deployed via a custom shell deploy script to OVH",
      "Docker Compose deployment — script auto-installs Docker on the target server, builds the image, and runs the app; supports --init-db flag for first-time database seeding",
      "Server-side SQLite with optional matrimonial and login/signup feature flags via environment config",
      "Mobile-first responsive layout covering events calendar, gallery, and membership",
    ],
    roadmap: [
      "Member login portal — authenticated accounts with profile pages and member directory",
      "Interactive event planning — RSVP, potluck coordination, and volunteer sign-up for community events",
      "Member-to-member features — see who else is attending, connect with other members",
      "Full PWA — installable on Android/iOS with offline shell and push notifications for events",
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
      {/* Header row */}
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

      {/* Expanded detail */}
      {open && (
        <div style={{ borderTop: "0.5px solid #f3f4f6", padding: "1.5rem 1.75rem" }}>

          {/* Detail sections */}
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

          {/* Roadmap */}
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

          {/* iframe preview for PersAI */}
          {project.iframeUrl && (
            <div style={{ borderTop: "0.5px solid var(--border-light)", paddingTop: "1.25rem", marginBottom: "1.25rem" }}>
              <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", margin: "0 0 10px" }}>
                Live preview
              </p>
              <div style={{
                borderRadius: "var(--radius-md)", overflow: "hidden",
                border: "0.5px solid var(--border)", boxShadow: "var(--shadow-md)",
              }}>
                {/* Browser chrome */}
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

          {/* Links */}
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

function PCTDiagram() {
  const S = { fontFamily: "system-ui, -apple-system, sans-serif" };
  return (
    <div style={{ margin: "20px 0 8px", overflowX: "auto" }}>
      <p style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", margin: "0 0 10px" }}>
        Proposed infrastructure (not shipped — AWS funding not approved)
      </p>
      <svg viewBox="0 0 700 380" style={{ width: "100%", minWidth: 560, display: "block" }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M2 2L8 5L2 8" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </marker>
          <marker id="ad" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M2 2L8 5L2 8" fill="none" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </marker>
        </defs>

        {/* ── Zone 1: Adobe Vendor SaaS ── */}
        <rect x="8" y="8" width="148" height="220" rx="7" fill="#fdf2f8" stroke="#f0abfc" strokeWidth="0.75"/>
        <text x="82" y="24" textAnchor="middle" fontSize="9" fill="#701a75" style={S} fontWeight="600" letterSpacing="0.06em">PERSONALIZATION PLATFORM</text>

        <rect x="22" y="34" width="120" height="34" rx="5" fill="#bbf7d0" stroke="#86efac" strokeWidth="0.5"/>
        <text x="82" y="54" textAnchor="middle" fontSize="10" fill="#14532d" style={S}>Host Campaign</text>

        <rect x="22" y="82" width="54" height="28" rx="5" fill="#bbf7d0" stroke="#86efac" strokeWidth="0.5"/>
        <text x="49" y="99" textAnchor="middle" fontSize="9.5" fill="#14532d" style={S}>Activity</text>
        <text x="49" y="110" textAnchor="middle" fontSize="9" fill="#166534" style={S}>logs</text>

        <rect x="86" y="82" width="56" height="28" rx="5" fill="#bbf7d0" stroke="#86efac" strokeWidth="0.5"/>
        <text x="114" y="99" textAnchor="middle" fontSize="9.5" fill="#14532d" style={S}>Campaign</text>
        <text x="114" y="110" textAnchor="middle" fontSize="9" fill="#166534" style={S}>source code</text>

        <rect x="22" y="128" width="120" height="30" rx="5" fill="#bbf7d0" stroke="#86efac" strokeWidth="0.5"/>
        <text x="82" y="147" textAnchor="middle" fontSize="10" fill="#14532d" style={S}>Create Activity List</text>

        <rect x="22" y="174" width="120" height="30" rx="5" fill="#bbf7d0" stroke="#86efac" strokeWidth="0.5"/>
        <text x="82" y="193" textAnchor="middle" fontSize="10" fill="#14532d" style={S}>Activity List</text>

        {/* arrows within adobe zone */}
        <line x1="82" y1="68" x2="82" y2="80" stroke="#6b7280" strokeWidth="0.75" strokeDasharray="3,2" markerEnd="url(#ad)"/>
        <line x1="82" y1="112" x2="82" y2="126" stroke="#6b7280" strokeWidth="0.75" strokeDasharray="3,2" markerEnd="url(#ad)"/>
        <line x1="82" y1="158" x2="82" y2="172" stroke="#6b7280" strokeWidth="0.75" markerEnd="url(#a)"/>

        {/* ── Zone 2: Network Account ── */}
        <rect x="176" y="60" width="124" height="100" rx="7" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.75"/>
        <text x="238" y="75" textAnchor="middle" fontSize="9" fill="#475569" style={S} fontWeight="600" letterSpacing="0.06em">NETWORK PROXY</text>

        <rect x="190" y="84" width="46" height="28" rx="5" fill="#bbf7d0" stroke="#86efac" strokeWidth="0.5"/>
        <text x="213" y="102" textAnchor="middle" fontSize="9.5" fill="#14532d" style={S}>Gateway</text>

        <rect x="250" y="84" width="40" height="28" rx="5" fill="#bbf7d0" stroke="#86efac" strokeWidth="0.5"/>
        <text x="270" y="102" textAnchor="middle" fontSize="9.5" fill="#14532d" style={S}>Proxy</text>

        <line x1="236" y1="98" x2="249" y2="98" stroke="#6b7280" strokeWidth="0.75" markerEnd="url(#a)"/>

        {/* adobe → network */}
        <line x1="156" y1="189" x2="174" y2="100" stroke="#6b7280" strokeWidth="0.9" markerEnd="url(#a)"/>

        {/* ── Zone 3: BMO Cloud AWS ── */}
        <rect x="320" y="8" width="368" height="230" rx="7" fill="#eff6ff" stroke="#93c5fd" strokeWidth="0.75"/>
        <text x="504" y="22" textAnchor="middle" fontSize="9" fill="#1e40af" style={S} fontWeight="600" letterSpacing="0.06em">CLOUD INFRASTRUCTURE</text>

        {/* Fargate */}
        <rect x="334" y="32" width="110" height="50" rx="5" fill="#dbeafe" stroke="#93c5fd" strokeWidth="0.5"/>
        <text x="389" y="52" textAnchor="middle" fontSize="9.5" fill="#1e3a8a" style={S}>Container Routes</text>
        <text x="389" y="65" textAnchor="middle" fontSize="9" fill="#1e3a8a" style={S}>&amp; Controller</text>

        {/* PCT */}
        <rect x="460" y="32" width="64" height="34" rx="5" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="0.75"/>
        <text x="492" y="53" textAnchor="middle" fontSize="11" fill="#1e3a8a" style={S} fontWeight="700">PCT</text>

        {/* Inhouse App */}
        <rect x="334" y="102" width="88" height="30" rx="5" fill="#bbf7d0" stroke="#86efac" strokeWidth="0.5"/>
        <text x="378" y="120" textAnchor="middle" fontSize="9.5" fill="#14532d" style={S}>Inhouse App</text>

        {/* Puppeteer */}
        <rect x="460" y="102" width="80" height="30" rx="5" fill="#bbf7d0" stroke="#86efac" strokeWidth="0.5"/>
        <text x="500" y="120" textAnchor="middle" fontSize="9.5" fill="#14532d" style={S}>Puppeteer</text>

        {/* Lambda */}
        <rect x="334" y="158" width="90" height="30" rx="5" fill="#bbf7d0" stroke="#86efac" strokeWidth="0.5"/>
        <text x="379" y="177" textAnchor="middle" fontSize="9.5" fill="#14532d" style={S}>Auth Service</text>

        {/* API Gateway */}
        <rect x="444" y="158" width="90" height="30" rx="5" fill="#bbf7d0" stroke="#86efac" strokeWidth="0.5"/>
        <text x="489" y="177" textAnchor="middle" fontSize="9.5" fill="#14532d" style={S}>API Gateway</text>

        {/* arrows in AWS */}
        <line x1="444" y1="49" x2="460" y2="49" stroke="#6b7280" strokeWidth="0.75" markerEnd="url(#a)"/>
        <line x1="389" y1="82" x2="389" y2="100" stroke="#6b7280" strokeWidth="0.75" markerEnd="url(#a)"/>
        <line x1="492" y1="66" x2="492" y2="100" stroke="#6b7280" strokeWidth="0.75" strokeDasharray="3,2" markerEnd="url(#ad)"/>
        <line x1="424" y1="173" x2="443" y2="173" stroke="#6b7280" strokeWidth="0.75" markerEnd="url(#a)"/>
        <line x1="489" y1="132" x2="489" y2="156" stroke="#6b7280" strokeWidth="0.75" strokeDasharray="3,2" markerEnd="url(#ad)"/>

        {/* network → fargate */}
        <line x1="300" y1="98" x2="332" y2="55" stroke="#6b7280" strokeWidth="0.9" markerEnd="url(#a)"/>

        {/* ── Direct Connect ── */}
        <rect x="440" y="252" width="118" height="34" rx="5" fill="#dbeafe" stroke="#93c5fd" strokeWidth="0.75"/>
        <text x="499" y="268" textAnchor="middle" fontSize="9.5" fill="#1e40af" style={S} fontWeight="600">Direct Connect</text>
        <text x="499" y="280" textAnchor="middle" fontSize="9" fill="#3b82f6" style={S}>Adobe SaaS ↔ BMO</text>

        {/* AWS → Direct Connect */}
        <line x1="499" y1="238" x2="499" y2="250" stroke="#6b7280" strokeWidth="0.9" markerEnd="url(#a)"/>

        {/* ── Zone 4: BMO On-Prem ── */}
        <rect x="320" y="300" width="368" height="72" rx="7" fill="#fdf2f8" stroke="#f0abfc" strokeWidth="0.75"/>
        <text x="504" y="314" textAnchor="middle" fontSize="9" fill="#701a75" style={S} fontWeight="600" letterSpacing="0.06em">INTERNAL DELIVERY</text>

        <rect x="334" y="322" width="60" height="28" rx="5" fill="#bbf7d0" stroke="#86efac" strokeWidth="0.5"/>
        <text x="364" y="339" textAnchor="middle" fontSize="9.5" fill="#14532d" style={S}>API Layer</text>

        <rect x="410" y="322" width="68" height="28" rx="5" fill="#bbf7d0" stroke="#86efac" strokeWidth="0.5"/>
        <text x="444" y="339" textAnchor="middle" fontSize="9.5" fill="#14532d" style={S}>Dev Server</text>

        <rect x="494" y="322" width="52" height="28" rx="5" fill="#dbeafe" stroke="#93c5fd" strokeWidth="0.5"/>
        <text x="520" y="339" textAnchor="middle" fontSize="10" fill="#1e40af" style={S} fontWeight="600">Gatsby</text>

        <rect x="562" y="322" width="82" height="28" rx="5" fill="#fef9c3" stroke="#fde047" strokeWidth="0.5"/>
        <text x="603" y="335" textAnchor="middle" fontSize="9" fill="#713f12" style={S}>Personalization</text>
        <text x="603" y="346" textAnchor="middle" fontSize="9" fill="#713f12" style={S}>Team</text>

        <line x1="394" y1="336" x2="408" y2="336" stroke="#6b7280" strokeWidth="0.75" markerEnd="url(#a)"/>
        <line x1="478" y1="336" x2="492" y2="336" stroke="#6b7280" strokeWidth="0.75" markerEnd="url(#a)"/>
        <line x1="546" y1="336" x2="560" y2="336" stroke="#6b7280" strokeWidth="0.75" markerEnd="url(#a)"/>

        {/* Direct Connect → On-Prem */}
        <line x1="440" y1="286" x2="390" y2="320" stroke="#6b7280" strokeWidth="0.9" markerEnd="url(#a)"/>
      </svg>
    </div>
  );
}

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
  const [pctOpen, setPctOpen] = useState(false);
  return (
    <div style={{ borderBottom: "0.5px solid #e5e7eb", padding: "2rem 0" }}>
      <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 10px" }}>{group.description}</p>
      <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.75, margin: "0 0 16px" }}>{group.summary}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 20 }}>
        {group.stack.map(t => <Pill key={t} label={t} />)}
      </div>

      {/* PCT sub-section */}
      <div style={{
        border: "0.5px solid var(--border)", borderRadius: "var(--radius-sm)",
        overflow: "hidden", background: "var(--bg-subtle)",
      }}>
        <div onClick={() => setPctOpen(v => !v)} style={{
          padding: "1rem 1.25rem", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <Tag label="Internal Tool" color="teal" small />
              <span style={{ fontSize: 10, color: "var(--text-muted)", fontFamily: "system-ui" }}>UI built · not shipped</span>
            </div>
            <h4 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: "var(--text-primary)", fontFamily: "'Georgia',serif" }}>
              PCT — Personalization Campaign Tracker
            </h4>
          </div>
          <ToggleButton expanded={pctOpen} />
        </div>
        {pctOpen && (
          <div style={{ padding: "0 1.25rem 1.25rem", borderTop: "0.5px solid #f3f4f6" }}>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, margin: "12px 0 12px" }}>{group.pct.summary}</p>
            <PCTDiagram />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 10 }}>
              {group.pct.stack.map(t => <Pill key={t} label={t} />)}
            </div>
          </div>
        )}
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
          {/* Browser chrome bar */}
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
        {/* Browser chrome */}
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
      }}
    >
      {/* Preview */}
      <SitePreview url={site.url} src={site.previewImg} title={site.title} />

      {/* Content */}
      <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
          <div>
            <Tag label={site.type} color={site.typeColor} />
            <h3 style={{
              fontSize: 16, fontWeight: 700, margin: "7px 0 2px",
              color: "var(--text-primary)", fontFamily: "'Georgia',serif", letterSpacing: "-0.01em",
            }}>{site.title}</h3>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{site.year}</span>
              {site.hosting && (
                <span style={{ fontSize: 11, color: "var(--text-muted)", opacity: 0.7 }}>· {site.hosting}</span>
              )}
            </div>
          </div>
          <a href={site.url} target="_blank" rel="noopener noreferrer" style={{
            fontSize: 11, color: "var(--accent-blue)", textDecoration: "none",
            border: "0.5px solid var(--accent-border)", padding: "5px 10px",
            borderRadius: "var(--radius-sm)", background: "var(--accent-bg)", flexShrink: 0,
          }}>Visit ↗</a>
        </div>

        <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65, margin: 0 }}>{site.summary}</p>
        <BulletList items={site.bullets} color="var(--text-secondary)" size={12} />

        {/* Roadmap for CNS */}
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
          }}>Senior Frontend Engineer · Toronto, CA</p>
          <h1 style={{
            fontSize: "clamp(34px,6vw,52px)", fontWeight: 700,
            margin: "0 0 18px", lineHeight: 1.08,
            letterSpacing: "-0.03em", color: "var(--text-primary)",
            fontFamily: "'Georgia',serif",
          }}>Ashwin Ramani</h1>
          <p style={{
            fontSize: 17, color: "var(--text-secondary)", lineHeight: 1.75,
            maxWidth: 540, margin: "0 0 28px",
          }}>
            I build high-performance web products at the intersection of frontend engineering
            and personalization. 4+ years at BMO InvestorLine via TCS — deep roots in Angular,
            Adobe Target, and enterprise-scale UI systems — alongside full-stack side projects
            in AI and bilingual product design.
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
          {["Angular 19", "React", "TypeScript", "RxJS", "Adobe Target", "Adobe Analytics", "OneTrust", "Azure DevOps", "Docker", "Capacitor", "WCAG 2.1 AA", "SFMC"].map(s => (
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
            }}>2021 — Present · via TCS</p>
            <h2 style={{
              fontSize: 24, fontWeight: 700, margin: "0 0 2px",
              color: "var(--text-primary)", fontFamily: "'Georgia',serif", letterSpacing: "-0.02em",
            }}>BMO Financial Group</h2>
            <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>Senior Frontend Engineer</p>
          </div>
          {BMO_GROUPS.map(group => {
            if (group.id === "wealth") return (
              <div key={group.id}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{group.label}</p>
                <BMOWealthGroup group={group} />
              </div>
            );
            if (group.id === "personalization") return (
              <div key={group.id}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", margin: "2rem 0 2px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{group.label}</p>
                <BMOPersGroup group={group} />
              </div>
            );
            if (group.id === "compliance") return (
              <div key={group.id}>
                <p style={{ fontSize: 11, fontWeight: 600, color: "var(--text-muted)", margin: "2rem 0 2px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{group.label}</p>
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
              <p style={{ fontSize: 14, color: "var(--text-primary)", margin: "0 0 2px", fontWeight: 600 }}>MEng, Product Realization — GPA 3.7</p>
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
          <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.75, maxWidth: 540 }}>
            I think in product terms as naturally as I think in code — drawn to the overlap between
            frontend engineering, AI integration, and product engineering.
          </p>
        </section>

      </div>

      {/* FOOTER — full-width dark, outside the max-width wrapper */}
      <footer style={{
        background: "#111111",
        borderTop: "0.5px solid rgba(255,255,255,0.08)",
      }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 20px" }}>
          {/* Top row: monogram + tagline */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
            <span style={{
              fontSize: 18, fontWeight: 700, color: "#ffffff",
              fontFamily: "'Georgia',serif", letterSpacing: "-0.01em",
            }}>AR</span>
            <span style={{ fontSize: 13, color: "#666666" }}>Frontend Product Engineer · Toronto</span>
          </div>
          {/* Middle row: social links */}
          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: "2rem" }}>
            <FooterSocialLink label="LinkedIn" href="https://www.linkedin.com/in/ashwin-ramani/" iconName="linkedin" />
            <FooterSocialLink label="GitHub" href="https://github.com/pal7/" iconName="github" />
            <FooterSocialLink label="Email" href="mailto:ashwnramani@gmail.com" iconName="email" />
          </div>
          {/* Bottom row: copyright */}
          <p style={{ textAlign: "center", fontSize: 12, color: "#444444", margin: 0 }}>© 2025 Ashwin Ramani</p>
        </div>
      </footer>
    </div>
  );
}
