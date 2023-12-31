import React, { useState } from 'react';
import AssignForm from './AssignForm';
import ForwardForm from './FowardForm';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'; 
import { getConcernById } from '../store/actions/concern_actions';

const Intermediate = () => {

  const [showAssignForm, setShowAssignForm] = useState(false);
  const [showForwardForm, setShowForwardForm] = useState(false);
  const dispatch = useDispatch();

  const currentConcern = useSelector((state) => state.concerns);
  // console.log(currentConcern);

  const handleAssignClick = () => {
    setShowAssignForm(true);
    setShowForwardForm(false);
  };

  const handleForwardClick = () => {
    setShowAssignForm(false);
    setShowForwardForm(true);
  };

  const handleAssignFormSubmit = (selectedPerson,concern) => {
    // Handle assign form submission with selectedPerson
    dispatch(getConcernById(concern))
    console.log('Assigning to:', selectedPerson);
    setShowAssignForm(false);
  };

  const handleForwardFormSubmit = (selectedPerson) => {
    // Handle forward form submission with selectedPerson
    console.log('Forwarding to:', selectedPerson);
    setShowForwardForm(false);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-6 max-w-md mx-auto my-4">

      {
        currentConcern && currentConcern?.current_concern?.data ? (
            <>
      <h1 className="text-sm"> Category - <span className="font-bold text-xl"> {currentConcern.current_concern.data.concernCategory.categoryName}</span></h1>
      <h2 className="text-xl font-semibold mb-4"> <span className="text-sm">Title : </span> {currentConcern.current_concern.data.title} </h2>
      <p className="text-gray-600 mb-2">{currentConcern.current_concern.data.description}</p>
      <p className="text-sm text-blue-600 mb-4 font-bold right-3 italic"> {moment(currentConcern.current_concern.data.createdAt).format('ll')} </p>

      <div className="flex justify-between">
        <button
          onClick={ () => handleAssignClick(currentConcern.current_concern.data.uuid)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
        >
          Assign
        </button>
        <button
          onClick={handleForwardClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Forward
        </button>
      </div>
            </>
          
      )
      :
      <>
      <h2 className="text-xl font-semibold mb-4"> Title </h2>
      <p className="text-gray-600 mb-4"> No data found </p>
      </>
      }

      {showAssignForm && currentConcern.current_concern?.data?  (
        <AssignForm concern_id={currentConcern.current_concern.data.uuid} onSubmit={handleAssignFormSubmit} onCancel={() => setShowAssignForm(false)} />
      )
    :
    <>
    </>
    }
      {showForwardForm && currentConcern.current_concern?.data?  (
        <ForwardForm  concern_id={currentConcern.current_concern.data.uuid}  onSubmit={handleForwardFormSubmit} onCancel={() => setShowForwardForm(false)} />
      )
      :
      <></>
    }

    </div>
  );
};

export default Intermediate;
