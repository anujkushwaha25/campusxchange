import React, { useState } from "react";

import {
  FaUser,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaShieldAlt,
  FaCheckCircle,
  FaRegCircle,
  FaIdCard,
  FaUniversity,
  FaCloudUploadAlt,
  FaLock,
  FaInfoCircle,
  FaArrowRight,
  FaExclamationCircle,
  FaMobile
  
} from "react-icons/fa";

import "./Profile.css";
import Navbar from "../components/Navbar";
import SettingsSidebar from "../components/SettingsSidebar";

const Profile = () => {
  const [profileImage, setProfileImage] = useState("/profile.jpg");
  const [isEditing, setIsEditing] = useState(false);
  
  const [emailOtp, setEmailOtp] = useState("");
const [emailVerified, setEmailVerified] = useState(false);
const [emailOtpSent, setEmailOtpSent] = useState(false);
const [emailMessage, setEmailMessage] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [phoneSaved, setPhoneSaved] = useState(false);
const [phoneMessage, setPhoneMessage] = useState("");
const [rollNumber, setRollNumber] = useState("");
const [rollSubmitted, setRollSubmitted] = useState(false);
const [rollNumberMessage, setRollNumberMessage] = useState("");
const [idFront, setIdFront] = useState(null);
const [idBack, setIdBack] = useState(null);
const [addressSubmitted, setAddressSubmitted] = useState(false);
const [addressErrors, setAddressErrors] = useState("");
const [collegeSubmitted, setCollegeSubmitted] = useState(false);
const [collegeError, setCollegeError] = useState("");
const [collegeName, setCollegeName] = useState("");

const [finalVerificationSubmitted, setFinalVerificationSubmitted] = useState(false);
const [finalVerificationError, setFinalVerificationError] = useState("");




  const [profileData, setProfileData] = useState({
    name: "Anuj Kushwaha",
    college: "ITM University Gwalior",
    course: "MCA",
    year: "2026",
    address: "Gwalior, Madhya Pradesh",
    bio: "Tech enthusiast | Always looking for great deals and useful connections on campus.",
  });
  const [addressData, setAddressData] = useState({
  address: "",
  city: "",
  state: "",
  pincode: "",
});
const [isDetailsEditing, setIsDetailsEditing] = useState(false);

const [profileDetails, setProfileDetails] = useState({
  name: "Anuj Kushwaha",
  email: "anujkushwaha@gmail.com",
  phone: "+91 98765 43210",
  rollNumber: "23MCA10245",
  college: "ITM University Gwalior",
  course: "MCA",
  year: "2027",
  address: "ITM University Campus, Gwalior, Madhya Pradesh - 474001",
});

const [detailsDraft, setDetailsDraft] = useState(profileDetails);


  const handleProfileChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  
  
  const handleSendEmailOtp = () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  const handleDetailsChange = (field, value) => {
  setDetailsDraft((prev) => ({
    ...prev,
    [field]: value,
  }));
};

  if (!email.trim()) {
    setEmailMessage("Please enter your email address.");
    setEmailOtpSent(false);
    return;
  }

  if (!emailPattern.test(email)) {
    setEmailMessage("Please enter a valid email address.");
    setEmailOtpSent(false);
    return;
  }

  setEmailOtpSent(true);
  setEmailMessage("OTP has been sent to your email.");
};


const handleEmailVerification = () => {
  if (emailOtp.length !== 6) {
    setEmailMessage("Please enter a valid 6-digit OTP.");
    return;
  }

  // Temporary frontend testing
  if (emailOtp === "123456") {
    setEmailVerified(true);
    setEmailMessage("Email verified successfully.");
  } else {
    setEmailMessage("Invalid OTP. Please try again.");
  }
};

  const handleProfileImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    setProfileImage(URL.createObjectURL(file));
  }
};

const handleAddressChange = (field, value) => {
  setAddressData((prev) => ({
    ...prev,
    [field]: value,
  }));

  setAddressErrors((prev) => ({
    ...prev,
    [field]: "",
  }));
};

