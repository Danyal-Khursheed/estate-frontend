import SaleImage from "../../../assets/sale.PNG";
import RentImage from "../../../assets/rent.PNG";
import { useNavigate } from "react-router-dom";
const PropertyCtaegories = () => {
  const navigate =useNavigate()
  return (
    <>
      <div className="container mx-auto w-full md:w-[85%]">
        
        <div className="flex flex-col lg:flex-row justify-center items-center gap-6  py-8">
          {/* Card for Sale */}
          <div className="bg-[#f6f6f8]  rounded-lg border p-6 flex justify-between items-center w-full">
            <div className="pe-6">
              <h2 className="text-lg font-bold mb-2 text-gray-800">
                Properties for Sale
              </h2>
              <p className="text-sm text-gray-600   mb-4">
                Browse properties for sale in Iraq & close a deal today.
              </p>
              <button
                 onClick={() => navigate("/property-filters")}
                className="bg-[#127b41] text-white py-2 px-4 rounded-md text-sm hover:opacity-90"
              >
                View Properties for Sale
              </button>
            </div>

            <div className="relative mb-4">
              <img
                src={SaleImage}
                alt="For Sale"
                className="w-full h-48 object-cover rounded-md"
              />
           
            </div>
          </div>

          {/* Card for Rent */}
          <div className="bg-[#f6f6f8]  rounded-lg border p-6 flex  items-center w-full ">
            <div className="pe-6">
              <h2 className="text-lg font-bold mb-2 text-gray-800">
                Properties for Rent
              </h2>
              <p className="text-sm text-gray-600  mb-4">
                Browse properties for rent in Iraq & move in right away.
              </p>
              <button
                onClick={() => navigate("/property-filters")}
                className="bg-[#c4321c] text-white py-2 px-4 rounded-md text-sm hover:opacity-90"
              >
                View Properties for Rent
              </button>
            </div>

            <div className="relative mb-4">
              <img
                src={RentImage}
                alt="For Rent"
                className="w-full h-48 object-cover rounded-md"
              />
            
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PropertyCtaegories;
