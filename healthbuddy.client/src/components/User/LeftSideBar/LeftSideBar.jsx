import React from "react";
import {
  Home,
  MessageSquareText,
  Search,
  UsersRound,
  CalendarFold,
  CirclePlus,
} from "lucide-react";
import { Link } from "react-router-dom";

const LeftSideBar = () => {
  return (
    <div className="flex justify-center items-center transition-all duration-[450ms] ease-in-out w-fit md:w-16 sticky top-1/3 h-fit  md:h-96">
      <div className="flex md:inline-block md:border md:border-solid md:border-gray-700 w-full ease-in-out duration-500 left-0 rounded-2xl  md:shadow-lg md:shadow-black/15 md:bg-gradient-to-b from-white to-seashell   md:dark:bg-gradient-to-b md:dark:from-jet md:dark:to-raisin_black">
        <Link
          to="/"
          className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-primary-light dark:text-primary-dark rounded-xl"
        >
          <Home className="group-hover:scale-125 text-2xl peer-checked/expand:scale-125 ease-in-out duration-300" />
        </Link>
        <button className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-primary-light dark:text-primary-dark rounded-xl">
          <Search className="group-hover:scale-125 text-2xl peer-checked/expand:scale-125 ease-in-out duration-300" />
        </button>
        <button className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-primary-light dark:text-primary-dark rounded-xl">
          <CirclePlus className="group-hover:scale-125 text-2xl peer-checked/expand:scale-125 ease-in-out duration-300" />
        </button>
        <button className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-primary-light dark:text-primary-dark rounded-xl">
          <MessageSquareText className="group-hover:scale-125 text-2xl peer-checked/expand:scale-125 ease-in-out duration-300" />
        </button>
        <button className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-primary-light dark:text-primary-dark rounded-xl">
          <CalendarFold className="group-hover:scale-125 text-2xl peer-checked/expand:scale-125 ease-in-out duration-300" />
        </button>
        <button className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-primary-light dark:text-primary-dark rounded-xl">
          <UsersRound className="group-hover:scale-125 text-2xl peer-checked/expand:scale-125 ease-in-out duration-300" />
        </button>
      </div>
    </div>
  );
};

export default LeftSideBar;
