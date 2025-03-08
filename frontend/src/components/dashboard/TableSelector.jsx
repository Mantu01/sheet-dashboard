import React from 'react';

const TableSelector = ({ tables, currentTableId, setCurrentTableId }) => {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      {tables.map(table => (
        <div 
          key={table.id} 
          className={`cursor-pointer rounded-lg p-4 border ${currentTableId === table.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-white'}`}
          onClick={() => setCurrentTableId(table.id)}
        >
          <div className="font-medium text-gray-900">Table {tables.indexOf(table) + 1}</div>
          <div className="text-sm text-gray-500">{table.columnConfig.length} columns</div>
        </div>
      ))}
    </div>
  );
};

export default TableSelector;