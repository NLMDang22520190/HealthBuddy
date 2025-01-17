import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle } from "lucide-react";
import { vi } from "date-fns/locale";
import { Avatar } from "antd";
import { Label } from "flowbite-react";

const Post = ({ post }) => {
  return (
    <div className="px-3 md:px-6 py-2 flex gap-3">
      <Avatar
        className="min-w-12 h-12 md:size-14"
        src={post.user.avatar}
      ></Avatar>
      <div className="flex gap-3 flex-col">
        <div className="flex gap-2">
          <Label className="text-xs">{post.user.name}</Label>
          <Label className="text-xs">
            {" "}
            {formatDistanceToNow(new Date(post.postDate), {
              addSuffix: true,
              locale: vi,
            })}
          </Label>
        </div>
        <Label className="text-xs">{post.title}</Label>
        <Label className="text-xs">{post.content}</Label>
        <img className="max-h-40" src={post.image} alt="post" />
        <div className="flex gap-2">
          <div className="flex items-center gap-1">
            <button className="text-black dark:text-white">
              <Heart></Heart>
            </button>
            <Label className="text-xs">{post.numberOfLikes}</Label>
          </div>
          <Label className="text-xs flex items-center gap-1">
            <MessageCircle></MessageCircle> {post.numberOfComments}
          </Label>
        </div>
      </div>
    </div>
  );
};

export default Post;
