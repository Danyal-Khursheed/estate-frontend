import React, { useState } from "react";
import { FiPhone, FiBell, FiMessageSquare, FiCamera } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Logo from "../../assets/logo.png";
import LogInPage from "../../pages/LogIn";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleAddListingClick = () => {
    if (!isLoggedIn) {
      setIsOpen(true); // Open login popup if the user is not logged in
    } else {
      navigate("/property-listing"); // Navigate to /property-listing if logged in
    }
  };
  return (
    <header className="w-full border-b ">
      {/* Top Line */}
      <div className="flex justify-end bg-[#f2f2f7] items-center px-4 py-1">
        <div className="flex justify-end items-center space-x-3 mx-auto w-full lg:w-[90%]">
          <span className="text-sm lg:text-md font-[700] text-black">
            Contact Us
          </span>
          <FiPhone className="text-sm lg:text-md text-black font-[700]" />
          <span className="px-2 py-1 font-[700] text-sm lg:text-md text-black rounded">
            عربي
          </span>
        </div>
      </div>

      {/* Middle Line */}
      <div className="flex flex-wrap justify-between items-center px-4 py-4 mx-auto w-full lg:w-[90%]">
        {/* Logo */}
        <div className="flex space-x-4 items-center">
          <img src={Logo} alt="Logo" className="h-10 lg:h-12" />
          <div className="flex items-center">
            <FaLocationDot size={18} className="text-black" />
            <select className="border-transparent  px-2 py-1 text-md lg:text-md">
              <option>Iraq - All Cities</option>
              <option>Baghdad</option>
              <option>Mosul</option>
              <option>Basra</option>
              <option>Erbil</option>
              <option>Najaf</option>
              <option>Karbala</option>
              <option>Saladin</option>
              <option>Sulaymaniyah</option>
              <option>Al Anbar</option>
              <option>Babyion</option>
              <option>Kirkuk</option>
              <option>Dohuk</option>
              <option>Diyala</option>
              <option>Dhi Qar</option>
              <option>Qadisiyah</option>
              <option>Muthanna</option>
              <option>Maysan</option>
              <option>Wasit</option>
            </select>
          </div>
        </div>

        {/* Right Section */}
        <div className="hidden sm:flex items-center flex-wrap space-y-2 lg:space-y-0">
          {/* Icons */}
          <div className="flex items-center space-x-7 me-6">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              fill="none"
              width="25"
              height="25"
              data-name="iconMyPosts"
            >
              {" "}
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.2 2.2L13.8 2.2V15.8L4.2 15.8L4.2 2.2ZM3 2.2C3 1.53726 3.53726 1 4.2 1H13.8C14.4627 1 15 1.53726 15 2.2V15.8C15 16.4627 14.4627 17 13.8 17H4.2C3.53726 17 3 16.4627 3 15.8V2.2ZM5.2001 6.59935C4.86873 6.59935 4.6001 6.86798 4.6001 7.19935V14.7993C4.6001 15.1307 4.86873 15.3993 5.2001 15.3993H12.8001C13.1315 15.3993 13.4001 15.1307 13.4001 14.7993V7.19935C13.4001 6.86798 13.1315 6.59935 12.8001 6.59935H5.2001ZM4.6001 3.53268C4.6001 3.31177 4.77918 3.13268 5.0001 3.13268H13.0001C13.221 3.13268 13.4001 3.31177 13.4001 3.53268C13.4001 3.7536 13.221 3.93268 13.0001 3.93268H5.0001C4.77918 3.93268 4.6001 3.7536 4.6001 3.53268ZM5.0001 4.73145C4.77918 4.73145 4.6001 4.91053 4.6001 5.13145C4.6001 5.35236 4.77918 5.53145 5.0001 5.53145H9.8001C10.021 5.53145 10.2001 5.35236 10.2001 5.13145C10.2001 4.91053 10.021 4.73145 9.8001 4.73145H5.0001Z"
                fill="#000000"
              ></path>{" "}
            </svg>{" "}
            <div>
              {" "}
              <span class="sc-952fd652-1 eBWKgg absolute inline fullRadius center whiteColor">
                {" "}
                1{" "}
              </span>{" "}
              <svg
                viewBox="0 0 20 25"
                class="relative"
                width="20"
                height="25"
                data-name="iconNotifications"
              >
                {" "}
                <path
                  fill="#000"
                  d="M10 24.5C11.375 24.5 12.5 23.375 12.5 22H7.5C7.5 23.375 8.6125 24.5 10 24.5ZM17.5 17V10.75C17.5 6.9125 15.45 3.7 11.875 2.85V2C11.875 0.9625 11.0375 0.125 10 0.125C8.9625 0.125 8.125 0.9625 8.125 2V2.85C4.5375 3.7 2.5 6.9 2.5 10.75V17L0 19.5V20.75H20V19.5L17.5 17Z"
                ></path>{" "}
              </svg>{" "}
            </div>{" "}
            <div>
              {" "}
              <svg
                viewBox="0 0 26 26"
                class="relative"
                width="25"
                height="25"
                data-name="IconChatMsgs"
              >
                {" "}
                <path
                  fill="#000000"
                  d="M24.25 5.5H21.75V16.75H5.5V19.25C5.5 19.9375 6.0625 20.5 6.75 20.5H20.5L25.5 25.5V6.75C25.5 6.0625 24.9375 5.5 24.25 5.5ZM19.25 13V1.75C19.25 1.0625 18.6875 0.5 18 0.5H1.75C1.0625 0.5 0.5 1.0625 0.5 1.75V19.25L5.5 14.25H18C18.6875 14.25 19.25 13.6875 19.25 13Z"
                ></path>{" "}
              </svg>{" "}
            </div>{" "}
          </div>
          {/* Buttons */}
          <div className="flex items-center space-x-2">
            <button
              className="border border-[#127b41] rounded-lg px-3 py-1 text-[#127b41] font-bold text-sm lg:text-lg flex items-center"
              onClick={() => setIsOpen(true)}
            >
              <FaUser className="text-[#127b41] me-1" />
              Login or Sign Up
            </button>
            <button
              className="border border-[#127b41] rounded-lg px-3 py-1 text-[#127b41] font-bold text-sm lg:text-lg flex items-center"
              onClick={() => navigate("/super-admin/login")}
            >
              <FaUser className="text-[#127b41] me-1" />
              Login As admin
            </button>
            <button
              className="bg-[#c4321c] text-white px-3 py-1 rounded-lg text-sm lg:text-lg font-bold flex items-center"
              onClick={handleAddListingClick}
            >
              <FiCamera className="me-1" />
              Add New Listing
            </button>
          </div>
        </div>

        {/* Mobile View Buttons */}
        <div className="sm:hidden flex items-center space-x-2 mt-2">
          <button
            className="border-2 border-[#0061fe] rounded-lg px-3 py-1 text-[#0061fe] font-bold text-xs flex items-center"
            onClick={() => setIsOpen(true)}
          >
            <FaUser className="text-[#0061fe] me-1" />
            Login
          </button>
          <button className="bg-[#f39c12] text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center">
            <FiCamera className="me-1" />
            Add Listing
          </button>
        </div>
      </div>

      {/* Black Line */}
      <div className="bg-black text-white px-4 py-2">
        <nav className="relative mx-auto w-full lg:w-[90%]">
          <ul className="flex space-x-4 text-sm lg:text-md">
            <li className="relative group">
              <a href="#" className="hover:underline">
                Real Estate
              </a>
              <ul className="absolute hidden group-hover:block bg-white text-black shadow-lg rounded mt-2 w-48 h-48">
                <li className="px-4 py-2 hover:bg-gray-100">
                  <a href="#">Real Estate for Rent</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <a href="#">Real Estate for Sale</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex items-center justify-center container mx-auto w-full md:w-[85%] ">
        <input
          placeholder="Search in Beseqar"
          className="input my-6 px-3 w-full py-3 border border-black"
        />
        <button className="bg-[#c4321c] px-14 py-3 text-white border border-black font-[600]">
          Search
        </button>
      </div>
      {isOpen && <LogInPage setIsOpen={setIsOpen} />}
    </header>
  );
};

export default Header;