const handleAddressSubmit = () => {
  const errors = {};

  if (!addressData.address.trim()) {
    errors.address = "Address is required.";
  }

  if (!addressData.city.trim()) {
    errors.city = "City is required.";
  }

  if (!addressData.state.trim()) {
    errors.state = "State is required.";
  }

  if (!/^[0-9]{6}$/.test(addressData.pincode)) {
    errors.pincode = "Enter a valid 6-digit PIN code.";
  }

  setAddressErrors(errors);

  if (Object.keys(errors).length === 0) {
    setAddressSubmitted(true);
  }
};
  return (
  <>
 <div className="profile-layout">
  <Navbar />

  <div className="profile-body">
    <SettingsSidebar activeItem="Profile Settings" />

    <main className="profile-page">

      {/* =========================
          PROFILE HEADER
      ========================= */}

      <section className="profile-header">

        <div className="profile-main-info">

          <div className="profile-avatar-wrapper">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="profile-avatar"
                />

                <label
                  htmlFor="profile-photo-input"
                  className="profile-camera-btn"
                >
                  📷
                </label>

                <input
                  id="profile-photo-input"
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  style={{ display: "none" }}
                />
          </div>

          {/* <div className="profile-user-info">

            <div className="profile-name-row">
              <h1>Anuj Kushwaha</h1>

              <FaCheckCircle className="verified-name-icon" />
            </div>

            <div className="profile-info-row">
              <FaGraduationCap />
              <span>ITM University Gwalior</span>
            </div>

            <div className="profile-info-row">
              <FaGraduationCap />
              <span>MCA&nbsp; • &nbsp;2027</span>
            </div>

            <div className="profile-info-row">
              <FaMapMarkerAlt />
              <span>Gwalior, Madhya Pradesh</span>
            </div>

            <p className="profile-bio">
              Tech enthusiast | Always looking for great deals and
              useful connections on campus.
            </p>
          </div> */}
                  <div className="profile-user-info">

                                                    <div className="profile-name-row">
                                                      {isEditing ? (
                                                        <input
                                                          type="text"
                                                          value={profileData.name}
                                                          onChange={(e) =>
                                                            handleProfileChange("name", e.target.value)
                                                          }
                                                          className="profile-header-input profile-name-input"
                                                        />
                                                      ) : (
                                                        <h1>{profileData.name}</h1>
                                                      )}

                                                      <FaCheckCircle className="verified-name-icon" />
                                                    </div>

                                                    <div className="profile-info-row">
                                                      <FaGraduationCap />

                                                      {isEditing ? (
                                                        <input
                                                          type="text"
                                                          value={profileData.college}
                                                          onChange={(e) =>
                                                            handleProfileChange("college", e.target.value)
                                                          }
                                                          className="profile-header-input"
                                                        />
                                                      ) : (
                                                        <span>{profileData.college}</span>
                                                      )}
                                                    </div>

                                                    <div className="profile-info-row">
                                                      <FaGraduationCap />

                                                      {isEditing ? (
                                                        <>
                                                          <input
                                                            type="text"
                                                            value={profileData.course}
                                                            onChange={(e) =>
                                                              handleProfileChange("course", e.target.value)
                                                            }
                                                            className="profile-header-input profile-course-input"
                                                          />

                                                          <span>•</span>

                                                          <input
                                                            type="text"
                                                            value={profileData.year}
                                                            onChange={(e) =>
                                                              handleProfileChange("year", e.target.value)
                                                            }
                                                            className="profile-header-input profile-year-input"
                                                          />
                                                        </>
                                                      ) : (
                                                        <span>
                                                          {profileData.course}&nbsp; • &nbsp;{profileData.year}
                                                        </span>
                                                      )}
                                                    </div>

                                                    <div className="profile-info-row">
                                                      <FaMapMarkerAlt />

                                                      {isEditing ? (
                                                        <input
                                                          type="text"
                                                          value={profileData.address}
                                                          onChange={(e) =>
                                                            handleProfileChange("address", e.target.value)
                                                          }
                                                          className="profile-header-input"
                                                        />
                                                      ) : (
                                                        <span>{profileData.address}</span>
                                                      )}
                                                    </div>

                                                    <p className="profile-bio">
                                                      {isEditing ? (
                                                        <textarea
                                                          value={profileData.bio || ""}
                                                          onChange={(e) =>
                                                            handleProfileChange("bio", e.target.value)
                                                          }
                                                          className="profile-header-input profile-bio-input"
                                                        />
                                                      ) : (
                                                        profileData.bio ||
                                                        "Tech enthusiast | Always looking for great deals and useful connections on campus."
                                                      )}
                                                    </p>

                                                  </div>

                                                  

        </div>

                      {!isEditing ? (
                  <button
                    className="edit-profile-btn"
                    onClick={() => setIsEditing(true)}
                  >
                    <FaEdit />
                    Edit Profile
                  </button>
                ) : (
                  <div className="edit-profile-actions">
                    <button
                      className="cancel-profile-btn"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>

                    <button
                      className="save-profile-btn"
                      onClick={() => setIsEditing(false)}
                    >
                      Save Changes
                    </button>
                  </div>
                )}

      </section>


      {/* =========================
          MAIN PROFILE GRID
      ========================= */}

      <div className="profile-content-grid">

        {/* =====================
            LEFT / CENTER CONTENT
        ===================== */}

        <section className="verification-section">

          <div className="verification-heading">
            <h2>Student Verification</h2>

            <p>
              Complete all the steps below to get 100% verified
              and unlock all features.
            </p>
          </div>


          <div className="verification-grid">

            {/* =====================
                1. EMAIL VERIFICATION
            ===================== */}

                <div className="verification-column">

<div className="email-verification-card">

                            <div className="email-verification-card-heading">

                              <div className="email-verification-icon">
                                <FaEnvelope />
                              </div>

                              <div>
                                <h3>1. Email Verification</h3>
                                <p>Verify your student email address with OTP.</p>
                              </div>

                            </div>

                            <div className="email-verification-input-row">

                             <input
                                  type="email"
                                  placeholder="Enter your email address"
                                  value={email}
                                  autoComplete="email"
                                  className={emailMessage && !emailVerified ? "input-error" : ""}
                                  onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailMessage("");
                                  }}
                                />

                              {emailVerified ? (
                                <span className="email-verified-badge">
                                  <FaCheckCircle />
                                  Verified
                                </span>
                              ) : (
                                <span className="pending-badge">
                                  <FaRegCircle />
                                  Not Verified
                                </span>
                              )}

                            </div>

                            {!emailVerified && !emailOtpSent && (
                              <>
                                <button
                                  className="send-otp-btn"
                                  onClick={handleSendEmailOtp}
                                >
                                  Send OTP
                                </button>

                                {emailMessage && (
                                  <div className="email-error-message">
                                    <FaInfoCircle />
                                    <span>{emailMessage}</span>
                                  </div>
                                )}
                              </>
                            )}

                           {!emailVerified && emailOtpSent && (
                              <>
                                <div className="otp-row">
                                  <input
                                    type="text"
                                    placeholder="Enter 6-digit OTP"
                                    value={emailOtp}
                                    maxLength={6}
                                    autoComplete="one-time-code"
                                    inputMode="numeric"
                                    onChange={(e) => {
                                      const value = e.target.value.replace(/\D/g, "");
                                      setEmailOtp(value);
                                      setEmailMessage("");
                                    }}
                                  />

                                  <button
                                    className="verify-otp-btn"
                                    onClick={handleEmailVerification}
                                  >
                                    Verify OTP
                                  </button>
                                </div>

                                {emailMessage && (
                                  <p
                                    className={
                                      emailVerified
                                        ? "otp-success-message"
                                        : "otp-error-message"
                                    }
                                  >
                                    {emailMessage}
                                  </p>
                                )}

                                <p className="resend-text">
                                  Didn't receive the OTP?
                                  <span onClick={handleSendEmailOtp}> Resend OTP</span>
                                </p>
                              </>
                            )}

                            {emailVerified && (
                              <div className="email-verified-message">
                                <FaCheckCircle />
                                <span>Your student email has been successfully verified.</span>
                              </div>
                            )}

                  </div>


