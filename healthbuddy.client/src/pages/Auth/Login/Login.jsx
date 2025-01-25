import { useState, useEffect, useTransition } from "react";
import { motion } from "framer-motion";
import { message } from "antd";
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
  const [isGithubLoginPending, startGithubLoginTransition] = useTransition();
  const [isLoginFormPending, startLoginFormTransition] = useTransition();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    startLoginFormTransition(async () => {
      try {
        const response = await api.post("/api/auth/login/email-password", {
          email,
          password,
        });
        //console.table("Login response:", response.data);
        dispatch(setAuth(response.data));
        if (response.data.userRole === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } catch (error) {
        // Lấy customData được gắn từ interceptor
        const errorCustomData = error.customData;
        if (errorCustomData) {
          const errorData = errorCustomData.data;
          //console.error("Login error:", errorData);

          if (errorData) {
            if (
              errorData ===
              "Please verify your email before logging in. A verification link has been sent."
            )
              message.error(
                "Please verify your email before logging in. A verification link has been sent."
              );
            else message.error(errorData);
          } else {
            message.error("An error occurred. Please try again later.");
          }
        } else message.error("An error occurred. Please try again later.");
      }
    });
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

  const handleGithubLogin = () => {
    startGithubLoginTransition(async () => {
      try {
        // Gọi API thông qua instance
        const response = await api.get("/api/auth/social-login", {
          params: { provider: "github" }, // Có thể thay đổi provider
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

  const anyLoginPending =
    isGoogleLoginPending || isGithubLoginPending || isLoginFormPending;

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
                disabled={anyLoginPending}
                type="primary"
                htmlType="submit"
                className={`w-full rounded-lg h-12 bg-gradient-to-br from-primary-dark to-secondary-dark text-white  font-semibold ${
                  anyLoginPending
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-gradient-to-br hover:from-secondary-dark hover:to-primary-dark"
                }`}
              >
                {isLoginFormPending ? (
                  <span className="flex items-center justify-center">
                    <Spinner color="info" aria-label="White spinner example" />
                    <span className="ml-2">Logging in...</span>
                  </span>
                ) : (
                  "Login"
                )}
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
                disabled={anyLoginPending}
                onClick={() => handleGoogleLogin()}
                className={`flex-1 flex items-center justify-center font-bold text-xl bg-neutral-50 p-2 rounded-lg transition-all duration-300 ${
                  anyLoginPending
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-transparent group-hover:text-white"
                }`}
              >
                {isGoogleLoginPending ? (
                  <Spinner color="pink" aria-label="Pink spinner example" />
                ) : (
                  <>
                    <svg
                      className={`size-6 font-bold text-red-500  ${
                        anyLoginPending
                          ? "opacity-50"
                          : "group-hover:text-white"
                      }`}
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

            <div className="group bg-gradient-to-tr from-raisin_black  to-bg_divide_dark rounded-lg p-0.5 shadow-md flex items-center justify-center">
              <button
                disabled={anyLoginPending}
                onClick={() => handleGithubLogin()}
                className={`flex-1 flex items-center justify-center font-bold text-xl bg-neutral-50 p-2 rounded-lg ${
                  anyLoginPending
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-transparent group-hover:text-white"
                }`}
              >
                {isGithubLoginPending ? (
                  <Spinner color="info" />
                ) : (
                  <svg
                    class={`size-6 font-bold text-black  ${
                      anyLoginPending ? "opacity-50" : "group-hover:text-white"
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {" "}
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                )}
              </button>
            </div>
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
