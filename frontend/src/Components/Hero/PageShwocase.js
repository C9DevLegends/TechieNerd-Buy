import React from 'react'
import { Container } from 'react-bootstrap'
import './Hero.css'

function PageShowcase({title}) {
  return (
    <Container fluid className='showcase'>
                <h3>{title}</h3>
    </Container>
  )
}

export default PageShowcase
