import { useState, useRef } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";

/* ------------------------------------------------------------------
   VALIDATION RULES
   One function per field. Each returns an error string, or "" if ok.
------------------------------------------------------------------ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

const rules = {
  name: (value) => {
    const v = value.trim();
    if (!v) return "Enter your full name.";
    if (v.length < 3) return "Name must be at least 3 characters.";
    if (!/^[a-zA-Z\s.'-]+$/.test(v)) return "Name can only contain letters.";
    return "";
  },

  email: (value) => {
    const v = value.trim();
    if (!v) return "Enter your email address.";
    if (!EMAIL_RE.test(v)) return "Enter a valid email, like you@college.edu.";
    return "";
  },

  password: (value) => {
    if (!value) return "Enter a password.";
    if (value.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(value)) return "Add at least one uppercase letter.";
    if (!/[a-z]/.test(value)) return "Add at least one lowercase letter.";
    if (!/[0-9]/.test(value)) return "Add at least one number.";
    if (!/[^A-Za-z0-9]/.test(value)) return "Add at least one symbol (!@#$...).";
    return "";
  },

  // confirm needs the other values, so it takes a second argument
  confirmPassword: (value, values) => {
    if (!value) return "Re-enter your password.";
    if (value !== values.password) return "Passwords do not match.";
    return "";
  },

  terms: (value) => (value ? "" : "Accept the Terms & Conditions to continue."),
};

/* password strength meter: 0–4 */
function strengthOf(password) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (password.length >= 12 && score === 4) return 4;
  return score;
}

const STRENGTH_LABEL = ["", "Weak", "Fair", "Good", "Strong"];

const EMPTY = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  terms: false,
};

