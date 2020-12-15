import {ADD_CATEGORY, LIST_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, LIST_CATEGORYPRODUCT} from '../actions/category';

const initialState={
  category:[],
  categoryProduct:[]
}

export default (state=initialState, actions)=>{
    switch(actions.type){
        case ADD_CATEGORY:
            return  {
                ...state,
                category: state.category.concat(actions.category)
            }
        case DELETE_CATEGORY:
            return{
                category: state.category.filter( cat=> cat.id !== actions.category.id)
            }
        case EDIT_CATEGORY:
            console.log(actions)
            return {
                ...state,
                category: state.category.map((cat)=>cat.id=== actions.category.data.id? {...cat,...actions.category}: cat)
            }
        case LIST_CATEGORY:
            return{
                ...state,
                category: actions.category
            }
        case LIST_CATEGORYPRODUCT:
            return{
                ...state,
                categoryProduct: actions.categoryProduct.data
            }
        default:
            return state;
    }

}