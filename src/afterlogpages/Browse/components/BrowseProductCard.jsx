import React, { useState, useRef, useEffect } from "react";

import {
  FaHeart,
  FaRegHeart,
  FaMapMarkerAlt,
  FaEllipsisV,
  FaBolt,
  FaShareAlt,
  FaFlag,
  FaEyeSlash,
} from "react-icons/fa";


function BrowseProductCard({
  product,
  isWishlisted,
  onWishlistToggle,
  viewMode,
  onBuyNow,
  onReport,
  onHide,
}) {

  // Controls whether the "more options" dropdown is open
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  // Used to detect clicks outside the dropdown so we can close it
  const moreMenuRef = useRef(null);

  useEffect(() => {

    function handleClickOutside(event) {

      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(event.target)
      ) {

        setShowMoreMenu(false);

      }

    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);


  const handleShare = () => {

    const shareUrl = `${window.location.origin}/product/${product.id}`;

    if (navigator.share) {

      // Native share sheet on mobile browsers
      navigator.share({
        title: product.name,
        url: shareUrl,
      });

    } else {

      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");

    }

    setShowMoreMenu(false);

  };


  const handleReport = () => {

    if (onReport) {

      onReport(product.id);

    } else {

      alert(`Reported "${product.name}". Our team will review it.`);

    }

    setShowMoreMenu(false);

  };


  const handleHide = () => {

    if (onHide) {

      onHide(product.id);

    }

    setShowMoreMenu(false);

  };

  return (

    <article
      className={`browse-product-card ${
        viewMode === "list"
          ? "browse-product-card-list"
          : ""
      }`}
    >

      {/* =========================
          PRODUCT IMAGE
      ========================= */}

      <div className="browse-product-image-wrapper">

        <img
          src={product.image}
          alt={product.name}
          className="browse-product-image"
        />


        {/* Condition */}

        <span
          className={`browse-product-condition browse-product-condition-${product.condition
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
        >
          {product.condition}
        </span>


        {/* Wishlist */}

        <button
          className={`browse-product-wishlist ${
            isWishlisted ? "active" : ""
          }`}
          onClick={() =>
            onWishlistToggle(product.id)
          }
          aria-label="Add to wishlist"
        >

          {isWishlisted ? (
            <FaHeart />
          ) : (
            <FaRegHeart />
          )}

        </button>

      </div>


      {/* =========================
          PRODUCT INFORMATION
      ========================= */}

      <div className="browse-product-information">

        <div className="browse-product-title-row">

          <h3>
            {product.name}
          </h3>

          <div
            className="browse-product-more-wrapper"
            ref={moreMenuRef}
          >

            <button
              className="browse-product-more-button"
              onClick={() =>
                setShowMoreMenu((prev) => !prev)
              }
              aria-label="More options"
            >
              <FaEllipsisV />
            </button>

            {showMoreMenu && (

              <div className="browse-product-more-menu">

                <button
                  className="browse-product-more-item"
                  onClick={handleShare}
                >
                  <FaShareAlt />
                  Share
                </button>

                <button
                  className="browse-product-more-item"
                  onClick={handleReport}
                >
                  <FaFlag />
                  Report listing
                </button>

                <button
                  className="browse-product-more-item"
                  onClick={handleHide}
                >
                  <FaEyeSlash />
                  Not interested
                </button>

              </div>

            )}

          </div>

        </div>


        <div className="browse-product-price">

          ₹{product.price.toLocaleString("en-IN")}

        </div>


        <div className="browse-product-location">

          <FaMapMarkerAlt />

          <span>
            {product.location}
          </span>

        </div>


        <div className="browse-product-bottom-row">

          <span className="browse-product-category-tag">
            {product.category}
          </span>

          <span className="browse-product-posted-time">
            {product.posted}
          </span>

        </div>


        {/* =========================
            ACTION: BUY NOW
        ========================= */}

        <div className="browse-product-actions">

          <button
            className="browse-product-btn-buy"
            onClick={() => onBuyNow(product.id)}
          >
            <FaBolt />
            Buy Now
          </button>

        </div>

      </div>

    </article>

  );
}

export default BrowseProductCard;