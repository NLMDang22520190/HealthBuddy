import axios from "axios";
import {
  getAuthFromCookies,
  clearAuthCookies,
} from "../CookieHelper/CookieHelper";
import { message } from "antd";

// Định nghĩa các URL cho từng môi trường
const productURL = "https://healthbuddy-gkgc.onrender.com";
const developmentURL = "https://localhost:7222";

// Tự động chọn URL dựa trên môi trường
const baseURL =
  process.env.NODE_ENV === "production" ? productURL : developmentURL;

// Tạo instance của Axios
const instance = axios.create({
  baseURL: baseURL, // URL của API backend
  timeout: 15000, // Thời gian chờ tối đa cho mỗi request (ms)
  headers: {
    "Content-Type": "application/json; charset=utf-8", // Header mặc định cho các request
  },
});

// Interceptor để thêm token vào header request
instance.interceptors.request.use(
  (config) => {
    const authCookies = getAuthFromCookies(); // Lấy token từ cookie
    if (authCookies.token) {
      config.headers["Authorization"] = `Bearer ${authCookies.accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error); // Xử lý lỗi trong request
  }
);

// Interceptor để xử lý response
instance.interceptors.response.use(
  (response) => response, // Giữ nguyên response khi thành công
  (error) => {
    // Gắn thêm thông tin response data vào lỗi
    if (error.response) {
      error.customData = error.response.data; // Thêm customData vào error
    }
    return Promise.reject(error); // Trả lỗi để catch trong các hàm API
  }
);

// Export Axios instance để sử dụng trong ứng dụng
export default instance;
