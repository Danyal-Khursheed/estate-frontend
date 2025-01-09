import React from "react";
import Mission from "../../assets/mission.webp";
const OurMission = () => {
  return (
    <div className="container mx-auto w-full md:w-[85%]">
    <div className="flex flex-col md:flex-row justify-between items-center space-x-8 py-10 bg-white ">
      {/* Left Section: Text Content */}
      <div className="w-full md:w-1/2 mb-8 md:mb-0">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 text-gray-800">
          Our Mission
        </h2>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          To connect people and businesses in the Middle East and North Africa
          by making available a convenient and efficient marketplace for buying,
          selling, renting, and finding jobs or services as quickly as possible.
        </p>
      </div>

      {/* Right Section: Image with Design */}
      <div className="w-full md:w-1/2 relative">
        <div className="relative">
          {/* Main Image */}
          <img
            src={Mission}
            alt="Team"
            className="w-full h-auto rounded-lg "
          />
        
        </div>
    
      </div>
    </div>
    </div>
  );
};

export default OurMission;
