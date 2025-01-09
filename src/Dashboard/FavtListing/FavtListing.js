import React, { useState } from "react";

const FavtListing = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      image: "https://via.placeholder.com/100", // Replace with the image URL
      title: "هونداي النترا 2022 بحجم كسب برغي مامفتوح فول ماعدا الفتحه",
      subtitle: "Hyundai, Elantra, GLS",
      category: "Cars For Sale in Asma'i",
      price: "16,800 USD",
      phoneNumber: "077280778XX",
      imagesCount: 7,
      deleted: true,
    },
  ]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Favorite Listings</h1>
      <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-4">
        <input
          type="text"
          placeholder="Search in Favorite Listings"
          className="w-full mb-4 p-2 border rounded focus:outline-none focus:ring"
        />

        {favorites.map((item) => (
          <div
            key={item.id}
            className="p-4 mb-4 bg-white shadow border rounded-lg flex items-start gap-4"
          >
            <div className="w-24 h-24 bg-gray-200 rounded overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              {item.deleted && (
                <span className="text-sm bg-red-500 text-white px-2 py-1 rounded inline-block mb-2">
                  Listing deleted by user
                </span>
              )}
              <h2 className="text-lg font-bold mb-1">{item.title}</h2>
              <p className="text-sm text-gray-500 mb-1">{item.subtitle}</p>
              <p className="text-sm text-gray-500 mb-2">{item.category}</p>
              <p className="text-lg font-bold text-black">{item.price}</p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-1">
                <span className="text-gray-500">{item.imagesCount}</span>
                <button className="p-2 bg-gray-200 rounded-full">
                  <img
                    src="https://via.placeholder.com/20"
                    alt="Gallery Icon"
                    className="w-4 h-4"
                  />
                </button>
              </div>
              <button className="p-2 bg-gray-200 rounded-full">
                {item.phoneNumber}
              </button>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Chat
                </button>
                <button className="p-2 bg-gray-200 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 4.5l-9 15m0-15l9 15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavtListing;
