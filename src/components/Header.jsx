import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/gallery', label: 'Gallery' },
  { to: '/news', label: 'News' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
]

export default function Header() {
  return (
    <header className="site-header">
      <a href="/" className="brand">
        <img src="/logo.png" alt="Equipment & Technologies Bangladesh" />
        <div className="brand-text">
          Equipment &amp; Technologies Bangladesh
          <span>EQUIPMENT RENTAL</span>
        </div>
      </a>
      <nav style={{ display: 'flex', gap: 18, fontSize: 13.5 }}>
        {links.map(l => (
          <NavLink
            key={l.to} to={l.to} end={l.end}
            style={({ isActive }) => ({
              color: isActive ? 'var(--orange)' : '#C7CBD1',
              textDecoration: 'none', fontWeight: isActive ? 700 : 500
            })}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
      <div className="contact">
        <a href="tel:+8801309002853">+880 1309-002853</a>
        <a href="mailto:rental.etb@gmail.com">rental.etb@gmail.com</a>
      </div>
    </header>
  )
}
