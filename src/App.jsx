import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import News from './pages/News'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import { getPublicSiteContent } from './utils/firestore'

export default function App() {
  const [whatsapp, setWhatsapp] = useState('')

  useEffect(() => {
    getPublicSiteContent().then(c => setWhatsapp(c?.contactWhatsapp || '01309002853'))
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<News />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
      <WhatsAppButton number={whatsapp} />
    </div>
  )
}
