import { useEffect, useState } from 'react'
import { getPublicSiteContent } from '../utils/firestore'

export default function About() {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPublicSiteContent().then(setContent).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="container"><p style={{ textAlign: 'center', color: 'var(--muted)' }}>Loading...</p></div>

  return (
    <div className="container" style={{ maxWidth: 760 }}>
      <div className="section-head">
        <h2>{content?.aboutTitle || 'About Us'}</h2>
      </div>
      {content?.aboutText ? (
        <p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--ink-soft)', whiteSpace: 'pre-line' }}>
          {content.aboutText}
        </p>
      ) : (
        <p style={{ textAlign: 'center', color: 'var(--muted)' }}>Content coming soon.</p>
      )}
    </div>
  )
}
