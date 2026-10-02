import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaClock,
  FaStar,
  FaShieldAlt,
  FaPaperPlane,
  FaUserCircle,
  FaTag,
  FaQuoteLeft,
  FaHandshake,
  FaCalendarAlt,
  FaComments,
} from "react-icons/fa";

import { browseProductData } from "./BrowseProducts";

import "./BuyProduct.css";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


// ================================
// DUMMY SELLER DATA
// ================================
// Real seller info will come from the backend later.

const dummySellersList = [
  { id: 101, name: "Rohan Mehta", initials: "RM", rating: 4.8, totalDeals: 12, memberSince: "Jan 2025" },
  { id: 102, name: "Priya Sharma", initials: "PS", rating: 4.6, totalDeals: 8, memberSince: "Aug 2024" },
  { id: 103, name: "Aman Verma", initials: "AV", rating: 4.9, totalDeals: 21, memberSince: "Mar 2024" },
  { id: 104, name: "Sneha Kulkarni", initials: "SK", rating: 4.7, totalDeals: 15, memberSince: "Nov 2024" },
];

const dummyReviewsList = [
  { id: 1, reviewer: "Ananya Gupta", rating: 5, text: "Item was exactly as described, smooth handover on campus." },
  { id: 2, reviewer: "Karan Singh", rating: 4, text: "Good condition, seller replied quickly to my questions." },
  { id: 3, reviewer: "Meera Iyer", rating: 5, text: "Easy deal, would buy from this seller again." },
];


// ================================
// MAIN COMPONENT
// ================================

