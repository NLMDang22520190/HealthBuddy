import React, { useEffect, useState, useRef } from "react";
import { Heart, MessageCircle } from "lucide-react";
import { Label } from "flowbite-react";
import { motion } from "framer-motion";
import { message } from "antd";
import { useSelector } from "react-redux";
import { debounce } from "lodash";

import SharePopover from "../../../SharePopover/SharePopover";
import api from "../../../../features/AxiosInstance/AxiosInstance";

const InteractButton = ({
  numberOfLikes,
  numberOfComments,
  postId,
  postType,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [nOLikes, setnOLikes] = useState(numberOfLikes);
  const debounceRef = useRef({}); // Lưu timeout debounce cho API call

  const auth = useSelector((state) => state.auth);
  const userId = auth.userId;

  const fetchLikeStatus = async () => {
    try {
      const response = await api.get(
        `/api/Interact/GetPostLikeByUserId?targetId=${postId}&userId=${userId}&targetType=${postType}`
      );
      setIsLiked(response.data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch like status: " + error.message);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchLikeStatus();
    }
  }, [postId, postType, userId]);

  // Hàm debounce API call
  const debouncedLikeUpdate = debounce(async (liked) => {
    try {
      if (liked) {
        await api.post("/api/Interact/like", {
          targetId: postId,
          targetType: postType,
          userId: userId,
        });
      } else {
        // Truyền dữ liệu qua query params (cách phổ biến)
        await api.delete("/api/Interact/unlike", {
          data: {
            targetId: postId,
            targetType: postType,
            userId: userId,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to update like status.");
      setIsLiked((prev) => !prev); // Hoàn tác nếu lỗi
      setnOLikes((prev) => (liked ? prev - 1 : prev + 1));
    }
  }, 500);

  const onLikeClick = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    setnOLikes((prev) => (newLikedState ? prev + 1 : prev - 1));

    // Hủy debounce trước đó nếu có
    if (debounceRef.current[postId]) {
      debounceRef.current[postId].cancel();
    }

    // Gán debounce mới
    debounceRef.current[postId] = debouncedLikeUpdate;
    debouncedLikeUpdate(newLikedState);
  };

  return (
    <div className="gap-2 grid grid-cols-3">
      <motion.div
        className="cursor-pointer flex p-3 items-center justify-center gap-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        onClick={onLikeClick}
      >
        <button
          className={`text-primary-light dark:text-primary-dark ${
            isLiked ? "text-red-500 dark:text-red-500" : ""
          }`}
        >
          <Heart className={`size-7 ${isLiked ? "fill-current" : ""}`} />
        </button>
        <Label className="text-sm cursor-pointer">{nOLikes} Likes</Label>
      </motion.div>

      <motion.div className="flex p-3 items-center justify-center gap-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg">
        <button className="text-primary-light dark:text-primary-dark">
          <MessageCircle className="size-7" />
        </button>
        <Label className="text-sm">{numberOfComments} Comments</Label>
      </motion.div>

      <motion.div className="flex p-3 items-center justify-center gap-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg">
        <SharePopover
          iconSize="size-7"
          iconColor="text-primary-light dark:text-primary-dark"
        />
        <Label className="text-sm">Share</Label>
      </motion.div>
    </div>
  );
};

export default InteractButton;
