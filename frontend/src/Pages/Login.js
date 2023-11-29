import React, {useState} from 'react'
import Helmet from '../Components/Helmet'
import { Col, Container, Form, FormGroup, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify'
import { auth} from '../firebase.config';
import { useNavigate } from 'react-router-dom';


function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');
  const navigate = useNavigate()


  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {

      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      setLoading(false)
      toast.success('Signed in')
      navigate('/store')
      console.log(user)

    } catch (error){

      setLoading(false)
      toast.error('Something went wrong')

    }
  };

  return (
    <Helmet title='Login'>
      <Container>
        <Row className='p-5'>
          {
            loading? (<Col lg='12' className='text-center'>
            <h5 className='fw-bold'>Loading......</h5>
            </Col>
           ) :(
            <Col lg={6} className='m-auto text-center'>
            <h3 className='fw-bold fs-4'>Login</h3>
            <Form className='auth__form w-100'onSubmit={handleLogin}>
              
              <FormGroup className='mb-2'>
                <input
                      className='p-2 rounded w-100' 
                      type="email"
                      placeholder='Enter Your Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
              </FormGroup>
              <FormGroup className='mb-2'>
                  <input 
                      className='p-2 rounded w-100' 
                      type="password" 
                      placeholder='Enter Your Password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      />
                </FormGroup>

              <div className='d-grid g-3 mt-4'>
                  <Button type='submit' className='w-100 bg-light text-dark'>Login</Button>
                </div>
              <p>Don't have an account? <Link to='/signup'>Create an account</Link> </p>
            </Form>
          </Col>
           )
          }
          
        </Row>
      </Container>
    </Helmet>
  )
}

export default Login
