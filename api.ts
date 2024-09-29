import axios from 'axios';

// Base API URL
const API_URL = 'https://adams-art-back.onrender.com/api';

// Create an Axios instance without setting a default 'Content-Type'
const apiClient = axios.create({
  baseURL: API_URL,
});

// Centralized error handler (more specific and user-friendly)
const handleApiError = (error: any) => {
  if (error.response) {
    console.error(`API Error: ${error.response.status} - ${error.response.data.message || 'Unknown error'}`);
    throw new Error(error.response.data.message || `Error: ${error.response.status}`);
  } else if (error.request) {
    console.error('No response received from the server.', error.request);
    throw new Error('No response from server. Please check your network connection.');
  } else {
    console.error('Error setting up request:', error.message);
    throw new Error('Request setup failed. Please try again.');
  }
};

// Refactored API function to handle GET, POST, PUT, DELETE
export const apiRequest = async (method: 'GET' | 'POST' | 'PUT' | 'DELETE', endpoint: string, data?: any) => {
  try {
    const headers = data instanceof FormData
      ? { 'Content-Type': 'multipart/form-data' }  // Set the 'Content-Type' only for FormData
      : { 'Content-Type': 'application/json' };    // Otherwise, use JSON by default

    const response = await apiClient.request({
      method,
      url: endpoint,
      data,  // only include data for POST/PUT
      headers,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// Example usage of apiRequest function

// GET request
export const fetchData = (endpoint: string) => apiRequest('GET', endpoint);

// POST request (for JSON data)
export const postData = (endpoint: string, data: any) => apiRequest('POST', endpoint, data);

// POST request for FormData (e.g., for image upload)
export const postFormData = (endpoint: string, formData: FormData) => apiRequest('POST', endpoint, formData);

// PUT request (for JSON data)
export const updateData = (endpoint: string, data: any) => apiRequest('PUT', endpoint, data);

// DELETE request
export const deleteData = (endpoint: string) => apiRequest('DELETE', endpoint);
