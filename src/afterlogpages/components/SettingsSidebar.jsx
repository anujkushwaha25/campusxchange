import React from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaBell,
  FaShieldAlt,
  FaQuestionCircle,
  FaInfoCircle,
} from "react-icons/fa";

import "./SettingsSidebar.css";

const SettingsSidebar = ({ activeItem = "Profile Settings" }) => {
  return (
    <aside className="settings-sidebar">

      <h2 className="settings-sidebar-title">Settings</h2>

      <nav className="settings-navigation">

        <Link
          to="/profile"
          className={`settings-nav-item ${
            activeItem === "Profile Settings" ? "active" : ""
          }`}
        >
          <span className="settings-nav-icon">
            <FaUser />
          </span>
          <span className="settings-nav-text">
            Profile Settings
          </span>
        </Link>

        <Link
          to="/accountsecurity"
          className={`settings-nav-item ${
            activeItem === "Account & Security" ? "active" : ""
          }`}
        >
          <span className="settings-nav-icon">
            <FaLock />
          </span>
          <span className="settings-nav-text">
            Account & Security
          </span>
        </Link>

        {/* <Link
          to="/notifications"
          className={`settings-nav-item ${
            activeItem === "Notifications" ? "active" : ""
          }`}
        >
          <span className="settings-nav-icon">
            <FaBell />
          </span>
          <span className="settings-nav-text">
            Notifications
          </span>
        </Link> */}

        <Link
          to="/privacy-safety"
          className={`settings-nav-item ${
            activeItem === "Privacy & Safety" ? "active" : ""
          }`}
        >
          <span className="settings-nav-icon">
            <FaShieldAlt />
          </span>
          <span className="settings-nav-text">
            Privacy & Safety
          </span>
        </Link>

        <Link
          to="/help-support"
          className={`settings-nav-item ${
            activeItem === "Help & Support" ? "active" : ""
          }`}
        >
          <span className="settings-nav-icon">
            <FaQuestionCircle />
          </span>
          <span className="settings-nav-text">
            Help & Support
          </span>
        </Link>

        <Link
          to="/about"
          className={`settings-nav-item ${
            activeItem === "About CampusXchange" ? "active" : ""
          }`}
        >
          <span className="settings-nav-icon">
            <FaInfoCircle />
          </span>
          <span className="settings-nav-text">
            About CampusXchange
          </span>
        </Link>

      </nav>

    </aside>
  );
};

export default SettingsSidebar;