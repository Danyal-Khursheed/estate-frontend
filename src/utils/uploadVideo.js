import React, { useEffect, useState } from "react";
import { RiCameraAiFill } from "react-icons/ri"; // Import the icon

const FileUploadVideo = ({ onImageUpload, presistFile }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    setImageUrl(presistFile);
  }, [presistFile]);

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
          cropping: false, // Disable cropping for video
          multiple: false,
          maxFileSize: 50000000, // 50 MB max file size for video
          clientAllowedFormats: ["mp4", "avi", "mov", "mkv", "webm"], // Only allow video formats
        },
        (error, result) => {
          if (error) {
            console.log("Error uploading file:", error);
          }
          if (result && result.event === "success") {
            setImageUrl(result.info.secure_url);
            onImageUpload(result.info.secure_url);
            console.log("Upload successful!", result.info);
          }
        }
      );
    } else {
      console.log("Cloudinary script not loaded yet.");
    }
  };

  return (
    <div>
      {imageUrl ? (
        <div>
          {/* Display the video preview */}
          <div className="border flex flex-row max-w-md justify-between mb-5 rounded-md border-primaryRed">
            <video
              src={imageUrl}
              controls
              width={100}
              height={50}
              className="rounded-lg"
            />
          </div>
          <p className="text-green-600">Video Selected</p>
        </div>
      ) : (
        <div onClick={handleUpload}>
          {/* Display the icon when no video is selected */}
          <span className="text-5xl my-6 text-[#127b41]">
            <RiCameraAiFill />
          </span>
        </div>
      )}
    </div>
  );
};

export default FileUploadVideo;
