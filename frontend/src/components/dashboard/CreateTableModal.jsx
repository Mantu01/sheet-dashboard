import { selectSheet } from '@/store/sheetSlice';
import { addSheets } from '@/store/userSlice';
import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CreateTableModal = ({ setShowCreateModal }) => {
  const [title, setTitle] = React.useState('');
  const [numColumns, setNumColumns] = React.useState(3);
  const [columnConfig, setColumnConfig] = React.useState([]);
  const [error, setError] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const dispatch=useDispatch();
  const {user}=useSelector(st=>st.auth);

  React.useEffect(() => {
    const initialColumnConfig = Array(Math.min(parseInt(numColumns) || 0, 50)).fill().map((_, i) => ({
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

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setNumColumns(3);
    setTitle('');
    setError('');
  };

  const handleCreateTable = async () => {
    if (!title.trim()) {
      setError('Table title is required');
      return;
    }
    const headers = columnConfig.map(col => col.header);
    if (new Set(headers).size !== headers.length) {
      setError('Column names must be unique');
      return;
    }

    setIsSubmitting(true);
    setError('');
    
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/sheets`, {title,columns: columnConfig,userId:user._id},{withCredentials: true});
      dispatch(selectSheet(data.sheet));
      dispatch(addSheets(data.sheet));
      setShowCreateModal(false);
    } catch (err) {
      console.error('Error creating table:', err);
      setError(err.response?.data?.message || 'Failed to create table. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNumColumnsChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 50) {
      setError('Maximum of 50 columns allowed');
      setNumColumns(50);
    } else {
      setError('');
      setNumColumns(value);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-60 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">Create New Table</h3>
          <button 
            onClick={handleCloseModal}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 flex-1 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Table Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter table title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white shadow-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Number of Columns
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={numColumns}
                onChange={handleNumColumnsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Column Configuration
              </label>
              <div className="space-y-3 max-h-80 overflow-y-auto bg-gray-50 p-4 rounded-lg">
                {columnConfig.map((column, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={column.header}
                      onChange={(e) => handleColumnConfigChange(index, 'header', e.target.value)}
                      placeholder={`Column ${index + 1} name`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white shadow-sm"
                    />
                    <select
                      value={column.type}
                      onChange={(e) => handleColumnConfigChange(index, 'type', e.target.value)}
                      className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white shadow-sm"
                    >
                      <option value="Text">Text</option>
                      <option value="Date">Date</option>
                      <option value="Number">Number</option>
                      <option value="Boolean">Boolean</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleCreateTable}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:bg-indigo-300 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Table'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTableModal;