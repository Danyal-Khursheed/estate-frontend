import { useState } from "react";
import { FiPlus } from "react-icons/fi"; // For the plus icon
import { FaUserCircle } from "react-icons/fa"; // For the profile icon
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    navigate("/");
  };

  return (
    <>
      <header className="p-4 shadow">
        <div className="flex items-center justify-between space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 rounded-lg py-1 px-3 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            onClick={() => setShowLogoutPopup(true)}
            className="bg-gray-400 text-white w-24 h-12 cursor-pointer rounded-md"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Logout Confirmation Popup */}
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
    </>
  );
};

export default Header;
