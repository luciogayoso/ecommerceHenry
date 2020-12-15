import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import clsx from 'clsx';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import { makeStyles, Container, OutlinedInput, Typography, InputAdornment, IconButton, FormControl, FormHelperText, Grid } from '@material-ui/core';
import { TextField, InputLabel, Avatar, MenuItem, Select} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import style from './FormAddUser.module.css';
import { useDispatch, useSelector} from 'react-redux';
import { BiArrowBack } from "react-icons/bi";
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie'
import { ImGift } from 'react-icons/im';
import { useEffect } from 'react';
import { listUser, addUser} from '../../actions/users';


const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(3),
            width: 350,
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '40ch',
        margin: theme.spacing(3),
    },
}));
function limpiarFormulario() {
    document.getElementById("form").reset();
}
//Funcion para crear un nueva cuenta de usuario
export default function FormAddUser() {

    const classes = useStyles();
    const dispach = useDispatch();
    const [user, setUser] = useState('');
    const [click, setClick]=useState(false);

    const [shownPass, setShownpass] = useState(false);
    const switchwShow = () => setShownpass(!shownPass);

    const onChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
   

    }
    const userlog=useSelector(state=>state.user)
    const usuarioLogueado=userlog.user
    const handlerSubmit=(e)=>{
        e.preventDefault();
        dispach(addUser(user))
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Registro Exitoso',
            showConfirmButton: false,
            timer: 1500
          })
          limpiarFormulario()
          if(!usuarioLogueado.name){
              window.location.href='./login'
          }
    }
    useEffect(() => {
        dispach(listUser())
        return () => {

        }
    }, [])
    return (

        <Container component="main" maxWidth="lg">
            <Card className={style.Card}>
          
             
                <form id="form" className={classes.root} noValidate autoComplete="on" onSubmit={(e)=>{handlerSubmit(e)}}>
                     
                    <br />
                    <Typography component="h1" variant="h5">Registrar Usuario:</Typography>
                    <Col>
                        <Row>
                            <TextField name="name"
                                label="First Name"
                                type="text"
                                variant="outlined"
                                fullWidth
                                onChange={onChange}
                            />
                            <TextField
                                name="lastname"
                                required
                                fullWidth
                                label="Last Name"
                                type="text"
                                variant="outlined"
            
                                onChange={onChange} />
                        </Row>
                        <Row>
                            <TextField name="dni"
                                label="DNI"
                                type="number"
                                variant="outlined"
                                onChange={onChange}
                                required
                                fullWidth />

                            <TextField name="email"
                                label="Email"
                                type="email"
                                variant="outlined"
                                onChange={onChange}
                                required
                                fullWidth />


                        </Row>
                        <Row>
                            <TextField name="username"
                                label="Username"
                                type="text"
                                variant="outlined"
                                onChange={onChange}
                                required
                                fullWidth />

                            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    name="password"
                                    type={shownPass ? 'text' : 'password'}
                                    onChange={onChange}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={switchwShow}
                                                edge="end"
                                            >
                                                {shownPass ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={72} />
                            </FormControl>

                        </Row>
                        <Row>
                            {/* {mostarTipos()  
                            } */}{ usuarioLogueado.typeUser==='Admin'?
                                 <FormControl variant="outlined" className={clsx(classes.margin, classes.textField)}>
                                <InputLabel >Type User</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    name="typeUser"
                                    onChange={onChange}
                                    label="Type User"
                                >
                                    <MenuItem value="">
                                        <em></em>
                                    </MenuItem>
                                    <MenuItem value='Admin'>Admin</MenuItem>
                                    <MenuItem value='cliente'>cliente</MenuItem>
                                </Select>
                            </FormControl> : <div></div>

                            }
                        

                        </Row>
                    </Col>
                    <Col>
                        <Grid container direction="column">

                            <Avatar alt="Remy Sharp" ></Avatar>
                        </Grid>

                    </Col>
                    <Button className={style.boton} type='submit'>Agregar</Button>
                </form>

            </Card>
        </Container>

    )
}