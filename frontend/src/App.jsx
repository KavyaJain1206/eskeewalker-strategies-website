import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Work from './pages/Work'
import AICreativeStudio from './pages/AICreativeStudio'
import SustainabilityComm from './pages/SustainabilityComm'
import AICourses from './pages/AICourses'
import About from './pages/About'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import './styles/globals.css'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/ai-creative-studio" element={<AICreativeStudio />} />
        <Route path="/sustainability" element={<SustainabilityComm />} />
        <Route path="/courses" element={<AICourses />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
