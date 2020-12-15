import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import { isLogged } from '../../actions/user';
import { Card, Container } from '@material-ui/core';
import style from './UserProfile.module.css'
import NavbarUser from './NavBarUser/NavbarUser'
import Tooggle from './NavBarUser/toogle'
import EditProfile from './EditProfile'
import user1 from './user1.jpg'
import Cookies from 'universal-cookie';


export default function UserProfile() {


    const [sidebarOpen, setSidebarOpen] = useState(false)
    const usuario = useSelector(store => store.user)
    console.log(usuario.user.id)
    const cookies=new Cookies();
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(isLogged());
        
    }, [])
    const obtenerUser = ()=>{
        setTimeout(() => {

            if (!cookies.get('id')) {
    
                cookies.set('id', (usuario.user.id), { path: '/' })
                cookies.set('username', usuario.user.name, { path: '/' })
                cookies.set('typeUser', usuario.user.typeUser, { path: '/' })
            }
    
        }, 1000)
    }
   
    const openHandler = () => {
        if (!sidebarOpen) {
            setSidebarOpen(true)
        } else {
            setSidebarOpen(false)
        }
    }
    const sidebarCloseHandler = () => {
        setSidebarOpen(false)

    }
    let sidebar
    if (sidebarOpen) {
        sidebar = <NavbarUser close={sidebarCloseHandler} sidebar={"sidebar"} />
        console.log(sidebar)
    }

    return (
        <>
         <div>
                {sidebar}
                <Tooggle onClick={openHandler} />
            </div>

        <Container component="main" maxWidth="lg"   background-color=" #fff">
                <Card className={style.card}>
                    <Card classname={style.avatar}>
                        <br />
                        <img classname={style.img} src={user1} width="210" />
                        <br />
                        <h4>{usuario.user.name}</h4>
                        <span>{usuario.user.email}</span>

                    </Card>

                    <Container className={style.container} >
                        <EditProfile />

                    </Container>

                </Card>
        </Container>
        </>
    )
}