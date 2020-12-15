import axios from 'axios'
export const ADDRESS_USER='ADDRESS_USER';
export const GET_ADDRESS_USER='GET_ADDRESS_USER';

export function addressUser(idUser, address){
    return function(dispatch){
        return axios.post(`http://localhost:3000/user/${idUser}/address`, address,
        {withCredentials:true})
        .then((add)=>{
            dispatch({
                type:ADDRESS_USER,
                address:add
            })

        })
    }
}
export function getAddress(idUser){
    return function(dispatch){
        return axios.get(`http://localhost:3000/user/${idUser}/address`,
        {withCredentials:true})
        .then((add)=>{
          
            dispatch({
                type:GET_ADDRESS_USER,
                address:add.data
            })

        })
    }
}

