/* eslint-disable */

import { useState, useEffect } from "react";
import DataTableBE from "@/components/DataTableBE";
import { AlertModal } from "@/components/AlertModal";
import { toast } from "@/components/ui/use-toast";
import { users } from "@/atom";
import { useAtom } from "jotai";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaCheckCircle, FaKey, FaTrash } from "react-icons/fa";
import { XCircle } from "lucide-react";
import { PasswordAlertModal } from "@/components/AlertModal/PasswordAlertModal";

const AccountMapping = ({ setNavbarOpen }) => {
  const limit = 10;
  const [dataCount, setDataCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchString, setSearchString] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [account, setAccount] = useState(null);
  const [popupStatus, setPopupStatus] = useState("");
  const [userVal, setUserVal] = useAtom(users);
  const [selectedRows, setSelectedRows] = useState([]);
  const [statusVal, setStatusVal] = useState([]);

  const defaultColumnNames = ["User Name", "User ID", "Role", "Status"];

  const tableOptions = {
    // search: true,
    create: true,
  };

  const fetchData = () => {
    setIsLoading(true);
    let rows =
      userVal?.map((row, index) => {
        return {
          ...row,
          id: row?.id ?? index,
          user_id: row?.user_id ?? row?.id,
          tbl_name: "user",
        };
      }) ?? [];
    console.log(rows);
    setData(rows); // Assuming the data is in response.data.data
    setDataCount(rows?.length); // Assuming the count is in response.data.count

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [limit, currentPage, userVal]);

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const updateStatus = () => {
    setIsOpen(false);
    setPopupStatus("");

    if (!selectedRows || selectedRows.length <= 0) {
      toast({
        title: "Please Select a row",
        variant: "destructive",
      });
      return;
    } else {
      setIsLoading(true);

      // Assuming `userVal` is your list of users
      const updatedUsers = userVal.map((user) => {
        if (selectedRows.includes(user.id)) {
          return {
            ...user,
            status: statusVal, // update status to the new statusVal
          };
        }
        return user;
      });

      // Log the updated users to verify
      console.log("Updated Users:", updatedUsers);

      // Set the updated users back to state or send them to the server as needed
      setUserVal(updatedUsers);

      setSelectedRows([]);
      setIsLoading(false);
    }
  };

  const deleteUser = async () => {
    setIsOpen(false);
    setPopupStatus("");

    if (!selectedRows || selectedRows.length <= 0) {
      toast({
        title: "Please Select a row",
        variant: "destructive",
      });
      return;
    } else {
      setIsLoading(true);

      // Assuming `userVal` is your list of users
      const updatedUsers = userVal.filter(
        (user) => !selectedRows.includes(user.id)
      );

      // Log the updated users to verify
      console.log("Updated Users after deletion:", updatedUsers);

      // Set the updated users back to state or send them to the server as needed
      setUserVal(updatedUsers);

      toast({ title: "Deleted successfully" });

      setSelectedRows([]);
      setIsLoading(false);
    }
  };

  const updatePass = async (updatePass) => {
    setIsOpen(false);
    setPopupStatus("");

    setIsLoading(true);
    console.log({
      updatePass: updatePass,
      update: "password",
      ids: selectedRows,
    });
    toast({ title: "Updated successfully" });

    setSelectedRows([]);
    setIsLoading(false);
  };

  const updateAccountMapping = () => {
    setIsOpen(false);
    setPopupStatus("");
    if (!selectedRows || selectedRows?.length <= 0) {
      toast({
        title: "Please Select a row",
        variant: "destructive",
      });
      return;
    } else {
      if (!account) {
        toast({
          title: "Please Select a row",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);
      console.log({
        account: account,
        update: "accounts",
        ids: selectedRows,
      });
      toast({ title: "Updated successfully" });
      setSelectedRows([]);
      setIsLoading(false);
      setAccount("");
    }
  };

  const handleSelectedRows = (state) => {
    if (state.selectedRows?.length) {
      console.log("state.selectedRows", state.selectedRows);
      setSelectedRows(state.selectedRows?.map((row) => row?.id));
    }
  };
  return (
    <div className="grow p-8">
      <div className="flex justify-center items-center gap-6 my-2">
        <Label>Select Account</Label>
        <Select
          onValueChange={(val) => {
            setAccount(val);
          }}
        >
          <SelectTrigger className="max-w-[400px]">
            <SelectValue placeholder="Select an account" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Samsung">Samsung</SelectItem>
            <SelectItem value="Kia">Kia</SelectItem>
            <SelectItem value="Moto">Moto</SelectItem>
            <SelectItem value="Sony">Sony</SelectItem>
            <SelectItem value="Tata">Tata</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={() => {
            setPopupStatus("mapAccount");
            setIsOpen(true);
          }}
        >
          Add user account mapping
        </Button>
      </div>
      <div className="flex justify-start items-center gap-6 mt-6 p-4 rounded-t-md bg-gray-200">
        <FaCheckCircle
          className=" text-3xl cursor-pointer"
          onClick={() => {
            setStatusVal("active");
            setPopupStatus("update");
            setIsOpen(true);
          }}
        />
        <XCircle
          className="text-red-400 text-2xl cursor-pointer"
          onClick={() => {
            setStatusVal("inactive");
            setPopupStatus("update");
            setIsOpen(true);
          }}
        />
        <FaTrash
          className="text-red-400 text-2xl cursor-pointer"
          onClick={() => {
            setPopupStatus("delete");
            setIsOpen(true);
          }}
        />
        <FaKey
          className="text-green text-2xl cursor-pointer"
          onClick={() => {
            if (!selectedRows || selectedRows?.length <= 0) {
              toast({
                title: "Please Select a row",
                variant: "destructive",
              });
              return;
            }
            setPopupStatus("updatePass");
            setIsOpen(true);
          }}
        />
      </div>
      <DataTableBE
        isLoading={isLoading}
        tableTitle={"Account Mapping"}
        tableOptions={tableOptions}
        propsData={defaultColumnNames}
        data={data}
        handlePagination={handlePagination}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        count={dataCount}
        searchString={searchString}
        setSearchString={setSearchString}
        limit={limit}
        createLink={"/user/create"}
        setIsOpen={setNavbarOpen}
        checkBox={true}
        selectedRows={handleSelectedRows}
      />
      {popupStatus == "delete" ? (
        <AlertModal
          title={"Are you sure to delete"}
          desc={"If you delete it, this will be a permanent action"}
          confirmFunc={deleteUser}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      ) : popupStatus == "update" ? (
        <AlertModal
          title={"Are you sure to update"}
          desc={"If you update it, this will be a permanent action"}
          confirmFunc={updateStatus}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      ) : popupStatus == "updatePass" ? (
        <PasswordAlertModal
          confirmFunc={updatePass}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      ) : popupStatus == "mapAccount" ? (
        <AlertModal
          title={"Are you sure to Map this account"}
          desc={"If you update it, this will be a permanent action"}
          confirmFunc={updateAccountMapping}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      ) : null}
    </div>
  );
};

export default AccountMapping;
