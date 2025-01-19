import React from "react";
import { Label } from "flowbite-react";

const StatCard = ({
  icon: Icon,
  value,
  label,
  iconColor = "text-primary-light dark:text-primary-dark",
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 border rounded-lg border-bg_divide_light dark:border-bg_divide_dark">
      <Icon className={`h-6 w-6 mb-2 ${iconColor}`} />
      <Label className="text-lg font-bold">{value}</Label>
      <Label className="text-sm text-gray-500">{label}</Label>
    </div>
  );
};

export default StatCard;
