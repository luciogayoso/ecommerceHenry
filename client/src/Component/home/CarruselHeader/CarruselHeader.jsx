import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import {Link} from 'react-router-dom'
import style from './CarruselHeader.module.css';
import datosCarrusel from './datosCarrusel';
import Ultimos from '../Ultimos'
import {useSelector,useDispatch} from 'react-redux';

export default function Homecategory(){
  const productsl = useSelector(state=>state.products);
  const dispatch = useDispatch();
  let products = productsl.products;
  
  const masNuevos =  products.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  
  console.log(products)
    return(

      <div className={style.contenedor}>
        <Carousel className={style.contenedorCarrusel}>
        {
          datosCarrusel.map(datos=>{
            return(
              <Carousel.Item className="align-items-center justify-content-center" interval={2000}>
              <Link to={'/products/'}>
               <img
                 className={style.imgCarrusel}
                 src={datos.img}
                 alt="First slide"
                 />
                 </Link>
               <Carousel.Caption>
                 <h3>{datos.titulo}</h3>
                 <p>{datos.subtitulo}.</p>
               </Carousel.Caption>
             </Carousel.Item>
            )
          })
        }
        </Carousel>
          <div className={style.nuevos}>
        <hr class="w-100"></hr>
              <h3 className={style.newsTitulo}>Ultimos Productos Agregados</h3>
            <div className={style.contMasNuevos}>
              {
                masNuevos.slice(0,4).map(prod=>{
                  return(
                    
                    <Ultimos productos={prod}/>
                    )
                  })
                }
              </div>   
          </div>
        </div>

    )
}