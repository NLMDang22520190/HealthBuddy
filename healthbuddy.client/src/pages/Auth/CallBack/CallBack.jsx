import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy thông tin từ URL (authorization code, id_token, access_token, error)
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    const error = queryParams.get("error");

    if (error) {
      console.error("Error in authentication:", error);
      return; // Hoặc thông báo lỗi cho người dùng
    }

    if (code) {
      // Gửi mã authorization code đến backend để lấy token
      axios
        .post("https://healthbuddy-gkgc.onrender.com/api/auth/callback", {
          code: code,
        })
        .then((response) => {
          // Lưu token vào local storage hoặc session storage
          localStorage.setItem("access_token", response.data.access_token);
          localStorage.setItem("id_token", response.data.id_token);

          // Cập nhật thông tin người dùng (nếu cần)
          localStorage.setItem("user_email", response.data.email);

          // Redirect về trang chính hoặc trang bạn muốn
          navigate("/"); // Điều hướng người dùng
        })
        .catch((err) => {
          console.error("Error fetching token:", err);
        });
    }
  }, [navigate]);

  return (
    <div>
      <h2>Loading...</h2>
    </div>
  );
};

export default Callback;
