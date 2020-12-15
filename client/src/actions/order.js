import axios from 'axios';

export const LIST_ORDERS='LIST_ORDERS';
export const ORDER_ID='ORDER_ID';
export const CAMBIAR_ESTADO_ORDER = 'CAMBIAR_ESTADO_ORDER';
export const CANCELAR_ESTADO_ORDER = 'CANCELAR_ESTADO_ORDER';
export const CAMBIAR_ESTADO_ORDER_ENVIADO = 'CAMBIAR_ESTADO_ORDER_ENVIADO';

export function listOrders(){
    return function(dispatch){
        return axios.get('http://localhost:3000/orders')

        .then(json=>{
            dispatch({
                type:LIST_ORDERS,
                orders:json
            })
        })
        .catch(err=>{console.log(err)})

    }
    
};

export  function findbyId(id){
    return function(dispatch){
        return axios.get(`http://localhost:3000/orders/${id}`,{
            withCredentials: true,
        })

        .then(json=>{
            dispatch({
                type:ORDER_ID,
                orders:json
            })
        })
        .catch(err=>{console.log(err)})

    }
    
}

export  function cambiarEstado(data){
    return function(dispatch){
        return axios.get(`http://localhost:3000/orders/state/${data.id}/false`,{
            withCredentials: true,
        })
        .then(json=>{
            dispatch({
                type:CAMBIAR_ESTADO_ORDER,
                orders:json
            })
        })
        .catch(err=>{console.log(err)})

    }
    
}


export  function cancelarEstadoOrden(id){
    return function(dispatch){
        return axios.get(`http://localhost:3000/orders/state/${id}/true`,{
            withCredentials: true,
        })
        .then(json=>{
            dispatch({
                type:CANCELAR_ESTADO_ORDER,
                orders:json
            })
        })
        .catch(err=>{console.log(err)})

    }
    
}


export  function cambiarEstadoEnviado(data){
    return function(dispatch){
        return axios.get(`http://localhost:3000/orders/state/${data.id}/${data.estdo}`,{
            withCredentials: true,
        })
        .then(json=>{
            dispatch({
                type:CAMBIAR_ESTADO_ORDER_ENVIADO,
                orders:json
            })
        })
        .catch(err=>{console.log(err)})

    }
    
}