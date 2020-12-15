import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './technav1.png';
import { NavDropdown} from 'react-bootstrap';
import styles from './navbar.module.css';
import {useDispatch,useSelector} from 'react-redux'
import SearchBar from '../SearchBar/SearchBar.js';
import {Avatar, MenuItem} from '@material-ui/core';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {BiHome} from 'react-icons/bi';
import {logoutUser} from '../../actions/user'
import Cookies from 'universal-cookie'

export default function NavBar (islog){
    const prodUsuario = useSelector(store => store.productsCart).productos
    const cookies=new Cookies();
    let prodLStorage = JSON.parse(localStorage.getItem("carritoLocal"))
    let id_user=cookies.get('id')
    let username=cookies.get('username')
    let typeUser= cookies.get('typeUser')
    let notProd = prodUsuario.length ? prodUsuario.length : prodLStorage.length
    const limpiarCookies=()=>{
        
        cookies.remove('id',{path: '/'})
        cookies.remove('username', {path: '/'})
        cookies.remove('name', {path: '/'})
        cookies.remove('typeUser',{path:'/'})
    
    }

    const dispatch=useDispatch();
    const usuario=islog.islog 

    document.addEventListener("DOMContentLoaded", function () {
        let mybutton = document.getElementById("myBtn");

        
        window.onscroll = function () { scrollFunction() };


        function scrollFunction() {
            
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                mybutton.style.display = "block";
            } else {
                mybutton.style.display = "none";
            }
        }
        
    });
   
    function topFunction() {
        document.body.scrollTop = 0; 
        document.documentElement.scrollTop = 0; 
    }

return (
    <>
    <nav className={styles.nav}>
        <div className={styles.logo}>        
            <Link to={'/'}>
                <img className={styles.logotech} src={Logo} width="90" height="40" alt="" />
            </Link> 
            <Link to={'/'}>
                <BiHome className={styles.iconos}/>
            </Link>
        </div>
        <div className={styles.search}>
            <SearchBar/>
        </div>
        <div className={styles.navSec}>
            <Link className={styles.navBoton} to={'/about'}>
                <span>Nosotros</span>
            </Link>
            <Link className={styles.navBoton} to={'/products'}>
               <span>Catalogo</span>
            </Link>
            <Link className={ styles.container_carrito } to={'/cart'}>
                <AiOutlineShoppingCart className={styles.icono_carrito}/>
                    {
                        notProd?
                        <span className={styles.notCarrito}>{notProd}</span>
                        : ''
                    }
            </Link>
                {  typeUser && typeUser==='Admin'
                    ? 
                    <Link className={styles.navSec +" "+styles.navBoton} to={'/admin'}>Admin</Link>
                    : <div></div>
                }
        </div>
        <div className={styles.user}> 
                {
           
          ( (id_user && id_user)||(usuario.id) ) ?
            <>
            <span className={styles.navSec}>{username ? username : usuario.name }</span>
            <NavDropdown> 
                <MenuItem onClick={()=>{window.location.href='/me'}} >Mi Perfil</MenuItem>
                <MenuItem onClick={()=>{window.location.href='/compras'}}>Mis Compras</MenuItem>
                <MenuItem onClick={()=>{window.location.href='/cart'}}>Carrito</MenuItem>
                <MenuItem onClick={()=>{ limpiarCookies();
                    dispatch(logoutUser())}} >Sign out</MenuItem>
            </NavDropdown>
            </>
            : 
            <div></div>
            }
             {
              ( (id_user && id_user)||(usuario.id) )?
             <Link to='/me'><Avatar style={{background:"#3f50b5"}}  /> </Link>:
             <Link to='/login'><Avatar style={{background:"#3f50b5"}}/> </Link>
            }
        </div>
    </nav>
    <div className={styles.background}></div>
    <button onClick={topFunction} id="myBtn" className={styles.myBtn} title="Go to top"><i className="fas fa-chevron-up"></i></button>
    </>
 )
}
