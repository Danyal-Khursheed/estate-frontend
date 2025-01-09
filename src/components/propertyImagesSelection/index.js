import React from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { RiCameraAiFill } from "react-icons/ri";
import ContactUsNow from "../../shared/contactUs";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useImageStore } from "../image-store/image-store";

const AddPictures = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transitionId = searchParams.get("transitionId");
  const categoryId = searchParams.get("categoryId");
  const { selectedImages, setSelectedImages } = useImageStore();

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedImages = [...selectedImages];
      updatedImages[index] = URL.createObjectURL(file);
      setSelectedImages(updatedImages);
    }
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

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {selectedImages.map((image, index) => (
                <div
                  key={index}
                  className="relative border rounded-md p-2 flex items-center justify-center bg-gray-50"
                >
                  {image ? (
                    <img
                      src={image}
                      alt={`Selected ${index + 1}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <label
                      htmlFor={`image-input-${index}`}
                      className="w-full h-full flex items-center justify-center text-blue-500 cursor-pointer"
                    >
                      <span className="text-5xl my-6 text-[#127b41]">
                        <RiCameraAiFill />
                      </span>
                      <input
                        type="file"
                        id={`image-input-${index}`}
                        className="hidden"
                        accept="image/*"
                        onChange={(event) => handleImageChange(index, event)}
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
            <button
              className="bg-[#127b41] text-white py-3 px-16 mt-4 rounded-md w-full hover:opacity-90 shadow-md"
              onClick={() =>
                navigate(
                  `/property-video?transitionId=${transitionId}&categoryId=${categoryId}`
                )
              }
            >
              CONTINUE
            </button>
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

export default AddPictures;
