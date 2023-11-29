import React from 'react'
import './Checkout.css'
import Helmet from '../../Components/Helmet'
import { Container, Col, Row, Button } from 'react-bootstrap'
import DeleteIcon from '@mui/icons-material/Delete';
import { cartAction } from '../../reduce/slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import PageShowcase from '../../Components/Hero/PageShwocase';

function Cart() {

  const cartItems = useSelector((state) => state.cart.cartItems)
  const totalAmount = useSelector((state) => state.cart.totalAmount)

  return (

    <Helmet titil='Cart'>
      <PageShowcase title='Cart Items' />
      <Container fluid className='bg-light pt-4  pt-lg-5 pb-5'>
      <section >
        <Container>
          <Row>
            <Col lg={9}>
              {
                cartItems.length === 0 ? (
                <h2>No item added to the cart</h2>
                ) :
                (
                  <table className='table bordered'>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                  <tbody>
                    {
                      cartItems.map((item, index) => (
                        <Tr item={item} key={index}/>
                      ))
                    }
                  </tbody>
                </table>
                )
              }
              
            </Col>
            <Col lg={3}>
              <div>
                <h6 className='d-flex align-items-center justify-content-between'>Subtotal</h6>
                <span className='fs-4 fw-bold'>#{totalAmount}</span>
              </div>
              <p>In store pick-up</p>
              <div className='d-grid gap-3 mt-5'>
               
                <Button variant='primary' size='lg' className="buy__btn "><Link to='/checkout' className='text-decoration-none text-white'>Checkout</Link></Button>
                <Button variant='primary' size='lg' className="buy__btn">
                  <Link to='/store' className='text-decoration-none text-white'>Continue Shopping</Link>
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      </Container>
    </Helmet>
    
  )
}

const Tr = ({item})=> {

  const dispatch = useDispatch()

  const deleteProduct = ()=>{
    dispatch(cartAction.deleteItem(item.id))
  }
  return  <tr>
  <td><img src={item.imgUrl} alt="" /></td>
  <td>{item.productName}</td>
  <td># {item.price}</td>
  <td>{item.quantity}</td>
 <td onClick={deleteProduct} className='delete'><DeleteIcon /></td>
</tr>
}

export default Cart
