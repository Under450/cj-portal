export interface Brand {
  id: string
  name: string
  slug: string
  colour: string
  description: string
  url: string
  status: 'live' | 'dev'
  monthly_target: number
}

export const BRANDS: Brand[] = [
  { id: '1', name: 'Bergason', slug: 'bergason', colour: '#1d4ed8', description: 'Block management', url: 'https://bergasonblockmanagement.co.uk', status: 'live', monthly_target: 5000 },
  { id: '2', name: 'Forward My Mail', slug: 'forward-my-mail', colour: '#15803d', description: 'Virtual addresses', url: 'https://forwardmymail.co.uk', status: 'live', monthly_target: 2500 },
  { id: '3', name: 'Velvet App', slug: 'velvet-app', colour: '#7c3aed', description: 'Creator platform', url: '', status: 'dev', monthly_target: 0 },
  { id: '4', name: 'Aventus Studio', slug: 'aventus-studio', colour: '#ea580c', description: 'Social scheduling', url: 'http://localhost:3000', status: 'live', monthly_target: 4000 },
]

export const SEED_REVENUE: Record<string, number> = {
  '1': 4200,
  '2': 1840,
  '3': 0,
  '4': 3100,
}

export function getBrand(slug: string): Brand | undefined {
  return BRANDS.find(b => b.slug === slug)
}
