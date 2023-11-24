import React, { useEffect, useState } from 'react'
import { SideBar } from './SideBar'
import SideNav from './sidebar/SideNav'
import NavBar from './sidebar/NavBar'
import DashboardContent from './DashboardContent'
import AuthUser from '../context/authUser'
import DashboardContent2 from './DashboardContent2'


export default function Dashboard() {

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

  console.log(userRole);


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
          </div>
            </div>
          </div> 
          
      </>
  )
}
