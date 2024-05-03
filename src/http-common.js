import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:8080",
  baseURL: "https://northone-fp6p0zqmv-79sphelps-projects.vercel.app/",
  // baseURL: '',
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  }
});