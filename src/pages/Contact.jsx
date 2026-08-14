import { useEffect, useState } from 'react'
import { getPublicSiteContent } from '../utils/firestore'

export default function Contact() {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPublicSiteContent().then(setContent).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="container"><p style={{ textAlign: 'center', color: 'var(--muted)' }}>Loading...</p></div>

  const whatsapp = content?.contactWhatsapp || ''
  const digits = whatsapp.replace(/[^\d]/g, '')
  const waNumber = digits.startsWith('880') ? digits : '880' + digits.replace(/^0/, '')

  return (
    <div className="container" style={{ maxWidth: 560, textAlign: 'center' }}>
      <div className="section-head">
        <h2>Get in Touch</h2>
        <p>Fastest way to reach us is WhatsApp — tap below to start chatting directly</p>
      </div>

      {whatsapp && (
        <a
          href={`https://wa.me/${waNumber}`}
          target="_blank" rel="noreferrer"
          className="btn"
          style={{ background: '#25D366', color: '#fff', fontSize: 15, padding: '14px 28px', marginBottom: 32 }}
        >
          💬 Chat on WhatsApp
        </a>
      )}

      <div className="card" style={{ background: 'var(--paper-raised)', border: '1px solid var(--line)', borderRadius: 12, padding: 24, textAlign: 'left' }}>
        {content?.contactPhone && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 4 }}>Phone</div>
            <div style={{ fontSize: 14.5 }}>{content.contactPhone}</div>
          </div>
        )}
        {content?.contactEmail && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 4 }}>Email</div>
            <div style={{ fontSize: 14.5 }}><a href={`mailto:${content.contactEmail}`} style={{ color: 'var(--ink)' }}>{content.contactEmail}</a></div>
          </div>
        )}
        {content?.contactAddress && (
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 4 }}>Address</div>
            <div style={{ fontSize: 14.5 }}>{content.contactAddress}</div>
          </div>
        )}
      </div>
    </div>
  )
}
