import { createClient } from "@supabase/supabase-js";

/**
 * Read-only client, safe to use in Server Components (pages).
 * Uses the anon key — RLS only allows SELECT with this key, see schema.sql.
 */
export function supabasePublic() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { auth: { persistSession: false } }
  );
}

/**
 * Read/write client — SERVER ONLY (route handlers, the cron scraper).
 * Never import this from a Client Component or expose the service key
 * to the browser.
 */
export function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );
}
