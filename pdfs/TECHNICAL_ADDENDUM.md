# LEEC Platform — Technical Deep-Dive

## Stack: Node.js + TypeScript | PostgreSQL | Next.js 15 (App Router) | shadcn/ui | Strapi 5

---

This document extends section 11 of `BRAINSTORM.md` with deep implementation-level detail for each technology in the chosen stack. Read this alongside the main report.

---

## Table of Contents

1. [Project Structure](#1-project-structure)
2. [Next.js 15 App Router Architecture](#2-next-js-15-app-router-architecture)
3. [Strapi 5 CMS — Content Architecture](#3-strapi-5-cms---content-architecture)
4. [PostgreSQL Data Model](#4-postgresql-data-model)
5. [shadcn/ui Design System Implementation](#5-shadcn-ui-design-system-implementation)
6. [Integration Layer — Next.js ↔ Strapi ↔ External APIs](#6-integration-layer)
7. [ISR & Caching Strategy](#7-isr---caching-strategy)
8. [Internationalization (i18n) — English / French](#8-internationalization-i18n)
9. [Search Architecture](#9-search-architecture)
10. [AI Research Assistant — RAG Pipeline](#10-ai-research-assistant-rag-pipeline)
11. [Authentication & Authorization](#11-authentication---authorization)
12. [Deployment Architecture](#12-deployment-architecture)
13. [Complete File Tree (Proposed)](#13-complete-file-tree-proposed)

---

## 1. Project Structure

### Monorepo Structure

```
leec-ubuea/
├── apps/
│   ├── web/                          # Next.js 15 frontend
│   │   ├── src/
│   │   │   ├── app/                  # App Router pages
│   │   │   │   ├── [locale]/         # Internationalized routes
│   │   │   │   │   ├── (public)/     # Public routes (no auth)
│   │   │   │   │   │   ├── page.tsx              # Homepage
│   │   │   │   │   │   ├── about/
│   │   │   │   │   │   ├── research/
│   │   │   │   │   │   ├── people/
│   │   │   │   │   │   ├── publications/
│   │   │   │   │   │   ├── news/
│   │   │   │   │   │   ├── events/
│   │   │   │   │   │   ├── equipment/
│   │   │   │   │   │   ├── contact/
│   │   │   │   │   │   └── participate/
│   │   │   │   │   ├── (admin)/      # Admin routes (auth required)
│   │   │   │   │   │   └── admin/
│   │   │   │   │   │       ├── dashboard/
│   │   │   │   │   │       ├── publications/
│   │   │   │   │   │       ├── researchers/
│   │   │   │   │   │       └── settings/
│   │   │   │   │   ├── layout.tsx    # Root layout with i18n provider
│   │   │   │   │   └── not-found.tsx # 404 page
│   │   │   │   ├── api/
│   │   │   │   │   ├── revalidate/   # ISR revalidation webhook
│   │   │   │   │   ├── search/      # Search API route
│   │   │   │   │   ├── contact/     # Contact form submission
│   │   │   │   │   └── chatbot/     # AI research assistant
│   │   │   │   └── favicon.ico
│   │   │   ├── components/
│   │   │   │   ├── ui/              # shadcn/ui primitives
│   │   │   │   ├── layout/          # Header, Footer, Navigation, Sidebar
│   │   │   │   ├── research/        # Research group cards, project cards
│   │   │   │   ├── publications/    # PublicationCard, CitationTools, BibTeX export
│   │   │   │   ├── people/          # ResearcherCard, ProfileHeader
│   │   │   │   ├── equipment/       # EquipmentCard, SpecTable
│   │   │   │   ├── home/            # Hero, StatsBar, FeaturedProjects
│   │   │   │   ├── forms/           # ContactForm, ApplicationForm
│   │   │   │   └── shared/          # SEO, Analytics providers, ThemeProvider
│   │   │   ├── lib/
│   │   │   │   ├── api/             # Strapi API client, external API clients
│   │   │   │   ├── db/              # PostgreSQL direct queries (pgvector)
│   │   │   │   ├── utils.ts         # cn() helper, formatDate, etc.
│   │   │   │   └── constants.ts     # Site-wide constants
│   │   │   ├── hooks/               # Custom React hooks
│   │   │   ├── types/               # TypeScript type definitions
│   │   │   └── styles/
│   │   │       └── globals.css      # Tailwind v4 + shadcn theme
│   │   ├── public/
│   │   │   ├── images/              # Static images
│   │   │   ├── fonts/               # Self-hosted fonts (Inter, JetBrains Mono)
│   │   │   └── og/                  # Open Graph templates
│   │   ├── messages/                # next-intl translation files
│   │   │   ├── en/                  # English
│   │   │   │   ├── common.json
│   │   │   │   ├── home.json
│   │   │   │   ├── research.json
│   │   │   │   └── ...
│   │   │   └── fr/                  # French
│   │   │       ├── common.json
│   │   │       └── ...
│   │   ├── middleware.ts            # i18n + auth middleware
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   ├── package.json
│   │   └── Dockerfile
│   │
│   └── cms/                         # Strapi 5 backend
│       ├── src/
│       │   ├── api/
│       │   │   ├── researcher/
│       │   │   ├── publication/
│       │   │   ├── project/
│       │   │   ├── equipment/
│       │   │   ├── news/
│       │   │   └── event/
│       │   ├── plugins/
│       │   └── extensions/
│       ├── config/
│       │   ├── database.ts
│       │   ├── server.ts
│       │   ├── admin.ts
│       │   ├── middlewares.ts
│       │   └── plugins.ts
│       ├── public/
│       │   └── uploads/
│       ├── package.json
│       ├── Dockerfile
│       └── .env.example
│
├── packages/
│   └── shared/                      # Shared types and utilities
│       ├── src/
│       │   ├── types/               # Publication, Researcher, etc. types
│       │   ├── validators/          # Zod schemas shared between apps
│       │   └── constants.ts
│       └── package.json
│
├── docker/
│   ├── docker-compose.yml           # Development (Strapi + PostgreSQL + Meilisearch)
│   ├── docker-compose.prod.yml      # Production
│   └── nginx/
│       └── default.conf
│
├── scripts/
│   ├── sync-crossref.ts             # Bulk import from CrossRef
│   ├── sync-orcid.ts               # Sync publications per researcher
│   ├── sync-hal.ts                 # Sync from HAL archive
│   ├── generate-embeddings.ts      # Generate pgvector embeddings
│   └── seed-data.ts                # Seed initial content
│
├── .github/
│   └── workflows/
│       ├── ci.yml                   # Lint, typecheck, test
│       ├── deploy-web.yml           # Deploy Next.js to Vercel
│       └── deploy-cms.yml           # Deploy Strapi to VPS
│
├── turbo.json                       # Turborepo configuration
├── package.json                     # Root workspace
└── pnpm-workspace.yaml              # pnpm workspaces
```

---

## 2. Next.js 15 App Router Architecture

### 2.1 Route Design Strategy

**Principle:** Maximize Server Components. Minimize Client Components. Use ISR for content pages, SSR for search/dynamic content.

```typescript
// app/[locale]/(public)/research/[slug]/page.tsx
// ✅ Server Component — fetch data, render HTML, ISR cache

import { getResearchGroup } from "@/lib/api/research";
import { Metadata } from "next";

// Dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const group = await getResearchGroup(slug, locale);
  return {
    title: `${group.name} — LEEC`,
    description: group.shortDescription,
    openGraph: {
      images: [{ url: group.coverImage?.url ?? "/og/default.jpg" }],
    },
  };
}

// ISR: revalidate every hour, or on-demand via webhook
export const revalidate = 3600;

export default async function ResearchGroupPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const group = await getResearchGroup(slug, locale);

  return (
    <main>
      {/* Hero Section */}
      <ResearchGroupHero group={group} />
      {/* Research areas — Client Component only where interactivity needed */}
      <ResearchAreaExplorer areas={group.researchAreas} />
      {/* Team members — Server Component, just renders */}
      <ResearchGroupMembers members={group.members} />
      {/* Publications — Server Component, fetched from Strapi API */}
      <ResearchGroupPublications
        publications={group.publications}
        locale={locale}
      />
      {/* Equipment — Server Component */}
      <ResearchGroupEquipment equipment={group.equipment} />
    </main>
  );
}
```

### 2.2 Server vs. Client Component Boundary

| Component Type | Server | Client | Rationale |
|---|---|---|---|
| Layout, Header, Footer | ✅ | — | Static shell, no interactivity |
| Homepage Hero | ✅ | — | Animated via CSS only |
| Research Group Cards | ✅ | — | Static content, link navigation |
| Publication List (public) | ✅ | — | ISR-cached, no interactivity needed |
| Publication Search/Filter | — | ✅ | User input, URL state, debounced queries |
| Citation Copier | — | ✅ | `navigator.clipboard` API |
| Contact Form | — | ✅ | Form state, validation, submission |
| Dark Mode Toggle | — | ✅ | `useTheme` hook |
| AI Chatbot | — | ✅ | Streaming response, UI state |
| Admin Dashboard | — | ✅ | Complex interactive dashboard |
| Stats Counter Animation | ✅ | — | `"use client"` only for intersection observer |
| Map / 3D Viewer | — | ✅ | Three.js, Mapbox |

### 2.3 Data Fetching Pattern

```typescript
// lib/api/client.ts — Strapi API client with caching
const API_URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const API_TOKEN = process.env.STRAPI_API_TOKEN;

async function fetchAPI<T>(
  path: string,
  options?: RequestInit & { tags?: string[] }
): Promise<T> {
  const url = new URL(`${API_URL}/api${path}`);
  const response = await fetch(url.toString(), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_TOKEN}`,
    },
    next: {
      revalidate: options?.tags ? undefined : 3600,
      tags: options?.tags,
    },
    ...options,
  });

  if (!response.ok) {
    throw new APIError(response.status, await response.text());
  }

  return response.json();
}

// Specific fetchers
export async function getPublications(params: PublicationQueryParams) {
  const query = buildPublicationQuery(params); // Build Strapi query string
  return fetchAPI<PublicationResponse>(`/publications?${query}`, {
    tags: ["publications"],
  });
}

export async function getResearcher(slug: string, locale: string) {
  return fetchAPI<ResearcherResponse>(
    `/researchers?filters[slug][$eq]=${slug}&locale=${locale}&populate[publications][populate]=*&populate[projects][populate]=*`,
    { tags: [`researcher-${slug}`] }
  );
}
```

### 2.4 On-Demand ISR Revalidation

```typescript
// app/api/revalidate/route.ts
// Called by Strapi webhooks when content changes

import { revalidateTag, revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const authHeader = request.headers.get("x-revalidation-secret");

  if (authHeader !== REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { model, entry } = body;

  // Revalidate based on content type
  switch (model) {
    case "publication":
      revalidateTag("publications");
      revalidatePath(`/${entry.locale}/publications/${entry.slug}`);
      revalidatePath(`/${entry.locale}/publications`);
      break;
    case "researcher":
      revalidateTag(`researcher-${entry.slug}`);
      revalidateTag("researchers");
      revalidatePath(`/${entry.locale}/people/${entry.slug}`);
      break;
    case "news":
      revalidateTag("news");
      revalidatePath(`/${entry.locale}/news/${entry.slug}`);
      break;
    case "research-group":
      revalidateTag("research-groups");
      revalidatePath(`/${entry.locale}/research/${entry.slug}`);
      break;
    default:
      revalidatePath(`/${entry.locale}`);
  }

  return NextResponse.json({ revalidated: true });
}
```

---

## 3. Strapi 5 CMS — Content Architecture

### 3.1 Content Type Schemas

#### Researcher

```typescript
// src/api/researcher/content-types/researcher/schema.json
{
  "kind": "collectionType",
  "collectionName": "researchers",
  "info": {
    "singularName": "researcher",
    "pluralName": "researchers",
    "displayName": "Researcher",
    "description": "Lab researchers, faculty, PhD students"
  },
  "options": {
    "draftAndPublish": true,
    "i18n": {
      "localized": true   // Bio, title, research interests are localized
    }
  },
  "attributes": {
    "firstName": { "type": "string", "required": true },
    "lastName": { "type": "string", "required": true },
    "slug": { "type": "uid", "targetField": "lastName", "required": true },
    "position": {
      "type": "enumeration",
      "enum": [
        "principal_investigator",
        "professor",
        "associate_professor",
        "assistant_professor",
        "postdoctoral_researcher",
        "phd_student",
        "master_student",
        "research_engineer",
        "technician"
      ],
      "required": true
    },
    "photo": { "type": "media", "allowedTypes": ["images"], "multiple": false },
    "email": { "type": "email" },
    "phone": { "type": "string" },
    "office": { "type": "string" },
    "bio": { "type": "richtext" },
    "shortBio": { "type": "text", "maxLength": 300 },
    "researchInterests": { "type": "json" },  // Array of strings/tags
    "orcid": { "type": "string" },
    "googleScholar": { "type": "string" },
    "researchgate": { "type": "string" },
    "linkedin": { "type": "string" },
    "github": { "type": "string" },
    "website": { "type": "string" },
    "joinDate": { "type": "date" },
    "order": { "type": "integer" },  // For manual ordering in listings

    // Relations
    "researchGroups": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::research-group.research-group",
      "inversedBy": "members"
    },
    "publications": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::publication.publication",
      "inversedBy": "authors"
    },
    "projects": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::project.project",
      "inversedBy": "members"
    },
    "supervisedStudents": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::researcher.researcher",
      "mappedBy": "supervisor"
    },
    "supervisor": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::researcher.researcher",
      "inversedBy": "supervisedStudents"
    }
  }
}
```

#### Publication

```typescript
// src/api/publication/content-types/publication/schema.json
{
  "kind": "collectionType",
  "collectionName": "publications",
  "info": {
    "singularName": "publication",
    "pluralName": "publications",
    "displayName": "Publication",
    "description": "Research publications, papers, theses, datasets"
  },
  "options": {
    "draftAndPublish": true,
    "i18n": {
      "localized": true   // Title, abstract are localized
    }
  },
  "attributes": {
    "title": { "type": "string", "required": true },
    "abstract": { "type": "richtext" },
    "plainLanguageSummary": { "type": "text" },  // AI-generated, human-reviewed
    "type": {
      "type": "enumeration",
      "enum": [
        "journal_article",
        "conference_paper",
        "book_chapter",
        "book",
        "technical_report",
        "dataset",
        "thesis_phd",
        "thesis_master",
        "patent",
        "software",
        "preprint"
      ],
      "required": true
    },
    "doi": { "type": "string" },
    "arxivId": { "type": "string" },
    "halId": { "type": "string" },
    "openalexId": { "type": "string" },
    "publicationDate": { "type": "date" },
    "year": { "type": "integer", "required": true },
    "journal": { "type": "string" },
    "conference": { "type": "string" },
    "publisher": { "type": "string" },
    "volume": { "type": "string" },
    "issue": { "type": "string" },
    "pages": { "type": "string" },
    "isbn": { "type": "string" },
    "issn": { "type": "string" },
    "pdf": { "type": "media", "allowedTypes": ["files"], "multiple": false },
    "externalUrl": { "type": "string" },
    "codeUrl": { "type": "string" },
    "datasetUrl": { "type": "string" },
    "keywords": { "type": "json" },  // Array of strings
    "citationCount": { "type": "integer", "default": 0 },
    "altmetricScore": { "type": "float", "default": 0 },
    "source": {
      "type": "enumeration",
      "enum": ["manual", "crossref", "orcid", "hal", "openalex"],
      "default": "manual"
    },
    "lastSyncedAt": { "type": "datetime" },

    // Relations
    "authors": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::researcher.researcher",
      "inversedBy": "publications"
    },
    "authorOrder": { "type": "json" },  // [{researcherId, order}]
    "projects": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::project.project",
      "inversedBy": "publications"
    },
    "researchGroups": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::research-group.research-group",
      "inversedBy": "publications"
    }
  }
}
```

#### Research Group

```typescript
// src/api/research-group/content-types/research-group/schema.json
{
  "kind": "collectionType",
  "collectionName": "research_groups",
  "info": {
    "singularName": "research-group",
    "pluralName": "research-groups",
    "displayName": "Research Group",
    "description": "Research groups within LEEC"
  },
  "options": {
    "draftAndPublish": true,
    "i18n": { "localized": true }
  },
  "attributes": {
    "name": { "type": "string", "required": true },
    "slug": { "type": "uid", "targetField": "name", "required": true },
    "shortDescription": { "type": "text", "maxLength": 300 },
    "description": { "type": "richtext" },
    "coverImage": { "type": "media", "allowedTypes": ["images"], "multiple": false },
    "icon": { "type": "media", "allowedTypes": ["images"], "multiple": false },
    "order": { "type": "integer" },

    // Relations
    "coordinator": {
      "type": "relation",
      "relation": "oneToOne",
      "target": "api::researcher.researcher"
    },
    "members": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::researcher.researcher",
      "mappedBy": "researchGroups"
    },
    "publications": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::publication.publication",
      "mappedBy": "researchGroups"
    },
    "projects": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::project.project",
      "inversedBy": "researchGroups"
    },
    "equipment": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::equipment.equipment",
      "inversedBy": "researchGroups"
    },
    "researchDomains": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::research-domain.research-domain"
    }
  }
}
```

#### Equipment

```typescript
// src/api/equipment/content-types/equipment/schema.json
{
  "kind": "collectionType",
  "collectionName": "equipment",
  "info": {
    "singularName": "equipment",
    "pluralName": "equipment",
    "displayName": "Equipment",
    "description": "Laboratory equipment and instruments"
  },
  "options": {
    "draftAndPublish": true,
    "i18n": { "localized": true }
  },
  "attributes": {
    "name": { "type": "string", "required": true },
    "model": { "type": "string" },
    "manufacturer": { "type": "string" },
    "serialNumber": { "type": "string" },
    "category": {
      "type": "enumeration",
      "enum": [
        "measurement",
        "testing",
        "fabrication",
        "computing",
        "general"
      ]
    },
    "specifications": { "type": "json" },  // Key-value pairs of specs
    "description": { "type": "richtext" },
    "photos": { "type": "media", "allowedTypes": ["images"], "multiple": true },
    "location": { "type": "string" },
    "status": {
      "type": "enumeration",
      "enum": ["operational", "maintenance", "unavailable", "reserved"],
      "default": "operational"
    },
    "acquiredDate": { "type": "date" },
    "fundingSource": { "type": "string" },
    "isPublicTesting": { "type": "boolean", "default": false },
    "bookingUrl": { "type": "string" },

    // Relations
    "researchGroups": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::research-group.research-group",
      "mappedBy": "equipment"
    }
  }
}
```

### 3.2 Strapi Webhook Configuration (ISR)

```typescript
// config/plugins.ts — for Strapi 5 webhooks aren't configured in code
// But we configure the revalidation route in Next.js

