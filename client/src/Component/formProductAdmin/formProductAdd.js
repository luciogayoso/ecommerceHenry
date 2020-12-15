import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './FormProduct.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { mostrarProductos } from "../../actions/products.js";
import { listCategory } from '../../actions/category';

const FormProductAdd = () => {
    //const dispatch=useDispatch()
    const [product, setProduct] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        stock: '',
        img: ''
    })

    const categ = useSelector(store => store.category);
    const categories = categ.category;
    useEffect(() => {
        dispatch(listCategory())
    }, []);

    const [checkboxes, setCheckboxes] = useState([]);
    useEffect(
        () => {
            const categoryTypes = categories.map(c => ({
                name: c.name,
                id: c.id,
                add: false
            }));

            setCheckboxes(categoryTypes);
        },
        [categories]
    );

    // extrae los valores
    const { name, description, price, stock, img } = product;


    //leer datos del formulario
    const obtenerInfo = e => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    function encodeImageFileAsURL(e) {
        var input = e.target;
        var fReader = new FileReader();
        fReader.readAsDataURL(input.files[0]);
        fReader.onloadend = function (event) {
            var base64 = event.target.result;

            setProduct({
                ...product,
                img: base64
            })

        }
    }

    const handleCategoryChecks = e => {
        const modifiedCategories = [...checkboxes];
        modifiedCategories[e.target.value].add = e.target.checked;
        setCheckboxes(modifiedCategories);
    };

    const envioformulario = (e) => {
        Swal.fire({
            icon: 'success',
            title: 'Producto agregado con exito',
        })
        e.preventDefault();

        axios.post(`http://localhost:3000/products/`, product, {
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }
        ).then(respuesta => {

            let categoriesCheck = []
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].add === true) {
                    categoriesCheck.push(checkboxes[i].id);
                }
            }
            axios.post(`http://localhost:3000/products/${respuesta.data.id}/category/`, [product, categoriesCheck], {
                headers: { "Content-type": "application/json; charset=UTF-8" }
            })
        })

        //Cuarto: Reiniciar el form
        setProduct({
            id: '',
            name: '',
            description: '',
            price: '',
            stock: '',
            img: ''
        });
        setCheckboxes([]);

        const categoryTypes = categories.map(c => ({
            name: c.name,
            id: c.id,
            add: false
        }));

        setCheckboxes(categoryTypes);
    }


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(mostrarProductos())
        return () => {

        }
    }, [])

    return (
        <Container id='container' className='container-fluid col-lg-8 col-sm-12  bg-white p-3'>
            <Row>
                <Col>
                    <h1 style={{ textAlign: "center" }}>Productos</h1>
                </Col>
            </Row>
            <Card className='container-fluid col col-sm-12  bg-white p-3'>

                <Button className='mr-3' className={style.boton} variant="primary" type="button" onClick={() => window.history.back()} >Volver atras</Button>
                <Form id='formProduct' name="add" onSubmit={envioformulario} >

                    <Form.Label className='font-weight-bold' id='formTitle'>Agregar Producto</Form.Label><br />

                    <Form.Label>Name</Form.Label>
                    <Form.Control column="sm" size="sm" type='text' placeholder='Nombre'
                        name='name'
                        onChange={obtenerInfo}
                        value={name}
                        required
                    /><p id="pName"></p>


                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type='text' placeholder='Descripción'
                        name='description'
                        onChange={obtenerInfo}
                        value={description}
                        required
                    /><p id="pDescripcion"></p>


                    <Form.Label>Price</Form.Label>
                    <Form.Control type='number' placeholder='Precio'
                        name='price'
                        onChange={obtenerInfo}
                        value={price}
                        required
                    /> <p id='pPrice'></p>


                    <Form.Label >Stock</Form.Label>
                    <Form.Control type='number' placeholder='Stock'
                        name='stock'
                        onChange={obtenerInfo}
                        value={stock}
                        required
                    /><p id="pStock"></p>

                    <Form.Group>
                        <Form.Label>Categorias</Form.Label><br />

                        {checkboxes.map((categoria, i) => {
                            return (
                                <Form.Label>
                                    <input
                                        type="checkbox"
                                        className="checks ml-1"
                                        value={i}
                                        checked={categoria.add}
                                        onChange={handleCategoryChecks}
                                    />{categoria.name}
                                </Form.Label>
                            );
                        })}

                    </Form.Group>
                    <p></p>

                    <Form.Label>Image</Form.Label>
                    <Form.Control type='file' placeholder='Imagen'
                        name='img'
                        onChange={encodeImageFileAsURL}
                        required
                    /><p id="pImg"></p>
                    <img src={product.img} style={{ width: '150px' }} />


                    <Form.Group controlId="formBasic"><br />

                        <Button className={style.boton} type="submit" variant="primary">Agregar</Button>

                    </Form.Group>

                </Form>
            </Card>
        </Container>
    )
}

export default FormProductAdd;