import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CircleX } from "lucide-react";
import { motion } from "framer-motion";

const ErrorHandle = () => {
  const navigate = useNavigate();
  const { message } = useParams(); // Lấy mã lỗi từ params

  const handleBackToLogin = () => {
    navigate("/auth/login");
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white shadow-lg rounded-2xl p-6 text-center w-96"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <CircleX className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-semibold text-red-600 mt-4">
          Server error
        </h2>
        <p className="text-gray-600 mt-2">Please try again later.</p>
        <div className="bg-gray-100 p-4 rounded-md mt-4">
          <p className="text-sm text-gray-500">Error Code:</p>
          <p className="text-gray-700 font-medium">{message}</p>
        </div>
        <motion.button
          onClick={handleBackToLogin}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-4 rounded-lg h-12 bg-gradient-to-br from-primary-dark to-secondary-dark text-white font-semibold hover:brightness-110"
        >
          Back to Login
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ErrorHandle;
