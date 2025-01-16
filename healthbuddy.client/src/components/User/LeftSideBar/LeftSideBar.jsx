import React from "react";
import {
  Home,
  MessageSquareText,
  Search,
  UsersRound,
  CalendarFold,
  CirclePlus,
} from "lucide-react";

const LeftSideBar = () => {
  return (
    <div className="flex flex-col justify-center items-center transition-all duration-[450ms] ease-in-out w-16 sticky top-0 h-screen">
      <article className="border border-solid border-gray-700 w-full ease-in-out duration-500 left-0 rounded-2xl inline-block shadow-lg shadow-black/15 bg-gradient-to-b from-white to-floral_white dark:bg-gradient-to-b dark:from-jet dark:to-raisin_black">
        <button className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-secondary-light dark:text-secondary-dark rounded-xl">
          <Home className="group-hover:scale-125 text-2xl peer-checked/expand:scale-125 ease-in-out duration-300" />
        </button>
        <button className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-secondary-light dark:text-secondary-dark rounded-xl">
          <Search className="group-hover:scale-125 text-2xl peer-checked/expand:scale-125 ease-in-out duration-300" />
        </button>
        <button className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-secondary-light dark:text-secondary-dark rounded-xl">
          <CirclePlus className="group-hover:scale-125 text-2xl peer-checked/expand:scale-125 ease-in-out duration-300" />
        </button>
        <button className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-secondary-light dark:text-secondary-dark rounded-xl">
          <MessageSquareText className="group-hover:scale-125 text-2xl peer-checked/expand:scale-125 ease-in-out duration-300" />
        </button>
        <button className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-secondary-light dark:text-secondary-dark rounded-xl">
          <CalendarFold className="group-hover:scale-125 text-2xl peer-checked/expand:scale-125 ease-in-out duration-300" />
        </button>
        <button className="has-[:checked]:shadow-lg relative w-full h-16 p-4 ease-in-out duration-300 border-solid border-black/10 has-[:checked]:border group flex flex-row gap-3 items-center justify-center text-secondary-light dark:text-secondary-dark rounded-xl">
          <UsersRound className="group-hover:scale-125 text-2xl peer-checked/expand:scale-125 ease-in-out duration-300" />
        </button>
      </article>
    </div>
  );
};

export default LeftSideBar;
