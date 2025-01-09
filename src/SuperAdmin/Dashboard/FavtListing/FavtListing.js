import { useState } from "react";

const MyListing = ({ title }) => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Item 1",
      description: "Description 1",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Item 2",
      description: "Description 2",
      imageUrl: "https://via.placeholder.com/150",
    },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleShare = (item) => {
    setSelectedItem(item);
    setIsShareModalOpen(true);
  };

  const saveEdit = (updatedItem) => {
    setData(
      data.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setIsEditModalOpen(false);
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">ID</th>
            <th className="border-b p-2">Name</th>
            <th className="border-b p-2">Description</th>
            <th className="border-b p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="border-b p-2">{item.id}</td>
              <td className="border-b p-2">{item.name}</td>
              <td className="border-b p-2">{item.description}</td>
              <td className="border-b p-2 flex space-x-2">
                <button
                  //   onClick={() => handleEdit(item)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleShare(item)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  Share
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Edit Item</h3>
            <input
              type="text"
              value={selectedItem?.name}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, name: e.target.value })
              }
              className="w-full p-2 border rounded mb-4"
              placeholder="Name"
            />
            <textarea
              value={selectedItem?.description}
              onChange={(e) =>
                setSelectedItem({
                  ...selectedItem,
                  description: e.target.value,
                })
              }
              className="w-full p-2 border rounded mb-4"
              placeholder="Description"
            />
            <div className="flex space-x-4">
              <button
                onClick={() => saveEdit(selectedItem)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

{isShareModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-all duration-300">
    <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-lg">
      {/* Modal Header */}
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
        Share your listing
      </h3>
      <p className="text-gray-600 text-center mb-4">
        Share your listing on social media or copy the link to share directly with anyone.
      </p>
      {/* Listing Preview */}
      <div className="flex items-start mb-4 border rounded-lg p-4 bg-gray-50">
        <img
          src={selectedItem?.imageUrl}
          alt="Listing"
          className="w-16 h-16 object-cover rounded-lg shadow-sm mr-4"
        />
        <div className="flex-1">
          <p className="font-semibold text-gray-800">{selectedItem?.name}</p>
          <p className="text-sm text-gray-600">{selectedItem?.description}</p>
          <p className="text-blue-700 font-bold mt-2">122000000 IQD</p>
        </div>
      </div>
      {/* Share Link */}
      <div className="text-center mb-4">
        <p className="text-sm text-gray-600 mb-2">Share link with your friends</p>
        <div className="flex items-center justify-between border rounded-lg p-2 bg-gray-100">
          <input
            type="text"
            value={`https://example.com/item/${selectedItem?.id}`}
            readOnly
            className="flex-1 bg-transparent text-gray-800 text-sm"
          />
          <button className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600 transition">
            Copy Link
          </button>
        </div>
      </div>
      {/* Divider */}
      <div className="text-center text-gray-500 text-sm my-4">OR</div>
      {/* Social Media Buttons */}
      <div className="flex flex-col space-y-2">
        <button className="flex items-center justify-center bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition">
          <i className="fab fa-facebook-f mr-2"></i> Publish on Facebook
        </button>
        <button className="flex items-center justify-center bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition">
          <i className="fab fa-instagram mr-2"></i> Publish on Instagram
        </button>
        <button className="flex items-center justify-center bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
          <i className="fab fa-twitter mr-2"></i> Publish on X
        </button>
      </div>
      {/* Footer */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => setIsShareModalOpen(false)}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition shadow-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default MyListing;
