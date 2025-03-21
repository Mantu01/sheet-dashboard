'use client'

import CreateTableModal from '@/components/dashboard/CreateTableModal';
import DataTable from '@/components/dashboard/DataTable';
import EmptyState from '@/components/dashboard/EmptyState';
import Header from '@/components/dashboard/Header';
import TableSelector from '@/components/dashboard/TableSelector';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Main App Component
const ExcelClone = () => {

  const {selectedSheet}=useSelector(state=>state.sheet);
  const {user}=useSelector(state=>state.auth);

  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header setShowCreateModal={setShowCreateModal} />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {user?.sheet.length === 0 ? (
          <EmptyState setShowCreateModal={setShowCreateModal} />
        ) : (
          <div>
            <TableSelector/>
            {selectedSheet && (
              <DataTable/>
            )}
          </div>
        )}
      </main>

      {showCreateModal && (
        <CreateTableModal
          setShowCreateModal={setShowCreateModal}
        />
      )}
    </div>
  );
};

export default ExcelClone;