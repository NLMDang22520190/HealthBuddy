import React, { useEffect, useState } from "react";
import { LaptopMinimal, CircleCheck, CircleX, Eye, EyeOff } from "lucide-react";
import TopMenu from "../../../components/Admin/TopMenu/TopMenu";
import { Label } from "flowbite-react";
import { Table, message } from "antd";

import api from "../../../features/AxiosInstance/AxiosInstance";
import ShowImageModal from "../../../components/ShowImageModal/ShowImageModal";

const PostManagement = () => {
  const [posts, setPosts] = useState([]);

  const [search, setSearch] = useState("");
  const [searchedPosts, setSearchedPosts] = useState([]);

  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [imageModalUrl, setImageModalUrl] = useState("");

  const [isPostLoading, setIsPostLoading] = useState(false);
  const [BreadcrumbList, setBreadcrumbList] = useState([
    { to: "/admin/posts", label: "Post Management", icon: LaptopMinimal },
  ]);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const handleShowImageClick = (url) => {
    console.log("click");
    setImageModalUrl(url);
    setIsImageModalVisible(true);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      ellipsis: true,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (url) => (
        <img
          onClick={() => handleShowImageClick(url)}
          src={url}
          alt="Post"
          className="ml-4 cursor-pointer"
          width={50}
          height={50}
        />
      ),
    },
    {
      title: "Uploader",
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <div className="flex items-center">
          <img
            src={user.avatar}
            alt={user.name}
            width={30}
            height={30}
            className="rounded-full mr-2"
          />
          {user.name}
        </div>
      ),
    },
    {
      title: "Likes",
      dataIndex: "numberOfLikes",
      key: "likes",
      sorter: (a, b) => a.numberOfLikes - b.numberOfLikes,
    },
    {
      title: "Comments",
      dataIndex: "numberOfComments",
      key: "comments",
      sorter: (a, b) => a.numberOfComments - b.numberOfComments,
    },
    {
      title: "Post Date",
      dataIndex: "postDate",
      key: "postDate",
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.postDate) - new Date(b.postDate),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Approved",
      dataIndex: "isApproved",
      key: "isApproved",
      render: (isApproved) =>
        isApproved ? (
          <CircleCheck className="ml-4 text-primary-dark"></CircleCheck>
        ) : (
          <CircleX className="ml-4 text-compleprimary-light"></CircleX>
        ),
    },
    {
      title: "Hidden",
      dataIndex: "isHidden",
      key: "isHidden",
      render: (isHidden) =>
        isHidden ? (
          <EyeOff className="ml-4 text-compleprimary-light"></EyeOff>
        ) : (
          <Eye className="ml-4 text-primary-dark"></Eye>
        ),
    },
  ];

  //#region fetch data
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
        isApproved: post.isApproved,
        isHidden: post.isHidden,
      }));

      setPosts(mappedPosts);
      setSearchedPosts(mappedPosts);
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
    if (search === "") {
      setSearchedPosts(posts);
    } else {
      const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );
      setSearchedPosts(filteredPosts);
    }
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();
    fetchPosts(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);
  //#endregion

  return (
    <div className="admin-page-container">
      <TopMenu
        onSearchHandle={setSearch}
        BreadcrumbList={BreadcrumbList}
      ></TopMenu>{" "}
      <Label className="text-xl">All Post</Label>
      <Table
        loading={isPostLoading || posts.length === 0}
        columns={columns}
        dataSource={searchedPosts}
        onChange={onChange}
        scroll={{
          x: 1500,
          y: 500,
        }}
        rowClassName={
          "bg-white dark:bg-bg_content_dark text-black dark:text-white "
        }
      ></Table>
      <ShowImageModal
        show={isImageModalVisible}
        image={imageModalUrl}
        onCancel={() => setIsImageModalVisible(false)}
      ></ShowImageModal>
    </div>
  );
};

export default PostManagement;
