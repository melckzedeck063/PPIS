import React, { useEffect, useState } from 'react'
import { SideBar } from './SideBar'
import SideNav from './sidebar/SideNav'
import NavBar from './sidebar/NavBar'
import DashboardContent from './DashboardContent'
import AuthUser from '../context/authUser'
import DashboardContent2 from './DashboardContent2'
import Footer from './sidebar/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCAtegories } from '../store/actions/concern_actions'


export default function Dashboard() {

  const { token } = AuthUser();
  const [userRole, setUserRole] = useState(null); 
  const [reload,setReload] =  useState(0);
  const dispatch =  useDispatch();

  const categories  =  useSelector(state =>  state.concerns);
  // console.log(categories.all_categories);
  useEffect(() => {
    const fetchData = async () => {
      // Use the token from useAuthUser
      const { userType } = token;
      setUserRole(userType);
    };

    fetchData();
  }, [token]);

  setTimeout(() => {
    if(reload < 5){
      setReload(reload  => reload + 1);
    }
  }, 1000);

  useEffect(() => {
     if(categories && categories.all_categories.length < 1 && reload < 4){
      dispatch( getAllCAtegories() );

     }
  })
  




  return (
   
    <>
          <div>
              <div className="flex w-full"> 
          <SideNav />
          
          
          <div  className="w-full bg-slate-200">
             <NavBar />
              <div className="pl-4">
                {
                  userRole ===  "CITIZEN" ? (
                    <>
                    <DashboardContent2 />
                    </>
                  )
                  :
                  <>
                <DashboardContent />
                  </>
                }
              </div>
              <Footer   />
          </div>
            </div>
          </div> 
          
      </>
  )
}
