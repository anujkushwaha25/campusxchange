import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

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
  FaClipboardList,
  FaWallet,
  
} from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target)
    ) {
      setShowProfileMenu(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
    return(
      <header className="sell-topbar">

        {/* Logo */}

        <Link
          to="/dashboard"
          className="sell-brand"
        >

          <div className="sell-brand-icon">
            <FaShoppingBag />
          </div>

          <div>
            <h2>
              Campus<span>X</span>change
            </h2>

            <p>
              Buy. Sell. Exchange.
            </p>
          </div>

        </Link>


        {/* Search */}

        <div className="sell-search">
  <FaSearch />
  <input
    type="text"
    placeholder="Search for items, categories or users..."
    onKeyDown={(e) => {
      if (e.key === "Enter" && e.target.value.trim()) {
        navigate(`/browseproducts?search=${encodeURIComponent(e.target.value.trim())}`);
      }
    }}
  />
</div>


        {/* Navbar right */}

        <div className="sell-nav-right">

          
            
        <button
  className="top-my-listing-button"
  onClick={() =>
    location.pathname === "/sell-item"
      ? navigate("/mylistings")
      : navigate("/sell-item")
  }
>
  {location.pathname === "/sell-item" ? (
    <>
      <FaClipboardList />
      My Listings
    </>
  ) : (
    <>
      <FaPlus />
      Sell items
    </>
  )}
</button>
          


          <Link to="/messages" className="nav-message-btn">
              <FaCommentDots />
          </Link> 

            <Link to="/wishlist" className="nav-message-btn">
              <FaHeart /> 
            </Link>


          <button className="nav-message-btn">
            <FaBell />
            
          </button>


          {/* Profile */}

          <div className="profile-wrapper" ref={profileRef}>

            <button
              className="profile-button"
              onClick={() =>
                setShowProfileMenu(!showProfileMenu)
              }
            >

              <div className="profile-initial">
                A
              </div>

             {/* <div className="profile-name">
                <strong>Anuj Verma</strong>
              </div>*/}

              <FaChevronDown />

            </button>


            {showProfileMenu && (

              <div className="profile-dropdown">

                <Link to="/profile">
                  <FaUser />
                  Profile
                </Link>

                <Link to= "/mylistings">
                <FaClipboardList />
                 My Listings
                </Link>

                <Link to="/sellerwallet">
                  <FaWallet />
                  Wallet
                </Link>

                <Link to="/profile">
                  <FaCog />
                  Settings
                </Link>

                <Link to="/help">
                  <FaQuestionCircle />
                  Help & Support
                </Link>


                <div className="dropdown-divider"></div>

                <button
                  onClick={() => navigate("/")}
                >
                  <FaSignOutAlt />
                  Logout
                </button>

              </div>

            )}

          </div>

        </div>

      </header>
)
        }

       export default Navbar ;