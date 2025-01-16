import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { Form, Input, Button } from "antd";
import { Card, TextInput, Label } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (password !== confirmPassword) {
    //   //   toast({
    //   //     title: "Error",
    //   //     description: "Passwords do not match.",
    //   //     variant: "destructive",
    //   //   });
    //   return;
    // }
    console.log("Reset password:", { password, confirmPassword });
    // toast({
    //   title: "Password reset successful",
    //   description: "Your password has been reset successfully.",
    // });
    navigate("/");
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
          className="glass-morphism shadow-md rounded-2xl p-8 space-y-8"
          variants={itemVariants}
        >
          <motion.div className="text-center space-y-2" variants={itemVariants}>
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
              Reset Password
            </h1>
            <p className="text-gray-500 dark:text-secondary-dark">
              Enter your new password
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div className="space-y-4" variants={itemVariants}>
              <div>
                <Label htmlFor="password">New password</Label>
                <TextInput
                  id="password"
                  type="password"
                  icon={Lock}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password..."
                  required
                  className="mt-1"
                  //   helperText={
                  //     <span className="text-red-500 font-medium">
                  //       {errorPass}
                  //     </span>
                  //   }
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm new password</Label>
                <TextInput
                  id="confirmPassword"
                  type="password"
                  icon={Lock}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter confirm password..."
                  required
                  className="mt-1"
                  //   helperText={
                  //     <span className="text-red-500 font-medium">
                  //       {errorPass}
                  //     </span>
                  //   }
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                type="primary"
                htmlType="submit"
                className="w-full rounded-lg h-12 bg-gradient-to-br from-primary-dark to-secondary-dark text-white hover:bg-gradient-to-br hover:from-secondary-dark hover:to-primary-dark font-semibold"
              >
                Reset password
              </button>
            </motion.div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