// The Strapi admin UI will have webhooks configured as:
// Name: "ISR Revalidation"
// URL: https://leec.ubuea.cm/api/revalidate
// Secret: <shared REVALIDATION_SECRET>
// Events: entry.publish, entry.unpublish, entry.update, entry.delete
```

---

## 4. PostgreSQL Data Model

### 4.1 Core Schema (Beyond Strapi's Internal Tables)

In addition to Strapi's managed tables, we need direct PostgreSQL access for:

1. **pgvector embeddings** for semantic search
2. **Materialized views** for publication metrics
3. **Direct search** with Meilisync or custom full-text

```sql
-- Extension for vector embeddings (AI search)
CREATE EXTENSION IF NOT EXISTS vector;

-- Publication embeddings for semantic search
CREATE TABLE publication_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  publication_id INTEGER NOT NULL REFERENCES strapi_publications.id ON DELETE CASCADE,
  title_embedding vector(1536),      -- text-embedding-3-small
  abstract_embedding vector(1536),
  combined_embedding vector(1536),   -- title + abstract
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_pub_embeddings_combined
  ON publication_embeddings
  USING hnsw (combined_embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 200);

-- Researcher profile embeddings
CREATE TABLE researcher_embeddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  researcher_id INTEGER NOT NULL REFERENCES strapi_researchers.id ON DELETE CASCADE,
  bio_embedding vector(1536),
  interests_embedding vector(1536),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Publication metrics materialized view (refreshed daily)
