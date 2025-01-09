import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom"; // Replace with your routing library if not using react-router-dom.

const HeaderListing = () => {
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    navigate("/");
  };

  return (
    <header className="w-full border-b flex items-center justify-between px-4 py-3">
      {/* Logo in Center */}
      <div className="flex-1 flex justify-center">
        <img src={Logo} alt="Logo" className="h-10 lg:h-12" />
      </div>

      {/* Close Button on Right */}
      <button
        onClick={() => setShowLogoutPopup(true)}
        className="bg-gray-400 text-white w-24 h-12 cursor-pointer rounded-md"
      >
        Logout
      </button>
      {showLogoutPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
            <p className="mb-6">Do you really want to logout?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutPopup(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderListing;
