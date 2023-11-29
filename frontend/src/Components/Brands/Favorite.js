
import React from 'react'
import { Row, Container, Col} from 'react-bootstrap'
import './Brands.css'
import {motion} from 'framer-motion'

function Favorite({header, data}) {
  return (
    <Container className=' fav__container mt-3 rounded'>

      <Row className='fav__header rounded'>
        <Col xs={12} className='  text-sm-center text-start display-6'>
          {header}
        </Col>

      </Row>
      
      <Row className='gap-3 justify-content-around p-4'>

        {
          data.map((fav, index) => (
            <Col xs={5} lg key={index}  className='fav__card  d-flex flex-column-reverse align-items-center  rounded'>
  
              <div>
                <h3 className=''>
                  {fav.productName} 
                </h3>
              </div>
      
              <div>
                <motion.img whileHover={{scale:1.2}} className='brand-image w-100 rounded'  src={fav.imgUrl} alt='brand'/>
              </div>
            </Col>

          ))
        }
      </Row>

    </Container>
  )
}

export default Favorite
