import React from 'react'
import Header from '../Components/Header/Header'
import Routers from '../Routers/Routers'
import './Layout.css'
import Footer from '../Components/Footer/Footer'
import AdminNav from '../Admin/AdminNav'
import { useLocation } from 'react-router-dom'

function Layout() {

  const location = useLocation();

  return (
    <>

      {
        location.pathname.startsWith('/dashboard') ? <AdminNav /> :  <Header />
      }
      <div className='layout'>
        <Routers />
      </div>
      <Footer />
    </>
  )
}

export default Layout
