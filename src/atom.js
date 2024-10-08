import { atom } from "jotai";

export const role = atom(null);
export const users = atom([
  {
    id: 3,
    userName: "Pankaj",
    profilePic: null,
    email: "pankaj@gmail.com",
    password: "admin123",
    phoneNumber: null,
    createdAt: "2024-08-31 11:32:21",
    accounts: ["Apple"],
    roleId: 3,
    status: "active",
    user_id: 3,
    tbl_name: "user",
    role: "SuperVisor",
  },
  {
    id: 2,
    userName: "Ishan",
    profilePic: null,
    email: "ishan@gmail.com",
    password: "admin123",
    phoneNumber: null,
    createdAt: "2024-08-31 11:30:40",
    accounts: ["Lava"],
    roleId: 2,
    status: "active",
    user_id: 2,
    tbl_name: "user",
    role: "Admin",
  },
  {
    id: 1,
    userName: "Piyush",
    profilePic: null,
    email: "piyush@gmail.com",
    password: "admin123",
    phoneNumber: null,
    createdAt: "2024-08-31 11:29:48",
    accounts: ["MI", "Apple"],
    roleId: 1,
    status: "active",
    user_id: 1,
    tbl_name: "user",
    role: "SuperAdmin",
  },
]);
