import { useNavigate } from "react-router-dom";
import "./Cta.css";
import {
  FaArrowRight,
  FaUserGraduate,
  FaBoxOpen,
  FaShieldAlt,
} from "react-icons/fa";

function Cta ({onProtectedClick}) {
const handleProtectedLink = (e) => {
    e.preventDefault();      // normal navigation rok do
    onProtectedClick();       // login check + modal khol dega agar zaroorat ho
  };
      const navigate = useNavigate();    
  
  return (
    <section className="cta" data-aos="fade-up">

      <div className="cta-glow glow1"></div>
      <div className="cta-glow glow2"></div>

      <div className="cta-wrapper">

        <div className="cta-left">

          <span className="cta-badge">
            🚀 Join India's Fastest Growing Student Marketplace
          </span>

          <h2>
            Everything A Student
            <br />
            Needs In One Place
          </h2>

          <p>
            Buy textbooks, sell electronics, exchange furniture,
            discover hostel essentials and connect with verified
            students safely inside your campus.
          </p>

          <div className="cta-buttons">

            <button className="join-btn" 
              onClick={()=> navigate ("/login")}
              >
              Join CampusXchange
              <FaArrowRight />
            </button>

            <button className="explore-btn" onClick={handleProtectedLink}>
              Browse Products
            </button>

          </div>

          <div className="cta-stats-wrapper">

            <div className="cta-stat-card">

              <FaUserGraduate className="cta-stat-icon"/>

              <div>

                <h3>10K+</h3>

                <p>Verified Students</p>

              </div>

            </div>

            <div className="cta-stat-card">

              <FaBoxOpen className="cta-stat-icon"/>

              <div>

                <h3>5K+</h3>

                <p>Products Listed</p>

              </div>

            </div>

            <div className="cta-stat-card">

              <FaShieldAlt className="cta-stat-icon"/>

              <div>

                <h3>100%</h3>

                <p>Safe Community</p>

              </div>

            </div>

          </div>

        </div>

        <div className="cta-right">

          <div className="cta-floating-card cta-card1">
            📚 Books
          </div>

          <div className="cta-floating-card cta-card2">
            💻 Electronics
          </div>

          <div className="cta-floating-card cta-card3">
            🪑 Furniture
          </div>

          <div className="cta-floating-card cta-card4">
            🛵 Vehicle
          </div>

          <div className="cta-floating-card cta-card5">
            🛏 Hostel
          </div>

          <div className="circle-main">

            <div className="circle-inner">

              <h1>Campus</h1>

              <span>Xchange</span>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Cta;
