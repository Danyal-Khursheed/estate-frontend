import React, { useEffect, useState, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "react-phone-input-2/lib/style.css";
import { baseURl } from "../../Constant/constants";
import Loader from "../../Constant/Loader";

const STAGES = {
  PHONE: 1,
  VERIFICATION_METHOD: 2,
  OTP: 3,
  PASSWORD: 4,
  SUCCESS: 5,
};

const API_BASE_URL = `${baseURl}/auth`;

const ALLOWED_COUNTRIES = [
  "pk",
  "sa",
  "kw",
  "jo",
  "eg",
  "iq",
  "om",
  "ly",
  "ye",
  "ps",
  "ae",
  "qa",
  "lb",
  "mr",
  "bh",
  "ma",
  "tn",
  "tr",
];

const LogInPage = ({ setIsOpen }) => {
  const navigate = useNavigate();
  const [stage, setStage] = useState(STAGES.PHONE);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
    password: "",
    role: "User",
    error: "",
  });

  useEffect(() => {
    document.body.style.overflow = setIsOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [setIsOpen]);

  const handleApiCall = useCallback(async (endpoint, payload) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      await Swal.fire({
        title: data.success ? "Success!" : "Error",
        text: data.message.message || "An unexpected error occurred.",
        icon: data.success ? "success" : "error",
        confirmButtonText: "OK",
      });

      return data;
    } catch (error) {
      await Swal.fire({
        title: "Error",
        text: error.message || "Failed to submit data. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const handlePhoneSubmit = useCallback(async () => {
    if (!formData.phone) {
      setFormData((prev) => ({
        ...prev,
        error: "Please enter your mobile number.",
      }));
      return;
    }

    try {
      const response = await handleApiCall("verifyUser", {
        phone: formData.phone,
      });
      if (response?.success) {
        if (response.message.user.status === "approved") {
          setStage(STAGES.PASSWORD);
        } else {
          setStage(STAGES.VERIFICATION_METHOD);
        }
      }
    } catch (error) {
      console.error("Phone verification failed:", error);
    }
  }, [formData.phone, handleApiCall]);

  const handleSendOtp = async () => {
    try {
      await handleApiCall("sendOTP", {
        phone: formData.phone,
      });
      setStage(STAGES.OTP);
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  };

  const handleOtpVerification = useCallback(async () => {
    try {
      const response = await handleApiCall("verifyOTP", {
        phone: formData.phone,
        otp: String(formData.otp),
      });
      if (response?.success) {
        setStage(STAGES.PASSWORD);
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  }, [formData.phone, formData.otp, handleApiCall]);

  const handleRegistration = useCallback(async () => {
    try {
      const response = await handleApiCall("register", {
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
      });
      if (response?.success) {
        setStage(STAGES.SUCCESS);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setStage(STAGES.OTP);
    }
  }, [formData, handleApiCall]);

  const renderStageContent = () => {
    switch (stage) {
      case STAGES.PHONE:
        return (
          <div className="grid grid-cols-2 border-t">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-md font-semibold">Mobile Number</p>
              <PhoneInput
                country="pk"
                onlyCountries={ALLOWED_COUNTRIES}
                value={formData.phone}
                onChange={(phone) =>
                  setFormData((prev) => ({ ...prev, phone, error: "" }))
                }
                inputStyle={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                }}
                dropdownStyle={{ zIndex: 1000 }}
                className="rounded-lg mt-4"
              />
              {formData.error && (
                <p className="text-red-500 mt-2">{formData.error}</p>
              )}
              <button
                className="bg-blue-600 text-white font-medium rounded-md w-full flex justify-center items-center py-3 mt-4"
                onClick={handlePhoneSubmit}
                disabled={loading}
              >
                {loading ? <Loader /> : "Next"}
              </button>
              <div className="flex flex-col min-h-40">
                <div className="mt-auto text-center mb-4">
                  <p>By using OpenSooq you agree to</p>
                  <p>
                    <span className="text-blue-600">Terms of Use</span> and
                    <span className="text-blue-600"> Content Policy</span>
                  </p>
                </div>
              </div>
            </div>
            <BenefitsSection />
          </div>
        );

      case STAGES.VERIFICATION_METHOD:
        return (
          <VerificationMethodSection
            phone={formData.phone}
            handleSendOtp={handleSendOtp}
          />
        );

      case STAGES.OTP:
        return (
          <OtpSection
            onVerify={handleOtpVerification}
            formData={formData}
            setFormData={setFormData}
          />
        );

      case STAGES.PASSWORD:
        return (
          <PasswordSection
            phone={formData.phone}
            password={formData.password}
            onPasswordChange={(password) =>
              setFormData((prev) => ({ ...prev, password }))
            }
            onSubmit={handleRegistration}
          />
        );

      case STAGES.SUCCESS:
        return (
          <SuccessSection
            onContinue={() => setIsOpen(false)}
            onAddListing={() => {
              setIsOpen(false);
              navigate("/property-listing");
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[48%]">
        <div className="p-4 items-center grid grid-cols-2">
          <div className="flex items-center space-x-4">
            <IoMdClose
              className="rounded-full p-2 border border-zinc-200 w-10 h-10 cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
            {stage === STAGES.PHONE && (
              <div className="flex-col space-y-3">
                <p className="text-xl font-semibold">Login or Register</p>
                <p className="text-md">Please fill Mobile number</p>
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <p className="text-blue-600 font-medium">Help?</p>
          </div>
        </div>
        {renderStageContent()}
      </div>
    </div>
  );
};

// Separate components for better organization
const BenefitsSection = () => (
  <div className="p-4">
    <p className="text-md">The best way to</p>
    <p className="text-xl font-semibold mt-2">Sell or Buy Anything</p>
    {[
      "Join Millions of people using OpenSooq",
      "Promote trust and safety by logging in",
      "Check and respond to chats, replies, and offers",
      "Manage your favorite and saved listings",
      "Earn money and manage your listings",
    ].map((benefit, index) => (
      <div key={index} className="flex space-x-2 mt-4">
        <FaCheck className="w-6 h-6 p-1 text-lime-600 border rounded-full" />
        <p>{benefit}</p>
      </div>
    ))}
  </div>
);

const VerificationMethodSection = ({ phone, handleSendOtp }) => (
  <div className="pb-6 px-20">
    <h2 className="text-lg font-semibold text-gray-800 mb-3">
      Verification Code
    </h2>
    <p className="text-gray-600 text-sm mb-4">
      To build trust and protect users as per local laws and regulations, please
      verify your mobile number <span className="font-bold">{phone}</span>
    </p>
    <button
      onClick={handleSendOtp}
      className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-green-600"
    >
      Verify via WhatsApp
    </button>
    <p className="text-xs text-gray-500 mt-4">
      By using OpenSooq you agree to the{" "}
      <a href="#" className="text-blue-500 underline hover:no-underline">
        Terms of Use
      </a>{" "}
      and{" "}
      <a href="#" className="text-blue-500 underline hover:no-underline">
        Content Policy
      </a>
    </p>
  </div>
);

const OtpSection = ({ onVerify, formData, setFormData }) => {
  const [otpDigits, setOtpDigits] = useState(Array(6).fill("")); // State for each digit

  const handleOtpChange = (value, index) => {
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value.slice(-1); // Ensure only the last digit is kept
    setOtpDigits(newOtpDigits);

    setFormData({ ...formData, otp: newOtpDigits.join("") });
  };
  return (
    <div className="pb-6 px-20">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Verification Code
      </h2>
      <p className="text-gray-600 text-sm mb-5">
        Please enter the code you received on your WhatsApp or SMS.
      </p>
      <div className="flex justify-center space-x-8 mb-4">
        {otpDigits.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleOtpChange(e.target.value, index)}
            className="w-10 h-10 border-2 border-gray-300 rounded-md text-center text-lg font-medium focus:outline-none focus:ring focus:ring-green-500"
          />
        ))}
      </div>
      <div className="text-sm text-gray-500 mb-6">
        Resend in <span className="font-bold">0:48</span>
      </div>
      <button
        className="w-full bg-green-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-green-600"
        onClick={onVerify}
      >
        Continue
      </button>
    </div>
  );
};

const PasswordSection = ({ phone, password, onPasswordChange, onSubmit }) => (
  <div className="px-20">
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-lg font-semibold text-gray-800">Password</h2>
    </div>
    <p className="text-gray-700 font-semibold text-sm mb-4">
      Please fill Password
    </p>
    <form className="bg-[#eeedf2] py-6 px-4">
      <label className="text-base text-gray-600 font-bold">Mobile number</label>
      <input
        type="text"
        value={phone}
        readOnly
        className="w-full mb-2 p-2 border-2 border-gray-300 rounded-md text-gray-500 mt-1"
      />
      <label className="text-base text-gray-600 font-bold">Password</label>
      <input
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        type="password"
        placeholder="Enter Password"
        className="w-full mb-4 p-2 border-2 border-gray-300 rounded-md mt-1"
      />
    </form>
    <div className="flex items-center justify-between text-sm text-blue-600 mb-4">
      <p className="cursor-pointer">Forgot Password?</p>
      <div className="flex items-center">
        <input type="checkbox" id="remember" className="mr-2" />
        <label htmlFor="remember">Remember Me</label>
      </div>
    </div>
    <button
      className="w-full bg-blue-600 text-white font-medium rounded-md py-2 mb-5"
      onClick={() => {
        localStorage.setItem("phone", phone);
        onSubmit();
      }}
    >
      Next
    </button>
  </div>
);

const SuccessSection = ({ onContinue, onAddListing }) => (
  <div className="px-20">
    <div className="text-center">
      <div className="flex items-center justify-center mb-4">
        <FaCheck className="w-10 h-10 text-green-500" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Logged in Successfully
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Add a listing or continue browsing
        </p>
      </div>
      <button
        className="w-full bg-blue-600 text-white font-medium rounded-md py-2.5 mb-4"
        onClick={onContinue}
      >
        Continue
      </button>
      <button
        className="w-full flex items-center justify-center bg-orange-500 text-white font-medium rounded-md py-2.5 mb-6"
        onClick={onAddListing}
      >
        <IoCameraOutline className="mt-1 me-1" />
        Add Listing
      </button>
    </div>
  </div>
);

export default LogInPage;
