import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import * as AiIcons from 'react-icons/ai';
import * as HiIcons from 'react-icons/hi';
import style from './NavbarUser.module.css'
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';



export default function NavBarUser(props) {
    const [sidebarClass, setSidebarClass]=useState(props.sidebar)
    const closeHandler=(e)=>{
        e.preventDefault()
        setSidebarClass("sidebar close")
        props.close()
    
    }

  return(
       <div className={sidebarClass}>
         <div className={style.sidebar}>
           <button id="close" className={style.boton} onClick={closeHandler} ><AiIcons.AiOutlineClose/></button>
           <Link  className={style.link}to='/me'><span>Mi Perfil </span><HiIcons.HiOutlineUserCircle size="35px"/></Link>
           <Link className={style.link} to='/favoritos'><span>Favoritos </span><FavoriteIcon  size="35px"/></Link>
           <Link className={style.link} to='/compras'><span>Mis Compras </span><ShoppingBasketIcon  size="35px"/></Link>
         </div>
         
       </div>
   )

}