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
  // Panel 1 — Block Mgmt & Landlord
  { id: 't1', text: 'Finish residents portal dashboard UI', done: true, tag: 'DEV', panel: 1 },
  { id: 't2', text: 'Admin portal — tenant list + search', done: true, tag: 'DEV', panel: 1 },
  { id: 't3', text: 'Implement maintenance request flow', done: false, tag: 'DEV', panel: 1 },
  { id: 't4', text: 'Document upload & viewer component', done: false, tag: 'DEV', panel: 1 },
  { id: 't5', text: 'Tenant Rights Act info pages', done: false, tag: 'LEGAL', panel: 1 },
  { id: 't6', text: 'Unit test coverage for auth module', done: true, tag: 'DEV', panel: 1 },
  { id: 't7', text: 'Set up staging environment on Vercel', done: true, tag: 'OPS', panel: 1 },
  { id: 't8', text: 'Design system tokens — colours, spacing', done: true, tag: 'DESIGN', panel: 1 },
  { id: 't9', text: 'Supabase RLS policies for residents', done: false, tag: 'DEV', panel: 1 },
  { id: 't10', text: 'Landlord portal — property overview page', done: false, tag: 'DEV', panel: 1 },
  { id: 't11', text: 'Landlord portal — financial summary', done: false, tag: 'DEV', panel: 1 },
  { id: 't12', text: 'Landlord portal — document vault', done: false, tag: 'DEV', panel: 1 },
  { id: 't13', text: 'Admin panel — landlord CRUD', done: false, tag: 'DEV', panel: 1 },
  { id: 't14', text: 'Admin panel — property assignment', done: false, tag: 'DEV', panel: 1 },
  { id: 't15', text: 'Email notification service setup', done: false, tag: 'OPS', panel: 1 },
  { id: 't16', text: 'Mobile responsive pass — all portals', done: false, tag: 'DESIGN', panel: 1 },
  { id: 't17', text: 'Accessibility audit WCAG 2.1 AA', done: false, tag: 'DESIGN', panel: 1 },
  { id: 't18', text: 'CI/CD pipeline — GitHub Actions', done: true, tag: 'OPS', panel: 1 },
  { id: 't19', text: 'SSL & domain setup bergason.co.uk', done: false, tag: 'OPS', panel: 1 },

  // Panel 2 — FMM + CJ
  { id: 't20', text: 'Staff portal — mail intake form', done: true, tag: 'DEV', panel: 2 },
  { id: 't21', text: 'Staff portal — scan & upload flow', done: true, tag: 'DEV', panel: 2 },
  { id: 't22', text: 'Client portal — mail dashboard', done: false, tag: 'DEV', panel: 2 },
  { id: 't23', text: 'Client portal — forwarding rules', done: false, tag: 'DEV', panel: 2 },
  { id: 't24', text: 'Stripe integration — subscriptions', done: false, tag: 'DEV', panel: 2 },
  { id: 't25', text: 'Royal Mail API research', done: true, tag: 'OPS', panel: 2 },
  { id: 't26', text: 'Landing page design & build', done: true, tag: 'DESIGN', panel: 2 },
  { id: 't27', text: 'GDPR compliance review', done: false, tag: 'LEGAL', panel: 2 },
  { id: 't28', text: 'Supabase Edge Functions for webhooks', done: false, tag: 'DEV', panel: 2 },
  // Section: CJ OPS PORTAL — ON HOLD
  { id: 't29', text: 'Ops portal — project cards from Supabase', done: false, tag: 'DEV', panel: 2, section: 'CJ OPS PORTAL — ON HOLD' },
  { id: 't30', text: 'Ops portal — task CRUD', done: false, tag: 'DEV', panel: 2 },
  { id: 't31', text: 'Ops portal — update feed panel', done: false, tag: 'DEV', panel: 2 },
  { id: 't32', text: 'Deploy to GitHub Pages', done: true, tag: 'OPS', panel: 2 },
  // Section: GEO-SEO AUDIT TOOL
  { id: 't33', text: 'Keyword cluster scraper', done: false, tag: 'DEV', panel: 2, section: 'GEO-SEO AUDIT TOOL' },
  { id: 't34', text: 'Google Maps API integration', done: false, tag: 'DEV', panel: 2 },
  { id: 't35', text: 'Report PDF generator', done: false, tag: 'DEV', panel: 2 },
  { id: 't36', text: 'Dashboard UI for audit results', done: false, tag: 'DESIGN', panel: 2 },
  { id: 't37', text: 'Client white-label branding', done: false, tag: 'DESIGN', panel: 2 },
]
