import React, { useState, useEffect } from "react";
import { CrudTable } from "./MyListing";
import axios from "axios";
import { apiBaseURL, baseURl } from "../../Constant/constants";

const MyListing = ({ title }) => {
  const [data, setData] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `${apiBaseURL}/property/getAllProperty`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    console.log(item);
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
      <CrudTable
        data={data}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleShare={handleShare}
        isEditModalOpen={isEditModalOpen}
        isShareModalOpen={isShareModalOpen}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        saveEdit={saveEdit}
        setIsEditModalOpen={setIsEditModalOpen}
        setIsShareModalOpen={setIsShareModalOpen}
      />
    </div>
  );
};

export default MyListing;
