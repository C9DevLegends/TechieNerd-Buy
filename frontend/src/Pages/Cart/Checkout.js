import React, {useState} from 'react'
import Helmet from '../../Components/Helmet'
import PageShowcase from '../../Components/Hero/PageShwocase'
import { Button, Col, Container, Form, FormGroup, Row } from 'react-bootstrap'
import './Checkout.css'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { db} from '../../firebase.config'
import { collection, addDoc } from 'firebase/firestore'

function Checkout() {
    let totalQuantity = useSelector((state) => state.cart.totalQuantity)
    const totalAmount = useSelector((state) => state.cart.totalAmount)
    const cartItems = useSelector((state) => state.cart.cartItems)

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [address, setAddress] = useState('')

    const addChecout = async(e) => {
        e.preventDefault()

        try {
            const checkRef = collection(db, 'checkout')

            await addDoc(checkRef, {
                totalAmount,
                totalQuantity,
                cartItems,
                name,
                email,
                number,
                address
            })
            
            toast.success('Order received')
        }catch(error){
            toast.error('something went wrong')
        }
    }

  return (
    <Helmet title='Checkout'>
        <PageShowcase  title='Checkout'/>
        <section>
            <Container>
                <Row className='p-4'>
                    <Col lg={8} className='p-4'>
                        <h5 className='mb-4 fw-bold'>Billing Information</h5>
                        <Form className='billing-form w-100'>
                            <Form.Group className='form-group mb-2'>
                                <input className='p-2 rounded w-100' type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Your Name' required/>
                            </Form.Group>
                            <Form.Group className='form-group mb-2'>
                                <input className='p-2 rounded w-100' type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' required/>
                            </Form.Group>
                            <FormGroup className='form-group mb-2'>
                                <input className='p-2 rounded w-100' type="text"
                                value={number} onChange={(e) => setNumber(e.target.value)} placeholder='Enter Your Phone Number' required />
                            </FormGroup>
                            <FormGroup className='form-group'>
                                <input className='p-2 rounded w-100' type="text"
                                value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Enter Your Address' required/>
                            </FormGroup>
                        
                            
                        </Form>
                    </Col>
                    <Col lg={4}>
                        <div className=' bill__checkout w-100 bg-dark text-light p-4 rounded mb-5'>
                            <h6>Total Qty: <span>{totalQuantity}</span></h6>
                            <h6>Total Amount: <span>#{totalAmount}</span></h6>
                            <h6>Delivery:</h6>
                            <h6><span>In Store Pick-Up</span></h6>
                            <h4>Total Cost: <span>#{totalAmount}</span></h4>
                            <div className='d-grid g-3'>
                            <Button className='w-100 bg-light text-dark' onClick={addChecout}>Place Your Order</Button>
                            </div>
                        </div>
                        
                    </Col>
                </Row>
            </Container>
        </section>
      
    </Helmet>
  )
}

export default Checkout
