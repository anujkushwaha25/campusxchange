import "./Whycampus.css";

import {
  FaUserCheck,
  FaTags,
  FaComments,
  FaShieldAlt,
  FaSearch,
  FaRocket,
} from "react-icons/fa";

function Features() {
  return (
    <section className="features" data-aos="fade-up">

      <div className="wcx-section-title">

        <span>WHY CampusXchange?</span>

        <h2>
          Everything You Need
          <br />
          To Buy & Sell On Campus
        </h2>

        <p>
          CampusX makes buying and selling easier,
          safer and faster for every student.
        </p>

      </div>

      <div className="feature-grid">

        <div className="feature-box">
          <FaUserCheck />
          <h3>Verified Students</h3>
          <p>
            Only verified college students can join
            the marketplace.
          </p>
        </div>

        <div className="feature-box">
          <FaTags />
          <h3>Zero Commission</h3>
          <p>
            Sell your products without paying any
            platform fees.
          </p>
        </div>

        <div className="feature-box">
          <FaComments />
          <h3>Direct Chat</h3>
          <p>
            Contact buyers and sellers instantly.
          </p>
        </div>

        <div className="feature-box">
          <FaShieldAlt />
          <h3>Safe Deals</h3>
          <p>
            Buy and sell inside your college
            community.
          </p>
        </div>

        <div className="feature-box">
          <FaSearch />
          <h3>Smart Search</h3>
          <p>
            Find products quickly using categories
            and filters.
          </p>
        </div>

        <div className="feature-box">
          <FaRocket />
          <h3>Quick Listing</h3>
          <p>
            Upload a product in less than one minute.
          </p>
        </div>

      </div>

    </section>
  );
}

export default Features;