import './Footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <span>© 2026 MyShop</span>
      </div>

      <nav className="footer-nav">
        <Link to="/">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </footer>
  )
}
