import { supabase } from './supabase'

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

export interface RevenueRow {
  id: string
  brand_id: string
  month: number
  year: number
  amount: number
}

export interface Task {
  id: string
  brand_id: string
  title: string
  status: 'open' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  due_date: string | null
  pinned: boolean
  created_at: string
}

export interface Activity {
  id: string
  brand_id: string
  description: string
  created_at: string
}

// ── Brands ──

export async function fetchBrands(): Promise<Brand[]> {
  const { data, error } = await supabase
    .from('cj_brands')
    .select('*')
    .order('created_at')
  if (error) { console.error('fetchBrands:', error.message); return [] }
  return data as Brand[]
}

export function getBrand(brands: Brand[], slug: string): Brand | undefined {
  return brands.find(b => b.slug === slug)
}

// ── Revenue ──

export async function fetchRevenue(month: number, year: number): Promise<RevenueRow[]> {
  const { data, error } = await supabase
    .from('cj_revenue')
    .select('*')
    .eq('month', month)
    .eq('year', year)
  if (error) { console.error('fetchRevenue:', error.message); return [] }
  return data as RevenueRow[]
}

export async function upsertRevenue(brandId: string, month: number, year: number, amount: number): Promise<void> {
  // Check if exists
  const { data: existing } = await supabase
    .from('cj_revenue')
    .select('id')
    .eq('brand_id', brandId)
    .eq('month', month)
    .eq('year', year)
    .limit(1)

  if (existing && existing.length > 0) {
    await supabase.from('cj_revenue').update({ amount }).eq('id', existing[0].id)
  } else {
    await supabase.from('cj_revenue').insert({ brand_id: brandId, month, year, amount })
  }
}

// ── Tasks ──

export async function fetchTasks(brandId?: string): Promise<Task[]> {
  let q = supabase.from('cj_tasks').select('*').order('created_at', { ascending: false })
  if (brandId) q = q.eq('brand_id', brandId)
  const { data, error } = await q
  if (error) { console.error('fetchTasks:', error.message); return [] }
  return data as Task[]
}

export async function createTask(task: { brand_id: string; title: string; priority: string; status?: string; pinned?: boolean }): Promise<Task | null> {
  const { data, error } = await supabase
    .from('cj_tasks')
    .insert({ ...task, status: task.status || 'open', pinned: task.pinned || false })
    .select()
    .single()
  if (error) { console.error('createTask:', error.message); return null }
  return data as Task
}

export async function updateTask(id: string, updates: Partial<Task>): Promise<void> {
  await supabase.from('cj_tasks').update(updates).eq('id', id)
}

export async function deleteTask(id: string): Promise<void> {
  await supabase.from('cj_tasks').delete().eq('id', id)
}

// ── Activity ──

export async function fetchActivity(brandId?: string): Promise<Activity[]> {
  let q = supabase.from('cj_activity').select('*').order('created_at', { ascending: false }).limit(20)
  if (brandId) q = q.eq('brand_id', brandId)
  const { data, error } = await q
  if (error) { console.error('fetchActivity:', error.message); return [] }
  return data as Activity[]
}

export async function logActivity(brandId: string, description: string): Promise<void> {
  await supabase.from('cj_activity').insert({ brand_id: brandId, description })
}
