import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import "./Dashboard.css";

import {
  FaHome,
  FaSearch,
  FaThLarge,
  FaHeart,
  FaRegHeart,
  FaShoppingBag,
  FaBell,
  FaCommentDots,
  FaUser,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaPlus,
  FaChevronDown,
  FaChevronRight,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaEye,
  FaCheckCircle,
} from "react-icons/fa";

// CHANGE THESE PATHS ACCORDING TO YOUR ASSETS
import storeImage from "../assets/store.png";
import bookImage from "../assets/products/book.jpg";
import headphonesImage from "../assets/products/headphones.jpg";
import tableImage from "../assets/products/table.jpg";

// Same product data used on the Browse Products page —
// ADJUST THIS PATH to match where your BrowseProducts.jsx actually lives
import { browseProductData } from "./Browse/BrowseProducts";


const Dashboard = () => {
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  // Local dummy wishlist — sirf UI ke liye, click track karne ke liye
  const [dashboardWishlist, setDashboardWishlist] = useState([]);

  // Kisi bhi card/tag click pe Browse Products page pe category filter ke saath le jaata hai
  const goToCategory = (categoryName) => {
    navigate("/browseproducts", { state: { category: categoryName } });
  };

  // Heart icon click — card ke navigate hone se rokta hai (stopPropagation)
  const toggleDashboardWishlist = (e, productId) => {
    e.stopPropagation();
    setDashboardWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Pehle 4 products "Featured" mein, agle 5 "Recently Added" mein —
  // dono hi asli Browse Products wale data se aa rahe hain
  const featuredProducts = browseProductData.slice(0, 4);

  const recentProducts = browseProductData.slice(4, 9);

  const orders = [
    {
      name: "Engineering Maths Book",
      price: "₹350",
      status: "Delivered",
      date: "2 May, 2025",
      image: bookImage,
    },
    {
      name: "Boat Headphones",
      price: "₹799",
      status: "Shipped",
      date: "1 May, 2025",
      image: headphonesImage,
    },
    {
      name: "Study Table",
      price: "₹1,500",
      status: "Delivered",
      date: "28 Apr, 2025",
      image: tableImage,
    },
  ];

    

  return (

        <>
        <Navbar />
        <Sidebar />
    <div className="dashboard-page">

      


      {/* ==============================
              MAIN AREA
      =============================== */}

      <main className="dashboard-main">

        {/* ==============================
                TOP NAVBAR
        =============================== */}

        


        {/* ==============================
                DASHBOARD CONTENT
        =============================== */}

        <div className="dashboard-content">


          {/* ==============================
                  HERO
          =============================== */}

          <section className="dashboard-hero">

            <div className="hero-content">

              <p className="hero-small-title">
                Good evening,
              </p>

              <h1>
                Anuj! <span>👋</span>
              </h1>

              <p className="hero-description">
                Find everything you need on your campus.
              </p>


              {/* HERO SEARCH */}

              {/* <div className="hero-search">

                <FaSearch />

                <input
                  type="text"
                  placeholder="Search books, electronics, furniture..."
                />

                <button>
                  Search
                </button>

              </div> */}


              {/* POPULAR */}

              <div className="popular-tags">

                <span>Popular:</span>

                <button onClick={() => goToCategory("Books")}>Books</button>
                <button onClick={() => goToCategory("Electronics")}>Laptop</button>
                <button onClick={() => goToCategory("Books")}>Notes</button>
                <button onClick={() => goToCategory("Furniture")}>Chair</button>
                <button onClick={() => goToCategory("Electronics")}>iPhone</button>
                <button onClick={() => goToCategory("Vehicles")}>Cycle</button>

              </div>

            </div>


            {/* STORE IMAGE */}

            <div className="hero-image">

              <img
                src={storeImage}
                alt="Campus marketplace"
              />

            </div>

          </section>


          {/* ==============================
                  FEATURED PRODUCTS
          =============================== */}

          <section className="dashboard-section">

            <div className="section-heading">

              <div>

                <h2>
                  Featured for You
                </h2>

              </div>

              <Link to="/browseproducts">
                View All <FaChevronRight />
              </Link>

            </div>


            <div className="featured-grid">

              {featuredProducts.map((product, index) => (

                <div
                  className="dashboard-product-card"
                  key={index}
                  onClick={() => goToCategory(product.category)}
                >

                  {/* IMAGE */}

                  <div className="dashboard-product-image">

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <button
                      className="heart-button"
                      onClick={(e) =>
                        toggleDashboardWishlist(e, product.id)
                      }
                    >
                      {dashboardWishlist.includes(product.id) ? (
                        <FaHeart />
                      ) : (
                        <FaRegHeart />
                      )}
                    </button>

                    <span className="product-category">
                      {product.category}
                    </span>

                  </div>


                  {/* DETAILS */}

                  <div className="product-details">

                    <h3>
                      {product.name}
                    </h3>

                    <p className="product-description">
                      {product.condition}
                    </p>

                    <div className="product-location">

                      <FaMapMarkerAlt />

                      {product.location}

                    </div>


                    <div className="product-bottom">

                      <strong>
                        ₹{product.price.toLocaleString("en-IN")}
                      </strong>

                      <button>
                        View Details
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </section>


          {/* ==============================
                  RECENTLY ADDED
          =============================== */}

          <section className="dashboard-section">

            <div className="section-heading">

              <h2>
                Recently Added
              </h2>

              <Link to="/browseproducts">
                View All <FaChevronRight />
              </Link>

            </div>


            <div className="recent-products">

              {recentProducts.map((product, index) => (

                <div
                  className="recent-product-card"
                  key={index}
                  onClick={() => goToCategory(product.category)}
                >

                  <div className="recent-image">

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <button
                      onClick={(e) =>
                        toggleDashboardWishlist(e, product.id)
                      }
                    >
                      {dashboardWishlist.includes(product.id) ? (
                        <FaHeart />
                      ) : (
                        <FaRegHeart />
                      )}
                    </button>

                  </div>

                  <h3>
                    {product.name}
                  </h3>

                  <strong>
                    ₹{product.price.toLocaleString("en-IN")}
                  </strong>

                </div>

              ))}

            </div>

          </section>


        {/* ==============================
                  SELL CTA BANNER
          =============================== */}

          <section className="sell-cta-banner">

            <div className="sell-cta-text">

              <h2>
                Got something to sell?
              </h2>

              <p>
                List your item in under 2 minutes and reach
                thousands of students on your campus.
              </p>

            </div>

            <button
              className="sell-cta-button"
              onClick={() => navigate("/sell-item")}
            >
              <FaPlus />
              Sell an Item
            </button>

          </section>
        </div>



        {/* ==============================
              RIGHT ACTIVITY PANEL
        =============================== */}

        <aside className="dashboard-right">


          {/* ACTIVITY */}

          <div className="right-card">

            <h2>
              Your Activity
            </h2>


            <div className="activity-item">

              <div className="activity-icon blue">
                <FaHeart />
              </div>

              <span>
                Wishlist Items
              </span>

              <strong>
                8
              </strong>

            </div>


            <div className="activity-item">

              <div className="activity-icon green">
                <FaShoppingBag />
              </div>

              <span>
                My Orders
              </span>

              <strong>
                5
              </strong>

            </div>


            <div className="activity-item">

              <div className="activity-icon purple">
                <FaBoxOpen />
              </div>

              <span>
                Active Listings
              </span>

              <strong>
                3
              </strong>

            </div>

          </div>


          {/* RECENT ORDERS */}

          <div className="right-card">

            <div className="right-card-heading">

              <h2>
                Recent Orders
              </h2>

              <Link to="/orders">
                View All
              </Link>

            </div>


            <div className="orders-list">

              {orders.map((order, index) => (

                <div
                  className="order-item"
                  key={index}
                >

                  <img
                    src={order.image}
                    alt={order.name}
                  />

                  <div className="order-info">

                    <h3>
                      {order.name}
                    </h3>

                    <span
                      className={
                        order.status === "Delivered"
                          ? "status delivered"
                          : "status shipped"
                      }
                    >
                      {order.status}
                    </span>

                    <small>
                      {order.date}
                    </small>

                  </div>

                  <strong>
                    {order.price}
                  </strong>

                </div>

              ))}

            </div>

          </div>

        </aside>

      </main>

    </div>
    </>
  );
};

export default Dashboard;