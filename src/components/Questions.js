import React, { useEffect, useState } from 'react'
import SideNav from './sidebar/SideNav'
import NavBar from './sidebar/NavBar'
import *  as AiIcons from 'react-icons/ai';
import * as CiIcons from "react-icons/ci";
import * as IoIcons from 'react-icons/io';
import { FaReadme } from "react-icons/fa6";
import Modal from 'react-modal';
import * as MdIcons from 'react-icons/md'


import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Avatar
  } from "@material-tailwind/react";
import QuestionDetail from './QuestionDetail';
import { useDispatch, useSelector } from 'react-redux';
import { getConcernById, getMyConcerns } from '../store/actions/concern_actions';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import AuthUser from '../context/authUser';
import Intermediate from './Intermediate';
import { getAllStaffs } from '../store/actions/users_actions';
import Footer from './sidebar/Footer';


  function StarIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5 text-yellow-700"
      >
        <path
          fillRule="evenodd"
          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
          clipRule="evenodd"
        />
      </svg>
    );
  }

export default function Questions() {

    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const navigate =  useNavigate();
 
    const handleOpen = (id) =>{
      // setOpen(!open);
      dispatch(getConcernById(id))
      setTimeout(() => {
        dispatch(getAllStaffs());
      }, 1000);
      navigate("/forum");
    } 
      
    const concerns =  useSelector(state => state.concerns);

    // console.log(concerns.my_concerns.content);

    const { token } = AuthUser();
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      // Use the token from useAuthUser
      const { userType } = token;
      setUserRole(userType);
    };

    fetchData();
  }, [token]);

  // console.log(userRole);


  const [modalIsOpen, setModalIsOpen] = useState(false);

const openModal = (id) => {
  dispatch(getConcernById(id))
  dispatch(getAllStaffs())
  setTimeout(() => {
    setModalIsOpen(true);
  }, 2000);
};

