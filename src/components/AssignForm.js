 import React, { useState } from "react";

export default function AssignForm ({ onSubmit, onCancel }) {
    const [selectedPerson, setSelectedPerson] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(selectedPerson);
    };
  
    return (
      <form onSubmit={handleSubmit} className="mt-4">
        <label className="block mb-2 text-sm font-semibold text-gray-700">Select Person to Assign:</label>
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
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
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