CREATE MATERIALIZED VIEW publication_metrics AS
SELECT
  p.id,
  p.title,
  p.year,
  p.citation_count,
  p.doi,
  COUNT(DISTINCT pa.researcher_id) as author_count,
  COUNT(DISTINCT pr.project_id) as project_count
FROM strapi_publications p
LEFT JOIN strapi_publications_authors_links pa ON p.id = pa.publication_id
LEFT JOIN strapi_publications_projects_links pr ON p.id = pr.publication_id
GROUP BY p.id;

REFRESH MATERIALIZED VIEW CONCURRENTLY publication_metrics;

-- Full-text search index on publications
ALTER TABLE strapi_publications
ADD COLUMN search_vector tsvector
GENERATED ALWAYS AS (
  to_tsvector('english', coalesce(title, '') || ' ' || coalesce(abstract, ''))
) STORED;

CREATE INDEX idx_publications_search ON strapi_publications USING gin(search_vector);
```

### 4.2 Direct Database Queries from Next.js

```typescript
// lib/db/index.ts
import { Pool } from "@neondatabase/serverless"; // For edge-compatible Postgres

const pool = new Pool({
  connectionString: process.env.DATABASE_DIRECT_URL, // Direct connection to Postgres
});

// Semantic search query
export async function searchPublicationsSemantic(query: string, limit = 20) {
  // 1. Generate embedding for the query
  const embedding = await generateEmbedding(query);

  // 2. Cosine similarity search
  const result = await pool.query(
    `SELECT
       p.id,
       p.title,
       p.year,
       p.citation_count,
       p.doi,
       1 - (pe.combined_embedding <=> $1::vector) AS similarity
     FROM publication_embeddings pe
     JOIN strapi_publications p ON pe.publication_id = p.id
     WHERE p.published_at IS NOT NULL
     ORDER BY pe.combined_embedding <=> $1::vector
     LIMIT $2`,
    [embedding, limit]
  );

  return result.rows;
}

// Hybrid search (keyword + semantic)
export async function searchPublicationsHybrid(
  query: string,
  filters?: SearchFilters
) {
  const embedding = await generateEmbedding(query);

  return pool.query(
    `SELECT
       p.id,
       p.title,
       p.year,
       p.citation_count,
       ts_rank(p.search_vector, plainto_tsquery('english', $1)) AS text_rank,
       1 - (pe.combined_embedding <=> $2::vector) AS semantic_rank,
       (0.3 * ts_rank(p.search_vector, plainto_tsquery('english', $1)) +
        0.7 * (1 - (pe.combined_embedding <=> $2::vector))) AS combined_rank
     FROM publication_embeddings pe
     JOIN strapi_publications p ON pe.publication_id = p.id
     WHERE
       p.published_at IS NOT NULL
       AND ($3::int IS NULL OR p.year = $3)
       AND ($4::text[] IS NULL OR p.keywords && $4)
     ORDER BY combined_rank DESC
     LIMIT 20`,
    [query, embedding, filters?.year, filters?.keywords]
  );
}
```

---

## 5. shadcn/ui Design System Implementation

### 5.1 Theme Setup (Tailwind CSS v4 + CSS Variables)

```css
/* src/styles/globals.css */
@import "tailwindcss";

@plugin "@tailwindcss/typography";  /* For rich text (prose) styling */
@plugin "tailwindcss-animate";       /* For shadcn animations */

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* Font families */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-serif: "Merriweather", Georgia, serif;
  --font-mono: "JetBrains Mono", monospace;

  /* LEEC brand colors */
  --color-leec-deepblue: #0A1628;
  --color-leec-ocean: #1B3A5C;
  --color-leec-teal: #2E86AB;
  --color-leec-gold: #E8B730;
  --color-leec-paper: #F5F2EB;

  /* shadcn-compatible semantic color tokens */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius: var(--radius);
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 197 68% 42%;           /* LEEC Teal */
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 44 79% 55%;             /* LEEC Gold */
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 197 68% 42%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;    /* Near black */
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 197 68% 55%;           /* Lighter teal for dark mode */
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 44 79% 50%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 197 68% 55%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground font-sans antialiased;
  }

  /* Typography prose for rich text content */
  .prose-academic {
    @apply prose prose-slate max-w-none
      prose-headings:font-serif prose-headings:font-semibold
      prose-a:text-primary prose-a:no-underline hover:prose-a:underline
      prose-code:font-mono prose-code:text-sm
      prose-pre:bg-muted prose-pre:text-foreground;
  }
}
```

### 5.2 shadcn/ui Components to Initialize

```bash
# Core UI primitives
npx shadcn@latest init          # Initialize shadcn/ui with the theme above
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add badge
npx shadcn@latest add avatar
npx shadcn@latest add navigation-menu
npx shadcn@latest add sheet     # Mobile menu
npx shadcn@latest add dropdown-menu
npx shadcn@latest add dialog
npx shadcn@latest add popover  # Citation popover
npx shadcn@latest add table
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add select
npx shadcn@latest add checkbox
npx shadcn@latest add toggle
npx shadcn@latest add separator
npx shadcn@latest add skeleton
npx shadcn@latest add toast
npx shadcn@latest add tooltip
npx shadcn@latest add command   # Cmd+K search palette
npx shadcn@latest add tabs
npx shadcn@latest add carousel
npx shadcn@latest add breadcrumb
npx shadcn@latest add pagination
```

### 5.3 Custom Component Architecture

```typescript
// components/publications/PublicationCard.tsx
// Example of a compound publication card

