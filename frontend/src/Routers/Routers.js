import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login'
import Cart from '../Pages/Cart/Cart'
import ProductCard from '../Components/Products/ProductCard'
import Store from '../Pages/Store/Store'
import Checkout from '../Pages/Cart/Checkout'
import SignUp from '../Pages/SignUp'
import RotectedRoute from './RotectedRoute'

import AddProduct from '../Admin/AddProduct'
import AllProduct from '../Admin/AllProduct'
import Dashboard from '../Admin/Dashboard'
import Users  from '../Admin/Users'
import Order  from '../Admin/Order'


function Routers() {
  return (
    <Routes>
      
      <Route path='store' element={<Store />}/>
      <Route path='products/:id' element={<ProductCard />}/>
      <Route path='cart' element={<Cart />}/>
      <Route path='login' element={<Login />}/>
      <Route path='signup' element={<SignUp />}/>
      <Route path='/*' element={<RotectedRoute />}>
        <Route path='checkout' element={<Checkout />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='dashboard/all-product' element={<AllProduct />} />
        <Route path='dashboard/add-product' element={<AddProduct />} />
        <Route path='dashboard/users' element={<Users />} />
        <Route path='dashboard/orders' element={<Order />} />
      </Route>
      <Route path='/' element={<Home />}/>
    </Routes>
  )
}

export default Routers
