import React from "react";
import {
  MoreHorizontal,
  Edit,
  Trash2,
  Share2,
  MessageCircle,
} from "lucide-react";
import axios from "axios";
import { baseURl } from "../../Constant/constants";
import EditPropertyModal from "./EditPropertyModal";
import { date } from "../../utils/date";

export const CrudTable = ({
  data = [],
  handleDelete,
  handleEdit,
  saveEdit,
  isEditModalOpen,
  setIsEditModalOpen,
  selectedItem,
}) => {
  async function handleDeleteProperty(id) {
    try {
      await axios.delete(`${baseURl}/property/deleteProperty/${id}`);
      handleDelete();
      window.reload();
    } catch (error) {
      console.error("Failed to delete property:", error);
    }
  }

  async function handleEditProperty(id, formData) {
    try {
      await axios.put(`${baseURl}/property/editProperty/${id}`, formData);
      saveEdit();
    } catch (error) {
      console.error("Failed to delete property:", error);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="border-b">
                <th className="p-4">Listing</th>
                <th className="p-4">Created</th>
                <th className="p-4 text-nowrap">Building Age</th>
                <th className="p-4 text-nowrap">Listing Type</th>
                <th className="p-4">Contact</th>
                <th className="p-4 text-nowrap">Payment Type</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <React.Fragment key={item.id}>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <img
                            src={item.imageUrl || "/api/placeholder/120/80"}
                            alt={item.title}
                            className="w-24 h-16 object-cover rounded"
                          />
                          <span className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-xs px-1 rounded">
                            {item.imageCount}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-blue-600 hover:underline">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {item.description}
                          </p>
                          <p className="text-sm text-gray-600">
                            {item.noOfRooms}, {item.furnishedType},{" "}
                            {item.surfaceArea}...
                          </p>
                          <p className="font-bold mt-1">{item.price} IQD</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <div>{date(item.createdAt)}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <div>{item.buildingAge}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-sm">{item.listingType}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-sm">{item.contact}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-sm">{item.paymentType}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col space-y-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="flex items-center space-x-2 text-sm hover:text-blue-600"
                        >
                          <Edit size={16} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteProperty(item.id)}
                          className="flex items-center space-x-2 text-sm hover:text-red-600"
                        >
                          <Trash2 size={16} />
                          <span>Delete</span>
                        </button>
                        <button className="flex items-center space-x-2 text-sm hover:text-gray-600">
                          <MessageCircle size={16} />
                          <span>Chat</span>
                        </button>
                        <button className="flex items-center space-x-2 text-sm hover:text-gray-600">
                          <Share2 size={16} />
                          <span>Share</span>
                        </button>
                        <button className="flex items-center space-x-2 text-sm hover:text-gray-600">
                          <MoreHorizontal size={16} />
                          <span>More</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b bg-gray-50">
                    <td colSpan={10} className="p-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                          Live - Regular
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                            <span>Listing quality is low</span>
                          </div>
                          {item.warnings?.map((warning, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-1"
                            >
                              <span className="w-4 h-4 text-yellow-400">
                                ⚠️
                              </span>
                              <span>{warning}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <EditPropertyModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        property={selectedItem}
        onSave={(id, formData) => handleEditProperty(id, formData)}
      />
    </div>
  );
};
