import "./FeaturedProduct.css";

import { browseProductData } from "../afterlogpages/Browse/BrowseProducts";

import {
  FaHeart,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";


function FeaturedProducts({ onProtectedClick }) {
 
  const handleProtectedLink = (e) => {
    e.preventDefault();      // normal navigation rok do
    onProtectedClick();       // login check + modal khol dega agar zaroorat ho
  };
  return (
    <section
      className="featured-products"
      id="featured-products"
      data-aos="fade-up"
    >
      <div className="featured-heading">

        <span>Featured Products</span>

        <h2>
          Discover Popular Products
          <br />
          From Your Campus
        </h2>

        <p>
          Browse quality products posted by verified
          students and grab the best deals.
        </p>

      </div>

      <div className="products-grid">

        {browseProductData.slice(0, 6).map((item) => (
          <div className="product-card" key={item.id}>

            <div className="product-image">

              <img
                src={item.image}
                alt={item.name}
              />

              <button className="wishlist">
                <FaHeart />
              </button>

              <span className="badge">
                {item.category}
              </span>

            </div>

            <div className="product-content">

              <h3>{item.name}</h3>

              <h4>₹{item.price.toLocaleString("en-IN")}</h4>

              <p>
                <FaMapMarkerAlt />
                {item.location}
              </p>

              <button className="view-btn" onClick={handleProtectedLink}>
                View Details
                <FaArrowRight />
              </button>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default FeaturedProducts;