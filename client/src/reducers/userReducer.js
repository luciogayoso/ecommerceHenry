import { 
    LOGIN_USER, 
    LOGOUT_USER,
    USER_PROFILE, 
    GET_FAVORITES
} from '../actions/user';


const initialState = {
user: [],
favorites:[]
}
export default (state = initialState, actions) => {
switch (actions.type) {


    case LOGIN_USER:
        return {
            
            user: actions.user
           
        }
    case LOGOUT_USER:
            return state;

    case USER_PROFILE:
        return{
            user: actions.user
        }
    case GET_FAVORITES:
        console.log(actions.favs.data[0].id)
            return {
                ...state,
                favorites: actions.favs.data
            }
    default:
        return state;
}

}
