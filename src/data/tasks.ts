export type Tag = 'DEV' | 'OPS' | 'LEGAL' | 'DESIGN'

export interface Task {
  id: string
  text: string
  done: boolean
  tag: Tag
  panel: 1 | 2
  section?: string
}

export const TASKS: Task[] = [
  // ══════════════════════════════════════════════════════════
  // Panel 1 — Block Mgmt & Landlord · Tasks
  // (exact text from cj-ops-portal.html lines 552–646)
  // ══════════════════════════════════════════════════════════
  { id: 't1',  text: 'Fix Firestore collection name — landlord_sessions → onboarding_sessions', done: true, tag: 'DEV', panel: 1 },
  { id: 't2',  text: 'Build createLandlordSession Cloud Function', done: true, tag: 'DEV', panel: 1 },
  { id: 't3',  text: 'Add New Landlord tab to landlord-admin.html', done: true, tag: 'DEV', panel: 1 },
  { id: 't4',  text: 'Tenant Rights Act Portal — complete v1 (dashboard, batch send, single send)', done: true, tag: 'DEV', panel: 1 },
  { id: 't5',  text: 'Certificate generation with full delivery timeline PDF', done: true, tag: 'DEV', panel: 1 },
  { id: 't6',  text: 'Resend webhook — delivery/open/bounce tracking deployed', done: true, tag: 'DEV', panel: 1 },
  { id: 't7',  text: 'Rename Bergason Estate Agents → Bergason Property Services throughout', done: true, tag: 'OPS', panel: 1 },
  { id: 't8',  text: 'Brochure — site-specific flipbook live at bergasonblockmanagement.co.uk/brochure-flipbook.html', done: true, tag: 'DESIGN', panel: 1 },
  { id: 't9',  text: 'Brochure — generic template live at under450.github.io/-bergason-brochure-template/brochure.html', done: true, tag: 'DESIGN', panel: 1 },
  { id: 't10', text: 'Deploy createLandlordSession + resetSessionProgress Cloud Functions', done: false, tag: 'DEV', panel: 1 },
  { id: 't11', text: 'Test Didit KYC flow end-to-end with fresh session', done: false, tag: 'DEV', panel: 1 },
  { id: 't12', text: 'Add fee placeholders to tc_templates/v1 in Firestore', done: false, tag: 'OPS', panel: 1 },
  { id: 't13', text: 'Await Firebase project quota increase (2 days)', done: false, tag: 'OPS', panel: 1 },
  { id: 't14', text: 'Admin Portal Phase 2 — remove self-registration, role-based routing', done: false, tag: 'DEV', panel: 1 },
  { id: 't15', text: 'Admin Portal Phase 3 — document uploads via Firebase Storage', done: false, tag: 'DEV', panel: 1 },
  { id: 't16', text: 'Geo-SEO audit — AI search visibility (ChatGPT, Perplexity, Claude)', done: false, tag: 'OPS', panel: 1 },
  { id: 't17', text: 'SIC Director Search — prototype built (SIC search, director extraction, CSV export)', done: true, tag: 'DEV', panel: 1 },
  { id: 't18', text: 'SIC Director Search — connect Companies House API (free key)', done: false, tag: 'DEV', panel: 1 },
  { id: 't19', text: 'SIC Director Search — wire Google Custom Search for website/email discovery', done: false, tag: 'DEV', panel: 1 },

  // ══════════════════════════════════════════════════════════
  // Panel 2 — Forward My Mail · Tasks
  // (exact text from cj-ops-portal.html lines 666–770)
  // ══════════════════════════════════════════════════════════
  { id: 't20', text: 'Didit KYC integration complete', done: true, tag: 'DEV', panel: 2 },
  { id: 't21', text: 'Stripe subscription links — all 4 tiers', done: true, tag: 'DEV', panel: 2 },
  { id: 't22', text: 'Webhook infrastructure — Stripe lifecycle events', done: true, tag: 'DEV', panel: 2 },
  { id: 't23', text: 'Welcome email workflow — full lifecycle', done: true, tag: 'DEV', panel: 2 },
  { id: 't24', text: 'Cancellation & reactivation flow', done: false, tag: 'DEV', panel: 2 },
  { id: 't25', text: 'Staff Portal — build and test', done: false, tag: 'DEV', panel: 2 },
  { id: 't26', text: 'Client Portal — build and test', done: false, tag: 'DEV', panel: 2 },

  // Section: CJ OPS PORTAL — ON HOLD
  { id: 't27', text: 'Design & build static HTML dashboard (10 projects, 4-panel grid)', done: true, tag: 'DESIGN', panel: 2, section: 'CJ OPS PORTAL — ON HOLD' },
  { id: 't28', text: 'Decide stack — Supabase (DB/auth) + GitHub Pages (hosting)', done: true, tag: 'OPS', panel: 2 },
  { id: 't29', text: 'Create GitHub repo (CJ-Ops-Portal) — ON HOLD', done: false, tag: 'OPS', panel: 2 },
  { id: 't30', text: 'Create Supabase project (free tier) — ON HOLD', done: false, tag: 'OPS', panel: 2 },
  { id: 't31', text: 'Supabase DB schema — projects, tasks, updates tables', done: false, tag: 'DEV', panel: 2 },
  { id: 't32', text: 'Supabase Auth — email/password login (Craig only)', done: false, tag: 'DEV', panel: 2 },
  { id: 't33', text: 'Wire frontend to Supabase — persist tasks, updates, progress', done: false, tag: 'DEV', panel: 2 },
  { id: 't34', text: 'Deploy to GitHub Pages', done: false, tag: 'OPS', panel: 2 },

  // Section: GEO-SEO AUDIT TOOL
  { id: 't35', text: 'Install geo-seo-claude skill (14 sub-skills, 5 subagents)', done: true, tag: 'DEV', panel: 2, section: 'GEO-SEO AUDIT TOOL' },
  { id: 't36', text: 'Run /geo audit on bergasonblockmanagement.co.uk — implement all fixes', done: false, tag: 'OPS', panel: 2 },
  { id: 't37', text: 'Generate PDF report with /geo report-pdf', done: false, tag: 'OPS', panel: 2 },
  { id: 't38', text: 'Build self-service GEO audit product — user submits URL, gets branded PDF report', done: false, tag: 'DEV', panel: 2 },
]
