import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Form} from 'react-bootstrap';
import { makeStyles,Typography} from '@material-ui/core';
import style from './UserProfile.module.css';
import {editUser} from '../../actions/users'


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(3),
            width: '100%',
            height: 48,
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '35ch',
        margin: theme.spacing(3),
    },
}));


//Funcion para crear un nueva cuenta de usuario
export default function EditProfile() {

    const classes = useStyles();
    const usuario = useSelector(store => store.user)
   const user=usuario.user
    const [data, setData]=useState(user)
   
    const dispatch=useDispatch();
    const onChangeDate=(e)=>{
       setData({
        ...data,
        [e.target.name]:e.target.value
       })   
    }
  
    const handlerSubmit=(e)=>{
        e.preventDefault();
    
        // dispatch(editUser(updateData))

    }
    
    return (
        <>
        <form id="form" className={classes.root} noValidate autoComplete="on" >
                    <br />
                    <Typography component="h1" variant="h5">Account Details</Typography>
                    <br/>
                   <Card className={style.card} aling="center">
                           
                    <Form.Control 
                    className={style.Label}  
                    name="name" 
                    onChange={onChangeDate} 
                    defaultValue={usuario.user.name} />
                     <Form.Control 
                    className={style.Label}  
                    name="lastname" 
                    onChange={onChangeDate} 
                    defaultValue={usuario.user.lastname} />
                     <Form.Control 
                    className={style.Label}  
                    name="dni" 
                    onChange={onChangeDate} 
                    defaultValue={usuario.user.dni} />
                     <Form.Control 
                    className={style.Label}  
                    name="email" 
                    onChange={onChangeDate} 
                    defaultValue={usuario.user.email} />
                     <Form.Control 
                    className={style.Label}  
                    name="username" 
                    onChange={onChangeDate} 
                    defaultValue={usuario.user.username} />

                
                   </Card>  
            
                </form>
    
       </> 

        
    )
}
