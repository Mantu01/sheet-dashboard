import { selectSheet } from '@/store/sheetSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TableSelector = () => {
  const {sheet}=useSelector(state=>state.auth?.user)
  const {selectedSheet}=useSelector(state=>state.sheet);

  const dispatch=useDispatch();
  
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      {sheet.map(table => (
        <div 
          key={table._id} 
          className={`cursor-pointer rounded-lg p-4 border ${table._id==selectedSheet?._id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-white'}`}
           onClick={() => dispatch(selectSheet(table))}
        >
          <div className="font-medium text-gray-900">{table.title}</div>
          <div className="text-sm text-gray-500">{table.columns.length} columns</div>
        </div>
      ))}
    </div>
  );
};

export default TableSelector;