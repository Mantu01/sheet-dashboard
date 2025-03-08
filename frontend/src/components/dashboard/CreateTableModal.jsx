import React from 'react';

const CreateTableModal = ({
  numColumns,
  setNumColumns,
  sheetUrl,
  setSheetUrl,
  columnConfig,
  handleColumnConfigChange,
  handleCreateTable,
  handleCloseModal,
  error
}) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-10">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Create New Table</h3>
        </div>
        
        <div className="px-6 py-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of Columns
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={numColumns}
              onChange={(e) => setNumColumns(e.target.value)}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Google Sheet URL (Optional)
            </label>
            <input
              type="text"
              value={sheetUrl}
              onChange={(e) => setSheetUrl(e.target.value)}
              placeholder="https://docs.google.com/spreadsheets/d/..."
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Column Configuration
            </label>
            
            <div className="space-y-3 max-h-60 overflow-y-auto p-1">
              {columnConfig.map((column, index) => (
                <div key={index} className="flex space-x-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={column.header}
                      onChange={(e) => handleColumnConfigChange(index, 'header', e.target.value)}
                      placeholder="Column name"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="w-32">
                    <select
                      value={column.type}
                      onChange={(e) => handleColumnConfigChange(index, 'type', e.target.value)}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="Text">Text</option>
                      <option value="Date">Date</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {error && (
            <div className="mb-4 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateTable}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Create Table
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTableModal;