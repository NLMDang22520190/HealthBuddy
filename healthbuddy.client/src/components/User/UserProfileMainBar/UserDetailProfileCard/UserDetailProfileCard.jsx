import React, { useState, useTransition } from "react";
import { Card, TextInput, Label, Spinner } from "flowbite-react";
import { MoveVertical, Weight, HeartPulse, FishOff } from "lucide-react";
import { message } from "antd";

import api from "../../../../features/AxiosInstance/AxiosInstance";

const UserDetailProfileCard = ({ userDetail }) => {
  const [isSavePending, startSaveTransition] = useTransition();

  const [details, setDetails] = useState({
    height: userDetail.height,
    weight: userDetail.weight,
    healthCondition: userDetail.healthCondition,
    allergies: userDetail.allergies,
  });

  const handleChange = (field, value) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    startSaveTransition(async () => {
      try {
        await api.put("/api/User/UpdateUserDetail", {
          userId: userDetail.id,
          height: details.height,
          weight: details.weight,
          healthCondition: details.healthCondition,
          allergies: details.allergies,
        });
        message.success("User detail saved successfully");
      } catch (error) {
        message.error("Error saving user detail: " + error.message);
      }
    });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {" "}
        <Label className="text-lg font-bold ">Your Detail</Label>
        <div className="grid  grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label>Height</Label>
            <TextInput
              type="number"
              required
              icon={MoveVertical}
              placeholder="Height"
              value={details.height}
              onChange={(e) => handleChange("height", e.target.value)}
            ></TextInput>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Weight</Label>
            <TextInput
              type="number"
              required
              icon={Weight}
              placeholder="Weight"
              value={details.weight}
              onChange={(e) => handleChange("weight", e.target.value)}
            ></TextInput>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Health Condition</Label>
            <TextInput
              required
              icon={HeartPulse}
              placeholder="Health Condition"
              value={details.healthCondition}
              onChange={(e) => handleChange("healthCondition", e.target.value)}
            ></TextInput>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Allergies</Label>
            <TextInput
              required
              icon={FishOff}
              placeholder="Allergies"
              value={details.allergies}
              onChange={(e) => handleChange("allergies", e.target.value)}
            ></TextInput>
          </div>
        </div>
        <div className="flex justify-end w-full">
          <button
            disabled={isSavePending}
            type="submit"
            className={`items-center h-10 px-4 rounded-lg bg-gradient-to-br from-primary-dark to-secondary-dark text-white ${
              isSavePending
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gradient-to-br hover:from-secondary-dark hover:to-primary-dark"
            }`}
          >
            {isSavePending ? (
              <span className="flex items-center justify-center">
                <Spinner color="info" aria-label="White spinner example" />
                <span className="ml-2">Saving...</span>
              </span>
            ) : (
              "Save"
            )}
          </button>
        </div>{" "}
      </form>
    </Card>
  );
};

export default UserDetailProfileCard;
