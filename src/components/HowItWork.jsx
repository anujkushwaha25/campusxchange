import "./HowItWork.css";

import {
  FaUserPlus,
  FaCloudUploadAlt,
  FaComments,
  FaHandshake,
} from "react-icons/fa";

function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-work"data-aos="fade-up">

      <div className="how-heading">

        <span>How It Works</span>

        <h2>
          Buy & Sell In
          <br />
          Just Four Simple Steps
        </h2>

        <p>
          CampusXchange makes buying and selling
          fast, secure and hassle-free for every student.
        </p>

      </div>

      <div className="steps-container">

        <div className="step-card">

          <div className="step-number">
            01
          </div>

          <div className="step-icon">
            <FaUserPlus />
          </div>

          <h3>Create Account</h3>

          <p>
            Sign up using your college email and
            verify your student identity.
          </p>

        </div>

        <div className="step-card">

          <div className="step-number">
            02
          </div>

          <div className="step-icon">
            <FaCloudUploadAlt />
          </div>

          <h3>Upload Product</h3>

          <p>
            Add product photos, price,
            category and description.
          </p>

        </div>

        <div className="step-card">

          <div className="step-number">
            03
          </div>

          <div className="step-icon">
            <FaComments />
          </div>

          <h3>Chat Securely</h3>

          <p>
            Connect directly with verified
            buyers and negotiate instantly.
          </p>

        </div>

        <div className="step-card">

          <div className="step-number">
            04
          </div>

          <div className="step-icon">
            <FaHandshake />
          </div>

          <h3>Meet & Exchange</h3>

          <p>
            Meet inside your campus and
            complete the transaction safely.
          </p>

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;