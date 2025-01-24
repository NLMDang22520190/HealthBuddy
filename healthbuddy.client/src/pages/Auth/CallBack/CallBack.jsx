import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../../features/Auth/Auth";

const Callback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("access_token");
    const userId = params.get("user_id");
    const userRole = params.get("user_role");
    const provider = params.get("provider");

    if (accessToken) {
      // Lưu vào Redux và cookies
      const authData = { accessToken, userId, userRole, provider };
      dispatch(setAuth(authData));

      // Điều hướng về trang chính hoặc dashboard
      navigate("/");
    } else {
      // Nếu không có token, xử lý lỗi (hoặc redirect về trang login)
      navigate("/auth/login");
    }
  }, [navigate, dispatch]);

  return (
    <div>
      <h2>Loading...</h2>
    </div>
  );
};

export default Callback;
