import React, {PureComponent, useEffect, useState} from 'react';
import ChartContainer from './Chart';
import Footer from './sidebar/Footer';
import Concerns from "../utils/Concerns";
import {useDispatch, useSelector} from "react-redux";
import {dashboardSummary, getAllMinstries} from "../store/actions/ministry_actions";
import BarChart from "../utils/BarChart";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";



export default function DashboardContent() {

    const [reload, setReload] = useState(0);
    const dispatch =  useDispatch();

    const all_ministries = useSelector(state => state.ministries);
    // console.log(all_ministries.dashboard_data);

    useEffect(() => {
        if (all_ministries && all_ministries.dashboard_data && all_ministries.dashboard_data.length < 1 && reload <= 2) {
            dispatch(dashboardSummary());
            setReload(prevReload => prevReload + 1);
        }
    }, [dispatch, reload]);
    const rows = all_ministries?.dashboard_data?.content || [];


   return (
      // <div class="bg-gray-900 opacity-50 hidden fixed inset-0 z-10" id="sidebarBackdrop"></div>
      <div id="main-content" class="h-full w-full bg-gray-50 relative overflow-y-auto">
         <main>
            <div class="pt-6 px-4">

                <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>


                        <Grid item xs={12} md={7} lg={7}>
                            <Paper
                                sx={{
                                    p: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 420,
                                }}
                            >
                                <BarChart   />
                            </Paper>
                        </Grid>

                            <Grid item xs={12} md={5} lg={5}>
                                <Paper
                                    sx={{
                                        p: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 420,
                                    }}
                                >
                                    <ChartContainer   />
                                </Paper>
                            </Grid>

                    </Grid>
                </Container>

                {
                    all_ministries &&  all_ministries.dashboard_data && all_ministries.dashboard_data.data && (
                        <>
                            <div id="stats" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                                <div className="container mx-auto mt-8">
                                    <div
                                        className="bg-gradient-to-r from-blue-600 to-teal-600 px-4 py-2 rounded-lg shadow-lg">
                                        <div className="flex flex-row items-center">
                                            {/* <div class="flex items-center"> */}
                                            <div className="flex-shrink-0">
                                                <span
                                                    className="text-2xl sm:text-3xl leading-none font-bold text-white"> {all_ministries.dashboard_data.data.totalConcerns} </span>
                                                <h3 className="font-bold text-xl text-white">Concerns Received</h3>
                                            </div>
                                            <div
                                                className="ml-5 w-0 flex items-center justify-end flex-1 text-white text-lg font-bold">
                                                {((all_ministries.dashboard_data.data.totalConcerns/100) * 100)}%
                                                <svg className="w-5 h-5" fill="white" viewBox="0 0 20 20"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                          d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                                                          clip-rule="evenodd"></path>
                                                </svg>
                                                {/* </div> */}
                                            </div>
                                        </div>
                                        <div className="border-t border-white/5 p-4">
                                            <button
                                                className='bg-white py-0.5 font-bold rounded-md px-3 text-blue-600 shadow-lg'>View
                                                All
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="container mx-auto mt-8">
                                    <div
                                        className="bg-gradient-to-r from-blue-600 to-teal-600 px-4 py-2 rounded-lg shadow-lg">
                                        <div className="flex flex-row items-center">
                                            {/* <div class="flex items-center"> */}
                                            <div className="flex-shrink-0">
                                                <span
                                                    className="text-2xl sm:text-3xl leading-none font-bold text-white"> {all_ministries.dashboard_data.data.totalUsers} </span>
                                                <h3 className="font-bold text-xl text-white">Registered Users</h3>
                                            </div>
                                            <div
                                                className="ml-5 w-0 flex items-center justify-end flex-1 text-white text-lg font-bold">
                                                {((all_ministries.dashboard_data.data.totalUsers/100) * 100)}%
                                                <svg className="w-5 h-5" fill="white" viewBox="0 0 20 20"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                          d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                                                          clip-rule="evenodd"></path>
                                                </svg>
                                                {/* </div> */}
                                            </div>
                                        </div>
                                        <div className="border-t border-white/5 p-4">
                                            <button
                                                className='bg-white py-0.5 font-bold rounded-md px-3 text-blue-600 shadow-lg'>View
                                                All
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="container mx-auto mt-8">
                                    <div
                                        className="bg-gradient-to-r from-blue-600 to-teal-600 px-4 py-2 rounded-lg shadow-lg">
                                        <div className="flex flex-row items-center">
                                            {/* <div class="flex items-center"> */}
                                            <div className="flex-shrink-0">
                                                <span
                                                    className="text-2xl sm:text-3xl leading-none font-bold text-white"> {all_ministries.dashboard_data.data.concernByCategory.length} </span>
                                                <h3 className="text-xl font-bold text-white">Popular categories</h3>
                                            </div>
                                            <div
                                                className="ml-5 w-0 flex items-center justify-end flex-1 text-white text-lg font-bold">
                                                {((all_ministries.dashboard_data.data.concernByCategory.length/100) * 100)}%
                                                <svg className="w-5 h-5" fill="white" viewBox="0 0 20 20"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                          d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                                                          clip-rule="evenodd"></path>
                                                </svg>
                                                {/* </div> */}
                                            </div>
                                        </div>
                                        <div className="border-t border-white/5 p-4">
                                            <button
                                                className='bg-white py-0.5 font-bold rounded-md px-3 text-blue-600 shadow-lg'>View
                                                All
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </>
                    )
                }


                <div class="grid grid-cols-1 2xl:grid-cols-2 xl:gap-4 my-4">


                </div>


            </div>
         </main>

          {/* <p class="text-center text-sm text-gray-500 my-10">
          &copy; 2019-2021 <a href="#" class="hover:underline" target="_blank">Themesberg</a>. All rights reserved.
       </p> */}
          {/* <Footer /> */}
      </div>

   )
}