function Signup() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [shake, setShake] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const refs = {
    name: useRef(null),
    email: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
    terms: useRef(null),
  };

  /* run every rule and return an object of errors */
  const validateAll = (vals) => {
    const next = {};
    Object.keys(rules).forEach((field) => {
      const message = rules[field](vals[field], vals);
      if (message) next[field] = message;
    });
    return next;
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    const nextValues = { ...values, [name]: fieldValue };

    setValues(nextValues);

    // only show live errors for fields the user has already left once
    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: rules[name](fieldValue, nextValues),
      }));
    }

    // keep "passwords do not match" honest while editing the first password
    if (name === "password" && touched.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: rules.confirmPassword(
          nextValues.confirmPassword,
          nextValues
        ),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: rules[name](values[name], values) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = validateAll(values);
    setErrors(nextErrors);
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
      terms: true,
    });

    const firstBad = Object.keys(rules).find((f) => nextErrors[f]);

    if (firstBad) {
      setShake(true);
      setTimeout(() => setShake(false), 450);
      refs[firstBad]?.current?.focus();
      return;
    }

    // everything passed — this is where your API call goes
    setSubmitting(true);
    try {
      // await fetch("/api/signup", { method: "POST", body: JSON.stringify(values) })
      await new Promise((r) => setTimeout(r, 900));
      setDone(true);
      setValues(EMPTY);
      setTouched({});
    } catch {
      setErrors({ form: "Could not create your account. Try again." });
    } finally {
      setSubmitting(false);
    }
  };

  /* helpers so the JSX below stays readable */
  const isBad = (field) => Boolean(touched[field] && errors[field]);
  const isGood = (field) =>
    Boolean(touched[field] && !errors[field] && values[field]);

  const fieldClass = (field) =>
    `signup-input-box${isBad(field) ? " signup-has-error" : ""}${
      isBad(field) && shake ? " signup-shake" : ""
    }`;

  const inputClass = (field) =>
    isBad(field) ? "signup-input-error" : isGood(field) ? "signup-input-valid" : "";

  const ErrorText = ({ field }) =>
    isBad(field) ? (
      <p className="signup-error" id={`${field}-error`} role="alert">
        <FaExclamationCircle />
        {errors[field]}
      </p>
    ) : (
      <div className="signup-error-slot" />
    );

  const strength = strengthOf(values.password);

  return (
    <section className="signup-reverse">
      {/* LEFT - SIGNUP FORM */}

      <div className="signup-right">
        <div className="signup-card">
          <h2>Create Account</h2>

          <p className="signup-subtitle">
            Join CampusXchange and start buying &amp; selling with verified
            students.
          </p>

          {done && (
            <p className="signup-success" role="status">
              <FaCheckCircle />
              Account created. Check your email to verify it.
            </p>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}

            <div className={fieldClass("name")}>
              <FaUser className="signup-icon" />

              <input
                ref={refs.name}
                type="text"
                name="name"
                placeholder="Full Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass("name")}
                aria-invalid={isBad("name")}
                aria-describedby={isBad("name") ? "name-error" : undefined}
                autoComplete="name"
              />
            </div>
            <ErrorText field="name" />

            {/* Email */}

            <div className={fieldClass("email")}>
              <FaEnvelope className="signup-icon" />

              <input
                ref={refs.email}
                type="email"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass("email")}
                aria-invalid={isBad("email")}
                aria-describedby={isBad("email") ? "email-error" : undefined}
                autoComplete="email"
              />
            </div>
            <ErrorText field="email" />

            {/* Password */}

            <div className={fieldClass("password")}>
              <FaLock className="signup-icon" />

              <input
                ref={refs.password}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass("password")}
                aria-invalid={isBad("password")}
                aria-describedby={
                  isBad("password") ? "password-error" : undefined
                }
                autoComplete="new-password"
              />

              <span
                className="signup-eye"
                role="button"
                tabIndex={0}
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
                onKeyDown={(e) =>
                  e.key === "Enter" && setShowPassword(!showPassword)
                }
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {values.password && (
              <div className="signup-strength" data-level={strength}>
                <div className="signup-strength-track">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <p className="signup-strength-label">
                  Password strength: {STRENGTH_LABEL[strength] || "Weak"}
                </p>
              </div>
            )}

            <ErrorText field="password" />

            {/* Confirm Password */}

            <div className={fieldClass("confirmPassword")}>
              <FaLock className="signup-icon" />

              <input
                ref={refs.confirmPassword}
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={inputClass("confirmPassword")}
                aria-invalid={isBad("confirmPassword")}
                aria-describedby={
                  isBad("confirmPassword") ? "confirmPassword-error" : undefined
                }
                autoComplete="new-password"
              />

              <span
                className="signup-eye"
                role="button"
                tabIndex={0}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                onKeyDown={(e) =>
                  e.key === "Enter" &&
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <ErrorText field="confirmPassword" />

            {/* Terms */}

            <div
              className={`signup-remember${
                isBad("terms") ? " signup-has-error" : ""
              }${isBad("terms") && shake ? " signup-shake" : ""}`}
            >
              <label>
                <input
                  ref={refs.terms}
                  type="checkbox"
                  name="terms"
                  checked={values.terms}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={isBad("terms")}
                  aria-describedby={isBad("terms") ? "terms-error" : undefined}
                />
                I agree to Terms &amp; Conditions
              </label>
            </div>
            <ErrorText field="terms" />

            {/* Button */}

            <button
              type="submit"
              className="signup-login-btn"
              disabled={submitting}
            >
              {submitting ? "Creating account..." : "Create Account"}
            </button>

            {errors.form && (
              <p className="signup-error" role="alert">
                <FaExclamationCircle />
                {errors.form}
              </p>
            )}
          </form>

          {/* Divider */}

          <div className="signup-divider">
            <span>OR</span>
          </div>

          {/* Bottom Text */}

          <p className="signup-bottom-text">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>

      {/* RIGHT - BANNER */}

      <div className="signup-left">
        <div className="signup-overlay"></div>

        <div className="signup-left-content">
          <span className="signup-logo">
            Campus<span>X</span>change
          </span>

          <h1>
            Join <br />
            CampusXchange
          </h1>

          <p>
            Create your account and start buying, selling and exchanging
            products safely within your college community.
          </p>

          <div className="signup-stats">
            <div className="signup-stat-card">
              <h3>8K+</h3>
              <p>Students</p>
            </div>

            <div className="signup-stat-card">
              <h3>20K+</h3>
              <p>Products</p>
            </div>

            <div className="signup-stat-card">
              <h3>100%</h3>
              <p>Verified</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
