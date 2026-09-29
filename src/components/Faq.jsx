import { useState } from "react";
import "./Faq.css";

import {
  FaPlus,
  FaMinus,
} from "react-icons/fa";

function Faq() {

  const [active, setActive] = useState("");

  const faqs = [

    {
      question: "Is CampusXchange free to use?",
      answer:
        "Yes. CampusXchange is completely free for students to buy and sell products within their campus."
    },

    {
      question: "How do I sell my product?",
      answer:
        "Create an account, upload clear photos, add product details, set your price and publish your listing."
    },

    {
      question: "Can I contact the seller directly?",
      answer:
        "Yes. You can chat with verified sellers through the platform before making any purchase."
    },

    {
      question: "Is my personal information secure?",
      answer:
        "Absolutely. Your personal information is protected, and only verified students can access the marketplace."
    },

    {
      question: "What products can I sell?",
      answer:
        "You can sell books, notes, electronics, furniture, hostel essentials and vehicles according to campus guidelines."
    }

  ];

  return (

    <section id="faq" className="faq"data-aos="fade-up">

      <div className="faq-heading">

        <span>FAQs</span>

        <h2>
          Frequently Asked
          <br />
          Questions
        </h2>

        <p>
          Find answers to the most common questions about CampusXchange.
        </p>

      </div>

      <div className="faq-container">

        {faqs.map((item, index) => (

          <div
            className={
              active === index
                ? "faq-card active"
                : "faq-card"
            }
            key={index}
          >

            <div
              className="faq-question"
              onClick={() => setActive(active === index ? -1 : index)}
            >

              <h3>{item.question}</h3>

              <span>

                {active === index ? (
                  <FaMinus />
                ) : (
                  <FaPlus />
                )}

              </span>

            </div>

            {active === index && (

              <div className="faq-answer">

                <p>{item.answer}</p>

              </div>

            )}

          </div>

        ))}

      </div>

    </section>

  );

}

export default Faq;