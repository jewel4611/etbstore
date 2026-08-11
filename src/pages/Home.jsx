import { useEffect, useState } from 'react'
import { listPublicEquipment } from '../utils/firestore'
import EquipmentCard from '../components/EquipmentCard'
import RequestModal from '../components/RequestModal'

export default function Home() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [requesting, setRequesting] = useState(null) // null | 'general' | equipment object

  useEffect(() => {
    listPublicEquipment()
      .then(setItems)
      .catch(err => { console.error('Failed to load equipment:', err); setError(true) })
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <section className="hero">
        <h1>Equipment Rental &amp; Solutions</h1>
        <p>Browse our fleet below and request a quote — no prices listed here, we'll send you a tailored quotation based on your job, location, and duration.</p>
        <button className="btn btn-primary" onClick={() => setRequesting('general')}>Request a Quote</button>
      </section>

      <div className="container">
        <div className="section-head">
          <h2>Our Equipment</h2>
          <p>Tap any item to send us your requirements</p>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--muted)' }}>Loading equipment...</p>
        ) : error ? (
          <div className="empty-state">
            <p>We couldn't load the equipment list right now. Please refresh the page, or use "Request a Quote" above and we'll get back to you directly.</p>
          </div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <p>Our equipment listing is being updated. Please use "Request a Quote" above and tell us what you need — we'll get back to you.</p>
          </div>
        ) : (
          <div className="equipment-grid">
            {items.map(item => (
              <EquipmentCard key={item.id} item={item} onRequest={setRequesting} />
            ))}
          </div>
        )}
      </div>

      {requesting && (
        <RequestModal
          equipment={requesting === 'general' ? null : requesting}
          onClose={() => setRequesting(null)}
        />
      )}
    </>
  )
}
