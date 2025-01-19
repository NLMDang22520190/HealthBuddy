import React from "react";
import { Label } from "flowbite-react";

const DescriptionCard = ({ title, description }) => {
  return (
    <div className="flex flex-col p-4 border rounded-lg mb-6 dark:border-bg_divide_dark border-bg_divide_light">
      <Label className="text-xl font-semibold mb-2">{title}</Label>
      <Label className="text-gray-500">{description}</Label>
    </div>
  );
};

export default DescriptionCard;