{/* =================       ROLL NUMBER VERIFICAITON ================================= */}


<div className="roll-number-card">

  {/* Heading */}
  <div className="roll-number-heading">

    <div className="roll-number-icon">
      <FaIdCard />
    </div>

    <div>
      <h3>3. Student Roll Number</h3>
      <p>Enter your college roll number.</p>
    </div>

  </div>


  {/* Input */}
  <div className="roll-number-input-wrapper">

    <input
      type="text"
      placeholder="Enter your college roll number"
      value={rollNumber}
      disabled={rollSubmitted}

      className={
        rollNumberMessage && !rollSubmitted
          ? "roll-number-input-error"
          : ""
      }

      onChange={(e) => {
        const value = e.target.value;

        setRollNumber(value);

        // Remove error when user starts typing
        setRollNumberMessage("");

        // Keep submitted state false while editing
        setRollSubmitted(false);
      }}
    />

    {/* Green check after successful submission */}
    {rollSubmitted && (
      <span className="roll-number-check">
        <FaCheckCircle />
      </span>
    )}

  </div>


  {/* Error Message
   {rollNumberMessage && !rollSubmitted && (
  <div className="roll-number-error-message">
    <FaExclamationCircle />
    <span>{rollNumberMessage}</span>
  </div>
)}  */}
 {rollNumberMessage && !rollSubmitted && (
  <div className="college-verification-error">
    <FaExclamationCircle />
    <span>{rollNumberMessage}</span>
  </div>
)} 


  {/* Submit Button */}
  {!rollSubmitted && (
    <button
      type="button"
      className="roll-number-submit-btn"

      onClick={() => {

        // 1. Check empty field
        if (!rollNumber.trim()) {
          setRollNumberMessage(
            "Please enter your college roll number."
          );
          return;
        }


        // 2. Check valid roll number
        const rollNumberPattern = /^[A-Za-z0-9-]+$/;

        if (!rollNumberPattern.test(rollNumber.trim())) {
          setRollNumberMessage(
            "Please enter a valid roll number."
          );
          return;
        }


        // 3. Successful submission
        setRollNumberMessage("");
        setRollSubmitted(true);

      }}
    >
      Submit Roll Number
    </button>
  )}

