import React from 'react'
import ProductCard from './ProductCard'
import { Row } from 'react-bootstrap'

function ProductList({data}) {
  return (
    <>
      <Row className='gap-3'>
      {
        data.map((item, index) => (
            <ProductCard item={item} key={index}/>
        ))
      }
      </Row>
    </>
  )
}

export default ProductList
