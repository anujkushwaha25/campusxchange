import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import "./Forgotpass.css";

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            return;
        }

        setSubmitted(true);
    };

    return (
        <div className="forgot-page">

            {/* LEFT SIDE */}
            <div className="forgot-left">

                <div className="forgot-overlay"></div>

                <div className="forgot-content">

                    <div className="forgot-logo">
                        Campus<span>X</span>change
                    </div>

                    <h1>
                        Reset Your
                        <br />
                        Password.
                    </h1>

                    <p>
                        Don't worry! Enter your college email
                        and we'll help you get back into your
                        CampusXchange account.
                    </p>

                    <div className="forgot-stats">

                        <div className="forgot-stat">
                            <h3>8K+</h3>
                            <p>Students</p>
                        </div>

                        <div className="forgot-stat">
                            <h3>20K+</h3>
                            <p>Products</p>
                        </div>

                        <div className="forgot-stat">
                            <h3>100%</h3>
                            <p>Verified</p>
                        </div>

                    </div>

                </div>

            </div>


            {/* RIGHT SIDE */}
            <div className="forgot-right">

                <div className="forgot-card">

                    {!submitted ? (

                        <>
                            <h2>Forgot Password?</h2>

                            <p className="forgot-subtitle">
                                Enter your registered college email
                                and we'll send you a password reset link.
                            </p>

                            <form onSubmit={handleSubmit}>

                                <div className="forgot-input-box">

                                    <FaEnvelope className="forgot-icon" />

                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                    />

                                </div>

                                <button
                                    type="submit"
                                    className="forgot-btn"
                                >
                                    Send Reset Link
                                </button>

                            </form>

                            <div className="forgot-back">

                                <Link to="/login">
                                    <FaArrowLeft />
                                    Back to Sign In
                                </Link>

                            </div>

                        </>

                    ) : (

                        <div className="forgot-success">

                            <div className="success-icon">
                                ✓
                            </div>

                            <h2>Check Your Email</h2>

                            <p>
                                We've sent a password reset link
                                to <strong>{email}</strong>.
                            </p>

                            <Link
                                to="/login"
                                className="forgot-btn success-btn"
                            >
                                Back to Sign In
                            </Link>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
}

export default ForgotPassword;