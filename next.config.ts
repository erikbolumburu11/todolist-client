import type { NextConfig } from "next";
import 'dotenv/config'

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false
};

export default nextConfig;

const environment = process.env.NODE_ENV;
let API_CONNECTION_STRING = "http://localhost:8080"
if(environment === "production"){
  API_CONNECTION_STRING = process.env.NEXT_PUBLIC_API_KEY!;
}

export { API_CONNECTION_STRING };