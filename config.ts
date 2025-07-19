export const SUPABASE_URL = "https://bemvcxfitdfzbsdszsli.supabase.co"
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlbXZjeGZpdGRmemJzZHN6c2xpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDQ1Nzk4NCwiZXhwIjoyMDY2MDMzOTg0fQ.wm4QIrQ8T7g64Qk-18EklQkq8HtmaR9v4AKeS-odidA"

export const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
  Prefer: "return=representation",
}
