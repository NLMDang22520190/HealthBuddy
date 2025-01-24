import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");
    const userId = params.get("user_id");
    const userRole = params.get("user_role");
    const provider = params.get("provider");

    if (accessToken) {
      // Lưu các token vào localStorage (hoặc sessionStorage)
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("user_id", userId);
      localStorage.setItem("user_role", userRole);
      localStorage.setItem("provider", provider);

      // Điều hướng về trang chính hoặc dashboard
      navigate("/");
    } else {
      // Nếu không có token, xử lý lỗi (hoặc redirect về trang login)
      navigate("/auth/login");
    }
  }, [navigate]);

  return (
    <div>
      <h2>Loading...</h2>
    </div>
  );
};

export default Callback;
