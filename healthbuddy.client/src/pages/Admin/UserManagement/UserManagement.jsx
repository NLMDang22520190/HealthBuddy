import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import { Users } from "lucide-react";
import { Label } from "flowbite-react";

import api from "../../../features/AxiosInstance/AxiosInstance";
import TopMenu from "../../../components/Admin/TopMenu/TopMenu";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const [search, setSearch] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [BreadcrumbList, setBreadcrumbList] = useState([
    { to: "/admin/users", label: "User Management", icon: Users },
  ]);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text) => <strong>{text}</strong>,
      ellipsis: true,
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) =>
        avatar ? (
          <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
        ) : (
          "No Avatar"
        ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => <a href={`mailto:${email}`}>{email}</a>,
      ellipsis: true,
    },
    {
      title: "Provider",
      dataIndex: "provider",
      key: "provider",
      render: (provider) =>
        provider.charAt(0).toUpperCase() + provider.slice(1),
    },
    {
      title: "Food Posts",
      dataIndex: "numberOfFoodPosts",
      key: "numberOfFoodPosts",
    },
    {
      title: "Exercise Posts",
      dataIndex: "numberOfExercisePosts",
      key: "numberOfExercisePosts",
    },
    {
      title: "Workout Posts",
      dataIndex: "numberOfWorkoutPosts",
      key: "numberOfWorkoutPosts",
    },
    {
      title: "Meal Posts",
      dataIndex: "numberOfMealPosts",
      key: "numberOfMealPosts",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (date) => new Date(date).toLocaleDateString(),
    },
  ];

  //#region fetch data
  const fetchUsers = async (signal) => {
    setIsLoading(true);

    try {
      const response = await api.get("/api/User", {
        signal,
      });
      const data = response.data;
      const mappedData = data.map((data) => ({
        key: data.userId, // Sử dụng làm rowKey trong Table
        userId: data.userId,
        username: data.username,
        avatar: data.avatar || null,
        email: data.email,
        provider: data.provider,
        numberOfFoodPosts: data.numberOfFoodPosts,
        numberOfExercisePosts: data.numberOfExercisePosts,
        numberOfWorkoutPosts: data.numberOfWorkoutPosts,
        numberOfMealPosts: data.numberOfMealPosts,
        createdDate: new Date(data.createdDate).toLocaleDateString(), // Format ngày tháng
      }));

      setUsers(mappedData);
      setSearchedUsers(mappedData);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Request was cancelled");
        return;
      }
      console.log(error);
      message.error("Error fetching users: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (search === "") {
      setSearchedUsers(users);
    } else {
      const filteredUsers = users.filter((user) =>
        user.username.toLowerCase().includes(search.toLowerCase())
      );
      setSearchedUsers(filteredUsers);
    }
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();
    fetchUsers(controller.signal);
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
      <Label className="text-xl">All Users</Label>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={searchedUsers}
        onChange={onChange}
        scroll={{
          x: 1500,
          y: 450,
        }}
        rowClassName={
          "bg-white dark:bg-bg_content_dark text-black dark:text-white "
        }
      ></Table>
    </div>
  );
};

export default UserManagement;
