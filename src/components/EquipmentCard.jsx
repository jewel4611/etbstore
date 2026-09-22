import { useState } from 'react'

const TYPE_LABELS = {
  equipment_rent: 'For Rent',
  equipment_sale: 'For Sale',
  spare_part: 'Spare Part',
  service: 'Service'
}

// Supports up to 4 photos (older items may only have the single legacy
// `imageData` field — that still works fine as a one-photo gallery).
export default function EquipmentCard({ item, onRequest }) {
  const photos = item.images?.length ? item.images : (item.imageData ? [item.imageData] : [])
  const [active, setActive] = useState(0)

  return (
    <div className="equipment-card">
      <div className="thumb" style={{ position: 'relative' }}>
        {photos.length
          ? <img src={photos[active]} alt={item.name} />
          : <span className="placeholder">No photo yet</span>}

        {photos.length > 1 && (
          <div style={{ position: 'absolute', bottom: 8, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
            {photos.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.stopPropagation(); setActive(idx) }}
                aria-label={`Photo ${idx + 1}`}
                style={{
                  width: 8, height: 8, borderRadius: '50%', border: 'none', padding: 0, cursor: 'pointer',
                  background: idx === active ? '#fff' : 'rgba(255,255,255,0.5)',
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.25)'
                }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="body">
        <div className="type-tag">{TYPE_LABELS[item.type] || 'Equipment'}</div>
        <h3>{item.name}</h3>
        <p>{item.publicDescription || 'Contact us for full specifications and availability.'}</p>
        <button className="btn btn-primary btn-block" onClick={() => onRequest(item)}>Request a Quote</button>
      </div>
    </div>
  )
}
