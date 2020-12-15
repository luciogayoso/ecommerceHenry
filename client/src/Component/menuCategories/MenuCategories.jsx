import React, {useEffect, useState} from 'react';
import styles from './menuCategories.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import { useDispatch,useSelector} from 'react-redux';
import {mostrarProducto_category,mostrarProductos} from '../../actions/products.js';
import {listCategory} from '../../actions/category.js';
import { BiCheckboxSquare, BiCheckbox } from "react-icons/bi";

export default function MenuCategories(props) {
    const dispatch=useDispatch();
    const prod=useSelector(store=>store.products);
    const categ=useSelector(store=>store.category);
    const categories=categ.category;
    console.log()
    useEffect(()=>{
         dispatch(listCategory())
     },[]);
   
    return (
            <Nav  className={`flex-column ${styles.main_menu}`}>

                    <div className={styles.centrar}>
                        Categorias
                    </div>
                    <hr class="w-100"></hr>
                    <Link onClick={()=>{dispatch(mostrarProductos())}} className={`text-decoration-none ${styles.text}`} to='/products'
                        className={styles.text}>
                        Todos
                        {window.location.href.split("/")[5]
                        ?
                        <BiCheckbox/>
                        :
                        <BiCheckboxSquare/>
                        }
                    </Link>
                {   
                    categories 
                    ?
                    categories.map(cat=>{
                        return(
                          
                            <Link  to={`/products/category/${cat.id}`}
                                    onClick={()=>{dispatch(mostrarProducto_category(cat.id))}}
                                    className={`text-decoration-none ${styles.text}`}>
                                     {cat.name} 
                                    {window.location.href.split("/")[5]==cat.id
                                    ?
                                    <BiCheckboxSquare/>
                                     :
                                    <BiCheckbox/>}
                            </Link>   
                        )
                    })
                    :
                    <div></div>
                }
               
            </Nav>
        

 

    )

}

