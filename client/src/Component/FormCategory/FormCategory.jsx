import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, Col, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addCategory, listCategory } from '../../actions/category';
import style from './FormCategory.module.css';
import Swal from 'sweetalert2';


export default function FormCategory() {

    const dispatch = useDispatch();
  
    const [formData, updateFormData] = useState({
        name: '',
        description: ''
    });

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });

    };
    useEffect(() => {
        dispatch(listCategory())
    }, []);
  
    const handleSubmit = (e) => {
        e.preventDefault();

        var newDate = {
            name: formData.name,
            description: formData.description
        }
        dispatch(addCategory(newDate))
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Categoria Agregada',
            showConfirmButton: true
          })
        limpiarFormulario()
        updateFormData('')
        
    }

    function limpiarFormulario() {
        document.getElementById("form").reset();
    }
 
    useEffect(() => {
        dispatch(listCategory())
        return () => {

        }
    }, [])

    return (
        <div>
            <Container className='container-fluid col-lg-12 col-sm-12 p-3 bg-white'  >
                <br />
            <Card className='container-fluid col-lg-8 col-sm-12 p-3 bg-transparent'style={{ boxShadow: "0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12), 0 1px 5px 0 rgba(0,0,0,.2)"}}>
                <Form id="form"  className="card-boy" onSubmit={(e)=>{handleSubmit(e)}}>
                    <Form.Label className={style.h3}><h3>Ingresar Nueva Categoria</h3></Form.Label>
                    <br /><br /><br />
                    <Form.Row>
                        <Form.Label className={style.input}><h5>Nombre:</h5></Form.Label>
                        <Form.Group as={Col}>
                            <Form.Control
                                name='name'
                                onChange={handleChange}
                                type='text'
                                placeholder="Ingrese Nombre Categoria..."
                                required="true" />
                        </Form.Group>
                    </Form.Row>
                    <br />

                    <Form.Row>
                        <Form.Label size="sm" ><h5>Descripcion:</h5></Form.Label>
                        <Form.Group as={Col}>
                            <Form.Control
                                name='description'
                                onChange={handleChange} block
                                type='text'
                                placeholder="Ingrese descripcion..."
                                required="true" />
                        </Form.Group>

                    </Form.Row>
                    <br />

                    <Button  className={style.boton} 
                    style={{marginLeft:"230px"}}
                      type="submit"
                    // onClick={() => {
                    //     Swal.fire({
                    //         position: 'top-center',
                    //         icon: 'success',
                    //         title: 'Categoria Agregada',
                    //         showConfirmButton: false,
                    //         timer: 1500
                    //       })
                    //        dispatch(addCategory(formData))
                    //        limpiarFormulario()
                    //        updateFormData('')  
                    // }} 
                    >Agregar</Button>
                </Form>
                </Card>
            </Container>
            
        </div>

    );
}
