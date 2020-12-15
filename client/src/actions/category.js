import axios from 'axios';

export const ADD_CATEGORY= 'ADD_CATEGORY';
export const LIST_CATEGORY= 'LIST_CATEGORY';
export const EDIT_CATEGORY='EDIT_CATEGORY';
export const DELETE_CATEGORY='DELETE_CATEGORY';
export const LIST_CATEGORYPRODUCT = 'LIST_CATEGORYPRODUCT';

export function addCategory(cat){
    return function(dispatch){
        const newCategory={
            name: cat.name,
            description:cat.description
        };
        return axios.post('http://localhost:3000/category',newCategory)
        .then((cat)=>{
            dispatch({
                type:ADD_CATEGORY,
                category:cat.data
            })
        })
       

    }
}
export function listCategory(){
    return function(dispatch){
        return axios.get('http://localhost:3000/category')
        .then(json=>{
            console.log(json.data)
            dispatch({
                type:LIST_CATEGORY,
                category:json.data
            })
        })
    }
}
export function editCategory(id, name, description){
    
    return function(dispatch){
        return axios.put(`http://localhost:3000/category/${id}`,{
            name,
            description
        })
        .then((resp)=>{
            dispatch({
                type:EDIT_CATEGORY,
                id,
                category: resp
            })

        })
    }

}
export function deleteCategory(id){
    return function(dispatch){
        return axios.delete(`http://localhost:3000/category/${id}`)
        .then(cat=>{
            dispatch({
                type: DELETE_CATEGORY,
                category: cat
            })
        })
    }

}

export function listCategoryProduct(id){
    return function(dispatch){
        return axios.get(`http://localhost:3000/category/${id}`)
        .then(json=>{
            dispatch({
                type:LIST_CATEGORYPRODUCT,
                categoryProduct:json
            })
        })
    }
}