interface PublicationCardProps {
  publication: Publication;
  variant?: "full" | "compact" | "grid";
  showAbstract?: boolean;
}

export function PublicationCard({
  publication,
  variant = "full",
  showAbstract = false,
}: PublicationCardProps) {
  const citation = formatCitation(publication);

  return (
    <Card
      className={cn(
        "group transition-all duration-200",
        "hover:shadow-md hover:border-primary/20"
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          {/* Publication type badge */}
          <Badge variant={getPublicationBadgeVariant(publication.type)}>
            {getPublicationTypeLabel(publication.type)}
          </Badge>
          {/* Year */}
          <span className="text-sm text-muted-foreground font-mono">
            {publication.year}
          </span>
        </div>

        <CardTitle className="font-serif text-lg leading-snug mt-2">
          <Link
            href={`/publications/${publication.slug}`}
            className="hover:text-primary transition-colors"
          >
            {publication.title}
          </Link>
        </CardTitle>

        {/* Authors */}
        <CardDescription className="text-sm mt-1">
          {publication.authors
            .map((a) => a.name)
            .join(", ")}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Venue */}
        <p className="text-sm italic text-muted-foreground">
          {publication.journal ?? publication.conference}
          {publication.volume && `, ${publication.volume}`}
          {publication.pages && `, pp. ${publication.pages}`}
        </p>

        {/* Abstract toggle */}
        {showAbstract && publication.abstract && (
          <ExpandableText className="mt-3 text-sm text-muted-foreground">
            {publication.abstract}
          </ExpandableText>
        )}
      </CardContent>

      <CardFooter className="flex items-center gap-2 pt-0">
        {publication.doi && (
          <Button variant="outline" size="sm" asChild>
            <Link
              href={`https://doi.org/${publication.doi}`}
              target="_blank"
            >
              DOI
            </Link>
          </Button>
        )}
        {publication.pdf?.url && (
          <Button variant="outline" size="sm" asChild>
            <Link href={publication.pdf.url} target="_blank">
              PDF
            </Link>
          </Button>
        )}
        {/* Citation button */}
        <CitationPopover publication={publication} />
        {/* Metrics */}
        {publication.citationCount > 0 && (
          <span className="text-xs text-muted-foreground ml-auto">
            Cited {publication.citationCount} times
          </span>
        )}
      </CardFooter>
    </Card>
  );
}
```

### 5.4 Dark Mode Provider

```typescript
// components/shared/ThemeProvider.tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

// Usage in root layout:
// <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
//   {children}
// </ThemeProvider>
```

---

## 6. Integration Layer

### 6.1 Strapi API Client (Next.js Side)

```typescript
// lib/api/strapi.ts
// Typed API client for Strapi 5

import qs from "qs";

type StrapiConfig = {
  url: string;
  token: string;
};

let config: StrapiConfig = {
  url: process.env.STRAPI_URL ?? "http://localhost:1337",
  token: process.env.STRAPI_API_TOKEN ?? "",
};

export function configureStrapi(cfg: Partial<StrapiConfig>) {
  config = { ...config, ...cfg };
}

type QueryParams = {
  populate?: string | string[];
  filters?: Record<string, unknown>;
  sort?: string[];
  pagination?: { page?: number; pageSize?: number };
  fields?: string[];
  locale?: string;
  status?: "published" | "draft";
};

async function fetchStrapi<T>(
  path: string,
  query?: QueryParams,
  fetchOptions?: RequestInit & { tags?: string[] }
): Promise<T> {
  const queryString = query ? qs.stringify(query, { encodeValuesOnly: true }) : "";
  const url = `${config.url}/api${path}${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.token}`,
    },
    next: {
      revalidate: fetchOptions?.tags ? undefined : 3600,
      tags: fetchOptions?.tags,
    },
    ...fetchOptions,
  });

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// ---- Typed API Functions ----

export async function getPublications(params: {
  locale: string;
  page?: number;
  pageSize?: number;
  sort?: string;
  year?: number;
  type?: string;
  researchGroup?: string;
  search?: string;
}) {
  const query: QueryParams = {
    populate: ["authors.photo", "pdf", "researchGroups"],
    sort: [params.sort ?? "year:desc"],
    pagination: { page: params.page ?? 1, pageSize: params.pageSize ?? 12 },
    locale: params.locale,
    status: "published",
    filters: {} as Record<string, unknown>,
  };

  if (params.year) query.filters = { ...query.filters, year: { $eq: params.year } };
  if (params.type) query.filters = { ...query.filters, type: { $eq: params.type } };
  if (params.researchGroup) {
    query.filters = {
      ...query.filters,
      researchGroups: { slug: { $eq: params.researchGroup } },
    };
  }
  if (params.search) {
    query.filters = {
      ...query.filters,
      title: { $contains: params.search },
    };
  }

  return fetchStrapi<StrapiCollectionResponse<Publication>>(
    "/publications",
    query,
    { tags: ["publications"] }
  );
}

export async function getResearcher(slug: string, locale: string) {
  return fetchStrapi<StrapiItemResponse<Researcher>>(
    "/researchers",
    {
      populate: [
        "photo",
        "publications.authors.photo",
        "publications.pdf",
        "projects",
        "researchGroups",
        "supervisedStudents.photo",
      ],
      filters: { slug: { $eq: slug } },
      locale,
      status: "published",
    },
    { tags: [`researcher-${slug}`] }
  );
}

export async function getResearchGroups(locale: string) {
  return fetchStrapi<StrapiCollectionResponse<ResearchGroup>>(
    "/research-groups",
    {
      populate: ["coverImage", "coordinator.photo", "members.photo"],
      sort: ["order:asc"],
      locale,
      status: "published",
    },
    { tags: ["research-groups"] }
  );
}

export async function getEquipment(locale: string) {
  return fetchStrapi<StrapiCollectionResponse<Equipment>>(
    "/equipment",
    {
      populate: ["photos", "researchGroups"],
      sort: ["name:asc"],
      locale,
      status: "published",
    },
    { tags: ["equipment"] }
  );
}
```

### 6.2 External API Sync Scripts

```typescript
// scripts/sync-crossref.ts
// Run as a cron job or GitHub Action to bulk-import publications

import { fetchFromCrossref } from "../lib/api/external/crossref";
import { upsertPublication } from "../lib/api/strapi-admin";

interface SyncConfig {
  emails: string[];  // LEEC researchers' emails
  orcids: string[];
}

export async function syncPublicationsFromCrossref(config: SyncConfig) {
  for (const email of config.emails) {
    const works = await fetchFromCrossref(`/works?filter=email:${email}`);

    for (const work of works.message.items) {
      const publication = mapCrossrefToPublication(work);

      // Upsert: match by DOI, create if not exists, update if exists
      await upsertPublication(publication, { matchBy: "doi" });
    }
  }
}

// scripts/sync-orcid.ts
import { fetchFromOrcid } from "../lib/api/external/orcid";

export async function syncPublicationsFromOrcid(orcidIds: string[]) {
  for (const orcid of orcidIds) {
    const works = await fetchFromOrcid(`/${orcid}/works`);

    for (const work of works.group) {
      const publication = mapOrcidToPublication(work);
      await upsertPublication(publication, { matchBy: "doi" });
    }
  }
}

// scripts/generate-embeddings.ts
// Called after publication sync to update pgvector embeddings

import { openai } from "@ai-sdk/openai";
import { embed } from "ai";
import { pool } from "../lib/db";

export async function generateAllEmbeddings() {
  const publications = await pool.query(
    `SELECT id, title, COALESCE(abstract, '') as abstract
     FROM strapi_publications
     WHERE published_at IS NOT NULL`
  );

  for (const pub of publications.rows) {
    const text = `${pub.title}\n\n${pub.abstract}`;
    const { embedding } = await embed({
      model: openai.embedding("text-embedding-3-small"),
      value: text,
    });

    await pool.query(
      `INSERT INTO publication_embeddings (publication_id, combined_embedding)
       VALUES ($1, $2::vector)
       ON CONFLICT (publication_id)
       DO UPDATE SET combined_embedding = $2::vector, updated_at = NOW()`,
      [pub.id, JSON.stringify(embedding)]
    );
  }
}
```

---

## 7. ISR & Caching Strategy

### 7.1 Cache Layers

```
                  ┌─────────────────────────┐
                  │   Browser Cache          │
                  │   (Cache-Control: public,│
                  │    max-age=0,            │
                  │    must-revalidate)      │
                  └──────────┬──────────────┘
                             │
                  ┌──────────▼──────────────┐
                  │   CDN Cache (Vercel)     │
                  │   • Stale-while-revalidate│
                  │   • Stale-if-error        │
                  │   • Duration: 1 hour      │
                  └──────────┬──────────────┘
                             │
                  ┌──────────▼──────────────┐
                  │   Next.js Data Cache     │
                  │   • fetch() cache        │
                  │   • ISR (1 hour default) │
                  │   • On-demand revalidate │
                  │     via webhook          │
                  └──────────┬──────────────┘
                             │
                  ┌──────────▼──────────────┐
                  │   Strapi API Cache       │
                  │   • Redis (optional)     │
                  │   • Database query cache │
                  └─────────────────────────┘
