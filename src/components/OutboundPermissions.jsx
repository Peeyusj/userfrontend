/* eslint-disable */
import React from "react";

const OutboundPermissions = ({
  selectedPermissions,
  setSelectedPermissions,
  handleSubmit,
}) => {
  const handleChange = (section, key) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key],
      },
    }));
  };


  return (
    <div className="p-6 bg-gray-200">
        <div className="text-2xl font-bold my-1">Outbound</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {/* Sales Order Section */}
        <div className="border rounded-lg p-4 bg-white">
          <h2 className="text-lg font-semibold mb-2">Sales Order</h2>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.salesOrder.createUpload}
                onChange={() => handleChange("salesOrder", "createUpload")}
              />
              <span className="ml-2">Create/Upload</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.salesOrder.reConfirm}
                onChange={() => handleChange("salesOrder", "reConfirm")}
              />
              <span className="ml-2">Re-Confirm</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.salesOrder.cancel}
                onChange={() => handleChange("salesOrder", "cancel")}
              />
              <span className="ml-2">Cancel</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.salesOrder.courierReAssign}
                onChange={() => handleChange("salesOrder", "courierReAssign")}
              />
              <span className="ml-2">Courier Re Assign</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.salesOrder.updateAddress}
                onChange={() => handleChange("salesOrder", "updateAddress")}
              />
              <span className="ml-2">Update Address</span>
            </label>
          </div>
        </div>

        {/* Pick Section */}
        <div className="border rounded-lg p-4 bg-white">
          <h2 className="text-lg font-semibold mb-2">Pick</h2>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.pick.create}
                onChange={() => handleChange("pick", "create")}
              />
              <span className="ml-2">Create</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.pick.view}
                onChange={() => handleChange("pick", "view")}
              />
              <span className="ml-2">View</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.pick.unassign}
                onChange={() => handleChange("pick", "unassign")}
              />
              <span className="ml-2">Unassign</span>
            </label>
          </div>
        </div>

        {/* Pack Section */}
        <div className="border rounded-lg p-4 bg-white">
          <h2 className="text-lg font-semibold mb-2">Pack</h2>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.pack.b2cPack}
                onChange={() => handleChange("pack", "b2cPack")}
              />
              <span className="ml-2">B2C Pack</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.pack.viewInvoice}
                onChange={() => handleChange("pack", "viewInvoice")}
              />
              <span className="ml-2">View Invoice</span>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.pack.b2bPack}
                onChange={() => handleChange("pack", "b2bPack")}
              />
              <span className="ml-2">B2B Pack</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.pack.invoicing}
                onChange={() => handleChange("pack", "invoicing")}
              />
              <span className="ml-2">Invoicing</span>
            </label>
          </div>
        </div>

        {/* handover Section */}
        <div className="border rounded-lg p-4 bg-white">
          <h2 className="text-lg font-semibold mb-2">Handover</h2>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.handover.create}
                onChange={() => handleChange("handover", "create")}
              />
              <span className="ml-2">Create</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.handover.view}
                onChange={() => handleChange("handover", "view")}
              />
              <span className="ml-2">View</span>
            </label>
          </div>
        </div>
        {/* markShip Section */}
        <div className="border rounded-lg p-4 bg-white">
          <h2 className="text-lg font-semibold mb-2">Manifest</h2>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.manifest.create}
                onChange={() => handleChange("manifest", "create")}
              />
              <span className="ml-2">Create</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.manifest.view}
                onChange={() => handleChange("manifest", "view")}
              />
              <span className="ml-2">View</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.manifest.markShip}
                onChange={() => handleChange("manifest", "markShip")}
              />
              <span className="ml-2">MarkShip</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="col-span-2 mt-6">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutboundPermissions;
