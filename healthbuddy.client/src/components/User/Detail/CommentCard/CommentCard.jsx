import React, { useState, useEffect, useTransition } from "react";
import { vi } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";
import { Accordion, Label, Spinner } from "flowbite-react";
import { message } from "antd";

import UserComment from "../UserComment/UserComment";
import InteractButton from "../InteractButton/InteractButton";
import api from "../../../../features/AxiosInstance/AxiosInstance";

const CommentCard = ({
  isLiked = false,
  numberOfLikes,
  numberOfComments,
  postType,
  postId,
  onCommentAdded,
}) => {
  const [comments, setComments] = useState([]);

  const [isLoading, startTransition] = useTransition();

  const fetchComments = async () => {
    try {
      const response = await api.get(
        `/api/Interact/GetPostComments?postId=${postId}&postType=${postType}`
      );
      const mappedComments = response.data.map((comment) => ({
        id: comment.commentId,
        user: {
          id: comment.user.userId,
          name: comment.user.username,
          avatar: comment.user.avatar,
        },
        content: comment.content,
        commentDate: comment.createdDate,
      }));
      setComments(mappedComments);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch comments" + error.message);
    }
  };

  useEffect(() => {
    startTransition(async () => {
      await fetchComments();
    });
  }, []);

  useEffect(() => {
    if (onCommentAdded) {
      startTransition(async () => {
        await fetchComments();
      });
    }
  }, [onCommentAdded]);

  return (
    <div className="flex flex-col border rounded-lg mb-6 dark:border-bg_divide_dark border-bg_divide_light">
      <InteractButton
        numberOfLikes={numberOfLikes}
        numberOfComments={numberOfComments}
        liked={isLiked}
      ></InteractButton>
      <Accordion className="flex-1 dark:border-transparent border-transparent">
        <Accordion.Panel>
          <Accordion.Title className="dark:focus:ring-transparent focus:ring-transparent rounded-lg hover:rounded-lg hover:bg-transparent focus:bg-transparent  dark:hover:bg-transparent dark:bg-transparent">
            <Label className="text-xl font-semibold mb-2">Comments</Label>
          </Accordion.Title>
          <Accordion.Content className="bg-transparent dark:bg-transparent divide-y dark:divide-bg_divide_dark divide-bg_divide_light p-0">
            {isLoading ? (
              <div className="flex h-48 justify-center items-center">
                <Spinner size="xl" color="info" />
              </div>
            ) : comments.length === 0 ? (
              <div className="flex justify-center items-center h-48">
                <Label className="text-center text-muted-foreground py-2">
                  No comments yet.
                </Label>
              </div>
            ) : (
              comments.map((comment) => (
                <UserComment key={comment.id} comment={comment} />
              ))
            )}
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </div>
  );
};

export default CommentCard;
