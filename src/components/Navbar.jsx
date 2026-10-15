import { useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar({ onProtectedClick }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleProtectedLink = (e) => {
    e.preventDefault();   // normal navigation rok do
    closeMenu();          // mobile menu band kar do
    onProtectedClick();   // login check + modal khol dega agar zaroorat ho
  };

  return (
    <header className={`navbar ${menuOpen ? "menu-open" : ""}`}>
      <div className="navbar-container">

        {/* Logo */}
        <div className="nav-logo">
          <span className="navbar-logo-icon">🛒</span>
          <h2>CampusXchange</h2>
        </div>

        {/* Hamburger (sirf mobile par dikhta hai) */}
        <button
          type="button"
          className="nav-toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation */}
        <nav className="nav-links">
          <a href="/" onClick={closeMenu}>Home</a>
          <a href="/categories" onClick={handleProtectedLink}>Categories</a>
          <a href="/products" onClick={handleProtectedLink}>Products</a>
          <a href="#about" onClick={closeMenu}>About</a>
        </nav>

        {/* Buttons */}
        <div className="nav-buttons">
          <Link to="/login" className="nav-login-btn" onClick={closeMenu}>
            Login
          </Link>

          <Link to="/signup" className="nav-signup-btn" onClick={closeMenu}>
            Sign Up
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Navbar;
