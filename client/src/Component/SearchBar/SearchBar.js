import React from 'react';
import styles from './searchbar.module.css';
import { ImSearch } from "react-icons/im";
import {Button} from 'react-bootstrap';
import { mostrarBusqueda, mostrarProductos } from '../../actions/products';
import { useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';

const SerchBar = () => {

    const dispatch = useDispatch();

    const handlerSerch = (e) => {
        //setSerch(e.target.value);
        let value = e.target.value;
        if (value !== '') {
            dispatch(mostrarBusqueda(e.target.value));
        }else {
        dispatch(mostrarProductos());
        }
    }

    return (

        <Link to={'/search'} className={styles.container}>
            <Button type="submit" className={styles.boton} variant="light" ><ImSearch/></Button>
            <input className={styles.buscador} type="text" placeholder="Buscar productos"
                onChange={handlerSerch} />
        </Link>

    )
}

export default SerchBar;