function BuyProduct() {

  const navigate = useNavigate();
  const { productId } = useParams();

  const product = browseProductData.find(
    (item) => item.id === Number(productId)
  );

  const buyProductSeller =
    dummySellersList[product ? product.id % dummySellersList.length : 0];

  // P2P deal: buyer chats with seller, agrees price + pickup there.
  const [buyProductBuyerMessage, setBuyProductBuyerMessage] = useState(
    product
      ? `Hi, I'm interested in your "${product.name}". Is it still available?`
      : ""
  );

  const [buyProductOfferPrice, setBuyProductOfferPrice] = useState("");
  const [buyProductPickupSpot, setBuyProductPickupSpot] = useState("");
  const [buyProductPickupDate, setBuyProductPickupDate] = useState("");
  const [buyProductPickupTime, setBuyProductPickupTime] = useState("");
  const [buyProductError, setBuyProductError] = useState("");


  // ================================
  // START CHAT WITH SELLER
  // ================================

  const handleBuyProductStartChat = () => {

    if (!buyProductBuyerMessage.trim()) {
      setBuyProductError("Please write a message to the seller.");
      return;
    }

    const offer = Number(buyProductOfferPrice);

    if (buyProductOfferPrice && (!Number.isFinite(offer) || offer <= 0)) {
      setBuyProductError("Please enter a valid offer price.");
      return;
    }

    setBuyProductError("");

    let fullMessage = buyProductBuyerMessage.trim();

    if (buyProductOfferPrice) {
      fullMessage += `\n\nMy offer: ₹${offer.toLocaleString("en-IN")} (listed at ₹${product.price.toLocaleString("en-IN")})`;
    }

    if (buyProductPickupSpot || buyProductPickupDate || buyProductPickupTime) {
      fullMessage +=
        `\n\nProposed pickup: ${buyProductPickupSpot || "campus (spot TBD)"}` +
        `${buyProductPickupDate ? `, ${buyProductPickupDate}` : ""}` +
        `${buyProductPickupTime ? `, ${buyProductPickupTime}` : ""}`;
    }

    navigate(`/messages/${buyProductSeller.id}`, {
      state: {
        product,
        seller: buyProductSeller,
        message: fullMessage,
        offerPrice: buyProductOfferPrice ? offer : null,
        pickupSpot: buyProductPickupSpot,
        pickupDate: buyProductPickupDate,
        pickupTime: buyProductPickupTime,
      },
    });
  };


  // ================================
  // PRODUCT NOT FOUND
  // ================================

  if (!product) {
    return (
      <>
        <Navbar />
        <Sidebar />
        <main className="buy-product-page">
          <section className="buy-product-content">
            <div className="buy-product-not-found">
              <h2>Product not found</h2>
              <p>This listing may have been removed or the link is incorrect.</p>
              <button onClick={() => navigate("/browse")}>
                <FaArrowLeft />
                Back to Browse
              </button>
            </div>
          </section>
        </main>
      </>
    );
  }


  // ================================
  // MAIN RENDER
  // ================================

  return (
    <>
    <Navbar/>
    <Sidebar/>

    <main className="buy-product-page">

      <section className="buy-product-content">

        <button
          className="buy-product-back-link"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          Back to results
        </button>

        <div className="buy-product-layout">

          <div className="buy-product-details-column">

            <div className="buy-product-image-wrap">

              <img
                src={product.image}
                alt={product.name}
              />

              <span className="buy-product-condition-badge">
                {product.condition}
              </span>

            </div>


            <div className="buy-product-info-card">

              <span className="buy-product-category-tag">
                <FaTag />
                {product.category}
              </span>

              <h1>
                {product.name}
              </h1>

              <div className="buy-product-price">
                ₹{product.price.toLocaleString("en-IN")}
              </div>

              <div className="buy-product-meta-row">

                <span>
                  <FaMapMarkerAlt />
                  {product.location}
                </span>

                <span>
                  <FaClock />
                  Posted {product.posted}
                </span>

              </div>

              <p className="buy-product-description">
                This is a {product.condition.toLowerCase()}{" "}
                {product.name}, listed under{" "}
                {product.category}. Pickup available at{" "}
                {product.location}. Message the seller below
                for more details, photos or to negotiate the
                price before buying.
              </p>

            </div>


            {/* =================================
                SELLER CARD
            ================================= */}

            <div className="buy-product-seller-card">

              <div className="buy-product-seller-avatar">
                {buyProductSeller.initials}
              </div>

              <div className="buy-product-seller-info">

                <h3>
                  {buyProductSeller.name}
                </h3>

                <div className="buy-product-seller-rating">

                  <FaStar />
                  {buyProductSeller.rating}

                  <span>
                    · {buyProductSeller.totalDeals} deals
                  </span>

                </div>

                <p>
                  Member since {buyProductSeller.memberSince}
                </p>

              </div>

              <FaUserCircle
                className="buy-product-seller-icon"
              />

            </div>


            {/* =================================
                SELLER REVIEWS (DUMMY)
            ================================= */}

            <div className="buy-product-reviews-card">

              <h2>
                Seller Reviews
              </h2>

              {dummyReviewsList.map((review) => (

                <div
                  className="buy-product-review-item"
                  key={review.id}
                >

                  <FaQuoteLeft className="buy-product-review-quote-icon" />

                  <div className="buy-product-review-body">

                    <div className="buy-product-review-top">

                      <span className="buy-product-review-name">
                        {review.reviewer}
                      </span>

                      <span className="buy-product-review-stars">
                        <FaStar />
                        {review.rating}
                      </span>

                    </div>

                    <p>
                      {review.text}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>


          {/* =================================
              RIGHT: CHAT / DEAL PANEL (P2P)
          ================================= */}

          <aside className="buy-product-side-column">

            {/* Price + how it works */}

            <div className="buy-product-summary-card">

              <h2>Deal with Seller</h2>

              <div className="buy-product-summary-row">
                <span>Asking price</span>
                <span>₹{product.price.toLocaleString("en-IN")}</span>
              </div>

              <div className="buy-product-summary-row">
                <span>Platform fee</span>
                <span>₹0</span>
              </div>

              <p className="buy-product-peer-note">
                <FaComments />
                Chat with the seller, agree on the price and
                meeting spot, then pay the seller directly when
                you meet and inspect the item.
              </p>

              <div className="buy-product-safety-note">
                <FaShieldAlt />
                <span>
                  Always meet on campus and inspect the item
                  before paying. Don't pay in advance.
                </span>
              </div>

            </div>


            {/* Optional pickup proposal (sent with first message) */}

            <div className="buy-product-message-card">

              <h2>
                <FaHandshake style={{ marginRight: 6 }} />
                Propose Pickup (optional)
              </h2>

              <p className="buy-product-message-subtext">
                You can also decide this later in the chat.
              </p>

              <label className="buy-product-pickup-label">Meeting Location</label>

              <select
                className="buy-product-pickup-input"
                value={buyProductPickupSpot}
                onChange={(e) => setBuyProductPickupSpot(e.target.value)}
              >
                <option value="">Select campus location</option>
                <option value="Main Gate">Main Gate</option>
                <option value="College Library">College Library</option>
                <option value="College Canteen">College Canteen</option>
                <option value="Admin Block">Admin Block</option>
                <option value="Hostel Gate">Hostel Gate</option>
                <option value="Parking Area">Parking Area</option>
                <option value="Department Building">Department Building</option>
                <option value="Other">Other</option>
              </select>

              <label className="buy-product-pickup-label">Pickup Date</label>

              <div className="buy-product-date-wrapper">
                <FaCalendarAlt className="buy-product-date-icon" />
                <input
                  type="date"
                  className="buy-product-pickup-input buy-product-date-input"
                  value={buyProductPickupDate}
                  onChange={(e) => setBuyProductPickupDate(e.target.value)}
                />
              </div>

              <label className="buy-product-pickup-label">Pickup Time</label>

              <div className="buy-product-time-wrapper">
                <FaClock className="buy-product-time-icon" />
                <input
                  type="time"
                  className="buy-product-pickup-input buy-product-time-input"
                  value={buyProductPickupTime}
                  onChange={(e) => setBuyProductPickupTime(e.target.value)}
                />
              </div>

            </div>


            {/* Chat with seller */}

            <div className="buy-product-message-card">

              <h2>Chat with Seller</h2>

              <p className="buy-product-message-subtext">
                Ask {buyProductSeller.name.split(" ")[0]} about
                this item or make an offer.
              </p>

              <label className="buy-product-pickup-label">
                Your Offer (optional)
              </label>

              <input
                type="number"
                min="1"
                className="buy-product-pickup-input"
                value={buyProductOfferPrice}
                onChange={(e) => {
                  setBuyProductOfferPrice(e.target.value);
                  setBuyProductError("");
                }}
                placeholder={`Listed at ₹${product.price.toLocaleString("en-IN")}`}
              />

              <textarea
                rows={4}
                value={buyProductBuyerMessage}
                onChange={(e) => {
                  setBuyProductBuyerMessage(e.target.value);
                  setBuyProductError("");
                }}
                placeholder="Type your message..."
              />

              {buyProductError && (
                <p className="buy-product-payment-message" style={{ marginTop: 10 }}>
                  {buyProductError}
                </p>
              )}

              <button
                className="buy-product-confirm-button"
                style={{ marginTop: 12 }}
                onClick={handleBuyProductStartChat}
              >
                <FaPaperPlane style={{ marginRight: 8 }} />
                Start Chat
              </button>

            </div>

          </aside>

        </div>

      </section>

    </main>
    </>
  );

}

export default BuyProduct;
