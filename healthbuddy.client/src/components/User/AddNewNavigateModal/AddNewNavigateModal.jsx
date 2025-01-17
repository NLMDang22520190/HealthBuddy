import React from "react";
import { Link } from "react-router-dom";
import { Modal } from "antd";
import { Beef, Dumbbell, UtensilsCrossed, Flame } from "lucide-react";

const AddNewNavigateModal = ({ open, onCancel }) => {
  return (
    <Modal
      title="Choose a type to add"
      open={open}
      centered
      onCancel={onCancel}
      footer={[
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Link
            to="/add/new-food"
            className="rounded-xl bg-transparent flex items-center justify-center border-2 border-primary-dark shadow-lg hover:bg-primary-dark text-primary-dark hover:text-white duration-300 cursor-pointer active:scale-[0.98] px-0 py-2 uppercase"
          >
            <Beef className="mr-1" /> Food
          </Link>{" "}
          <Link
            to="/add/new-exercise"
            className="rounded-xl  bg-transparent flex items-center justify-center border-2 border-primary-dark shadow-lg hover:bg-primary-dark text-primary-dark hover:text-white duration-300 cursor-pointer active:scale-[0.98] px-0 py-2 uppercase"
          >
            <Dumbbell className="mr-1" /> Exercise
          </Link>{" "}
          <Link
            to="/add/new-workout"
            className="rounded-xl  bg-transparent flex items-center justify-center border-2 border-primary-dark shadow-lg hover:bg-primary-dark text-primary-dark hover:text-white duration-300 cursor-pointer active:scale-[0.98] px-0 py-2 uppercase"
          >
            <Flame className="mr-1" /> Workout
          </Link>{" "}
          <Link
            to="/add/new-meal"
            className="rounded-xl  bg-transparent flex items-center justify-center border-2 border-primary-dark shadow-lg hover:bg-primary-dark text-primary-dark hover:text-white duration-300 cursor-pointer active:scale-[0.98] px-0 py-2 uppercase"
          >
            <UtensilsCrossed className="mr-1" /> Meal
          </Link>
        </div>,
      ]}
    ></Modal>
  );
};

export default AddNewNavigateModal;
