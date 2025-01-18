import React from "react";
import { Label } from "flowbite-react";
import { Avatar } from "antd";
import { Link } from "react-router-dom";

const UserAddNewPost = ({ onAddClick }) => {
  return (
    <div className="p-3 md:p-6 flex gap-3">
      <Avatar
        className="min-w-12 h-12 md:size-14"
        src="https://placehold.co/50x50.png"
      ></Avatar>
      {/* <div className="flex flex-col gap-1 lg:gap-1 bg-[#484849] px-2 flex-1 rounded-xl">
        <Label className="text-base text-white ">
          Have something new to share?
        </Label>
        <div className="flex gap-1 lg:gap-2 items-center">
          <Label className="text-base text-white">Click</Label>
          <label
            onClick={onAddClick}
            className="text-secondary-dark font-bold text-lg"
          >
            HERE
          </label>
          <Label className="text-base text-white ">to post new stuff!</Label>
        </div>
      </div> */}
      <div
        onClick={onAddClick}
        className="items-center cursor-pointer flex-1 flex justify-between"
      >
        <Label className="text-base font-light">What's new...</Label>
        <button
          onClick={onAddClick}
          className="rounded-xl max-w-32 bg-transparent flex items-center justify-center border-2 border-secondary-dark shadow-lg hover:bg-secondary-dark text-secondary-dark hover:text-white duration-300 cursor-pointer active:scale-[0.98] px-5 py-2 uppercase"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default UserAddNewPost;
