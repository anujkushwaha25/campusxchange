import "./Categories.css";

import {
  FaBook,
  FaClipboard,
  FaLaptop,
  FaCouch,
  FaBicycle,
  FaHome,
} from "react-icons/fa";

function Categories() {
  return (
    <section className="browse-categories"data-aos="fade-up">

      <div className="browse-categories-heading">
        <span>Browse Categories</span>

        <h2>
          Find Everything You Need
          <br />
          Inside Your Campus
        </h2>

        <p>
          Explore products across different categories and discover
          amazing deals from students around you.
        </p>
      </div>

      <div className="browse-categories-grid">

        <div className="browse-category-card">
          <FaBook />
          <h3>Books</h3>
          <p>Textbooks, novels and study materials.</p>
        </div>

        <div className="browse-category-card">
          <FaClipboard />
          <h3>Notes</h3>
          <p>Class notes, assignments and PYQs.</p>
        </div>

        <div className="browse-category-card">
          <FaLaptop />
          <h3>Electronics</h3>
          <p>Laptops, mobiles and gadgets.</p>
        </div>

        <div className="browse-category-card">
          <FaCouch />
          <h3>Furniture</h3>
          <p>Study tables, chairs and storage.</p>
        </div>

        <div className="browse-category-card">
          <FaBicycle />
          <h3>Vehicles</h3>
          <p>Cycles, scooters and accessories.</p>
        </div>

        <div className="browse-category-card">
          <FaHome />
          <h3>Hostel Essentials</h3>
          <p>Everything needed for hostel life.</p>
        </div>

      </div>

    </section>
  );
}

export default Categories;