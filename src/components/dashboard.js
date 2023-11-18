import React from 'react'
import { SideBar } from './SideBar'
import SideNav from './sidebar/SideNav'
import NavBar from './sidebar/NavBar'
import DashboardContent from './DashboardContent'


export default function Dashboard() {
  return (
   
    <>
          <div>
              <div className="flex w-full"> 
          <SideNav />
          
          
          <div  className="w-full bg-slate-200">
             <NavBar />
              <div className="pl-4">
                <DashboardContent />
              </div>
          </div>
            </div>
          </div> 
          
      </>
  )
}
