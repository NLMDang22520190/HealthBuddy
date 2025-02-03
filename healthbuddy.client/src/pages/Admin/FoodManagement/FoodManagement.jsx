import React, { useState, useEffect } from "react";
import { Beef, CircleCheck, CircleX, Eye, EyeOff } from "lucide-react";
import { Table, message } from "antd";
import { Label } from "flowbite-react";

import api from "../../../features/AxiosInstance/AxiosInstance";
import TopMenu from "../../../components/Admin/TopMenu/TopMenu";
import ShowImageModal from "../../../components/ShowImageModal/ShowImageModal";

const FoodManagement = () => {
  const [food, setFood] = useState([]);

  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState([]);

  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [imageModalUrl, setImageModalUrl] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [BreadcrumbList, setBreadcrumbList] = useState([
    { to: "/admin/food", label: "Food", icon: Beef },
    { to: "/admin/food", label: "Food Managment", icon: Beef },
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
      title: "Food Name",
      dataIndex: "foodName",
      key: "foodName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "imgUrl",
      key: "imgUrl",
      render: (url) => (
        <img
          onClick={() => handleShowImageClick(url)}
          src={url}
          className="ml-4 cursor-pointer"
          alt="food"
          width={50}
          height={50}
        />
      ),
    },
    {
      title: "Calories",
      dataIndex: "calories",
      key: "calories",
    },
    {
      title: "Difficulty",
      dataIndex: "difficultyLevel",
      key: "difficultyLevel",
    },
    {
      title: "Health Benefits",
      dataIndex: "healthBenefits",
      key: "healthBenefits",
    },
    {
      title: "Cooking Time (min)",
      dataIndex: "cookingTime",
      key: "cookingTime",
    },
    {
      title: "Portion",
      dataIndex: "portion",
      key: "portion",
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
  const fetchData = async (signal) => {
    setIsLoading(true);

    try {
      const response = await api.get("/api/Food/GetAllFoods", {
        signal,
      });
      const data = response.data;
      const mappedData = data.map((food, index) => ({
        key: index, // Unique key cho Table
        foodName: food.foodName,
        description: food.description,
        imgUrl: food.imgUrl,
        calories: food.calories,
        difficultyLevel: food.difficultyLevel,
        healthBenefits: food.healthBenefits,
        cookingTime: food.cookingTime,
        portion: food.portion,
      }));

      setFood(mappedData);
      setSearchedData(mappedData);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Request was cancelled");
        return;
      }
      console.log(error);
      message.error("Error fetching food: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (search === "") {
      setSearchedData(food);
    } else {
      const filteredData = food.filter((data) =>
        data.foodName.toLowerCase().includes(search.toLowerCase())
      );
      setSearchedData(filteredData);
    }
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
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
      <Label className="text-xl">All Food</Label>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={searchedData}
        onChange={onChange}
        scroll={{
          x: 1500,
          y: 450,
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

export default FoodManagement;
