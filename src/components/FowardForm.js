import React, { useState } from 'react'
import { useSelector } from 'react-redux';

export default function ForwardForm ({ onSubmit, onCancel }) {
    const [selectedPerson, setSelectedPerson] = useState('');

    const  staffs =   useSelector(state => state.users);
    console.log(staffs);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(selectedPerson);
    };
  
    return (
      <form onSubmit={handleSubmit} className="mt-4">
        <label className="block mb-2 text-sm font-semibold text-gray-700">Select Person to Forward:</label>
        <select
          value={selectedPerson}
          onChange={(e) => setSelectedPerson(e.target.value)}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
        >
          {/* Populate options dynamically based on your data */}
          <option value="person1">Person 1</option>
          <option value="person2">Person 2</option>
          {/* Add more options as needed */}
        </select>
        <div className="mt-4 flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  };
