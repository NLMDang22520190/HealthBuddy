import { useState } from "react";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Form, Input, Button } from "antd";
import { Card, TextInput, Label } from "flowbite-react";
import { useNavigate, Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reset password for:", email);
    // toast({
    //   title: "Reset link sent",
    //   description: "Please check your email for the password reset link.",
    // });
    navigate(`/auth/verify-code?email=${encodeURIComponent(email)}&type=reset`);
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
                type="primary"
                htmlType="submit"
                className="w-full rounded-lg h-12 bg-gradient-to-br from-primary-dark to-secondary-dark text-white hover:bg-gradient-to-br hover:from-secondary-dark hover:to-primary-dark font-semibold"
              >
                Send Code
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
