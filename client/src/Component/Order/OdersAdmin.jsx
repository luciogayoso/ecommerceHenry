import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Col, Table, Navbar, Nav, Card } from 'react-bootstrap';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import styles from './tablaOrdenes.module.css';
import { listOrders, cambiarEstadoEnviado, cancelarEstadoOrden } from '../../actions/order'
import findbyId from '../../actions/order'
import axios from 'axios'


export default function OrdersAdmin() {
    const dispatch = useDispatch();
    const orders = useSelector(store => store.order);
    const list_orders = orders.order;

    const [detalle, setDetalle] = useState(false);




    useEffect(() => {
        dispatch(listOrders())

    }, [])
    const verDetalle = (id) => {

        axios.get(`http://localhost:3000/orders/${id}`)
            .then((resp) => {

                const aux = resp.data
                console.log(resp)
            })

    }

    const items = list_orders ? list_orders.map(item => {
        // Aca va a ir el filter !

        var code = document.getElementById("filtro");
        if (code !== null) {
            var cod = code.value;
            if (cod == "Todos") {
                return (
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.user}</td>
                        <td>{item.estado}</td>
                        <td><button className='btn btn-outline-primary btn-sm ml-1' onClick={() => dispatch(cambiarEstadoEnviado({ id: item.id, estado: 'enviado' }))}>Enviado</button></td>
                        <td><button className='btn btn-outline-danger btn-sm ml-1' onClick={() => dispatch(cancelarEstadoOrden(item.id))}>Cancelar</button></td>
                        <td>{item.createdAt}</td>
                        <td>{item.updatedAt}</td>
                        <td>
                            <div style={{ width: "110px" }}>
                                <Button onClick={() => verDetalle(item.id)}>Ver detalles</Button>
                            </div>
                        </td>
                    </tr>);
            } else if(item.estado == cod) {

                return (
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.user}</td>
                        <td>{item.estado}</td>
                        <td><button className='btn btn-outline-primary btn-sm ml-1' onClick={() => dispatch(cambiarEstadoEnviado({ id: item.id, estado: "enviado" }))}>Enviado</button></td>
                        <td><button className='btn btn-outline-danger btn-sm ml-1' onClick={() => dispatch(cancelarEstadoOrden(item.id))}>Cancelar</button></td>
                        <td>{item.createdAt}</td>
                        <td>{item.updatedAt}</td>
                        <td>
                            <div style={{ width: "110px" }}>
                                <Button onClick={() => verDetalle(item.id)}>Ver detalles</Button>
                            </div>
                        </td>
                    </tr>);
            } else {
                return
            }
        }
    })
        :
        <div></div>;


    return (
        <Container>
            <Navbar className={styles.heaedr}>
                <Navbar.Collapse className="justify-content-center">
                    <Navbar.Brand> Lista de ordenes  </Navbar.Brand>
                </Navbar.Collapse>
            </Navbar>
            <Card className={styles.card}>
                <Card.Body className={styles.p}>Seleccioné: Estado de la orden </Card.Body>
            </Card>

            <select className={styles.select} name='filtro' id='filtro' onChange={() => dispatch(listOrders())}>
                <option value="Todos" selected>Todos</option>
                <option value="creada">Creada</option>
                <select className={styles.select} name='filtro' id='filtro' onChange={() => dispatch(listOrders())}>
                    <option value="Todos" selected >Todos</option>
                    <option value="carrito">Carrito</option>
                    <option value="procesando">Procesando</option>
                    <option value="completada">Completada</option>
                    <option value="cancelada">Cancelada</option>

                </select>
            </select>

                <Table responsive>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Usuario ID</th>
                            <th>Estado</th>
                            <th>Editar Estado</th>
                            <th>Cancelar</th>
                            <th>Fecha de creacion</th>
                            <th>Fecha de Actuliazacion</th>
                            <th>Detalles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>

                </Table>
        </Container>
    )


};