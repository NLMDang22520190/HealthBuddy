import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { motion } from "framer-motion";
import { message } from "antd";
import { Card, TextInput, Label } from "flowbite-react";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SignUp attempt:", { username, email, password });
    message.success("Verification code sent");
    navigate(
      `/auth/verify-code?email=${encodeURIComponent(email)}&type=signup`
    );
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
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-whiteSmoke dark:bg-ebony">
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
                  type="username"
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
                  //   helperText={
                  //     <span className="text-red-500 font-medium">{error}</span>
                  //   }
                />
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <button
                type="primary"
                htmlType="submit"
                className="w-full rounded-lg h-12 bg-gradient-to-br from-secondary-dark to-primary-dark text-white hover:bg-gradient-to-br hover:from-primary-dark hover:to-secondary-dark font-semibold"
              >
                Sign Up
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
