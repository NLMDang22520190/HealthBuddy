import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import { Label } from "flowbite-react";
import { Beef, Carrot, CircleCheck, CircleX } from "lucide-react";

import api from "../../../features/AxiosInstance/AxiosInstance";
import TopMenu from "../../../components/Admin/TopMenu/TopMenu";

const IngredientManagement = () => {
  const [ingredients, setIngredients] = useState([]);

  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [BreadcrumbList, setBreadcrumbList] = useState([
    { to: "/admin/food", label: "Food", icon: Beef },
    { to: "/admin/ingredients", label: "Ingredient Managment", icon: Carrot },
  ]);

  const onChange = (pagination, filters, sorter, extra) => {};

  const columns = [
    {
      title: "Ingredient Name",
      dataIndex: "ingredientName",
      key: "ingredientName",
    },
    {
      title: "Measurement Unit",
      dataIndex: "measurementUnit",
      key: "measurementUnit",
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
      const response = await api.get("/api/Ingredient/GetAllIngredients", {
        signal,
      });
      const data = response.data;
      const mappedData = data.map((ingredient, index) => ({
        key: index, // Unique key cho Table
        ingredientId: ingredient.ingredientId,
        ingredientName: ingredient.ingredientName,
        measurementUnit: ingredient.measurementUnit,
        isApproved: ingredient.isApproved,
      }));

      setIngredients(mappedData);
      setSearchedData(mappedData);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Request was cancelled");
        return;
      }
      console.log(error);
      message.error("Error fetching ingredient: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (search === "") {
      setSearchedData(ingredients);
    } else {
      const filteredData = ingredients.filter((data) =>
        data.ingredientName.toLowerCase().includes(search.toLowerCase())
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
      <Label className="text-xl">All Ingredients</Label>
      <Table
        loading={isLoading || ingredients.length === 0}
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

export default IngredientManagement;