```

### 7.2 Revalidation Strategy

| Content Type | Initial Cache | Revalidation Trigger | Revalidation Action |
|---|---|---|---|
| Homepage | 1 hour | Any content change | `revalidatePath("/")` |
| Publications List | 1 hour | Publication publish/update | `revalidateTag("publications")` |
| Publication Detail | 1 hour | That publication updates | `revalidatePath("/publications/[slug]")` |
| Researcher Profiles | 1 hour | Researcher profile changes | `revalidateTag("researcher-[slug]")` |
| News / Events | 5 minutes | Content change | `revalidateTag("news")` |
| Equipment Catalog | 6 hours | Equipment update | `revalidateTag("equipment")` |
| Search Results | No cache | — | SSR on every request |

### 7.3 Time-based Revalidation Defaults

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Revalidate all pages by default after 1 hour
    // Individual pages can override with `export const revalidate`
    staleTimes: {
      dynamic: 30,   // 30 seconds for dynamic data
      static: 3600,  // 1 hour for static ISR pages
    },
  },
  // Image optimization for lab photos
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.strapiapp.com",  // Strapi media
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",  // S3
      },
      {
        protocol: "https",
        hostname: "leec-strapi.ams3.digitaloceanspaces.com",  // DO Spaces
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
```

---

## 8. Internationalization (i18n)

### 8.1 next-intl Configuration

```typescript
// i18n/request.ts
import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";

export const locales = ["en", "fr"] as const;
export const defaultLocale = "en" as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(locales, requested) ? requested : defaultLocale;

  return {
    locale,
    messages: {
      ...(await import(`../messages/${locale}/common.json`)).default,
      ...(await import(`../messages/${locale}/home.json`)).default,
      ...(await import(`../messages/${locale}/research.json`)).default,
      ...(await import(`../messages/${locale}/publications.json`)).default,
    },
  };
});
```

```typescript
// middleware.ts
import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/request";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always", // /en/publications, /fr/publications
});

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

### 8.2 Translation File Structure

```json
// messages/en/common.json
{
  "site": {
    "title": "LEEC — Laboratory of Electrical Engineering and Computing",
    "shortTitle": "LEEC",
    "description": "Advancing African engineering through research, innovation, and international collaboration"
  },
  "nav": {
    "home": "Home",
    "about": "About",
    "research": "Research",
    "people": "People",
    "publications": "Publications",
    "news": "News & Events",
    "equipment": "Equipment",
    "contact": "Contact",
    "participate": "Participate",
    "search": "Search"
  },
  "publications": {
    "title": "Publications",
    "filterByYear": "Filter by year",
    "filterByType": "Filter by type",
    "filterByResearchGroup": "Filter by research group",
    "searchPlaceholder": "Search publications...",
    "cited": "Cited {count} times",
    "exportBibtex": "Export BibTeX",
    "copyCitation": "Copy citation",
    "noResults": "No publications found matching your criteria."
  },
  "research": {
    "title": "Research Areas",
    "groups": "Research Groups",
    "projects": "Projects",
    "equipment": "Equipment & Facilities",
    "viewAll": "View all research groups"
  },
  "common": {
    "readMore": "Read more",
    "viewAll": "View all",
    "learnMore": "Learn more",
    "close": "Close",
    "loading": "Loading...",
    "error": "Something went wrong. Please try again.",
    "backToHome": "Back to home"
  }
}
```

```json
// messages/fr/common.json
{
  "site": {
    "title": "LEEC — Laboratoire de Génie Électrique et d'Informatique",
    "shortTitle": "LEEC",
    "description": "Faire progresser l'ingénierie africaine par la recherche, l'innovation et la collaboration internationale"
  },
  "nav": {
    "home": "Accueil",
    "about": "À propos",
    "research": "Recherche",
    "people": "Personnes",
    "publications": "Publications",
    "news": "Actualités",
    "equipment": "Équipement",
    "contact": "Contact",
    "participate": "Participer",
    "search": "Rechercher"
  }
  // ... same structure, French translations
}
```

### 8.3 Usage in Components

```typescript
// Using translations in Server Components
import { getTranslations } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <div>
      <h1>{t("hero.title")}</h1>
      <p>{t("hero.subtitle")}</p>
    </div>
  );
}

// Using translations in Client Components
"use client";
import { useTranslations } from "next-intl";

export function PublicationFilter() {
  const t = useTranslations("publications");

  return (
    <div>
      <label>{t("filterByYear")}</label>
      {/* ... */}
    </div>
  );
}
```

---

## 9. Search Architecture

### 9.1 Multi-Layer Search Strategy

```
                    ┌──────────────────────────────┐
                    │     Search Entry Points       │
                    │  • Global nav search (Cmd+K)  │
                    │  • Publication search page    │
                    │  • People directory filter    │
                    │  • Equipment search           │
                    └──────────────┬───────────────┘
                                   │
                    ┌──────────────▼───────────────┐
                    │    Search Orchestrator         │
                    │  • Route to correct index      │
                    │  • Apply permissions filter    │
                    │  • Merge results               │
                    └──────────────┬───────────────┘
                                   │
          ┌────────────────────────┼────────────────────────┐
          │                        │                        │
          ▼                        ▼                        ▼
┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐
│  Meilisearch      │   │  pgvector         │   │  Strapi REST      │
│  • Full-text      │   │  • Semantic       │   │  API              │
│  • Typo-tolerant  │   │  • "Similar to    │   │  • Filters        │
│  • Faceted        │   │    this paper"    │   │  • Exact matches   │
│  • Instant        │   │  • AI chatbot     │   │  • Admin search    │
│  • Publications   │   │    retrieval      │   │                   │
│  • People         │   │  • Publications   │   │                   │
│  • Equipment      │   │                   │   │                   │
└──────────────────┘   └──────────────────┘   └──────────────────┘
```

### 9.2 Meilisearch Configuration

```typescript
// lib/search/meilisearch.ts
import { MeiliSearch } from "meilisearch";

const client = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST ?? "http://localhost:7700",
  apiKey: process.env.MEILISEARCH_API_KEY,
});

// Index definitions
export const searchIndexes = {
  publications: client.index("publications"),
  researchers: client.index("researchers"),
  equipment: client.index("equipment"),
  news: client.index("news"),
} as const;

// Publication index settings
await searchIndexes.publications.updateSettings({
  searchableAttributes: [
    "title",
    "abstract",
    "authors.name",
    "keywords",
    "journal",
  ],
  filterableAttributes: ["year", "type", "researchGroupId", "authorIds"],
  sortableAttributes: ["year", "citationCount"],
  rankingRules: [
    "words",
    "typo",
    "proximity",
    "attribute",
    "sort",
    "exactness",
  ],
  typoTolerance: {
    minWordSizeForTypos: { oneTypo: 5, twoTypos: 9 },
  },
});

// Sync script: runs after Strapi webhook or on schedule
export async function syncPublicationToMeilisearch(
  publication: Publication
) {
  await searchIndexes.publications.addDocuments([
    {
      id: publication.id,
      title: publication.title,
      abstract: publication.abstract,
      authors: publication.authors?.map((a) => ({
        id: a.id,
        name: `${a.firstName} ${a.lastName}`,
      })),
      year: publication.year,
      type: publication.type,
      doi: publication.doi,
      citationCount: publication.citationCount,
      researchGroupId: publication.researchGroups?.map((g) => g.id),
      keywords: publication.keywords,
      slug: publication.slug,
      locale: publication.locale,
    },
  ]);
}
```

### 9.3 Search API Route

```typescript
// app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { searchIndexes } from "@/lib/search/meilisearch";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  const index = searchParams.get("index") ?? "publications";
  const locale = searchParams.get("locale") ?? "en";
  const page = parseInt(searchParams.get("page") ?? "1");
  const year = searchParams.get("year");
  const type = searchParams.get("type");

  if (!query || query.length < 2) {
    return NextResponse.json({ hits: [] });
  }

  const searchIndex = searchIndexes[index as keyof typeof searchIndexes];
  if (!searchIndex) {
    return NextResponse.json({ error: "Invalid index" }, { status: 400 });
  }

  const filters = [`locale = ${locale}`];
  if (year) filters.push(`year = ${year}`);
  if (type) filters.push(`type = ${type}`);

  const results = await searchIndex.search(query, {
    limit: 20,
    offset: (page - 1) * 20,
    filter: filters.join(" AND "),
    attributesToHighlight: ["title", "abstract"],
  });

  return NextResponse.json(results);
}
```

### 9.4 Cmd+K Search Palette

```typescript
// components/search/SearchPalette.tsx
"use client";

