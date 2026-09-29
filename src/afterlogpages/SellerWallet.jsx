import React, { useMemo, useState } from "react";
import "./SellerWallet.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const initialPayments = [
  {
    id: 1,
    item: "Java Programming Book",
    buyer: "Rahul",
    amount: 799,
    soldDate: "2026-09-18",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    item: "Scientific Calculator",
    buyer: "Neha",
    amount: 1200,
    soldDate: "2026-09-16",
    image:
      "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    item: "Study Table",
    buyer: "Aditya",
    amount: 1500,
    soldDate: "2026-09-10",
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6b1?auto=format&fit=crop&w=300&q=80",
  },
];

const initialHistory = [
  {
    id: 1,
    item: "Laptop Bag",
    date: "2026-09-12",
    amount: 1299,
    status: "Paid",
  },
  {
    id: 2,
    item: "Scientific Calculator",
    date: "2026-09-05",
    amount: 1200,
    status: "Paid",
  },
  {
    id: 3,
    item: "Textbook (AI)",
    date: "2026-08-28",
    amount: 999,
    status: "Paid",
  },
  {
    id: 4,
    item: "Study Table",
    date: "2026-08-10",
    amount: 1500,
    status: "Pending",
  },
  {
    id: 5,
    item: "Backpack",
    date: "2026-08-02",
    amount: 849,
    status: "Paid",
  },
];

function getDaysDifference(date) {
  const today = new Date();

  const sold = new Date(date);

  today.setHours(0, 0, 0, 0);
  sold.setHours(0, 0, 0, 0);

  return Math.floor((today - sold) / (1000 * 60 * 60 * 24));
}

function getPaymentStatus(soldDate) {
  const daysPassed = getDaysDifference(soldDate);

  if (daysPassed >= 7) {
    return {
      eligible: true,
      daysRemaining: 0,
      progress: 100,
    };
  }

  return {
    eligible: false,
    daysRemaining: 7 - daysPassed,
    progress: Math.min((daysPassed / 7) * 100, 100),
  };
}

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function SellerWallet() {
  const [upi, setUpi] = useState("anuj@oksbi");

  const [payments] = useState(initialPayments);

  const [history, setHistory] = useState(initialHistory);

  const [showAllHistory, setShowAllHistory] = useState(false);

  const [selectedPayment, setSelectedPayment] = useState(null);

  const [showUpiModal, setShowUpiModal] = useState(false);

  const [upiInput, setUpiInput] = useState(upi);

  const [upiError, setUpiError] = useState("");

  /*
   * Calculate pending amount dynamically.
   */
  const pendingBalance = useMemo(() => {
    return payments
      .filter((payment) => !getPaymentStatus(payment.soldDate).eligible)
      .reduce((total, payment) => total + payment.amount, 0);
  }, [payments]);

  /*
   * Total earnings.
   */
  const totalEarnings = useMemo(() => {
    const pending = payments.reduce(
      (total, payment) => total + payment.amount,
      0
    );

    const paid = history
      .filter((item) => item.status === "Paid")
      .reduce((total, item) => total + item.amount, 0);

    return pending + paid;
  }, [payments, history]);

  /*
   * Eligible amount.
   */
  const availableBalance = useMemo(() => {
    return payments
      .filter((payment) => getPaymentStatus(payment.soldDate).eligible)
      .reduce((total, payment) => total + payment.amount, 0);
  }, [payments]);

  /*
   * Save UPI.
   */
  const saveUpi = () => {
    const trimmed = upiInput.trim();

    if (!trimmed) {
      setUpiError("UPI ID is required.");
      return;
    }

    if (!/^[\w.-]+@[\w.-]+$/.test(trimmed)) {
      setUpiError("Enter a valid UPI ID.");
      return;
    }

    setUpi(trimmed);
    setUpiError("");
    setShowUpiModal(false);
  };

  /*
   * Copy UPI.
   */
  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(upi);
      alert("UPI ID copied!");
    } catch {
      alert("Unable to copy UPI ID.");
    }
  };

  const visibleHistory = showAllHistory
    ? history
    : history.slice(0, 5);

  return (
    <>
    <Navbar />
    <Sidebar />
    <div className="seller-wallet">
      {/* ================= HERO ================= */}

      <section className="wallet-hero">
        <div className="hero-content">
          <span className="hero-label">SELLER WALLET</span>

          <h1>
            Your Earnings,
            <br />
            Our Priority
          </h1>

          <p>
            Payments for your sold items are released by admin
            after the 7-day holding period.
          </p>
        </div>

        <div className="hero-wallet-icon">
          <div className="wallet-illustration">
            ₹
          </div>
        </div>
      </section>

      {/* ================= SUMMARY CARDS ================= */}

      <section className="wallet-summary">

        <WalletSummaryCard
          icon="💳"
          title="Available Balance"
          amount={availableBalance}
          type="available"
          subtitle="Ready for payout (after 7 days)"
        />

        <WalletSummaryCard
          icon="⏳"
          title="Pending Balance"
          amount={pendingBalance}
          type="pending"
          subtitle="In 7-day holding period"
        />

        <WalletSummaryCard
          icon="💰"
          title="Total Earnings"
          amount={totalEarnings}
          type="earnings"
          subtitle="Lifetime earnings"
        />

      </section>

      {/* ================= MAIN GRID ================= */}

      <section className="wallet-main-grid">

        {/* LEFT */}

        <div className="wallet-left">

          <PendingPayments
            payments={payments}
            onSelect={setSelectedPayment}
          />

        </div>

        {/* RIGHT */}

        <div className="wallet-right">

          {/* UPI */}

          <UPICard
            upi={upi}
            onEdit={() => {
              setUpiInput(upi);
              setShowUpiModal(true);
            }}
            onCopy={copyUpi}
          />

          {/* History */}

          <PayoutHistory
            history={visibleHistory}
            showAll={showAllHistory}
            toggleShowAll={() =>
              setShowAllHistory((prev) => !prev)
            }
          />

          {/* How it works */}

          <HowItWorks />

        </div>

      </section>

      {/* ================= UPI MODAL ================= */}

      {showUpiModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowUpiModal(false)}
        >
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="modal-header">
              <div>
                <h2>Update UPI ID</h2>
                <p>
                  This UPI will be used by admin for payouts.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowUpiModal(false)}
              >
                ×
              </button>
            </div>

            <label>UPI ID</label>

            <input
              type="text"
              value={upiInput}
              onChange={(e) => {
                setUpiInput(e.target.value);
                setUpiError("");
              }}
              placeholder="example@upi"
            />

            {upiError && (
              <div className="input-error">
                {upiError}
              </div>
            )}

            <div className="modal-actions">

              <button
                className="cancel-btn"
                onClick={() => setShowUpiModal(false)}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={saveUpi}
              >
                Save UPI
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ================= PAYMENT DETAILS MODAL ================= */}

      {selectedPayment && (
        <PaymentDetailsModal
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
        />
      )}

    </div>
    </>
  );
}


