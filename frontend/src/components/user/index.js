import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar_1 from './Navbar_1'

const User = () => {
  return (
    <div>
       <Navbar_1/>
        <Outlet />
    </div>
  )
}

export default User