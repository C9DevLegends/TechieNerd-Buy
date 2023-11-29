import React from 'react'
import { Container, Row, Col, Button, } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion"

function Grocery({data}) {
  return (

    <Container  className='grocery bg-light mt-3 p-sm-2 p-md-4 rounded'>

        <Row>
            <Col xs={12} className='text-sm-center text-start display-6'>Groceries</Col>
        </Row>
        <Row  className='mt-3 p-2 rounded'>
          
            {
                data.map((item, index) => (
                    <Col key={index}  xs={4} md={2} className='d-flex flex-column justify-content-center align-items-center'>
                        <motion.img whileHover={{scale:1.3}} className='product__image' src={item.imgUrl} alt="" />
                        <p>{item.productName}</p>
                    </Col>
                ))
            } 

            <Col>
                <Link to='/store' className='text-decoration-none'>
                    <div className="d-grid gap-2">
                        <Button size='lg' className='mt-3 mb-3'>
                        Shop Now
                        </Button>
                    </div>
                </Link>
            </Col>
    
        </Row> 
    </Container>
  )
}

export default Grocery
