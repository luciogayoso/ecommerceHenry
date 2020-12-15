import React,{useState} from 'react';
import style from './Catalogue.module.css'
import MenuCategories from '../menuCategories/MenuCategories.jsx'
import {useSelector, useDispatch} from 'react-redux';
import AllProducts from './AllProducts.jsx'
import {mostrarProductos} from '../../actions/products'
import { useEffect } from 'react';

export default function Catalogue(props) {
    useEffect(() => {
        dispatch(mostrarProductos())
    },[])
const productsl = useSelector(state=>state.products);
const dispatch = useDispatch();
let products = productsl.products;
console.log(products)

    return (
        <div className={style.container}>
            <div className={style.menu}>
                 <MenuCategories   />

            </div>
            <div id="contenido">
                <AllProducts productos={products}/>
            </div>

        </div>
    )
}