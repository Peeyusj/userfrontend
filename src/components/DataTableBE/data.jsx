import { Trash2 } from "lucide-react";
import { Switch } from "../ui/switch";
import { formatNewDate } from "@/lib/utils";

/* eslint-disable */
let advSearchColumns = [
  {
    name: "Sl. No.",
    sortable: true,
    minWidth: "90px",
    maxWidth: "90px",
    headerStyle: {
      minWidth: "90px",
    },
    selector: (row) => row.id || "-",
  },
  {
    name: "First Name",
    sortable: true,
    minWidth: "180px",
    selector: (row) => row.first_name || "-",
  },
  {
    name: "Last Name",
    sortable: true,
    minWidth: "180px",
    selector: (row) => row.last_name || "-",
  },
  {
    name: "Designation",
    sortable: true,
    minWidth: "180px",
    selector: (row) => row.designation || "-",
  },
  {
    name: "Account name",
    sortable: true,
    minWidth: "180px",
    selector: (row) => row.account_name || "-",
  },
  {
    name: "Contact No",
    sortable: true,
    minWidth: "180px",
    selector: (row) => row.contact_no || "-",
  },
  {
    name: "Email",
    sortable: true,
    minWidth: "180px",
    selector: (row) => row.email || "-",
  },
  {
    name: "Password",
    sortable: true,
    minWidth: "180px",
    selector: (row) => row.password || "-",
  },
  {
    name: "User ID",
    sortable: true,
    minWidth: "180px",
    selector: (row) => row.user_id || "-",
  },
  {
    name: "User Name",
    sortable: true,
    minWidth: "180px",
    selector: (row) => row.userName || "-",
  },
  {
    name: "Role",
    sortable: true,
    minWidth: "180px",
    selector: (row) => row.role || "-",
  },
  {
    name: "Status",
    sortable: true,
    minWidth: "180px",
    selector: (row) => row.status || "-",
  },
  {
    name: "Created By",
    sortable: true,
    minWidth: "180px",
    selector: (row) => row.createdBy || "-",
  },
  {
    name: "Created At",
    sortable: true,
    minWidth: "180px",
    selector: (row) => row.createdAt? formatNewDate(row.createdAt) : "-",
  },
  {
    name: "Accounts",
    sortable: true,
    minWidth: "180px",
    selector: (row) => (row.accounts && row.accounts.length > 0) ? row.accounts.join(", ") : "-",
  },  
  {
    name: "Action",
    minWidth: "160px",
    maxWidth: "160px",
    cell: (row) => {
      if (row.tbl_name === "role") {
        return (
          <div className="flex gap-2 items-center justify-start ">
            <Switch
              checked={row?.status=="active"}
              onClick={() => row.updateStatusFunc(row?.id, row?.status=="active"?"inactive":"active")}
            />
            <Trash2
              className="text-red-400 cursor-pointer"
              onClick={() => row.deleteFunc(row?.id)}
            />
          </div>
        );
      } else {
        return (
          <a
            className="text-primary"
            // onClick={(row?.viewFunction && row?.viewFunction) || (row?.editFunction && row?.editFunction)}
          >
            CLick me
          </a>
        );
      }
    },
  },
];

export { advSearchColumns };
