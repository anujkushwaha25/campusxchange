import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useNavigate,Link } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaChevronDown,
  FaArrowRight,
  FaBell,
  FaSlidersH,
  FaTrash,
  FaBolt,
} from "react-icons/fa";

import "./Wishlist.css";

const wishlistProducts = [
  {
    id: 1,
    name: "boAt Rockerz 510 Headphones",
    category: "Electronics",
    price: 1299,
    oldPrice: 2499,
    discount: "48% OFF",
    seller: "Rohit Verma",
    location: "Main Campus",
    image: "/images/wishlist/headphones.jpg",
    priceDrop: false,
  },
  {
    id: 2,
    name: "Engineering Mathematics",
    category: "Books",
    price: 350,
    oldPrice: 650,
    discount: "46% OFF",
    seller: "Sneha Patel",
    location: "Girls Hostel",
    image: "/images/wishlist/book.jpg",
    priceDrop: true,
  },
  {
    id: 3,
    name: "Safari Laptop Backpack",
    category: "Accessories",
    price: 599,
    oldPrice: 1499,
    discount: "60% OFF",
    seller: "Karan Singh",
    location: "Boys Hostel",
    image: "/images/wishlist/backpack.jpg",
    priceDrop: false,
  },
  {
    id: 4,
    name: "LED Study Lamp",
    category: "Home & Living",
    price: 449,
    oldPrice: 899,
    discount: "50% OFF",
    seller: "Anjali Sharma",
    location: "Main Campus",
    image: "/images/wishlist/lamp.jpg",
    priceDrop: false,
  },
  {
    id: 5,
    name: "Casio Scientific Calculator",
    category: "Electronics",
    price: 650,
    oldPrice: 1299,
    discount: "50% OFF",
    seller: "Vivek Nair",
    location: "Main Campus",
    image: "/images/wishlist/calculator.jpg",
    priceDrop: true,
  },
  {
    id: 6,
    name: "Black Hoodie",
    category: "Clothing",
    price: 499,
    oldPrice: 999,
    discount: "50% OFF",
    seller: "Mehul Jain",
    location: "Main Campus",
    image: "/images/wishlist/hoodie.jpg",
    priceDrop: false,
  },
];

const filters = [
  "All Items",
  "Price Drop",
  "Electronics",
  "Books",
  "Accessories",
];

