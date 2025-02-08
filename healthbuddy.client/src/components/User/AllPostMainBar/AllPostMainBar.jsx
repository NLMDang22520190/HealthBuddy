import React, { useState, useEffect } from "react";
import { message } from "antd";
import { Spinner } from "flowbite-react";

import PostList from "../PostList/PostList";
import SortFilterBar from "./SortFilterBar";
import api from "../../../features/AxiosInstance/AxiosInstance";

const AllPostMainBar = () => {
  const [posts, setPosts] = useState([]);
  const [isPostLoading, setIsPostLoading] = useState(false);

  const fetchPosts = async (signal) => {
    setIsPostLoading(true);

    try {
      const response = await api.get("/api/Post/GetAllHomeApprovedPosts", {
        signal,
      });
      const data = response.data;
      const mappedPosts = data.map((post) => ({
        id: post.postId,
        title: post.title,
        content: post.description,
        image: post.imgUrl,
        user: {
          id: post.uploader.userId,
          name: post.uploader.username,
          avatar: post.uploader.avatar,
        },
        numberOfLikes: post.numberOfLikes,
        numberOfComments: post.numberOfComments,
        postDate: post.createdDate,
        type: post.postType,
        tags: post.tags.map((tag) => ({
          id: tag.tagId,
          name: tag.tagName,
          type: tag.tagType,
        })),
      }));

      setPosts(mappedPosts);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Request was cancelled");
        return;
      }
      console.log(error);
      message.error("Error fetching posts: " + error.message);
    } finally {
      setIsPostLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchPosts(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="user-page-mainbar-content-container">
      {/* Content bên trong scroll */}
      <div className="min-h-screen divide-gray-400 divide-y user-page-mainbar-content-marginbottom">
        {isPostLoading || posts.length === 0 ? (
          <div className="flex h-96 justify-center items-center">
            <Spinner size="xl" color="info" />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <SortFilterBar />
            <PostList posts={posts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPostMainBar;
