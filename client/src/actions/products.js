import axios from 'axios';
export const MOSTRAR_PRODUCTOS = "MOSTRAR_PRODUCTOS";
export const MOSTRAR_PRODUCTOID= "MOSTRAR_PRODUCTOID";
export const AGREGAR_PRODUCTOID= "AGREGAR_PRODUCTOID";
export const EDITAR_PRODUCTOID= "EDITAR_PRODUCTOID";
export const ELIMINAR_PRODUCTOID= "MOSTRAR_PRODUCTOID";
export const MOSTRAR_PRODUCTO_CATEGORY = "MOSTRAR_PRODUCTO_CATEGORY";
export const BUSCAR_PRODUCTOIDS = "BUSCAR_PRODUCTOIDS";
export const MOSTRAR_REVIEWS = "MOSTRAR_REVIEWS";
export const ENVIAR_REVIEW =  "ENVIAR_REVIEW"

//const fetch = require('node-fetch');

 export function mostrarProductos(){
    return function(dispatch){
        return axios.get('http://localhost:3000/products')

                .then(json=>{
                    dispatch({
                        type:MOSTRAR_PRODUCTOS,
                        productos:json
                    })
                })
                .catch(err=>{console.log(err)})

    }
}

export function mostrarProducto_id(id){
    return function(dispatch){
        return axios.get(`http://localhost:3000/products/${id}`)

                .then(json=>{
                    dispatch({
                        type:MOSTRAR_PRODUCTOID,
                        producto:json
                    })
                })
                .catch(err=>{console.log(err)})

    }
}

export function agregarProducto(product){
    return function(dispatch){
        return axios.post(`http://localhost:3000/products/`, product,{
         headers:{"Content-type":"application/json; charset=UTF-8"}})

                .then(json=>{
                    dispatch({
                        type:AGREGAR_PRODUCTOID,
                        producto:json
                    })
                })
                .catch(err=>{console.log(err)})

    }
}

export function editarProducto(product){
    return function(dispatch){
        return axios.put(`http://localhost:3000/products/${product.id}`, product, {
            headers:{"Content-type":"application/json; charset=UTF-8"}})
                .then(json=>{
                    console.log('json:',json)
                    dispatch({
                        type:EDITAR_PRODUCTOID,
                        producto:json})
                    })
                }
            }
            
export function mostrarProducto_category(id){
    return function(dispatch){
        return axios.get(`http://localhost:3000/products/category/${id}`)

                .then(json=>{
                    dispatch({
                        type:MOSTRAR_PRODUCTO_CATEGORY,
                        productos:json
                    })
                })
                .catch(err=>{console.log(err)})

    }
}


export function eliminarProducto(id){
    return function(dispatch){
        return axios.delete(`http://localhost:3000/products/${id}`)

                .then(json=>{
                    console.log('ENTRAMOS AL REDUCER DE ELIMINAR');
                    dispatch({
                        type:ELIMINAR_PRODUCTOID,
                        producto:json
                    })
                })
                .catch(err=>{console.log(err)})

    }
}

export function mostrarBusqueda(search){
    return function(dispatch){
        return axios.get(`http://localhost:3000/search/?query=${search}`)

                .then(json=>{   
                    dispatch({
                        type:BUSCAR_PRODUCTOIDS,
                        producto:json
                    })
                })
                .catch(err=>{console.log(err)})

    }
}

export function enviarReview(productId,review){
    return function(dispatch){
        return axios.post(`http://localhost:3000/products/${productId}/review`,review,)
        .then(review=>{
            console.log(review)
            dispatch({

                type:ENVIAR_REVIEW,
                review:review
            })
            
        })
        .catch(err=>{console.log(err)})
    }
}

export function mostrarReviews(productId){
    return function(dispatch){
        return axios.get(`http://localhost:3000/products/${productId}/review`)

                .then(json=>{   
                    //console.log('jsonDe reviews',json);
                    dispatch({
                        type:MOSTRAR_REVIEWS,
                        reviews:json
                    })
                })
                .catch(err=>{console.log(err)})

    }
}
