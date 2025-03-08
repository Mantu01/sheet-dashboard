'use client'

import React, { useState, useEffect, useRef } from 'react';
import EditableCell from './EditableCell';

const DataTable = ({ table, setTables, tables }) => {
  const [loading, setLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState('');
  
  // Simulate loading data from Google Sheets
  useEffect(() => {
    if (table.sheetUrl && (!table.data || table.data.length === 0)) {
      setLoading(true);
      
      // Simulate API call to Google Sheets
      setTimeout(() => {
        // Mock data from Google Sheets
        const mockData = Array(5).fill().map((_, rowIndex) => {
          return table.columnConfig.reduce((row, col, colIndex) => {
            if (col.type === 'Text') {
              row[col.header] = `Sample ${col.header} ${rowIndex + 1}`;
            } else if (col.type === 'Date') {
              const date = new Date();
              date.setDate(date.getDate() + rowIndex);
              row[col.header] = date.toISOString().split('T')[0];
            }
            return row;
          }, {});
        });
        
        const updatedTables = tables.map(t => {
          if (t.id === table.id) {
            return {
              ...t, 
              data: mockData,
              lastSynced: new Date().toISOString()
            };
          }
          return t;
        });
        
        setTables(updatedTables);
        setLoading(false);
        setSyncStatus('Synced just now');
      }, 1500);
    }
  }, [table.id, table.sheetUrl]);
  
  // Set up polling for Google Sheets updates
  useEffect(() => {
    let intervalId;
    
    if (table.sheetUrl) {
      // Polling every 30 seconds
      intervalId = setInterval(() => {
        setSyncStatus('Syncing...');
        
        // Simulate sync
        setTimeout(() => {
          setSyncStatus('Synced just now');
        }, 1000);
      }, 30000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [table.sheetUrl]);
  
  // Add new row
  const addNewRow = () => {
    const newRow = table.columnConfig.reduce((row, col) => {
      row[col.header] = col.type === 'Date' ? new Date().toISOString().split('T')[0] : '';
      return row;
    }, {});
    
    const updatedTables = tables.map(t => {
      if (t.id === table.id) {
        return { ...t, data: [...t.data, newRow] };
      }
      return t;
    });
    
    setTables(updatedTables);
  };
  
  // Update cell value
  const updateCellValue = (rowIndex, colName, value) => {
    const updatedTables = tables.map(t => {
      if (t.id === table.id) {
        const updatedData = [...t.data];
        updatedData[rowIndex] = {
          ...updatedData[rowIndex],
          [colName]: value
        };
        return { ...t, data: updatedData };
      }
      return t;
    });
    
    setTables(updatedTables);
  };
  
  // Format the display of the last synced time
  const formatLastSynced = () => {
    if (!table.lastSynced) return '';
    
    const lastSynced = new Date(table.lastSynced);
    const now = new Date();
    const diffMs = now - lastSynced;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Synced just now';
    if (diffMins === 1) return 'Synced 1 minute ago';
    if (diffMins < 60) return `Synced ${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return 'Synced 1 hour ago';
    if (diffHours < 24) return `Synced ${diffHours} hours ago`;
    
    return `Synced ${lastSynced.toLocaleDateString()}`;
  };
  
  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Table {tables.indexOf(table) + 1}</h2>
        <div className="flex items-center space-x-4">
          {table.sheetUrl && (
            <div className="text-sm text-gray-500">
              {syncStatus || formatLastSynced()}
            </div>
          )}
          <button
            onClick={addNewRow}
            className="bg-white hover:bg-gray-50 text-indigo-600 px-3 py-1 rounded-md text-sm font-medium border border-indigo-300"
          >
            Add Row
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin h-8 w-8 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
            <p className="mt-2 text-sm text-gray-500">Loading data from Google Sheets...</p>
          </div>
        ) : !table.data || table.data.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-gray-500">No data available. Add a row to get started.</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {table.columnConfig.map((column, index) => (
                  <th 
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.header}
                    <span className="ml-1 text-gray-400">({column.type})</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {table.columnConfig.map((column, colIndex) => (
                    <td 
                      key={colIndex}
                      className="px-6 py-4 whitespace-nowrap"
                    >
                      <EditableCell
                        value={row[column.header]}
                        type={column.type}
                        onChange={(value) => updateCellValue(rowIndex, column.header, value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DataTable;