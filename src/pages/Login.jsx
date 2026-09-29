import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";

/* ------------------------------------------------------------------
   VALIDATION RULES
   Each returns an error string, or "" when the value is fine.
   Login is deliberately looser than signup: it checks the format of
   what was typed, not password strength. Strength is the server's
   job here -- a strict rule would reject people whose real password
   was created before you tightened the rules.
------------------------------------------------------------------ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

const rules = {
  email: (value) => {
    const v = value.trim();
    if (!v) return "Enter your college email.";
    if (!EMAIL_RE.test(v)) return "Enter a valid email, like you@college.edu.";
    return "";
  },

  password: (value) => {
    if (!value) return "Enter your password.";
    return "";
  },
};

const EMPTY = { email: "", password: "", remember: false };

function Login() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [shake, setShake] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const refs = {
    email: useRef(null),
    password: useRef(null),
  };

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setValues((prev) => ({ ...prev, [name]: fieldValue }));

    // a wrong password from the server is no longer wrong
    // once the user starts editing, so clear the form-level error
    if (errors.form) setErrors((prev) => ({ ...prev, form: "" }));

    // only show live errors for fields the user has already left once
    if (touched[name] && rules[name]) {
      setErrors((prev) => ({ ...prev, [name]: rules[name](fieldValue) }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    if (!rules[name]) return;

    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: rules[name](values[name]) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = {};
    Object.keys(rules).forEach((field) => {
      const message = rules[field](values[field]);
      if (message) nextErrors[field] = message;
    });

    setErrors(nextErrors);
    setTouched({ email: true, password: true });

    const firstBad = Object.keys(rules).find((f) => nextErrors[f]);

    if (firstBad) {
      setShake(true);
      setTimeout(() => setShake(false), 450);
      refs[firstBad]?.current?.focus();
      return;
    }

    setSubmitting(true);
    try {
      // your real call goes here, for example:
      // const res = await fetch("/api/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     email: values.email.trim(),
      //     password: values.password,
      //     remember: values.remember,
      //   }),
      // });
      // if (!res.ok) throw new Error("bad-credentials");

      await new Promise((r) => setTimeout(r, 800));
      setDone(true);
    } catch {
      // keep this message vague on purpose -- saying which of the two
      // was wrong tells an attacker which emails are registered
      setErrors({ form: "Email or password is incorrect." });
      refs.password.current?.focus();
    } finally {
      setSubmitting(false);
    }
  };

  const isBad = (field) => Boolean(touched[field] && errors[field]);

  const boxClass = (field) =>
    `auth-input-box${isBad(field) ? " auth-has-error" : ""}${
      isBad(field) && shake ? " auth-shake" : ""
    }`;

  const ErrorText = ({ field }) =>
    isBad(field) ? (
      <p className="auth-error" id={`login-${field}-error`} role="alert">
        <FaExclamationCircle />
        {errors[field]}
      </p>
    ) : (
      <div className="auth-error-slot" />
    );

  return (
    <section className="auth-page">
      <div className="auth-left">
        <div className="auth-overlay"></div>

        <div className="auth-left-content">
          <span className="auth-logo">
            Campus<span>X</span>change
          </span>

          <h1>
            Welcome
            <br />
            Back.
          </h1>

          <p>
            Buy, Sell and Exchange products inside your campus safely with
            verified students.
          </p>

          <div className="auth-stats">
            <div className="auth-stat-card">
              <h3>8K+</h3>
              <p>Students</p>
            </div>

            <div className="auth-stat-card">
              <h3>20K+</h3>
              <p>Products</p>
            </div>

            <div className="auth-stat-card">
              <h3>100%</h3>
              <p>Verified</p>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>Sign In</h2>

          <p className="auth-subtitle">Welcome back! Please login to continue.</p>

          {done && (
            <p className="auth-success" role="status">
              <FaCheckCircle />
              Signed in. Taking you to your dashboard.
            </p>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Email */}

            <div className={boxClass("email")}>
              <FaEnvelope className="auth-icon" />

              <input
                ref={refs.email}
                type="email"
                name="email"
                placeholder="College Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={isBad("email") ? "auth-input-error" : ""}
                aria-invalid={isBad("email")}
                aria-describedby={
                  isBad("email") ? "login-email-error" : undefined
                }
                autoComplete="email"
              />
            </div>
            <ErrorText field="email" />

            {/* Password */}

            <div className={boxClass("password")}>
              <FaLock className="auth-icon" />

              <input
                ref={refs.password}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={isBad("password") ? "auth-input-error" : ""}
                aria-invalid={isBad("password")}
                aria-describedby={
                  isBad("password") ? "login-password-error" : undefined
                }
                autoComplete="current-password"
              />

              <span
                className="auth-eye"
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
            <ErrorText field="password" />

            {/* Remember + forgot */}

            <div className="auth-remember">
              <label>
                <input
                  type="checkbox"
                  name="remember"
                  checked={values.remember}
                  onChange={handleChange}
                />
                Remember Me
              </label>

              <Link to="/forgot-password">Forgot Password?</Link>
            </div>

            <button
              type="submit"
              className="auth-login-btn"
              disabled={submitting}
            >
              {submitting ? "Signing in..." : "Sign In"}
            </button>

            {errors.form && (
              <p className="auth-error" role="alert">
                <FaExclamationCircle />
                {errors.form}
              </p>
            )}
          </form>

          <div className="auth-divider">
            <span>OR</span>
          </div>

          <p className="auth-bottom-text">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
