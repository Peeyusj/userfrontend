/* eslint-disable */

import { users } from "@/atom";
import DataTableBE from "@/components/DataTableBE";
import { toast } from "@/components/ui/use-toast";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";

// ** import custom components

// import axios

// import third party

const CreateBulkUser = () => {
  const [userVal, setUserVal] = useAtom(users);

  let tableOptions = {
    downTemplate: true,
    upload: true,
    chooseFile: true,
    isDisableSearch: true,
    // exports: true
  };

  const tableProps = [
    "Sl. No.",
    "First Name",
    "Last Name",
    "Email",
    "Password",
    "Account name",
    "Contact No",
    "User ID",
    "Designation",
  ];

  const bulkUserCreationFunc = async (userData) => {
    console.log("UserData", userData);
    // Transform the userData array
    const transformedUserData = userData.map((user, index) => ({
      id:
        index +
        1 +
        (userVal.length > 0 ? Math.max(...userVal.map((u) => u.id)) : 0), // New IDs based on previous highest ID
      userName: `${user.first_name} ${user.last_name}`,
      profilePic: null, // Assuming no profile pic is provided
      email: user.email,
      password: user.password,
      phoneNumber: user.contact_no || null, // Defaulting to null if not available
      createdAt: new Date().toISOString().slice(0, 19).replace("T", " "), // Current timestamp
      accounts: [user.account_name], // Assuming single account name in an array
      roleId: index + 1, // Mapping to roleId based on index
      status: "active", // Default status
      user_id: user.user_id,
      tbl_name: "user",
      role: user.designation, // Directly mapping designation to role
    }));

    // Update the state
    setUserVal((prevUsers) => [...prevUsers, ...transformedUserData]);

    toast({
      title: "Successfully Created",
    });
  };

  return (
    <div className="grow p-4 md:p-8 bg-gray-100 min-h-[100vh] max-w-100">
      <DataTableBE
        tableTitle="Create Bulk User"
        tableOptions={tableOptions}
        propsData={tableProps}
        data={[]}
        bulkUserCreationFunc={bulkUserCreationFunc}
      />
    </div>
  );
};

export default CreateBulkUser;
