import {Outlet} from 'react-router-dom';
import SideBar from './sideBar';
import Header from './Header';
import { useState } from 'react';


export default function DashboardLayout() {
    const [mobileNavOpen,setMobileNavOpen] =useState(false);


  return (
    <div className='flex h-screen overflow-hidded bg-body font-Inter'>
      
      {/*DESKTOP SIDEBAR */}
      <SideBar/>

      {/**MOBILE SCREEN NAVBAR */}
      {mobileNavOpen && (
        <div>
            <div className='fixed inset-0 z-40-40 lg:hidden' onClick={()=>setMobileNavOpen(false)}/>
            <div className='absolute inset-y-0 left-0 w-64'><SideBar/></div>
        </div>
      )}

      <div className='flex-1 flex flex-col overflow-hidden'>
        <Header onOpenMobileNav={()=>setMobileNavOpen(true)}/>

        <main className='flex-1 overflow-y-auto p-6'>
            <Outlet/>
        </main>

      </div>
    </div>
  )
}
