import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { apiBaseURL } from "../../../Constant/constants";

const User = ({ title }) => {
  const [data, setData] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeProperties, setActiveProperties] = useState();
  const [notActiveProperties, setNotActiveProperties] = useState();
  console.log(selectedItem);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiBaseURL}/admin/getAllUsers`);
        if (response.data.success) {
          setData(response.data.data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

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
        `${apiBaseURL}/admin/deleteUser/${userToDelete.id}`
      );
      if (response.data.success) {
        setData(data.filter((item) => item.id !== userToDelete.id));
        toast.success("User deleted successfully!");
        closeDeleteModal();
      } else {
        toast.error("Failed to delete user.");
      }
    } catch (error) {
      toast.error("Error deleting user.");
      console.error(error);
    }
  };

  const openEditModal = async (userId) => {
    setIsEditModalOpen(true);
    try {
      const response = await axios.get(
        `${apiBaseURL}/admin/getSingleUsers/${userId}`
      );
      console.log(response.data.message);
      if (response.data.message.includes("successfully")) {
        setSelectedItem(response.data.property); // Set fetched user data for editing
      } else {
        toast.error("Failed to fetch user details.");
      }
    } catch (error) {
      toast.error("Error fetching user details.");
      console.error(error);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `${apiBaseURL}/admin/updateUser/${selectedItem.id}`,
        selectedItem
      );
      if (response.data.success) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === selectedItem.id ? { ...item, ...selectedItem } : item
          )
        );
        toast.success("User updated successfully!");
        setIsEditModalOpen(false);
      } else {
        toast.error("Failed to update user.");
      }
    } catch (error) {
      toast.error("Error updating user.");
      console.error(error);
    }
  };

  const openViewModal = async (user) => {
    setSelectedItem(user);
    localStorage.setItem("selectedUser", JSON.stringify(user)); // Save the selected user to localStorage
    try {
      const response = await axios.get(
        `${apiBaseURL}/admin/getAllPropertiesByUserId/${user?.id}`
      );
      setActiveProperties(
        response.data.filter((item) => item.approvedByAdmin === true).length
      );
      setNotActiveProperties(
        response.data.filter((item) => item.approvedByAdmin === false).length
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsViewModalOpen(true); // Always set modal open regardless of success or failure
    }
  };

  useEffect(() => {
    // Load selected user from localStorage when the view modal opens
    if (isViewModalOpen) {
      const storedUser = localStorage.getItem("selectedUser");
      if (storedUser) {
        setSelectedItem(JSON.parse(storedUser));
      }
    }
  }, [isViewModalOpen]);

  return (
    <div className="p-4 shadow rounded">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">ID</th>
            <th className="border-b p-2">Name</th>
            <th className="border-b p-2">Phone</th>
            <th className="border-b p-2">Role</th>
            <th className="border-b p-2">Status</th>
            <th className="border-b p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td className="border-b p-2">{index + 1}</td>
              <td className="border-b p-2">{item.name}</td>
              <td className="border-b p-2">{item.phone}</td>
              <td className="border-b p-2">{item.role}</td>
              <td className="border-b p-2">{item.status}</td>
              <td className="border-b p-2 flex space-x-2">
                <button
                  onClick={() => openViewModal(item)}
                  className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  View
                </button>
                <button
                  onClick={() => openEditModal(item.id)}
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
              Edit User
            </h3>
            <input
              type="text"
              value={selectedItem?.name || ""}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, name: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Name"
            />
            <input
              type="text"
              value={selectedItem?.phone || ""}
              onChange={(e) =>
                setSelectedItem({ ...selectedItem, phone: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Phone"
            />
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

      {/* view model open */}

      {isViewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-[28rem] p-8 relative">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              User Details
            </h3>
            {selectedItem ? (
              <div className="space-y-4">
                <p className="text-gray-700">
                  <span className="font-medium">Name:</span> {selectedItem.name}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Phone:</span>{" "}
                  {selectedItem.phone}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Role:</span> {selectedItem.role}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Status:</span>{" "}
                  {selectedItem.status}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Active Properties:</span>{" "}
                  {activeProperties}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Non Active Properties:</span>{" "}
                  {notActiveProperties}
                </p>
              </div>
            ) : (
              <p className="text-gray-500 text-center">No user selected.</p>
            )}
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600"
            >
              ✕
            </button>
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="mt-6 w-full bg-blue-500 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
