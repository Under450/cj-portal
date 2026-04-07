export type UpdateType = 'dev' | 'deploy' | 'legal' | 'design'
export type PillType = 'live' | 'wip' | 'blocked'

export interface Update {
  id: string
  title: string
  date: string
  type: UpdateType
  panel: 3 | 4
  expanded?: boolean
  body: string
  pill: PillType
  pillText: string
}

export const UPDATES: Update[] = [
  // Panel 3 — Bergason Updates
  {
    id: 'u1',
    title: 'Residents Portal — Dashboard Complete',
    date: '03 Apr 2026',
    type: 'dev',
    panel: 3,
    expanded: true,
    body: 'Dashboard UI built with <span class="text-amber">Recharts</span> for financial overview, maintenance requests timeline, and document access. <span class="text-teal">Auth flow</span> working with Supabase magic links.',
    pill: 'wip',
    pillText: 'IN PROGRESS',
  },
  {
    id: 'u2',
    title: 'Admin Portal — Tenant Search Shipped',
    date: '01 Apr 2026',
    type: 'deploy',
    panel: 3,
    body: 'Full-text search across tenants with <span class="text-amber">debounced input</span> and Supabase RPC. Filterable by block, unit, and status. Deployed to staging.',
    pill: 'live',
    pillText: 'DEPLOYED',
  },
  {
    id: 'u3',
    title: 'Tenant Rights Act — Legal Review',
    date: '29 Mar 2026',
    type: 'legal',
    panel: 3,
    body: 'Reviewed requirements for <span class="text-amber">Tenant Rights Act compliance</span>. Info pages need: deposit protection, eviction process, repair obligations. Content draft with solicitor.',
    pill: 'blocked',
    pillText: 'AWAITING LEGAL',
  },
  {
    id: 'u4',
    title: 'Design System — Tokens Finalised',
    date: '27 Mar 2026',
    type: 'design',
    panel: 3,
    body: 'Colour tokens, spacing scale, and typography locked. Using <span class="text-teal">Tailwind v4</span> with CSS custom properties. Consistent across all Bergason portals.',
    pill: 'live',
    pillText: 'COMPLETE',
  },
  {
    id: 'u5',
    title: 'Brochure — Flipbook Engine Live',
    date: '24 Mar 2026',
    type: 'deploy',
    panel: 3,
    body: 'Site-specific flipbook generator deployed. PDF upload → <span class="text-amber">page-turn viewer</span> with custom branding per property. Generic template also live.',
    pill: 'live',
    pillText: 'LIVE',
  },

  // Panel 4 — CJ Updates
  {
    id: 'u6',
    title: 'FMM — Staff Portal Intake Live',
    date: '04 Apr 2026',
    type: 'deploy',
    panel: 4,
    expanded: true,
    body: 'Mail intake form deployed for staff. Barcode scanning, <span class="text-amber">photo capture</span>, and address lookup integrated. Processing queue visible on dashboard.',
    pill: 'wip',
    pillText: 'IN PROGRESS',
  },
  {
    id: 'u7',
    title: 'FMM — Landing Page Shipped',
    date: '31 Mar 2026',
    type: 'design',
    panel: 4,
    body: 'Marketing landing page live at <span class="text-teal">forwardmymail.co.uk</span>. Waitlist form connected to Supabase. Conversion tracking via Plausible.',
    pill: 'live',
    pillText: 'LIVE',
  },
  {
    id: 'u8',
    title: 'Velvet — Concept & Brand Direction',
    date: '28 Mar 2026',
    type: 'design',
    panel: 4,
    body: 'Brand identity exploration complete. <span class="text-purple">Purple accent</span> confirmed. App concept: premium lifestyle membership. Wireframes in progress.',
    pill: 'wip',
    pillText: 'CONCEPT',
  },
  {
    id: 'u9',
    title: 'CJ Ops Portal — Static Build',
    date: '25 Mar 2026',
    type: 'dev',
    panel: 4,
    body: 'Static HTML/CSS prototype of the ops dashboard. <span class="text-amber">Dark theme</span> with amber accents. GitHub Pages deployment. React rebuild planned.',
    pill: 'wip',
    pillText: 'ON HOLD',
  },
  {
    id: 'u10',
    title: 'Geo-SEO Tool — Research Phase',
    date: '22 Mar 2026',
    type: 'dev',
    panel: 4,
    body: 'Evaluated Google Maps API, <span class="text-amber">SerpAPI</span>, and DataForSEO for keyword clustering. Architecture planned: Next.js + Supabase + PDF generation.',
    pill: 'blocked',
    pillText: 'RESEARCH',
  },
]
