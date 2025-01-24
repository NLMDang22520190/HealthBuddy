import { useState, useEffect, useTransition } from "react";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";
import { Form, message } from "antd";
import { Card, TextInput, Label, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setAuth } from "../../../features/Auth/Auth";
import api from "../../../features/AxiosInstance/AxiosInstance";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isGoogleLoginPending, startGoogleLoginTransition] = useTransition();
  const { pending } = useFormStatus();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/auth/login/email-password", {
        email,
        password,
      });
      console.table("Login response:", response.data);
      dispatch(setAuth(response.data));
      if (response.data.userRole === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      // Lấy customData được gắn từ interceptor
      const errorData = error.customData.error;
      console.error("Login error:", errorData);

      if (errorData) {
        message.error(errorData); // Hiển thị thông báo lỗi từ server
      } else {
        message.error("Something went wrong!");
      }
    }
  };

  const handleGoogleLogin = () => {
    startGoogleLoginTransition(async () => {
      try {
        // Gọi API thông qua instance
        const response = await api.get("/api/auth/social-login", {
          params: { provider: "google-oauth2" }, // Có thể thay đổi provider
        });

        if (response.data.url) {
          // Điều hướng người dùng tới URL đăng nhập
          window.location.href = response.data.url;
        }
      } catch (error) {
        message.error(
          `Error fetching social login URL: ${
            error.response?.data || error.message
          }`
        );
      }
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-transparent">
      <motion.div
        className="w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Card
          className="shadow-md rounded-2xl p-8 space-y-6"
          variants={itemVariants}
        >
          <motion.div className="text-center space-y-2" variants={itemVariants}>
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
              Welcome back
            </h1>
            <p className="text-gray-500 dark:text-secondary-dark">
              Please enter your details to sign in
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div className="space-y-4" variants={itemVariants}>
              <div>
                <Label className="text-lg" htmlFor="email">
                  Email
                </Label>
                <TextInput
                  icon={Mail}
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email..."
                  required
                  size={3}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-lg" htmlFor="password">
                  Password
                </Label>
                <TextInput
                  id="password"
                  icon={Lock}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  required
                  className="mt-2"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-between"
            >
              <Link
                to="/auth/forgot-password"
                className="text-sm text-secondary-dark hover:text-secondary-light transition-colors"
              >
                Forgot password?
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                disabled={pending}
                type="primary"
                htmlType="submit"
                className={`w-full rounded-lg h-12 bg-gradient-to-br from-primary-dark to-secondary-dark text-white  font-semibold ${
                  pending
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-gradient-to-br hover:from-secondary-dark hover:to-primary-dark"
                }`}
              >
                {pending ? <Spinner>Submitting...</Spinner> : "Login"}
              </button>
            </motion.div>
          </form>

          <motion.div className="relative" variants={itemVariants}>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white rounded-md text-gray-500">
                Or continue with
              </span>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-3"
            variants={itemVariants}
          >
            <div className="group bg-gradient-to-tr from-[#d20404] to-[#ea8d84] rounded-lg p-0.5 shadow-md flex items-center justify-center">
              <button
                disabled={isGoogleLoginPending}
                onClick={() => handleGoogleLogin()}
                className={`flex-1 flex items-center justify-center font-bold text-xl bg-neutral-50 p-2 rounded-lg transition-all duration-300 ${
                  isGoogleLoginPending
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-transparent group-hover:text-white"
                }`}
              >
                {isGoogleLoginPending ? (
                  <Spinner color="pink" aria-label="Pink spinner example" />
                ) : (
                  <>
                    <svg
                      className="size-6 font-bold text-red-500 group-hover:text-white"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" />
                      <path d="M17.788 5.108A9 9 0 1021 12h-8" />
                    </svg>
                  </>
                )}
              </button>
            </div>

            {/* <Button
              outline
              gradientDuoTone="pinkToOrange"
              className="group bg-whiteSmoke"
            >
              <svg
                class="size-6 text-compleprimary-dark group-hover:text-white"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <path d="M17.788 5.108A9 9 0 1021 12h-8" />
              </svg>
            </Button> */}

            <div className="group bg-gradient-to-tr from-[#3b5998]  to-secondary-dark rounded-lg p-0.5 shadow-md flex items-center justify-center">
              <button className=" flex-1 flex items-center justify-center font-bold text-xl bg-neutral-50 hover:bg-transparent p-2 rounded-lg">
                <svg
                  class="size-6 text-blue-500 group-hover:text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  {" "}
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </button>
            </div>
            {/* <Button outline gradientDuoTone="cyanToBlue" className="group">
              <svg
                class="size-6 text-secondary-dark group-hover:text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Button> */}
          </motion.div>

          <motion.p
            className="text-center text-sm text-gray-500"
            variants={itemVariants}
          >
            Don't have an account?{" "}
            <Link
              to="/auth/signup"
              className="text-secondary-dark hover:text-secondary-50"
            >
              Sign up
            </Link>
          </motion.p>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
