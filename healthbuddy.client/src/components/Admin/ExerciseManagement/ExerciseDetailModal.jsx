import React, { useEffect, useState, useTransition } from "react";
import { Modal, Descriptions, message, Skeleton } from "antd";
import { CircleCheck, CircleX } from "lucide-react";
import { Spinner } from "flowbite-react";

import api from "../../../features/AxiosInstance/AxiosInstance";

const ExerciseDetailModal = ({ show, onCancel, id, onApprove }) => {
  const [exercise, setExercise] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(false);

  const [isApproved, setIsApproved] = useState(false);
  const [isApprovePending, startApproveTransition] = useTransition();

  const fetchData = async (signal) => {
    setIsDataLoading(true);
    try {
      const response = await api.get(`/api/Exercise/GetExerciseById/${id}`, {
        signal,
      });
      setExercise(response.data);
      setIsApproved(response.data.isApproved);
    } catch (error) {
      console.log(error);
      message.error("Error fetching exercise: " + error.message);
    } finally {
      setIsDataLoading(false);
    }
  };

  const mapExerciseDataToDescriptions = (exerciseData) => {
    return [
      {
        key: "1",
        label: "Exercise Name",
        children: <p>{exerciseData.exerciseName || "N/A"}</p>,
      },
      {
        key: "2",
        label: "Description",
        children: <p>{exerciseData.description || "N/A"}</p>,
      },
      {
        key: "3",
        label: "Image",
        children: exerciseData.imgUrl ? (
          <img
            src={exerciseData.imgUrl}
            alt={exerciseData.exerciseName}
            style={{ width: "100px" }}
          />
        ) : (
          "No Image"
        ),
      },
      {
        key: "4",
        label: "Video URL",
        children: <p>{exerciseData.videoUrl || "N/A"}</p>,
      },
      {
        key: "5",
        label: "Difficulty Level",
        children: <p>{exerciseData.difficultyLevel || "N/A"}</p>,
      },
      {
        key: "6",
        label: "Number of Reps",
        children: <p>{exerciseData.numberOfReps ?? "N/A"} reps</p>,
      },
      {
        key: "7",
        label: "Number of Sets",
        children: <p>{exerciseData.numberOfSets ?? "N/A"} sets</p>,
      },
      {
        key: "8",
        label: "Time Between Sets",
        children: <p>{exerciseData.timeBetweenSet ?? "N/A"} seconds</p>,
      },
      {
        key: "9",
        label: "Calories Burned",
        children: <p>{exerciseData.caloriesBurned ?? "N/A"} kcal</p>,
      },
      {
        key: "10",
        label: "Created Date",
        children: (
          <p>
            {exerciseData.createdDate
              ? new Date(exerciseData.createdDate).toLocaleString()
              : "N/A"}
          </p>
        ),
      },
      {
        key: "11",
        label: "Updated Date",
        children: (
          <p>
            {exerciseData.updatedDate
              ? new Date(exerciseData.updatedDate).toLocaleString()
              : "N/A"}
          </p>
        ),
      },
      {
        key: "12",
        label: "Approved",
        children: (
          <>
            {exerciseData.isApproved ? (
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
            {exerciseData.isHidden ? (
              <CircleCheck className="ml-4 text-compleprimary-light"></CircleCheck>
            ) : (
              <CircleX className="ml-4 text-primary-dark"></CircleX>
            )}
          </>
        ),
      },
      {
        key: "14",
        label: "Exercise Types",
        children: (
          <p>
            {(exerciseData.exerciseTypes || [])
              .map((type) => type.exerciseName)
              .join(", ") || "N/A"}
          </p>
        ),
      },
      {
        key: "15",
        label: "Muscle Groups",
        children: (
          <p>
            {(exerciseData.muscleTypes || [])
              .map((muscle) => muscle.muscleTypeName)
              .join(", ") || "N/A"}
          </p>
        ),
      },
    ];
  };

  const handleApprove = async () => {
    startApproveTransition(async () => {
      try {
        const response = await api.put(`/api/Exercise/ApproveExercise/${id}`);
        message.success("Exercise approved successfully");
        fetchData();
        onApprove();
      } catch (error) {
        console.log(error);
        message.error("Error approving exercise: " + error.message);
      }
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    if (show) fetchData(controller.signal);
    return () => {
      controller.abort();
      setExercise({});
    };
  }, [id, show]);

  return (
    <Modal
      open={show}
      onCancel={onCancel}
      footer={[
        <button
          disabled={isApprovePending}
          onClick={() => handleApprove()}
          className={`mr-2 items-center h-10 px-4 rounded-lg bg-gradient-to-br from-primary-dark to-secondary-dark text-white ${
            isApprovePending
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gradient-to-br hover:from-secondary-dark hover:to-primary-dark"
          } ${isApproved ? "hidden" : ""} `}
        >
          {isApprovePending ? (
            <span className="flex items-center justify-center">
              <Spinner color="info" aria-label="White spinner example" />
              <span className="ml-2">Approving...</span>
            </span>
          ) : (
            "Approve"
          )}
        </button>,
        <button
          onClick={onCancel}
          className={`items-center h-10 px-4 rounded-lg border-2 border-compleprimary-dark bg-white text-black ${
            isApprovePending
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gradient-to-br hover:from-compleprimary-dark hover:to-complesecond-dark hover:text-white"
          }`}
        >
          Cancel
        </button>,
      ]}
      width={{
        xs: "90%",
        sm: "90%",
        md: "90%",
        lg: "90%",
        xl: "90%",
        xxl: "90%",
      }}
    >
      {isDataLoading || exercise == {} ? (
        <Skeleton
          avatar
          paragraph={{
            rows: 4,
          }}
        />
      ) : (
        <Descriptions
          title="Exercise Details"
          bordered
          items={mapExerciseDataToDescriptions(exercise)}
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

export default ExerciseDetailModal;
