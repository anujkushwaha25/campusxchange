import { useNavigate } from "react-router-dom";

import "./Footer.css";

import {
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaEnvelope,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";

function Footer({onProtectedClick}) {
  const handleProtectedLink = (e) => {
    e.preventDefault();      // normal navigation rok do
    onProtectedClick();       // login check + modal khol dega agar zaroorat ho
  };

  const navigate = useNavigate();
  return (
    <footer id="about" className="footer">

      <div className="footer-container">

        {/* ABOUT */}

        <div className="footer-about">

          <div className="footer-logo">

            <div className="logo-circle">
              🛒
            </div>

            <div>

              <h2>CampusXchange</h2>

              <p>Trusted Student Marketplace</p>

            </div>

          </div>

          <p>
            CampusXchange is a secure marketplace built exclusively
            for college students to buy, sell and exchange books,
            electronics, furniture and hostel essentials within
            their campus.
          </p>

          <div className="footer-contact">

            <div>
              <FaMapMarkerAlt />
              <span>Gwalior, Madhya Pradesh</span>
            </div>

            <div>
              <FaEnvelope />
              <a href="mailto:campusxchange.in@gmnail.com">
                <span>support : campusxchange.in@gmail.com</span>
              </a>
            </div>

          </div>

        </div>

                {/* QUICK LINKS */}

        <div className="footer-links">

          <h3>
            Quick Links
            <div className="footer-line"></div>
          </h3>

          <ul>

            <li><a href="/">Home</a></li>

            {/* <li><a href="/">About</a></li> */}

            <li><a href="/Product" onClick={handleProtectedLink}>Products</a></li>

            <li><a href="#faq">FAQ</a></li>

            {/* <li><a href="/">Contact</a></li> */}

          </ul>

        </div>
                {/* ADMIN */}

        <div className="footer-admin">

          <h3>
            Admin
            <div className="footer-line"></div>
          </h3>

          <button
              className="admin-btn"
              onClick={() => navigate("/admin-login")}
          >
              <FaShieldAlt />

              Admin Panel

              <FaArrowRight />
          </button>

        </div>

                {/* DEVELOPERS */}

        <div className="footer-team">

          <h3>
            Meet Our Team
            <div className="footer-line"></div>
          </h3>

          <div className="developer">

            <div>

              <h4>Anuj Kushwaha</h4>

              <span>Developer</span>

            </div>

            <div className="social">

              <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer">
  <FaLinkedin />
</a>

              <a href="https://instagram.com/_anuj_kushwaha_" target="_blank" rel="noopener noreferrer">
  <FaInstagram />
</a>

            </div>

          </div>

          <div className="developer">

            <div>

              <h4>Nikhil Raykwar</h4>

              <span> Developer</span>

            </div>

            <div className="social">

              <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer">
  <FaLinkedin />
</a>

              <a href="https://instagram.com/nikhilraykwar" target="_blank" rel="noopener noreferrer">
  <FaInstagram />
</a>

            </div>

          </div>

          <div className="developer">

            <div>

              <h4>Priyanshu</h4>

              <span>UX Developer</span>

            </div>

            <div className="social">

             <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer">
  <FaLinkedin />
</a>
              <a href="https://instagram.com/priyanshu.__.18" target="_blank" rel="noopener noreferrer">
  <FaInstagram />
</a>

            </div>

          </div>

        </div>

      </div>
            <div className="footer-bottom">

        <p>© 2026 CampusXchange</p>

        <p>
          Designed & Developed with ❤️ by Team CampusXchange
        </p>

        <p>All Rights Reserved.</p>

      </div>

    </footer>
  );
}

export default Footer;