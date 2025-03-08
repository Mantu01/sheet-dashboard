'use client'

import CreateTableModal from '@/components/dashboard/CreateTableModal';
import DataTable from '@/components/dashboard/DataTable';
import EmptyState from '@/components/dashboard/EmptyState';
import Header from '@/components/dashboard/Header';
import TableSelector from '@/components/dashboard/TableSelector';
import React, { useState, useEffect } from 'react';

// Main App Component
const ExcelClone = () => {
  // States for dashboard
  const [tables, setTables] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [numColumns, setNumColumns] = useState(3);
  const [columnConfig, setColumnConfig] = useState([]);
  const [sheetUrl, setSheetUrl] = useState('');
  const [currentTableId, setCurrentTableId] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    const initialColumnConfig = Array(parseInt(numColumns) || 0).fill().map((_, i) => ({
      header: `Column ${i + 1}`,
      type: 'Text'
    }));
    setColumnConfig(initialColumnConfig);
  }, [numColumns]);
  const handleColumnConfigChange = (index, field, value) => {
    const updatedConfig = [...columnConfig];
    updatedConfig[index] = { ...updatedConfig[index], [field]: value };
    setColumnConfig(updatedConfig);
  };
  const handleCreateTable = () => {
    if (columnConfig.some(col => !col.header.trim())) {
      setError('All columns must have headers');
      return;
    }
    
    const newTable = {
      id: Date.now(),
      columnConfig: [...columnConfig],
      data: [],
      sheetUrl: sheetUrl,
      lastSynced: null
    };
    
    setTables([...tables, newTable]);
    setCurrentTableId(newTable.id);
    setShowCreateModal(false);
    setError('');
  };

  // Reset modal form
  const handleCloseModal = () => {
    setShowCreateModal(false);
    setNumColumns(3);
    setSheetUrl('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header setShowCreateModal={setShowCreateModal} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {tables.length === 0 ? (
          <EmptyState setShowCreateModal={setShowCreateModal} />
        ) : (
          <div>
            <TableSelector
              tables={tables} 
              currentTableId={currentTableId} 
              setCurrentTableId={setCurrentTableId} 
            />
            
            {currentTableId && (
              <DataTable
                table={tables.find(t => t.id === currentTableId)} 
                setTables={setTables}
                tables={tables}
              />
            )}
          </div>
        )}
      </main>

      {showCreateModal && (
        <CreateTableModal
          numColumns={numColumns}
          setNumColumns={setNumColumns}
          sheetUrl={sheetUrl}
          setSheetUrl={setSheetUrl}
          columnConfig={columnConfig}
          handleColumnConfigChange={handleColumnConfigChange}
          handleCreateTable={handleCreateTable}
          handleCloseModal={handleCloseModal}
          error={error}
        />
      )}
    </div>
  );
};

export default ExcelClone;