import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useDebouncedCallback } from "use-debounce";

export function SearchPalette({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const router = useRouter();
  const t = useTranslations("common");

  // Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const search = useDebouncedCallback(async (value: string) => {
    if (value.length < 2) {
      setResults([]);
      return;
    }
    const res = await fetch(
      `/api/search?q=${encodeURIComponent(value)}&locale=${locale}`
    );
    const data = await res.json();
    setResults(data.hits);
  }, 200);

  const onSelect = (result: SearchResult) => {
    setOpen(false);
    router.push(`/${locale}/${result.url}`);
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label={t("search")}
      className="..."
    >
      <Command.Input
        value={query}
        onValueChange={(v) => {
          setQuery(v);
          search(v);
        }}
        placeholder={t("searchPlaceholder")}
      />
      <Command.List>
        {results.map((result) => (
          <Command.Item
            key={`${result.index}-${result.id}`}
            value={result.title}
            onSelect={() => onSelect(result)}
          >
            <div className="flex items-center gap-2">
              <SearchIcon />
              <div>
                <p>{result.title}</p>
                <span className="text-xs text-muted-foreground">
                  {result.type}
                </span>
              </div>
            </div>
          </Command.Item>
        ))}
      </Command.List>
    </Command.Dialog>
  );
}
```

---

## 10. AI Research Assistant — RAG Pipeline

### 10.1 Architecture

```
User Question
    │
    ▼
┌─────────────────┐
│  API Route       │
│  /api/chatbot    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌──────────────────┐
│  Query           │────▶│  pgvector Search │
│  Embedding       │     │  (cosine sim)    │
│  (text-embedding │     │  Top-K = 10      │
│   3-small)       │     └────────┬─────────┘
└─────────────────┘              │
                                 │  Context chunks
                                 ▼
┌────────────────────────────────────┐
│  LLM Prompt Construction           │
│  • System: "You are a research     │
│    assistant for LEEC lab..."      │
│  • Context: Top 10 relevant pubs   │
│  • Question: User's query          │
└──────────────┬─────────────────────┘
               │
               ▼
┌─────────────────┐
│  LLM Response    │
│  (GPT-4o-mini   │
│   or Claude     │
│   Haiku)        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Streaming       │
│  Response to     │
│  Chat UI         │
└─────────────────┘
```

### 10.2 Implementation

```typescript
// app/api/chatbot/route.ts
import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";
import { searchPublicationsSemantic } from "@/lib/db";
import { getTranslations } from "next-intl/server";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, locale } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
    system: `You are a helpful research assistant for the LEEC laboratory (Laboratory of Electrical Engineering and Computing) at the University of Buea, Cameroon.

Your role is to help visitors understand the lab's research by answering questions based on the lab's publications and researcher profiles.

Guidelines:
- Answer in ${locale === "fr" ? "French" : "English"}.
- Be concise but informative (2-4 paragraphs usually).
- Always cite specific publications or researchers when possible.
- If you don't know something, say so — don't make up information.
- Use plain language for general visitors, but can go technical for specialist questions.
- Format responses with markdown for readability.`,
    tools: {
      searchPublications: tool({
        description: "Search LEEC publications by semantic relevance to a query",
        parameters: z.object({
          query: z.string().describe("The search query"),
          limit: z.number().default(5),
        }),
        execute: async ({ query, limit }) => {
          return searchPublicationsSemantic(query, limit);
        },
      }),
      getResearcherInfo: tool({
        description: "Get detailed information about a LEEC researcher",
        parameters: z.object({
          name: z.string().describe("The researcher's full or partial name"),
        }),
        execute: async ({ name }) => {
          // Query Strapi for researcher info
          const response = await fetch(
            `${process.env.STRAPI_URL}/api/researchers?filters[$or][0][firstName][$containsi]=${name}&filters[$or][1][lastName][$containsi]=${name}&populate=publications,projects,researchGroups`,
            { headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` } }
          );
          return response.json();
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
```

### 10.3 Chat UI Component

```typescript
// components/chat/ChatButton.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import { ChatPanel } from "./ChatPanel";

export function ChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ChatPanel onClose={() => setOpen(false)} />}
      <Button
        size="icon"
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg z-50"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <MessageCircle />}
      </Button>
    </>
  );
}
```

```typescript
// components/chat/ChatPanel.tsx
"use client";

import { useChat } from "ai/react";
import { useLocale } from "next-intl";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ChatPanel({ onClose }: { onClose: () => void }) {
  const locale = useLocale();
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chatbot",
      body: { locale },
    });

  return (
    <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-background border rounded-xl shadow-2xl z-50 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Ask LEEC</h3>
          <p className="text-xs text-muted-foreground">
            AI Research Assistant
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`mb-4 ${
              m.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block rounded-lg px-4 py-2 max-w-[80%] ${
                m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <div className="prose prose-sm max-w-none">
                {m.content}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-muted-foreground text-sm animate-pulse">
            Thinking...
          </div>
        )}
      </ScrollArea>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask about our research..."
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading}>
          Send
        </Button>
      </form>

      {/* Disclaimer */}
      <p className="text-[10px] text-muted-foreground px-4 pb-2">
        AI-generated — verify facts with original publications
      </p>
    </div>
  );
}
```

---

## 11. Authentication & Authorization

### 11.1 NextAuth.js v5 Configuration

```typescript
// auth.ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { pool } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // Restrict to specific domains (optional)
      // allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await pool.query(
          `SELECT * FROM admin_users WHERE email = $1 AND role = 'admin'`,
          [credentials.email]
        );
        if (!user.rows.length) return null;

        const valid = await bcrypt.compare(
          credentials.password as string,
          user.rows[0].password_hash
        );
        if (!valid) return null;

        return {
          id: user.rows[0].id.toString(),
          email: user.rows[0].email,
          name: user.rows[0].name,
          role: user.rows[0].role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
});
```

### 11.2 Role-Based Middleware

```typescript
// middleware.ts (extended)
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { locales, defaultLocale } from "./i18n/request";

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

// Admin routes that require authentication
const adminRoutes = ["/admin", "/api/admin"];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if accessing admin routes
  if (adminRoutes.some((route) => pathname.includes(route))) {
    const session = await auth();
    if (!session) {
      const loginUrl = new URL("/admin/login", req.url);
      return Response.redirect(loginUrl);
    }

    // Role check for specific admin routes
    const userRole = (session.user as any)?.role;
    if (pathname.includes("/admin/settings") && userRole !== "superadmin") {
      return new Response("Forbidden", { status: 403 });
    }
  }

  // Apply i18n middleware for non-admin routes
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

### 11.3 Role Definitions

| Role | Permissions |
|---|---|
| **superadmin** | Full system access, user management, settings |
| **admin** | CRUD all content, publish, manage media |
| **editor** | CRUD content, cannot publish, cannot manage users |
| **researcher** | Edit own profile, view analytics |
| **viewer** | Read-only (default for public) |

---

## 12. Deployment Architecture

### 12.1 Development (Docker Compose)

```yaml
# docker/docker-compose.yml
services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: leec
      POSTGRES_USER: leec
      POSTGRES_PASSWORD: leec_dev_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init-scripts:/docker-entrypoint-initdb.d  # pgvector extension
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U leec"]
      interval: 5s
      timeout: 5s
      retries: 5

  strapi:
    build:
      context: ../apps/cms
      dockerfile: Dockerfile.dev
    ports:
      - "1337:1337"
    environment:
      DATABASE_CLIENT: postgres
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_NAME: leec
      DATABASE_USERNAME: leec
      DATABASE_PASSWORD: leec_dev_password
      NODE_ENV: development
    volumes:
      - ../apps/cms:/app
      - /app/node_modules
    depends_on:
      postgres:
        condition: service_healthy

  meilisearch:
    image: getmeili/meilisearch:v1.10
    ports:
      - "7700:7700"
    environment:
      MEILI_ENV: development
      MEILI_MASTER_KEY: dev_meili_master_key
    volumes:
      - meili_data:/meili_data

  # Optional: pgvector setup runs as init script
  # init-db:
  #   image: postgres:16-alpine
  #   ... runs migration scripts

volumes:
  postgres_data:
  meili_data:
```

### 12.2 Production Architecture

```
                           ┌──────────────────────────┐
                           │       Cloudflare          │
                           │   • DNS (leec.ubuea.cm)  │
                           │   • CDN (caching)         │
                           │   • DDoS protection       │
                           └────────────┬─────────────┘
                                        │
                           ┌────────────▼─────────────┐
                           │       Vercel              │
                           │   • Next.js 15 (Edge)     │
                           │   • ISR at edge           │
                           │   • Serverless functions   │
                           │   • Image optimization    │
                           └──────────────────────────┘
                                        │
              ┌─────────────────────────┼────────────────────────┐
              │                         │                        │
              ▼                         ▼                        ▼
   ┌──────────────────┐    ┌──────────────────┐    ┌──────────────────┐
   │   DigitalOcean    │    │   Supabase        │    │   Meilisearch    │
   │   App Platform    │    │   Managed         │    │   Cloud (or      │
   │   • Strapi 5      │    │   PostgreSQL      │    │   self-hosted)   │
   │   • Docker        │    │   • pgvector      │    │   • Search       │
   │   • Auto-scaling  │    │   • Backups       │    │     indexes      │
   └──────────────────┘    └──────────────────┘    └──────────────────┘
                                        │
                              ┌─────────▼─────────┐
                              │   Cloudflare R2    │
                              │   • Media files    │
                              │   • PDFs           │
                              │   • Backups        │
                              └───────────────────┘
```

### 12.3 CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint-and-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: "pnpm"
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm typecheck

  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: pgvector/pgvector:pg16
        env:
          POSTGRES_DB: leec_test
          POSTGRES_USER: leec
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: "pnpm"
      - run: pnpm install
      - run: pnpm --filter web test
      - run: pnpm --filter cms test
```

```yaml
# .github/workflows/deploy-web.yml
name: Deploy Frontend

on:
  push:
    branches: [main]
    paths:
      - "apps/web/**"
      - "packages/**"

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
      - run: pnpm install
      - run: pnpm --filter web build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: "--prod"
```

```yaml
# .github/workflows/deploy-cms.yml
name: Deploy CMS

on:
  push:
    branches: [main]
    paths:
      - "apps/cms/**"

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build and push Docker image
        run: |
          docker build -t ghcr.io/leec/strapi:latest ./apps/cms
          docker push ghcr.io/leec/strapi:latest
      - name: Deploy to DigitalOcean
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.DO_HOST }}
          username: ${{ secrets.DO_USER }}
          key: ${{ secrets.DO_SSH_KEY }}
          script: |
            cd /opt/leec
            docker compose pull strapi
            docker compose up -d strapi
