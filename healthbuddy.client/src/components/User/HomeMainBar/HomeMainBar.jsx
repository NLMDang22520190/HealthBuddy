import React, { useState, useTransition, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";
import { Spinner } from "flowbite-react";
import { Frown } from "lucide-react";

import PostList from "../PostList/PostList";
import UserAddNewPost from "../UserAddNewPost/UserAddNewPost";
import AddNewNavigateModal from "../AddNewNavigateModal/AddNewNavigateModal";
import RecommendationsSection from "../RecommendationsSection/RecommendationsSection";
import api from "../../../features/AxiosInstance/AxiosInstance";

const HomeMainBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const [posts, setPosts] = useState([]);
  const [isPostLoading, setIsPostLoading] = useState(false);
  // const [isPostLoading, startPostTransition] = useTransition();

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
    // startPostTransition(async () => {
    //   await fetchPosts(controller.signal);
    // });
    fetchPosts(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  const user = useSelector((state) => state.auth.userId);

  const handleAddClick = () => {
    setIsOpen(true);
    //navigate("/add/new-food");
  };

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
        {user && <UserAddNewPost onAddClick={handleAddClick} />}

        {/* Recommendations Section */}
        <div className="py-6">
          <RecommendationsSection />
        </div>

        {posts.length === 0 ? (
          <div className="flex flex-col gap-12 h-96 justify-center items-center">
            <Frown className="size-28 text-primary-light dark:text-primary-dark"></Frown>
            <p className="text-gray-500 text-lg font-semibold">
              No posts found
            </p>
          </div>
        ) : (
          <PostList posts={posts} />
        )}
      </div>
      <AddNewNavigateModal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
      ></AddNewNavigateModal>
    </div>
  );
};

export default HomeMainBar;
