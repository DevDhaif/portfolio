import { createClient } from '@supabase/supabase-js';

/**
 * Cookie-free Supabase client for PUBLIC, read-only data (projects, posts,
 * certificates). Because it never touches `cookies()`, pages that use it are
 * NOT forced into dynamic rendering — they can be statically generated and
 * revalidated (ISR), which drops their TTFB from ~300–400ms to ~10ms.
 *
 * Use this ONLY for anon-readable data. For anything auth-scoped, use the
 * cookie-based server client in ./server.
 */
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
