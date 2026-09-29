import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginRequired.css";

/**
 * Reusable popup that tells a guest user they must log in / sign up
 * before they can view Categories, Products, or any protected page.
 *
 * Props:
 *  - isOpen: boolean -> controls visibility
 *  - onClose: function -> called when user closes the modal (backdrop click / X button)
 */
function LoginRequired({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const goTo = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="auth-modal-icon">🔒</div>

        <h3 className="auth-modal-title">Login Required</h3>
        <p className="auth-modal-text">
          Please login or create an account to view this page.
        </p>

        <div className="auth-modal-actions">
          <button
            className="auth-modal-login-btn"
            onClick={() => goTo("/login")}
          >
            Login
          </button>
          <button
            className="auth-modal-signup-btn"
            onClick={() => goTo("/signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginRequired;
