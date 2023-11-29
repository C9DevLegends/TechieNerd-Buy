import React from 'react'
import { motion } from "framer-motion"
import { Col} from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import "./Products.css"
import {  toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { cartAction } from '../../reduce/slices/cartSlice';

function ProductCard({item}) {
  const dispatch = useDispatch()
  const addToCart = ()=> {

    dispatch(cartAction.addItem({
      id: item.id,
      productName: item.productName,
      price: item.price,
      imgUrl: item.imgUrl,
      
    }))
    
    toast.success('product added to cart successfully')
  }
  return (
        <Col xs md className='product__card d-flex flex-column justify-content-center align-items-center rounded p-2'>
          <div>
            <motion.img whileHover={{scale:1.3}} className='product__image' src={item.imgUrl} alt="" />
          </div>
          <span className='text-center'>{item.productName}</span>
          <div className='d-flex align-items-center justify-content-between gap-5'>
            <span><small>#</small><strong>{item.price}</strong></span>
            <motion.span whileHover={{scale:0.7}} className='add__icon width-25 bg-dark rounded-circle text-light' onClick={addToCart}><AddIcon /></motion.span>
          </div>
          
        </Col>
        
  
  )
}

export default ProductCard;
