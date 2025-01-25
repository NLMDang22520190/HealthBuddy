import React from "react";

const UserNotiSwitch = ({ id, onChange, checked }) => {
  return (
    /* From Uiverse.io by Javierrocadev */
    <label class="relative inline-flex items-center cursor-pointer">
      <input
        id={id}
        onChange={onChange}
        checked={checked}
        class="sr-only peer"
        value=""
        type="checkbox"
      ></input>
      <div class="group peer ring-0 [box-shadow:1px_3px_0px_0px_#000]  bg-gradient-to-r from-rose-400 to-red-900  rounded-full outline-none duration-1000 after:duration-300 w-12 h-6  shadow-md  peer-focus:outline-none  after:content-[''] after:rounded-full after:absolute after:[background:#0D2B39]   peer-checked:after:rotate-180 after:[background:conic-gradient(from_135deg,_#b2a9a9,_#b2a8a8,_#ffffff,_#d7dbd9_,_#ffffff,_#b2a8a8)]  after:outline-none  after:h-5 after:w-5 after:top-0.5 after:left-0.5 peer-checked:after:translate-x-6 peer-hover:after:scale-150 peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-emerald-900"></div>
    </label>
  );
};

export default UserNotiSwitch;
