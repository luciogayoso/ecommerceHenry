import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Button, Form, Container, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './FormProduct.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { editarProducto } from "../../actions/products.js";
import { listCategory, listCategoryProduct } from '../../actions/category';
import { Link } from 'react-router-dom';


const FormProductEdit = (productEdit) => {

    const dispatch = useDispatch();
    const categ = useSelector(store => store.category);
    const categories = categ.category;
    const categoriesProduct = categ.categoryProduct;
    useEffect(() => {
        dispatch(listCategoryProduct(productEdit.product.id));
        dispatch(listCategory());
    }, []);

    let { id, name, description, price, stock, img } = productEdit.product;

    //pasa la imagen a base 64 desde un buffer
    let base64ToString;
    (img) && (base64ToString = Buffer.from(img.data, "base64").toString())

    //crea los checkbox con las categorias
    const [checkboxes, setCheckboxes] = useState([]);
    const [checked, setChecked] = useState(0);

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
    const [product, setProduct] = useState({
        id: id,
        name: name,
        description: description,
        price: price,
        stock: stock,
        img: base64ToString
    });

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
        e.preventDefault();

    }

    const checkedTrue = () => {
        if (checked === 0) {
            let form = document.getElementById('category').children;

            for (let i = 2; i < form.length; i++) {
                for (let j = 0; j < categoriesProduct.length; j++) {
                    if (parseInt(form[i].children[0].id) === parseInt(categoriesProduct[j].categoryId)) {
                        const modifiedCategories = [...checkboxes];
                        modifiedCategories[form[i].children[0].value].add = true;
                        setCheckboxes(modifiedCategories);
                    }
                }
            }
            setChecked(1);
        }
    }

    return (
        <Container id='container' >
            <Card className='container-fluid col-12  p-3'>
                <Link to={`/administrarAdd`}><Button className='mr-3' className={style.boton} variant="primary" type="button" >Volver atras</Button></Link>
                <Form id='formProduct' name="editar" onSubmit={envioformulario} >

                    <Form.Label className='font-weight-bold' id='formTitle'>Editar Producto</Form.Label><br />

                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type='text' placeholder='nombre'
                        name='name'
                        onChange={obtenerInfo}
                        value={product.name}
                        required
                    />


                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type='text' placeholder='descripción'
                        name='description'
                        onChange={obtenerInfo}
                        value={product.description}
                        required
                    />


                    <Form.Label>Precio</Form.Label>
                    <Form.Control type='number' placeholder='precio'
                        name='price'
                        onChange={obtenerInfo}
                        value={product.price}
                        required
                    />


                    <Form.Label >Stock</Form.Label>
                    <Form.Control type='number' placeholder='stock'
                        name='stock'
                        onChange={obtenerInfo}
                        value={product.stock}
                        required
                    />

                    <Form.Group id='category' onMouseOver={checkedTrue}>
                        <Form.Label>Categorias</Form.Label><br />
                        {
                            checkboxes.map((categoria, i) => {
                                return (
                                    <Form.Label>
                                        <input
                                            type="checkbox"
                                            className="checks ml-1"
                                            value={i}
                                            id={categoria.id}
                                            checked={categoria.add}
                                            onChange={handleCategoryChecks}
                                        />{categoria.name}
                                    </Form.Label>
                                )
                            })
                        }

                    </Form.Group>

                    <Form.Label>Imagen</Form.Label>
                    <Form.Control type='file' placeholder='imagen'
                        name='img'
                        onChange={encodeImageFileAsURL}
                    /><br />
                    <img src={product.img} style={{ width: '150px' }} alt='' />

                    <Form.Group controlId="formBasic"><br />
                        <Button type="button" className='mt-3' className={style.boton} variant="primary" onClick={() => {
                            Swal.fire({
                                title: '¿Esta seguro que desea editar?',
                                text: "¡No podrás revertir esto!",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Si, editar'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    dispatch(editarProducto(product))
                                    let categoriesCheck = []
                                    for (let i = 0; i < checkboxes.length; i++) {
                                        if (checkboxes[i].add === true) {
                                            categoriesCheck.push(checkboxes[i].id);
                                        }
                                    }
                                    axios.post(`http://localhost:3000/products/${product.id}/category/`, [product, categoriesCheck], {
                                        headers: { "Content-type": "application/json; charset=UTF-8" }
                                    })

                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Producto editado exitosamente',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    setTimeout(function () { window.location.pathname = '/admin'; }, 0);
                                }
                            })

                        }}>Editar</Button>
                    </Form.Group>
                </Form>
            </Card>
        </Container >
    )
}

export default FormProductEdit;