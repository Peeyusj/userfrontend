/* eslint-disable */

import React from "react"
import { NavLink } from "react-router-dom"
import {
  FaTachometerAlt,
  FaShoppingCart,
  FaUsers,
  FaUser,
} from "react-icons/fa"

const navLinks = [
  { name: "Home", path: "/", icon: <FaTachometerAlt /> },
  { name: "+ Create User", path: "/user/create", icon: <FaUser /> },
  { name: "+ Bulk Create", path: "/user/edit", icon: <FaUsers /> },
]

const Sidebar = () => {
  return (
    <div className="bg-gray-200 text-gray-900 h-screen px-4 fixed w-16 md:w-64 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold hidden md:block mt-4 text-center italic">
        Warehouse Master
      </h1>
      <ul className="flex flex-col mt-5 text-xl">
        {navLinks.map((link, index) => (
          <li key={index} className="mb-2">
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `flex items-center py-2 px-2 space-x-4 rounded-lg hover:cursor-pointer ${
                  isActive
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white"
                }`
              }
            >
              {link.icon}
              <span className="hidden md:inline">{link.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Sidebar
