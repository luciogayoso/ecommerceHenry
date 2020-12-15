import {ADDRESS_USER, GET_ADDRESS_USER} from '../actions/address'

const initialState={
    address:[]
}
export default (state= initialState, action)=>{
    switch(action){
        case ADDRESS_USER:
            return{
                ...state,
                address: action.address
            }
        case GET_ADDRESS_USER:
            console.log(state.address)
            return{
                ...state,           
                address: action.address
            }
        default:
            return state
    }

}