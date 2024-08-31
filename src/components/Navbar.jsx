/* eslint-disable */

import React from "react";
import { ProfileDropdown } from "./ProfileDropdown";
import { useLocation } from "react-router-dom";

const Navbar = ({ setIsOpen, isOpen }) => {
  const location = useLocation();
  return (
    <div className="px-8  my-2">
      <div className="bg-gray-200 text-gray-900 border-b border-gray-300 p-4 flex justify-between items-center rounded-md dark:border-gray-600 dark:bg-gray-900 dark:text-white">
        <div
          className=" font-bold text-3xl hidden md:block text-center italic cursor-pointer"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          ⌘ Cerebrum Logo
          <span className="capitalize">
            {location?.pathname && location?.pathname != "/"
              ? location?.pathname
              : ""}
          </span>
        </div>
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default Navbar;
