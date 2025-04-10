import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, Send } from "lucide-react";
import { enUS, vi } from "date-fns/locale";
import { Avatar, message } from "antd";
import { Badge, Label } from "flowbite-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

import ShowImageModal from "../../ShowImageModal/ShowImageModal";
import SharePopover from "../../SharePopover/SharePopover";

const Post = ({ post }) => {
  const navigate = useNavigate();
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleUserNavigate = (user) => {
    navigate(`/user/${user.id}`);
  };

  const handlePostNavigate = (post) => {
    let path = "";
    if (post.type === "food") {
      path = "/detail/food";
    }
    if (post.type === "exercise") {
      path = "/detail/exercise";
    }
    if (post.type === "meal") {
      path = "/detail/mealSchedule";
    }
    if (post.type === "workout") {
      path = "/detail/workoutSchedule";
    }
    path += `/${post.id}`;
    return path;
  };

  const handlePictureClick = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  const handleShare = (post) => {
    const baseUrl = window.location.origin;
    const path = handlePostNavigate(post);

    const fullUrl = `${baseUrl}${path}`;
    // Copy to clipboard (nếu cần)
    navigator.clipboard.writeText(fullUrl).then(() => {
      console.log("URL copied to clipboard!");
      message.success("URL copied to clipboard!");
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="px-3 md:px-6 py-4 flex gap-3"
    >
      <motion.div
        className="h-fit"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <div className="p-px rounded-full bg-gradient-to-tr from-primary-dark to-secondary-dark">
          <Avatar
            onClick={() => handleUserNavigate(post.user)}
            className="cursor-pointer min-w-12 h-12 md:size-14"
            src={post.user.avatar}
          />
        </div>
      </motion.div>

      <div className="flex gap-3 flex-col">
        <div className="flex gap-2 items-center">
          <Label
            onClick={() => handleUserNavigate(post.user)}
            className="text-sm font-bold cursor-pointer"
          >
            {post.user.name}
          </Label>
          <Label className="text-sm font-extralight ">
            {formatDistanceToNow(new Date(post.postDate), {
              addSuffix: true,
              locale: enUS,
            })}
          </Label>
        </div>
        <div
          onClick={() => navigate(handlePostNavigate(post))}
          className="cursor-pointer  flex gap-2 flex-col"
        >
          <Label className="text-base cursor-pointer text-primary-light dark:text-primary-dark">
            {post.title}
          </Label>
          <Label className="text-xs cursor-pointer">{post.content}</Label>
          <div className="flex gap-1 flex-wrap">
            {post.tags.slice(0, 3).map((tag, index) => (
              <Badge color="success" key={index}>
                {tag.name}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge color="success">+{post.tags.length - 3} more</Badge>
            )}
          </div>
        </div>

        <div className="rounded-xl w-fit ">
          <motion.img
            onClick={() => handlePictureClick(post.image)}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            src={post.image}
            className="cursor-pointer rounded-xl min-h-56 max-h-56 max-w-60 sm:max-w-80 md:max-w-72 lg:max-w-96 object-cover"
            alt="post"
          />
        </div>

        <div className="flex gap-3">
          <motion.div
            className="flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="text-black dark:text-white">
              <Heart />
            </button>
            <Label className="text-xs">{post.numberOfLikes}</Label>
          </motion.div>

          <motion.div
            className="flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="text-black dark:text-white">
              <MessageCircle />
            </button>
            <Label className="text-xs">{post.numberOfComments}</Label>
          </motion.div>
          <motion.div
            className="flex items-center gap-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SharePopover onShareClick={() => handleShare(post)} />
          </motion.div>
        </div>
      </div>
      <ShowImageModal
        show={showImageModal}
        image={selectedImage}
        onCancel={() => setShowImageModal(false)}
      ></ShowImageModal>
    </motion.div>
  );
};
export default Post;
