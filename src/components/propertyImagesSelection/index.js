import React, { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { RiCameraAiFill } from "react-icons/ri";
import ContactUsNow from "../../shared/contactUs";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import FileUpload from "../../utils/uploadImage"; // Import FileUpload Component

const AddPictures = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transitionId = searchParams.get("transitionId");
  const categoryId = searchParams.get("categoryId");

  // State to hold selected images
  const [selectedImages, setSelectedImages] = useState([]);
  console.log(selectedImages);

  // Handle image upload by adding the image URL to the selectedImages state
  const handleImageUpload = (imageUrl) => {
    setSelectedImages((prevImages) => [
      ...prevImages,
      { url: imageUrl }, // Ensure each image has a URL property
    ]);
  };

  const handleNext = () => {
    localStorage.setItem("uploadedImages", JSON.stringify(selectedImages));
    navigate(
      `/property-video?transitionId=${transitionId}&categoryId=${categoryId}`
    );
  };

  return (
    <div className="bg-gray-100">
      <h2 className="text-xl md:text-2xl font-semibold mb-2 bg-gray-100 mx-auto w-full md:w-[85%] pt-5 pb-5">
        Add pictures to your listing
      </h2>
      <div className="container mx-auto w-full md:w-[86%] flex flex-col md:flex-row items-start justify-between space-x-3 p-4 md:py-2 lg:py-2">
        {/* Left Section */}
        <div className="w-full md:w-[70%]">
          <div className="bg-white shadow-md p-6 rounded-md">
            <ul className="list-disc list-inside text-sm text-gray-700 mb-6 bg-[#edf3ff] rounded-lg border border-[#d4e0eb] p-4">
              <li>
                You can add up to{" "}
                <span className="font-semibold">30 pictures</span>
              </li>
              <li>Pictures increase the views of your listings</li>
              <li>Tip: You can re-arrange pictures by dragging them around</li>
            </ul>

            <div className="text-center mb-4 space-y-9 pt-4">
              <a
                href="#"
                className="flex justify-center text-[#127b41] text-base text-center underline "
              >
                <FaExclamationCircle className="me-1 mt-1" /> Tips For Great
                Pictures
              </a>
              <h3 className="text-start text-sm font-semibold">
                Cover Picture
              </h3>
            </div>

            {/* Render uploaded images or the upload button */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {Array.from({ length: 30 }).map((_, index) => (
                <div
                  key={index}
                  className="relative border rounded-md p-2 flex items-center justify-center bg-gray-50"
                >
                  {/* Render FileUpload component and handle the image uploads */}
                  <FileUpload
                    onImageUpload={handleImageUpload}
                    presistFile={selectedImages[index]?.url} // Display uploaded image if exists
                  />
                </div>
              ))}
            </div>
            <button
              className="bg-[#127b41] text-white py-3 px-16 mt-4 rounded-md w-full hover:opacity-90 shadow-md"
              onClick={handleNext}
            >
              CONTINUE
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[30%]">
          <ContactUsNow />
        </div>
      </div>
    </div>
  );
};

export default AddPictures;
