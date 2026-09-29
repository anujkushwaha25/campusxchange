import React from "react";
import {
  FaShieldAlt,
  FaFileInvoice,
  FaBoxOpen,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";

import "./ElectronicsVerification.css";

const ElectronicsVerification = ({
  billFile,
  boxImage,
  onBillChange,
  onBoxImageChange,
}) => {
  return (
    <div className="electronics-verification">

      {/* HEADER */}
      <div className="electronics-verification-header">

        <div className="electronics-verification-icon">
          <FaShieldAlt />
        </div>

        <div>
          <h3>Electronics Verification</h3>

          <p>
            Upload your purchase bill and original product box
            to build buyer trust.
          </p>
        </div>

      </div>


      {/* BILL / RECEIPT */}
      <div className="verification-upload">

        <div className="upload-title">

          <div>
            <h4>
              <FaFileInvoice />
              Purchase Bill / Receipt
            </h4>

            <span>
              Required for verification
            </span>
          </div>

        </div>


        {!billFile ? (

          <label className="verification-upload-box">

            <FaFileInvoice className="upload-box-icon" />

            <strong>
              Upload purchase bill
            </strong>

            <span>
              JPG, PNG or PDF • Max 5MB
            </span>

            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={onBillChange}
            />

          </label>

        ) : (

          <div className="verification-file-preview">

            <div className="file-preview-icon">
              <FaFileInvoice />
            </div>

            <div className="file-preview-info">

              <strong>
                {billFile.name}
              </strong>

              <span>
                Bill uploaded successfully
              </span>

            </div>

            <FaCheckCircle className="verification-success" />

          </div>

        )}

      </div>


      {/* PRODUCT BOX */}
      <div className="verification-upload">

        <div className="upload-title">

          <div>
            <h4>
              <FaBoxOpen />
              Original Product Box
            </h4>

            <span>
              Required for verification
            </span>
          </div>

        </div>


        {!boxImage ? (

          <label className="verification-upload-box">

            <FaBoxOpen className="upload-box-icon" />

            <strong>
              Upload product box image
            </strong>

            <span>
              JPG or PNG • Max 5MB
            </span>

            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={onBoxImageChange}
            />

          </label>

        ) : (

          <div className="box-image-preview">

            <img
              src={URL.createObjectURL(boxImage)}
              alt="Product box"
            />

            <div className="box-image-info">

              <span>
                Original box image uploaded
              </span>

              <FaCheckCircle className="verification-success" />

            </div>

          </div>

        )}

      </div>


      {/* INFO */}
      <div className="verification-note">

        <FaShieldAlt />

        <p>
          Clear and genuine documents help buyers trust
          your listing and may increase your chances of selling.
        </p>

      </div>

    </div>
  );
};

export default ElectronicsVerification;