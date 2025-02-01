import React, { useState } from "react";
import {
  Activity,
  Beef,
  BicepsFlexed,
  Carrot,
  ChefHatIcon,
  Dumbbell,
  LaptopMinimal,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import classNames from "classnames";

import logo from "../../../assets/logo.png";

const SideMenu = ({ isDarkTheme, onToggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const normalSidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", to: "/" },
    { icon: LaptopMinimal, label: "Posts", to: "/admin/posts" },
    { icon: Users, label: "Users", to: "/admin/users" },
  ];

  const foodSidebarItems = [
    { icon: Beef, label: "Food", to: "/admin/food" },
    { icon: ChefHatIcon, label: "Food Types", to: "/admin/food-types" },
    { icon: Carrot, label: "Ingredients", to: "/admin/ingredients" },
  ];

  const exerciseSidebarItems = [
    { icon: Dumbbell, label: "Exercise", to: "/admin/exercise" },
    { icon: Activity, label: "Exercise Types", to: "/admin/exercise-types" },
    { icon: BicepsFlexed, label: "Muscle Types", to: "/admin/muscle-types" },
  ];

  return (
    <div
      className={`sticky top-10  text-white ${
        isOpen ? "w-64" : "w-16"
      } transition-width duration-300`}
    >
      <button
        className="p-4 focus:outline-none"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <div
          className={classNames(`tham tham-e-squeeze tham-w-6`, {
            "tham-active": isOpen,
          })}
        >
          <div className="tham-box">
            <div className="tham-inner bg-white" />
          </div>
        </div>
      </button>
      <Link to="/" className="bg-white flex justify-center items-center ">
        <img
          src={isOpen ? logo : logo}
          className={`${
            isOpen ? "h-16" : "h-8"
          } transition-height duration-300`}
          alt="Stack Overflow Logo"
        />
      </Link>
      <nav className="">
        <ul>
          {normalSidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.label}
              isOpen={isOpen}
              to={item.to}
            />
          ))}
        </ul>
      </nav>
      <Switch
        isDarkTheme={isDarkTheme}
        onToggleTheme={onToggleTheme}
        isOpen={isOpen}
      />
      {/* <button
        className="flex items-center p-4 w-full text-left hover:bg-blue-500  transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
        onClick={handleSignOut}
      >
        <SignOutIcon className="w-6 h-6" aria-hidden="true" />
        {isOpen && <span className="ml-4">Sign Out</span>}
      </button> */}
    </div>
  );
};

export default SideMenu;

const SidebarItem = ({ icon: Icon, label, isOpen, to }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(to);
  };

  const isActive = location.pathname === to;

  return (
    <li
      className={`flex items-center p-4 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer ${
        isActive ? "bg-blue-500" : "hover:bg-blue-500"
      }`}
      onClick={handleClick}
    >
      <Icon className="w-6 h-6" aria-hidden="true" />
      {isOpen && <span className="ml-4">{label}</span>}
    </li>
  );
};

const Switch = ({ isDarkTheme, onToggleTheme, isOpen }) => {
  return (
    <div
      className={`flex items-center ${
        isOpen ? "justify-start px-6" : "justify-center"
      }`}
    >
      <label
        className={`relative inline-flex items-center cursor-pointer transition-transform duration-300 ${
          isOpen ? "scale-150" : "scale-100"
        }`}
      >
        <input
          checked={isDarkTheme}
          onChange={onToggleTheme}
          type="checkbox"
          className="sr-only peer"
        />
        <div className="group peer bg-white rounded-full duration-300 w-14 h-8 ring-2 ring-red-500 after:duration-300 after:bg-red-500 peer-checked:after:bg-green-500 peer-checked:ring-green-500 after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 peer-hover:after:scale-95" />
      </label>
    </div>
  );
};
