import React, { useRef } from 'react'
import {Row, Container} from "react-bootstrap"
import PersonIcon from '@mui/icons-material/Person';
import { Link, NavLink} from 'react-router-dom';
import useAuth from '../Custom-hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify'
import "./Admin.css"

const admin__nav = [
    {
        display: 'Dashboard',
        path: '/dashboard'
    },
    {
        display: 'Products',
        path: '/dashboard/all-product'
    },
    {
        display: 'Orders',
        path: '/dashboard/orders'
    },
    {
        display: 'Users',
        path: '/dashboard/users'
    },
]

const AdminNav = () => {

    const {currentUser} = useAuth()
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
    <>
        <header sticky="top" className='bg-dark text-light'>
            <Container fluid="sm">
                <div className='nav d-flex justify-content-between align-items-center pt-3 pb-3'>
                    <div>
                        <NavLink to='/' className='text-light text-decoration-none'>
                            <h3 className=' text-decoration-none'>Odor Store</h3>
                        </NavLink>
                    </div>

                    <div className='profile'>
                        <div onClick={toggleProfile}>
                            {currentUser ? <img src={currentUser && currentUser.photoURL} alt='' className='profile__logo ms-2' /> : <span className='person__logo'><PersonIcon /></span> }
                        </div>
                        <div className="profile__actions" ref={profileRef} onClick=         {toggleProfile}>
                            {
                                currentUser ? 
                                (<div className='text-dark text-decoration-none' onClick={logout}>Logout</div>) : 
                                (<div>
                                <Link to='/signup' className='text-dark text-decoration-none' >Signup</Link>
                                <Link to='/login' className='text-dark text-decoration-none'>Login</Link>
                                <Link to='/dashboard' className='text-dark text-decoration-none'>Dashboard</Link>
                                </div>)
                            }
                        </div>
                    </div>
                </div>
            </Container>
        </header>

        <section className="admin__menu">
            <Container>
                <Row>
                    <div className="admin__navigation ">
                        <ul className="admin__menu__list list-unstyled d-flex align-items-center justify-content-center gap-md-4 gap-2">
                            {
                                admin__nav.map((item, index)=> (
                                    <li className="admin__menu__item" key={index}>
                                        <NavLink to={item.path} className={navClass=> navClass.isActive ? 'active__admin-menu text-decoration-none text-dark' : 'text-decoration-none text-dark'}>{item.display}</NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default AdminNav
