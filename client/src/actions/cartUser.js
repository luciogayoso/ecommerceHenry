import axios from 'axios';
export const AGREGAR_PRODUCTO_CARRITO = "AGREGAR_PRODUCTO_CARRITO";
export const QUITAR_PRODUCTO_CARRITO = "QUITAR_PRODUCTO_CARRITO";
export const VACIAR_CARRITO ="VACIAR_CARRITO";
export const MODIFICAR_STOCK="MODIFICAR_STOCK"; 
export const MOSTRAR_TOTAL ="MOSTRAR_PRECIO";


export function agregarProductoCarritoUser(id,product){
    return function(dispatch){
        return axios.post(`http://localhost:3000/user/${id}/cart'`, product,{
            withCredentials: true
        },{
         headers:{"Content-type":"application/json; charset=UTF-8"}})
                .then(json=>{
                    dispatch({
                        type:AGREGAR_PRODUCTO_CARRITO,
                        producto:json
                    })
                })
                .catch(err=>{console.log(err)})

    }
}


export function quitarProdCarrito(producto){
    return{
        type: QUITAR_PRODUCTO_CARRITO,
        producto
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

export function modificarStock(id,stock){
    return{
        type: MODIFICAR_STOCK,
        id,
        stock
    } 
}