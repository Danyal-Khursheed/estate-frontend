import React, { useState, useEffect } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { RiCameraAiFill } from "react-icons/ri";
import ContactUsNow from "../../shared/contactUs";
import { FaInfoCircle } from "react-icons/fa";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { baseURl } from "../../Constant/constants";
import { useImageStore } from "../image-store/image-store";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { toast } from "react-hot-toast";
// import TestGoogleMap from "../TestGoogleMap";

const PropertyListingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const transitionId = searchParams.get("transitionId");
  const categoryId = searchParams.get("categoryId");
  const id = JSON.parse(categoryId);
  const phone = JSON.parse(localStorage.getItem("phone"));

  // State for city and neighborhood dropdowns
  // Coordinates for the map
  const [mapLocation, setMapLocation] = useState({
    lat: 33.3152, // Default to Baghdad
    lng: 44.3661,
  });
  const [infoWindowContent, setInfoWindowContent] = useState(""); // For info window content
  const [mapLoaded, setMapLoaded] = useState(false); // Define mapLoaded state
  const savedImages = JSON.parse(localStorage.getItem("uploadedImages"));
  const urls = savedImages.map((item) => item.url);
  console.log(urls);
  console.log(savedImages);
  const uploadedVideo = localStorage.getItem("uploadedVideo");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [mapCenter, setMapCenter] = useState(null);
  const googleMapsApiKey = "AIzaSyCNoiVpkdQ3-XxGujNH4-J5W60e0YNy9RA";
  const [formData, setFormData] = useState({
    transactionId: transitionId,
    categoriesId: id,
    category: "Real Estate for Sale / Apartments for Sale",
    qualityScore: 10,
    noOfRooms: "",
    noOfBathrooms: "",
    surfaceArea: "",
    floor: "",
    buildingAge: "",
    furnishedType: "",
    listingType: "",
    mainAmenities: [],
    additionalAmenities: [],
    nearbyLocations: [],
    propertyMortgaged: Boolean,
    facade: "",
    title: "",
    description: "",
    price: "",
    paymentType: "",
    contact: "",
    videos: uploadedVideo,
    images: urls,
    city: "",
    neighborhood: "",
    lat: "",
    long: "",
  });
  // Fetch cities from the JSON file in public folder
  useEffect(() => {
    fetch("/cities.json")
      .then((response) => response.json())
      .then((data) => setCities(data))
      .catch((error) => console.error("Error loading cities:", error));
  }, []);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNestedChange = (field, subField, value) => {
    setFormData((prevState) => {
      if (field === "surfaceArea") {
        if (subField === "unit") {
          const currentValue = prevState.surfaceArea.split(" ")[0];
          return {
            ...prevState,
            surfaceArea: `${currentValue} ${value}`,
          };
        } else if (subField === "value") {
          const currentUnit =
            prevState.surfaceArea.split(" ")[1] || "meter square";
          return {
            ...prevState,
            surfaceArea: `${value} ${currentUnit}`,
          };
        }
      } else {
        return {
          ...prevState,
          [field]: {
            ...prevState[field],
            [subField]: value,
          },
        };
      }
    });
  };

  const handleCheckboxChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value],
    }));
  };

  const handleFileChange = (key, index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedFiles = [...formData[key]];
      updatedFiles[index] = URL.createObjectURL(file);
      handleChange(key, updatedFiles);
    }
  };

  // Wait for Google Maps API to load
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && window.google.maps) {
        setMapLoaded(true);
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);
  const containerStyle = {
    width: "100%",
    height: "400px",
  };
  // Handle city change and update neighborhoods based on the selected city
  const handleCityChange = (event) => {
    const cityId = event.target.value;
    setSelectedCity(cityId);
    setFormData({ ...formData, city: cityId });

    // Set neighborhoods based on selected city
    const city = cities.find((c) => c.id === cityId);
    setNeighborhoods(city ? city.neighborhoods : []);
    setSelectedNeighborhood(""); // Reset neighborhood selection
    if (city) {
      setMapCenter(city.coordinates || { lat: 33.3152, lng: 44.3661 }); // Default to Baghdad or city center
    }
    setFormData({ ...formData, neighborhood: "" }); // Reset neighborhood field in formData
  };

  // Handle neighborhood change and fetch the coordinates using Google Maps Geocoding API
  const handleNeighborhoodChange = async (event) => {
    const neighborhoodName = event.target.value;
    setSelectedNeighborhood(neighborhoodName);
    const city = cities.find((city) => city.id === selectedCity);
    const cityName = city ? city.name : "";
    const address = `${neighborhoodName}, ${cityName}`;
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${googleMapsApiKey}`
      );

      const location = response.data.results[0]?.geometry.location;

      if (location) {
        console.log("Location fetched:", location); // Debugging location
        setMapCenter({
          lat: location.lat,
          lng: location.lng,
        });
        setFormData({
          ...formData,
          lat: location.lat, // Use location.lat
          long: location.lng, // Use location.lng
        });
      } else {
        console.error("Neighborhood not found");
      }
    } catch (error) {
      console.error("Error fetching neighborhood location", error);
    }
  };
  const handleMarkerDragEnd = (event) => {
    const newLat = event.latLng.lat();
    const newLng = event.latLng.lng();
    // Log the updated latitude and longitude
    console.log("New Latitude:", newLat);
    console.log("New Longitude:", newLng);
    // Update map center and marker position when the marker is dragged
    setMapCenter({ lat: newLat, lng: newLng });
  };
  // Ensure the map is loaded before rendering
  const onLoad = () => {
    setMapLoaded(true);
  };

  // Submit form data to backend
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${baseURl}/property/createProperty`,
        formData
      );
      toast.success("Property created Successfull");
      navigate("/dashboard/mylisting");
    } catch (error) {
      toast.error("Error submitting form:", error);
    }
  };

  return (
    <div className="bg-gray-100">
      <div></div>
      <h2 className="text-xl md:text-2xl font-semibold mb-2 bg-gray-100 mx-auto w-full md:w-[85%] pt-5 pb-5">
        Add a video reel to your listing
      </h2>

      <div className="container mx-auto w-full md:w-[86%] flex flex-col pt-15 md:flex-row items-start justify-between space-x-3 p-4 md:py-2 lg:py-2">
        {/* Left Section */}
        <div className="w-full md:w-[70%]">
          <div className="bg-white shadow rounded px-6 py-8 space-y-4 mb-4">
            <div>
              <span className="font-semibold text-lg ">10% Quality Score</span>
              <div className="w-1/2 bg-gray-200 rounded-full h-2 mt-3">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "10%" }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-black-900 font-[400]">
              Complete all the details in your listing to achieve a 100% quality
              score! A higher score attracts more views and leads, helping you
              connect with the right audience faster.
            </p>
          </div>

          {/* Category */}
          <div className="bg-white shadow rounded-lg px-6 py-8 space-y-4 mb-4">
            <div className="text-lg font-bold pb-3">Category</div>
            <div className="text-xl text-gray-900">
              {formData.category}{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => handleChange("category", "Change Category")}
              >
                Change
              </span>
            </div>
          </div>

          {/* Listing Details */}
          <div className="bg-white shadow rounded px-6 py-8 space-y-6 mb-4">
            <div className="  mb-4">
              <h1 className="text-lg font-bold pb-3">Listing details</h1>
              <p className="flex border border-[#0179ff] bg-[#ebf4ff] p-2 text-lg">
                <FaInfoCircle className="text-blue-500 mr-2 mt-1" />
                Attract more people to your listing by filling all information
                and being accurate
              </p>
            </div>

            {/* Number of rooms */}
            <div>
              <div className="text-lg font-semibold mb-2">Number of Rooms</div>
              <div className="flex flex-wrap gap-4">
                {["Studio", 1, 2, 3, 4, 5, "6+"].map((room) => (
                  <label
                    key={room}
                    className="flex items-center space-x-2 border p-2"
                  >
                    <input
                      type="radio"
                      name="rooms"
                      value={room}
                      checked={formData.noOfRooms === room}
                      onChange={() => handleChange("noOfRooms", room)}
                    />
                    <span className="text-lg">{room}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Number of bathrooms */}
            <div>
              <div className="text-lg font-semibold mb-2">
                Number of bathrooms
              </div>
              <div className="flex flex-wrap gap-4">
                {[1, 2, 3, 4, 5, "6+"].map((bathroom, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 p-2 border"
                  >
                    <input
                      type="radio"
                      name="bathrooms"
                      className="form-radio"
                      value={bathroom}
                      onChange={() => handleChange("noOfBathrooms", bathroom)}
                    />
                    <span className="text-lg">{bathroom}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Surface Area */}
            <div>
              <div className="text-lg font-semibold mb-2">Surface Area</div>
              <div className="flex gap-2">
                <select
                  className="border border-gray-300 rounded px-4 py-2"
                  value={formData.surfaceArea.split(" ")[1] || "meter square"}
                  onChange={(e) =>
                    handleNestedChange("surfaceArea", "unit", e.target.value)
                  }
                >
                  <option value="meter square">meter square</option>
                  <option value="foot square">foot square</option>
                </select>
                <input
                  type="text"
                  placeholder="Surface Area"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  value={formData.surfaceArea.split(" ")[0]}
                  onChange={(e) =>
                    handleNestedChange("surfaceArea", "value", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Floor */}
            <div>
              <div className="text-lg font-semibold mb-2">Floor</div>
              <div className="flex flex-wrap gap-4">
                {[
                  "Basement Floor",
                  "Semi Ground Floor",
                  "Ground Floor",
                  1,
                  2,
                  3,
                  4,
                  5,
                  6,
                  7,
                  8,
                  9,
                  "10+",
                  "Last floor with roof",
                ].map((floor, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 p-2 border"
                  >
                    <input
                      type="radio"
                      name="floor"
                      className="form-radio"
                      onChange={() => handleChange("floor", floor)}
                    />
                    <span className="text-lg">{floor}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="text-lg font-semibold mb-2">Building Age</div>
              <div className="flex flex-wrap gap-4">
                {[
                  "Under Construction",
                  "0 - 11 months",
                  "1 - 5 years",
                  "6 - 9 years",
                  "10 - 19 years",
                  "20+ years",
                ].map((room, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 border p-2"
                  >
                    <input
                      type="radio"
                      className="form-radio"
                      checked={formData.buildingAge === room}
                      onChange={() => handleChange("buildingAge", room)}
                    />
                    <span className="text-lg">{room}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="text-lg font-semibold mb-2">
                Furnished/Unfurnished
              </div>
              <div className="flex flex-wrap gap-4">
                {["Furnished", "Semi Furnished", "Unfurnished"].map(
                  (room, index) => (
                    <label
                      key={index}
                      className="flex items-center space-x-2 border p-2"
                    >
                      <input
                        type="radio"
                        name="furnishedType"
                        className="form-radio"
                        onChange={() => handleChange("furnishedType", room)}
                      />
                      <span className="text-lg">{room}</span>
                    </label>
                  )
                )}
              </div>
            </div>
            <div>
              <div className="text-lg font-semibold mb-2">Lister Type</div>
              <div className="flex flex-wrap gap-4">
                {["Agent", "Landlord"].map((lister, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 border p-2"
                  >
                    <input
                      type="radio"
                      className="form-radio"
                      onChange={() => handleChange("listingType", lister)}
                    />
                    <span className="text-lg">{lister}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="text-lg font-semibold mb-2">Main Amenities</div>
              <div className="flex flex-wrap gap-4">
                {[
                  "Central Air Conditioning",
                  "Air Conditioning",
                  "Heating",
                  "Balcony",
                  "Maid Room",
                  "Laundry Room",
                  "Built in Wardrobes",
                  "Private Pool",
                  "Solar Panels",
                  "Double Glazed Windows",
                  "Jacuzzi",
                  "Installed Kitchen",
                  "Electric Shutters",
                  "Underfloor Heating",
                  "Washing Machine",
                  "Dishwasher",
                  "Microwave",
                  "Oven",
                  "Refrigerator",
                ].map((aminilites, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 border p-2"
                  >
                    <input
                      type="checkbox"
                      className="form-radio"
                      onChange={() =>
                        handleCheckboxChange("mainAmenities", aminilites)
                      }
                    />
                    <span className="text-lg">{aminilites}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="text-lg font-semibold mb-2">
                Additional Amenities
              </div>
              <div className="flex flex-wrap gap-4">
                {[
                  "Elevator",
                  "Garden",
                  "Garage Parking",
                  "Security",
                  "Staircase",
                  "Storage",
                  "BBQ Area",
                  "Emergency Backup Electricity System",
                  "Swimming Pool",
                  "Intercom",
                  "Broadband Internet",
                  "Facilities for the Disabled",
                ].map((additionalAmenities, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 border p-2"
                  >
                    <input
                      type="checkbox"
                      className="form-radio"
                      onChange={() =>
                        handleCheckboxChange(
                          "additionalAmenities",
                          additionalAmenities
                        )
                      }
                    />
                    <span className="text-lg">{additionalAmenities}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="text-lg font-semibold mb-2">Nearby Locations</div>
              <div className="flex flex-wrap gap-4">
                {[
                  "Restaurant",
                  "School",
                  "Supermarket",
                  "Mall / Shopping Center",
                  "Gym",
                  "Hospital",
                  "Mosque",
                  "Dry Clean",
                  "Parking",
                  "Bank / ATM",
                  "Pharmacy",
                ].map((nearbyLocations, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 border p-2"
                  >
                    <input
                      type="checkbox"
                      className="form-radio"
                      onChange={() =>
                        handleCheckboxChange("nearbyLocations", nearbyLocations)
                      }
                    />
                    <span className="text-lg">{nearbyLocations}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="text-lg font-semibold mb-2">
                Property Mortgaged?
              </div>
              <div className="flex flex-wrap gap-4">
                {["No", "Yes"].map((option, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 border p-2"
                  >
                    <input
                      type="radio"
                      className="form-radio"
                      name="propertyMortgaged"
                      checked={
                        formData.propertyMortgaged ===
                        (option === "Yes" ? true : false)
                      }
                      onChange={() =>
                        handleChange("propertyMortgaged", option === "Yes")
                      }
                    />
                    <span className="text-lg">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="text-lg font-semibold mb-2">Facade</div>
              <div className="flex flex-wrap gap-4">
                {[
                  "Northern",
                  "Southern",
                  "Eastern",
                  "Western",
                  "Northeast",
                  "Northwest",
                  "Southeast",
                  "Southwest",
                ].map((facade, index) => (
                  <label
                    key={index}
                    className="flex items-center space-x-2 border p-2"
                  >
                    <input
                      type="radio"
                      name="facade"
                      className="form-radio"
                      onChange={() => handleChange("facade", facade)}
                    />
                    <span className="text-lg">{facade}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded px-6 space-y-6 py-8 mb-4">
            {/* Location Section */}
            <div className="mb-6">
              <h2 className="text-lg font-bold pb-3">Location</h2>
              <p className="text-lg text-gray-900 mb-4 ">
                This is the location of the listing item or the base of your
                service
              </p>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <select
                  id="city-select"
                  value={selectedCity}
                  onChange={handleCityChange}
                  className="border border-gray-300 p-2 rounded-md w-full"
                >
                  <option value="" disabled>
                    Select a city
                  </option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <select
                  id="neighborhood-select"
                  value={selectedNeighborhood}
                  onChange={handleNeighborhoodChange}
                  disabled={!selectedCity}
                  className="border border-gray-300 p-2 rounded-md w-full"
                >
                  <option value="" disabled>
                    Select a neighborhood
                  </option>
                  {neighborhoods.map((neighborhood) => (
                    <option key={neighborhood.id} value={neighborhood.name}>
                      {neighborhood.name}
                    </option>
                  ))}
                </select>
              </div>

              {selectedCity && selectedNeighborhood && mapLoaded && (
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={mapCenter}
                  zoom={12}
                >
                  {/* Marker */}
                  <Marker
                    position={mapCenter}
                    draggable={true}
                    onDragEnd={handleMarkerDragEnd}
                  ></Marker>
                </GoogleMap>
              )}
            </div>
          </div>

          <div className="bg-white shadow rounded px-6 space-y-6 py-8 mb-4">
            {/* Description Section */}
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2">Description</h2>
              <p className="text-sm text-gray-900 mb-4">
                <li>
                  Describe the listing in more details you want people to know.
                </li>
                <li>
                  Details increase your chance of getting the right buyer.
                </li>
                <br />
              </p>

              <h1 className="text-lg font-bold my-2">Listing Title</h1>
              <input
                type="text"
                placeholder="Example: Toyota Camry 2018, silver color"
                className="border border-gray-300 p-2 rounded-md w-full mb-4"
                onChange={(e) => handleChange("title", e.target.value)}
              />
              <h1 className="text-lg font-bold my-2">Listing Description</h1>
              <textarea
                placeholder="Please provide a detailed description of your product or service. Highlight the features, condition, and any unique aspects that will help potential buyers understand what you're offering. Use clear and concise language to make your listing easy to read and understand."
                className="border border-gray-300 p-2 rounded-md w-full h-28"
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
          </div>

          <div className="bg-white shadow rounded px-6 space-y-6 py-8 mb-4">
            {/* Price Section */}
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-2">Price</h2>
              <p className="text-sm text-gray-900 mb-4">
                <li>Add a realistic price to get more views.</li>
                <li>Make sure to add the full price (example: 100,000).</li>
                <li>
                  Do not enter the down payment as a price to avoid the listing
                  being rejected.
                </li>
              </p>
              <div className="mb-4">
                <label className="block mb-2 text-lg font-[600]">
                  Full Price
                </label>
                <input
                  type="text"
                  placeholder="Add full price"
                  className="border border-gray-300 p-2 rounded-md w-full"
                  onChange={(e) => handleChange("price", e.target.value)}
                />
              </div>
              <div className="flex items-center gap-4">
                {["Cash Only", "Cash or Installments", "Installments Only"].map(
                  (option, index) => (
                    <label key={index} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="paymentMethod"
                        className="form-radio"
                        checked={formData.paymentType === option}
                        onChange={() => handleChange("paymentType", option)}
                      />
                      <span className="text-lg">{option}</span>
                    </label>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded px-6 space-y-6 py-8">
            {/* Contact Information Section */}
            <div>
              <h2 className="text-lg font-bold mb-2">Contact Information</h2>
              <p className="text-sm text-gray-500 mb-4">
                Add the contact information for the listing.
              </p>
              <div className="flex items-center gap-4">
                <span className="border border-gray-300 p-2 rounded-md bg-gray-50">
                  964
                </span>
                <input
                  type="text"
                  value={phone}
                  placeholder="07728100666"
                  className="border border-gray-300 p-2 rounded-md w-full"
                  onChange={(e) => handleChange("contact", e.target.value)}
                />
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="px-24 py-5 mt-6 text-white font-bold bg-[#127b41] rounded-xl"
          >
            Save and Publish Listing
          </button>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[30%] ">
          <ContactUsNow />
          <div className="bg-white shadow rounded-lg my-4 p-5">
            <h1 className="text-start text-xl pb-6 font-bold ">Video Reel</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4">
              {!uploadedVideo && (
                <h3 className="text-start text-lg font-semibold py-1 px-12 rounded-t-lg  bg-black text-white inline-block">
                  Video
                </h3>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4">
              {uploadedVideo ? (
                <video
                  src={uploadedVideo}
                  controls
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <label className="w-full h-full flex items-center justify-center text-blue-500 cursor-pointer">
                  <span className="text-5xl my-6 text-[#127b41] ">
                    <RiCameraAiFill />
                  </span>
                  <input type="file" className="hidden" accept="video/*" />
                </label>
              )}
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-4">
            <h1 className="text-start text-xl font-bold pb-4 ">Pictures</h1>
            <a
              href="#"
              className="flex justify-center text-center text-[#127b41] underline pb-5"
            >
              <FaExclamationCircle className="me-1 mt-1 text-[#127b41] " /> Tips
              For Great Pictures
            </a>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <h3 className="text-start text-[10px] font-semibold py-1 px-2 rounded-t-lg  bg-black text-white inline-block">
                Cover Picture
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {savedImages.map((image, index) => (
                <div
                  key={index}
                  className="relative border rounded-md p-2 flex items-center justify-center bg-gray-50"
                >
                  {image ? (
                    <img
                      src={image.url}
                      alt={`Selected ${index + 1}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <label
                      htmlFor={`image-input-${index}`}
                      className="w-full h-full flex items-center justify-center text-blue-500 cursor-pointer"
                    >
                      <span className="text-5xl my-6 text-[#127b41] ">
                        <RiCameraAiFill />
                      </span>
                      <input
                        type="file"
                        id={`image-input-${index}`}
                        className="hidden"
                        accept="image/*"
                        onChange={(event) => handleChange(index, event)}
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PropertyListingForm;