const closeModal = () => {
  setModalIsOpen(false);
};

  return (
    <div>
          <div>
              <div className="flex w-full"> 
          <SideNav />
          
          
          <div  className="w-full bg-slate-200">
             <NavBar />
              <div className="pl-4">
                {/* <DashboardContent /> */}
<div class="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
<div class=" flex items-center justify-between pb-4 pt-1">
      <div class="flex items-center">
                        <button onClick={ () => dispatch(getMyConcerns())} class="rounded-full focus:outline-none focus:ring-2  focus:bg-sky-500 focus:ring-indigo-800">
                            <div class="py-2 px-8 bg-sky-600 text-indigo-100 rounded-full">
                                <p>All</p>
                            </div>
                        </button>
                        <button class="rounded-full focus:outline-none focus:ring-2 focus:bg-sky-500 focus:ring-indigo-800 ml-4 sm:ml-8">
                            <div class="py-2 px-8 text-gray-600 hover:text-indigo-100 hover:bg-sky-600 rounded-full ">
                                <p>Done</p>
                            </div>
                        </button>
                        <button class="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8">
                            <div class="py-2 px-8 text-gray-600 hover:text-indigo-100 hover:bg-sky-600 rounded-full ">
                                <p>Pending</p>
                            </div>
                        </button>
                    </div>
		<div class="flex items-center justify-between">
			<div class="flex bg-gray-50 items-center p-2 rounded-md">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
					fill="currentColor">
					<path fill-rule="evenodd"
						d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
						clip-rule="evenodd" />
				</svg>
				<input class="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..." />
          </div>
				{/* <div class="lg:ml-40 ml-10 space-x-8">
					<button class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">New Report</button>
					<button class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Create</button>
				</div> */}
			</div>
		</div>
  <table class="w-full border-collapse bg-white text-left text-sm text-gray-500">
    <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Name</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Category</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Sent To</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Status</th>
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Submitted</th>
        {/* <th scope="col" class="px-6 py-4 font-medium text-gray-900">Expected</th> */}
        <th scope="col" class="px-6 py-4 font-medium text-gray-900">Actions</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-100 border-t border-gray-100 font-bold">

        {
          concerns && concerns.my_concerns &&(
            concerns && concerns.my_concerns && concerns.my_concerns.empty === false ? (
              concerns.my_concerns.content.map((item,index) => (
               
    <tr  key={index} class="hover:bg-gray-50 font-bold">
      <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
      
        <div class="text-sm">
          <div class="font-medium text-gray-700">{item.reportedBy?.fullName}</div>
          <div class="text-gray-400"> {item.reportedBy?.username} </div>
        </div>
      </th>
     
      <td class="px-6 py-4">
      <span
          class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
        >
         {item.concernCategory?.categoryName}
        </span>
          </td>
      <td class="px-6 py-4">
        <div class="flex gap-2">
          <span
            class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
          >
            {item.submittedTo.fullName}
          </span>
        </div>
      </td>
      <td className='font-bold'>Pending</td>
      <td>
          {moment(item.createdAt).format("ll")}
      </td>
      <td class="px-6 py-4">
          {
            userRole ===  "CITIZEN"?(
              <>
              <a x-data="{ tooltip: 'Edite' }" href="#">
             <span onClick={()  =>  handleOpen(item.uuid)} className='text-xl block float-left pr-1 text-blue-500'>
                  <FaReadme className='text-green-700 font-bold' />
                </span>
          </a></>
            )
            :

            userRole === "SECRETARY"? (
              <>
                 <a x-data="{ tooltip: 'Edite' }" href="#">
                <span onClick={()  =>  handleOpen(item.uuid)} className='text-xl block float-left pr-1 text-blue-500'>
                  <FaReadme className='text-green-700 font-bold' />
                </span>
                </a>
              </>
            )
            :
            <>
        <div class="flex justify-end gap-4">
          <a x-data="{ tooltip: 'Delete' }" href="#">
          <span onClick={() => openModal(item.uuid)}  className='text-xl block float-left pr-1 text-blue-500'>
                  <IoIcons.IoMdSend className='text-blue-500 -rotate-45' />
                </span>
          </a>
          <a x-data="{ tooltip: 'Edite' }" href="#">
             <span onClick={()  =>  handleOpen(item.uuid)} className='text-xl block float-left pr-1 text-blue-500'>
                  <FaReadme className='text-green-700 font-bold' />
                </span>
          </a>
        </div>
            </>
          }
      </td>
    </tr>
                
              ))
            )
            :
            <>
         
      <tr class="hover:bg-gray-50">
        <th class="flex gap-3 px-6 py-4 font-normal text-gray-900">
        
          <div class="text-sm">
            {/* <div class="font-medium text-gray-700">Steven Jobs</div>
            <div class="text-gray-400">jobs@sailboatui.com</div> */}
          </div>
        </th>
        <td class="px-6 py-4">
          <span
            class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
          >
            {/* +255744899032 */}
          </span>
        </td>
        <td class="px-6 py-4 text-red-400 font-medium text-xl">No data found</td>
        <td class="px-6 py-4">
          <div class="flex gap-2">
            <span
              class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
            >
              {/* Mpwapwa */}
            </span>
            
          </div>
        </td>

        <td>
            {/* 17-11-2023 */}
        </td>
        <td class="px-6 py-4">
          <div class="flex justify-end gap-4">
            <a x-data="{ tooltip: 'Edite' }" href="#">
               <span onClick={handleOpen} className='text-xl block float-left pr-1 text-blue-500'>
                    {/* <CiIcons.CiRead className='text-blue-500' /> */}
                  </span>
            </a>
          </div>
        </td>
      </tr>
            </>
          )
        }
       
      
     
    </tbody>
  </table>

  <div
						class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
						<span class="text-xs xs:text-sm text-gray-900">
                            Showing 1 to 6 of 50 Entries
                        </span>
						<div class="inline-flex mt-2 xs:mt-0">
							<button
                                class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                Prev
                            </button>
							&nbsp; &nbsp;
							<button
                                class="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                                Next
                            </button>
						</div>
					</div>

</div>

<div className="w-6/12 mx-auto">
     <Dialog open={open} handler={handleOpen} className='w-7/12 mx-auto bg-white p-4'>
        <QuestionDetail  />

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Link to="/forum"  variant="gradient" className='bg-blue-500 rounded-md py-2 px-4 text-white font-medium' color="green" onClick={handleOpen}>
            <span>Answer</span>
          </Link >
        </DialogFooter>
      </Dialog>
      </div>

      <div className="">
      <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
            >
              <Intermediate />
              {/* <SignUp /> */}
              <div className="absolute top-6 right-6 bg-red-500 rounded-full">
                <span   onClick={closeModal} className=" text-white text-3xl font-bold cursor-pointer">
                  <MdIcons.MdOutlineCancel  />
                </span>
              </div>
            </Modal>
      </div>

    </div>
         <Footer  />
              </div>
          </div>
            </div>
    </div>
  )
}
