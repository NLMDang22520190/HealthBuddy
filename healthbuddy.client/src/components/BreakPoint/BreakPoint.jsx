import { Label } from "flowbite-react";
import React from "react";

const BreakPoint = () => {
  return (
    <div className="text-black dark:text-white">
      <Label class="ml-1 sm:hidden md:hidden lg:hidden xl:hidden">
        default (&lt; 640px)
      </Label>
      <Label class="ml-1 hidden sm:inline sm-md:hidden md:hidden font-extrabold">
        sm
      </Label>
      <Label class="ml-1 hidden sm-md:inline md:hidden font-extrabold">
        sm-md
      </Label>
      <Label class="ml-1 hidden md:inline md-lg:hidden font-extrabold">
        md
      </Label>
      <Label class="ml-1 hidden md-lg:inline lg:hidden font-extrabold">
        md-lg
      </Label>
      <Label class="ml-1 hidden lg:inline xl:hidden font-extrabold">lg</Label>
      <Label class="ml-1 hidden xl:inline 2xl:hidden font-extrabold">xl</Label>
      <Label class="ml-1 hidden 2xl:inline font-extrabold">2xl</Label>
    </div>
  );
};

export default BreakPoint;
