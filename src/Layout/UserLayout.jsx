import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Pages/UserLayout/Header'
import UserEvent from '../Pages/UserLayout/Event'
const UserLayout = () => {
  return (
    <>
      <Header />
     
      <Outlet />
    </>
  )
}

export default UserLayout
