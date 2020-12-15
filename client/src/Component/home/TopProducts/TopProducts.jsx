import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import styles from './TopProducts.module.css';
import { BiArrowBack } from "react-icons/bi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Image, Container, Button } from 'react-bootstrap';

export default function TopProducts({Product}) {
    console.log(Product)

    let base64ToString;
   (Product.img) && (base64ToString = Buffer.from(Product.img.data, "base64").toString())
    return (
        <Container className={styles.container}>
            <Card className={styles.card}>
                    <div className={styles.imagen}>
                        <Image className={styles.img} 
                            src={base64ToString} 
                        rounded />
                    </div>
                    <Card.Title className={styles.titulo}>{Product.name}</Card.Title>
                   
                    <Card.Text className={styles.descrip}>
                    <hr class="clearfix w-100"/>
                        {Product.description}
                    </Card.Text>

                    <Card.Subtitle className={styles.precio}>{'$'+Product.price}</Card.Subtitle>
                    
                     <Card.Footer className={styles.botones}>
                     <Link to={`/products/${Product.id}`}>
                        <Button className={styles.boton +' '+ styles.boton1} variant="secondary">Ver Producto</Button>
                    </Link>
                    </Card.Footer> 
                  
            </Card>
        </Container>
    )

}