import React,{useEffect} from 'react'
import { Card,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import style from './Ultimo.module.css'

export default function Ultimos({productos}){

console.log(productos)

    let base64ToString;
   (productos.img) && (base64ToString = Buffer.from(productos.img.data, "base64").toString())

    return(
        <div className="">
            <Card className={style.card}>
            <span className={style.nuevo}>Nuevo</span>
                <Card.Body className={style.contImg}>
                <Card.Img className={style.img} src={base64ToString} variant="top" />
                </Card.Body>
                <Card.Footer>
            <Link className={style.link} to={`/products/${productos.id}`}><h5>{productos.name}</h5></Link>
                 </Card.Footer>
            </Card>
               
        </div>
    )
}