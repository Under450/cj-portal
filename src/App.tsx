import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { DataProvider } from './lib/DataProvider'
import { Layout } from './components/Layout'
import { Overview } from './pages/Overview'
import { BrandDetail } from './pages/BrandDetail'
import { Tasks } from './pages/Tasks'
import { Revenue } from './pages/Revenue'
import { Settings } from './pages/Settings'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <DataProvider>
        <Layout>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/brand/:slug" element={<BrandDetail />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/revenue" element={<Revenue />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </AnimatePresence>
        </Layout>
      </DataProvider>
    </BrowserRouter>
  )
}
