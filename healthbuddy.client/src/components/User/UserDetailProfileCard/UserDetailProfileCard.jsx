import React from "react";
import { Card, TextInput, Label } from "flowbite-react";
import { MoveVertical, Weight, HeartPulse, FishOff } from "lucide-react";

const UserDetailProfileCard = ({ userDetail }) => {
  return (
    <Card>
      <Label className="text-lg font-bold ">Your Detail</Label>
      <div className="grid  grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label>Height</Label>
          <TextInput icon={MoveVertical} placeholder="Height"></TextInput>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Weight</Label>
          <TextInput icon={Weight} placeholder="Weight"></TextInput>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Health Condition</Label>
          <TextInput icon={HeartPulse} placeholder="Health Condition" />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Allergies</Label>
          <TextInput icon={FishOff} placeholder="Allergies" />
        </div>
      </div>
      <div className="flex justify-end w-full">
        <button className=" items-center h-10 px-4 rounded-lg bg-gradient-to-br from-primary-dark to-secondary-dark text-white hover:bg-gradient-to-br hover:from-secondary-dark hover:to-primary-dark">
          Save
        </button>
      </div>
    </Card>
  );
};

export default UserDetailProfileCard;
