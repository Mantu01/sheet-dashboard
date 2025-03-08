'use client'

import React, { useState, useRef, useEffect } from 'react';

const EditableCell = ({ value, type, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cellValue, setCellValue] = useState(value || '');
  const inputRef = useRef(null);
  const cellRef = useRef(null);

  useEffect(() => {
    setCellValue(value || '');
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isEditing && cellRef.current && !cellRef.current.contains(event.target)) {
        saveChanges();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, cellValue]);

  const startEditing = () => {
    setIsEditing(true);
  };

  const saveChanges = () => {
    setIsEditing(false);
    onChange(cellValue);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      saveChanges();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setCellValue(value || ''); // Reset to original value
    }
  };

  return (
    <div ref={cellRef} className="relative w-full h-full">
      {isEditing ? (
        <input
          ref={inputRef}
          type={type === 'Date' ? 'date' : 'text'}
          value={cellValue}
          onChange={(e) => setCellValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-full px-1 py-0 border border-indigo-400 focus:ring-2 focus:ring-indigo-500 outline-none bg-transparent"
        />
      ) : (
        <div
          onClick={startEditing}
          className="text-sm text-gray-900 cursor-pointer w-full h-full px-1"
        >
          {cellValue || '-'}
        </div>
      )}
    </div>
  );
};

export default EditableCell;
