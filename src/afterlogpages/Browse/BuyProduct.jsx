import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

import { useNavigate, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaClock,
  FaStar,
  FaShieldAlt,
  FaPaperPlane,
  FaCheckCircle,
  FaUserCircle,
  FaTag,
  FaQuoteLeft,
  FaHandshake,
  FaCalendarAlt,
} from "react-icons/fa";

import { browseProductData } from "./BrowseProducts";

import "./BuyProduct.css";

// import Navbar from "../../components/Navbar";
// import Sidebar from "../../components/Sidebar";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";



// ================================
// DUMMY SELLER DATA
// ================================
// Real seller info will come from the backend later.
// For now we just rotate through a few dummy sellers
// based on the product id, so every product "belongs"
// to someone.

const dummySellersList = [
  {
    id: 101,
    name: "Rohan Mehta",
    initials: "RM",
    rating: 4.8,
    totalDeals: 12,
    memberSince: "Jan 2025",
  },
  {
    id: 102,
    name: "Priya Sharma",
    initials: "PS",
    rating: 4.6,
    totalDeals: 8,
    memberSince: "Aug 2024",
  },
  {
    id: 103,
    name: "Aman Verma",
    initials: "AV",
    rating: 4.9,
    totalDeals: 21,
    memberSince: "Mar 2024",
  },
  {
    id: 104,
    name: "Sneha Kulkarni",
    initials: "SK",
    rating: 4.7,
    totalDeals: 15,
    memberSince: "Nov 2024",
  },
];


// ================================
// DUMMY REVIEWS DATA
// ================================
// Placeholder reviews for the seller. Real reviews will
// come from the backend later — for now these just rotate
// so every seller "has" some feedback to show.

const dummyReviewsList = [
  {
    id: 1,
    reviewer: "Ananya Gupta",
    rating: 5,
    text: "Item was exactly as described, smooth handover on campus.",
  },
  {
    id: 2,
    reviewer: "Karan Singh",
    rating: 4,
    text: "Good condition, seller replied quickly to my questions.",
  },
  {
    id: 3,
    reviewer: "Meera Iyer",
    rating: 5,
    text: "Easy deal, would buy from this seller again.",
  },
];


// ================================
// MAIN COMPONENT
// ================================

function BuyProduct() {

  const navigate = useNavigate();
  const { productId } = useParams();

  // Find the product from the same dummy data used on Browse Products
  const product = browseProductData.find(
    (item) => item.id === Number(productId)
  );

  // Pick a dummy seller based on the product id
  const buyProductSeller =
    dummySellersList[
      product ? product.id % dummySellersList.length : 0
    ];


  // Buy now confirmation (dummy, no real payment yet)
  const [buyProductOrderConfirmed, setBuyProductOrderConfirmed] =
    useState(false);

  // Message box to seller
  const [buyProductBuyerMessage, setBuyProductBuyerMessage] =
    useState(
      product
        ? `Hi, I'm interested in your "${product.name}". Is it still available?`
        : ""
    );

  const [buyProductMessageSent, setBuyProductMessageSent] =
    useState(false);

  // Pickup arrangement (students meet in person to
  // exchange the item — admin only handles the payment).
  const [buyProductPickupSpot, setBuyProductPickupSpot] =
  useState("");

const [buyProductPickupDate, setBuyProductPickupDate] =
  useState("");

const [buyProductPickupTime, setBuyProductPickupTime] =
  useState("");

  const [buyProductPickupConfirmed, setBuyProductPickupConfirmed] =
  useState(false);
  

const [buyProductShowPaymentQR, setBuyProductShowPaymentQR] =
  useState(false);

const [buyProductPaymentSubmitted, setBuyProductPaymentSubmitted] =
  useState(false);

const [buyProductPaymentProof, setBuyProductPaymentProof] =
  useState(null);

const [buyProductTransactionId, setBuyProductTransactionId] =
  useState("");

const [buyProductPaymentMessage, setBuyProductPaymentMessage] =
  useState("");

  // Step 1: "Proceed to Pay" click -> QR panel kholo
const handleBuyProductProceedToPay = () => {
  setBuyProductShowPaymentQR(true);
};

// Step 2: buyer confirms "maine QR se payment kar di"
const handleBuyProductSubmitPayment = () => {
  if (!buyProductPaymentProof) {
    setBuyProductPaymentMessage(
      "Please upload your payment screenshot."
    );
    return;
  }

  if (!buyProductTransactionId.trim()) {
    setBuyProductPaymentMessage(
      "Please enter your transaction ID."
    );
    return;
  }

  setBuyProductPaymentSubmitted(true);

  setBuyProductPaymentMessage(
    "Payment proof submitted successfully. Admin verification is pending."
  );
};

  // ================================
  // MESSAGE SELLER
  // ================================

  const handleBuyProductConfirmPickup = () => {
  if (!buyProductPickupSpot) {
    alert("Please select a meeting location.");
    return;
  }

  if (!buyProductPickupDate) {
    alert("Please select a pickup date.");
    return;
  }

  if (!buyProductPickupTime) {
    alert("Please select a pickup time.");
    return;
  }

  setBuyProductPickupConfirmed(true);
};


// ================================
// MESSAGE SELLER
// ================================

const handleBuyProductSendMessage = () => {

  if (!buyProductBuyerMessage.trim()) {
    return;
  }

  setBuyProductMessageSent(true);

  const pickupLine =
    buyProductPickupSpot ||
    buyProductPickupDate ||
    buyProductPickupTime
      ? `\n\nProposed pickup: ${
          buyProductPickupSpot || "campus (spot TBD)"
        }${
          buyProductPickupDate
            ? `, ${buyProductPickupDate}`
            : ""
        }${
          buyProductPickupTime
            ? `, ${buyProductPickupTime}`
            : ""
        }`
      : "";

  const fullBuyerMessage =
    `${buyProductBuyerMessage}${pickupLine}`;

  navigate(`/messages/${buyProductSeller.id}`, {
    state: {
      product,
      seller: buyProductSeller,
      message: fullBuyerMessage,
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
      <Navbar/>
      <Sidebar/>

      <main className="buy-product-page">

        <section className="buy-product-content">

          <div className="buy-product-not-found">

            <h2>
              Product not found
            </h2>

            <p>
              This listing may have been removed or the link
              is incorrect.
            </p>

            <button
              onClick={() => navigate("/browse")}
            >
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


        {/* =================================
            BACK LINK
        ================================= */}

        <button
          className="buy-product-back-link"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          Back to results
        </button>


        {/* =================================
            MAIN LAYOUT
        ================================= */}

        <div className="buy-product-layout">


          {/* =================================
              LEFT: PRODUCT DETAILS
          ================================= */}

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
              RIGHT: PURCHASE + MESSAGE PANEL
          ================================= */}

          <aside className="buy-product-side-column">

            {/* Buy Now / order summary */}

            <div className="buy-product-summary-card">

              <h2>
                Order Summary
              </h2>

              <div className="buy-product-summary-row">

                <span>Item price</span>

                <span>
                  ₹{product.price.toLocaleString("en-IN")}
                </span>

              </div>

              <div className="buy-product-summary-row">

                <span>Platform fee</span>

                <span>₹0</span>

              </div>

              <div className="buy-product-summary-total">

                <span>Total</span>

                <span>
                  ₹{product.price.toLocaleString("en-IN")}
                </span>

              </div>

              {!buyProductShowPaymentQR ? (

                <button
                  className="buy-product-confirm-button"
                  onClick={handleBuyProductProceedToPay}
                >
                  Proceed to Pay
                </button>

              ) : !buyProductPaymentSubmitted ? (

  <div className="buy-product-payment-box">

    <div className="buy-product-qr-box">

      {/* <img
        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=kushwaha.anuj@ptyes%26pn=CampusXchange%26am=${product.price}`}
        alt="CampusXchange Admin Payment QR"
      /> */}

      <QRCodeSVG
  value={`upi://pay?pa=kushwaha.anuj@ptyes&pn=CampusXchange&am=${product.price}`}
  size={180}
/>

      <p className="buy-product-qr-upi">
        UPI ID: <strong>kushwaha.anuj@ptyes</strong>
      </p>

      <p className="buy-product-qr-note">
        Pay the amount to the CampusXchange admin.
        The seller will receive the payment only after
        the transaction is verified.
      </p>

    </div>


    {/* PAYMENT PROOF */}

    <div className="buy-product-payment-proof">

      <label>
        Payment Screenshot
      </label>

      <input
        type="file"
        accept="image/png,image/jpeg"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (!file) return;

          if (file.size > 5 * 1024 * 1024) {
            setBuyProductPaymentMessage(
              "Payment screenshot must be 5MB or less."
            );
            return;
          }

          setBuyProductPaymentProof(file);
          setBuyProductPaymentMessage("");
        }}
      />

      {buyProductPaymentProof && (
        <p className="buy-product-file-success">
          ✓ {buyProductPaymentProof.name}
        </p>
      )}

    </div>


    {/* TRANSACTION ID */}

    <div className="buy-product-payment-proof">

      <label>
        Transaction ID / UTR Number
      </label>

      <input
        type="text"
        value={buyProductTransactionId}
        onChange={(e) => {
          setBuyProductTransactionId(e.target.value);
          setBuyProductPaymentMessage("");
        }}
        placeholder="Enter transaction ID / UTR"
      />

    </div>


    {buyProductPaymentMessage && (
      <p className="buy-product-payment-message">
        {buyProductPaymentMessage}
      </p>
    )}


    <button
      className="buy-product-confirm-button"
      onClick={handleBuyProductSubmitPayment}
    >
      Submit Payment Proof
    </button>

  </div>

              ) : (
  <div className="buy-product-pending-box">
    <FaClock />
    <div>
      <strong>Payment Verification Pending</strong>
      <p>
        Your payment proof has been submitted successfully.
        Admin will verify your payment before the order is confirmed.
      </p>
    </div>
  </div>
)}

              <div className="buy-product-safety-note">

                <FaShieldAlt />

                <span>
                  Always meet on campus and inspect the item
                  before paying.
                </span>

              </div>

            </div>


            {/* Pickup arrangement — students meet in person,
                admin only handles payment/verification */}

            {/* Pickup Details */}

<div className="buy-product-message-card">

  <h2>
    <FaHandshake style={{ marginRight: 6 }} />
    Pickup Details
  </h2>

  <p className="buy-product-message-subtext">
    Choose a safe campus location and your preferred
    date and time to meet the seller.
  </p>

  <label className="buy-product-pickup-label">
    Meeting Location
  </label>

  <select
    className="buy-product-pickup-input"
    value={buyProductPickupSpot}
    onChange={(e) =>
      setBuyProductPickupSpot(e.target.value)
    }
  >
    <option value="">Select campus location</option>
    <option value="Main Gate">Main Gate</option>
    <option value="College Library">College Library</option>
    <option value="College Canteen">College Canteen</option>
    <option value="Admin Block">Admin Block</option>
    <option value="Hostel Gate">Hostel Gate</option>
    <option value="Parking Area">Parking Area</option>
    <option value="Department Building">
      Department Building
    </option>
    <option value="Other">Other</option>
  </select>

  <label className="buy-product-pickup-label">
    Pickup Date
  </label>

  <div className="buy-product-date-wrapper">
    <FaCalendarAlt className="buy-product-date-icon" />

    <input
      type="date"
      className="buy-product-pickup-input buy-product-date-input"
      value={buyProductPickupDate}
      onChange={(e) =>
        setBuyProductPickupDate(e.target.value)
      }
    />
  </div>

  <label className="buy-product-pickup-label">
    Pickup Time
  </label>

  <div className="buy-product-time-wrapper">
    <FaClock className="buy-product-time-icon" />

    <input
      type="time"
      className="buy-product-pickup-input buy-product-time-input"
      value={buyProductPickupTime}
      onChange={(e) =>
        setBuyProductPickupTime(e.target.value)
      }
    />
  </div>
<button
  type="button"
  className="buy-product-confirm-pickup-button"
  onClick={handleBuyProductConfirmPickup}
>
  <FaCheckCircle />
  {buyProductPickupConfirmed
    ? "Pickup Details Confirmed"
    : "Confirm Pickup Details"}
</button>
</div>

            {/* Message seller box */}

            <div className="buy-product-message-card">

              <h2>
                Message Seller
              </h2>

              <p className="buy-product-message-subtext">
                Ask {buyProductSeller.name.split(" ")[0]} a
                question about this item before you buy.
              </p>

              <textarea
                rows={4}
                value={buyProductBuyerMessage}
                onChange={(e) =>
                  setBuyProductBuyerMessage(e.target.value)
                }
                placeholder="Type your message..."
              />

              <button
                className="buy-product-message-button"
                onClick={handleBuyProductSendMessage}
              >
                <FaPaperPlane />
                {buyProductMessageSent
                  ? "Message Sent"
                  : "Send Message"}
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
