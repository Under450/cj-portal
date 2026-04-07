# CJ Portal

Personal business operations dashboard for CJ Group. Tracks revenue, tasks, and projects across all brands.

## Brands

| Brand | Colour | Status | Monthly Target |
|-------|--------|--------|---------------|
| Bergason | #1d4ed8 | Live | £5,000 |
| Forward My Mail | #15803d | Live | £2,500 |
| Velvet App | #7c3aed | Dev | £0 |
| Aventus Studio | #ea580c | Live | £4,000 |

## Stack

React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion + Recharts + Supabase + Lucide Icons

## Setup

```bash
git clone https://github.com/Under450/cj-portal.git
cd cj-portal
npm install
```

Create `.env.local`:
```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_ANTHROPIC_API_KEY=
```

```bash
npm run dev
```

Opens at http://localhost:5173