</div>

{/* ========================== ADDRESS VERIFICATION============================= */}

<div className="address-verification-card">

                              <div className="address-verification-heading">

                                <div className="address-verification-icon">
                                  <FaMapMarkerAlt />
                                </div>

                                <div>
                                  <h3>5. Address Verification</h3>
                                  <p>Enter your current residential address for verification.</p>
                                </div>

                                {addressSubmitted && (
                                  <div className="address-verification-check">
                                    <FaCheckCircle />
                                  </div>
                                )}

                              </div>


                              <div className="address-verification-form">

                                {/* FULL ADDRESS */}

                                <div className="address-verification-field address-verification-full">
                                  <label>Full Address</label>

                                  <textarea
                                    value={addressData.address}
                                    onChange={(e) =>
                                      handleAddressChange("address", e.target.value)
                                    }
                                    placeholder="House no., street, area, locality..."
                                    className={addressErrors.address ? "address-verification-error" : ""}
                                  />

                                  {addressErrors.address && (
                                    <small>{addressErrors.address}</small>
                                  )}
                                </div>


                                {/* CITY */}

                                <div className="address-verification-field">
                                  <label>City</label>

                                  <input
                                    type="text"
                                    value={addressData.city}
                                    onChange={(e) =>
                                      handleAddressChange("city", e.target.value)
                                    }
                                    placeholder="Enter city"
                                    className={addressErrors.city ? "address-verification-error" : ""}
                                  />

                                  {addressErrors.city && (
                                    <small>{addressErrors.city}</small>
                                  )}
                                </div>


                                {/* STATE */}

                                <div className="address-verification-field">
                                  <label>State</label>

                                  <input
                                    type="text"
                                    value={addressData.state}
                                    onChange={(e) =>
                                      handleAddressChange("state", e.target.value)
                                    }
                                    placeholder="Enter state"
                                    className={addressErrors.state ? "address-verification-error" : ""}
                                  />

                                  {addressErrors.state && (
                                    <small>{addressErrors.state}</small>
                                  )}
                                </div>


                                {/* PIN CODE */}

                                <div className="address-verification-field">
                                  <label>PIN Code</label>

                                  <input
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="6"
                                    value={addressData.pincode}
                                    onChange={(e) =>
                                      handleAddressChange(
                                        "pincode",
                                        e.target.value.replace(/\D/g, "")
                                      )
                                    }
                                    placeholder="6-digit PIN"
                                    className={addressErrors.pincode ? "address-verification-error" : ""}
                                  />

                                  {addressErrors.pincode && (
                                    <small>{addressErrors.pincode}</small>
                                  )}
                                </div>

                              </div>


                              <div className="address-verification-footer">

                                <p>
                                  <FaShieldAlt />
                                  Your address will be reviewed by the CampusXchange admin.
                                </p>

                                <button
                                  type="button"
                                  className="address-verification-save-btn"
                                  onClick={handleAddressSubmit}
                                >
                                  {addressSubmitted ? "Address Submitted" : "Save Address"}
                                </button>

                              </div>
                            </div>

