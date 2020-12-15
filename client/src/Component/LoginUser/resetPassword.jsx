import React,{ useState } from 'react';
import { Button, CssBaseline, TextField} from '@material-ui/core';
import { Typography, Container } from '@material-ui/core';
import style from '../User/FormAddUser.module.css';
import { useDispatch } from 'react-redux';
import { enviarEmail } from '../../actions/user';


export default function ResetPassword () {

  const [email, setEmail] = useState({
    email: ''
  })

  const dispatch = useDispatch();

  const obtenerEmail = e => {
    setEmail({
      email: e.target.value
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div >
        <Typography component="h3" variant="h5">Reset Password</Typography>
        <form noValidate>
          <TextField
            value={email.email}
            onChange={obtenerEmail}
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoFocus
          /><br /><br />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={style.boton}
            onClick={() =>  {
              dispatch(enviarEmail(email));
              setEmail({email:''});
              alert('Revise su casila de correo para recuperar su Password')
            }}
          >
            Reset
          </Button>
        </form>
      </div>

    </Container>
  );
}