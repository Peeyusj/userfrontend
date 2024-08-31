/* eslint-disable */

// ** React Imports
import React, { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ** Custom Component
import Spinner from "../Spinner";

// ** Table Columns
import { advSearchColumns } from "./data";

// ** Third Party Components
import { CSVLink } from "react-csv";
import { useCSVReader } from "react-papaparse";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";

// ** import icons
import {
  FaChevronDown as ChevronDown,
  FaDownload as Download,
  FaSearch,
  FaFile as File,
  FaUpload as Upload,
  FaTimes as X,
} from "react-icons/fa";

import emptyBox from "../../assets/images/emptybox.png";

import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { toast } from "../ui/use-toast";
import { orderColumnsByProps } from "@/lib/utils";
import { Input } from "../ui/input";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

// ** import utils

function isValidJSON(jsonString) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch {
    return false;
  }
}

const DataTableBE = ({
  tableTitle,
  propsData,
  data,
  checkBox,
  tableOptions,
  selectedRows,
  isExpandable,
  bulkUserCreationFunc,
  isLoading,
  isExpandDefault = false,
  isReorder,
  count,
  handlePagination,
  currentPage,
  setCurrentPage,
  limit,
  clearRows = false,
  createLink,
  searchString,
  setSearchString,
  setIsOpen                           //prop drilling to close hanging navbar
}) => {
  // ** table options props
  const { downTemplate, chooseFile, upload, search, create } =
    tableOptions || {};

  const navigate = useNavigate();
  let role = localStorage.getItem("type");
  role = isValidJSON(role) ? JSON.parse(role) : null;
  const { CSVReader } = useCSVReader();

  const [tableData, setTableData] = useState(data);

  const [selectedColumns, setSelectedColumns] = useState([]);
  const [csvRows, setCsvRows] = useState([]);


  useEffect(() => {
    setTableData(data);
  }, [data]);

  // ** Custom Pagination
  const CustomPagination = () => (
    <div className="flex justify-end items-center w-full ">
      <ReactPaginate
        forcePage={currentPage - 1}
        onPageChange={(page) => handlePagination(page)}
        pageCount={Math.ceil(count / limit)}
        breakLabel={"..."}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        activeClassName="active"
        pageClassName="page-item"
        breakClassName="page-item"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        previousLabel={
          <CircleArrowLeft value={{ color: "#B8C1CC", size: "36px" }} />
        }
        nextLabel={
          <CircleArrowRight value={{ color: "#B8C1CC", size: "36px" }} />
        }
        containerClassName="pagination react-paginate p-2 mb-2 !mt-6"
      />
    </div>
  );

  // ** custom function for table

  useEffect(() => {
    const columnsData = advSearchColumns.filter((item) => {
      if (propsData?.length > 0 && propsData?.includes(item.name)) {
        return item;
      }
    });

    if (isReorder) {
      const orderedColumns = orderColumnsByProps(propsData, columnsData);
      setSelectedColumns(orderedColumns);
    } else {
      setSelectedColumns(columnsData);
    }
  }, [propsData, data]);

  //  ** function for get data from table only match to propsData object key
  const handleSetCsvData = (header, data) => {
    header = [
      "id",
      "first_name",
      "last_name",
      "email",
      "password",
      "account_name",
      "contact_no",
      "user_id",
      "designation",
    ];

    // Convert array data to JSON format
    function csvJSON(header, data) {
      let result = [];
      let headers = header;

      data.forEach((item) => {
        if (item.length < 4) {
          data.splice(data.indexOf(item), 1);
        }
      });

      for (let i = 0; i < data.length; i++) {
        let obj = {};
        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = data[i][j];
        }
        result.push(obj);
      }


      // Use map to remove the row which has no data
      result = result.map((item) => {
        if (
          item.first_name === undefined ||
          item.first_name === "" ||
          item.first_name === "-" ||
          item.first_name.length < 2
        ) {
          return null;
        }

        return item;
      });

      // Remove the null value from array
      result = result.filter((item) => item !== null);
      return result;
    }

    const jsonData = csvJSON(header, data);
    console.log("jsonData",jsonData)
    setCsvRows(jsonData);
  };

  let missingField;

  const handleBulkUserCreate = () => {
    if (csvRows.length < 1) {
      return toast({
        letiant: "destructive",
        title: "Please upload a CSV file",
      });
    }

    let isValid = true;
    // Convert the tableData to the required format
    const bulkUserData = csvRows.map((item) => {
      const data = {
        first_name: item?.first_name,
        last_name: item?.last_name,
        designation: item?.designation,
        email: item?.email,
        password: item?.password,
        account_name: item?.account_name,
        contact_no: item?.contact_no,
        user_id: item?.user_id,
      };

      // Required fields excluding 'contact_no'
      const requiredFields = [
        "first_name",
        "last_name",
        "designation",
        "email",
        "password",
        "account_name",
        "user_id",
      ];

      // Check for missing fields
      missingField = requiredFields.find((field) => !data[field]);

      if (missingField) {
        isValid = false;
        return;
      }

      return data;
    });

    if (!isValid) {
      return toast({
        letiant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${missingField.replace(
          "_",
          " "
        )} is missing. Please provide a valid ${missingField.replace(
          "_",
          " "
        )}.`,
      });
    }

    bulkUserCreationFunc(bulkUserData); // Adjust function name based on your context
    // setTableData([]);
  };

  const EmptyMessage = () => {
    return (
      <div className="mb-2 pb-2 mt-2">
        <img src={emptyBox} className="d-block m-auto mb-1" alt="Empty Box" />
        <h4>No data available</h4>
      </div>
    );
  };

  // ** custom style for table
  const CustomStyle = {
    headRow: {
      style: {
        minHeight: "32px",
      },
    },
    rows: {
      style: {
        minHeight: "40px !important",
        maxHeight: "40px !important",
      },
    },
    cells: {
      style: {
        minHeight: "40px !important",
        paddingLeft: "12px",
        paddingRight: "12px",
      },
    },
    headCells: {
      style: {
        padding: "0px 12px",
      },
    },
  };

  const csvExport = (tableTitle, cdata, headers) => {
    const csvData = cdata?.map((item) => {
      const arr = [];
      headers.map((head) => {
        arr.push(item[name2key(head)]);
        return true;
      });
      return arr;
    });

    // Prefill the "Account Name" and "Role" fields
    if (csvData.length === 0) {
      const prefillData = [
        ["1", "", "", "", "", "Tech Corp", "", "", "Super Admin"],
        ["2", "", "", "", "", "Innovate Inc", "", "", "Admin"],
        ["3", "", "", "", "", "Tech Solutions", "", "", "Supervisor"],
      ];
      return {
        filename: tableTitle,
        headers,
        data: prefillData,
      };
    }

    return {
      filename: tableTitle,
      headers,
      data: csvData,
    };
  };

  return (
    <Fragment>
      <Card>
        <CardHeader className="flex items-center px-2 pt-2 gap-1 justify-between flex-col md:flex-row w-full">
          <div className="gap-1 d-flex  justify-between items-center flex-1">
            <CardTitle tag="h4" className="text-black">
              {tableTitle}
            </CardTitle>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center px-2 pt-2 gap-2 justify-end  w-full flex-1">
            {downTemplate && (
              <CSVLink
                {...csvExport(
                  "Bulk USer Csv Template",
                  [],
                  [
                    "Sl. No.",
                    "First Name",
                    "Last Name",
                    "Email",
                    "Password",
                    "Account name",
                    "Contact No",
                    "User ID",
                    "Designation",
                  ]
                )}
              >
                <Button outline color="primary">
                  <Download size={15} />
                  <span className="align-middle ms-2">Download Template</span>
                </Button>
              </CSVLink>
            )}
            {chooseFile && (
              <CSVReader
                onUploadAccepted={(results) => {
                  const header = results.data[0];
                  const data = results.data.slice(1);
                  handleSetCsvData(header, data);
                }}
              >
                {({ getRootProps, acceptedFile, getRemoveFileProps }) => (
                  <div>
                    <div className="csvReader">
                      {tableData.length < 1 && (
                        <Button outline color="secondary" {...getRootProps()}>
                          <File size={15} />
                          <span className="align-middle ms-2">
                            Choose a file
                          </span>
                        </Button>
                      )}
                      {tableData.length > 0 && (
                        <div className="flex  items-center px-1 border border-[#ccc] rounded-sm">
                          <div className=" leading-[2.5] pl-2.5 max-w-[100px] overflow-hidden flex-nowrap text-ellipsis whitespace-nowrap ">
                            {acceptedFile && acceptedFile.name}
                          </div>
                          <div {...getRemoveFileProps()}>
                            <X
                              className="text-center flex cursor-pointer pr-1"
                              onClick={() => setTableData([])}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CSVReader>
            )}
            {upload && (
              <Button outline color="primary" onClick={handleBulkUserCreate}>
                <Upload size={15} />
                <span className="align-middle ms-2">Upload</span>
              </Button>
            )}
            {search && (
              <div className="relative ">
                <Input
                  placeholder={"Search"}
                  onChange={(e) => {
                    setCurrentPage(1);
                    setSearchString(e.target.value);
                  }}
                  value={searchString}
                  style={{ maxWidth: "170px", paddingLeft: "30px" }}
                  className=""
                />
                {searchString ? (
                  <X
                    onClick={() => setSearchString("")}
                    className="absolute right-2 top-3 cursor-pointer"
                  />
                ) : (
                  <FaSearch
                    fill="#82868b"
                    className="absolute right-2 top-3 cursor-pointer"
                  />
                )}
              </div>
            )}
            {create && (
              <Button
                outline
                color="primary"
                onClick={() => {
                  if(setIsOpen){
                    setIsOpen(false)
                  }
                  navigate(createLink);
                }}
              >
                <span className="align-middle ms-2">Create</span>
              </Button>
            )}
          </div>
        </CardHeader>
        <div className="react-dataTable">
          {isLoading || !tableData ? (
            <div
              style={{
                maxHeight: "100px",
                marginTop: "-170px",
              }}
            >
              <Spinner />
            </div>
          ) : (
            <div>
              {checkBox ? (
                <DataTable
                  noHeader
                  pagination
                  columns={selectedColumns}
                  paginationPerPage={limit}
                  className="overflow-x-auto"
                  sortIcon={<ChevronDown size={10} />}
                  paginationDefaultPage={currentPage + 1}
                  paginationComponent={CustomPagination}
                  data={tableData}
                  selectableRows
                  onSelectedRowsChange={selectedRows && selectedRows}
                  noDataComponent={<EmptyMessage />}
                  customStyles={CustomStyle}
                />
              ) : (
                <DataTable
                  noHeader
                  pagination
                  columns={selectedColumns}
                  paginationPerPage={limit}
                  className="overflow-x-auto"
                  sortIcon={<ChevronDown size={10} />}
                  paginationDefaultPage={currentPage + 1}
                  paginationComponent={CustomPagination}
                  data={tableData}
                  noDataComponent={<EmptyMessage />}
                  customStyles={CustomStyle}
                />
              )}
            </div>
          )}
        </div>
      </Card>
    </Fragment>
  );
};

export default DataTableBE;