</div>


{/* ========================  PHONE VERIFICATION ================================= */}
<div className="verification-column">

<div className="email-verification-card">

                            <div className="email-verification-card-heading">

                              <div className="email-verification-icon">
                                <FaMobile />
                              </div>

                              <div>
                                <h3>2. Phone Number</h3>
                                <p>Enter your mobile number.</p>
                              </div>

                            </div>

                            <div className="email-verification-input-row">

                              <input
                                  type="tel"
                                  placeholder="Enter your phone number"
                                  value={phone}
                                  maxLength={10}
                                  className={phoneMessage && !phoneSaved ? "input-error" : ""}
                                  onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "");
                                    setPhone(value);
                                    setPhoneSaved(false);
                                    setPhoneMessage("");
                                  }}
                                />

                              {phoneSaved && (
                                <span className="email-verified-badge">
                                  <FaCheckCircle />
                                  Saved
                                </span>
                              )}

                            </div>

                            <button
                              className="save-phone-btn"
                              onClick={() => {
                                if (phone.length !== 10) {
                                  setPhoneMessage("Please enter a valid 10-digit phone number.");
                                  setPhoneSaved(false);
                                  return;
                                }

                                setPhoneSaved(true);
                                setPhoneMessage("Phone number saved successfully.");
                              }}
                            >
                              Save Phone Number
                            </button>

                            {phoneMessage && (
                              <div
                                className={`phone-message ${
                                  phoneSaved ? "phone-success" : "phone-error"
                                }`}
                              >
                                <FaCheckCircle />
                                <span>{phoneMessage}</span>
                              </div>
                            )}

                          </div>



{/* ================================ STUDENT ID CARD VERIFICATION ============================ */}


