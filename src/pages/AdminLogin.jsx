import { useState } from "react";
import "./AdminLogin.css";

import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";

import { adminLogin } from "../services/authService";

function AdminLogin() {

    const [showPassword, setShowPassword] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous error
        setErrorMessage("");

        // Email validation
        if (email.trim() === "") {
            setErrorMessage("Please enter your email address.");
            return;
        }

        // Email format validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email.trim())) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        // Password validation
        if (password === "") {
            setErrorMessage("Please enter your password.");
            return;
        }

        // Prevent multiple requests
        if (isLoading) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(
                `${BASE_URL}/admin/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    credentials: "include",

                    body: JSON.stringify({
                        email: email.trim(),
                        password: password,
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {

                window.location.href =
                    `${BASE_URL}/admin/dashboard`;

                return;
            }

            // Wrong login credentials
            setErrorMessage(
                "Invalid email or password. Please try again."
            );

        } catch (error) {

            console.error("Admin login error:", error);

            setErrorMessage(
                "Unable to connect to the server. Please try again."
            );

        } finally {

            setIsLoading(false);

        }
    };


    return (

        <section className="auth">

            {/* =====================================================
                LEFT SIDE
            ===================================================== */}

            <div className="auth-left">

                <div className="overlay"></div>


                <div className="left-content">

                    <span className="auth-logo">

                        Campus<span>X</span>change

                    </span>


                    <h1>

                        Welcome
                        <br />
                        Back.

                    </h1>


                    <p>

                        Manage your campus marketplace,
                        verify students and keep campus
                        trading safe from one place.

                    </p>


                    <div className="auth-stats">

                        <div className="auth-stat-card">

                            <h3>
                                1,284
                            </h3>

                            <p>
                                Active Listings
                            </p>

                        </div>


                        <div className="auth-stat-card">

                            <h3>
                                3,912
                            </h3>

                            <p>
                                Verified Users
                            </p>

                        </div>


                        <div className="auth-stat-card">

                            <h3>
                                642
                            </h3>

                            <p>
                                Deals
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* =====================================================
                RIGHT SIDE
            ===================================================== */}

            <div className="auth-right">

                <div className="login-card">

                    <h2>
                        Admin Sign In
                    </h2>


                    <p className="subtitle">

                        Welcome back! Please login to
                        manage CampusXchange.

                    </p>


                    <form onSubmit={handleSubmit} noValidate>


                        {/* ================= EMAIL ================= */}

                        <div className="input-box">

                            <FaEnvelope className="icon" />


                            <input
                                type="email"
                                placeholder="Admin Email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                autoComplete="username"
                                
                            />

                        </div>


                        {/* ================= PASSWORD ================= */}

                        <div className="input-box">

                            <FaLock className="icon" />


                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                maxLength={20}
                                autoComplete="current-password"
                                
                            />


                            <span
                                className="eye"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                            >

                                {showPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}

                            </span>

                        </div>


                        {/* ================= ERROR ================= */}

                        {errorMessage && (
                            <div
                                style={{
                                    color: "#dc2626",
                                    background: "#fef2f2",
                                    border: "1px solid #fecaca",
                                    borderRadius: "10px",
                                    padding: "10px 14px",
                                    marginBottom: "20px",
                                    fontSize: "14px",
                                    textAlign: "center",
                                }}
                            >
                                ⚠ {errorMessage}
                            </div>
                        )}


                        {/* ================= REMEMBER ================= */}

                        <div className="remember">

                            <label>

                                <input
                                    type="checkbox"
                                />

                                Remember Me

                            </label>


                            <a href="#forgot-password">

                                Forgot Password?

                            </a>

                        </div>


                        {/* ================= LOGIN BUTTON ================= */}

                        <button
                            type="submit"
                            className="auth-login-btn"
                            disabled={isLoading}
                        >

                            {isLoading
                                ? "Signing In..."
                                : "Sign In"
                            }

                        </button>


                    </form>


                    {/* ================= DIVIDER ================= */}

                    <div className="divider">

                        <span>
                            OR
                        </span>

                    </div>


                    {/* ================= BOTTOM TEXT ================= */}

                    <div className="bottom-text">

                        Not an admin?{" "}

                        <a href="/">

                            Return to CampusXchange

                        </a>

                    </div>

                </div>

            </div>

        </section>
    );
}


export default AdminLogin;