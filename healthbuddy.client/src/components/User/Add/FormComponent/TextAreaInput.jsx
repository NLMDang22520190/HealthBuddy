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
  error,
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
      {error && <p className="mt-1 text-red-500 text-xs italic">{error}</p>}
    </motion.div>
  );
};

export default TextAreaInput;