<div className="student-id-card">

                      <div className="student-id-heading">

                        <div className="student-id-icon">
                          <FaIdCard />
                        </div>

                        <div>
                          <h3>4. Student ID Card</h3>
                          <p>Upload both sides of your valid college ID card.</p>
                        </div>

                      </div>


                      <div className="student-id-upload-grid">

                        {/* FRONT SIDE */}
                                
                                  <div className="student-id-upload-box">

                                    <h4>Front Side</h4>

                                    {idFront ? (
                                      <div className="student-id-image-preview">
                                        <img src={idFront} alt="Student ID front" />
                                      </div>
                                    ) : (
                                      <div className="student-id-preview">
                                        <FaCloudUploadAlt />
                                        <span>Upload front side</span>
                                      </div>
                                    )}

                                    <input
                                      id="front-id-upload"
                                      type="file"
                                      accept="image/jpeg,image/png"
                                      hidden
                                      onChange={(e) => {
                                        const file = e.target.files?.[0];

                                        if (!file) return;

                                        if (file.size > 5 * 1024 * 1024) {
                                          alert("Image size must be 5MB or less.");
                                          return;
                                        }

                                        setIdFront(URL.createObjectURL(file));
                                      }}
                                    />

                                    <label
                                      htmlFor="front-id-upload"
                                      className="student-id-upload-btn"
                                    >
                                      {idFront ? "Change Image" : "Upload Image"}
                                    </label>

                                    <small>JPG, PNG • Max 5MB</small>

                                  </div>


                        {/* BACK SIDE */}
                          {/* BACK SIDE */}

                            <div className="student-id-upload-box">

                              <h4>Back Side</h4>

                              {idBack ? (
                                <div className="student-id-image-preview">
                                  <img src={idBack} alt="Student ID back" />
                                </div>
                              ) : (
                                <div className="student-id-preview">
                                  <FaCloudUploadAlt />
                                  <span>Upload back side</span>
                                </div>
                              )}

                              <input
                                id="back-id-upload"
                                type="file"
                                accept="image/jpeg,image/png"
                                hidden
                                onChange={(e) => {
                                  const file = e.target.files?.[0];

                                  if (!file) return;

                                  if (file.size > 5 * 1024 * 1024) {
                                    alert("Image size must be 5MB or less.");
                                    return;
                                  }

                                  setIdBack(URL.createObjectURL(file));
                                }}
                              />

                              <label
                                htmlFor="back-id-upload"
                                className="student-id-upload-btn"
                              >
                                {idBack ? "Change Image" : "Upload Image"}
                              </label>

                              <small>JPG, PNG • Max 5MB</small>

                            </div>

                            </div>

                      </div>


{/* --------------------college verification----------------------- */}

<div className="college-verification-card">

  <div className="college-verification-heading">
    <div className="college-verification-icon">
      <FaUniversity />
    </div>

    <div>
      <h3>6. College / University</h3>
      <p>
        Enter the official name of your college or university.
      </p>
    </div>
  </div>


  <div className="college-verification-field">

    <label>College / University Name</label>

    <div className="college-input-wrapper">

      <input
        type="text"
        value={collegeName}
        disabled={collegeSubmitted}
        placeholder="Enter your college or university name"
        className={collegeError ? "college-input-error" : ""}
        onChange={(e) => {
          setCollegeName(e.target.value);
          setCollegeError("");
          setCollegeSubmitted(false);
        }}
      />

      {collegeSubmitted && collegeName.trim() && (
        <span className="college-verification-check">
          <FaCheckCircle />
        </span>
      )}

    </div>


    {collegeError && (
      <div className="college-verification-error">
        <FaExclamationCircle />
        <span>{collegeError}</span>
      </div>
    )}

  </div>


  <div className="college-verification-footer">

    <p>
      <FaShieldAlt />
      Your details will be reviewed by the CampusXchange admin.
    </p>


    {!collegeSubmitted && (
      <button
        type="button"
        className="college-verification-submit-btn"
        onClick={(e) => {
          e.preventDefault();

          if (!collegeName.trim()) {
            setCollegeError(
              "Please enter your college or university name."
            );
            setCollegeSubmitted(false);
            return;
          }

          setCollegeError("");
          setCollegeSubmitted(true);
        }}
      >
        Submit College
      </button>
    )}


    {collegeSubmitted && collegeName.trim() && (
      <div className="college-submitted-status">
        <FaCheckCircle />
        <span>College submitted</span>
      </div>
    )}

  </div>

</div>

</div>


          </div>

{/* SECURITY MESSAGE */}




          {/* SECURITY MESSAGE */}

          <div className="verification-security-message">

            <FaLock />

            <span>
              Your information is secure and will only be used
              for verification purposes.
            </span>

          </div>

        {/* =========================
    FINAL VERIFICATION
========================= */}
 
