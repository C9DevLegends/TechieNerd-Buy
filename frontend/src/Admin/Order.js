import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import '../Pages/Cart/Checkout.css'
import useGetData from '../Custom-hooks/useGetData'
import { db } from '../firebase.config'
import { doc, deleteDoc } from 'firebase/firestore'

const Order = () => {

    const {data:productsData, loading} = useGetData('checkout')
    
    const deleteProduct = async(id)=> {
        await deleteDoc(doc(db, 'checkout', id))
    }
  return (
    <section className='p-5 bg-light'>
      <Container>
        <Row>
            <Col lg='12 table-responsive' >
                <table className='table bordered table-hovers table-striped'>
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Names</th>
                            <th>Items</th>
                            <th>Total Amount</th>
                            <th>Total Quantity</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? <h4 className='p-4'>Loading....</h4> : (
                                
                                    productsData.map((item, index) => (
                                    <tr key={item.id}>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.cartItems.productName}</td>
                                        <td>#{item.totalAmount}</td>
                                        <td>{item.totalQuantity}</td>
                                        <td><Button onClick={()=>{deleteProduct(item.id)}} variant="danger">Delete</Button></td>
                                    </tr>
                                    ))
                                
                            )
                        }
                    </tbody>
                </table>
            </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Order
