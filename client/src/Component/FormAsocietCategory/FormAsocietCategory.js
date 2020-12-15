import React, { useState } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const FormProductCategory = () => {
    const [categoria, setCategory] = useState({
        idProduct: '',
        name: '',
        description: ''
    })

    // extrae los valores
    const { id, name, description, idProduct } = categoria;
    //leer datos del formulario

    const actualizarState = e => {
        setCategory({
            ...categoria,
            [e.target.name]: e.target.value
        })
    }

    const traerProducto = () => {
        if (categoria.idProduct !== '') {
            axios.get(`/products/${categoria.idProduct}`)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const eliminarCategoria = () => {
        if (categoria.idProduct !== '') {
            axios.delete(`/products/${categoria.idProduct}`)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const enviarCategoria = () => {
        if (categoria.name !== "" && categoria.description !== "") {
            axios.post('/products/category', categoria)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        <Container>
            <h2>Productos</h2>
            <Form>
                <label>id</label>
                <input
                    type='number'
                    name='id'
                    className='u-full-width'
                    onChange={actualizarState}
                />
                <Button variant="primary" onClick={traerProducto} type="button">Traer Producto</Button><br />

                <label>name</label>
                <input
                    type='text'
                    name='name'
                    onChange={actualizarState}
                />
                <br />

                <label>description</label>
                <input
                    type='text'
                    name='description'
                    onChange={actualizarState}
                />

            </Form>

            <Button onClick={enviarCategoria} variant='primary' className='mr-3'
                type='submit'
            >Agregar</Button>

            <Button onClick={eliminarCategoria} variant='danger' className='mr-3'
                type='submit'
            >eliminar</Button>

        </Container>

    );
}

export default FormProductCategory;
