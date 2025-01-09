import { FiPlus } from "react-icons/fi";
import { useEffect, useState } from "react";
import Property from "./Listing"; // Assuming Property component is in the same folder
import { apiBaseURL } from "../../../Constant/constants";
import axios from "axios";
import CreateListingModal from "./createListing";

const PropertyListing = () => {
  const [data, setData] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // Use null as initial value

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${apiBaseURL}/transition/getAllTransition`
        );

        if (response.data) {
          setData(response.data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsers();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleCategoryDropdown = () => {
    setIsCategoryOpen((prev) => !prev);
  };

  return (
    <div className="p-4">
      <div className="flex flex-row justify-between">
        {/* <button
          onClick={openModal}
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 my-2"
        >
          <FiPlus />
          <span>Add New User</span>
        </button> */}

        <div className="relative">
          <button
            onClick={toggleCategoryDropdown}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 my-2"
          >
            <span>
              {selectedCategory
                ? selectedCategory.transactionType
                : "Show Categories"}
            </span>
          </button>
          {isCategoryOpen && (
            <ul className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-[300px] overflow-y-auto">
              {data && data.length > 0 ? (
                data.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSelectedCategory(item); // Set selected category
                      setIsCategoryOpen(false); // Close dropdown
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {item.transactionType || `Category ${index + 1}`}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-gray-500">No categories found</li>
              )}
            </ul>
          )}
        </div>
      </div>

      {/* Pass selectedCategory ID to Property */}
      <Property
        title="Property Listing"
        selectedCategoryId={selectedCategory?.id || null}
      />
      {/* 
      <CreateListingModal
        selectedCategoryId={selectedCategory?.id || null}
        isOpen={isModalOpen}
        onClose={closeModal}
        property={null}
        // onSave={handleSave}
      /> */}
    </div>
  );
};

export default PropertyListing;
