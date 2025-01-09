// export default FileUpload;
import React, { useEffect } from "react";
import { RiCameraAiFill } from "react-icons/ri";

const FileUpload = ({ onImageUpload, presistFile }) => {
  useEffect(() => {
    // Dynamically load the Cloudinary script when the component is mounted
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/global/all.js";
    script.async = true;
    document.body.appendChild(script);

    // Clean up the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleUpload = () => {
    if (window.cloudinary) {
      window.cloudinary.openUploadWidget(
        {
          cloudName: "dxqzrgxaz", // Replace with your Cloudinary cloud name
          uploadPreset: "diyyyyy", // Replace with your Cloudinary upload preset
          sources: ["local", "url", "camera"],
          showAdvancedOptions: true,
          cropping: true,
          multiple: false,
          maxFileSize: 2000000, // 2 MB max file size
          clientAllowedFormats: ["jpg", "jpeg", "png", "gif"],
        },
        (error, result) => {
          if (error) {
            console.log("Error uploading file:", error);
          } else if (result && result.event === "success") {
            // Ensure the result contains the correct URL and pass it to the parent
            onImageUpload(result.info.secure_url);
            console.log("Upload successful!", result.info.secure_url);
          }
        }
      );
    } else {
      console.log("Cloudinary script not loaded yet.");
    }
  };

  return (
    <div>
      {/* Check if an image is selected, show the image or default message */}
      {presistFile ? (
        <div className="border flex flex-row max-w-md justify-between mb-5 rounded-md border-primaryRed">
          <img
            src={presistFile}
            alt="Uploaded file"
            width={100}
            height={50}
            className="rounded-lg"
          />
        </div>
      ) : (
        <div className="text-center text-gray-500 my-4">
          <span className="text-5xl flex justify-center items-center my-6 text-[#127b41]">
            <RiCameraAiFill />{" "}
          </span>
        </div>
      )}

      <button
        onClick={handleUpload}
        className="w-full py-2 px-4 bg-primaryRed text-white hover:bg-green-600"
      >
        Upload Image
      </button>
    </div>
  );
};

export default FileUpload;