function Wishlist() {
  const [activeFilter, setActiveFilter] = useState("All Items");
  const [sortOption, setSortOption] = useState("Recently Added");
  const [wishlist, setWishlist] = useState(wishlistProducts);

  const removeFromWishlist = (id) => {
    setWishlist((previous) =>
      previous.filter((product) => product.id !== id)
    );
  };

  const filteredProducts = wishlist.filter((product) => {
    if (activeFilter === "All Items") {
      return true;
    }

    if (activeFilter === "Price Drop") {
      return product.priceDrop;
    }

    return product.category === activeFilter;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "Price: Low to High") {
      return a.price - b.price;
    }

    if (sortOption === "Price: High to Low") {
      return b.price - a.price;
    }

    return b.id - a.id;
  });

  return (
    <>
    <Navbar />
    <Sidebar />
    <main className="wishlist-page">
      <div className="wishlist-container">

        {/* HEADER */}

        <section className="wishlist-header">

          <div className="wishlist-header-left">

            <div className="wishlist-title-icon">
              <FaHeart />
            </div>

            <div>
              <h1 className="wishlist-title">
                My Wishlist
                <span className="wishlist-title-heart">
                  <FaHeart />
                </span>
              </h1>

              <p className="wishlist-subtitle">
                Items you love and want to buy later.
              </p>
            </div>

          </div>

          <div className="wishlist-header-actions">

            <span className="wishlist-item-count">
              {wishlist.length} Items
            </span>

            <Link to="/sell-item" className="wishlist-sell-button">
              <span>+</span>
              Sell an Item
            </Link>

          </div>

        </section>


        {/* FILTER BAR */}

        <section className="wishlist-filter-section">

          <div className="wishlist-filters">

            {filters.map((filter) => (
              <button
                key={filter}
                className={`wishlist-filter-button ${
                  activeFilter === filter
                    ? "wishlist-filter-active"
                    : ""
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}

                {filter === "All Items" && (
                  <span className="wishlist-filter-count">
                    {wishlist.length}
                  </span>
                )}

                {filter === "Price Drop" && (
                  <span className="wishlist-filter-count">
                    {wishlist.filter((item) => item.priceDrop).length}
                  </span>
                )}

              </button>
            ))}

          </div>


          <div className="wishlist-sort-wrapper">

            <FaSlidersH className="wishlist-sort-icon" />

            <select
              className="wishlist-sort-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option>Recently Added</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>

            <FaChevronDown className="wishlist-sort-arrow" />

          </div>

        </section>


        {/* PRODUCTS */}

        {sortedProducts.length > 0 ? (

          <section className="wishlist-grid">

            {sortedProducts.map((product) => (

              <article
                className="wishlist-card"
                key={product.id}
              >

                {/* IMAGE */}

                <div className="wishlist-image-wrapper">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="wishlist-product-image"
                  />

                  {product.priceDrop && (
                    <span className="wishlist-price-drop">
                      PRICE DROP ↘
                    </span>
                  )}

                  <button
                    className="wishlist-heart-button"
                    onClick={() =>
                      removeFromWishlist(product.id)
                    }
                    aria-label="Remove from wishlist"
                  >
                    <FaHeart />
                  </button>

                </div>


                {/* PRODUCT INFO */}

                <div className="wishlist-product-info">

                  <span
                    className={`wishlist-category wishlist-category-${product.category
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace("&", "and")}`}
                  >
                    {product.category}
                  </span>

                  <h2 className="wishlist-product-name">
                    {product.name}
                  </h2>


                  <div className="wishlist-price-row">

                    <span className="wishlist-current-price">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>

                    <span className="wishlist-old-price">
                      ₹{product.oldPrice.toLocaleString("en-IN")}
                    </span>

                    <span className="wishlist-discount">
                      {product.discount}
                    </span>

                  </div>


                  {/* SELLER */}

                  <div className="wishlist-seller-row">

                    <div className="wishlist-seller">

                      <div className="wishlist-seller-avatar">
                        {product.seller.charAt(0)}
                      </div>

                      <span>{product.seller}</span>

                    </div>

                    <span className="wishlist-dot">
                      •
                    </span>

                    <div className="wishlist-location">

                      <FaMapMarkerAlt />

                      <span>{product.location}</span>

                    </div>

                  </div>

                </div>


                {/* CARD ACTIONS */}

                <div className="wishlist-card-actions">

                  <button className="wishlist-cart-button">
                    <FaBolt />
                    Buy Now
                  </button>

                  <button className="wishlist-details-button">
                    View Details
                  </button>

                </div>

              </article>

            ))}

          </section>

        ) : (

          <div className="wishlist-empty">

            <div className="wishlist-empty-icon">
              <FaHeart />
            </div>

            <h2>Your wishlist is empty</h2>

            <p>
              Save items you love and come back to them later.
            </p>

            <Link to="/browseproducts" className="wishlist-browse-button">
              Browse Items
              <FaArrowRight />
            </Link>

          </div>

        )}


        {/* BOTTOM ALERT */}

        <section className="wishlist-alert">

          <div className="wishlist-alert-left">

            <div className="wishlist-alert-icon">
              <FaBell />
            </div>

            <div>

              <h3>
                Price Drop Alerts On! 🔔
              </h3>

              <p>
                We'll notify you when prices drop on
                items in your wishlist.
              </p>

            </div>

          </div>

          <button className="wishlist-alert-button">
            Manage Alerts
            <FaArrowRight />
          </button>

        </section>

      </div>
    </main>
    </>
  );
}

export default Wishlist;