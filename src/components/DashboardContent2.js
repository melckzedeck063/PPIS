import React from 'react'

import * as  FaIcons from 'react-icons/fa';
import * as CiIcons from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getConcernById } from '../store/actions/concern_actions';

export default function DashboardContent2() {

    const dispatch = useDispatch();
    const navigate =  useNavigate();

    const categories  =  useSelector(state =>  state.concerns);
//   console.log(categories.all_categories.dataList);
    

    const handleOpen = (id) =>{
        // setOpen(!open);
        dispatch(getConcernById(id))
        navigate("/forum");
      } 

  return (
    <div>
           <div id="content" class="bg-white/10 col-span-9 rounded-lg p-6">
            <div id="24h">
                <h1 class="font-bold py-4 uppercase">Last 24h Statistics</h1>
                <div id="stats" class="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <div class="container mx-auto mt-8">
  <div class="bg-gradient-to-r from-blue-500 to-green-500 p-8 rounded-lg shadow-lg">
                        <div class="flex flex-row space-x-4 items-center">
                            <div id="stats-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                  </svg>
                            </div>
                            <div>
                                <p class="text-white text-lg font-bold uppercase leading-4">Concerns</p>
                                <p class="text-white font-bold text-2xl inline-flex items-center space-x-2">
                                    <span>+ ....</span>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                          </svg>
                                          
                                    </span>
                                </p>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div class="container mx-auto mt-8">
  <div class="bg-gradient-to-r from-blue-500 to-green-500 p-8 rounded-lg shadow-lg">
                        <div class="flex flex-row space-x-4 items-center">
                            <div id="stats-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  
                            </div>
                            <div>
                                <p class="text-white text-lg font-bold uppercase leading-4">Categories</p>
                                <p class="text-white font-bold text-3xl inline-flex items-center space-x-2">
                                    {
                                        categories &&  categories.all_categories?(
                                            <span>
                                                { categories?.all_categories?.dataList?.length } items
                                            </span>
                                    )
                                :
                                <>
                                    <span> --- </span>
                                </>
                                }
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                          </svg>
                                          
                                    </span>
                                </p>
                            </div>
                        </div>
                        </div>
                    </div>

                    {/* <div class="container mx-auto mt-8">
  <div class="bg-gradient-to-r from-blue-500 to-green-500 p-8 rounded-lg shadow-lg">
                        <div class="flex flex-row space-x-4 items-center">
                            <div id="stats-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-white">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                  </svg>
                                  
                            </div>
                            <div>
                                <p class="text-white text-lg font-bold uppercase leading-4">Reports</p>
                                <p class="text-white font-bold text-2xl inline-flex items-center space-x-2">
                                    <span>+ ....</span>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                                          </svg>
                                          
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div> */}
                </div>
            </div>

            <div id="last-incomes">
                <h1 class="font-bold py-4 uppercase">Popular Topics / Categories</h1>
                <div id="stats" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                    {
                        categories &&  categories.all_categories?(
                            categories?.all_categories?.dataList?.map((item,index) =>(
                                <div key={index}>
                                                 <div class="container mx-auto mt-8">
  <div class="bg-gradient-to-r from-blue-500 to-green-500 p-8 rounded-lg shadow-lg">
  <div class="flex flex-row items-center">
                            {/* <div class="flex items-center"> */}
                        <div class="flex-shrink-0">
                           <span class="text-2xl sm:text-3xl leading-none font-bold text-white">0.00 </span>
                           <h3 class="font-bold text-xl text-white"> {item.categoryName} </h3>
                        </div>
                        <div class="ml-5 w-0 flex items-center justify-end flex-1 text-white text-lg font-bold">
                           0.00%
                           <svg class="w-5 h-5" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                           </svg>
                        {/* </div> */}
                     </div>
                            </div>
                            <div class="border-t border-white/5 p-4">
                                <button className='bg-white py-0.5 font-bold rounded-md px-3 text-blue-600 shadow-lg'>View All</button>
                            </div>
                            </div>
                    </div>
                                </div>
                            ))
                        )
                        :
                        <>
                        </>
                    }
               

                </div>
            </div>

           
        </div>
    </div>
  )
}
