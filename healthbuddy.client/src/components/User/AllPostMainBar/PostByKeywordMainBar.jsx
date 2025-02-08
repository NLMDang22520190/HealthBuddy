import React, { useState, useEffect } from "react";
import { message } from "antd";
import { Label, Spinner } from "flowbite-react";
import { useParams } from "react-router-dom";
import { Frown } from "lucide-react";

import PostList from "../PostList/PostList";
import SortFilterBar from "./SortFilterBar";
import api from "../../../features/AxiosInstance/AxiosInstance";

const PostByKeywordMainBar = () => {
  const [posts, setPosts] = useState([]);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const [activeSort, setActiveSort] = useState("all");
  const [selectedFilters, setSelectedFilters] = useState([]);

  const { keyword } = useParams();

  const fetchPosts = async (signal) => {
    setIsPostLoading(true);

    try {
      const response = await api.get(
        "/api/Post/SearchByKeyword?keyword=" + keyword,
        {
          signal,
        }
      );
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
  }, [keyword]);

  // 🔹 **Lọc bài viết dựa trên selectedFilters và activeSort**
  const filteredPosts = posts
    .filter((post) => {
      if (selectedFilters.length === 0) return true;
      return selectedFilters.includes(post.type);
    })
    .sort((a, b) => {
      if (activeSort === "Most Recent") {
        return new Date(b.postDate) - new Date(a.postDate);
      }
      if (activeSort === "Most Likes") {
        return b.numberOfLikes - a.numberOfLikes;
      }
      if (activeSort === "Most Comments") {
        return b.numberOfComments - a.numberOfComments;
      }
      return 0;
    });

  if (isPostLoading)
    return (
      <div className="flex h-96 justify-center items-center">
        <Spinner size="xl" color="info" />
      </div>
    );

  return (
    <div className="user-page-mainbar-content-container">
      {/* Content bên trong scroll */}
      <div className="min-h-screen divide-gray-400 divide-y user-page-mainbar-content-marginbottom">
        {posts.length == 0 ? (
          <div className="flex flex-col gap-12 h-96 justify-center items-center">
            <Frown className="size-28 text-primary-light dark:text-primary-dark"></Frown>
            <p className="text-gray-500 text-lg font-semibold">
              No posts found with keyword:{" "}
              <span className="text-red-500">{keyword}</span>
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <Label className="px-6 py-4 text-xl">
              Search keyword: {keyword}
            </Label>
            <SortFilterBar
              activeSort={activeSort}
              setActiveSort={setActiveSort}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
            <PostList posts={filteredPosts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostByKeywordMainBar;
