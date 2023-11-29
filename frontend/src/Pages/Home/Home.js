import React from 'react'
import {useState, useEffect } from 'react'

import Hero from '../../Components/Hero/Hero'
import TopBrands from '../../Components/Brands/TopBrands'
import "./Home.css"

import Helmet from '../../Components/Helmet'
import Favorite from '../../Components/Brands/Favorite'
import products from '../../Assets/products'
import Grocery from '../../Components/Brands/Grocery'
import { Container } from 'react-bootstrap'





function Home() {

  const [filterdproduct, setFilterdProduct] = useState([])
  const [favoriteProduct, setFavoriteProduct] = useState([])
  const [grocery, setGrocery] = useState([])

  useEffect(() => {
    const filterdProduct = products.filter(item => item.display === 'topBrand');
    const favoriteProduct = products.filter(item => item.display === 'favorite');
    const grocery = products.filter(item => item.display === 'grocery');

    setFilterdProduct(filterdProduct)
    setFavoriteProduct(favoriteProduct)
    setGrocery(grocery)
  }, []);

  return (
    <Helmet title={'Home'}>
      <Container  fluid className='home'>
        <Hero />
        <Grocery data={grocery}/>

        <section className='brand-section mt-3  p-sm-2 p-md-4'>

          <TopBrands
            header='Top Brands'
            data = {filterdproduct}
          />
          <Favorite
            header='My Favorite'
            data = {favoriteProduct}
          />

        </section>
      </Container>
    </Helmet>
  )
}

export default Home
