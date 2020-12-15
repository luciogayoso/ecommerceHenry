import React,{useEffect} from 'react';
import style from "./home.module.css"
import TopProducts from './TopProducts/TopProducts.jsx';
import { useSelector, useDispatch } from 'react-redux';
import {mostrarProductos} from "../../actions/products.js"
import Carousel from 'react-bootstrap/Carousel'
import Home from './home.jsx';
export default function Carrusel(){

const productsl = useSelector(state=>state.products);
 let products = productsl.products;

 const dispatch=useDispatch();
  useEffect(()=>{
        dispatch(mostrarProductos())
},[])

//saca promedio de las review de cada producto y le agrega la propiedad "promedio"
for(let i = 0; i<products.length; i++){
  let reviews = products[i].reviews
  let suma = 0
  for(let j = 0; j < reviews.length; j++){

    suma = suma + reviews[j].calificacion
  } 
   let promedio =  suma / reviews.length
  
   products[i].promedio= promedio
}
//solo arma un array de productos 5 estrellas
let excelente = products.filter(product => product.promedio === 5)
 
    return (
        <div className={style.containerFav}>
          <div>
            <h3 style={{padding: 30}}>Nuestros Productos 5 estrellas!</h3>
          </div>
          <Carousel className={style.carruselFav} >
        {
            excelente.map(product => {
          return (
          <Carousel.Item className={style.carrusel} interval={3000}>   
            <TopProducts  Product={product} />   
          </Carousel.Item>
            
            )})
        }
        </Carousel>

        </div>
    )
}