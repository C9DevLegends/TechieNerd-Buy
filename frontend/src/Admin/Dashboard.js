import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './Admin.css'

import useGetData from '../Custom-hooks/useGetData'

const Dashboard = () => {

  const {data: Products} = useGetData('products')
  const {data: users} = useGetData('users')
  const {data: checkout} = useGetData('checkout')
  return (
    <section className='p-5 bg-light'>
      <Container>
        <Row>
          <Col className='lg-3'>
            <div className="revenue__box">
              <h5>Total Sales</h5>
              <span>#{checkout.reduce((n, {totalAmount}) => n + totalAmount, 0)}</span>
            </div>
          </Col>
          <Col className='lg-3'>
          <div className="order__box">
              <h5>Orders</h5>
              <span>{checkout.length}</span>
            </div>
          </Col>
          <Col className='lg-3'>
          <div className="product__box">
              <h5>Total Products</h5>
              <span>{Products.length}</span>
            </div>
          </Col>
          <Col className='lg-3'>
          <div className="user__box">
              <h5>Total Users</h5>
              <span>{users.length}</span>
            </div>
          </Col>
        
        </Row>
      </Container>
    </section>
  )
}

export default Dashboard