<div className="final-verification-card">

  <div className="final-verification-content">

    <div className="final-verification-icon">
      <FaShieldAlt />
    </div>

    <div>
      <h3>Ready for Final Verification?</h3>

      <p>
        Submit all your details to the CampusXchange admin
        for final student verification.
      </p>
    </div>

  </div>


  {finalVerificationError && (
    <div className="final-verification-error">
      <FaExclamationCircle />
      <span>{finalVerificationError}</span>
    </div>
  )}


  {!finalVerificationSubmitted ? (
  <button
  type="button"
  className="final-verification-btn"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();

    const incomplete = [];

    if (!emailVerified) {
      incomplete.push("Email");
    }

    if (!phoneSaved) {
      incomplete.push("Phone Number");
    }

    if (!rollSubmitted || !rollNumber.trim()) {
      incomplete.push("Roll Number");
    }

    if (!idFront || !idBack) {
      incomplete.push("Student ID Card");
    }

    if (!addressSubmitted) {
      incomplete.push("Address");
    }

    if (!collegeSubmitted || !profileData.college.trim()) {
      incomplete.push("College / University");
    }

    if (incomplete.length > 0) {
      setFinalVerificationError(
        `Please complete: ${incomplete.join(", ")}.`
      );
      return;
    }

    setFinalVerificationError("");
    setFinalVerificationSubmitted(true);
  }}
>
  Proceed to Final Verification
</button>
) : (
  <div className="final-verification-success">

    <div className="final-success-icon">
      <FaCheckCircle />
    </div>

    <div className="final-success-text">
      <strong>Details Sent for Verification</strong>

      <span>
        Your student details have been successfully submitted.
        Please wait while the CampusXchange admin reviews your
        profile.
      </span>
    </div>

    <span className="final-pending-badge">
      Pending Admin Review
    </span>

  </div>
)}

