import React, {useState, useEffect} from 'react'
import Helmet from '../../Components/Helmet'
import ProductList from '../../Components/Products/ProductList'
import { Col, Container, Row } from 'react-bootstrap';
import PageShowcase from '../../Components/Hero/PageShwocase';

import useGetData from '../../Custom-hooks/useGetData'

function Store() {

  const {data: products, loading} = useGetData('products')

  const [filterdBeverage, setFilterdBeverage] = useState([]);
  const [filterdBeer, setFilterdBeer] = useState([]);
  const [filterdSoft, setFilterdSoft] = useState([]);
  const [filterdSoap, setFilterdSoap] = useState([]);
  const [filterdNoddle, setFilterdNoddle] = useState([]);
  const [filterdGeneral, setFilterdGeneral] = useState([]);

  useEffect(() => {
    const filteredBeverage = products.filter(item => item.category === 'Beverages');
    const filteredBeer = products.filter(item => item.category === 'beer');
    const filteredSoft = products.filter(item => item.category === 'soft');
    const filteredSoap = products.filter(item => item.category === 'soap');
    const filteredNoddle = products.filter(item => item.category === 'noodles');
    const filteredGeneral = products.filter(item => item.category === 'general');

    setFilterdBeverage(filteredBeverage)
    setFilterdBeer(filteredBeer)
    setFilterdSoft(filteredSoft)
    setFilterdSoap(filteredSoap)
    setFilterdNoddle(filteredNoddle)
    setFilterdGeneral(filteredGeneral)
  }, [products])
  return (
    <Helmet title={'Store'} className='store'>
      <PageShowcase  title='Products'/>
      <Container fluid className='bg-light store'>
        
        <Row className='d-flex justify-content-around pb-5'>
          <Col lg={12} className='bg-light mb-3'>
            <h2 className='text-center display-5'>Beverages</h2>
          </Col>
          {
              loading ? <h4>Loading....</h4> : <ProductList data={filterdBeverage}/>
          }
          <Col lg={12} className='bg-primary mb-3 mt-3'>
            <h2 className='text-center display-5'>Beer</h2>
          </Col>
          {
              loading ? <h4>Loading....</h4> : <ProductList data={filterdBeer}/>
          }
          
          <Col lg={12} className='bg-secondary mb-3 mt-3'>
            <h2 className='text-center display-5'>Soft</h2>
          </Col>
          {
              loading ? <h4>Loading....</h4> : <ProductList data={filterdSoft}/>
          }
          
          <Col lg={12} className='bg-success mb-3 mt-3'>
            <h2 className='text-center display-5'>Soap</h2>
          </Col>
          {
              loading ? <h4>Loading....</h4> : <ProductList data={filterdSoap}/>
          }
          
          <Col lg={12} className='bg-info mt-3 mb-3'>
            <h2 className='text-center display-5'>Noodles</h2>
          </Col>
          {
              loading ? <h4>Loading....</h4> : <ProductList data={filterdNoddle}/>
          }
          
          <Col lg={12} className='bg-warning mt-3 mb-3'>
            <h2 className='text-center display-5'>Generals</h2>
          </Col>
          {
              loading ? <h4>Loading....</h4> : <ProductList data={filterdGeneral}/>
          }
          
        </Row>
        
      </Container>
    </Helmet>
  )
}

export default Store
