import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import LoadingScreen from './components/LoadingScreen'
import './styles/globals.css'

const Work = lazy(() => import('./pages/Work'))
const AICreativeStudio = lazy(() => import('./pages/AICreativeStudio'))
const SustainabilityComm = lazy(() => import('./pages/SustainabilityComm'))
const AICourses = lazy(() => import('./pages/AICourses'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/ai-creative-studio" element={<AICreativeStudio />} />
          <Route path="/sustainability" element={<SustainabilityComm />} />
          <Route path="/courses" element={<AICourses />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
