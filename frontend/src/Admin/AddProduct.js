
import React, {useState} from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap'
import {toast} from 'react-toastify'
import { db, storage } from '../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [enterTitle, setEnterTitle] = useState('')
    const [enterPrice, setEnterPrice] = useState('')
    const [enterCategory, setEnterCategory] = useState('')
    const [enterProductImg, setEnterProductImg] = useState(null)
    const [loading, setLoading] = useState('')
    const navigate = useNavigate()

    const addProduct = async(e) => {
        e.preventDefault()

        setLoading(true)
        // add product to firebase database

        try {
            const docRef = collection(db, 'products')
            const storageRef = ref(storage, `productImage/${Date.now() + enterProductImg.name}`)

            const uploadTask = uploadBytesResumable(storageRef, enterProductImg)

            uploadTask.on('state_changed', 
            () => {
                    
            },
            (error) => {
              toast.error(error.message)
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
    
                await addDoc(docRef, {
                    productName: enterTitle,
                    price: enterPrice,
                    category: enterCategory,
                    imgUrl: downloadURL
                });
                
            });
            setLoading(false)
            toast.success('product successfully added')
            navigate('/dashboard/all-product')
            
          }
          );
          
        }catch(error){
            setLoading(false)
            toast.error('something went wrong')
        }
        
        
    }

  return (
    <section className='bg-light pt-5 pb-5'>
        <Container>
           <Row>
            {
              loading ? (
                <h4>Loading....</h4>
              ) : (
                <Col lg='12'>
                <h4>Add Product</h4>
                <Form onSubmit={addProduct}>
                    <Form.Group className='form__group mb-3'>
                        <span className='text-danger'>Product Name</span>
                        <input type="text" className='w-100' placeholder='product name' value={enterTitle} onChange={(e)=> setEnterTitle(e.target.value)} required/>
                    </Form.Group>
                    <div className='w-100 d-flex align-items-center justify-content-between gap-4'>
                    <Form.Group className='form__group mb-3 w-50'>
                        <span className='text-danger'>Price</span>
                        <input type="number" className='w-100' placeholder='#100' value={enterPrice} onChange={(e)=> setEnterPrice(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group className='form__group mb-3 w-50'>
                        <span className='text-danger w-50'>Category</span>
                        <select className='w-100 p-1' value={enterCategory} onChange={(e)=> setEnterCategory(e.target.value)} required>
                            <option value="">Select</option>
                            <option value="Beverages">Beverages</option>
                            <option value="beer">Beer</option>
                            <option value="soft">Soft</option>
                            <option value="soap">Soap</option>
                            <option value="noodles">Noodles</option>
                            <option value="general">General</option>
                        </select>
                    </Form.Group>
                    </div>
                    <div>
                    <span className='text-danger'>Product Image</span>
                    <Form.Group className='form__group border p-2'>
                        <input className='w-100' type="file" name='file'
                      onChange={(e) => setEnterProductImg(e.target.files[0])} required/>
                    </Form.Group>
                    </div>

                    <Button className='mt-4' type='submit'>Add product</Button>
                </Form>
            </Col>
              )
            }
           </Row>
        </Container>
    </section>
  )
}

export default AddProduct
