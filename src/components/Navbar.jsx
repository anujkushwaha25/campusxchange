import { Link } from "react-router-dom";

import "./Navbar.css";


function Navbar({ onProtectedClick }) {
 
  const handleProtectedLink = (e) => {
    e.preventDefault();      // normal navigation rok do
    onProtectedClick();       // login check + modal khol dega agar zaroorat ho
  };
  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <div className="nav-logo">
          <span className="navbar-logo-icon">🛒</span>
          <h2>CampusXchange</h2>
        </div>

        {/* Navigation */}
        <nav className="nav-links">
          <a href="/">Home</a>
               <a href="/categories" onClick={handleProtectedLink}>Categories</a>
          <a href="/products" onClick={handleProtectedLink}>Products</a>
        
          <a href="#about">About</a>
        </nav>

        {/* Search Box */}

            {/* <div className="search-box">
            <input
                type="text"
                placeholder="Search products..."
            />
            <button className="search-btn">🔍</button>
            </div> */}


        {/* Buttons */}
       {/* Buttons */}
          <div className="nav-buttons">

            <Link to="/login" className="nav-login-btn">
              Login
            </Link>

            <Link to="/signup" className="nav-signup-btn">
              Sign Up
            </Link>

          </div>

      </div>
    </header>
  );
}

export default Navbar;