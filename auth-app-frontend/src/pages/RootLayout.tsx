import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'

function RootLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
  
}

export default RootLayout