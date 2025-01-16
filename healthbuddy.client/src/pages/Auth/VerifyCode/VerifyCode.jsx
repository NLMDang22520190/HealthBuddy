import { useState } from "react";
import { motion } from "framer-motion";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Card, TextInput, Label } from "flowbite-react";
import { Code } from "lucide-react";

const VerifyCode = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Verification code:", code);
    // toast({
    //   title: "Account verified",
    //   description: "Your account has been successfully verified.",
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
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br bg-transparent">
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
              Verify Email
            </h1>
            <p className="text-gray-500 dark:text-secondary-dark">
              Please enter the verification code sent to your email
            </p>
          </motion.div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div className="space-y-4" variants={itemVariants}>
              <TextInput
                icon={Code}
                type="number"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={6}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <button
                type="primary"
                htmlType="submit"
                className="w-full rounded-lg h-12 bg-gradient-to-br from-primary-dark to-secondary-dark text-white hover:bg-gradient-to-br hover:from-secondary-dark hover:to-primary-dark font-semibold"
              >
                Verify
              </button>
            </motion.div>
          </form>
          <motion.p
            className="text-center text-sm text-gray-500"
            variants={itemVariants}
          >
            Didn't receive the code?{" "}
            <button className="text-secondary-dark hover:text-secondary-50">
              Resend
            </button>
          </motion.p>
        </Card>
      </motion.div>
    </div>
  );
};
export default VerifyCode;
