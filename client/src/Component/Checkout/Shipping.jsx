import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import {Button, CssBaseline,TextField, Grid, makeStyles, Typography, Container} from '@material-ui/core';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { Row, Col } from 'react-bootstrap';
import Checkout from './Checkout'
import {addressUser} from '../../actions/address'
import Swal from 'sweetalert2';
import Cookies from 'universal-cookie';
import './estilos.css'


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#03a9f4'
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Shipping(props) {

    const classes=useStyles()
    const [address, setAddress]=useState('')
    const dispatch=useDispatch();
    const cookies = new Cookies();
    const id_user = cookies.get('id');
    const changeAddress=(e)=>{
      setAddress({
        ...address,
        [e.target.name]: e.target.value
      })
    }
  
    const dir=useSelector(store=>store.address)
    const submitHandler=(e)=>{
      e.preventDefault();
      if(id_user){
        dispatch(addressUser(id_user, address))
        console.log(dir)
        
        props.history.push('/payment')

      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Debes estar Registrado!',
          footer: '<a href="/login">Iniciar Sesion?</a>'
        })

      }
     
    }

  return (
    <div>
    {/* <Checkout step1 step2></Checkout> */}
    <Checkout step1></Checkout>
    <Container component="main" maxWidth="xs">
       
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className="avatar"><LocalShippingIcon/></Avatar>
        <Typography component="h1" variant="h5">Shipping</Typography>
        <form className={classes.form} noValidate onSubmit={(e)=>{submitHandler(e)}}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            onChange={changeAddress}
            label="Address"
            name="name"
            autoFocus
            required
          />
            <TextField
            variant="outlined"
            margin="normal"
            required
            type= "number"
            label="Number"
            name="number"
            onChange={changeAddress}
            autoFocus
          />
          <Row >
            <Col>
            <TextField
            variant="outlined"
            margin="normal"
            required
            label="City"
            name="city"
            onChange={changeAddress}
            autoFocus
          />
            </Col>
          
           <Col>
           <TextField
            variant="outlined"
            margin="normal"
            required
            label="PostalCode"
            name="postalCode"
            onChange={changeAddress}
            autoFocus
          />
           </Col>
         </Row>
          <br/>
       
            <Button
            className="boton"
            type='submit'
            fullWidth
            variant="contained"
            color="primary"
            disabled={(address.name && address.number && address.city && address.postalCode)? false: true}
          >
            Continue
          </Button>
        </form>
      </div>
      
    </Container>

    </div>
    
  );
}
