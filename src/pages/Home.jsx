/* eslint-disable */

import { useState, useEffect } from "react";
import DataTableBE from "@/components/DataTableBE";
import axios from "@/axios";
import { AlertModal } from "@/components/AlertModal";
import { toast } from "@/components/ui/use-toast";
import { role } from "@/atom";
import { useAtom } from "jotai";
const Home = ({ setNavbarOpen }) => {
  const limit = 10;
  const [dataCount, setDataCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchString, setSearchString] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [row, setRowDetail] = useState(null);
  const [popupStatus, setPopupStatus] = useState("");
  const [roleVal, setRoleVal] = useAtom(role);

  const defaultColumnNames = [
    "Sl. No.",
    "Role",
    "Status",
    "Created By",
    "Created At",
    "Action",
  ];

  const tableOptions = {
    search: true,
    create: true,
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/roles/get-all", {
        params: {
          limit,
          page: currentPage,
          search: searchString,
        },
      });
      // console.log("response?.data?.rolesData", response?.data?.data);

      let rows =
        response?.data?.data?.rolesData?.map((row, index) => {
          return {
            ...row,
            id: row?.id ?? index,
            tbl_name: "role",
            role: row?.name,
            updateStatusFunc: (id, newStatus) => {
              setRowDetail({ id, newStatus });
              setPopupStatus("update");
              setIsOpen(true);
            },
            deleteFunc: (id) => {
              setRowDetail({ id });
              setPopupStatus("delete");
              setIsOpen(true);
            },
          };
        }) ?? [];
      if (roleVal) {
        rows.unshift({ id: rows?.[0]?.id + 1, ...roleVal });
      }
      setData(rows); // Assuming the data is in response.data.data
      setDataCount(response?.data?.data?.totalCount); // Assuming the count is in response.data.count
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [limit, currentPage, searchString]);

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const updateStatus = async () => {
    setIsOpen(false);
    setPopupStatus("");
    if (!row || !row?.id) {
      return;
    } else {
      try {
        setIsLoading(true);

        await axios.patch(`/api/roles/${row?.id}`, {
          newStatus: row?.newStatus,
        });
      } catch (error) {
        console.error("Error updating data:", error);
      } finally {
        setIsLoading(false);
        fetchData();
      }
    }
  };

  const deleteRole = async () => {
    setIsOpen(false);
    setPopupStatus("");
    if (!row || !row?.id) {
      return;
    } else {
      try {
        setIsLoading(true);
        await axios.delete(`/api/roles/${row?.id}`);
        toast({ title: "Deleted successfully" });
      } catch (error) {
        toast({
          title: "Something went wrong",

          variant: "destructive",
        });
        console.error("Error updating data:", error);
      } finally {
        setIsLoading(false);
        fetchData();
      }
    }
  };

  return (
    <div className="grow p-8">
      <DataTableBE
        isLoading={isLoading}
        tableTitle={"Role Management"}
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
        createLink={"/role/create"}
        setIsOpen={setNavbarOpen}
      />
      {popupStatus == "delete" ? (
        <AlertModal
          title={"Are you sure to delete"}
          desc={"If you delete it, this will be a permanent action"}
          confirmFunc={deleteRole}
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
      ) : null}
    </div>
  );
};

export default Home;
