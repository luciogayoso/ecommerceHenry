import React,{useState}  from 'react';
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import {Button, CssBaseline, FormControlLabel,Checkbox} from '@material-ui/core';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import { makeStyles, Typography, Container } from '@material-ui/core';
import Checkout from './Checkout'
import Swal from 'sweetalert2';
import './estilos.css'
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
 
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const alerta=()=>{
  let timerInterval
Swal.fire({
  title: 'Procesando Orden',
  timer: 2000,
  timerProgressBar: true,
  willOpen: () => {
    Swal.showLoading()  
    timerInterval = setInterval(() => {
      const content = Swal.getContent()
      if (content) {
        const b = content.querySelector('b')
        if (b) {
          b.textContent = Swal.getTimerLeft()
        }
      }
    }, 100)
  },
  onClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('I was closed by the timer')
  }
})
}


export default function Payment(props) {
  let total = useSelector(store => store.productsCart).total;
  const [buttonMP , setButtonMP] = useState(0);
    const classes=useStyles()
    const submitHandler=()=>{
        alerta()
        props.history.push('/order')
    }

    const obtenerBoton = () => {
      let objPago = {
          title: "probando",
          price: total,
          quantity: 1
      }
  
      if(buttonMP === 0){
      axios.post('http://localhost:3000/products/mercadoPago', objPago, {
          headers: { "Content-type": "application/json; charset=UTF-8" }
      })
          .then(id => {
              console.log(id);
              const script = document.createElement('script');
              script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
              script.async = true;
              script.setAttribute('data-preference-id', id.data);
              document.getElementById('mercadopago').appendChild(script);
              console.log(script);
          })
          setButtonMP(1);
          //siin el de abajcreo que pusiste con style
      }
  }


  return (
    <div>
    <Checkout step1 step2></Checkout>
    <Container component="main" maxWidth="xs"> 
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className="avatar" style={{backgroundColor: '#03a9f4'}}><CreditCardIcon/></Avatar>
        <Typography component="h1" variant="h5">Payment</Typography>
        <br/>
        <form className={classes.form} noValidate onSubmit={()=>{submitHandler()}}>
       <FormControlLabel
       
       label="Mercado Pago"
       control={
        <Checkbox
        onClick={obtenerBoton}
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
       
      />
       
       }
       /><p className=' ml-1 center' id='mercadopago'></p>
       
      <div>
     
            <Button
            className="boton"
            type="submit"
            fullWidth
            variant="contained"
          >
            Continuar
          </Button></div>
        </form>
      </div>
      
    </Container>

    </div>
    
  );
}