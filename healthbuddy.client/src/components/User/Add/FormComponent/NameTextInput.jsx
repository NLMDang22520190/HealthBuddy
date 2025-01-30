import React from "react";
import { TextInput, Label } from "flowbite-react";
import { Pen } from "lucide-react";
import { motion } from "framer-motion";

const NameTextInput = ({
  labelText,
  placeholder,
  name,
  onChange,
  itemVariants,
  error,
}) => {
  return (
    <motion.div variants={itemVariants}>
      <Label className="block mb-2 text-sm font-medium">{labelText}</Label>
      <TextInput
        icon={Pen}
        name="name"
        placeholder={placeholder}
        value={name}
        onChange={onChange}
        required
      />
      {error && <p className="mt-1 text-red-500 text-xs italic">{error}</p>}
    </motion.div>
  );
};

export default NameTextInput;
