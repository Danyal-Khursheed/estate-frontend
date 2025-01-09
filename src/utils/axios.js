import axios from "axios";
import Swal from "sweetalert2";

// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: "https://api.example.com", // Replace with your base URL
  timeout: 10000, // Set timeout (optional)
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization token or any custom headers here
    const token = localStorage.getItem("token"); // Replace with your token logic
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Process the response
    return response.data; // Return the data directly
  },
  (error) => {
    // Handle errors globally
    const { response } = error;
    console.log(response);
    if (response) {
      switch (response.status) {
        case 401:
          Swal.fire(
            "Unauthorized",
            "Your session has expired. Please login again.",
            "error"
          );
          break;
        case 403:
          Swal.fire(
            "Forbidden",
            "You do not have permission to perform this action.",
            "error"
          );
          break;
        case 404:
          Swal.fire(
            "Not Found",
            "The requested resource was not found.",
            "error"
          );
          break;
        case 500:
          Swal.fire(
            "Server Error",
            "Something went wrong. Please try again later.",
            "error"
          );
          break;
        default:
          Swal.fire(
            "Error",
            response.data?.message || "An error occurred.",
            "error"
          );
      }
    } else {
      Swal.fire(
        "Network Error",
        "Please check your internet connection.",
        "error"
      );
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
