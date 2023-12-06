import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { assignConcern } from '../store/actions/concern_actions';

export default function ForwardForm ({ onSubmit, onCancel }) {
    const [selectedPerson, setSelectedPerson] = useState('');

    const  staffs =   useSelector(state => state.users);
    // console.log(staffs.staffs);  
    const dispatch =  useDispatch();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      //  dispatch(assignConcern(selectedPerson));
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
          <option value=""  default>Select Minister</option>
          {
                    staffs && staffs.staffs &&(
                      staffs && staffs.staffs && staffs.staffs.empty === false ? (
                        staffs.staffs.content.map((item,index) => (
                          <option key={index} value={item.uuid}> {item.fullName} </option>
                        )
                      )
                    )
                    :
                    <>
                    <option value="">No data found</option>
                    </>
                    )
                  }
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
