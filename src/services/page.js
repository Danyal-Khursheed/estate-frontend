import axiosInstance from "../utils/axios";

// Example API calls
export const fetchData = (endpoint, params = {}) => {
  return axiosInstance.get(endpoint, { params });
};

export const postData = (endpoint, data) => {
  return axiosInstance.post(endpoint, data);
};

export const updateData = (endpoint, data) => {
  return axiosInstance.put(endpoint, data);
};

export const deleteData = (endpoint) => {
  return axiosInstance.delete(endpoint);
};
