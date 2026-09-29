import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

import {
  FaHome,
  FaSearch,
  FaThLarge,
  FaHeart,
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
  FaBook,
  FaLaptop,
  FaChair,
  FaMotorcycle,
  FaBoxOpen,
  FaEllipsisH,
  FaEye,
  FaCheckCircle,
  FaWallet,
} from "react-icons/fa";


      {/* ==============================
              SIDEBAR
      =============================== */}
 const Sidebar = ()=>{

    const location = useLocation();

    // Current route ke path ko check karke sidebar link ko "active" class dete hain.
    // startsWith use kiya hai taaki nested routes (jaise /browseproducts/123) pe bhi
    // "Browse Products" active dikhe, sirf exact "/browseproducts" pe nahi.
    const isActiveLink = (path) => {
      return location.pathname.startsWith(path);
    };

    return (
      <aside className="dashboard-sidebar">

       

        {/* MAIN NAVIGATION */}

        <nav className="sidebar-nav">

          <Link
            to="/dashboard"
            className={`sidebar-link ${
              isActiveLink("/dashboard") ? "active" : ""
            }`}
          >
            <FaHome />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/browseproducts"
            className={`sidebar-link ${
              isActiveLink("/browseproducts") ? "active" : ""
            }`}
          >
            <FaSearch />
            <span>Browse Products</span>
          </Link>

          {/* <Link to="/browseproducts" className="sidebar-link">
            <FaThLarge />
            <span>Categories</span>
          </Link> */}

          <Link
            to="/wishlist"
            className={`sidebar-link ${
              isActiveLink("/wishlist") ? "active" : ""
            }`}
          >
            <FaHeart />
            <span>Wishlist</span>
          </Link>

          <Link
            to="/myorders"
            className={`sidebar-link ${
              isActiveLink("/myorders") ? "active" : ""
            }`}
          >
            <FaShoppingBag />
            <span>My Orders</span>
          </Link>

           <Link
            to="/sellerwallet"
            className={`sidebar-link ${
              isActiveLink("/sellerwallet") ? "active" : ""
            }`}
          >
            <FaWallet />
            <span>Wallet</span>
          </Link>
            
        </nav>


        <div className="sidebar-divider"></div>


       

      </aside>
    );
  };

    export default Sidebar