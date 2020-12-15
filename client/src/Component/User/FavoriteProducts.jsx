import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
import { Card, Button, Col, Row} from 'react-bootstrap';
import {Container} from '@material-ui/core';
import style from './UserProfile.module.css'
import NavbarUser from './NavBarUser/NavbarUser'
import Tooggle from './NavBarUser/toogle'
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';
import axios from 'axios';



export default function FavoriteProducts() {
   
 
    const [sidebarOpen, setSidebarOpen]=useState(false)
    const dispatch=useDispatch();
    const cookies=new Cookies();
    const idUser=cookies.get('id')
    const [newfav, setNewfav]=useState('')
 
   
    const openHandler=()=>{
        if(!sidebarOpen){
            setSidebarOpen(true)
        }else{
            setSidebarOpen(false)
        }
    }
    const sidebarCloseHandler=()=>{
        setSidebarOpen(false)

    }
    let sidebar
    if(sidebarOpen){
        sidebar=<NavbarUser close={sidebarCloseHandler} sidebar={"sidebar"} />
    }

    const favoritos=()=>{
        let newfav="";
        axios.get(`http://localhost:3000/user/${idUser}/favorite`)
        .then((favorites)=>{
            
            // console.log(favorites.data)
            
           return favorites.data;  
        }).then(fav=>{
        //    return newfav=fav;
         setNewfav(fav)
            // console.log(fav)
        })
            
    }

    const quitarFav=async(idUser, productId)=>{
        return await  axios.delete(`http://localhost:3000/user/${idUser}/favorite/${productId}`)
        .then((resp)=>{
            // console.log(resp)
            window.location.href='/favoritos'

        })
        .catch((err)=>{
            console.log('error:', err)

        })
       
        
    }
    useEffect(()=>{
        favoritos()
    },[])
    
    return (

        <>
            <div>
                {sidebar}
                <Tooggle onClick={openHandler} />
            </div>
            <Container component="main" maxWidth="md"   background-color=" #fff">
              {(newfav.length>0)? newfav && newfav.map(item=>{
                  return(
                    <Card className={style.compras} >
                    <Card.Header  className={style.comprasHeader} style={{textAlign: "center"}}>
                     
                     <Link to={`/products/${item.id}`}>{item.name}</Link> 
                    </Card.Header>
                    <Card.Body>
                    <Card.Title >Img </Card.Title>
                    <Row>
                    <Col>
                    <Card.Img className={style.img} src={Buffer.from(item.img.data, "base64").toString()} alt="10px"/>
                    </Col>
                    <Col>
                    <figcaption className="itemDesc">
                        <h3 className="itemTitle">{item.description}</h3>
                        <div className="itemsSecondaryInfo">
                            <p className="price-info">{item.price}</p>
                        </div>
                    </figcaption>
                    </Col>
                    <Col>
                    <Link to={`/products/${item.id}`}><Button className={style.comprasDetalle}>ver detalle</Button></Link>
                    </Col>
                    <Col>
                     <Button  className={style.comprasDetalle} onClick={()=>{quitarFav(idUser,item.id)}} >Quitar Favorito</Button>
                    </Col>
                    </Row>
                    </Card.Body>
                   
                </Card>
                  )
              })
              : <div> <h5>Sin Favoritos</h5></div>
              }
           
            </Container>
      
        </>


    )
}
