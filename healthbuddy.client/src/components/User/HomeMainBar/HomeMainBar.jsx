import React, { useState, useTransition, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";
import { Spinner } from "flowbite-react";

import PostList from "../PostList/PostList";
import UserAddNewPost from "../UserAddNewPost/UserAddNewPost";
import AddNewNavigateModal from "../AddNewNavigateModal/AddNewNavigateModal";
import api from "../../../features/AxiosInstance/AxiosInstance";

// const posts = [
//   {
//     id: 1,
//     title: "10 mẹo chăm sóc sức khỏe mỗi ngày",
//     content:
//       "Cùng khám phá những thói quen đơn giản nhưng giúp bạn cải thiện sức khỏe hàng ngày.",
//     image: "https://placehold.co/50x50.png",
//     user: {
//       id: 1,
//       name: "Nguyễn Văn A",
//       avatar: "https://placehold.co/50x50.png",
//     },
//     numberOfLikes: 120,
//     numberOfComments: 45,
//     postDate: "2023-12-01",
//     type: "food",
//   },
//   {
//     id: 2,
//     title: "Lợi ích của việc tập yoga mỗi sáng",
//     content:
//       "Tập yoga buổi sáng không chỉ giúp thư giãn mà còn cải thiện sức khỏe tinh thần và thể chất.",
//     image: "https://placehold.co/50x50.png",
//     user: {
//       id: 2,
//       name: "Lê Thị Bích",
//       avatar: "https://placehold.co/50x50.png",
//     },
//     numberOfLikes: 95,
//     numberOfComments: 30,
//     postDate: "2023-11-30",
//     type: "exercise",
//   },

const HomeMainBar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const [posts, setPosts] = useState([]);
  const [isPostLoading, setIsPostLoading] = useState(false);
  // const [isPostLoading, startPostTransition] = useTransition();

  const fetchPosts = async (signal) => {
    setIsPostLoading(true);
    console.log("fetchPosts");

    try {
      console.log("isPostLoading", isPostLoading);
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
    console.log("fetching posts");
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

  return (
    <div className="user-page-mainbar-content-container">
      {/* Content bên trong scroll */}
      <div className="min-h-screen divide-gray-400 divide-y user-page-mainbar-content-marginbottom">
        {user && <UserAddNewPost onAddClick={handleAddClick} />}
        {isPostLoading || posts.length === 0 ? (
          <div className="flex h-96 justify-center items-center">
            <Spinner size="xl" color="info" />
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
