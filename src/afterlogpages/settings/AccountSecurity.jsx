import React, { useState } from "react";
import {
  FaLock,
  FaShieldAlt,
  FaClock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaSignOutAlt,
  FaTrashAlt,
} from "react-icons/fa";

import "./AccountSecurity.css";
import Navbar from "../components/Navbar";
import SettingsSidebar from "../components/SettingsSidebar";

const AccountSecurity = () => {
  // =========================
  // PASSWORD STATES
  // =========================
  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  // =========================
  // 2FA STATES
  // =========================
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorMethod, setTwoFactorMethod] =
    useState("email");

  // =========================
  // LOGIN ACTIVITY
  // =========================
  const [sessions, setSessions] = useState([
    {
      id: 1,
      device: "Chrome • Windows",
      type: "This device",
      location: "Gwalior, India",
      lastActive: "Now",
      current: true,
    },
    {
      id: 2,
      device: "Chrome • Android",
      type: "Mobile",
      location: "Gwalior, India",
      lastActive: "2 days ago",
      current: false,
    },
  ]);

  const [sessionMessage, setSessionMessage] = useState("");

  // =========================
  // DELETE ACCOUNT
  // =========================
  const [showDeleteBox, setShowDeleteBox] =
    useState(false);

  // =========================
  // PASSWORD STRENGTH
  // =========================
  const getPasswordStrength = () => {
    if (!newPassword) {
      return {
        text: "",
        className: "",
      };
    }

    if (newPassword.length < 6) {
      return {
        text: "Weak",
        className: "weak",
      };
    }

    if (
      newPassword.length >= 8 &&
      /[A-Z]/.test(newPassword) &&
      /[0-9]/.test(newPassword)
    ) {
      return {
        text: "Strong",
        className: "strong",
      };
    }

    return {
      text: "Medium",
      className: "medium",
    };
  };

  const passwordStrength = getPasswordStrength();

  // =========================
  // CHANGE PASSWORD
  // =========================
  const handleChangePassword = (e) => {
    e.preventDefault();

    setPasswordMessage("");
    setPasswordSuccess(false);

    if (!currentPassword.trim()) {
      setPasswordMessage("Please enter your current password.");
      return;
    }

    if (!newPassword.trim()) {
      setPasswordMessage("Please enter a new password.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMessage(
        "New password must contain at least 6 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessage(
        "New password and confirm password do not match."
      );
      return;
    }

    if (currentPassword === newPassword) {
      setPasswordMessage(
        "New password must be different from your current password."
      );
      return;
    }

    setPasswordSuccess(true);
    setPasswordMessage(
      "Password updated successfully."
    );

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // =========================
  // LOGOUT OTHER DEVICES
  // =========================
  const handleLogoutOtherDevices = () => {
    const otherSessions = sessions.filter(
      (session) => session.current
    );

    setSessions(otherSessions);

    setSessionMessage(
      "All other devices have been logged out successfully."
    );

    setTimeout(() => {
      setSessionMessage("");
    }, 3000);
  };

  // =========================
  // DELETE ACCOUNT
  // =========================
  const handleDeleteAccount = () => {
    alert(
      "Account deletion will be connected to the backend later."
    );

    setShowDeleteBox(false);
  };

  return (
  <>
    <Navbar />
    <SettingsSidebar />

    <SettingsSidebar activeItem="Account & Security" />

    <main className="account-security-page">

      {/* =========================
          PAGE HEADER
      ========================= */}

      {/* =========================
          PAGE HEADER
      ========================= */}

      {/* =========================
          PAGE HEADER
      ========================= */}
      <div className="security-page-header">

        <div className="security-header-icon">
          <FaShieldAlt />
        </div>

        <div>
          <h1>Account & Security</h1>

          <p>
            Manage your login credentials, security settings
            and account protection.
          </p>
        </div>

      </div>


      {/* =========================
          MAIN GRID
      ========================= */}
      <div className="security-grid">


        {/* =================================
            PASSWORD & LOGIN
        ================================= */}
        <section className="security-card password-card">

          <div className="security-card-heading">

            <div className="security-icon">
              <FaLock />
            </div>

            <div>
              <h2>Password & Login</h2>

              <p>
                Change your password to keep your
                account secure.
              </p>
            </div>

          </div>


          <form onSubmit={handleChangePassword}>

            {/* CURRENT PASSWORD */}
            <div className="security-field">

              <label>Current Password</label>

              <div className="password-input">

                <input
                  type={
                    showCurrentPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) =>
                    setCurrentPassword(e.target.value)
                  }
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowCurrentPassword(
                      !showCurrentPassword
                    )
                  }
                >
                  {showCurrentPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>


            {/* NEW PASSWORD */}
            <div className="security-field">

              <label>New Password</label>

              <div className="password-input">

                <input
                  type={
                    showNewPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowNewPassword(
                      !showNewPassword
                    )
                  }
                >
                  {showNewPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

              {passwordStrength.text && (
                <div
                  className={`password-strength ${passwordStrength.className}`}
                >
                  Password strength:
                  <strong>
                    {passwordStrength.text}
                  </strong>
                </div>
              )}

            </div>


            {/* CONFIRM PASSWORD */}
            <div className="security-field">

              <label>Confirm New Password</label>

              <div className="password-input">

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

            </div>


            <button
              type="submit"
              className="update-password-btn"
            >
              Update Password
            </button>


            {passwordMessage && (
              <div
                className={`password-message ${
                  passwordSuccess
                    ? "success"
                    : "error"
                }`}
              >
                {passwordSuccess ? (
                  <FaCheckCircle />
                ) : (
                  <FaExclamationCircle />
                )}

                <span>{passwordMessage}</span>
              </div>
            )}

          </form>


          <button
            className="forgot-password-btn"
            onClick={() =>
              alert(
                "Password reset flow will be connected with backend."
              )
            }
          >
            Forgot your password? <span>Reset it</span>
          </button>

        </section>



        {/* =================================
            TWO FACTOR AUTHENTICATION
        ================================= */}
        <section className="security-card two-factor-card">

          <div className="security-card-heading">

            <div className="security-icon">
              <FaShieldAlt />
            </div>

            <div>
              <h2>Two-Factor Authentication</h2>

              <p>
                Add an extra layer of security to
                your account.
              </p>
            </div>

          </div>


          <div className="two-factor-toggle-row">

            <span>
              Enable 2FA
            </span>

            <button
              type="button"
              className={`security-toggle ${
                twoFactorEnabled
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setTwoFactorEnabled(
                  !twoFactorEnabled
                )
              }
            >
              <span></span>
            </button>

          </div>


          <div className="method-title">
            Choose your preferred method
          </div>


          {/* EMAIL OTP */}
          <button
            type="button"
            className={`security-method ${
              twoFactorMethod === "email"
                ? "selected"
                : ""
            }`}
            onClick={() =>
              setTwoFactorMethod("email")
            }
          >

            <div className="method-icon">
              ✉
            </div>

            <div className="method-content">
              <strong>Email OTP</strong>

              <span>
                Receive a verification code on
                your registered email.
              </span>
            </div>

            <div className="radio-circle">
              {twoFactorMethod === "email" && (
                <span></span>
              )}
            </div>

          </button>


          {/* AUTHENTICATOR */}
          <button
            type="button"
            className={`security-method ${
              twoFactorMethod === "authenticator"
                ? "selected"
                : ""
            }`}
            onClick={() =>
              setTwoFactorMethod(
                "authenticator"
              )
            }
          >

            <div className="method-icon">
              🔐
            </div>

            <div className="method-content">
              <strong>Authenticator App</strong>

              <span>
                Use an authenticator application
                for additional security.
              </span>
            </div>

            <div className="radio-circle">
              {twoFactorMethod ===
                "authenticator" && (
                <span></span>
              )}
            </div>

          </button>


          <div className="security-info-box">

            <FaInfoCircle />

            <span>
              2FA settings are currently saved
              only in this interface. Backend
              integration can be connected later.
            </span>

          </div>

        </section>



        {/* =================================
            LOGIN ACTIVITY
        ================================= */}
        <section className="security-card login-activity-card">

          <div className="security-card-heading">

            <div className="security-icon">
              <FaClock />
            </div>

            <div>
              <h2>Login Activity</h2>

              <p>
                View devices that are currently
                logged into your account.
              </p>
            </div>

          </div>


          <div className="session-table">

            <div className="session-header">

              <span>Device</span>
              <span>Location</span>
              <span>Last Active</span>

            </div>


            {sessions.map((session) => (

              <div
                className="session-row"
                key={session.id}
              >

                <div className="session-device">

                  <div className="browser-circle">
                    🌐
                  </div>

                  <div>
                    <strong>
                      {session.device}
                    </strong>

                    <small>
                      {session.type}
                    </small>
                  </div>

                </div>


                <div className="session-location">
                  📍 {session.location}
                </div>


                <div className="session-active">

                  <span
                    className={
                      session.current
                        ? "active-dot"
                        : "inactive-dot"
                    }
                  ></span>

                  {session.lastActive}

                </div>

              </div>

            ))}

          </div>


          <div className="session-actions">

            <button
              className="view-activity-btn"
              onClick={() =>
                alert(
                  "Detailed login activity will be available after backend integration."
                )
              }
            >
              View All Activity
            </button>


            <button
              className="logout-devices-btn"
              onClick={handleLogoutOtherDevices}
              disabled={sessions.length <= 1}
            >
              <FaSignOutAlt />
              Log Out Other Devices
            </button>

          </div>


          {sessionMessage && (
            <div className="session-success">
              <FaCheckCircle />
              {sessionMessage}
            </div>
          )}

        </section>



        {/* =================================
            ACCOUNT PROTECTION
        ================================= */}
        <section className="security-card protection-card">

          <div className="security-card-heading">

            <div className="security-icon">
              <FaShieldAlt />
            </div>

            <div>
              <h2>Account Protection</h2>

              <p>
                Quick overview of your security
                status.
              </p>
            </div>

          </div>


          <div className="protection-items">


            {/* PASSWORD */}
            <div className="protection-item">

              <div className="protection-status success-status">
                <FaCheckCircle />
              </div>

              <div>
                <strong>Password</strong>

                <span>Protected</span>
              </div>

            </div>


            {/* 2FA */}
            <div className="protection-item">

              <div
                className={`protection-status ${
                  twoFactorEnabled
                    ? "success-status"
                    : "neutral-status"
                }`}
              >
                {twoFactorEnabled ? (
                  <FaCheckCircle />
                ) : (
                  <FaShieldAlt />
                )}
              </div>

              <div>
                <strong>2FA</strong>

                <span>
                  {twoFactorEnabled
                    ? "Enabled"
                    : "Not enabled"}
                </span>
              </div>

            </div>


            {/* ACTIVITY */}
            <div className="protection-item">

              <div className="protection-status success-status">
                <FaCheckCircle />
              </div>

              <div>
                <strong>Recent Activity</strong>

                <span>No unusual activity</span>
              </div>

            </div>


            {/* SECURITY LEVEL */}
            <div className="security-level">

              <FaShieldAlt />

              <div>
                <strong>
                  Security Level
                </strong>

                <span>
                  {twoFactorEnabled
                    ? "Excellent"
                    : "Good"}
                </span>
              </div>

            </div>

          </div>

        </section>



        {/* =================================
            DANGER ZONE
        ================================= */}
        <section className="security-card danger-zone">

          <div className="danger-heading">

            <div className="danger-icon">
              <FaExclamationCircle />
            </div>

            <div>
              <h2>Danger Zone</h2>

              <p>
                These actions cannot be easily
                reversed.
              </p>
            </div>

          </div>


          <div className="delete-account-box">

            <div className="delete-icon">
              <FaTrashAlt />
            </div>

            <div className="delete-content">

              <strong>
                Delete Account
              </strong>

              <span>
                Permanently delete your
                CampusXchange account and
                associated data.
              </span>

            </div>

          </div>


          {!showDeleteBox ? (

            <button
              className="delete-account-btn"
              onClick={() =>
                setShowDeleteBox(true)
              }
            >
              Delete Account
            </button>

          ) : (

            <div className="delete-confirm-box">

              <p>
                Are you sure you want to
                delete your account?
              </p>

              <div>

                <button
                  className="cancel-delete-btn"
                  onClick={() =>
                    setShowDeleteBox(false)
                  }
                >
                  Cancel
                </button>

                <button
                  className="confirm-delete-btn"
                  onClick={handleDeleteAccount}
                >
                  Yes, Delete Account
                </button>

              </div>

            </div>

          )}

        </section>

      </div>

    </main>
  </>
  );
};

export default AccountSecurity;