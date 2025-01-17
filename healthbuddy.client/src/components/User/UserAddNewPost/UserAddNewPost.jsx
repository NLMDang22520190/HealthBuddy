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
      <div className="flex flex-col gap-1 lg:gap-3">
        <Label className="text-base ">Have something new to share?</Label>
        <div className="flex gap-1 lg:gap-2">
          <Label className="text-base ">Click</Label>
          <label onClick={onAddClick} className="text-secondary-dark font-bold">
            HERE
          </label>
          <Label className="text-base ">to post new stuff!</Label>
        </div>
      </div>
    </div>
  );
};

export default UserAddNewPost;
