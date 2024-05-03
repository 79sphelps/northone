import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "https://northone-fp6p0zqmv-79sphelps-projects.vercel.app/",
  // baseURL: '',
  headers: {
    "Content-Type": "application/json",
  },
});