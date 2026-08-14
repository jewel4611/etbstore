import { useEffect, useState } from 'react'
import { getPublicSiteContent, listPublicEquipment } from '../utils/firestore'

const CATEGORIES = [
  { type: 'equipment_rent', title: 'Equipment Rental', descKey: 'serviceRentalDesc' },
  { type: 'equipment_sale', title: 'Equipment Sale', descKey: 'serviceSaleDesc' },
  { type: 'spare_part', title: 'Spare Parts', descKey: 'servicePartsDesc' },
  { type: 'service', title: 'Service & Maintenance', descKey: 'serviceMaintenanceDesc' }
]

export default function Services() {
  const [content, setContent] = useState(null)
  const [equipment, setEquipment] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getPublicSiteContent(), listPublicEquipment()])
      .then(([c, e]) => { setContent(c); setEquipment(e) })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="container"><p style={{ textAlign: 'center', color: 'var(--muted)' }}>Loading...</p></div>

  return (
    <div className="container">
      <div className="section-head">
        <h2>Our Services</h2>
        <p>What we offer, across equipment rental, sales, parts, and support</p>
      </div>

      <div className="equipment-grid">
        {CATEGORIES.map(cat => {
          const count = equipment.filter(e => e.type === cat.type).length
          return (
            <div key={cat.type} className="equipment-card">
              <div className="body">
                <h3>{cat.title}</h3>
                <p>{content?.[cat.descKey] || 'Details coming soon.'}</p>
                {count > 0 && (
                  <div style={{ fontSize: 12.5, color: 'var(--orange-dark)', fontWeight: 700, marginBottom: 12 }}>
                    {count} item{count === 1 ? '' : 's'} listed
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
