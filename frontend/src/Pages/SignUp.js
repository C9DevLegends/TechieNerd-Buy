import React, { useState}from 'react'
import Helmet from '../Components/Helmet'
import { Col, Container, Form, FormGroup, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { db, storage, auth} from '../firebase.config';
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { toast } from 'react-toastify'
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';





function SignUp() {
  
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState('');

  const navigate = useNavigate();
 


  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      const storageRef = ref(storage, `userImg/${Date.now() + email}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on('state_changed', 
        () => {
                
        },
        (error) => {
          toast.error(error.message)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {

            await updateProfile(user, {
              email,
              displayName: username,
              photoURL: downloadURL,
            }).then(() => {
              // prifile updated
            }).catch((error) => {
              // An error occurred
              toast.error(error.message)
              console.log(error.message)
            });
            await setDoc(doc(db, "users", user.uid), {
              uid: user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            });
          
        });
      }
      );
      setLoading(false)
      toast.success('Account Created')
      navigate('/login')

    } catch (error){

      setLoading(false)
      toast.error('Something went wrong')

    }
  };
  return (
    <Helmet title='Sign-UP'>
      <Container>
        <Row className='p-5'>
         {
          loading? (<Col lg='12' className='text-center'>
            <h5 className='fw-bold'>Loading......</h5>
            </Col>
           ) :(
              <Col lg={6} className='m-auto text-center'>
              <h3 className='fw-bold fs-4'>Sign-Up</h3>
              <Form className='auth__form w-100' onSubmit={handleSignUp}>
              
                <FormGroup className='mb-2'>
                <input
                    className='p-2 rounded w-100' 
                    type="text"
                    placeholder='Enter Your username'
                    name= 'username'
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className='mb-2'>
                <input
                    className='p-2 rounded w-100' 
                    type="email"
                    placeholder='Enter Your Email'
                    name= 'email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className='mb-2'>
                <input
                    className='p-2 rounded w-100' 
                    type="password"
                    placeholder='Enter Your Password'
                    name= 'password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className='mb-2'>
                  <input 
                      className='p-2 rounded w-100' 
                      type="file" 
                      name='file'
                      onChange={(e) => setFile(e.target.files[0])}
                      />
                </FormGroup>
                
                <div className='d-grid g-3 mt-4'>
                  <Button type='submit' className='w-100 bg-light text-dark'>Sign-Up</Button>
                </div>
                <p>Alraedy have an account <Link to='/login'>Login</Link> </p>
              </Form>
            </Col>
            )
         }
        </Row>
      </Container>
    </Helmet>
  )
}

export default SignUp
