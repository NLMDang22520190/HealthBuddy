import React from "react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Label } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Avatar } from "antd";

const UserComment = ({ comment }) => {
  const navigate = useNavigate();

  const handleUserNavigate = (user) => {
    navigate(`/profile/${user.id}`);
  };

  return (
    <div key={comment.id} className="flex gap-4 p-6 ">
      <motion.div
        className="h-fit"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <div className="p-px rounded-full bg-gradient-to-tr from-primary-dark to-secondary-dark">
          <Avatar
            onClick={() => handleUserNavigate(comment.user)}
            className="cursor-pointer min-w-12 h-12 md:size-14"
            src={comment.user.avatar}
          />
        </div>
      </motion.div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Label
            onClick={() => handleUserNavigate(comment.user)}
            className="cursor-pointer text-sm font-bold"
          >
            {comment.user.name}
          </Label>
          <Label className="text-sm font-extralight text-gray-500">
            {formatDistanceToNow(new Date(comment.commentDate), {
              locale: vi,
            })}
          </Label>
        </div>

        <Label className="text-xs font-normal">{comment.content}</Label>
      </div>
    </div>
  );
};

export default UserComment;
