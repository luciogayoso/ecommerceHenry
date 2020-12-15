import React, { Fragment } from 'react'
import style from './NavbarUser.module.css'
import * as HiIcons from 'react-icons/hi';


export default  function Tooggle(props){
    return(
        <Fragment>
            <button className={style.tooggle} onClick={props.onClick}><HiIcons.HiOutlineViewList/></button>
        </Fragment>
    )
}