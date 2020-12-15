import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card,Button, Row} from 'react-bootstrap';
import { Container} from '@material-ui/core';
import style from './UserProfile.module.css'
import NavbarUser from './NavBarUser/NavbarUser'
import Tooggle from './NavBarUser/toogle'
import axios from 'axios';
import * as IoIcons from 'react-icons/io';
import {useDispatch} from 'react-redux'
import Cookies from 'universal-cookie';
import OrdersAdmin from '../Order/OdersAdmin';

export default function ComprasUser() {
   
 
    const [sidebarOpen, setSidebarOpen]=useState(false)
    const cookies=new Cookies()
    const idUser=cookies.get('id')
    const dispatch=useDispatch()
    const [orders, setOrders]=useState('')

    const openHandler=()=>{
        if(!sidebarOpen){
            setSidebarOpen(true)
        }else{
            setSidebarOpen(false)
        }
    }
    const sidebarCloseHandler=()=>{
        setSidebarOpen(false)

    }
    let sidebar
    if(sidebarOpen){
        sidebar=<NavbarUser close={sidebarCloseHandler} sidebar={"sidebar"} />
       
    }

    const obtenerOrdenes =(id)=>{
        axios.get(`http://localhost:3000/user/${id}/orders/`)
        .then(ord=>{
            console.log(ord)
            return ord.data
        })
        .then((orden)=>{
            setOrders(orden)

        })
           
    }
    console.log(orders)
    useEffect(()=>{
        obtenerOrdenes(idUser)
    },[])
    function formatoFecha(string){
        var info = string.split('T');
        var fecha=info[0].split('-').reverse().join('/')
        return fecha;
    }
 console.log(orders)
    return (
      
           <>
            <div>
               {sidebar}
               <Tooggle onClick={openHandler}/>
            </div>
            <Container component="main" maxWidth="md"  height="30px" background-color=" #fff">
            {
               ( orders.length>0) ? orders && orders.map(item=>{
                   return( <>
                    <Card className={style.compras} >
                    <Card.Header  className={style.comprasHeader}>
                      Orden N° {item.id} creada: {formatoFecha(item.createdAt)}
                        <Button className={style.comprasBotones}>Devolver</Button>
                        <Button className={style.comprasBotones}>Volver a comprar</Button>
                    </Card.Header>
                    <Card.Body>
                    <Card.Title>Estado: {item.estado} </Card.Title>
    
                        <Button  className={style.comprasDetalle}>ver detalle <IoIcons.IoMdMore/></Button>
                        <p> Ultima actualizacion: {formatoFecha(item.updatedAt)}</p>                   
    
                    </Card.Body>
                   
                </Card>
                    </>)

                })
                : <div><h5>Sin Ordenes</h5></div>
            }
            </Container>
            </>
 
       
    )
}
