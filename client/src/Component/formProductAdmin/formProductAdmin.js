import React, { Fragment, useState, useEffect } from 'react';
import { Button, Container, Table, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './FormProduct.module.css';
import { useDispatch, useSelector } from 'react-redux';
import FormAdd from './formProductAdd';
import FormEdit from './formProducEdit';
import { Link } from 'react-router-dom'
import { mostrarProductos, eliminarProducto } from "../../actions/products.js";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from 'sweetalert2';

const FormProductAdmin = () => {

    const productS1 = useSelector(state => state.products);
    //console.log(productS1);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(mostrarProductos())
        return () => {

        }

    }, [])


    const [click, setclick] = useState({
        clicked: ''
    })

    const clickAdd = () => {
        setclick({
            clicked: <FormAdd />
        })
    }

    const clickEdit = (product) => {
        setclick({
            clicked: <FormEdit product={product} />
        })

    }

    const clickDelete = (id) => {
        Swal.fire({
            title: '¿Esta seguro que desea eliminar?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar'
        }).then((result) => {

            if (result.isConfirmed) {

                dispatch(eliminarProducto(id))
                Swal.fire(
                    'Eliminado!',
                    'Tu producto fue eliminado con exito.',
                    'success'
                )
                dispatch(mostrarProductos())
            }

        })
        dispatch(mostrarProductos())
    }
    let items = '';
    (productS1.products) && (items = productS1.products.map(product => {
        return (
            <tr >
                <th scope="row">{product.name}</th>
                <th scope="row">{product.description}</th>
                <th scope="row">{product.price}</th>
                <th scope="row">{product.stock}</th>
                <th scope="row" ><img style={{ width: '150px' }} src={Buffer.from(product.img.data, "base64").toString()} /></th>
                <td>
                    <Button className='btn btn-warning' onClick={() => clickEdit(product)}><FiEdit /></Button>
                    {'  '}
                    <Button className='btn btn-danger opacity-2' onClick={() => clickDelete(product.id)}><RiDeleteBin6Line /></Button>
                </td>
            </tr>
        )
    }))


    return (
        <Container className='container-fluid col-lg-8 col-sm-12 p-3 bg-white '>
            <Row>
                <Col>
                    <h1 style={{ textAlign: "center" }}>Productos</h1>
                </Col>
            </Row>
            <Fragment id="formPage">
                {click.clicked}
            </Fragment>

            <Fragment id="producto">
                {
                    (click.clicked === '') ?
                        <Fragment>
                            <Link to={'/administrarAdd'}><Button className={style.boton} variant="primary" type="button" onClick={clickAdd}>Agregar</Button></Link>
                            <Table className='table-sm table-bordered table-hover table-responsive-md table-responsive-sm'>
                                <thead className={style.thead} >
                                    <tr>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Descripción</th>
                                        <th scope="col">Precio </th>
                                        <th scope="col">Stock </th>
                                        <th scope="col" >Imagen </th>
                                        <th scope="col">Editar/Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {items}
                                </tbody>

                            </Table>
                        </Fragment>
                        :
                        <Fragment></Fragment>
                }
            </Fragment>
        </Container>

    )
}

export default FormProductAdmin;
