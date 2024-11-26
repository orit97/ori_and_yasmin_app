import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

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

// Refactored API function to handle GET, POST, PUT, DELETE with TypeScript types
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiRequestConfig<T> extends AxiosRequestConfig {
  method: HttpMethod;
  url: string;
  data?: T;
}

const apiRequest = async <T, R = any>(
  method: HttpMethod,
  endpoint: string,
  data?: T,
  params?: Record<string, any> // for GET requests with query parameters
): Promise<R> => {
  try {
    const headers = data instanceof FormData
      ? { 'Content-Type': 'multipart/form-data' }  // Set 'Content-Type' only for FormData
      : { 'Content-Type': 'application/json' };    // Otherwise, use JSON by default

    const config: ApiRequestConfig<T> = {
      method,
      url: endpoint,
      data,          // Include data for POST/PUT requests
      params,        // Include params for GET requests
      headers,
    };

    const response: AxiosResponse<R> = await apiClient.request(config);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error; // Rethrow error to allow further handling
  }
};

// Example usage of apiRequest function

// GET request with optional query parameters
export const fetchData = <R = any>(endpoint: string, params?: Record<string, any>) =>
  apiRequest<null, R>('GET', endpoint, undefined, params);

// POST request (for JSON data)
export const postData = <T, R = any>(endpoint: string, data: T) =>
  apiRequest<T, R>('POST', endpoint, data);

// POST request for FormData (e.g., for image upload)
export const postFormData = <R = any>(endpoint: string, formData: FormData) =>
  apiRequest<FormData, R>('POST', endpoint, formData);

// PUT request (for JSON data)
export const updateData = <T, R = any>(endpoint: string, data: T) =>
  apiRequest<T, R>('PUT', endpoint, data);

// DELETE request
export const deleteData = <R = any>(endpoint: string) =>
  apiRequest<null, R>('DELETE', endpoint);


export const uploadProductsSequentially = async (products: any[]) => {
  for (const product of products) {
    try {
      const response = await postData('/products', product);
      console.log(`Successfully uploaded product: ${product.name}`, response);
    } catch (error) {
      console.error(`Failed to upload product: ${product.name}`, error);
    }
  }
  console.log('All products processed.');
};
