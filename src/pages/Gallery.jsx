import { useEffect, useState } from 'react'
import { listPublishedGallery } from '../utils/firestore'

export default function Gallery() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listPublishedGallery().then(setPhotos).finally(() => setLoading(false))
  }, [])

  return (
    <div className="container">
      <div className="section-head">
        <h2>Project Gallery</h2>
        <p>A look at some of our completed work</p>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: 'var(--muted)' }}>Loading...</p>
      ) : photos.length === 0 ? (
        <div className="empty-state"><p>Photos coming soon.</p></div>
      ) : (
        <div className="equipment-grid">
          {photos.map(p => (
            <div key={p.id} className="equipment-card">
              <div className="thumb"><img src={p.imageData} alt={p.caption || ''} /></div>
              {p.caption && <div className="body" style={{ padding: 12 }}><p style={{ margin: 0 }}>{p.caption}</p></div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