/* =========================================================
   SUMMARY CARD
========================================================= */

function WalletSummaryCard({
  icon,
  title,
  amount,
  subtitle,
  type,
}) {
  return (
    <div className={`summary-card ${type}`}>

      <div className="summary-icon">
        {icon}
      </div>

      <div className="summary-info">

        <div className="summary-title">
          {title}
        </div>

        <div className="summary-amount">
          ₹{amount.toLocaleString("en-IN")}
        </div>

        <div className="summary-subtitle">
          {subtitle}
        </div>

      </div>

      <span className="summary-arrow">
        →
      </span>

    </div>
  );
}


/* =========================================================
   PENDING PAYMENTS
========================================================= */

function PendingPayments({
  payments,
  onSelect,
}) {
  return (
    <div className="section-card">

      <div className="section-header">

        <div>
          <h2>Pending Payments</h2>

          <p>
            These payments will be released after
            7 days from the sale date.
          </p>
        </div>

        <span className="pending-count">
          ⏱ {payments.length} Pending
        </span>

      </div>

      <div className="pending-list">

        {payments.map((payment) => {

          const status = getPaymentStatus(
            payment.soldDate
          );

          return (
            <div
              className="pending-payment"
              key={payment.id}
              onClick={() => onSelect(payment)}
            >

              <img
                src={payment.image}
                alt={payment.item}
              />

              <div className="payment-info">

                <h3>
                  {payment.item}
                </h3>

                <strong>
                  Sold for ₹
                  {payment.amount.toLocaleString("en-IN")}
                </strong>

                <div className="payment-meta">
                  <span>👤 Buyer: {payment.buyer}</span>

                  <span>
                    📅 Sold on: {formatDate(payment.soldDate)}
                  </span>
                </div>

              </div>

              <div className="payment-progress">

                <div className="days-pill">
                  {status.eligible
                    ? "Ready for payout"
                    : `⏱ ${status.daysRemaining} days remaining`}
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${status.progress}%`,
                    }}
                  />
                </div>

                <small>
                  {status.eligible
                    ? "7-day holding period completed"
                    : `Payment release: ${formatDate(
                        new Date(
                          new Date(payment.soldDate).getTime() +
                            7 * 24 * 60 * 60 * 1000
                        )
                      )}`}
                </small>

              </div>

              <div
                className={`payment-status ${
                  status.eligible
                    ? "ready"
                    : "pending"
                }`}
              >
                {status.eligible
                  ? "Ready"
                  : "Pending"}
              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}


/* =========================================================
   UPI CARD
========================================================= */

function UPICard({
  upi,
  onEdit,
  onCopy,
}) {
  return (
    <div className="side-card">

      <div className="side-card-title">
        <div className="side-icon">
          ↗
        </div>

        <h2>UPI Details</h2>
      </div>

      <div className="upi-divider" />

      <span className="upi-label">
        UPI ID
      </span>

      <div className="upi-row">

        <strong>
          {upi}
        </strong>

        <button
          className="copy-button"
          onClick={onCopy}
          title="Copy UPI"
        >
          ⧉
        </button>

        <button
          className="edit-button"
          onClick={onEdit}
        >
          Edit
        </button>

      </div>

      <div className="verified-row">

        <span className="verified-icon">
          ✓
        </span>

        <div>
          <small>Account Status</small>
          <strong>Verified</strong>
        </div>

      </div>

      <div className="upi-info">
        ℹ️
        <span>
          Payments will be sent by admin
          after the 7-day holding period.
        </span>
      </div>

    </div>
  );
}


/* =========================================================
   PAYOUT HISTORY
========================================================= */

function PayoutHistory({
  history,
  showAll,
  toggleShowAll,
}) {
  return (
    <div className="side-card">

      <div className="history-header">

        <h2>
          Payout History
        </h2>

        <button
          onClick={toggleShowAll}
        >
          {showAll ? "Show Less" : "View All"}
        </button>

      </div>

      <div className="history-table">

        <div className="history-heading">
          <span>Item</span>
          <span>Date</span>
          <span>Amount</span>
          <span>Status</span>
        </div>

        {history.map((item) => (

          <div
            className="history-row"
            key={item.id}
          >

            <span className="history-item">
              {item.item}
            </span>

            <span>
              {formatDate(item.date)}
            </span>

            <strong>
              ₹{item.amount.toLocaleString("en-IN")}
            </strong>

            <span
              className={`history-status ${
                item.status === "Paid"
                  ? "paid"
                  : "history-pending"
              }`}
            >
              {item.status}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}


/* =========================================================
   HOW IT WORKS
========================================================= */

function HowItWorks() {
  const steps = [
    "You sell an item",
    "Order is completed",
    "Payment goes to pending balance",
    "After 7 days, amount becomes eligible for payout",
    "Admin processes the payment to your UPI",
  ];

  return (
    <div className="how-card">

      <h2>
        <span>ⓘ</span>
        How it works?
      </h2>

      <div className="steps">

        {steps.map((step, index) => (

          <div
            className="step"
            key={step}
          >

            <div className="step-number">
              {index + 1}
            </div>

            <p>
              {step}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}


/* =========================================================
   PAYMENT DETAILS MODAL
========================================================= */

function PaymentDetailsModal({
  payment,
  onClose,
}) {
  const status = getPaymentStatus(
    payment.soldDate
  );

  const releaseDate = new Date(
    new Date(payment.soldDate).getTime() +
      7 * 24 * 60 * 60 * 1000
  );

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >

      <div
        className="modal-card payment-modal"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="modal-header">

          <div>
            <span className="modal-label">
              PAYMENT DETAILS
            </span>

            <h2>
              {payment.item}
            </h2>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <img
          className="modal-product-image"
          src={payment.image}
          alt={payment.item}
        />

        <div className="detail-grid">

          <div>
            <span>Buyer</span>
            <strong>{payment.buyer}</strong>
          </div>

          <div>
            <span>Sale Amount</span>
            <strong>
              ₹{payment.amount.toLocaleString("en-IN")}
            </strong>
          </div>

          <div>
            <span>Sold On</span>
            <strong>
              {formatDate(payment.soldDate)}
            </strong>
          </div>

          <div>
            <span>Release Date</span>
            <strong>
              {formatDate(releaseDate)}
            </strong>
          </div>

        </div>

        <div className="modal-progress">

          <div className="modal-progress-top">
            <span>7-day holding period</span>

            <strong>
              {status.eligible
                ? "Completed"
                : `${status.daysRemaining} days remaining`}
            </strong>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${status.progress}%`,
              }}
            />
          </div>

        </div>

        <button
          className="close-full-btn"
          onClick={onClose}
        >
          Done
        </button>

      </div>

    </div>
  );
}