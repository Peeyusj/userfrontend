/* eslint-disable */
import React from "react"

const InboundPermissions = ({ selectedPermissions, setSelectedPermissions, handleSubmit }) => {
  
  const handleChange = (section, key) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key]
      }
    }))
  }

  const handleSingleChange = (section) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [section]: !prev[section]
    }))
  }


  return (
    <div className="p-6 bg-gray-200">
        <div className="text-2xl font-bold my-1">Inbound</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Purchase Order Section */}
        <div className="border rounded-lg p-4 bg-white">
          <h2 className="text-lg font-semibold mb-2">Purchase Order</h2>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.purchaseOrder.create}
                onChange={() => handleChange('purchaseOrder', 'create')}
              />
              <span className="ml-2">Create</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.purchaseOrder.view}
                onChange={() => handleChange('purchaseOrder', 'view')}
              />
              <span className="ml-2">View</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.purchaseOrder.generatePrintUIDs}
                onChange={() => handleChange('purchaseOrder', 'generatePrintUIDs')}
              />
              <span className="ml-2">Generated & print UIDs</span>
            </label>
          </div>
        </div>

        {/* ASN Section */}
        <div className="border rounded-lg p-4 bg-white" >
          <h2 className="text-lg font-semibold mb-2">ASN</h2>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.asn.create}
                onChange={() => handleChange('asn', 'create')}
              />
              <span className="ml-2">Create</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.asn.view}
                onChange={() => handleChange('asn', 'view')}
              />
              <span className="ml-2">View</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.asn.delete}
                onChange={() => handleChange('asn', 'delete')}
              />
              <span className="ml-2">Delete ASN</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.asn.update}
                onChange={() => handleChange('asn', 'update')}
              />
              <span className="ml-2">Update ASN</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.asn.generatePrintUIDs}
                onChange={() => handleChange('asn', 'generatePrintUIDs')}
              />
              <span className="ml-2">Generated & print UIDs</span>
            </label>
          </div>
        </div>

        {/* Gate Entry Section */}
        <div className="border rounded-lg p-4 bg-white">
          <h2 className="text-lg font-semibold mb-2">Gate Entry</h2>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.gateEntry.create}
                onChange={() => handleChange('gateEntry', 'create')}
              />
              <span className="ml-2">Create</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.gateEntry.view}
                onChange={() => handleChange('gateEntry', 'view')}
              />
              <span className="ml-2">View</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.gateEntry.deleteDoc}
                onChange={() => handleChange('gateEntry', 'deleteDoc')}
              />
              <span className="ml-2">Delete doc.</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.gateEntry.editDocUpload}
                onChange={() => handleChange('gateEntry', 'editDocUpload')}
              />
              <span className="ml-2">Edit document upload</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.gateEntry.shortClose}
                onChange={() => handleChange('gateEntry', 'shortClose')}
              />
              <span className="ml-2">Short close</span>
            </label>
          </div>
        </div>

        {/* GRN Section */}
        <div className="border rounded-lg p-4 bg-white">
          <h2 className="text-lg font-semibold mb-2">GRN</h2>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.grn.create}
                onChange={() => handleChange('grn', 'create')}
              />
              <span className="ml-2">Create</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.grn.view}
                onChange={() => handleChange('grn', 'view')}
              />
              <span className="ml-2">View</span>
            </label>
          </div>
        </div>

        {/* Sticker Section */}
        <div className="border rounded-lg p-4 bg-white">
          <h2 className="text-lg font-semibold mb-2">Stickering</h2>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.stickering}
                onChange={() => handleSingleChange('stickering')}
              />
              <span className="ml-2">Stickering</span>
            </label>
          </div>
        </div>

        {/* Putaway Section */}
        <div className="border rounded-lg p-4 bg-white">
          <h2 className="text-lg font-semibold mb-2">Putaway</h2>
          <div className="grid grid-cols-2 gap-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.putaway.create}
                onChange={() => handleChange('putaway', 'create')}
              />
              <span className="ml-2">Create</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={selectedPermissions.putaway.view}
                onChange={() => handleChange('putaway', 'view')}
              />
              <span className="ml-2">View</span>
            </label>
          </div>
        </div>

      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default InboundPermissions
