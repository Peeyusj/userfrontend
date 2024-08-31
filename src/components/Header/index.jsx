/* eslint-disable */

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  FaChevronDown,
  FaChevronUp,
  FaTachometerAlt,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { modules } from "./data";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NavLink, useLocation } from "react-router-dom";
import { LinkIcon } from "lucide-react";

const Header = ({ setIsOpen, isOpen }) => {

  //popover links
  const navLinks = [
    { name: "Home", path: "/", icon: <FaTachometerAlt /> },
    { name: "+ Create User", path: "/user/create", icon: <FaUser /> },
    { name: "+ Bulk Create", path: "/user/bulk/create", icon: <FaUsers /> },
    { name: "Account Mapping", path: "/user/account/map", icon: <LinkIcon /> },

  ];

  const location = useLocation();
  return (
    <div className="bg-green my-4 px-8">
      <Collapsible className="bg-white p-4 rounded-md shadow-md " open={isOpen}>
        <div className="flex items-center justify-between">
          <div
            className={`transform transition-transform duration-300 cursor-pointer hover:shadow-md ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
        <h1 className="w-full text-3xl font-bold text-right">Cerebrum</h1>
        <CollapsibleContent>
          <div className="flex flex-wrap p-6">
            {modules.map((module, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
              >
                {module?.isDropDown ? (
                  <>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div
                          className={`rounded-lg p-2 hover:bg-gray-100 transition cursor-pointer ${
                            location.pathname?.startsWith("/user")
                              ? "bg-gray-100"
                              : ""
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <span className="text-2xl">{module.icon}</span>
                            <h2 className="text-xl font-semibold">
                              {module.name}
                            </h2>
                          </div>
                          <p className="mt-2 text-gray-600">
                            {module.description}
                          </p>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <ul className="flex flex-col mt-5 text-xl">
                          {navLinks.map((link, index) => (
                            <li key={index} className="mb-2" onClick={()=>{setIsOpen(false)}}>
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
                                <span className="hidden md:inline">
                                  {link.name}
                                </span>
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </PopoverContent>
                    </Popover>
                  </>
                ) : (
                  <div className="  rounded-lg p-2 hover:bg-gray-100 transition cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl">{module.icon}</span>
                      <h2 className="text-xl font-semibold">{module.name}</h2>
                    </div>
                    <p className="mt-2 text-gray-600">{module.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Header;
