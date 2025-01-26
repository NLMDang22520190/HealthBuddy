import React from "react";
import { Label, Textarea } from "flowbite-react";
import { motion } from "framer-motion";

const TextAreaInput = ({
  labelText,
  placeholder,
  text,
  name,
  onChange,
  itemVariants,
}) => {
  return (
    <motion.div variants={itemVariants}>
      <Label className="block mb-2 text-sm font-medium">{labelText}</Label>
      <Textarea
        name={name}
        placeholder={placeholder}
        value={text}
        onChange={onChange}
        required
      />
    </motion.div>
  );
};

export default TextAreaInput;