</div>

        </section>



        {/* =========================
            RIGHT SIDE
        ========================= */}

        <aside className="profile-right-column">

          {/* =====================
              PROFILE VERIFICATION
          ===================== */}

          <div className="profile-verification-card">

            <div className="verification-top">

              <div className="verification-shield">
                <FaShieldAlt />
              </div>

              <div>
                <h2>Profile Verification</h2>

                <p>
                  Complete your details to unlock full access
                  to buy, sell and chat on CampusXchange.
                </p>
              </div>

            </div>


            <div className="verification-progress">

              <div className="progress-circle">
                <span>40%</span>
              </div>


              <div className="progress-list">

                <div className="progress-item completed">
                  <FaCheckCircle />
                  <span>Basic Info</span>
                </div>

                <div className="progress-item completed">
                  <FaCheckCircle />
                  <span>Email Verification</span>
                </div>

                <div className="progress-item">
                  <FaRegCircle />
                  <span>Phone Verification</span>
                </div>

                <div className="progress-item">
                  <FaRegCircle />
                  <span>Student Verification</span>
                </div>

                <div className="progress-item">
                  <FaRegCircle />
                  <span>Address Verification</span>
                </div>

              </div>

            </div>

          </div>


          {/* =====================
              PROFILE DETAILS
          ===================== */}

   <div className="profile-details-card">

  <div className="right-card-heading">
    <h2>Profile Details</h2>

    {/* {!isDetailsEditing ? (
      <button
        type="button"
        onClick={() => setIsDetailsEditing(true)}
      >
        Edit
      </button>
    ) : (
      <div className="profile-details-actions">

        <button
          type="button"
          className="details-cancel-btn"
          onClick={() => setIsDetailsEditing(false)}
        >
          Cancel
        </button>

        <button
          type="button"
          className="details-save-btn"
          onClick={() => setIsDetailsEditing(false)}
        >
          Save
        </button>

      </div>
    )} */}
  </div>


  {/* FULL NAME */}
  <div className="profile-detail-item">
    <FaUser />

    <div className="profile-detail-content">
      <span>Full Name</span>

      {isDetailsEditing ? (
        <input
          type="text"
          value={profileData.name}
          onChange={(e) =>
            handleProfileChange("name", e.target.value)
          }
        />
      ) : (
        <strong>{profileData.name}</strong>
      )}
    </div>
  </div>


  {/* EMAIL */}
  <div className="profile-detail-item">
    <FaEnvelope />

    <div className="profile-detail-content">
      <span>Email</span>

      {isDetailsEditing ? (
        <input
  type="email"
  value={email}
  onChange={(e) => {
    setEmail(e.target.value);
    setEmailMessage("");
  }}
  placeholder="Enter your email address"
  required
/>
      ) : (
        <strong>
          {email || ""}
        </strong>
      )}
    </div>

    {/* {!isDetailsEditing && (
      <b className="detail-verified">
        ✓ Verified
      </b>
    )} */}
  </div>


  {/* MOBILE */}
  <div className="profile-detail-item">
    <FaPhone />

    <div className="profile-detail-content">
      <span>Mobile Number</span>

      {isDetailsEditing ? (
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      ) : (
        <strong>
          {phone || ""}
        </strong>
      )}
    </div>

    {/* {!isDetailsEditing && (
      <b className="detail-verified">
        ✓ Verified
      </b>
    )} */}
  </div>


  {/* ROLL NUMBER */}
  <div className="profile-detail-item">
    <FaIdCard />

    <div className="profile-detail-content">
      <span>Roll Number</span>

      {isDetailsEditing ? (
        <input
          type="text"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />
      ) : (
        <strong>
          {rollNumber || ""}
        </strong>
      )}
    </div>

    {/* {!isDetailsEditing && (
      <b className="detail-verified">
        ✓ Verified
      </b>
    )} */}
  </div>


  {/* COLLEGE */}
  <div className="profile-detail-item">
    <FaGraduationCap />

    <div className="profile-detail-content">
      <span>College / University</span>

      {isDetailsEditing ? (
        <input
          type="text"
          value={profileData.college}
          onChange={(e) =>
            handleProfileChange("college", e.target.value)
          }
        />
      ) : (
        <strong>{profileData.college}</strong>
      )}
    </div>

    {/* {!isDetailsEditing && (
      <b className="detail-verified">
        ✓ Verified
      </b>
    )} */}
  </div>


  {/* COURSE */}
  <div className="profile-detail-item">
    <FaGraduationCap />

    <div className="profile-detail-content">
      <span>Course</span>

      {isDetailsEditing ? (
        <input
          type="text"
          value={profileData.course}
          onChange={(e) =>
            handleProfileChange("course", e.target.value)
          }
        />
      ) : (
        <strong>{profileData.course}</strong>
      )}
    </div>
  </div>


  {/* GRADUATION YEAR */}
  <div className="profile-detail-item">
    <FaGraduationCap />

    <div className="profile-detail-content">
      <span>Graduation Year</span>

      {isDetailsEditing ? (
        <input
          type="text"
          value={profileData.year}
          onChange={(e) =>
            handleProfileChange("year", e.target.value)
          }
        />
      ) : (
        <strong>{profileData.year}</strong>
      )}
    </div>
  </div>


  {/* ADDRESS */}
  <div className="profile-detail-item">
    <FaMapMarkerAlt />

    <div className="profile-detail-content">
      <span>Address</span>

      {isDetailsEditing ? (
        <textarea
          value={profileData.address}
          onChange={(e) =>
            handleProfileChange("address", e.target.value)
          }
        />
      ) : (
        <strong>{profileData.address}</strong>
      )}
    </div>
  </div>

</div>

          {/* =====================
              GUIDELINES
          ===================== */}

          <div className="guidelines-card">

            <div className="guidelines-icon">
              <FaInfoCircle />
            </div>

            <div>
              <h3>Verification Guidelines</h3>

              <p>
                Know what documents are required and how
                to complete the verification process.
              </p>
            </div>

            <FaArrowRight className="guidelines-arrow" />

          </div>


          {/* =====================
              PROFILE LOCK CARD
          ===================== */}

          <div className="profile-lock-card">

            <div className="lock-icon">
              <FaLock />
            </div>

            <div>
              <h3>Complete Your Profile to Unlock</h3>

              <p>
                You won't be able to buy, sell or chat with sellers
                until your profile is 100% verified.
              </p>
            </div>

          </div>

        </aside>

      </div>

    </main>
    
    </div>
    </div>
    </>
  );
};

export default Profile;