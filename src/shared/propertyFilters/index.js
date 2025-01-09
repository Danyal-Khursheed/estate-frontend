import React, { useState } from "react";
import MapImage from "../../assets/map.jpeg";
const PropertyFilters = () => {
  const [activeTab, setActiveTab] = useState("RENT");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto w-full md:w-[85%]">
    <div className="w-full mx-auto p-4 md:p-8 lg:p-8 bg-gray-100 mt-5 rounded-lg">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-8">
        {/* Left Section: Filters */}
        <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-lg border">
          {/* Tabs */}
          <div className="flex">
            <button
              onClick={() => handleTabClick("BUY")}
              className={`w-1/2 text-center py-2 text-lg font-semibold ${
                activeTab === "BUY"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              BUY
            </button>
            <button
              onClick={() => handleTabClick("RENT")}
              className={`w-1/2 text-center py-2 text-lg font-semibold ${
                activeTab === "RENT"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              RENT
            </button>
          </div>

          {/* Filter Fields */}
          <div className="p-4 ">
            <div className="mb-4">
              <label className="block text-lg font-medium mb-4">
                Properties For {activeTab === "BUY" ? "Sale" : "Rent"}
              </label>
              <select className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400">
                <option>Select Type</option>
                <option>Apartment</option>
                <option>House</option>
                <option>Commercial</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Select Category
              </label>
              <select className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400">
                <option>Select Category</option>
                <option>Luxury</option>
                <option>Standard</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Location</label>
              <div className="flex gap-2">
                <select className="w-1/2 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400">
                  <option>All Cities</option>
                  <option>Baghdad</option>
                  <option>Erbil</option>
                </select>
                <select className="w-1/2 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400">
                  <option>Select Neighborhoods</option>
                </select>
              </div>
            </div>

            <button className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-700 mt-2">
              Show (5,156)
            </button>
          </div>
        </div>

        {/* Right Section: Map */}
        <div className="w-full lg:w-2/3 relative">
          <img
            src={MapImage}
            alt="Map"
            className="w-full h-[392px] object-cover rounded-lg shadow-lg"
          />
         
        </div>
      </div>
    </div>
    </div>
  );
};

export default PropertyFilters;
