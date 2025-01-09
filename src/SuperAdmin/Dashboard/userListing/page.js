import { FiPlus } from "react-icons/fi";
import User from "./UserListing";
import { useState } from "react";
import CreateUserModal from "./createUser";

const UserListing = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSave = (id, data) => {
    console.log("Saved data:", id, data);
    // Perform the save logic here (e.g., send the data to an API)
  };

  return (
    <div className="p-4">
      <button
        onClick={openModal}
        className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 my-2"
      >
        <FiPlus />
        <span>Add New User</span>
      </button>

      <User title="User Listing" />

      <CreateUserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        property={null} // Pass a property if you're editing, otherwise leave it as null for a new entry
        onSave={handleSave}
      />
    </div>
  );
};

export default UserListing;
