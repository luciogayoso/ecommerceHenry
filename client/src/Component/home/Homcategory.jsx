import React from 'react';
import imagen1 from "./consolas.jpg";
import imagen2 from "./accesorios.jpg";
import imagen3 from "./videojuegos.jpg";
import style from "./home.css"
import Carousel from 'react-bootstrap/Carousel'
import {Link} from 'react-router-dom'


export default function Homecategory(){

    return(
        <Carousel className={style.contenedor}>
        <Carousel.Item interval={1000}>
         <Link to={'/products/'}>
          <img
            className="d-block w-100"
            src={imagen1}
            alt="First slide"
            className={style.img}
            />
            </Link>
          <Carousel.Caption>
            <h3>CONSOLAS</h3>
            <p>Las mejores consolas estan aqui.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
        <Link to={'/products/'}>
          <img
            className="d-block w-100"
            src={imagen2}
            alt="Third slide"
            className={style.img}
          />
        </Link>
          <Carousel.Caption>
            <h3>ACCESORIOS</h3>
            <p>Todo para la PC MASTER RACE</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
        <Link to={'/products/'}>
          <img
            className="d-block w-100"
            src={imagen3}
            alt="Third slide"
            className={style.img}
          />
      </Link>
          <Carousel.Caption>
            <h3>VIDEOJUEGOS</h3>
            <p>Los ultimos juegos de tus franquicias favoritas</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    )
}