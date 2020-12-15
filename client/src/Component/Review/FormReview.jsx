import React,{ useEffect,useState} from 'react';
import {Form,Button} from 'react-bootstrap';
import { useDispatch} from 'react-redux';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';
import style from './FormReview.module.css'
import Box from '@material-ui/core/Box';
import {enviarReview} from "../../actions/products.js";
import Cookies from 'universal-cookie';
import axios from 'axios';

const labels = {
  1: 'Malo',
  2: 'Regular',
  3: 'Normal',
  4: 'Muy bueno',
  5: 'Excelente',
};

const useStyles = makeStyles({
  root: {
    width: 200,
  },
});
const StyledRating = withStyles({
    root: {
      color: "#4280ff",
    },
    iconFilled: {
      color: '#4280ff',
    },
    iconHover:{
        color: '#4280ff'
    },
  })(Rating);  

  //id user de cookies
  const cookies= new Cookies();
  const idUserCookie=cookies.get('id')


export default function FormReview({id}){
    const dispatch=useDispatch();
    const [formReview,setformReview] = useState(false);

    useEffect(()=>{
        
        if(idUserCookie){
            axios.get(`http://localhost:3000/user/${idUserCookie}/productoComprado/${id}`)
        .then(resp=>{
            console.log('resp',resp.data);
            setformReview(resp.data);
        })
        }

    },[formReview])

    const [value, setValue] = React.useState(1);
    const [hover, setHover] = React.useState(-1);
    const classes = useStyles();
    const [description,setDescription]=useState('');
    
    const handleDescription= (e)=>{
        console.log(e.target.value)
        setDescription(e.target.value)
        }

    const handleSubmit = (event)=>{
        event.preventDefault()
        const review={
            calificacion:value,
            descripcion:description,
            userId:idUserCookie
        }
     
        dispatch(enviarReview(id,review))
        setDescription(" ")
        setformReview(false)
        setValue(1)
    }

    return(
            (idUserCookie && formReview) ? <Form onSubmit={(e) => handleSubmit(e)} className={style.Container}>
                <Form.Group className={style.starContainer} ><StyledRating className={classes.star}
                    value={value}
                    precision={1}
                    defaultValue={1}
                    onChange={(event, newValue) => {
                        if(newValue!== null){
                            setValue(newValue);
                        }else{
                            setValue(1);
                        }
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    size="large"
                />
                    {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}</Form.Group>
                <Form.Group className={style.groupDescription}>
                    <textarea value={description} className={style.textDescription} placeholder='Descripcion...' onChange={handleDescription}></textarea>
                </Form.Group>
                <Form.Group className={style.reviewbutton}>
                    <Button  type='submit' variant="primary" >Enviar Review</Button>
                </Form.Group>
            </Form>:<></>
    )
}