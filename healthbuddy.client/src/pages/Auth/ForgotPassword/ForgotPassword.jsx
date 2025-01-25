import { useState, useTransition } from "react";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Card, TextInput, Label, Spinner } from "flowbite-react";
import { useNavigate, Link } from "react-router-dom";
import { message } from "antd";

import api from "../../../features/AxiosInstance/AxiosInstance";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isForgotPasswordPending, startForgotPasswordTransition] =
    useTransition();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    startForgotPasswordTransition(async () => {
      try {
        const response = await api.post("/api/auth/forgot-password", null, {
          params: { email }, // Chuyển email vào query parameter
        });
        setIsSuccess(true);

        // Tự động điều hướng về trang login sau 5 giây
        setTimeout(() => {
          navigate("/auth/login");
        }, 5000);
      } catch (error) {
        const errorCustomData = error.customData;
        if (errorCustomData) {
          const errorData = errorCustomData.error;
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

  const handleNavigateNow = () => {
    setIsNavigating(true);
    navigate("/auth/login");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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

  if (isSuccess) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-transparent">
        <motion.div
          className="w-full max-w-md"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Card className="shadow-md rounded-2xl p-8 space-y-6">
            <motion.div
              className="text-center space-y-2"
              variants={itemVariants}
            >
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
                Email Sent
              </h1>
              <p className="text-gray-500 dark:text-secondary-dark">
                A verification code has been sent to your email. Please check
                your inbox to reset your password.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="text-center">
              <Spinner size="lg" color="info" className="mb-4" />
              <p className="text-sm text-gray-500">
                Redirecting to the login page in 5 seconds...
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <button
                onClick={handleNavigateNow}
                className="w-full rounded-lg h-12 bg-gradient-to-br from-primary-dark to-secondary-dark text-white font-semibold hover:brightness-110"
                disabled={isNavigating}
              >
                Go to Login
              </button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-transparent">
      <motion.div
        className="w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Card
          className="shadow-md rounded-2xl p-8 space-y-8"
          variants={itemVariants}
        >
          <motion.div className="text-center space-y-2" variants={itemVariants}>
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
              Forgot Password
            </h1>
            <p className="text-gray-500 dark:text-secondary-dark">
              Enter your email to reset your password
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div className="space-y-4" variants={itemVariants}>
              <div className="relative">
                <Label htmlFor="email">Email</Label>
                <TextInput
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email..."
                  required
                  icon={Mail}
                  className="mt-1"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                disabled={isForgotPasswordPending}
                type="primary"
                htmlType="submit"
                className={`w-full rounded-lg h-12 bg-gradient-to-br from-primary-dark to-secondary-dark text-white  font-semibold ${
                  isForgotPasswordPending
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-gradient-to-br hover:from-secondary-dark hover:to-primary-dark"
                }`}
              >
                {isForgotPasswordPending ? (
                  <span className="flex items-center justify-center">
                    <Spinner color="info" aria-label="White spinner example" />
                    <span className="ml-2">Sending Code...</span>
                  </span>
                ) : (
                  "Send Code"
                )}
              </button>
            </motion.div>
          </form>

          <motion.p
            className="text-center text-sm text-gray-500"
            variants={itemVariants}
          >
            Remember your password?{" "}
            <Link
              to="/auth/login"
              className="text-secondary-dark hover:text-secondary-50"
            >
              Sign In
            </Link>
          </motion.p>
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
