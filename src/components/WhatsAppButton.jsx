export default function WhatsAppButton({ number }) {
  if (!number) return null
  const digits = number.replace(/[^\d]/g, '')
  const waNumber = digits.startsWith('880') ? digits : '880' + digits.replace(/^0/, '')
  return (
    <a
      href={`https://wa.me/${waNumber}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: 'fixed', bottom: 22, right: 22, zIndex: 50,
        width: 56, height: 56, borderRadius: '50%',
        background: '#25D366', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 6px 18px rgba(0,0,0,0.25)', fontSize: 28, textDecoration: 'none'
      }}
    >
      💬
    </a>
  )
}
