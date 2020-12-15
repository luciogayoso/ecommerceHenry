import React, { useEffect } from 'react';
import { Container, Card, Button, Navbar, Nav } from 'react-bootstrap';
import ItemCart from './ItemCart.jsx';
import styles from './Cart.module.css';
import { Link } from 'react-router-dom';
import { modificarStock, listPorductCart, orderLine,mostraTotal,quitarProdCarrito } from "../../actions/cart";
import { cambiarEstado } from '../../actions/order'
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie'


export default function Cart({islog}) {
    const idUser = islog.id
    const dispatch = useDispatch();
    useEffect(() => {
        idUser  && dispatch(listPorductCart(idUser))
        idUser && dispatch(orderLine(idUser))
        actualizarPrecio()
    },[])
    //obtengo los productos del usuario
    const prodGuardadosCartUser = useSelector(store => store.productsCart).productos
    const cantidadUser = useSelector(store => store.productsCart).stockProduct
    //obtengo los productos de localStorage
    let prodGuardadosLStorage = JSON.parse(localStorage.getItem("carritoLocal"))
    
    //selecciono la lista de items del carrito
    let listaProductos = prodGuardadosCartUser.length ? prodGuardadosCartUser : prodGuardadosLStorage
    //total
    let total = useSelector(store => store.productsCart).total 


    const vaciar = () => {

        if(idUser){
            for(let i=0;i<cantidadUser.length;i++){

                var prodEliminar={
                    productId: cantidadUser[i].productId,
                    cantidad:0
                }
                
                dispatch(modificarStock(idUser,prodEliminar))

                dispatch(quitarProdCarrito(cantidadUser[i].productId,cantidadUser[i].id))
            }
        }

        //localStorage
        localStorage.setItem("stock", JSON.stringify({}))
        localStorage.setItem("carritoLocal", JSON.stringify([]))
        localStorage.setItem("total", JSON.stringify(0))
        actualizarPrecio()
    }

    const borrar = (id) => {
        console.log(id)
        localStorage.setItem("carritoLocal", JSON.stringify(
            JSON.parse(localStorage.getItem("carritoLocal"))
                .filter(product => product.id !== id)))
        actualizarPrecio()
    }

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
    const checkoutHandler=()=>{
        //  
       window.location.href='./shipping'
    
       }

    return (
        <Container className={styles.container}>

            <Container className={styles.list}>
                <Navbar className={styles.heaedr}>
                    <Navbar.Collapse className="justify-content-start">
                        <Navbar.Brand> Lista de productos </Navbar.Brand>
                    </Navbar.Collapse>
                    <Nav className="mr-auto">
                        <Button onClick={vaciar} variant="outline-danger">VACIAR CARRITO</Button>
                    </Nav>
                </Navbar>

                <Container className={styles.lista}>
                    {

                        listaProductos
                            ?
                            listaProductos.map((producto, index) => {
                                var currentProd = {}
                                let cantidadLStorage = JSON.parse(localStorage.getItem("stock"))[[producto.id]]
                                var arr = cantidadUser.filter(prod => prod.productId == producto.id)
                                if (cantidadUser.length) {
                                    Object.assign(currentProd, arr[0])
                                    
                                }
                                console.log(cantidadLStorage)
                                return (
                                    <div>
                                        <ItemCart
                                            idUser={idUser ? idUser:''}
                                            currentProd={currentProd.cantidad ? currentProd: cantidadLStorage}
                                            key={index}
                                            borrar={borrar}
                                            producto={producto}
                                            actualizarPrecio={actualizarPrecio}
                                        />
                                        <hr class="clearfix w-100" />
                                    </div>
                                )
                            })
                            :
                            <div></div>
                    }
                </Container>

            </Container>

            <Container className={styles.totales}>

                <Navbar className={styles.heaedr}>
                    <Navbar.Collapse className="justify-content-start">
                        <Navbar.Brand> Resumen </Navbar.Brand>
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
                        <Button className={styles.botonCancelar + ' ' + styles.button}>Cancelar</Button>
                        <Link to='/shipping'><Button className={styles.botonAceptar+' '+styles.button} onClick={() => dispatch(cambiarEstado({id:idUser}))}>Finalizar Compra</Button></Link>
                    </Card.Footer>

                </Card>
            </Container>


        </Container>
    )

} 