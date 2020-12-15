import {AGREGAR_PRODUCTO_CARRITO,
    QUITAR_PRODUCTO_CARRITO,
    VACIAR_CARRITO,
    MOSTRAR_PRODUCTOS_CART,
    LISTA_ORDER_LINES,
    MOSTRAR_TOTAL,
    MODIFICAR_STOCK} from '../actions/cart.js';

const initialState={
selectedProduct:{},
productos:[],
stockProduct:[],
total:0
}


export default (state=initialState, actions)=>{
switch(actions.type){
  

    case LISTA_ORDER_LINES:
       console.log(actions)
        return{
            ...state,
            stockProduct:actions.orderLines,
            total:actions.orderLines?actions.orderLines.reduce((acc,curr)=>{return acc = acc + (parseInt(curr.price)*curr.cantidad)},0):0
        }
    case MODIFICAR_STOCK:
        let nuevoStock=state.stockProduct.map(prod=>{
            if(prod.productId===actions.cantidad.productId){
                prod = actions.cantidad
            }
            return prod
            })
            console.log(nuevoStock)
        return{
            ...state,
            stockProduct:nuevoStock,
            total:nuevoStock.reduce((acc,curr)=>{return acc = acc + (parseInt(curr.price)*curr.cantidad)},0)
        }
    case MOSTRAR_PRODUCTOS_CART:
       
        return{
            ...state,
            productos:actions.productos.data
        }

     case AGREGAR_PRODUCTO_CARRITO:
         var existe = state.stockProduct.filter(prod=>prod.productId == actions.producto.productId)[0]
         console.log(state.stockProduct)
         console.log(existe)
         
         console.log(actions.producto)
        return  {
            ...state,
            stockProduct: !existe ? state.stockProduct.concat(actions.producto) : state.stockProduct
        } 

     case QUITAR_PRODUCTO_CARRITO:
        var aux = state.stockProduct.filter(prod=>prod.id == actions.orderLine)[0]
        console.log(actions.idProduct)
        console.log(aux)
        return  {
            ...state,
            productos: state.productos.filter(prod=>prod.id !== actions.idProduct),
            stockProduct : state.stockProduct.filter(prod=>prod.id !== actions.orderLine),
            //total: state.total - (aux.price * aux.cantidad)
        } 
    case VACIAR_CARRITO:
        return  {
            ...state,
            productos: actions.producto
        }
    case MOSTRAR_TOTAL:
        return{
            ...state,
            total:actions.total
        }

    default:
        return state;
}

}