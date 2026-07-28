# LEEC Website — Run Doc

## How to reproduce the uncommitted artifacts

1. Install dependencies: `cd leec-web && bun install`
2. Copy `.env.local` from the main checkout (contains Supabase credentials; never commit secrets)

## How to run the server

1. `cd leec-web`
2. `npx next dev -p 3000`
   - The app connects to a live Supabase instance for auth, profiles, and data
   - Homepage renders public data (publications, news, equipment) from seed/Supabase
   - Profile pages require RLS policies applied to the Supabase project (see `src/db/rls.sql`)
