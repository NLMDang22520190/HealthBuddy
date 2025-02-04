import React, { useEffect, useState } from "react";
import { Modal, Descriptions, message, Skeleton } from "antd";
import { CircleCheck, CircleX } from "lucide-react";

import api from "../../../features/AxiosInstance/AxiosInstance";

const FoodDetailModal = ({ show, onCancel, id }) => {
  const [food, setFood] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(false);

  const fetchData = async (signal) => {
    setIsDataLoading(true);
    try {
      const response = await api.get(`/api/Food/GetFoodById/${id}`, {
        signal,
      });
      setFood(response.data);
    } catch (error) {
      console.log(error);
      message.error("Error fetching food: " + error.message);
    } finally {
      setIsDataLoading(false);
    }
  };

  const mapFoodDataToDescriptions = (foodData) => {
    return [
      {
        key: "1",
        label: "Food Name",
        children: <p>{foodData.foodName || "N/A"}</p>,
      },
      {
        key: "2",
        label: "Description",
        children: <p>{foodData.description || "N/A"}</p>,
      },
      {
        key: "3",
        label: "Image",
        children: foodData.imgUrl ? (
          <img
            src={foodData.imgUrl}
            alt={foodData.foodName}
            style={{ width: "100px" }}
          />
        ) : (
          "No Image"
        ),
      },
      {
        key: "4",
        label: "Video URL",
        children: <p>{foodData.videoUrl || "N/A"}</p>,
      },
      {
        key: "5",
        label: "Calories",
        children: <p>{foodData.calories ?? "N/A"} kcal</p>,
      },
      {
        key: "6",
        label: "Difficulty Level",
        children: <p>{foodData.difficultyLevel || "N/A"}</p>,
      },
      {
        key: "7",
        label: "Health Benefits",
        children: <p>{foodData.healthBenefits || "N/A"}</p>,
      },
      {
        key: "8",
        label: "Cooking Time",
        children: <p>{foodData.cookingTime ?? "N/A"} minutes</p>,
      },
      {
        key: "9",
        label: "Portion",
        children: <p>{foodData.portion ?? "N/A"} serving(s)</p>,
      },
      {
        key: "10",
        label: "Created Date",
        children: (
          <p>
            {foodData.createdDate
              ? new Date(foodData.createdDate).toLocaleString()
              : "N/A"}
          </p>
        ),
      },
      {
        key: "11",
        label: "Updated Date",
        children: (
          <p>
            {foodData.updatedDate
              ? new Date(foodData.updatedDate).toLocaleString()
              : "N/A"}
          </p>
        ),
      },
      {
        key: "12",
        label: "Approved",
        children: (
          <>
            {foodData.isApproved ? (
              <CircleCheck className="ml-4 text-primary-dark"></CircleCheck>
            ) : (
              <CircleX className="ml-4 text-compleprimary-light"></CircleX>
            )}
          </>
        ),
      },
      {
        key: "13",
        label: "Hidden",
        children: (
          <>
            {foodData.isHidden ? (
              <CircleCheck className="ml-4 text-compleprimary-light"></CircleCheck>
            ) : (
              <CircleX className="ml-4 text-primary-dark"></CircleX>
            )}
          </>
        ),
      },
      {
        key: "14",
        label: "Food Types",
        children: (
          <p>
            {(foodData.foodTypes || [])
              .map((type) => type.foodTypeName)
              .join(", ") || "N/A"}
          </p>
        ),
      },
      {
        key: "15",
        label: "Ingredients",
        children: (
          <ul>
            {(foodData.recipes || []).length > 0 ? (
              foodData.recipes.map((recipe, index) => (
                <li key={index}>
                  {recipe.quantity} {recipe.ingredient.measurementUnit}{" "}
                  {recipe.ingredient.ingredientName}
                </li>
              ))
            ) : (
              <li>N/A</li>
            )}
          </ul>
        ),
      },
    ];
  };

  useEffect(() => {
    const controller = new AbortController();

    if (show) {
      fetchData(controller.signal);
    }
    return () => {
      controller.abort();
    };
  }, [id]);

  useEffect(() => {
    return () => {
      setFood({});
    };
  }, [show]);

  return (
    <Modal
      open={show}
      onCancel={onCancel}
      footer={[]}
      width={{
        xs: "90%",
        sm: "90%",
        md: "90%",
        lg: "90%",
        xl: "90%",
        xxl: "90%",
      }}
    >
      {isDataLoading || !food ? (
        <Skeleton
          avatar
          paragraph={{
            rows: 4,
          }}
        />
      ) : (
        <Descriptions
          title="Food Details"
          bordered
          items={mapFoodDataToDescriptions(food)}
          column={{
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
        />
      )}
    </Modal>
  );
};

export default FoodDetailModal;
