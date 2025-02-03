import React, { useState, useEffect } from "react";
import { Dumbbell, CircleCheck, CircleX, Eye, EyeOff } from "lucide-react";
import { Table, message } from "antd";
import { Label } from "flowbite-react";

import api from "../../../features/AxiosInstance/AxiosInstance";
import TopMenu from "../../../components/Admin/TopMenu/TopMenu";
import ShowImageModal from "../../../components/ShowImageModal/ShowImageModal";

const ExerciseManagement = () => {
  const [exercises, setExercises] = useState([]);

  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState([]);

  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [imageModalUrl, setImageModalUrl] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [BreadcrumbList, setBreadcrumbList] = useState([
    { to: "/admin/exercise", label: "Exercise", icon: Dumbbell },
    { to: "/admin/exercise", label: "Exercise Managment", icon: Dumbbell },
  ]);

  const onChange = (pagination, filters, sorter, extra) => {};

  const handleShowImageClick = (url) => {
    console.log("click");
    setImageModalUrl(url);
    setIsImageModalVisible(true);
  };

  const columns = [
    {
      title: "Exercise Name",
      dataIndex: "exerciseName",
      key: "exerciseName",
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
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
      title: "Difficulty Level",
      dataIndex: "difficultyLevel",
      key: "difficultyLevel",
    },
    {
      title: "Reps",
      dataIndex: "numberOfReps",
      key: "numberOfReps",
    },
    {
      title: "Sets",
      dataIndex: "numberOfSets",
      key: "numberOfSets",
    },
    {
      title: "Time Between Sets (s)",
      dataIndex: "timeBetweenSet",
      key: "timeBetweenSet",
    },
    {
      title: "Calories Burned",
      dataIndex: "caloriesBurned",
      key: "caloriesBurned",
    },
    {
      title: "Video",
      dataIndex: "videoUrl",
      key: "videoUrl",
      render: (url) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          Watch
        </a>
      ),
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
      const response = await api.get("/api/Exercise/GetAllExercises", {
        signal,
      });
      const data = response.data;
      const mappedData = data.map((exercise, index) => ({
        key: index, // Unique key cho Table
        exerciseName: exercise.exerciseName,
        description: exercise.description,
        difficultyLevel: exercise.difficultyLevel,
        numberOfReps: exercise.numberOfReps,
        numberOfSets: exercise.numberOfSets,
        timeBetweenSet: exercise.timeBetweenSet,
        caloriesBurned: exercise.caloriesBurned,
        videoUrl: exercise.videoUrl,
        imgUrl: exercise.imgUrl,
        isApproved: exercise.isApproved,
        isHidden: exercise.isHidden,
      }));

      setExercises(mappedData);
      setSearchedData(mappedData);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Request was cancelled");
        return;
      }
      console.log(error);
      message.error("Error fetching exercise: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (search === "") {
      setSearchedData(exercises);
    } else {
      const filteredData = exercises.filter((data) =>
        data.exerciseName.toLowerCase().includes(search.toLowerCase())
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
      <Label className="text-xl">All Exercises</Label>
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

export default ExerciseManagement;
