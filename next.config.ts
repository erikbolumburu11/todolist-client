import type { NextConfig } from "next";
import 'dotenv/config'
import axios from "axios";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false
};

export default nextConfig;

const environment = process.env.NODE_ENV;
let API_CONNECTION_STRING = "http://localhost:8080"
if(environment === "production"){
  API_CONNECTION_STRING = process.env.NEXT_PUBLIC_API_URL!;
}

export { API_CONNECTION_STRING };

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});