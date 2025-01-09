import React, { useState } from "react";
import ContactUsNow from "../../shared/contactUs";
import { useNavigate, useLocation } from "react-router-dom";
import FileUploadVideo from "../../utils/uploadVideo.js";

const AddVideo = () => {
  const [selectedVideos, setSelectedVideos] = useState(Array(1).fill(null));
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const transitionId = searchParams.get("transitionId");
  const categoryId = searchParams.get("categoryId");

  const [videoUrl, setVideoUrl] = useState(null);
  console.log(videoUrl);

  // Function to handle the video URL after upload
  const handleVideoUpload = (url) => {
    setVideoUrl(url);
    console.log("Video URL:", url);
  };

  const handleNext = () => {
    localStorage.setItem("uploadedVideo", JSON.stringify(videoUrl));
    navigate(
      `/property-listing-form?transitionId=${transitionId}&categoryId=${categoryId}`
    );
  };

  return (
    <div className="bg-gray-100">
      <h2 className="text-xl md:text-2xl font-semibold mb-2 bg-gray-100 mx-auto w-full md:w-[85%] pt-5 pb-5">
        Add a video reel to your listing
      </h2>
      <div className="container mx-auto w-full md:w-[86%] flex flex-col md:flex-row items-start justify-between space-x-3 p-4 md:py-2 lg:py-2">
        {/* Left Section */}
        <div className="w-full md:w-[70%]">
          <div className="bg-white shadow-md p-6 rounded-md">
            <ul className="list-disc list-inside text-sm text-gray-700 mb-6 bg-[#edf3ff] rounded-lg border border-[#d4e0eb] p-4">
              <li>
                A <span className="font-semibold">60 seconds video</span> can be
                added
              </li>
              <li>For more views, explain the product quickly and clearly</li>
              <li>A portrait video is best suited for people to view</li>
              <li>Listing with videos get more enagagements and calls</li>
            </ul>

            <div className="text-left mb-4 pt-4">
              <h3 className="text-start text-sm font-semibold">Video</h3>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
              {selectedVideos.map((video, index) => (
                <div
                  key={index}
                  className="relative border rounded-md p-2 flex items-center justify-center bg-gray-50"
                >
                  {video ? (
                    <video
                      src={video}
                      controls
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <label
                      htmlFor={`video-input-${index}`}
                      className="w-full h-full flex items-center justify-center text-blue-500 cursor-pointer"
                    >
                      <FileUploadVideo
                        onImageUpload={handleVideoUpload}
                        presistFile={videoUrl}
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleNext}
            className="w-fit bg-[#127b41] text-white py-3 px-28 mt-4 rounded-md  hover:opacity-90 shadow-md"
          >
            CONTINUE
          </button>
        </div>

        {/* Right Section */}

        <div className="w-full md:w-[30%] ">
          <ContactUsNow />
        </div>
      </div>
    </div>
  );
};

export default AddVideo;
