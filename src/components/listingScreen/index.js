import React from "react";
import ContactUsNow from "../../shared/contactUs";
import { HiArrowRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURl } from "../../Constant/constants";
import RealEstateforSale from "../../assets/RealEstateForSale.png";
import RealEstateforRent from "../../assets/RealEstateForRent.png";

const ListingScreen = () => {
  const navigate = useNavigate();
  const handleSubmit = async (realStateType) => {
    try {
      const response = await axios.post(
        `${baseURl}/transition/createTransition`,
        { name: realStateType }
      );
      navigate(`/property-categories?transitionId=${response.data.data.id}`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div className="bg-gray-100  h-[100vh]">
      <h2 className="text-xl md:text-2xl font-semibold mb-2 bg-gray-100 mx-auto w-full md:w-[85%] pt-5 pb-5">
        What do you want to Sell or Advertise?
      </h2>
      <div className="container mx-auto w-full md:w-[86%] flex flex-col md:flex-row items-start justify-between space-x-3 p-4 md:py-2 lg:py-2">
        {/* Left Section */}

        <div className="w-full md:w-[70%]">
          <div className="bg-white rounded-md shadow p-4 space-y-4">
            <p className="text-black-500 mb-6 text-xl font-bold">
              Select the section that best suits your listing
            </p>

            <div
              className="flex items-center justify-between border-b pb-5 cursor-pointer bg-white p-4 rounded-md custom-shadow"
              onClick={() => {
                handleSubmit("for-sale");
                navigate(`/property-categories`);
              }}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={RealEstateforSale} // Add your Sale image URL here
                  alt="Sale"
                  className="w-12 h-12 object-cover"
                />
                <span className="text-gray-700 font-medium text-lg">
                  Real Estate for Sale
                </span>
              </div>
              <HiArrowRight className="text-gray-400 text-xl" />
            </div>

            {/* Real Estate for Rent */}
            <div
              className="flex items-center justify-between border-b pb-5 cursor-pointer bg-white p-4 rounded-md custom-shadow"
              onClick={() => {
                handleSubmit("for-rent");
                navigate(`/property-categories`);
              }}
            >
              <div className="flex items-center space-x-4">
                <img
                  src={RealEstateforRent} // Add your Sale image URL here
                  alt="Sale"
                  className="w-12 h-12 object-cover"
                />
                <span className="text-gray-700 font-medium text-lg">
                  Real Estate for Rent
                </span>
              </div>
              <HiArrowRight className="text-gray-400 text-xl" />
            </div>
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

export default ListingScreen;
