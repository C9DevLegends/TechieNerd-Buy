import React from 'react'
import {motion  } from 'framer-motion'
import { Col, Container, Row, Badge } from 'react-bootstrap'
import './Brands.css'

function TopBrands({header, data}) {
  return (


    <Container className='bg-light rounded'>

      <Row>
        <Col xs={12} className='brand__header text-sm-center text-start display-6 rounded'>
          {header}
        </Col>

      </Row>
      
      <Row className='gap-3 p-3' >

        {
          data.map((brands, index) => (
            <Col md key={index}  className=' card__brand d-flex flex-column-reverse flex-lg-row justify-content-between align-items-center  p-5 rounded'>
    
              <div>
                <h1 className=' card-text me-4'>{brands.productName}</h1>
                <p className='card-text'>{brands.description}</p>
                <h2><Badge bg="light" text='success'>{brands.badge}</Badge></h2>
              </div>
      
              <div className=''>
                <motion.img whileHover={{scale:1.3}} className='brand-image w-100 rounded'  src={brands.imgUrl} alt='brand'/>
              </div>
            </Col>

          ))
        }
      </Row>

    </Container>
        
  )
}

export default TopBrands
