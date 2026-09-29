



import { useState, useEffect } from "react";
import "./Hero.css";
import hero from "../assets/hero.png";
import hero2 from "../assets/hero2.png";
import hero3 from "../assets/hero3.png";
import college1 from "../assets/college.jpg";
import college2 from "../assets/college2.jpg";
import college3 from "../assets/college3.jpg";

const heroImages = [hero, hero2, hero3];
const collegeImages = [college1, college2, college3];

const categorySets = [
  [
    { icon: "📝", label: "Old Notes" },
    { icon: "💻", label: "Laptop" },
    { icon: "📚", label: "Books" },
    { icon: "🪑", label: "Furniture" },
  ],
  [
    { icon: "🚲", label: "Cycles" },
    { icon: "🎧", label: "Headphones" },
    { icon: "🎸", label: "Musical Instruments" },
    { icon: "📱", label: "Mobiles" },
  ],
  [
    { icon: "🎒", label: "Bags" },
    { icon: "🖨️", label: "Printers" },
    { icon: "⌚", label: "Watches" },
    { icon: "🎮", label: "Gaming" },
  ],
];

function Hero() {
  const [current, setCurrent] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrent((prevCurrent) => {
  //       setPrevIndex(prevCurrent);
  //       return (prevCurrent + 1) % heroImages.length;
  //     });
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prevCurrent) => {
        setPrevIndex(prevCurrent);
        return (prevCurrent + 1) % heroImages.length;
      });
    }, 3000);   // 3000 se badha ke 4500 kar diya

    return () => clearInterval(interval);
  }, []);

  const getSlideClass = (index) => {
    if (index === current) return "active";
    if (index === prevIndex) return "exiting";
    return "";
  };

  const currentCategories = categorySets[current];
  const prevCategories = prevIndex !== null ? categorySets[prevIndex] : null;

  return (
    <section className="hero" data-aos="fade-down">
      <div className="hero-container">

        <div className="hero-left">

          <span className="hero-tag">
            🚀 India's Trusted Student Marketplace
          </span>

          <h1>
            Buy. Sell. Exchange.
            <br />
            <span>Within Your Campus.</span>
          </h1>

          <p>
            Buy and sell books, electronics, furniture,
            notes, cycles and more from verified students.
          </p>

          <div className="hero-buttons">

            <button
                className="primary-btn"
                onClick={() => {
                    document
                    .getElementById("featured-products")
                    .scrollIntoView({
                        behavior: "smooth",
                    });
                }}
                >
                Explore Now →
            </button>
         
            <button
                className="primary-btn"
                onClick={() => {
                    document
                    .getElementById("how-it-work")
                    .scrollIntoView({
                        behavior: "smooth",
                    });
                }}
                >
              How It Works
            </button> 

          </div>

          <div className="hero-features">

            <div className="feature-card">
              <h4>100%</h4>
              <p>Student Verified</p>
            </div>

            <div className="feature-card">
              <h4>60 Sec</h4>
              <p>Post Your Item</p>
            </div>

            <div className="feature-card">
              <h4>Best Deals</h4>
              <p>Save More Daily</p>
            </div>

          </div>

        </div>

        <div className="hero-right">

          {collegeImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="College"
              className={`college-bg ${getSlideClass(index)}`}
            />
          ))}

          {heroImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Hero"
              className={`hero-character ${getSlideClass(index)}`}
            />
          ))}

       {[0, 1, 2, 3].map((cardIdx) => (
  <div key={cardIdx} className={`card-wrapper hero-card${cardIdx + 1}`}>
    {categorySets.map((set, setIdx) => (
      <div
        key={setIdx}
        className={`hero-floating-card ${getSlideClass(setIdx)}`}
      >
        {set[cardIdx].icon} {set[cardIdx].label}
      </div>
    ))}
  </div>
))}

        </div>

      </div>
    </section>
  );
}

export default Hero;