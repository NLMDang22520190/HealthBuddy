import React from "react";
import { Label, TextInput } from "flowbite-react";
import { motion } from "framer-motion";

const StatTextInput = ({
  labelText,
  name,
  icon,
  type,
  value,
  onChange,
  itemVariants,
  error,
}) => {
  return (
    <motion.div variants={itemVariants}>
      <Label className="block mb-2 text-sm font-medium">{labelText}</Label>
      <TextInput
        icon={icon}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
      {error && <p className="mt-1 text-red-500 text-xs italic">{error}</p>}
    </motion.div>
  );
};

export default StatTextInput;
