// ==============================
// src/components/Stats/Stats.jsx
// ==============================

import "./Stats.css";
import { useEffect, useRef, useState } from "react";
import {
  FaUserGraduate,
  FaBoxOpen,
  FaHandshake,
  FaUniversity,
} from "react-icons/fa";

// Counter Component
function Counter({ end, duration = 1500 }) {
  const [count, setCount] = useState(0);

  const counterRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;

        started.current = true;

        let start = 0;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
          start += increment;

          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      },
      {
        threshold: 0.4,
      }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={counterRef}>{count.toLocaleString()}</span>;
}

export default function Stats() {
  return (
    <section className="stats"data-aos="fade-up">

      <div className="stats-heading">
        <span>OUR IMPACT</span>

        <h2>
          Growing Every Day
          <br />
          Across Campuses
        </h2>

        <p>
          Thousands of students are joining CampusXchange to buy,
          sell and exchange products safely.
        </p>
      </div>

      <div className="stats-container">

        <div className="stat-card">
          <div className="stat-icon">
            <FaUserGraduate />
          </div>

          <h3>
            <Counter end={10000} />+
          </h3>

          <p>Registered Students</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaBoxOpen />
          </div>

          <h3>
            <Counter end={5000} />+
          </h3>

          <p>Products Listed</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaHandshake />
          </div>

          <h3>
            <Counter end={2500} />+
          </h3>

          <p>Successful Deals</p>
        </div>

       {/* <div className="stat-card">
          <div className="stat-icon">
            <FaUniversity />
          </div>

          <h3>
            <Counter end={25} />+
          </h3>

          <p>Partner Colleges</p>
        </div>*/}

      </div>

    </section>
  );
}