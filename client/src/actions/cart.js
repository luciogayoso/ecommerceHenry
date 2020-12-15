import axios from 'axios'
//headers: { "Content-type": "application/json; charset=UTF-8" }
export const AGREGAR_PRODUCTO_CARRITO = "AGREGAR_PRODUCTO_CARRITO";
export const QUITAR_PRODUCTO_CARRITO = "QUITAR_PRODUCTO_CARRITO";
export const VACIAR_CARRITO ="VACIAR_CARRITO";
export const MODIFICAR_STOCK="MODIFICAR_STOCK"; 
export const MOSTRAR_TOTAL ="MOSTRAR_PRECIO";
export const MOSTRAR_PRODUCTOS_CART = "MOSTRAR_PRODUCTOS_CART";
export const LISTA_ORDER_LINES = "LISTA_ORDER_LINES";

export function listPorductCart(idUser){
    return function(dispatch){
        return axios.get(`http://localhost:3000/user/${idUser}/cart`)
        .then(productos=>{
            dispatch({
                type:MOSTRAR_PRODUCTOS_CART,
                productos
            })
        })
    }
}

export function orderLine(idUser){
    return function(dispatch){
        return axios.get(`http://localhost:3000/user/${idUser}/orderLines`)
        .then(respuesta=>{
            console.log(respuesta)
            dispatch({
                type:LISTA_ORDER_LINES,
                orderLines:respuesta.data.order_lines
            })
        })
    }
}

export function agregarProductoCarrito(idUser,producto){
    return function(dispatch){
        return axios.post( `http://localhost:3000/user/${idUser}/cart`, producto,{
            headers:{"Content-type":"application/json; charset=UTF-8"}})
            .then(respuesta=>{
                console.log(respuesta)
                dispatch({
                    type: AGREGAR_PRODUCTO_CARRITO,
                    producto:respuesta.data
                })
            })
        
    } 
}

export function quitarProdCarrito(idProduct,orderLine){
   return{
        type:QUITAR_PRODUCTO_CARRITO,
        orderLine:orderLine,
        idProduct:idProduct
   }
    
}

export function vaciarCarrito(){
    return{
        type: VACIAR_CARRITO,
        producto:[]
    } 
}

export function mostraTotal(total){
    return{
        type: MOSTRAR_TOTAL,
        total
    } 
}

export function modificarStock(idUser,cantidad){
    return function(dispatch){
        return axios.put(`http://localhost:3000/user/${idUser}/cart`,cantidad,{
            headers:{"Content-type":"application/json; charset=UTF-8"}})
            .then(resp=>{
                console.log(resp)
                dispatch({
                    type: MODIFICAR_STOCK,
                    cantidad:resp.data
                })
            })

        }
    }
    