import React from 'react'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { NavLink, Link} from 'react-router-dom'
import logo from '../../Assets/HeaderLogo.png'
import AddLocationIcon from '@mui/icons-material/AddLocation';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

import './Footer.css'

function Footer() {

    const year = new Date().getFullYear()
  return (
    <footer className='footer bg-dark pt-5 pb-5'>
      <Container>
        <Row gap-5 className='d-flex align-items-center justify-content-center'>
            <Col lg={4} className=''>
                <div>
                    <NavLink to='/'>
                    <img src={logo} alt="Header logo" className="header__logo" />
                    </NavLink>
                </div>
                <div>
                    <p className='small text-white p-1 pt-3 pe-5' >Welcome to Odor Easy Buy, your one-stop destination for all your grocery needs! We're here to make your shopping experience effortless and convenient. Browse our wide selection of product. Happy shopping!</p>
                </div>
            </Col>
            <Col lg={4}>
                <div className='quick__links'>
                    <h4 className="quick__link__title mt-4">Quick Links</h4>
                    <ListGroup as='ul' className='mb-3 '>
                        <ListGroupItem as='li' className='ps-0 border-0 d-flex align-center gap2'>
                            <Link to='/' className='text-decoration-none text-white '>Home</Link>
                        </ListGroupItem>
                        <ListGroupItem as='li' className='ps-0 border-0 d-flex align-center gap2'>
                            <Link to='/store'className='text-decoration-none text-white '>Store</Link>
                        </ListGroupItem>
                        <ListGroupItem as='li' className='ps-0 border-0'>
                            <Link to='/checkOut' className='text-decoration-none text-white '>Cart</Link>
                        </ListGroupItem>
                        <ListGroupItem as='li' className='ps-0 border-0'>
                            <Link className='text-decoration-none text-white ' to='/login' >Login</Link>
                        </ListGroupItem>
                    </ListGroup>
                </div>
            
            </Col>
            <Col lg={4}>
            <div className='quick__links'>
                    <h4 className="quick__link__title mt-4">contacts</h4>
                    <ListGroup as='ul' className='mb-3'>
                        <ListGroupItem as='li' className='ps-0 border-0 d-flex align-center gap-1'>
                            <span>
                                <AddLocationIcon />
                            </span>
                            <p>7 Udogwu Street Ogwuagor Abakpa Nike Enugu.</p>
                        </ListGroupItem>
                        <ListGroupItem as='li' className='ps-0 border-0 d-flex align-center gap-1'>
                            <span>
                                <PhoneIcon />
                            </span>
                            <p>08063288939</p>
                        </ListGroupItem>
                        <ListGroupItem as='li' className='ps-0 border-0 d-flex align-center gap-2'>
                            <span>
                                <EmailIcon />
                            </span>
                            <p>jerrynwadinobi@gmail.com</p>
                        </ListGroupItem>
                    </ListGroup>
                </div>
            </Col>
            <Col lg={12} className='pt-5'>
                <p className='small text-white text-center p-1'>Copyright {year} developed by Jerry Nwadinobi. All rights reserved</p>
            </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
