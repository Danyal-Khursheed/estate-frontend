import React from "react";
import { FiX } from "react-icons/fi";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom"; // Replace with your routing library if not using react-router-dom.

const HeaderListing = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full border-b flex items-center justify-between px-4 py-3">
      {/* Logo in Center */}
      <div className="flex-1 flex justify-center">
        <img src={Logo} alt="Logo" className="h-10 lg:h-12" />
      </div>

      {/* Close Button on Right */}
      <button
        className="text-black text-2xl flex items-center"
        onClick={() => navigate("/")} // Redirect to homepage
        aria-label="Close"
      >
        <FiX />
      </button>
    </header>
  );
};

export default HeaderListing;
