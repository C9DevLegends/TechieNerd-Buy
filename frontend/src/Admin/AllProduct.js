import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import '../Pages/Cart/Checkout.css'
import useGetData from '../Custom-hooks/useGetData'
import { db } from '../firebase.config'
import { doc, deleteDoc } from 'firebase/firestore'
import { NavLink } from 'react-router-dom'

const AllProduct = () => {

    const {data:productsData, loading} = useGetData('products')
    
    const deleteProduct = async(id)=> {
        await deleteDoc(doc(db, 'products', id))
    }
  return (
    <section className='p-5 bg-light'>
      <Container>
        <Row>
            <Col lg='12 table-responsive' >
                <table className='table bordered table-hovers table-striped'>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? <h4 className='p-4'>Loading....</h4> : (
                                
                                    productsData.map(item => (
                                    <tr key={item.id}>
                                        <td><img src={item.imgUrl} alt="" /></td>
                                        <td>{item.title}</td>
                                        <td>{item.category}</td>
                                        <td>#{item.price}</td>
                                        <td><Button onClick={()=>{deleteProduct(item.id)}} variant="danger">Delete</Button></td>
                                    </tr>
                                    ))
                                
                            )
                        }
                    </tbody>
                </table>
            </Col>
            <Col lg-12 className='text-center'>
                <NavLink to='/dashboard/add-product' className='text-primary fs-5 fw-bold  text-decoration-none' >Add Product</NavLink>
            </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AllProduct
