import {enviarAlCarritoLocalStorage,sumarCarritoLocal} from '../carrito/localStorage'
import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import Cookies from 'universal-cookie';
import FormReview from '../Review/FormReview.jsx';
import Reviews from '../Review/ReviewContainer.jsx';
import { AiOutlineHeart, AiFillHeart} from "react-icons/ai";
import axios from 'axios';

//ACTIONS
import {mostrarProducto_id,mostrarReviews} from "../../actions/products.js";
import {agregarProductoCarrito} from '../../actions/cart.js';

//ESTILOS/BOOTSTRAP
import styles from './Product.module.css';
import { BiArrowBack,BiCart} from "react-icons/bi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Image,Container, Button,Form } from 'react-bootstrap';

export default function Product(props) {
    //estado store reducer
    const productosCarrito = useSelector(state=>state.productsCart).stockProduct;
    const {selectedProduct,reviews} = useSelector(state=>state.products);
    const reviewsP=reviews
    const { name, description, price, stock, img }=selectedProduct;
    //selecciono producto por id 
        const id = props.match.params.id;
        const dispatch=useDispatch();
        let prodStock = JSON.parse(localStorage.stock)[id]

        let base64ToString;
        (img) && (base64ToString = Buffer.from(img.data, "base64").toString())
    
    //estado local
    const [cantidad, setCantidad] = useState(1)
    const [heart,setHeart]=useState(<AiOutlineHeart className={styles.heart}/>)
    const [valueHeart,setvalueHeart]=useState(false)

    //id user de cookies
    const cookies= new Cookies();
    const idUserCookie=cookies.get('id')
    

//obtengo id de usuario log
const userlog=useSelector(state=>state.user)
const idUser=userlog.user.id
console.log(idUser)
//console.log('SELECTED PRODUCT',selectedProduct)
    
    useEffect(()=>{
        
        if(selectedProduct.like===true){
            setHeart(<AiFillHeart className={styles.heart}/>);
            setvalueHeart(true)

        }else{
            setHeart(<AiOutlineHeart className={styles.heart}/>)
            setvalueHeart(false)
        }
        setCantidad(1)
        dispatch(mostrarProducto_id(id))
        dispatch(mostrarReviews(id))

    },[])

    const actualizarReviews=()=>{
        dispatch(mostrarReviews(id))
    }

    const deleteFavorite=async(idUser, productId)=>{
        return await  axios.delete(`http://localhost:3000/user/${idUser}/favorite/${productId}`)
        .then((resp)=>{
            // console.log(resp)

        })
        .catch((err)=>{
            console.log('error:', err)

        })
        
    }

    const handleFav=()=>{
        
        if(valueHeart===false && idUserCookie){
          axios.post(`http://localhost:3000/user/${idUserCookie}/favorite`, {productId:id})
          .then((fav)=>{
              // console.log(fav)

          })           
          setHeart(<AiFillHeart className={styles.heart}/>);
          setvalueHeart(true)
        }
        if(valueHeart===true && idUserCookie){
         
          setHeart(<AiOutlineHeart className={styles.heart}/>);
          setvalueHeart(false)
          deleteFavorite(idUserCookie, id)

          
        }
    }

    //store carrito  
    console.log(stock)
    const sumarProdLocalStorage=()=>{
            let prodStock = JSON.parse(localStorage.stock)[id]
            sumarCarritoLocal(prodStock,cantidad,selectedProduct,id)
    }

    const cambiarCantidad=(e)=>{
        let prodStock = JSON.parse(localStorage.stock)[id]
        if( !prodStock && e.target.value>stock){
            alert(" no hay stock suficiente")
            setCantidad(stock)
            return
        }

        if(prodStock && e.target.value>prodStock.stock){
            alert("2 no hay stock suficiente")
            setCantidad(prodStock.stock)
            return
        }
        setCantidad(e.target.value)
    }
    console.log(prodStock)

const sumarAlCarrito = ()=>{
    console.log(productosCarrito)
    let prodStock = JSON.parse(localStorage.stock)[id]

    const idUser=userlog.user.id

    if(idUser){
        var productos_line={
            productId:parseInt(id),
            cantidad:cantidad,
            price:price,
            estado:"carrito"}

        dispatch(agregarProductoCarrito(idUser,productos_line,selectedProduct))
   }
     
// si el producto no existe lo agrega 
    if(!prodStock && cantidad<=stock){
            sumarProdLocalStorage()
            enviarAlCarritoLocalStorage(selectedProduct)
            return 
        }
 //si el prod exite, verifica el stock no existe lo agrega        
    if(prodStock && prodStock.stock>0){
            sumarProdLocalStorage()
            return 
        }
    }
        
    let botones = <Form >
    <Form.Label id="cantidad">Cantidad</Form.Label>
    <Form.Control value={cantidad} onChange={cambiarCantidad} placeholder="1" min={1} max={stock} className={styles.cantidad} type="number"/>
    <Button onClick={sumarAlCarrito} className={styles.boton +' '+ styles.boton1} 
       ><BiCart/> AGREGAR AL CARRITO</Button>
     <Link to="/cart">
        <Button onClick={sumarAlCarrito} className={styles.boton +' '+ styles.boton2} 
        >COMPRAR AHORA</Button>
    </Link>
    </Form>

    let cartel = <div className={styles.sinstock}>
    <h4>Sin Stock</h4>
    <p>Lo sentimos, no disponemos de este articulo por el momento. Pronto lo tendremos de vuelta!</p>
    </div>

        
    return (<div>
        <Container className={styles.container}>
            <Card className={styles.card}>
            
                    <Link className={styles.botonlink} to={`/products`}>
                        <BiArrowBack/>
                    </Link>
                    <div className={styles.imagen}>
                        <div className={styles.contenedorImg}>
                            <Image className={styles.img}
                            src={base64ToString} />
                        </div>
                    </div>
                    <Card.Title className={styles.titulo}>
                    <div id='fav' className={styles.heartdiv} onClick={handleFav}>
                { idUserCookie?
                heart: <></>}
            </div>
                        {name}

                    </Card.Title>

                    <Card.Subtitle className={styles.stock}>{prodStock ? prodStock.stock : stock} disponibles
                        <hr class="clearfix w-100"/>
                    </Card.Subtitle>
                    <Card.Text className={styles.descrip}>
                    
                        {description}
                    
                    </Card.Text>
                    <Card.Subtitle className={styles.precio}>
                        <hr class="clearfix w-100"/>
                        {'$'+price}</Card.Subtitle>

                    <Card.Footer className={styles.botones}>
                                 
                        
                        {(idUser && stock==0) || (prodStock && prodStock.stock==0) ? cartel : botones}
                    </Card.Footer>
                  
            </Card>
        
        <p></p>
        <Reviews Reviews={reviewsP}></Reviews>
        <p></p>
        <FormReview id={id} ></FormReview>
        </Container>
        </div>
    )

}

