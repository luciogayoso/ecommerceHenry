
import React, { useState, useEffect } from 'react'
import { editUser,listUser } from '../../actions/users';
import { Button, Form, Col, Row, Container} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import style from './FormAddUser.module.css'
import Swal from 'sweetalert2';


export default function EditUser(userEd) {
  console.log(userEd.user)
    const [edituser, UpdateUser]=useState(userEd.user)
    const [Open, setOpen]=useState(false)
//    const storeUser=useSelector(store=>store.users)
    const dispatch = useDispatch();
    const hadlerChange=(e)=>{
        UpdateUser({
            ...edituser,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        dispatch(listUser())
        return () => {

        }
    }, [])

  
    return (
        // <form onSubmit={(e)=>editar(e)}>
       <Container className='container-fluid col-lg-8 col-sm-12 p-3 bg-white'
       style={{ boxShadow: "0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12), 0 1px 5px 0 rgba(0,0,0,.2)"}}>
        <form>
           
            <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">Name:</Form.Label>
                <Col sm="10">
                    <Form.Control className={style.Label}  name="name" onChange={hadlerChange} defaultValue={edituser.name} />
                </Col><br/>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextEmail"> 
                <Form.Label column sm="2">Lastname:</Form.Label>
                <Col sm={10}>
                    <Form.Control className={style.Label} name="lastname"   size="sm" onChange={hadlerChange} defaultValue={edituser.lastname} />
                </Col><br/>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">DNI:</Form.Label>
                <Col sm={10}>
                    <Form.Control className={style.Label} name="dni"  onChange={hadlerChange} defaultValue={edituser.dni} />
                </Col><br/>
                </Form.Group>
                <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2"> Email: </Form.Label>
                <Col sm={10}>
                    <Form.Control className={style.Label} name="email"  onChange={hadlerChange} defaultValue={edituser.email} />
                </Col><br/>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2"> Username: </Form.Label>
                <Col sm={10}>
                    <Form.Control className={style.Label} name="email"  onChange={hadlerChange} defaultValue={edituser.username} />
                </Col><br/>
            </Form.Group>
            <Form.Group as={Row} sm="6" controlId="exampleForm.SelectCustom" >
                <Form.Label column sm="2">Type User:</Form.Label>
                <Col>
                <Form.Control 
               controlId="formPlaintextEmail"
                as="select" 
                name="typeUser"
                sm="6"  
                onChange={hadlerChange} 
                defaultValue={edituser.typeUser}  
                htmlFor="inlineFormInputGroupUsername2"
              
              >
                    <option >Admin</option>
                    <option >cliente</option>
         
                </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                   <Col sm={{ span: 10, offset: 2 }}>

            <Button className={style.boton} type='submit'
                onClick={(e) => {
                    e.preventDefault() 
                    dispatch(editUser(edituser))
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Registro Actualizado',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      UpdateUser('')
                   
                }} >Actualizar</Button>
                    </Col>
           </Form.Group>
        
        </form>
        </Container>
       
    )


}
