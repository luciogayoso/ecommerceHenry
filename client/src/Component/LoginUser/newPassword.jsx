import React,{ useState } from 'react';
import { Button, CssBaseline, TextField} from '@material-ui/core';
import { Typography, Container } from '@material-ui/core';
import style from '../User/FormAddUser.module.css';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../actions/user';


export default function ResetPassword () {

  const [password, setPassword] = useState({
    id: window.location.search.split('=')[1],
    password: '',
    newPasswordRepit: ''
  })

  const dispatch = useDispatch();

  const obtenerPassword = (e) => {
    setPassword({
        ...password,
        [e.target.name]: e.target.value
    })
  }
 
  const cambiarPassword = () => {
    console.log(password)
      if(password.password === password.newPasswordRepit){
        console.log(password)
          dispatch(resetPassword(password));
          setPassword({
            ...password,
            password: '',
            newPasswordRepit: ''
          })
          window.location.href = '/login';
      }

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div >
        <Typography component="h3" variant="h5">Reset Password set new password</Typography>
        <form noValidate>
          <TextField
            type="password"
            value={password.password}
            onChange={obtenerPassword}
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="newPassword"
            label="newPassword"
            name="password"
            autoFocus
          /><br /><br />

          <TextField
            type="password"
            value={password.newPasswordRepit}
            onChange={obtenerPassword}
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="newPasswordRepit"
            label="repitPassword"
            name="newPasswordRepit"
            autoFocus
          /><br /><br />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={style.boton}
            onClick={cambiarPassword}
          >
            Reset
          </Button>
        </form>
      </div>

    </Container>
  );
}

