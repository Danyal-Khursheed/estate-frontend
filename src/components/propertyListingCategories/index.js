import React from "react";
import ContactUsNow from "../../shared/contactUs";
import { HiArrowRight } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";

// List of categories
const categories = [
  "Apartments for Sale",
  "Villa - Palace for Sale",
  "Townhouses for Sale",
  "Lands for Sale",
  "Farms & Chalets for Sale",
  "Whole Building for Sale",
  "Offices for Sale",
  "Shops for Sale",
  "Complexes for Sale",
  "Showrooms for Sale",
  "Restaurants & Cafes for Sale",
  "Warehouses for Sale",
  "Supermarkets for Sale",
  "Clinics for Sale",
  "Commercial Villas for Sale",
  "Full Floors for Sale",
  "Hotels for Sale",
  "Factories for Sale",
  "Staff Housing for Sale",
  "Foreign Real Estate for Sale",
];

const AdListing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transitionId = searchParams.get("transitionId");

  const generateCategoryId = (index) => {
    return index + 1;
  };

  return (
    <div className="bg-gray-100 h-[100%]">
      <h2 className="text-xl md:text-2xl font-semibold mb-2 bg-gray-100 mx-auto w-full md:w-[85%] pt-5 pb-5">
        What do you want to Sell or Advertise?
      </h2>
      <div className="container mx-auto w-full md:w-[86%] flex flex-col md:flex-row items-start justify-between space-x-3 p-4 md:py-2 lg:py-2">
        {/* Left Section */}
        <div className="w-full md:w-[70%]">
          <div className="flex-1 bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold mb-4">
              Choose the appropriate section to add an ad
            </h2>
            <input
              type="text"
              placeholder="Search for category..."
              className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring"
            />
            <ul className="divide-y divide-gray-200 ">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between border-b pb-5 cursor-pointer bg-white p-4 mt-4 rounded-md custom-shadow"
                  onClick={() => {
                    const randomCategoryId = generateCategoryId(index);
                    navigate(
                      `/property-images?transitionId=${transitionId}&categoryId=${randomCategoryId}`
                    );
                  }}
                >
                  <span className="text-gray-800 py-1 font-bold">
                    {category}
                  </span>
                  <HiArrowRight className="text-gray-400 text-xl" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[30%] ">
          <ContactUsNow />
        </div>
      </div>
    </div>
  );
};

export default AdListing;
