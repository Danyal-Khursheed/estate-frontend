import { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // Icons for dropdown
import Logo from "../../assets/logo.png"

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-64 h-screen bg-white text-gray-800 flex flex-col shadow-lg">
      {/* Sidebar Header */}
      <div className="p-4 text-2xl font-bold border-b border-gray-200">
        <img src={Logo} alt="Logo"  />
      </div>
      
      {/* Sidebar Navigation */}
      <nav className="flex flex-col mt-4">
        {/* Listing Section */}
        <div>
          <button
            onClick={toggleDropdown}
            className="w-full px-4 py-2 flex items-center justify-between rounded hover:bg-gray-100 hover:text-blue-600"
          >
            <span>Listing</span>
            {isDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
          </button>

          {/* Dropdown Links */}
          {isDropdownOpen && (
            <div className="pl-6 mt-2 space-y-2">
              <Link
                to="/dashboard/mylisting"
                className="block px-4 py-2 rounded hover:bg-gray-100 hover:text-blue-600"
              >
                My Listing
              </Link>
              <Link
                to="/dashboard/favtlisting"
                className="block px-4 py-2 rounded hover:bg-gray-100 hover:text-blue-600"
              >
                Favt Listing
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
