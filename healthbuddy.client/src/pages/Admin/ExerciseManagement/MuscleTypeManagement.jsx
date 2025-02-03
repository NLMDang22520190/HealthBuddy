import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import { Label } from "flowbite-react";
import { Dumbbell, BicepsFlexed, CircleCheck, CircleX } from "lucide-react";

import api from "../../../features/AxiosInstance/AxiosInstance";
import TopMenu from "../../../components/Admin/TopMenu/TopMenu";

const MuscleTypeManagement = () => {
  const [type, setType] = useState([]);

  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [BreadcrumbList, setBreadcrumbList] = useState([
    { to: "/admin/exercise", label: "Exercise", icon: Dumbbell },
    {
      to: "/admin/muscle-types",
      label: "Muscle Type Managment",
      icon: BicepsFlexed,
    },
  ]);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const columns = [
    {
      title: "Muscle Type Name",
      dataIndex: "muscleTypeName",
      key: "muscleTypeName",
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
  ];

  //#region fetch data
  const fetchData = async (signal) => {
    setIsLoading(true);

    try {
      const response = await api.get("/api/MuscleType/GetAllMuscleTypes", {
        signal,
      });
      const data = response.data;
      const mappedData = data.map((muscleType, index) => ({
        key: index, // Unique key cho Table
        muscleTypeId: muscleType.muscleTypeId,
        muscleTypeName: muscleType.muscleTypeName,
        isApproved: muscleType.isApproved,
      }));

      setType(mappedData);
      setSearchedData(mappedData);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Request was cancelled");
        return;
      }
      console.log(error);
      message.error("Error fetching muscle type: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (search === "") {
      setSearchedData(type);
    } else {
      const filteredData = type.filter((data) =>
        data.muscleTypeName.toLowerCase().includes(search.toLowerCase())
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
      <Label className="text-xl">All Muscle Types</Label>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={searchedData}
        onChange={onChange}
        scroll={{
          x: 1000,
          y: 450,
        }}
        rowClassName={
          "bg-white dark:bg-bg_content_dark text-black dark:text-white "
        }
      ></Table>
    </div>
  );
};

export default MuscleTypeManagement;