```

---

## 13. Complete File Tree (Proposed)

```
leec-ubuea/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── deploy-web.yml
│       └── deploy-cms.yml
│
├── apps/
│   ├── web/                           # Next.js 15 Frontend (~80 files)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── [locale]/
│   │   │   │   │   ├── (public)/
│   │   │   │   │   │   ├── page.tsx                       # Homepage
│   │   │   │   │   │   ├── about/
│   │   │   │   │   │   │   ├── page.tsx                   # About LEEC
│   │   │   │   │   │   │   ├── partnership/
│   │   │   │   │   │   │   │   └── page.tsx               # INSA Lyon partnership
│   │   │   │   │   │   │   └── governance/
│   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   ├── research/
│   │   │   │   │   │   │   ├── page.tsx                   # Research overview
│   │   │   │   │   │   │   ├── [slug]/
│   │   │   │   │   │   │   │   └── page.tsx               # Research group detail
│   │   │   │   │   │   │   └── projects/
│   │   │   │   │   │   │       ├── page.tsx               # Projects listing
│   │   │   │   │   │   │       └── [slug]/
│   │   │   │   │   │   │           └── page.tsx           # Project detail
│   │   │   │   │   │   ├── people/
│   │   │   │   │   │   │   ├── page.tsx                   # People directory
│   │   │   │   │   │   │   └── [slug]/
│   │   │   │   │   │   │       └── page.tsx               # Researcher profile
│   │   │   │   │   │   ├── publications/
│   │   │   │   │   │   │   ├── page.tsx                   # Publication listing
│   │   │   │   │   │   │   └── [slug]/
│   │   │   │   │   │   │       └── page.tsx               # Publication detail
│   │   │   │   │   │   ├── equipment/
│   │   │   │   │   │   │   ├── page.tsx                   # Equipment catalog
│   │   │   │   │   │   │   └── [slug]/
│   │   │   │   │   │   │       └── page.tsx               # Equipment detail
│   │   │   │   │   │   ├── news/
│   │   │   │   │   │   │   ├── page.tsx                   # News listing
│   │   │   │   │   │   │   └── [slug]/
│   │   │   │   │   │   │       └── page.tsx               # News article
│   │   │   │   │   │   ├── events/
│   │   │   │   │   │   │   ├── page.tsx                   # Events calendar
│   │   │   │   │   │   │   └── [slug]/
│   │   │   │   │   │   │       └── page.tsx               # Event detail
│   │   │   │   │   │   ├── innovation/
│   │   │   │   │   │   │   ├── page.tsx                   # Technology transfer
│   │   │   │   │   │   │   └── spin-offs/
│   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   ├── contact/
│   │   │   │   │   │   │   └── page.tsx                   # Contact form
│   │   │   │   │   │   ├── participate/
│   │   │   │   │   │   │   ├── page.tsx                   # Join / Partner / Donate
│   │   │   │   │   │   │   └── donate/
│   │   │   │   │   │   │       └── page.tsx
│   │   │   │   │   │   └── gallery/
│   │   │   │   │   │       └── page.tsx                   # Image/Video gallery
│   │   │   │   │   ├── (admin)/
│   │   │   │   │   │   └── admin/
│   │   │   │   │   │       ├── login/
│   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │       ├── page.tsx                   # Admin dashboard
│   │   │   │   │   │       ├── publications/
│   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │       ├── researchers/
│   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │       └── settings/
│   │   │   │   │   │           └── page.tsx
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   ├── not-found.tsx
│   │   │   │   │   └── error.tsx
│   │   │   │   ├── api/
│   │   │   │   │   ├── auth/
│   │   │   │   │   │   └── [...nextauth]/
│   │   │   │   │   │       └── route.ts
│   │   │   │   │   ├── revalidate/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   ├── search/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   ├── contact/
│   │   │   │   │   │   └── route.ts
│   │   │   │   │   └── chatbot/
│   │   │   │   │       └── route.ts
│   │   │   │   └── robots.ts
│   │   │   │
│   │   │   ├── components/
│   │   │   │   ├── ui/               # shadcn/ui primitives (auto-generated)
│   │   │   │   │   ├── button.tsx
│   │   │   │   │   ├── card.tsx
│   │   │   │   │   ├── badge.tsx
│   │   │   │   │   ├── avatar.tsx
│   │   │   │   │   ├── dialog.tsx
│   │   │   │   │   ├── dropdown-menu.tsx
│   │   │   │   │   ├── form.tsx
│   │   │   │   │   ├── input.tsx
│   │   │   │   │   ├── navigation-menu.tsx
│   │   │   │   │   ├── sheet.tsx
│   │   │   │   │   ├── table.tsx
│   │   │   │   │   ├── tabs.tsx
│   │   │   │   │   ├── toast.tsx
│   │   │   │   │   └── tooltip.tsx
│   │   │   │   │
│   │   │   │   ├── layout/
│   │   │   │   │   ├── header.tsx
│   │   │   │   │   ├── footer.tsx
│   │   │   │   │   ├── mobile-nav.tsx
│   │   │   │   │   └── theme-toggle.tsx
│   │   │   │   │
│   │   │   │   ├── home/
│   │   │   │   │   ├── hero.tsx
│   │   │   │   │   ├── mission-statement.tsx
│   │   │   │   │   ├── stats-bar.tsx
│   │   │   │   │   ├── research-areas-grid.tsx
│   │   │   │   │   ├── featured-publications.tsx
│   │   │   │   │   ├── featured-projects.tsx
│   │   │   │   │   ├── equipment-showcase.tsx
│   │   │   │   │   ├── partner-carousel.tsx
│   │   │   │   │   ├── latest-news.tsx
│   │   │   │   │   ├── events-preview.tsx
│   │   │   │   │   ├── testimonials-carousel.tsx
│   │   │   │   │   └── join-cta.tsx
│   │   │   │   │
│   │   │   │   ├── research/
│   │   │   │   │   ├── research-group-card.tsx
│   │   │   │   │   ├── research-group-hero.tsx
│   │   │   │   │   ├── research-area-explorer.tsx
│   │   │   │   │   ├── research-group-members.tsx
│   │   │   │   │   └── research-domain-tag.tsx
│   │   │   │   │
│   │   │   │   ├── publications/
│   │   │   │   │   ├── publication-card.tsx
│   │   │   │   │   ├── publication-list.tsx
│   │   │   │   │   ├── publication-filters.tsx
│   │   │   │   │   ├── citation-popover.tsx
│   │   │   │   │   ├── bibtex-export.tsx
│   │   │   │   │   ├── publication-metrics.tsx
│   │   │   │   │   └── related-publications.tsx
│   │   │   │   │
│   │   │   │   ├── people/
│   │   │   │   │   ├── researcher-card.tsx
│   │   │   │   │   ├── researcher-profile-header.tsx
│   │   │   │   │   ├── researcher-publications.tsx
│   │   │   │   │   ├── researcher-projects.tsx
│   │   │   │   │   ├── researcher-supervisions.tsx
│   │   │   │   │   └── researcher-contact.tsx
│   │   │   │   │
│   │   │   │   ├── equipment/
│   │   │   │   │   ├── equipment-card.tsx
│   │   │   │   │   ├── equipment-detail.tsx
│   │   │   │   │   ├── equipment-spec-table.tsx
│   │   │   │   │   └── equipment-gallery.tsx
│   │   │   │   │
│   │   │   │   ├── forms/
│   │   │   │   │   ├── contact-form.tsx
│   │   │   │   │   ├── application-form.tsx
│   │   │   │   │   └── newsletter-signup.tsx
│   │   │   │   │
│   │   │   │   ├── search/
│   │   │   │   │   ├── search-palette.tsx     # Cmd+K
│   │   │   │   │   └── search-results.tsx
│   │   │   │   │
│   │   │   │   ├── chat/
│   │   │   │   │   ├── chat-button.tsx
│   │   │   │   │   └── chat-panel.tsx
│   │   │   │   │
│   │   │   │   ├── admin/
│   │   │   │   │   ├── admin-sidebar.tsx
│   │   │   │   │   ├── admin-header.tsx
│   │   │   │   │   ├── publications-table.tsx
│   │   │   │   │   ├── publication-edit-form.tsx
│   │   │   │   │   └── stats-widget.tsx
│   │   │   │   │
│   │   │   │   └── shared/
│   │   │   │       ├── seo.tsx
│   │   │   │       ├── theme-provider.tsx
│   │   │   │       ├── analytics-provider.tsx
│   │   │   │       └── json-ld.tsx
│   │   │   │
│   │   │   ├── lib/
│   │   │   │   ├── api/
│   │   │   │   │   ├── strapi.ts           # Strapi API client
│   │   │   │   │   ├── crossref.ts          # CrossRef API client
│   │   │   │   │   ├── orcid.ts             # ORCID API client
│   │   │   │   │   └── openalex.ts          # OpenAlex API client
│   │   │   │   ├── db/
│   │   │   │   │   ├── index.ts             # PostgreSQL connection + search
│   │   │   │   │   └── migrations/          # SQL migrations
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── use-debounce.ts
│   │   │   │   │   └── use-intersection.ts
│   │   │   │   ├── utils.ts                 # cn(), formatDate(), etc.
│   │   │   │   └── constants.ts
│   │   │   │
│   │   │   ├── hooks/                       # React hooks
│   │   │   │   ├── use-publications.ts
│   │   │   │   └── use-researcher.ts
│   │   │   │
│   │   │   ├── types/
│   │   │   │   ├── publication.ts
│   │   │   │   ├── researcher.ts
│   │   │   │   ├── research-group.ts
│   │   │   │   ├── project.ts
│   │   │   │   ├── equipment.ts
│   │   │   │   ├── news.ts
│   │   │   │   └── strapi.ts               # Strapi response types
│   │   │   │
│   │   │   └── styles/
│   │   │       └── globals.css
│   │   │
│   │   ├── public/
│   │   │   ├── images/
│   │   │   │   ├── logo.svg
│   │   │   │   ├── logo-white.svg
│   │   │   │   ├── og-default.jpg
│   │   │   │   └── favicon.ico
│   │   │   ├── fonts/                      # Self-hosted fonts
│   │   │   └── og/                         # OG image templates
│   │   │
│   │   ├── messages/
│   │   │   ├── en/
│   │   │   │   ├── common.json
│   │   │   │   ├── home.json
│   │   │   │   ├── about.json
│   │   │   │   ├── research.json
│   │   │   │   ├── publications.json
│   │   │   │   ├── people.json
│   │   │   │   ├── equipment.json
│   │   │   │   ├── news.json
│   │   │   │   ├── events.json
│   │   │   │   ├── innovation.json
│   │   │   │   ├── contact.json
│   │   │   │   └── admin.json
│   │   │   └── fr/                         # French translations (same structure)
│   │   │
│   │   ├── tests/
│   │   │   ├── components/
│   │   │   ├── lib/
│   │   │   └── e2e/
│   │   │
│   │   ├── i18n/
│   │   │   └── request.ts
│   │   ├── auth.ts
│   │   ├── middleware.ts
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   ├── vitest.config.ts
│   │   ├── Dockerfile
│   │   ├── Dockerfile.dev
│   │   └── package.json
│   │
│   └── cms/                                # Strapi 5 Backend
│       ├── src/
│       │   ├── api/
│       │   │   ├── researcher/
│       │   │   │   ├── content-types/
│       │   │   │   │   └── researcher/
│       │   │   │   │       └── schema.json
│       │   │   │   ├── controllers/
│       │   │   │   │   └── researcher.ts
│       │   │   │   ├── services/
│       │   │   │   │   └── researcher.ts
│       │   │   │   └── routes/
│       │   │   │       └── researcher.ts
│       │   │   ├── publication/
│       │   │   ├── project/
│       │   │   ├── research-group/
│       │   │   ├── equipment/
│       │   │   ├── news/
│       │   │   ├── event/
│       │   │   └── research-domain/
│       │   ├── plugins/
│       │   └── extensions/
│       ├── config/
│       │   ├── database.ts
│       │   ├── server.ts
│       │   ├── admin.ts
│       │   ├── middlewares.ts
│       │   └── plugins.ts
│       ├── public/
│       │   └── uploads/
│       ├── Dockerfile
│       ├── Dockerfile.dev
│       ├── .env.example
│       └── package.json
│
├── packages/
│   └── shared/
│       ├── src/
│       │   ├── types/
│       │   │   ├── index.ts
│       │   │   ├── publication.ts
│       │   │   ├── researcher.ts
│       │   │   └── strapi.ts
│       │   ├── validators/
│       │   │   ├── publication.ts
│       │   │   ├── contact-form.ts
│       │   │   └── application.ts
│       │   └── constants.ts
│       ├── tsconfig.json
│       └── package.json
│
├── docker/
│   ├── docker-compose.yml
│   ├── docker-compose.prod.yml
│   ├── init-scripts/
│   │   └── 001-pgvector.sql
│   └── nginx/
│       └── default.conf
│
├── scripts/
│   ├── sync-crossref.ts
│   ├── sync-orcid.ts
│   ├── sync-hal.ts
│   ├── generate-embeddings.ts
│   ├── seed-data.ts
│   └── sync-meilisearch.ts
│
├── .env.example
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
├── tsconfig.base.json
├── README.md
├── BRAINSTORM.md
└── TECHNICAL_ADDENDUM.md
```

---

## Appendix: Quick-Start Commands

```bash
# Clone and install
git clone https://github.com/leec/leec-ubuea.git
cd leec-ubuea
pnpm install

# Start development environment (PostgreSQL, Strapi, Meilisearch)
docker compose -f docker/docker-compose.yml up -d

# Initialize Strapi admin
cd apps/cms
cp .env.example .env  # Edit with your values
pnpm develop          # Creates admin at http://localhost:1337/admin

# Start Next.js development server
cd apps/web
cp .env.example .env.local  # Configure Strapi URL + API token
pnpm dev                    # Opens at http://localhost:3000

# Run sync scripts (after content is created)
pnpm --filter web tsx ../../scripts/sync-crossref.ts
pnpm --filter web tsx ../../scripts/generate-embeddings.ts

# Build for production
pnpm build

# Run tests
pnpm test
pnpm --filter web test:e2e
```

---

*This addendum provides the detailed technical blueprint. When you're ready to begin implementation, start with Phase 1 from the roadmap in BRAINSTORM.md, then scaffold the project using this addendum's structure.*
