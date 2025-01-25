import React from "react";
import { LogOut, AlignJustify, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";

import { clearAuth } from "../../../features/Auth/Auth";
import SearchBar from "./SearchBar";
import logo from "../../../assets/logo.png";
import BreakPoint from "../../BreakPoint/BreakPoint";

// Component: ToggleTheme
const ToggleTheme = ({ isDarkTheme, onToggleTheme }) => (
  <label className="inline-flex items-center relative">
    <input
      className="peer hidden"
      id="toggle"
      type="checkbox"
      checked={isDarkTheme}
      onChange={onToggleTheme}
    />
    <div className="relative w-[110px] h-[50px] bg-white peer-checked:bg-zinc-500 rounded-full after:absolute after:content-[''] after:w-[40px] after:h-[40px] after:bg-gradient-to-r from-orange-500 to-yellow-400 peer-checked:after:from-zinc-900 peer-checked:after:to-zinc-900 after:rounded-full after:top-[5px] after:left-[5px] peer-checked:after:left-[65px] shadow-sm duration-300 after:duration-300 after:shadow-md"></div>
    <svg
      height="0"
      width="100"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-white peer-checked:opacity-60 absolute w-6 h-6 left-[13px]"
    >
      <path d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM13,0h-2V5h2V0Zm0,19h-2v5h2v-5ZM5,11H0v2H5v-2Zm19,0h-5v2h5v-2Zm-2.81-6.78l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54ZM7.76,17.66l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54Zm0-11.31l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Zm13.44,13.44l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Z"></path>
    </svg>
    <svg
      height="512"
      width="512"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-6 h-6 right-[13px]"
    >
      <path d="M12.009,24A12.067,12.067,0,0,1,.075,10.725,12.121,12.121,0,0,1,10.1.152a13,13,0,0,1,5.03.206,2.5,2.5,0,0,1,1.8,1.8,2.47,2.47,0,0,1-.7,2.425c-4.559,4.168-4.165,10.645.807,14.412h0a2.5,2.5,0,0,1-.7,4.319A13.875,13.875,0,0,1,12.009,24Zm.074-22a10.776,10.776,0,0,0-1.675.127,10.1,10.1,0,0,0-8.344,8.8A9.928,9.928,0,0,0,4.581,18.7a10.473,10.473,0,0,0,11.093,2.734.5.5,0,0,0,.138-.856h0C9.883,16.1,9.417,8.087,14.865,3.124a.459.459,0,0,0,.127-.465.491.491,0,0,0-.356-.362A10.68,10.68,0,0,0,12.083,2ZM20.5,12a1,1,0,0,1-.97-.757l-.358-1.43L17.74,9.428a1,1,0,0,1,.035-1.94l1.4-.325.351-1.406a1,1,0,0,1,1.94,0l.355,1.418,1.418.355a1,1,0,0,1,0,1.94l-1.418.355-.355,1.418A1,1,0,0,1,20.5,12ZM16,14a1,1,0,0,0,2,0A1,1,0,0,0,16,14Zm6,4a1,1,0,0,0,2,0A1,1,0,0,0,22,18Z"></path>
    </svg>
  </label>
);

// Component: AuthButtons
const AuthButtons = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(clearAuth());
    navigate("/auth/login");
  };

  const handleProfile = (user) => {
    navigate("/user/" + user);
  };

  if (user) {
    return (
      <div className="flex flex-col gap-2 items-end justify-center">
        <button
          onClick={() => handleProfile(user)}
          class="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-primary-400 to-secondary-400 backdrop-blur-lg px-4 py-2 text-base font-semibold text-white transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-xl hover:shadow-gray-600/50 border border-white/20"
        >
          <User className="text-white mr-2" /> Profile
          <div class="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
            <div class="relative h-full w-10 bg-white/20"></div>
          </div>
        </button>
        <button
          onClick={() => handleLogout()}
          className="group flex items-center justify-start size-12 bg-compleprimary-dark rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-28 hover:rounded-lg active:translate-x-1 active:translate-y-1"
        >
          <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
            <LogOut className="text-white" />
          </div>
          <div className="absolute right-5 pb-1 transform translate-x-full opacity-0 text-white text-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            Logout
          </div>
        </button>
      </div>
    );
  }
  return (
    <>
      <Link
        to="/auth/login"
        className="rounded-xl max-w-32 bg-transparent flex items-center justify-center border-2 border-primary-dark shadow-lg hover:bg-primary-dark text-primary-dark hover:text-white duration-300 cursor-pointer active:scale-[0.98] px-5 py-2 uppercase"
      >
        Login
      </Link>
      <Link
        to="/auth/signup"
        className="rounded-xl max-w-32 bg-gradient-to-br from-primary-dark to-secondary-dark flex items-center justify-center border-2 shadow-lg hover:bg-gradient-to-br hover:from-secondary-dark hover:to-primary-dark text-white transition duration-300 cursor-pointer active:scale-[0.98] px-5 py-2 uppercase"
      >
        Sign up
      </Link>
    </>
  );
};

// Main Navbar Component
const Navbar = ({ onToggleTheme, isDarkTheme }) => {
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const user = authState.userId;

  return (
    <div className="bg-transparent flex items-center justify-between sticky top-0 z-50">
      <div className=" md-lg:mx-auto bg-white dark:bg-bg_content_dark flex items-center justify-between w-full md-lg:w-10/12 xl:w-8/12 2xl:w-7/12 mt-2 rounded-2xl p-4">
        <div
          onClick={() => navigate("/")}
          className=" flex text-center items-center gap-4 cursor-pointer"
        >
          <img className="size-12" src={logo} alt="logo" />
          {/* <label className="cursor-pointer hidden sm:block bg-gradient-to-br from-primary-dark to-secondary-dark font-bold text-transparent bg-clip-text text-2xl">
            health buddy
          </label> */}
          <BreakPoint />
        </div>
        <div className="flex gap-4 items-center">
          <SearchBar />
          {/* <div className="hidden lg:flex gap-2">
            <ToggleTheme
              isDarkTheme={isDarkTheme}
              onToggleTheme={onToggleTheme}
            />
            <AuthButtons user={user} />
          </div> */}
          <Menu>
            <MenuButton className=" bg-gradient-to-br from-primary-dark to-secondary-dark p-3 text-white rounded-full">
              <AlignJustify />
            </MenuButton>
            <MenuItems
              transition
              anchor="bottom"
              className="bg-whiteSmoke dark:bg-ebony rounded-lg bg-opacity-5 shadow-lg p-4 gap-2 flex flex-col"
            >
              <MenuItem>
                <ToggleTheme
                  isDarkTheme={isDarkTheme}
                  onToggleTheme={onToggleTheme}
                />
              </MenuItem>
              <MenuItem>
                <AuthButtons user={user} />
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
