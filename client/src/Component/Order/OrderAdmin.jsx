import React, {useEffect, useState} from 'react';
import { useDispatch,useSelector} from 'react-redux';
import { Container, Button,Col, Table,Navbar,Nav } from 'react-bootstrap';
import { FiEdit } from "react-icons/fi";
import {RiDeleteBin6Line}  from "react-icons/ri";
import styles from './tablaOrdenes.module.css';

/* var ordenes=[
    {   
        id:1,
        user: "usuario 1",
        estado:"completada",
        createdAt: "2020-10-16T15:30:50.688Z",
        updatedAt: "2020-10-16T15:30:50.688Z"
    },
    {   
        id:2,
        user:"usuario 2",
        estado:"completada",
        createdAt: "2020-10-16T15:30:50.688Z",
        updatedAt: "2020-10-16T15:30:50.688Z"
    },
    {   
        id:3,
        user:"usuario 2",
        estado:"completada",
        createdAt: "2020-10-16T15:30:50.688Z",
        updatedAt: "2020-10-16T15:30:50.688Z"
    },
    {   
        id:4,
        user:"usuario 1",
        estado:"completada",
        createdAt: "2020-10-16T15:30:50.688Z",
        updatedAt: "2020-10-16T15:30:50.688Z"
    }

] */

export default function OrderAdmin() {

/*     useEffect(()=>{
         dispatch()
     },[]);
 */
     const items= ordenes.map(item=>{
         return(
            <tr>
            <td>{item.id}</td>
            <td>{item.user}</td>
            <td>{item.estado}</td>
            <td>{item.createdAt}</td>
            <td>{item.updatedAt}</td>
            <td>
              <div style={{width:"110px"}}>
              <Button>Ver detalles</Button>
              </div>
            </td>
          </tr>
         )
     })

    return(
        <Container>
                <Navbar className={styles.heaedr}>
                    <Navbar.Collapse className="justify-content-center">
                        <Navbar.Brand> Lista de ordenes  </Navbar.Brand>
                    </Navbar.Collapse>
                </Navbar>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Usuario ID</th>
                        <th>estado</th>
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