import React,{useEffect} from 'react';
import {Container,Card,Button,Navbar,Nav} from 'react-bootstrap';
import OrderLine from './OrderLine.jsx';
import styles from './Order.module.css';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector, useStore } from 'react-redux';
import { mostraTotal } from "../../actions/cart";
import Checkout from '../Checkout/Checkout'


export default function Order(islog){
    const idUser = islog.id
    console.log("COMPONENTE ORDEN");
const dispatch = useDispatch();

var prodGuardados = JSON.parse(localStorage.getItem("carritoLocal"))
console.log("PRODUCTOS GUARDADOS = ", prodGuardados);


 //obtengo los productos del usuario
 const prodGuardadosCartUser = useSelector(store => store.productsCart).productos
 const cantidadUser = useSelector(store => store.productsCart).stockProduct
 //obtengo los productos de localStorage
 let prodGuardadosLStorage = JSON.parse(localStorage.getItem("carritoLocal"))
 
//selecciono la lista de items del carrito
let listaProductos = prodGuardadosCartUser.length ? prodGuardadosCartUser : prodGuardadosLStorage
 //total
 let total = useSelector(store => store.productsCart).total 

const actualizarPrecio = () => {
    let objetoStock = JSON.parse(localStorage.stock) 
    if (!idUser) {
        let suma = 0
        for (let obj in objetoStock) {
            suma = suma + objetoStock[obj].precio
        }
       
        localStorage.setItem("total",JSON.stringify(suma))
        dispatch(mostraTotal(JSON.parse(localStorage.total)))
    }   
    if(idUser){
    var total  =  cantidadUser.reduce((acc,curr) => {
        return acc = acc+ (parseInt(curr.price)*curr.cantidad)
    },0)
    dispatch(mostraTotal(total))
}
}


        return(
            <Container >
                <Checkout step1 step2 step3></Checkout>
                <Navbar className={styles.heaedr}>
                    <Navbar.Collapse className="justify-content-start">
                        <Navbar.Brand> Detalles de la orden </Navbar.Brand>
                    </Navbar.Collapse>
                        <Nav className="mr-auto">
                        </Nav>
                </Navbar>   
             <Container className={styles.lista} >
               {  
                prodGuardados
                  ?
                prodGuardados.map(producto=>{
                    return(
                        <div>
                            <OrderLine producto={producto}/>
                                 <hr class="clearfix w-100"/>
                        </div>
                          )
                    })
                    :
                    <div></div>
                } 
              <Container>             
                    <Navbar className={styles.heaedr2}>
                        <Navbar.Collapse className="justify-content-start" >
                           <Navbar.Brand>Resumen</Navbar.Brand>
                        </Navbar.Collapse>
                    </Navbar>
                        <Card className={styles.total}>
                            <div className={styles.items}> 
                        <Card.Subtitle>Items</Card.Subtitle>
                                <p>{listaProductos.length}</p>
                            </div>
                            <div className={styles.precioFinal}>
                        <Card.Subtitle>TOTAL</Card.Subtitle>
                            <Card.Subtitle>{
                                total
                            }</Card.Subtitle>

                            </div> 
                     <Card.Footer className={styles.boton}>
                        <Link to={`/cart`}>
                        <Button className={styles.botonAtras+' '+styles.button}>Atras</Button>
                        </Link>
                    </Card.Footer>
                 </Card>
                </Container>  
              </Container>
             </Container>
        )
    }
