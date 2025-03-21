'use client'

import React, { useState, useEffect } from 'react';
import EditableCell from './EditableCell';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ArrowDownUp, Plus, RefreshCw, Download, Filter, Search } from 'lucide-react';

const DataTable = () => {
  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState([]); 
  const [headers, setHeaders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { isAuthenticated } = useSelector(state => state.auth);
  const { selectedSheet } = useSelector(state => state.sheet);

  // Fetch data from Google Sheets
  useEffect(() => {
    setLoading(true);
    if (isAuthenticated && selectedSheet) {      
      fetchSheetData();
    }
  }, [isAuthenticated, selectedSheet]);

  const fetchSheetData = async() => {
    try {
      setIsRefreshing(true);
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/sheets/${selectedSheet._id}`);
      
      if (data.data.values && data.data.values.length > 0) {
        // First row contains headers
        const headerRow = selectedSheet.columns.map(col => col.header);
        setHeaders(headerRow);
        
        // Store data as arrays directly
        setTableData(data.data.values);
      } else {
        setHeaders([]);
        setTableData([]);
      }
    } catch (error) {
      console.error("Error fetching sheet data:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };
  
  // Update cell value in the array format
  const updateCellValue = async(rowIndex, colIndex, value) => {
    // Adjust the actual rowIndex to account for the hidden first row
    const actualRowIndex = rowIndex + 1; // +1 because we're skipping the first row in display
    
    const updatedData = [...tableData];
    updatedData[actualRowIndex] = [...updatedData[actualRowIndex]];
    updatedData[actualRowIndex][colIndex] = value;
    
    setTableData(updatedData);
    
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/sheets/${selectedSheet.sheetId}`, 
        {values: updatedData},
        {withCredentials: true}
      );
    } catch (error) {
      console.error("Error updating cell:", error);
      // Optionally add toast notification here
    }
  };
  
  // Add a new row
  const addRow = () => {
    const newRow = [];
    headers.forEach(header => {
      // Use column type from selectedSheet if available
      const columnConfig = selectedSheet.columns.find(col => col.header === header);
      newRow.push(columnConfig && columnConfig.type === "Number" ? "0" : "");
    });
    
    setTableData([...tableData, newRow]);
  };

  // Export data as CSV
  const exportCSV = () => {
    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...tableData.map(row => row.join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${selectedSheet?.title || 'sheet-data'}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Sort table data
  const requestSort = (key) => {
    let direction = 'ascending';
    
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    const colIndex = headers.findIndex(header => header === key);
    
    if (colIndex === -1) return;
    
    // We need to preserve the first row and sort the rest
    const firstRow = tableData[0];
    const dataToSort = tableData.slice(1);
    
    const sortedData = [...dataToSort].sort((a, b) => {
      if (a[colIndex] < b[colIndex]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[colIndex] > b[colIndex]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    
    // Combine first row with sorted data
    setTableData([firstRow, ...sortedData]);
    setSortConfig({ key, direction });
  };

  // Filter data based on search term
  const filteredData = searchTerm 
    ? tableData.slice(1).filter(row => { // Skip the first row when filtering
        return row.some(cell => 
          cell.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    : tableData.slice(1); // Skip the first row for display

  // Get sorted column style
  const getSortDirectionIcon = (headerName) => {
    if (sortConfig.key !== headerName) {
      return null;
    }
    
    return sortConfig.direction === 'ascending' ? 
      <ArrowDownUp className="h-4 w-4 ml-1 inline text-indigo-600" /> : 
      <ArrowDownUp className="h-4 w-4 ml-1 inline text-indigo-600 rotate-180" />;
  };

  // Get the displayed row count (excluding the first row)
  const displayedRowCount = tableData.length > 0 ? tableData.length - 1 : 0;

  return (
    <div className="bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            {selectedSheet?.title || "Sheet"}
            {loading && <div className="ml-3 inline-block animate-spin h-4 w-4 border-2 border-indigo-500 rounded-full border-t-transparent"></div>}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {displayedRowCount} rows • Last updated: {new Date().toLocaleString()}
          </p>
        </div>
        
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 py-2 pr-3 block w-full sm:w-64 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              placeholder="Search data..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button
            className="inline-flex items-center py-2 px-3 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={fetchSheetData}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          
          <button
            className="inline-flex items-center py-2 px-3 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={exportCSV}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          
          <button
            className="inline-flex items-center py-2 px-3 border border-indigo-300 rounded-md bg-indigo-50 text-sm font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={addRow}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Row
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        {loading ? (
          <div className="py-16 text-center">
            <div className="inline-block animate-spin h-12 w-12 border-4 border-indigo-500 rounded-full border-t-transparent"></div>
            <p className="mt-4 text-sm text-gray-500">Loading data from Google Sheets...</p>
          </div>
        ) : headers.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gray-500">No headers found. Please check your Google Sheet.</p>
            <button 
              onClick={fetchSheetData}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </button>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="py-16 text-center">
            {searchTerm ? (
              <div>
                <p className="text-gray-500">No matching results found.</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div>
                <p className="text-gray-500">No data available. Add a row to get started.</p>
                <button 
                  onClick={addRow}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Row
                </button>
              </div>
            )}
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {headers.map((header, index) => {
                  // Find the column config to get the type
                  const columnConfig = selectedSheet.columns.find(col => col.header === header);
                  return (
                    <th 
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => requestSort(header)}
                    >
                      <div className="flex items-center">
                        <span>{header}</span>
                        {getSortDirectionIcon(header)}
                        {columnConfig && (
                          <span className="ml-1 text-xs text-gray-400 font-normal">({columnConfig.type})</span>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {row.map((cellValue, colIndex) => {
                    // Find the column config to get the type
                    const header = headers[colIndex];
                    const columnConfig = selectedSheet.columns.find(col => col.header === header);
                    
                    return (
                      <td 
                        key={colIndex}
                        className="px-6 py-4 whitespace-nowrap"
                      >
                        <EditableCell
                          value={cellValue}
                          type={columnConfig ? columnConfig.type : "TEXT"}
                          onChange={(value) => updateCellValue(rowIndex, colIndex, value)}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      {!loading && filteredData.length > 0 && (
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 text-sm text-gray-500">
          Displaying {filteredData.length} of {displayedRowCount} rows
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="ml-4 text-indigo-600 hover:text-indigo-800"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DataTable;