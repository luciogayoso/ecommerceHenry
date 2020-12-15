import axios from 'axios';
import Cookies from 'universal-cookie'


export const GET_FAVORITES='GET_FAVORITES';
export const LOGIN_USER='LOGIN_USER';
export const ENVIAR_EMAIL = 'ENVIAR_EMAIL';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const LOGOUT_USER='LOGOUT_USER';
export const USER_PROFILE='USER_PROFILE';


const crearCookie=(user)=>{
    const cookies=new Cookies();
    cookies.set('id',user.id,{path: '/'})
    cookies.set('username', user.username,{path: '/'})
    cookies.set('name', user.username,{path: '/'})
    cookies.set('typeUser', user.typeUser, {path:'/'})
}

export function getFavorites(userId){
    return function(dispatch){
        return axios.get(`http://localhost:3000/user/${userId}/favorite/`)
        .then((favorites)=>{
            dispatch({
                type: GET_FAVORITES,
                favs:favorites
            })
            
        })
    }
}


export function isLogged(){
    return function(dispatch){
        return axios.get('http://localhost:3000/auth/me',
        { withCredentials: true})
        .then((resp)=>{
            if(resp.data.loggedin){
                dispatch({
                    type: USER_PROFILE,
                    user:resp.data.user
                })
            }
           
            // console.log(resp.data.user)
        })
    }
}


export function loginUser(username, password){
    var cart=localStorage.getItem('carritoLocal')

    return function(dispatch){
        if(!cart){
          return  axios({
                method: "POST",
                data: {
                    username,
                    password
                },
                withCredentials: true,
                url: "http://localhost:3000/auth/login",
            })
        .then(res=>{
            return res.data})
        .then(response=>{
            if(response.success){
                dispatch({
                    type: LOGIN_USER,
                    user:response.user
                })
               crearCookie(response.user)
            //  window.location.href='./me'
            }
     
        })
       
        }
        else{
            return  axios({
                method: "POST",
                data: {
                    username,
                    password
                },
                withCredentials: true,
                url: "http://localhost:3000/auth/login",
            })
            .then((res)=>{
                return res.data
            })
            .then(response=>{
                if(response.success){
                    dispatch({
                        type: LOGIN_USER,
                        user:response.user
                    })
                crearCookie(response.user)
                agregarProdUsuario(response.user.id)
                localStorage.clear();
                window.location.href='./me'
               
                }
            })
        }
 }
}

export function enviarEmail(email){
    return function(dispatch){
        return axios.post(`http://localhost:3000/user/0/passwordReset`,email)
        .then((user)=>{
            dispatch({
                type: ENVIAR_EMAIL,
                user:user
            })
        })
    }
}

export function resetPassword(password){
    return function(dispatch){
        return axios.post(`http://localhost:3000/user/${password.id}/passwordReset`,password)
        .then((user)=>{
            dispatch({
                type: RESET_PASSWORD,
                user:user
            })
        })
    }
}

export function logoutUser(){
    return function(dispatch){
        return axios.get('http://localhost:3000/auth/logout', {
            withCredentials:true
        })
        .then((resp)=>{
            dispatch({
                type: LOGOUT_USER
            })
  
            localStorage.setItem("stock", JSON.stringify({}))
            localStorage.setItem("carritoLocal", JSON.stringify([]))
            localStorage.setItem("total", JSON.stringify(0))
            window.location.href='./products'

        })
    }
}

const agregarProdUsuario = (idUser)=>{
    let prodStock = JSON.parse(localStorage.stock)
    if(idUser){

        for(var prod in prodStock){
          var {cantidad,precio}=prodStock[prod]
          var productos_line={
                productId:parseInt(prod),
                cantidad:cantidad,
                price:precio,
                estado:"carrito"
            }
            axios.post(`http://localhost:3000/user/${idUser}/cart`, productos_line,{
             headers:{"Content-type":"application/json; charset=UTF-8"}})
                    .catch(err=>{console.log(err)})
        }
    }else{return}
  } 