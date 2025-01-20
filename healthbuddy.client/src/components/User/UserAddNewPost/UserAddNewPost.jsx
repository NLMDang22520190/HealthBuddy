import React from "react";
import { Label } from "flowbite-react";
import { Avatar } from "antd";
import { Link } from "react-router-dom";

const UserAddNewPost = ({ onAddClick }) => {
  return (
    <div className="p-3 md:p-6 flex gap-3">
      <div className="p-px rounded-full bg-gradient-to-tr from-primary-dark to-secondary-dark">
        <Avatar
          className="min-w-12 h-12 md:size-14"
          src="https://placehold.co/50x50.png"
        ></Avatar>
      </div>
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
