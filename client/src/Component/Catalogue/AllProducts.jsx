import React,{ useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard.jsx';
import style from './Catalogue.module.css'
import { useSelector,useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import './pagination.css';
import { GrFormPrevious,GrFormNext } from "react-icons/gr";
export default function AllProducts({productos}) {

const userlog=useSelector(state=>state.user)

const [page, setPage] = useState({  inicio:0,
                                    fin:0,
                                    allProducts:[],
                                    productsPage:[],
                                    porPagina:8,
                                    paginaActual:1,
                                    cantPaginas:0
})
useEffect(() => {
    setPagination()
},[productos])

if (productos!= undefined){
let sinStock = productos.filter(el => el.stock===0)
let conStock= productos.filter(el=> el.stock > 0)
productos = conStock.concat(sinStock)
}

const setPagination = ()=>{
    const slice = productos.slice(page.inicio, page.fin + page.porPagina)

    setPage({...page,
                allProducts:productos,
                cantPaginas:productos.length/page.porPagina,
                productsPage: slice})
}

const changePage = (e)=>{
    const selectedPage = e.selected+1;
    const slice = productos.slice(page.porPagina*selectedPage-page.porPagina, page.porPagina*selectedPage)
    setPage({...page,
        productsPage:slice})

}

console.log(page)
    return (
            <div className={style.productos}>
                { page.productsPage !== 0 ? 
                page.productsPage.map(product => {
                    return (<ProductCard userlog={userlog?userlog:""} Product={product} />)
                })
                :
                <h5>No hay publicaciones que coincidan con tu búsqueda.
                Revisá la ortografía de la palabra.
                Utilizá palabras más genéricas o menos palabras.</h5>
                }

                <div className={style.pagination}>
                    <ReactPaginate
                            previousLabel={<GrFormPrevious/>}
                            nextLabel={<GrFormNext/>}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={page.cantPaginas}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={changePage}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"}/>
                </div>
            </div>
        
    )

}
