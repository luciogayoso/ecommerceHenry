import {
    ADD_USER,
    LIST_USERS, 
    EDIT_USER, 
    DELETE_USER,
    ORDER_USER
} from '../actions/users';


const initialState = {
users: [],
orders:[]
}
export default (state = initialState, actions) => {
switch (actions.type) {
   
    case LIST_USERS:
        return {
            ...state,
            users: actions.users.data
        }
    case ORDER_USER:
        return {
                ...state,
                orders: actions.orders.data
            }
    case ADD_USER:
            console.log(actions)
            return {
                ...state,
               users: state.users.concat(actions.users)
            }
    case EDIT_USER:
        return{
            ...state,
            users:state.users.map(user=> user.id ===actions.users.id? {
                ...user,
                ...actions.users
            }: user)
        }
    
    case DELETE_USER:
        console.log(actions)
    return {users: state.users.filter( id=>id !== actions.users.id)}

   
        
    default:
        return state;
}

}
