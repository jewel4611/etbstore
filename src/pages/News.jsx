import { useEffect, useState } from 'react'
import { listPublishedNews } from '../utils/firestore'

function fmtDate(d) {
  if (!d) return ''
  try { return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) }
  catch { return d }
}

export default function News() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listPublishedNews().then(setPosts).finally(() => setLoading(false))
  }, [])

  return (
    <div className="container" style={{ maxWidth: 780 }}>
      <div className="section-head">
        <h2>News &amp; Updates</h2>
        <p>What's new at Equipment &amp; Technologies Bangladesh</p>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: 'var(--muted)' }}>Loading...</p>
      ) : posts.length === 0 ? (
        <div className="empty-state"><p>No updates posted yet.</p></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {posts.map(p => (
            <div key={p.id} className="equipment-card" style={{ flexDirection: 'row' }}>
              {p.imageData && (
                <div className="thumb" style={{ width: 160, aspectRatio: 'auto', flexShrink: 0 }}>
                  <img src={p.imageData} alt="" style={{ height: '100%' }} />
                </div>
              )}
              <div className="body">
                <div className="type-tag">{fmtDate(p.date)}</div>
                <h3>{p.title}</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{p.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
