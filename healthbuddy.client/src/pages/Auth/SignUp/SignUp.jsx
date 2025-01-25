import { useState, useTransition } from "react";
import { Lock, Mail, User } from "lucide-react";
import { motion } from "framer-motion";
import { message } from "antd";
import { Card, TextInput, Label, Spinner } from "flowbite-react";
import { useNavigate, Link } from "react-router-dom";

import api from "../../../features/AxiosInstance/AxiosInstance";
import { use } from "react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isSignUpFormPending, startSignUpFormTransition] = useTransition();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      message.error(
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character."
      );
      return;
    }

    startSignUpFormTransition(async () => {
      try {
        const response = await api.post("/api/auth/signup", {
          username,
          email,
          password,
        });
        message.success("Verification code sent. Please check your email.");
        setIsSuccess(true);
        // Tự động điều hướng về trang login sau 5 giây
        setTimeout(() => {
          navigate("/auth/login");
        }, 5000);
      } catch (error) {
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
                Registration Successful
              </h1>
              <p className="text-gray-500 dark:text-secondary-dark">
                Please check your email to verify your account.
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
              Create Account
            </h1>
            <p className="text-gray-500 dark:text-secondary-dark">
              Please fill in your details to sign up
            </p>
          </motion.div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div className="space-y-2" variants={itemVariants}>
              <div>
                <Label htmlFor="username">Username</Label>
                <TextInput
                  icon={User}
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username..."
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <TextInput
                  icon={Mail}
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email..."
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <TextInput
                  icon={Lock}
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password..."
                  required
                  className="mt-1"
                />
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <button
                disabled={isSignUpFormPending}
                type="submit"
                className={`w-full rounded-lg h-12 bg-gradient-to-br from-secondary-dark to-primary-dark text-white font-semibold ${
                  isSignUpFormPending
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gradient-to-br hover:from-primary-dark hover:to-secondary-dark"
                }`}
              >
                {isSignUpFormPending ? (
                  <span className="flex items-center justify-center">
                    <Spinner color="info" aria-label="White spinner example" />
                    <span className="ml-2">Signing Up...</span>
                  </span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </motion.div>
          </form>
          <motion.p
            className="text-center text-sm text-gray-500"
            variants={itemVariants}
          >
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-secondary-dark hover:text-secondary-50"
            >
              Sign in
            </Link>
          </motion.p>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignUp;
