import React, { useRef } from 'react'
import {Navbar, Container, Nav} from "react-bootstrap"
import logo from "../../Assets/HeaderLogo.png";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import PersonIcon from '@mui/icons-material/Person';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAuth from '../../Custom-hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { toast } from 'react-toastify'
import "./Header.css"




function Header() {

  const {currentUser} = useAuth()
  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  const profileRef = useRef(null);
  
  const logout = ()=>{
    signOut(auth).then(()=>{
      toast.success('Logged out')
    }).catch((err)=>{
      toast.error(err.message)
    })
  }
  const toggleProfile = () => {
    const profileElement = profileRef.current;

    if (profileElement) {
      profileElement.classList.toggle('show__profileAction');
    }
  };
  return (

   <Navbar bg='dark' expand='md' variant='dark' sticky="top" >
    <Container fluid="sm">
      <NavLink to='/' className=''>
        <img src={logo} alt="Header logo" className="header__logo w-75" />
      </NavLink>
      
      <Nav variant='dark' className=' me-auto flex-row  d-flex fl justify-content-center flex-nowrap'>
        <NavLink to='/' className='nav-link p-2'>
          <span className='optionTwo'>Home</span>
        </NavLink>
        <NavLink to='/store' className='nav-link p-2'>
          <span className='optionTwo'>Store</span>
        </NavLink>
        <NavLink to='/cart' className='nav-link p-2'>
          <span className='optionTwo'>Cart</span>
        </NavLink>
      </Nav>
    
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
          <Navbar.Text className='ms-auto'>
          <Nav variant='dark'>
            <NavLink to='/cart'className='nav-link p-2'>
                <span>
                  <ShoppingCartCheckoutIcon className='cart__logo' />
                </span>
                <span>{totalQuantity}</span>
            </NavLink>
            <div className='profile p-2'>
              <div onClick={toggleProfile}>
                {currentUser ? <img src={currentUser && currentUser.photoURL} alt='' className='profile__logo ms-2' /> : <span className='person__logo'><PersonIcon /></span> }
             </div>
              <div className="profile__actions" ref={profileRef} onClick={toggleProfile}>
                {
                  currentUser ? 
                  (<div className='text-dark text-decoration-none' onClick={logout}>Logout</div>) : 
                  (<div>
                    <Link to='/signup' className='text-dark text-decoration-none' >Signup</Link>
                    <Link to='/login' className='text-dark text-decoration-none'>Login</Link>
                  </div>)
                }
              </div>
            </div>
            
          </Nav>
          </Navbar.Text>
        </Navbar.Collapse>
    </Container>
   </Navbar>
  )
}

export default Header

