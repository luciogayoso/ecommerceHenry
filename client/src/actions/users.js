import axios from 'axios';

export const ADD_USER='ADD_USER';
export const LIST_USERS='LIST_USERS';
export const DELETE_USER='DELETE_USER';
export const EDIT_USER= 'EDIT_USER';
export const ORDER_USER='ORDER_USER';


export function listUser(){
    return function(dispatch){
        return axios.get('http://localhost:3000/user',
        {withCredentials: true})
        .then(user=>{
            dispatch({
                type: LIST_USERS,
                users:user
            })
        })
    }
}

export function listOrder(idUser){
    return function(dispatch){
        return axios.get(`http://localhost:3000/user/${idUser}/orders`,
        {withCredentials: true})
        .then(ord=>{
            dispatch({
                type: ORDER_USER,
                orders:ord
            })
        })
    }
}

export function addUser(user){
   
    return function(dispatch){
        const newUser={
            name:user.name,
            lastname:user.lastname,
            dni:user.dni,
            email:user.email,
            username:user.username,
            password:user.password,
            image:user.image,
            typeUser:user.typeUser==='' ?  user.typeUser='cliente' : user.typeUser
        };
        return axios.post('http://localhost:3000/user', newUser)
        .then(us=>{
            console.log(us.data)
            dispatch({
                type: ADD_USER,
                users:us.data
            })
           
        })
       
    }
}

export function editUser(user){
    return function(dispatch){
        return axios.put(`http://localhost:3000/user/${user.id}`, 
        user,
       { withCredentials: true})
        .then(us=>{
            console.log(us)
            dispatch({
    
                type: EDIT_USER,
                users:us
            })
        })
       
    }
}
export function deleteUser(id){
    return function(dispatch){
        return axios.delete(`http://localhost:3000/user/${id}`,
        {withCredentials: true})
        .then((user)=>{
            dispatch({
                type: DELETE_USER,
                users:user
            })
        })
    }
}