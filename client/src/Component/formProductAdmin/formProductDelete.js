import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Button, Form, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { mostrarProducto_id, eliminarProducto } from "../../actions/products.js";


const FormProductDelete = () => {
    const [product, setProduct] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        stock: '',
        img: ''
    })

    // extrae los valores
    const { id, name, description, price, stock, img } = product;

    const productS1 = useSelector(state => state.products);
    let base64ToString;
    (productS1.selectedProduct.img) && (base64ToString = Buffer.from(productS1.selectedProduct.img.data, "base64").toString())


    const dispatch = useDispatch();

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
            //console.log(event);
            var base64 = event.target.result;
            let buff = new Buffer(base64, 'base64');

            setProduct({
                ...product,
                img: base64
            })

            //console.log(event.target.result);
        }
    }

    return (
        <Container id="container" className='container-fluid col-6 mt-4 bg-white p-3'>
            <Form id='formProduct' name="add" >

                <Form.Label id='formTitle'>Eliminar Producto</Form.Label>
                <div>
                    <input id="input" type="text" placeholder="Insert id"
                        name='id'
                        onChange={obtenerInfo}
                        value={id}
                    />
                    <Button id='btnGet' className='ml-1 mt-3' variant="primary" type="button" onClick={() => dispatch(mostrarProducto_id(product.id))}>Obtener Producto</Button>
                    <p id="pId"></p>
                </div>

                <Form.Label>Nombre</Form.Label>
                <Form.Control column="sm" size="sm" type='text' placeholder='Nombre'
                    name='name'
                    onChange={obtenerInfo}
                    value={productS1.selectedProduct.name}
                /><p id="pName"></p>


                <Form.Label>Descripción</Form.Label>
                <Form.Control type='text' placeholder='Descripción'
                    name='description'
                    onChange={obtenerInfo}
                    value={productS1.selectedProduct.description}
                /><p id="pDescripcion"></p>


                <Form.Label>Precio</Form.Label>
                <Form.Control type='number' placeholder='Precio'
                    name='price'
                    onChange={obtenerInfo}
                    value={productS1.selectedProduct.price}
                /> <p id='pPrice'></p>


                <Form.Label >Stock</Form.Label>
                <Form.Control type='number' placeholder='stock'
                    name='stock'
                    onChange={obtenerInfo}
                    value={productS1.selectedProduct.stock}
                /><p id="pStock"></p>


                <Form.Label>Img</Form.Label>
                <Form.Control type='file' placeholder='img'
                    name='img'
                    onChange={encodeImageFileAsURL}
                //value={img}
                /><p id="pImg"></p>
                <img src={base64ToString} />

                <Button type="submit" className='mt-3' variant="primary">Eliminar</Button>

            </Form>
        </Container>
    )
}
export default FormProductDelete;


