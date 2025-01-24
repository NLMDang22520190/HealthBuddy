import { set } from "date-fns";
import Cookies from "js-cookie";

const COOKIE_OPTIONS = {
  expires: 7, // Số ngày cookie tồn tại
  secure: true, // Chỉ sử dụng cookie trên HTTPS
  sameSite: "Strict", // Ngăn ngừa CSRF
};

// Lưu dữ liệu vào cookie
export const setCookie = (key, value) => {
  Cookies.set(key, value, COOKIE_OPTIONS);
};

// Lấy dữ liệu từ cookie
export const getCookie = (key) => {
  return Cookies.get(key);
};

// Xóa cookie
export const deleteCookie = (key) => {
  Cookies.remove(key, COOKIE_OPTIONS);
};

// Lưu auth dữ liệu vào cookie
export const saveAuthToCookies = ({
  accessToken,
  userId,
  userRole,
  provider,
  isAuthenticated,
}) => {
  setCookie("access_token", accessToken);
  setCookie("user_id", userId);
  setCookie("user_role", userRole);
  setCookie("provider", provider);
  setCookie("isAuthenticated", isAuthenticated);
};

// Lấy auth dữ liệu từ cookie
export const getAuthFromCookies = () => {
  return {
    accessToken: getCookie("access_token"),
    userId: getCookie("user_id"),
    userRole: getCookie("user_role"),
    provider: getCookie("provider"),
    isAuthenticated: getCookie("isAuthenticated"),
  };
};

// Xóa auth dữ liệu khỏi cookie
export const clearAuthCookies = () => {
  deleteCookie("access_token");
  deleteCookie("user_id");
  deleteCookie("user_role");
  deleteCookie("provider");
  deleteCookie("isAuthenticated");
};
