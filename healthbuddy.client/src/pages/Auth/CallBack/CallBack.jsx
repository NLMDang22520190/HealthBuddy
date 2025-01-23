import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Callback = () => {
  const navigate = useNavigate();

  const handleSocialCallback = () => {
    const productURL = "https://healthbuddy-gkgc.onrender.com";
    const developmentURL = "https://localhost:7222";
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");
    const idToken = params.get("id_token");

    console.log("Access token:", accessToken);
    console.log("ID token:", idToken);

    if (accessToken && idToken) {
      // Lưu các token vào localStorage (hoặc sessionStorage)
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("id_token", idToken);

      // Điều hướng về trang chính hoặc dashboard
      navigate("/");
    } else {
      // Nếu không có token, xử lý lỗi (hoặc redirect về trang login)
      navigate("/auth/login");
    }
  }, [navigate]);

  useEffect(() => {
    handleSocialCallback();
  }, []);

  return (
    <div>
      <h2>Loading...</h2>
    </div>
  );
};

export default Callback;
