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
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import classNames from "classnames";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { useDispatch } from "react-redux";
import { clearAuth } from "../../../features/Auth/Auth";

import logo from "../../../assets/logo.png";
import { Label } from "flowbite-react";

const SideMenu = ({ isDarkTheme, onToggleTheme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const handleLogout = () => {
    dispatch(clearAuth());
    navigate("/auth/login");
  };

  return (
    <div
      className={`sticky top-10 h-sidebar  overflow-y-auto no-scrollbar text-white ${
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
      <Link to="/" className="bg-white flex justify-center items-center gap-4 ">
        <img
          src={isOpen ? logo : logo}
          className={`${
            isOpen ? "h-16" : "h-8"
          } transition-height duration-300`}
          alt="Stack Overflow Logo"
        />
        {isOpen && (
          <label className="cursor-pointer hidden sm:block bg-gradient-to-br from-primary-dark to-secondary-dark font-bold text-transparent bg-clip-text text-2xl">
            health buddy
          </label>
        )}
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
        <Disclosure as="div" className="" defaultOpen={false}>
          <DisclosureButton className="group flex w-full items-center justify-between hover:bg-secondary-dark dark:hover:bg-secondary-light">
            <SidebarItem icon={Beef} label="Food" isOpen={isOpen}></SidebarItem>
            <ChevronDown className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180 mr-2" />
          </DisclosureButton>
          <DisclosurePanel
            className={`mt-2 text-sm/5  ${isOpen ? "ml-4" : "ml-1"} `}
          >
            <ul>
              {foodSidebarItems.map((item, index) => (
                <SidebarItem
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  isOpen={isOpen}
                  to={item.to}
                />
              ))}
            </ul>
          </DisclosurePanel>
        </Disclosure>
        <Disclosure as="div" className="" defaultOpen={false}>
          <DisclosureButton className="group flex w-full items-center justify-between hover:bg-secondary-dark dark:hover:bg-secondary-light">
            <SidebarItem
              icon={Dumbbell}
              label="Exercise"
              isOpen={isOpen}
            ></SidebarItem>
            <ChevronDown className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180 mr-2" />
          </DisclosureButton>
          <DisclosurePanel
            className={`mt-2 text-sm/5  ${isOpen ? "ml-4" : "ml-1"} `}
          >
            <ul>
              {exerciseSidebarItems.map((item, index) => (
                <SidebarItem
                  key={index}
                  icon={item.icon}
                  label={item.label}
                  isOpen={isOpen}
                  to={item.to}
                />
              ))}
            </ul>
          </DisclosurePanel>
        </Disclosure>
      </nav>
      <button
        className="flex items-center p-4 w-full text-left hover:bg-secondary-dark dark:hover:bg-secondary-light  transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
        onClick={() => handleLogout()}
      >
        <LogOut className="w-6 h-6" aria-hidden="true" />
        {isOpen && <span className="ml-4">Sign Out</span>}
      </button>
      <Switch
        isDarkTheme={isDarkTheme}
        onToggleTheme={onToggleTheme}
        isOpen={isOpen}
      />
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
        isActive
          ? "bg-secondary-dark dark:bg-secondary-light"
          : "hover:bg-secondary-dark dark:hover:bg-secondary-light"
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
      className={`flex items-center my-4 justify-start gap-4 ${
        isOpen ? " px-6" : " px-1"
      }`}
    >
      <label
        className={`relative inline-flex items-center cursor-pointer transition-transform duration-300 ${
          isOpen ? "scale-110" : "scale-100"
        }`}
      >
        <input
          checked={isDarkTheme}
          onChange={onToggleTheme}
          type="checkbox"
          className="sr-only peer"
        />
        <div className="group peer bg-white rounded-full duration-300 w-14 h-8 ring-2 ring-yellow-300 after:duration-300 after:bg-yellow-300 peer-checked:after:bg-zinc-800 peer-checked:ring-zinc-800 after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-6 peer-hover:after:scale-95" />
      </label>
      {isOpen && <label className="">Theme toggle</label>}
    </div>
  );
};
