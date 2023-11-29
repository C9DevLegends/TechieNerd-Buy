import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import '../Pages/Cart/Checkout.css'
import useGetData from '../Custom-hooks/useGetData'
import { db } from '../firebase.config'
import { doc, deleteDoc } from 'firebase/firestore'
import {toast} from 'react-toastify'

const Users = () => {

    const {data:usersData, loading} = useGetData('users')
    
    const deleteUser = async(id)=> {
        await deleteDoc(doc(db, 'users', id))
        toast.success('user deleted')
    }
  return (
    <section className='p-5 bg-light'>
      <Container>
        <Row>
            <Col lg='12 table-responsive' >
                <table className='table bordered table-striped table-hovers'>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? <h4 className='p-4'>Loading....</h4> : (
                                
                                    usersData.map(user => (
                                    <tr key={user.uid}>
                                        <td><img src={user.photoURL} alt="" /></td>
                                        <td>{user.displayName}</td>
                                        <td>{user.email}</td>
                                        <td><Button onClick={()=>{deleteUser(user.uid)}} variant="danger">Delete</Button></td>
                                    </tr>
                                    ))
                                
                            )
                        }
                    </tbody>
                </table>
            </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Users
