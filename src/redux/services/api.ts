import axios, { AxiosError } from "axios";

export interface ApiError {
  message: string;
  status?: number;
}

const api = axios.create({
  baseURL: "https://northone-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Normalize ALL errors here
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<any>) => {
    const normalizedError: ApiError = {
      message:
        error.response?.data?.message ||
        error.message ||
        "Unexpected error occurred",
      status: error.response?.status,
    };

    return Promise.reject(normalizedError);
  }
);

export default api;
