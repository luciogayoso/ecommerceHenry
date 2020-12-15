import React from 'react';
import {Link} from 'react-router-dom'
import {Card, Image,Button, Form} from 'react-bootstrap';
import styles from "./OrderLine.module.css";
import { useDispatch, useSelector, useStore } from 'react-redux';

export default function OrderLine ({producto}){
    const products = useSelector(store=>store.productsCart)
    const dispatch=useDispatch();

//obtengo los productos de localStorage
let prodGuardadosLStorage = JSON.parse(localStorage.getItem("carritoLocal"))      
console.log("PRODUCTOS GUARDADOS LOCALSOTAGE = ", prodGuardadosLStorage);

let cantidadLStorage = JSON.parse(localStorage.getItem("stock"))[[producto.id]]
console.log("CANTIDAD STORAGE = ", cantidadLStorage);


    return(
        
            <Card className={styles.card1}>

                <div className={styles.descrip}>
                <Link to={`/products/${producto.id}`}>   
                    <Card.Title>Producto: { producto.name}</Card.Title>
                </Link> 
                    <Card.Subtitle>Precio: { producto.price }</Card.Subtitle>
                    <Card.Text>Descripción del producto: {producto.description}</Card.Text>
                 <div className={styles.cantidad}>Cantidad: {cantidadLStorage.cantidad} </div>
                </div>
               
            </Card>
     
    )
}