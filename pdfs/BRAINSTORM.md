# LEEC — Laboratory of Electrical Engineering and Computing
## Complete Digital Platform Brainstorming Report

**Prepared for:** Faculty of Engineering and Technology, University of Buea, Cameroon  
**Partnership:** INSA Lyon / French Embassy Cooperation  
**Date:** July 27, 2026

---

> *"Our website is not a brochure. It is a laboratory that never closes."*

---

## Table of Contents

1. [Vision](#1-vision)
2. [Competitor Research](#2-competitor-research)
3. [User Personas](#3-user-personas)
4. [Information Architecture](#4-information-architecture)
5. [Research Domains](#5-research-domains)
6. [Feature Brainstorm](#6-feature-brainstorm)
7. [Visual Identity](#7-visual-identity)
8. [Homepage](#8-homepage)
9. [Researcher Profile](#9-researcher-profile)
10. [Publication System](#10-publication-system)
11. [Technology Stack](#11-technology-stack)
12. [Scalability](#12-scalability)
13. [Security](#13-security)
14. [AI Features](#14-ai-features)
15. [Development Roadmap](#15-development-roadmap)
16. [Deliverables](#16-deliverables)

---

## 1. Vision

### What should visitors feel?

| Visitor Type | Target Emotion |
|---|---|
| Prospective student | **Inspired** — "I want to be part of this." |
| International researcher | **Respected** — "This lab matches my caliber." |
| Industry partner | **Confident** — "They can solve my R&D problem." |
| Funding agency | **Intrigued** — "This is worth investing in." |
| Peer academic | **Curious** — "I should collaborate with them." |
| Government official | **Proud** — "This is world-class Cameroonian science." |

### Core Emotional Pillars

1. **Aspiration** — "From Cameroon to the world." LEEC is not a local lab thinking globally; it is a global lab *located in* Cameroon.
2. **Precision** — Every pixel, every interaction, every line of copy must reflect the precision of the instruments housed in the lab.
3. **Warmth** — African hospitality and collaborative spirit permeate the user experience, differentiating LEEC from the cold, institutional feel of European lab sites.
4. **Speed** — The site must feel fast, modern, alive. Static brochure sites communicate "stagnant research."
5. **Openness** — Open science, open data, open collaboration. The site should feel like a window into the lab, not a wall.

### International Positioning Statement

> *"LEEC: Where African ingenuity meets French engineering excellence. The leading electrical engineering and computing laboratory in Central Africa, and a bridge between emerging talent and world-class research infrastructure."*

### Brand Voice

| Attribute | Tone |
|---|---|
| Formal vs. Casual | Warmly professional |
| Technical vs. Accessible | Bilingual — deep technical detail for specialists, clear summaries for everyone else |
| Local vs. Global | Proudly Cameroonian, confidently international |
| Humble vs. Bold | Confident but welcoming, never arrogant |

---

## 2. Competitor Research

### Institution Analysis Summary

#### CERN (home.cern)

| Aspect | Verdict |
|---|---|
| **Strengths** | Exceptional separation of concerns (public/news vs. tourism vs. scholarly repository vs. open science). Gold-standard science communication — translates complex physics into narrative stories without losing scientific integrity. Robust open science integration (SCOAP3, Open Data Portal, INSPIRE-HEP). |
| **Weaknesses** | Fragmented user journeys across sub-domains. Information density can overwhelm casual visitors. Migration overhead creates occasional dead-ends. |
| **UI Patterns to Steal** | Card-based news grids with rich taxonomy tagging. Dual-track storytelling (public summaries + specialist deep dives). Dedicated open science landing page. |
| **UI Patterns to Avoid** | Too many sub-domains and portals for a mid-sized lab. |

#### MIT Media Lab (media.mit.edu)

| Aspect | Verdict |
|---|---|
| **Strengths** | Pentagram-designed identity system with generative grid. Anti-disciplinary research group presentation. Research group pages feel like boutique studios. Membership model for corporate sponsors is clearly articulated. Project-centric storytelling with real-world impact framing. |
| **Weaknesses** | Can feel chaotic. Navigation heavily dependent on dynamic filtering. |
| **UI Patterns to Steal** | Modular card-based grid systems. Research group pages with distinct visual identities. Humanized researcher profiles showing active contributions. "Living archive" homepage pattern. Gated vs. public dual experience. |
| **UI Patterns to Avoid** | Over-reliance on dynamic filtering as primary navigation. |

#### EPFL (epfl.ch) & ETH Zurich (ethz.ch)

| Aspect | Verdict |
|---|---|
| **Strengths** | Clean, Swiss-modernist design. Granular researcher profiles with deep publication integration. Laboratory pages that showcase equipment, people, and projects in unified templates. Clear undergraduate/graduate/admissions pathways. |
| **Weaknesses** | Can feel institutional and uniform — lab identities get lost in the master template. |
| **UI Patterns to Steal** | Researcher profile templates with publication auto-sync. Equipment catalogs with technical specifications. Clear hierarchical navigation from institution → faculty → lab → researcher. |
| **UI Patterns to Avoid** | Over-standardization that strips lab identity. |

#### Fraunhofer (fraunhofer.de) & INRIA (inria.fr)

| Aspect | Verdict |
|---|---|
| **Strengths** | Problem-solving, market-driven taxonomy. Clear mapping of research to societal megatrends. Robust technology transfer storytelling (patents, spin-offs, licensing). Industrial partnership tiers clearly articulated. |
| **Weaknesses** | Can feel corporate and impersonal. |
| **UI Patterns to Steal** | "Research mapped to industry challenges" — show LEEC research addressing real-world problems. Partnership tier clarity. Spin-off and technology transfer showcase. |
| **UI Patterns to Avoid** | Overly corporate tone. |

#### Laboratoire Ampère (ampere-lab.fr)

| Aspect | Verdict |
|---|---|
| **Strengths** | Clear research department organization. Strong open science alignment via HAL integration. Deep technical documentation of equipment and platforms (plateaux techniques). Bilingual (FR/EN). |
| **Weaknesses** | Dated visual design. Text-heavy layouts. Fragmented navigation across multiple institutional masters. Low marketing/dynamic engagement. Decentralized maintenance leads to inconsistency. |
| **UI Patterns to Steal** | HAL publication integration. Equipment/platform showcase pages. Bilingual content strategy. |
| **UI Patterns to Avoid** | Everything else — this is the template of what NOT to do. |

#### Stanford Engineering (engineering.stanford.edu)

| Aspect | Verdict |
|---|---|
| **Strengths** | Impact-first copywriting. Research organized by societal challenges, not departments. Lab pages as magnets showcasing physical infrastructure. Faculty profiles that humanize elite science. Story-driven news sections. |
| **Weaknesses** | Massive institutional resources not replicable by a mid-sized lab. |
| **UI Patterns to Steal** | Organizing research by "challenges" rather than by department. Lab pages bridging theory and prototyping. Faculty profiles with mentorship narrative. |
| **UI Patterns to Avoid** | Over-reliance on dedicated content teams. |

### Modern Lab Website Design Trends (2026)

1. **Interactive Data Visualization** — D3.js, Plotly, WebGL replacing static PNG charts
2. **Dark Mode toggle** — Standard for tech-forward labs
3. **3D Elements** — Three.js for interactive models of instruments, molecules, or data
4. **Micro-interactions** — Subtle animations on scroll, hover, and transition
5. **Live Research Impact Metrics** — Altmetrics, citation counters, ORCID feeds
6. **AI-powered Search** — Natural language query over lab's body of work
7. **Scrollytelling** — Narrative-driven scroll experiences for flagship research stories

### Exemplary Lab Websites to Benchmark Against

| Lab | What Makes It Great |
|---|---|
| Bhamla Lab (Georgia Tech) | Playful, high-energy grid layouts; "Cabinet of Curiosities" aesthetic |
| Crowther Lab (ETH Zurich) | Documentary video loops, global case study narratives |
| Campbell-Staton Group (Princeton) | Comic book / Afro-futurist visual storytelling |
| Barrett Lab | Calming palette, high-definition macro photography |
| Eddy Lab | Minimalist, accessibility-first; masterclass in clean typography |

---

## 3. User Personas

### Primary Personas

#### 1. Prospective Undergraduate Student (Cameroonian)
- **Name:** Danièle M.
- **Age:** 18
- **Goal:** Choose a university program that leads to a job.
- **Questions:** "What equipment will I use? Will I get hands-on experience? Do graduates get jobs? Is there a scholarship?"
- **Site Needs:** Clear program descriptions, equipment gallery, alumni success stories, application portal, fee information.
- **Emotional Need:** Reassurance that LEEC is a smart, prestigious choice.

#### 2. Master's Student (International)
- **Name:** Kwame A.
- **Age:** 24
- **Location:** Ghana or Nigeria
- **Goal:** Find a top engineering program in Africa with international links.
- **Questions:** "Is the program accredited? What research can I join? Is there a partnership with INSA Lyon? Can I do a double degree?"
- **Site Needs:** Program details, research group pages, exchange program info, application process, visa guidance, testimonials from international students.
- **Emotional Need:** Confidence that LEEC meets international standards.

#### 3. PhD Candidate (International)
- **Name:** Fatima B.
- **Age:** 27
- **Location:** France
- **Goal:** Find a PhD position with a strong supervisor and good facilities.
- **Questions:** "Who are the researchers? What are their publication records? What equipment is available? Is funding available? Can I co-supervise with INSA Lyon?"
- **Site Needs:** Researcher profile with publications and Google Scholar links, equipment catalog, open PhD positions, funding opportunities, collaboration framework.
- **Emotional Need:** Assurance that the lab can support ambitious research.

#### 4. Senior Researcher / Professor (Potential Collaborator)
- **Name:** Dr. Jean-Pierre L.
- **Age:** 45
- **Location:** INSA Lyon
- **Goal:** Find suitable collaboration partners at LEEC for joint grant applications.
- **Questions:** "What research aligns with mine? Who are the key researchers? What is the lab's publication track record? What equipment can I access?"
- **Site Needs:** Research group pages, researcher profiles with publication lists, equipment catalog, ongoing projects, collaboration portal, grant partnership templates.
- **Emotional Need:** Professional respect and evidence of research quality.

#### 5. Industry Partner (Corporate R&D Manager)
- **Name:** Mr. Thomas K.
- **Age:** 40
- **Company:** Energy/E&C sector
- **Goal:** Outsource testing, contract research, or recruit talent.
- **Questions:** "Can they test my materials? What equipment do they have? What are their testing fees? Have they worked with industry before? Can I recruit their graduates?"
- **Site Needs:** Equipment catalog with technical specs, testing service page, past industry collaborations, technology transfer page, contact form for R&D inquiries.
- **Emotional Need:** Confidence in professional standards and reliability.

#### 6. Funding Agency Officer
- **Name:** Mme. Claire D.
- **Age:** 35
- **Organization:** French Embassy / AFD / EU Commission
- **Goal:** Evaluate the lab for grant eligibility.
- **Questions:** "What is the lab's mission? What has it achieved? How is it governed? Who are the partners? How is funding used? What are the metrics of success?"
- **Site Needs:** About page with mission and governance, project portfolio, publication metrics, partnership showcase, annual reports, financial transparency.
- **Emotional Need:** Trust and evidence of impact.

#### 7. Government Official (Ministry of Higher Education)
- **Name:** Prof. Samuel N.
- **Age:** 55
- **Goal:** Showcase Cameroon's investment in STEM as a success story.
- **Questions:** "How does LEEC compare to international labs? How many students graduate? What is the employment rate? What partnerships exist?"
- **Site Needs:** Statistics dashboard, success stories, partner logos, media coverage, annual impact reports.
- **Emotional Need:** Pride and validation of policy decisions.

#### 8. Journalist / Media
- **Name:** Sarah M.
- **Age:** 30
- **Outlet:** SciDev.Net or local media
- **Goal:** Find a compelling science story.
- **Questions:** "What's the most exciting recent result? Is there a human-interest angle? Are there high-resolution photos? Who can I interview?"
- **Site Needs:** Press releases, high-res image/video gallery, notable research highlights, media contact, researcher directory.
- **Emotional Need:** A ready-made, compelling narrative.

#### 9. Prospective Donor (Philanthropist / Alumni)
- **Name:** Dr. Eric T.
- **Age:** 50
- **Goal:** Give back meaningfully.
- **Questions:** "How can my donation make a difference? What equipment or scholarships are needed? Can I fund a specific project? Is there a donation portal?"
- **Site Needs:** Donation page, funding priorities, impact stories, sponsorship packages, tax receipt information.
- **Emotional Need:** Agency and confidence that the donation will be used effectively.

#### 10. Laboratory Engineer / Technician
- **Name:** Mr. Patrick E.
- **Age:** 32
- **Goal:** Find a technical job at a well-equipped lab.
- **Questions:** "What instruments do they have? What technical challenges exist? Is there room for professional growth?"
- **Site Needs:** Job openings, equipment catalog, lab facilities, team page.
- **Emotional Need:** Professional challenge and stability.

---

## 4. Information Architecture

### Complete Sitemap

```
┌────────────────────────────────────────────────────┐
│                      HOME                           │
└────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│    ABOUT      │   │   RESEARCH    │   │   PEOPLE      │
├───────────────┤   ├───────────────┤   ├───────────────┤
│ • Mission     │   │ • Groups      │   │ • Faculty     │
│ • History     │   │ • Projects    │   │ • Researchers │
│ • Governance  │   │ • Publications│   │ • PhD Students│
│ • Partnership │   │ • Equipment   │   │ • Master's    │
│   (INSA Lyon) │   │ • Facilities  │   │ • Alumni      │
│ • French      │   │ • Datasets    │   │ • Directory   │
│   Embassy     │   │               │   └───────────────┘
│ • Contact     │   └───────────────┘
└───────────────┘

        ▼                   ▼                   ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│   ACADEMICS   │   │   NEWS &      │   │  INDUSTRY &   │
│               │   │   EVENTS      │   │  INNOVATION   │
├───────────────┤   ├───────────────┤   ├───────────────┤
│ • Programs    │   │ • News        │   │ • Technology  │
│ • Courses     │   │ • Events      │   │   Transfer    │
│ • Admissions  │   │ • Gallery     │   │ • Contract    │
│ • Scholarships│   │ • Blog        │   │   Research    │
│ • Internships │   │ • Newsletter  │   │ • Testing     │
│ • Exchange    │   │ • Press       │   │   Services    │
│               │   │   Coverage    │   │ • Consulting  │
└───────────────┘   └───────────────┘   │ • Spin-offs   │
                                        └───────────────┘

        ▼                   ▼
┌───────────────┐   ┌───────────────┐
│ PARTICIPATE   │   │  ADMIN (AUTH) │
├───────────────┤   ├───────────────┤
│ • Join Us     │   │ • Dashboard   │
│ • Open        │   │ • Content     │
│   Positions   │   │   Management  │
│ • PhD Apply   │   │ • User Mgmt   │
│ • Research    │   │ • Reservations│
│   Cooperation │   │ • Analytics   │
│ • Donate      │   │ • Backups     │
│ • Partner     │   │               │
└───────────────┘   └───────────────┘
```

### Navigation Structure (Primary Menu)

| Item | Sub-items | Rationale |
|---|---|---|
| **Home** | — | First impression, highlights |
| **About** | Mission, History, Governance, Partnership (INSA Lyon), French Embassy Cooperation, Contact | Institutional story for funders and partners |
| **Research** | Groups, Projects, Publications, Equipment, Facilities, Datasets | Core content — the "what we do" |
| **People** | Faculty, Researchers, PhD Students, Alumni, Directory | The "who we are" |
| **Academics** | Programs, Admissions, Scholarships, Internships, Exchange, Open Positions | Student recruitment funnel |
| **News & Events** | News, Events, Gallery, Blog, Newsletter, Press Coverage | Living archive, social proof |
| **Innovation** | Technology Transfer, Contract Research, Testing Services, Consulting, Spin-offs | Industry partnership showcase |
| **Participate** | Join Us, PhD Apply, Research Cooperation, Donate, Partner | Conversion — calls to action |
| **Search** | — | Global search, accessible from anywhere |

### Secondary Navigation (Footer)

- Privacy Policy
- Terms of Use
- Accessibility
- Sitemap
- Contact
- Newsletter Signup
- Social Media Links

---

## 5. Research Domains

### Domain 1: Electromagnetic Characterization & Non-Destructive Testing (NDT)

**Description:** Development and application of electromagnetic methods for material characterization and integrity evaluation without damaging the test object. This is LEEC's flagship research area, built on the magnetic needle probe (MNP) technology and related methods.

**Technologies:**
- Magnetic Needle Probe (MNP) — Printed and miniaturized versions (< 50 μm spatial resolution)
- Magnetic Barkhausen Noise (MBN)
- Magnetic Incremental Permeability (MIP)
- Eddy Current Testing (ECT)
- Hall Effect sensors

**Current Projects:**
- Printed Magnetic Needle Probe (PMNP) sensor design evolution
- Local hysteresis cycle measurement in laminated magnetic cores
- MBN equivalent sensing method development
- MIP equivalent sensing method (latest innovation)
- Comparison of FEM simulations (Onelab®) with local measurements

**Applications:**
- Aerospace component integrity testing
- Pipeline corrosion detection
- Electrical machinery health monitoring
- Case-hardening depth characterization
- Stress-dependent directional magnetic permeability analysis (e.g., Iron-Cobalt)
- Micro-defect detection (spatial resolution < 200 μm)

**Industry Impact:**
- Reduced maintenance downtime
- Non-invasive structural health monitoring
- Quality control in manufacturing
- Economical alternative to destructive testing

### Domain 2: Power Electronics & Energy Management Systems

**Description:** Design, modeling, and control of power electronic converters, electrical machines, and energy management systems for efficient power conversion and utilization.

**Technologies:**
- Power converters (AC/DC, DC/DC, DC/AC)
- Electrical machines (motors, generators)
- Energy storage systems
- Smart grid interfaces

**Current Projects:**
- High-efficiency power converters for renewable energy
- Electrical machine testing and characterization
- Energy management for microgrids

**Applications:**
- Renewable energy integration
- Electric vehicle charging infrastructure
- Industrial motor drives
- Uninterruptible power supplies
- Microgrid and off-grid power systems

### Domain 3: RF Energy Harvesting

**Description:** Capturing ambient electromagnetic energy from radio frequency sources (Wi-Fi, cellular, broadcast) and converting it to usable DC electricity for low-power devices.

**Technologies:**
- Rectenna design (rectifier + antenna)
- Impedance matching networks
- Multi-band antenna design
- Low-power DC-DC converters

**Current Projects:**
- Ambient RF rectenna design and optimization
- Multi-band energy harvesting from GSM, Wi-Fi, and TV bands
- Integration with microbial fuel cells for hybrid harvesting

**Applications:**
- Autonomous IoT sensor powering
- Battery-free wireless devices
- Emergency backup power
- Remote monitoring systems
- Smart agriculture sensors

### Domain 4: Microbial Fuel Cells (MFC) & Bioenergy

**Description:** Using microorganisms to convert organic waste into electricity through electrochemical reactions, simultaneously addressing waste management and energy generation.

**Technologies:**
- Microbial fuel cell design and optimization
- Electrode materials and catalysts
- Waste-to-energy conversion
- Bio-hydrogen production

**Current Projects:**
- Concrete-based microbial fuel cells
- MFC from diverse organic waste streams
- Hybrid RF-MFC energy systems

**Applications:**
- Wastewater treatment with energy recovery
- Rural electrification
- Organic waste management
- Bio-fertilizer production
- Hydrogen production

### Domain 5: Sensors & Internet of Things (IoT)

**Description:** Development of smart sensors and IoT systems for monitoring, control, and data acquisition in engineering applications.

**Technologies:**
- Embedded systems (ESP32, Arduino, Raspberry Pi)
- Wireless communication (LoRa, Wi-Fi, BLE, NB-IoT)
- Sensor signal conditioning
- Edge computing and data fusion
- Cloud IoT platforms

**Current Projects:**
- IoT-enabled NDT sensor networks
- Remote laboratory monitoring systems
- Smart agriculture sensor nodes
- Environmental monitoring systems

**Applications:**
- Smart manufacturing and Industry 4.0
- Environmental monitoring
- Precision agriculture
- Infrastructure health monitoring
- Remote laboratory access

### Domain 6: Artificial Intelligence & Smart Systems

**Description:** Application of machine learning and AI techniques to engineering problems, particularly in signal processing, pattern recognition, and predictive maintenance.

**Technologies:**
- Machine learning (classification, regression, clustering)
- Deep learning (CNNs, RNNs, transformers)
- Signal processing and feature extraction
- Predictive analytics
- Computer vision

**Current Projects:**
- AI-based defect classification from NDT signals
- Predictive maintenance algorithms for electrical machinery
- Intelligent sensor data fusion
- Automated analysis of Barkhausen noise signatures

**Applications:**
- Automated defect detection and classification
- Predictive maintenance scheduling
- Quality control automation
- Intelligent monitoring systems

### Domain 7: Electrical Energy Conversion & Storage

**Description:** Research on technologies for efficient energy conversion between electrical and other forms, and storage for reliable power supply.

**Technologies:**
- Electrical machines and drives
- Battery management systems
- Supercapacitors
- Power conditioning systems
- Hybrid energy storage

**Current Projects:**
- Electrical machine characterization and testing
- Battery state-of-charge estimation
- Hybrid storage for renewable systems

**Applications:**
- Electric mobility
- Renewable energy integration
- Grid stabilization
- Off-grid power systems

---

## 6. Feature Brainstorm

### Content Features

| Feature | Priority | Description |
|---|---|---|
| **Publication Management** | P0 | Auto-sync with Google Scholar, ORCID, HAL, ResearchGate. BibTeX export, DOI linking, citation metrics, filtering by year/author/type |
| **Researcher Profiles** | P0 | Bio, photo, research interests, publications, projects, students, awards, ORCID, Google Scholar, contact |
| **Research Group Pages** | P0 | Dedicated space for each group with members, projects, publications, news |
| **Research Projects** | P0 | Project pages with description, team, funding, timeline, outputs |
| **Equipment Catalog** | P0 | Searchable catalog of instruments with specs, photos, availability, booking link |
| **Facilities Showcase** | P1 | Virtual tour, photo gallery, floor plans, capabilities |
| **News System** | P0 | Tagged, categorized news articles with author attribution and media embeds |
| **Events Calendar** | P1 | Laboratory events, seminars, conferences, workshops |
| **Image Gallery** | P1 | High-resolution lab photos, equipment, events, experiments |
| **Video Gallery** | P1 | Lab tours, experiment demonstrations, researcher interviews, lectures |
| **Downloads** | P1 | Publications, datasets, thesis archives, software tools, forms |

### Student & Academic Features

| Feature | Priority | Description |
|---|---|---|
| **Program Pages** | P0 | Degree programs with curriculum, admission requirements, outcomes |
| **Admissions Portal** | P1 | Online application, document upload, status tracking |
| **Scholarship Information** | P1 | Available scholarships, eligibility, application process |
| **Internship Applications** | P1 | Online internship application, company partnerships |
| **Open Positions** | P0 | PhD, postdoc, research assistant, technician openings with apply flow |
| **Student Supervision** | P2 | Thesis topics, supervisors directory, ongoing supervision |

### Industry & Partnership Features

| Feature | Priority | Description |
|---|---|---|
| **Technology Transfer** | P1 | Patent portfolio, licensing opportunities, spin-off showcase |
| **Contract Research Portal** | P1 | Service catalog, pricing, inquiry form |
| **Testing Services** | P1 | Equipment-based testing services, quote request |
| **Partnership Tiers** | P2 | Clear articulation of partnership models and benefits |
| **Collaboration Showcase** | P1 | Featured industry collaborations with results and testimonials |
| **Consulting Directory** | P2 | Researcher expertise directory for consulting |

### Community & Engagement Features

| Feature | Priority | Description |
|---|---|---|
| **Newsletter** | P1 | Regular updates, subscribe form, archive |
| **Blog** | P2 | Research stories, student perspectives, behind-the-scenes |
| **Press Kit** | P1 | High-res photos, logos, fact sheets, media contact |
| **Testimonials** | P1 | Quotes from students, partners, alumni |
| **Social Media Integration** | P1 | Feeds, sharing, follow buttons |
| **Contact Forms** | P0 | General inquiry, partnership, press, technical inquiry |

### Advanced Features

| Feature | Priority | Description |
|---|---|---|
| **Global Search** | P0 | Full-text search across all content with faceted filtering |
| **Dark Mode** | P1 | Toggleable dark theme for accessibility and modern feel |
| **Multilingual (EN/FR)** | P0 | Full bilingual support — English and French |
| **Accessibility (WCAG 2.1 AA)** | P0 | Screen reader support, keyboard navigation, contrast, alt text |
| **SEO Optimization** | P0 | Meta tags, structured data, sitemaps, analytics |
| **Analytics Dashboard** | P1 | Public research impact metrics + private admin analytics |
| **Research Metrics** | P2 | Citation counts, h-index aggregation, altmetrics, download stats |
| **AI Research Assistant** | P2 | Natural language Q&A over lab publications |
| **AI Chatbot** | P2 | Site guide — helps visitors find what they need |
| **Semantic Search** | P2 | Context-aware search beyond keyword matching |
| **Knowledge Graph** | P3 | Visual map of researchers, projects, publications, and their connections |

### Admin Features

| Feature | Priority | Description |
|---|---|---|
| **Content Management System** | P0 | Role-based editorial interface for non-technical users |
| **User Management** | P1 | Researchers, admins, editors with RBAC |
| **Laboratory Booking** | P2 | Equipment booking calendar and request system |
| **Visitor Management** | P2 | Guest researcher applications and tracking |
| **Backup Management** | P1 | Automated backups, restore capability |
| **Audit Log** | P1 | Track content changes and user actions |
| **Analytics Integration** | P1 | Google Analytics, Matomo, or Plausible |

---

## 7. Visual Identity

### Design Philosophy

LEEC's visual identity should sit at the intersection of three influences:

1. **African Modernism** — Clean, warm, confident. Not "traditional African patterns" but a contemporary African design sensibility that is globally competitive.
2. **French Engineering Aesthetic** — Precision, typographic rigor, structured grids. The INSA Lyon influence of disciplined engineering design.
3. **Scientific Visualization** — Data as art. B-H curves, magnetic field visualizations, and oscilloscope traces as visual design elements.

### Color Palette

```
Primary Palette

  #0A1628  Deep Space Blue    — Backgrounds, headers, hero sections
  #1B3A5C  Ocean Depth Blue   — Secondary backgrounds, cards
  #2E86AB  Electromagnetic Teal  — Primary accent, CTAs, highlights
  #F5F2EB  Paper White        — Page backgrounds, text areas

Secondary Palette

  #E8B730  Solar Gold         — Accents, awards, highlights
  #D94F4F  Signal Red         — Warnings, limited use for emphasis
  #3CB371  Circuit Green      — Success, positive metrics
  #8B5CF6  Magnetic Purple    — Research domain tags, AI features

Neutral Palette

  #1A1A2E  Near Black         — Primary text
  #4A4A6A  Muted Text         — Secondary text
  #8E8EA0  Disabled / Placeholder
  #D1D1DC  Borders / Dividers
  #E8E8F0  Light Gray         — Hover states, subtle backgrounds
```

### Typography

| Use | Font | Fallback |
|---|---|---|
| **Headings** | Inter (variable weight, 600-800) | System sans-serif |
| **Body** | Inter (400-500) | System sans-serif |
| **Monospace / Code** | JetBrains Mono | Fira Code |
| **Display / Hero** | DM Sans or Satoshi (700-900) | System sans-serif |
| **French/English Mix** | Inter supports both well | — |

**Typography Scale:**
```
Display:    96/96    (Hero titles)
H1:         48/56    (Page titles)
H2:         36/44    (Section headers)
H3:         24/32    (Card titles)
H4:         20/28    (Sub-section headers)
Body:       16/26    (Paragraphs)
Body Small: 14/22    (Meta, captions)
Caption:    12/18    (Labels, footnotes)
```

### Grid System

- **12-column fluid grid** (1200px max content width, 1440px max full-width)
- Gutter: 24px (desktop), 16px (tablet), 12px (mobile)
- Margins: 24px (desktop), 16px (tablet), 12px (mobile)
- Vertical rhythm: 8px base unit

### Layout Principles

1. **Generous whitespace** — Content breathes. No crowded layouts.
2. **Card-based** — Modular, composable, scalable content blocks.
3. **Visual hierarchy** — Every page answers: "What should I see first? Second? Third?"
4. **Mobile-first** — All layouts designed from smallest screen up.
5. **Breakpoints:** 480px / 768px / 1024px / 1440px

### Animations & Micro-interactions

| Element | Behavior |
|---|---|
| **Page transitions** | Subtle fade + slide-up (300ms ease-out) |
| **Card hover** | Slight lift (translateY -2px) + shadow deepening (200ms) |
| **Link hover** | Underline slide-in animation |
| **Button hover** | Scale 1.02 + background shift (150ms) |
| **Scroll reveal** | Elements fade in as they enter viewport (staggered) |
| **Data visualization** | Animated on scroll — B-H curves draw themselves |
| **Loading states** | Pulsing skeleton screens, not spinners |
| **Error states** | Gentle shake animation on form errors |
| **Dark mode toggle** | Smooth CSS transition on all elements (400ms) |

### Hero Section

The hero should NOT be a static image. It should be an interactive, dynamic canvas:

1. **Primary element:** Full-viewport background with either:
   - Cinematic video loop of the lab in action (researchers at work, equipment running)
   - Animated particle system or magnetic field visualization that responds to scroll
2. **Overlay:** Gradient from Deep Space Blue (bottom) to transparent (top)
3. **Content:**
   - LARGE headline: "Laboratory of Electrical Engineering and Computing"
   - Subheadline: "Advancing African engineering through research, innovation, and international collaboration"
   - Two CTAs: "Explore Research" / "Join Us"
4. **Scroll indicator:** Animated down-arrow or mouse icon

### Photography Style

| Subject | Style |
|---|---|
| **Researchers** | Environmental portraits — in the lab, at equipment, not staged studio shots |
| **Equipment** | High-detail, macro-focused, dramatic lighting |
| **Experiments** | In-process shots that show the "messiness" of real research |
| **Students** | Natural, candid moments of collaboration |
| **Lab environment** | Wide shots showing lab layout and scale |
| **Color grade** | Warm blues and teals, slightly desaturated, high contrast |

### Illustrations & Diagrams

- **Scientific illustrations:** Custom-drawn B-H curves, magnetic field lines, circuit diagrams, sensor diagrams
- **Icons:** Outline-based icon set (phosphor or similar), consistent 2px stroke, rounded caps
- **Diagrams:** Process flows, lab organization charts, research domain maps
- **Style:** Clean, minimal, black-on-white or white-on-blue, with accent color highlights

### 3D Elements (Where Appropriate)

- Interactive 3D model of the Printed Magnetic Needle Probe (PMNP)
- Rotatable 3D visualization of magnetic field distributions
- 3D model of lab floor plan with equipment hot spots
- Use Three.js or ModelViewer — lightweight, no plugins

### Branding Guidelines Summary

| Element | Guideline |
|---|---|
| **Logo** | LEEC wordmark in customized Inter weight with electromagnetic wave symbol above or beside. French + English subtitle. |
| **Clear space** | Minimum height of the logo on all sides |
| **Logo variants** | Full color (blue/gold), reversed (white), monochrome (black) |
| **Logo misuse** | Never stretch, rotate, add effects, or place on busy backgrounds |
| **Secondary graphics** | Magnetic field lines, oscilloscope traces, circuit board patterns as background textures |

---

## 8. Homepage Design

### Section-by-Section Layout

#### Section 1: Hero
- Full-viewport immersive background (video or animated visualization)
- Headline + subheadline + two CTAs
- Scroll indicator
- Navigation bar floating on top (transparent → solid on scroll)

#### Section 2: Mission Statement
- One powerful sentence: *"Advancing African engineering through cutting-edge research, world-class facilities, and a commitment to open science and international collaboration."*
- Below: Three core pillars in cards:
  1. **Research Excellence** — Brief + link to Research
  2. **International Collaboration** — Brief + link to About/Partnership
  3. **Student Innovation** — Brief + link to Academics
- Each card has icon, title, 1-sentence description, arrow link

#### Section 3: Research Impact (Statistics Bar)
- Horizontal counter strip with animated numbers:
  - **X** Research Projects
  - **Y** Publications
  - **Z** International Partners
  - **W** PhD Students
- Counters animate on scroll into view (3-5 second counting animation)

#### Section 4: Research Areas
- 6-card grid showing key research domains
- Each card: domain icon, domain name, 1-line description, "Learn More"
- Hover effect: card lifts, icon animates, subtle color shift
- Click → domain landing page

#### Section 5: Latest Publications
- 3-4 most recent or most cited publications
- Card format: title, authors, journal, year, DOI badge, citation count
- "View All Publications" link
- Auto-synced from publication database

#### Section 6: Featured Projects
- 2-3 marquee research projects with high visual impact
- Full-width cards with background image, overlay with project title, PI name, brief description
- "Explore Projects" link

#### Section 7: Equipment & Facilities
- Visual grid of key equipment with photos
- "State-of-the-Art Laboratory" headline
- Highlight: S-parameter analyzer, high-voltage test bench, MNP setup, oscilloscopes
- "Virtual Lab Tour" CTA

#### Section 8: Partnership Showcase
- Partner logos in horizontal scroll/marquee
- Featured: INSA Lyon, French Embassy, University of Buea
- "Our Partners" link to full partnership page

#### Section 9: Latest News
- 3-column grid of recent news items
- Card format: image, date, title, snippet
- "All News" link

#### Section 10: Events
- Upcoming events in a clean timeline or card list
- Event name, date, location/online, brief description
- "Events Calendar" link

#### Section 11: Testimonials
- Carousel of quotes from students, researchers, partners
- High-quality portrait photos, name, title, affiliation
- Auto-rotating with manual navigation

#### Section 12: Join Us CTA
- Full-width colored section
- "Be Part of Something Extraordinary"
- Three pathways:
  1. **Study** → Programs
  2. **Research** → Open Positions
  3. **Partner** → Collaboration
- Each with icon and arrow link

#### Section 13: Footer
- LEEC logo + brief description
- Quick links (About, Research, People, Academics, News, Contact)
- Contact information (address, phone, email)
- Social media icons
- Newsletter signup
- Partnership logos (compact)
- Copyright, Privacy Policy, Terms, Accessibility
- "Back to top" button

---

## 9. Researcher Profile Page

### Page Layout (Top to Bottom)

```
┌────────────────────────────────────────────────────┐
│  [Back to People]                                   │
│                                                     │
│  ┌────────┐  [Name]                                 │
│  │ Photo  │  [Title / Position]                     │
│  │        │  [Affiliation]                          │
│  │        │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  └────────┘  │Email │ │ORCID │ │Google│ │RGate │  │
│              └──────┘ └──────┘ └──────┘ └──────┘  │
│                                                     │
├─────────────────────────────────────────────────────┤
│  Biography (markdown)                                │
│                                                     │
├─────────────────────────────────────────────────────┤
│  Research Interests (tags)                           │
│  [Electromagnetic NDT] [MBN] [MIP] [Sensor Design]  │
│                                                     │
├─────────────────────────────────────────────────────┤
│  Current Projects (2-3 cards)                        │
│  ┌────────────────────────────────────────────────┐ │
│  │ Project Title  |  Status: Active               │ │
│  │ Brief description                               │ │
│  │ Partners: [INSA Lyon] [University of Buea]     │ │
│  └────────────────────────────────────────────────┘ │
│                                                     │
├─────────────────────────────────────────────────────┤
│  Publications                                        │
│  ┌── Filter: [All] [Journal] [Conference] ────────┐ │
│  │ 2024                                            │ │
│  │ • Author et al. "Title" *Journal* (2024) [DOI] │ │
│  │ • Author et al. "Title" *Conference* (2024)     │ │
│  │ 2023                                            │ │
│  │ • ...                                           │ │
│  └────────────────────────────────────────────────┘ │
│  [Export BibTeX]  [View on Google Scholar]           │
│                                                     │
├─────────────────────────────────────────────────────┤
│  Students Supervised                                 │
│  ┌────────────────────────────────────────────────┐ │
│  │ PhD: Name (2024-2028) — "Thesis Title"         │ │
│  │ Master: Name (2025) — "Thesis Title"           │ │
│  └────────────────────────────────────────────────┘ │
│                                                     │
├─────────────────────────────────────────────────────┤
│  Awards & Honors                                     │
│  • Best Paper Award, XYZ Conference (2024)          │
│  • Research Grant, French Embassy (2023)            │
│                                                     │
├─────────────────────────────────────────────────────┤
│  Collaborations                                      │
│  • INSA Lyon — [Research Topic] — since 2022        │
│  • University of Lyon — [Research Topic]            │
│                                                     │
├─────────────────────────────────────────────────────┤
│  Contact                                             │
│  Email | Phone | Office | Lab                       │
└─────────────────────────────────────────────────────┘
```

### Key Design Decisions

- **Profile photo:** Circular, high-quality environmental portrait, consistent size across all profiles
- **Social/academic badges:** ORCID, Google Scholar, ResearchGate, LinkedIn — standardized icon + link buttons
- **Publication list:** Auto-synced from HAL/Google Scholar — no manual updating
- **Research interests:** Clickable tags → filter all researchers by interest
- **Projects:** Live-linked to full project pages
- **Metrics row (optional):** h-index, total citations, i10-index — sourced from Google Scholar API

---

## 10. Publication System

### Publication Types

| Type | Icon | Metadata |
|---|---|---|
| Journal Article | 📄 | Authors, Title, Journal, Volume, Pages, Year, DOI, ISSN |
| Conference Paper | 🎤 | Authors, Title, Conference, Location, Date, DOI |
| Book / Chapter | 📚 | Authors/Editors, Title, Publisher, ISBN, Year |
| Technical Report | 📋 | Authors, Title, Institution, Report Number, Year |
| Dataset | 💾 | Creators, Title, Repository, DOI, Year |
| Thesis | 🎓 | Author, Title, Degree, Institution, Year |
| Patent | 🔬 | Inventors, Title, Patent Number, Office, Year, Status |
| Software | 💻 | Authors, Name, Repository, Version, License, DOI (Zenodo) |

### Features

#### Search & Discovery
- Full-text search across all publications
- Faceted filtering: by type, year, research domain, author, keyword
- Sort by: date (newest/oldest), citation count, title
- Year range slider

#### Export & Citation
- **BibTeX export** — single or batch
- **Citation formats:** APA, IEEE, MLA, Chicago, Harvard, Vancouver
- **RIS export** for reference managers (Zotero, Mendeley, EndNote)
- **Copy citation** button (1-click)

#### Integration
- **DOI auto-resolution** — fetch metadata from Crossref
- **Google Scholar sync** — import publication list from researcher's profile
- **HAL Sync** — for French academic compliance
- **ORCID auto-import** — publications linked to researcher's ORCID
- **OpenAlex integration** — open-source scholarly data

#### Metrics
- Citation count (from Crossref / OpenAlex)
- Altmetric badge (Altmetric.com)
- Download count (if PDF hosted)
- Full-text views

#### Display Modes
- **List view:** Compact, sortable table
- **Card view:** Visual cards with journal badge, abstract snippet
- **Grid view:** Minimal, for browsing
- **Export view:** Clean print-friendly format

### Database Schema (Simplified)

```
publication
├── id (UUID)
├── type (enum: journal, conference, book, report, dataset, thesis, patent, software)
├── title (text)
├── authors (jsonb: [{name, affiliation, orcid, order}])
├── abstract (text)
├── year (integer)
├── doi (varchar, unique)
├── journal (varchar)
├── conference (varchar)
├── publisher (varchar)
├── volume (varchar)
├── issue (varchar)
├── pages (varchar)
├── isbn (varchar)
├── issn (varchar)
├── patent_number (varchar)
├── repository (varchar)
├── citation_count (integer)
├── altmetric_score (float)
├── pdf_url (varchar)
├── source_data_url (varchar)
├── code_url (varchar)
├── keywords (text[])
├── research_domains (text[])
├── language (varchar)
├── license (varchar)
├── created_at (timestamp)
├── updated_at (timestamp)
└── researchers (many-to-many)
```

---

## 11. Technology Stack

### Architecture Decision Record

#### Decision 1: Frontend Framework

**Choice: Next.js 15+ (React)**

| Factor | Verdict |
|---|---|
| **SSG/SSR hybrid** | Perfect for a lab website — mostly static content with dynamic publication pages |
| **ISR (Incremental Static Regeneration)** | Publications update → page regenerates without full rebuild |
| **Internationalization** | Built-in internationalized routing for EN/FR |
| **Image optimization** | Built-in Next/Image for responsive, optimized photos |
| **Performance** | Excellent Core Web Vitals out of the box |
| **Ecosystem** | Mature, massive community, plenty of academic site examples |
| **Hosting** | Free tier on Vercel with generous limits |

**Alternatives considered:**
- **Hugo** — Faster builds, simpler, but harder to build interactive features and dynamic publication system
- **Gatsby** — Slower builds, less active community than Next.js
- **SvelteKit** — Newer, smaller ecosystem for academic sites

#### Decision 2: CMS / Content Management

**Choice: Strapi 5 (Headless CMS)**

| Factor | Verdict |
|---|---|
| **Self-hosted** | Full control over data, no vendor lock-in |
| **REST + GraphQL** | Flexible API consumption by Next.js |
| **Role-based access** | Admin, editor, researcher roles |
| **Media management** | Built-in media library for images, PDFs, videos |
| **Localization** | Built-in i18n for EN/FR content |
| **Open source** | MIT license, free to use |
| **Custom content types** | Define publication, researcher, project, equipment types |

**Alternatives considered:**
- **Wagtail (Python/Django)** — Excellent but requires Python hosting expertise
- **Sanity/Contentful** — SaaS, recurring cost
- **WordPress** — Overkill, security concerns, not headless
- **Markdown files** — Too manual for non-technical editors

#### Decision 3: Database

**Choice: PostgreSQL**

| Factor | Verdict |
|---|---|
| **Reliability** | Battle-tested, mature |
| **JSONB support** | Store publication metadata, author lists as flexible JSON |
| **Full-text search** | Built-in `tsvector` for search without extra services |
| **PostGIS plugin** | Future geographic/partner mapping |
| **Scale** | Handles thousands of publications easily |
| **Cost** | Free, self-hosted or cheap managed (Supabase, Neon, AWS RDS) |

#### Decision 4: Authentication

**Choice: NextAuth.js (Auth.js) + Role-Based Access Control**

- Email/password + Google OAuth for admin access
- JWT-based sessions
- Roles: `admin`, `editor`, `researcher`, `viewer`

#### Decision 5: Deployment & Hosting

| Component | Service | Rationale |
|---|---|---|
| **Frontend** | Vercel (Pro or Enterprise) | Best Next.js hosting, ISR support, edge functions |
| **CMS** | Docker on VPS (DigitalOcean / Hetzner) or Railway.app | Self-hosted Strapi |
| **Database** | Supabase or Neon (managed PostgreSQL) | Free tier, auto-scaling |
| **File storage** | AWS S3 or Cloudflare R2 | Image/PDF/media storage |
| **Search** | Meilisearch or Typesense | Fast, typo-tolerant search over publications/people |
| **Email** | SendGrid or Resend | Contact forms, newsletter |
| **Analytics** | Plausible or Umami | Privacy-focused, self-hostable |
| **Monitoring** | Sentry (error tracking) + Uptime Robot | Free tiers available |

#### Decision 6: Docker & CI/CD

- **Dockerfile** for Strapi CMS
- **docker-compose.yml** for local development (Strapi + PostgreSQL)
- **CI/CD:** GitHub Actions
  - `on push to main`: Build frontend → run tests → deploy to Vercel
  - `on push to main (CMS changes)`: Build Docker image → deploy to VPS

#### Decision 7: Container Orchestration

- **Start:** Simple Docker on single VPS with watchtower for auto-updates
- **Scale:** Kubernetes (k3s) only when multi-lab deployment is needed

### Complete Stack Diagram

```
┌────────────────────────────────────────────────────────┐
│                    LEEC Platform                         │
├────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │           Next.js 15 (React) Frontend            │   │
│  │  ┌─────────┐ ┌──────────┐ ┌───────────────────┐ │   │
│  │  │  Pages  │ │  App     │ │  Components        │ │   │
│  │  │  Router │ │  Router  │ │  / UI Library      │ │   │
│  │  └─────────┘ └──────────┘ └───────────────────┘ │   │
│  │  ┌─────────┐ ┌──────────┐ ┌───────────────────┐ │   │
│  │  │  i18n   │ │  Auth    │ │  API Client       │ │   │
│  │  │ (next-  │ │(next-auth)│ │  (fetch / SWR)    │ │   │
│  │  │ intl)   │ │          │ │                    │ │   │
│  │  └─────────┘ └──────────┘ └───────────────────┘ │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │            Strapi 5 (Headless CMS)               │   │
│  │  ┌──────────┐ ┌────────────┐ ┌────────────────┐ │   │
│  │  │ Content  │ │ Media      │ │ API (REST +    │ │   │
│  │  │ Types    │ │ Library    │ │ GraphQL)        │ │   │
│  │  └──────────┘ └────────────┘ └────────────────┘ │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │                PostgreSQL Database               │   │
│  │  ┌─────────┐ ┌───────────┐ ┌──────────────────┐ │   │
│  │  │ Content │ │ Full-text │ │ Publication      │ │   │
│  │  │ Tables  │ │ Search    │ │ + Citation Data  │ │   │
│  │  └─────────┘ └───────────┘ └──────────────────┘ │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
│  ┌────────┐ ┌──────────┐ ┌──────────┐ ┌─────────────┐  │
│  │ S3/R2  │ │Meilisearch│ │Plausible │ │  SendGrid   │  │
│  │ Files  │ │ Search   │ │Analytics │ │  Email      │  │
│  └────────┘ └──────────┘ └──────────┘ └─────────────┘  │
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │        External Integrations                      │   │
│  │  ┌─────────┐ ┌────────┐ ┌────────┐ ┌─────────┐ │   │
│  │  │CrossRef │ │ ORCID  │ │Google  │ │ HAL     │ │   │
│  │  │ API     │ │ API    │ │Scholar │ │ API     │ │   │
│  │  └─────────┘ └────────┘ └────────┘ └─────────┘ │   │
│  └─────────────────────────────────────────────────┘   │
│                                                          │
└────────────────────────────────────────────────────────┘
```

### Frontend Dependencies

```
Core:
  next@15
  react@19
  react-dom@19
  typescript@5

UI & Styling:
  tailwindcss@4
  shadcn/ui (component library)
  framer-motion (animations)
  lucide-react (icons)

Data & State:
  @tanstack/react-query (server state)
  swr (data fetching)
  zustand (client state)

Integrations:
  next-auth@5 (authentication)
  next-intl (internationalization)
  react-dropzone (file uploads)

Search:
  meilisearch (or typesense)

Charts & Viz:
  recharts (basic charts)
  d3.js (custom visualizations)
  three.js (3D elements, selective)

Forms:
  react-hook-form
  zod (validation)

Performance:
  next/image (optimized images)
  next/font (font loading)
  @next/bundle-analyzer
```

---

## 12. Scalability

### Current Scale (LEEC Only)

- Researchers: ~15-25
- Publications: ~50-100
- Projects: ~10-20
- Equipment items: ~30-50
- Pages: ~50-100

### Three-Year Scale

- Multiple research groups (4-6)
- Researchers: 50-100
- Publications: 200-500
- Projects: 40-80
- Equipment: 80-120
- Pages: 150-300

### Five-Year Scale (Multi-Lab Platform)

- Laboratories: 3-8 (LEEC as flagship, then other FET labs)
- Researchers: 200-500
- Publications: 1,000-5,000
- Projects: 200+
- Pages: 500+

### Architecture Decisions for Scale

| Concern | Strategy |
|---|---|
| **Content scaling** | Strapi handles thousands of content entries. PostgreSQL scales horizontally with read replicas. |
| **Traffic scaling** | Next.js ISR on Vercel edge network — static pages served globally. Dynamic pages cached. |
| **Multi-tenancy** | Strapi's content types can include `lab_id` field. Or separate Strapi instances per lab. |
| **Search scaling** | Meilisearch indexes up to billions of documents. Dedicated instance per lab cluster. |
| **Media scaling** | S3/R2 with CDN (CloudFront or Cloudflare). Automatic image resizing via Next/Image. |
| **Internationalization** | next-intl handles multiple locales without separate deployments. |
| **Recurrent sync** | Background jobs (Bull/Redis) for ORCID, CrossRef, HAL sync — scales with queue workers. |
| **Team scaling** | Strapi's RBAC supports multiple editors with different permissions per content type. |
| **Backup scaling** | Automated PostgreSQL backups + S3 lifecycle policies for media. |

### Multi-Lab Architecture Pattern

```
                          ┌──────────────────┐
                          │   Lab Directory   │
                          │   lab1.ubuea.cm  │
                          │   lab2.ubuea.cm  │
                          │   lab3.ubuea.cm  │
                          └──────────────────┘
                                     │
                          ┌──────────┴──────────┐
                          │   Central Platform  │
                          │ (Shared Components) │
                          │  • Auth Service     │
                          │  • Search Index     │
                          │  • Analytics        │
                          │  • Publication DB   │
                          └────────────────────┘
                          /         │          \
              ┌───────────┐ ┌───────────┐ ┌───────────┐
              │  Lab 1    │ │  Lab 2    │ │  Lab 3    │
              │  Strapi   │ │  Strapi   │ │  Strapi   │
              │  Own DB   │ │  Own DB   │ │  Own DB   │
              │  Own UI   │ │  Own UI   │ │  Own UI   │
              │  Content  │ │  Content  │ │  Content  │
              └───────────┘ └───────────┘ └───────────┘
```

---

## 13. Security

### Authentication & Authorization

| Feature | Implementation |
|---|---|
| **Admin authentication** | NextAuth.js with email/password + OTP or Google OAuth |
| **Password policy** | Min 12 chars, bcrypt hashing, rate-limited login attempts |
| **Session management** | JWT with short expiry (15 min for admin, 7 days for "remember me") |
| **MFA** | Optional TOTP for admin accounts |
| **Roles** | `superadmin` | `admin` | `editor` | `researcher` | `viewer` |
| **RBAC** | Strapi's built-in role system + custom middleware for frontend routes |

### Encryption

| Data Type | Encryption |
|---|---|
| **Passwords** | bcrypt (cost factor 12) |
| **Database at rest** | PostgreSQL TDE or filesystem encryption |
| **Data in transit** | TLS 1.3 (mandatory, enforced at CDN level) |
| **API tokens** | Encrypted in database, masked in logs |
| **Personal data** | Encrypted at rest (AES-256-GCM) |

### OWASP Best Practices

| Attack Vector | Mitigation |
|---|---|
| **XSS** | React's built-in sanitization, Content-Security-Policy header |
| **CSRF** | CSRF tokens for all state-changing requests |
| **SQL Injection** | Parameterized queries via Prisma/Knex ORM |
| **Rate Limiting** | Next.js middleware rate limiting on API routes |
| **DDoS** | Vercel/Cloudflare edge protection |
| **Brute Force** | Rate limiting on auth endpoints, progressive delays |
| **IDOR** | Server-side authorization checks on all API routes |

### Security Headers

```
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' https: data:; font-src 'self'; connect-src 'self' https://api.strapi.leec.org
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

### Backup Strategy

| Component | Frequency | Retention | Storage |
|---|---|---|---|
| **Database** | Daily full, hourly incremental | 30 days | S3 + offsite |
| **Media files** | Daily incremental | 90 days | S3 versioning |
| **CMS configuration** | On change | Git history | GitHub |
| **Code** | On commit | Git history | GitHub |

### GDPR Compliance

- Cookie consent banner (minimal, analytics only)
- Privacy policy clearly stating data collection and purpose
- Contact form data retention policy (delete after 90 days)
- Right to access, rectification, erasure — email-based request form
- Data Processing Agreement with hosting providers

---

## 14. AI Features

### Planned AI Capabilities

#### Feature 1: AI Research Assistant (P2)

**Description:** A chatbot-style interface that answers questions about LEEC's research using the lab's publication corpus as knowledge base.

**Example queries:**
- "What has the lab published on magnetic Barkhausen noise?"
- "Summarize the latest research on RF energy harvesting."
- "Find papers co-authored with INSA Lyon researchers."
- "What equipment is available for materials characterization?"

**Tech stack:**
- RAG (Retrieval-Augmented Generation) using embeddings (OpenAI/Cohere/Llama)
- Vector database: pgvector (PostgreSQL extension) or Qdrant
- LLM: GPT-4o-mini or Claude Haiku (cost-effective)
- Embeddings: text-embedding-3-small

**UX:**
- Floating chat button on all pages
- Expandable sidebar or modal
- "Ask about our research" prompt
- Citations linked to actual publications

#### Feature 2: AI Search (P1)

**Description:** Semantic search over all site content — not just keyword matching but understanding user intent.

**Implementation:**
- Meilisearch for fast typo-tolerant search
- Embedding-based semantic reranking for complex queries
- Hybrid search (keyword + semantic)

#### Feature 3: Publication Summaries (P2)

**Description:** Auto-generated 2-3 sentence plain-language summaries of each publication, written by AI and reviewed by authors.

**Implementation:**
- On publication import, generate summary via LLM
- Display alongside abstract
- "Too technical? Read the summary" toggle
- Authors can edit summaries before publication

#### Feature 4: Paper Recommendations (P2)

**Description:** "Readers also viewed" and "Related publications" based on embedding similarity.

**Implementation:**
- Compute cosine similarity between publication embeddings
- Show top 5 related publications on each publication page
- "Based on your interests" suggestions on researcher profiles

#### Feature 5: Grant Recommendation Engine (P3)

**Description:** Analyze researcher profiles and publication track record to suggest relevant funding opportunities.

**Implementation:**
- Match research keywords against funding databases
- Display tailored grant opportunities on researcher dashboard
- Alert researchers to upcoming deadlines

#### Feature 6: Knowledge Graph (P3)

**Description:** Visual, interactive graph showing connections between researchers, projects, publications, equipment, and partners.

**Implementation:**
- Neo4j or D3.js force-directed graph
- Filter by research domain, time period, relationship type
- Click a node → see details + connections
- "How is Researcher X connected to Project Y?"

#### Feature 7: Research Trend Analysis (P3)

**Description:** Identify emerging research topics, collaboration patterns, and citation trends across LEEC's publication corpus.

**Implementation:**
- NLP topic modeling on abstracts
- Co-authorship network analysis
- Citation network analysis
- Dashboard for administrators

### AI Feature Maturity Roadmap

```
Phase 1 (MVP):   AI Search + Publication Summaries
Phase 2 (Growth): AI Research Assistant + Paper Recommendations
Phase 3 (Scale):  Grant Recommendations + Knowledge Graph
Phase 4 (Advanced): Trend Analysis + Predictive Analytics
```

---

## 15. Development Roadmap

### Phase 1 — Discovery & Research (Weeks 1-2)

| Task | Duration | Output |
|---|---|---|
| Stakeholder interviews (lab director, researchers, students, admin) | 3 days | Requirements document |
| Content audit — existing materials (PDFs, photos, publications) | 2 days | Content inventory |
| Technical environment setup (GitHub, Vercel, Strapi, PostgreSQL) | 2 days | Working dev environment |
| Brand workshop | 2 days | Brand guidelines draft |
| **Milestone:** Requirements + brand approved | — | — |

### Phase 2 — UI/UX Design (Weeks 3-5)

| Task | Duration | Output |
|---|---|---|
| Information architecture finalization | 3 days | Sitemap + content model |
| Wireframing (all page types) | 5 days | Wireframes (Figma) |
| Visual design (homepage, 3 interior pages, researcher profile) | 5 days | High-fidelity mockups |
| Component library design (buttons, cards, forms, navigation) | 3 days | Design system |
| Prototype (interactive click-through) | 3 days | Figma prototype |
| User testing (5-8 users) | 2 days | Testing report + iterations |
| **Milestone:** Design sign-off | — | — |

### Phase 3 — MVP Development (Weeks 6-10)

| Task | Duration | Output |
|---|---|---|
| Project scaffolding (Next.js, Strapi, database, CI/CD) | 3 days | Working boilerplate |
| Design system implementation (React components) | 5 days | Component library |
| Homepage development | 3 days | Homepage live |
| About pages (mission, history, governance, partnership) | 3 days | About section |
| Research group pages (5-6 groups) | 5 days | Research section |
| People directory + researcher profiles | 4 days | People section |
| News + events system | 3 days | News section |
| Contact forms + basic CMS content | 2 days | Communication features |
| Responsive design + mobile optimization | 3 days | Mobile-ready |
| SEO basics (meta tags, sitemap, structured data) | 2 days | SEO foundation |
| Bilingual setup (English + French) | 3 days | i18n working |
| **Milestone:** MVP live at leec.ubuea.cm | — | — |

### Phase 4 — CMS & Content Population (Weeks 11-12)

| Task | Duration | Output |
|---|---|---|
| Content population (all pages in EN + FR) | 5 days | Complete content |
| Photo gallery setup (50+ optimized images) | 3 days | Gallery live |
| Video upload + embedding | 2 days | Video section |
| PDF/document management | 2 days | Downloads section |
| Admin training (Strapi CMS training for lab admin) | 2 days | Trained admins |
| **Milestone:** All content live, admins trained | — | — |

### Phase 5 — Publication System (Weeks 13-14)

| Task | Duration | Output |
|---|---|---|
| Publication content type design (Strapi) | 2 days | Schema |
| CrossRef/DOI integration | 2 days | Auto-metadata fetch |
| ORCID integration | 2 days | Auto-import from ORCID |
| HAL integration (for French compliance) | 2 days | French repository sync |
| BibTeX export + citation formats | 3 days | Export working |
| Publication search + filtering | 2 days | Discovery working |
| Publication metrics (citations, altmetrics) | 2 days | Metrics displayed |
| **Milestone:** Publication system live | — | — |

### Phase 6 — Research Portal (Weeks 15-16)

| Task | Duration | Output |
|---|---|---|
| Equipment catalog with specs + photos | 3 days | Equipment section |
| Facilities showcase with virtual tour | 3 days | Facilities section |
| Project pages with timeline + outputs | 3 days | Projects section |
| Technology transfer showcase | 2 days | Innovation section |
| Partner integration + collaboration showcase | 2 days | Partners section |
| **Milestone:** Research portal complete | — | — |

### Phase 7 — Optimization & Advanced Features (Weeks 17-19)

| Task | Duration | Output |
|---|---|---|
| Performance optimization (Lighthouse 90+) | 3 days | Fast load times |
| Accessibility audit + fixes (WCAG 2.1 AA) | 3 days | Accessible |
| AI search implementation | 3 days | Semantic search |
| Dark mode implementation | 2 days | Dark mode |
| Analytics dashboard (Plausible) | 2 days | Analytics live |
| AI Research Assistant (basic RAG) | 5 days | Chatbot beta |
| **Milestone:** Platform optimization complete | — | — |

### Phase 8 — Production Deployment (Weeks 20)

| Task | Duration | Output |
|---|---|---|
| Security audit + penetration testing | 3 days | Security report |
| Load testing (k6 or similar) | 2 days | Performance baseline |
| DNS + SSL setup | 1 day | Production domain |
| Production deployment (Vercel Pro + Strapi on VPS) | 2 days | Live at leec.ubuea.cm |
| Monitoring setup (Sentry, Uptime Robot) | 1 day | Monitoring active |
| Go-live announcement | 1 day | Press release + social |
| Post-launch support (2-week warranty) | 2 weeks | Bug fixes |
| **Milestone:** OFFICIAL LAUNCH | — | — |

### Total Timeline: 20 Weeks (~5 Months)

---

## 16. Deliverables

### Complete Deliverables List

| # | Deliverable | Format | Audience | Due |
|---|---|---|---|---|
| 1 | **Product Requirements Document (PRD)** | Markdown/Doc | Stakeholders | End of Phase 1 |
| 2 | **Functional Specification** | Markdown/Doc | Development team | End of Phase 1 |
| 3 | **Information Architecture** | Sitemap + Content Model | Design + Dev | End of Phase 1 |
| 4 | **UX Blueprint** | User flows + Wireframes | Design | End of Phase 2 |
| 5 | **Database ER Diagram** | Entity-relationship diagram | Backend | End of Phase 3 |
| 6 | **API Specification** | OpenAPI 3.0 / Swagger | Full-stack | End of Phase 3 |
| 7 | **Wireframes** | Figma (all page types) | Design + Stakeholders | End of Phase 2 |
| 8 | **UI Component Library** | React components (Storybook) | Frontend | End of Phase 3 |
| 9 | **Technical Architecture Document** | System diagram + stack decisions | Development | End of Phase 2 |
| 10 | **Development Roadmap** | Gantt/timeline | Project management | End of Phase 1 |
| 11 | **Risk Assessment** | Risk matrix + mitigation | Stakeholders | End of Phase 1 |
| 12 | **Brand Guidelines** | Visual identity document | All | End of Phase 2 |
| 13 | **Content Strategy Guide** | Tone, voice, SEO guidelines | Content editors | End of Phase 4 |
| 14 | **Deployment Runbook** | Step-by-step deployment guide | Ops | End of Phase 7 |
| 15 | **Admin Manual** | Strapi CMS user guide | Lab admins | End of Phase 4 |
| 16 | **Security Audit Report** | Vulnerability assessment + fixes | Security | End of Phase 8 |

### This Report as a Living Document

This brainstorming report itself is **Deliverable #0** — the foundational vision document. It should be:

1. **Reviewed** by LEEC stakeholders (lab director, FET dean, partner representatives)
2. **Prioritized** — mark each feature P0/P1/P2/P3
3. **Budgeted** — estimate time/cost for each phase
4. **Iterated** — updated every quarter as the lab evolves

---

## Appendix: Key Differentiators

What makes LEEC's website different from every other academic lab website:

| Differentiator | Why It Matters |
|---|---|
| **African + French identity** | No other lab website tells this story — a Cameroonian lab with INSA Lyon DNA and French Embassy backing |
| **Bilingual from day one** | Not an afterthought — EN/FR parity in content, navigation, and design |
| **Data as art** | B-H curves, magnetic fields, oscilloscope patterns as design elements, not just figures |
| **Live publication sync** | No manual updates — auto-synced from ORCID, CrossRef, HAL |
| **AI-powered research assistant** | First lab website in Central Africa with AI-based publication Q&A |
| **Mobile-first in a mobile-first continent** | Optimized for the African context where most users access via phone |
| **From brochure to platform** | Not a static site — a living platform with equipment booking, internship applications, collaboration requests |

---

*End of Brainstorming Report*

*Next step: Review with LEEC stakeholders, prioritize, and begin Phase 1 (Discovery & Research).*
