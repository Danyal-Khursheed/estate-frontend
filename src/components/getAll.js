import React, { useEffect, useState } from "react";
import axios from "axios";

const CircleChart = ({ percentage, color, label }) => {
  const radius = 30; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg className="w-20 h-20">
        <circle
          className="text-gray-200"
          strokeWidth="5"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
        />
        <circle
          className={color}
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="40"
          cy="40"
          style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
        />
      </svg>
      <span className="text-sm font-medium text-gray-700 mt-2">{label}</span>
    </div>
  );
};

const LiveListings = () => {
  const [data, setData] = useState({
    approvedUsers: 0,
    unapprovedUsers: 0,
    unactiveProperties: 0,
    activeProperty: 0,
  });
  console.log(data);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://estate-backend-production.up.railway.app/property/getCount"
        );
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  const totalUsers = data.approvedUsers + data.unapprvoedUsers;
  const totalProperties = data.activeProperty + data.unactiveProperties; // Calculate total properties

  return (
    <div className="flex flex-col lg:flex-row gap-6 mt-8 animate-fadeIn max-w-3xl w-full  mx-auto">
      {/* User Stats */}
      <div className="w-full max-w-xl p-6 bg-gray-100 shadow-md rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700 flex items-center">
          User Statistics
          <span className="ml-2 text-gray-400 cursor-pointer" title="Info">
            ⓘ
          </span>
        </h2>
        <div className="mt-4 flex items-center justify-between">
          <CircleChart
            percentage={(data.approvedUsers / totalUsers) * 100 || 0}
            color="text-blue-500"
            label="Approved Users"
          />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Approved Users
              </span>
              <span className="text-sm font-bold text-green-500">
                {data.approvedUsers}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Unapproved Users
              </span>
              <span className="text-sm font-bold text-red-500">
                {data.unapprvoedUsers}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Total Users
              </span>
              <span className="text-sm font-bold text-blue-500">
                {totalUsers}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Property Stats */}
      <div className="w-full max-w-xl p-6 bg-gray-100 shadow-md rounded-lg">
        <h2 className="text-lg font-semibold text-gray-700 flex items-center">
          Property Statistics
          <span className="ml-2 text-gray-400 cursor-pointer" title="Info">
            ⓘ
          </span>
        </h2>
        <div className="mt-4 flex items-center justify-between">
          <CircleChart
            percentage={(data.activeProperty / totalProperties) * 100 || 0}
            color="text-green-500"
            label="Active Properties"
          />

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Active Properties
              </span>
              <span className="text-sm font-bold text-green-500">
                {data.activeProperty}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Inactive Properties
              </span>
              <span className="text-sm font-bold text-red-500">
                {data.unactiveProperties}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Total Properties
              </span>
              <span className="text-sm font-bold text-blue-500">
                {totalProperties}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveListings;
