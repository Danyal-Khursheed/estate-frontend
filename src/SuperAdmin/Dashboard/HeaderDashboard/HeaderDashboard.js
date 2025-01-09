import { FiPlus } from "react-icons/fi"; // For the plus icon
import { FaUserCircle } from "react-icons/fa"; // For the profile icon

const Header = () => {
  return (
    <header className="bg-red-400 p-4 shadow">
      <div className="flex items-center justify-between space-x-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-lg py-1 px-3 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="flex items-center gap-6">
          {/* Add New Listing Button */}
          <button className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            <FiPlus />
            <span>Add New Listing</span>
          </button>

          {/* Profile Icon */}
          <div className="text-gray-500 cursor-pointer hover:text-gray-700">
            <FaUserCircle size={28} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
