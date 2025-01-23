import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Callback = () => {
  const navigate = useNavigate();

  const handleSocialCallback = async () => {
    const productURL = "https://healthbuddy-gkgc.onrender.com";
    const developmentURL = "https://localhost:7222";

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");

    if (!code) {
      console.error("Missing authorization code");
      return;
    }

    try {
      const response = await axios.get(
        `${productURL}/api/auth/social-login/callback`,
        {
          params: { code, state },
        }
      );

      // Lưu token và thông tin người dùng sau khi callback thành công
      const { accessToken, idToken, email, name, provider } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("idToken", idToken);
      localStorage.setItem("userEmail", email);

      // Điều hướng đến trang dashboard hoặc trang chính
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(
        "Error during social login callback:",
        error.response?.data || error.message
      );
    }
  };

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
