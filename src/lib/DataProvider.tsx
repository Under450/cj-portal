import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { Brand, RevenueRow, Task, Activity } from './data'
import { fetchBrands, fetchRevenue, fetchTasks, fetchActivity } from './data'

interface DataContextValue {
  brands: Brand[]
  revenue: RevenueRow[]
  tasks: Task[]
  activity: Activity[]
  loading: boolean
  reloadTasks: () => Promise<void>
  reloadRevenue: () => Promise<void>
  reloadActivity: () => Promise<void>
  reloadAll: () => Promise<void>
  revenueForBrand: (brandId: string) => number
}

const DataContext = createContext<DataContextValue>({
  brands: [], revenue: [], tasks: [], activity: [],
  loading: true,
  reloadTasks: async () => {},
  reloadRevenue: async () => {},
  reloadActivity: async () => {},
  reloadAll: async () => {},
  revenueForBrand: () => 0,
})

export function DataProvider({ children }: { children: ReactNode }) {
  const [brands, setBrands] = useState<Brand[]>([])
  const [revenue, setRevenue] = useState<RevenueRow[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [activity, setActivity] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  const loadBrands = useCallback(async () => {
    const b = await fetchBrands()
    setBrands(b)
    return b
  }, [])

  const reloadRevenue = useCallback(async () => {
    const r = await fetchRevenue(4, 2026)
    setRevenue(r)
  }, [])

  const reloadTasks = useCallback(async () => {
    const t = await fetchTasks()
    setTasks(t)
  }, [])

  const reloadActivity = useCallback(async () => {
    const a = await fetchActivity()
    setActivity(a)
  }, [])

  const reloadAll = useCallback(async () => {
    setLoading(true)
    await Promise.all([loadBrands(), reloadRevenue(), reloadTasks(), reloadActivity()])
    setLoading(false)
  }, [loadBrands, reloadRevenue, reloadTasks, reloadActivity])

  useEffect(() => { reloadAll() }, [reloadAll])

  const revenueForBrand = useCallback((brandId: string) => {
    const row = revenue.find(r => r.brand_id === brandId)
    return row ? Number(row.amount) : 0
  }, [revenue])

  return (
    <DataContext.Provider value={{ brands, revenue, tasks, activity, loading, reloadTasks, reloadRevenue, reloadActivity, reloadAll, revenueForBrand }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext)
}
