import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { apiBaseURL } from "../../../Constant/constants";

const Property = ({ title, selectedCategoryId }) => {
  const [data, setData] = useState([]);
  console.log(data);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [userProperties, setUserProperties] = useState([]);
  console.log(userProperties?.name);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${apiBaseURL}/admin/getpropertyWithTrasaction/${selectedCategoryId}`
        );
        if (response.data) {
          console.log("consing api response", response.data);
          setData(response.data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [selectedCategoryId]);

  const openDeleteModal = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setUserToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${apiBaseURL}/admin/deleteProperty/${userToDelete.id}`
      );
      if (response.data) {
        toast.success("Property deleted successfully!");
        // Update the state to remove the deleted item
        setData(data.filter((item) => item.id !== userToDelete.id));
        closeDeleteModal();
      } else {
        toast.error("Failed to delete property.");
      }
    } catch (error) {
      toast.error("Error deleting property.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("properties");
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    }
  }, [selectedCategoryId]);

  const openEditModal = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const openViewModal = async (item) => {
    setSelectedItem(item);
    try {
      const response = await axios.get(
        `${apiBaseURL}/admin/getSingleUsers/${item.userId}`
      );
      if (response.data) {
        setUserProperties(response.data.property); // Store the fetched data in the state
      } else {
        toast.error("Failed to fetch user properties.");
      }
    } catch (error) {
      toast.error("Error fetching user properties.");
      console.error(error);
    }
    setIsViewModalOpen(true);
  };

  // Handle save logic for editing
  const handleSaveEdit = async () => {
    try {
      const updatedData = data.map((item) =>
        item.id === selectedItem.id ? selectedItem : item
      );

      const response = await axios.put(
        `${apiBaseURL}/admin/editProperty/${selectedItem.id}`,
        selectedItem
      );
      if (response.data) {
        setData(updatedData);
        localStorage.setItem("properties", JSON.stringify(updatedData));
        toast.success("Property updated successfully!");
        setIsEditModalOpen(false);
      } else {
        toast.error("Failed to update property.");
      }
    } catch (error) {
      toast.error("Error updating property.");
      console.error(error);
    }
  };

  return (
    <>
      <div className="p-4  shadow rounded">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2">ID</th>
              <th className="border-b p-2">Listing Name</th>
              <th className="border-b p-2">Listing Price</th>
              <th className="border-b p-2">Location</th>
              <th className="border-b p-2">Status</th>
              <th className="border-b p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td className="border-b p-2">{index + 1}</td>
                <td className="border-b p-2">{item.title}</td>
                <td className="border-b p-2">{item.price}</td>
                <td className="border-b p-2">{item.location}</td>
                <td className="border-b p-2">
                  {item.approvedByAdmin === true ? (
                    <span className="text-green-600">Active</span>
                  ) : (
                    <span className="text-red-600">UnActive</span>
                  )}
                </td>
                <td className="border-b p-2 flex space-x-2">
                  <button
                    onClick={() => openViewModal(item)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => openEditModal(item)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(item)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
              <p className="mb-4">
                Are you sure you want to delete{" "}
                <span className="font-semibold">{userToDelete?.name}</span>?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeDeleteModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl w-[28rem] p-8 relative">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Edit Property
              </h3>
              <input
                type="text"
                value={selectedItem?.title || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, title: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Listing Name"
              />
              <input
                type="text"
                value={selectedItem?.price || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, price: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Listing Price"
              />
              <input
                type="text"
                value={selectedItem?.location || ""}
                onChange={(e) =>
                  setSelectedItem({ ...selectedItem, location: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Location"
              />
              <select
                value={selectedItem?.approvedByAdmin ? "true" : "false"}
                onChange={(e) =>
                  setSelectedItem({
                    ...selectedItem,
                    approvedByAdmin: e.target.value === "true",
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
              <div className="flex justify-between mt-6">
                <button
                  onClick={handleSaveEdit}
                  className="bg-blue-500 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-600 transition"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-500 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* view model */}

        {isViewModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h3 className="text-lg font-bold mb-4">Property Details</h3>

              <div className="mb-4">
                <label className="font-semibold">Listing Name:</label>
                <p className="p-2 border rounded bg-gray-100">
                  {selectedItem?.title || "N/A"}
                </p>
              </div>

              <div className="mb-4">
                <label className="font-semibold">Listing Price:</label>
                <p className="p-2 border rounded bg-gray-100">
                  {selectedItem?.price || "N/A"}
                </p>
              </div>

              <div className="mb-4">
                <label className="font-semibold">Location:</label>
                <p className="p-2 border rounded bg-gray-100">
                  {selectedItem?.location || "N/A"}
                </p>
              </div>

              <div className="mb-4">
                <label className="font-semibold">Status:</label>
                <p className="p-2 border rounded bg-gray-100">
                  {selectedItem?.approvedByAdmin ? "Active" : "Inactive"}
                </p>
              </div>

              <div className="mb-4">
                <label className="font-semibold">Status:</label>
                <p className="p-2 border rounded bg-gray-100">
                  {userProperties?.name}
                </p>
              </div>

              <div className="mb-4">
                <label className="font-semibold">Status:</label>
                <p className="p-2 border rounded bg-gray-100">
                  {userProperties?.phone}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Property;
