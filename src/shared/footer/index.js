import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "../../assets/logo.png";
import AppGallery from "../../assets/appGallery.webp";
import GooglePlay from "../../assets/googlePlay.webp";
import AppStore from "../../assets/appStore.webp";
import QrCode from "../../assets/qrBeseqar.webp";
import Mobile from "../../assets/mobile.webp";
const Footer = () => {
  const footerSections = [
    {
      title: "About Beseqar",
      items: ["About Us", "Our Products", "Sitemap", "Other Countries"],
    },
    {
      title: "Support",
      items: [
        "Help",
        "Sales Team",
        "Terms of Use",
        "Privacy Policy",
        "Safety Tips",
      ],
    },
    {
      title: "Prices and Calculators",
      items: [
        "Car Prices and Specifications",
        "Mobile Prices and Specs",
        "Tablets Prices and Specs",
        "Real Estate Prices",
        "Buy vs. Rent Calculator",
        "Loan Calculator",
      ],
    },
    {
      title: "Others",
      items: [
        "Sell Anything",
        "Top Sold Cars in Iraq",
        "Tags",
        "Autos Service Centers",
        "Prayer Times",
        "Weather",
        "CARFAX Report",
        "Read",
        "Area Guide",
        "Brands",
      ],
    },
  ];

  return (
    <div>
      <footer className="bg-gray-100 text-black px-4 py-8">
        <div className=" mx-auto  w-[98%] md:w-[90%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Left Section */}
          <div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center  ">
                <img src={Logo} alt="Logo" className="h-10 lg:h-12" />
              </div>
            </div>
            <p className="text-sm mt-2">
              All rights reserved
              <br />
              to Beseqar © 2024
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <FaFacebookF className="text-blue-600 text-xl cursor-pointer" />
              <FaXTwitter className="text-blue-400 text-xl cursor-pointer" />
              <FaInstagram className="text-pink-600 text-xl cursor-pointer" />
              <FaYoutube className="text-red-600 text-xl cursor-pointer" />
              <FaLinkedinIn className="text-blue-700 text-lx cursor-pointer" />
            </div>
          </div>

          {/* Dynamic Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-3 text-sm">
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Footer;
