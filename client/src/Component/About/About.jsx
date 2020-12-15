import React from 'react';
import s from './about.css';
import luciano from "./images/luciano.jpg"
import seba from "./images/seba.jpg"
import delfi from "./images/delfi.jpg"
import flor from "./images/flor.jpg"
import mati from "./images/mati.jpg"
import leandro from "./images/leandro.jpg"
import lucio from "./images/lucio.jpg"
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Card, CardColumns, Button } from 'react-bootstrap';


let devs = [{name:"Arquel Luciano", stack:"Developer Full Stack Javascript", provincia:"Entre Ríos, Argentina.",link:"",img: luciano, info:""},
{name:"Betinotti Matias", stack:"Developer Full Stack Javascript", provincia:"Córdoba, Argentina.",link:"https://www.linkedin.com/in/matias-betinotti/",img: mati, info:"Amante de la tecnologia, dedicado y perseverante."},
{name:"Ferreyra Sebastián", stack:"Developer Full Stack Javascript", provincia:"Entre Ríos, Argentina.",link:"https://www.linkedin.com/in/sebastian-ferreyra/",img: seba, info:""},
{name:"Gayoso Lucio", stack:"Developer Full Stack Javascript", provincia:"",link:"",img: lucio, info:""},
{name:"Gonzalez Florencia", stack:"Developer Full Stack Javascript", provincia:"Tucumán, Argentina.",link:"https://www.linkedin.com/in/florgonzalez27/",img: flor, info:""},
{name:"Lago Delfina", stack:"Developer Full Stack Javascript", provincia:"Rio Negro, Argentina.",link:"Linkedin www.linkedin.com/in/delfina-lago-b6b2b8145",img: delfi, info:""},
{name:"Prokopio Leandro", stack:"Developer Full Stack Javascript", provincia:"Misiones, Argentina.",link:"https://www.linkedin.com/in/leandro-prokopio-8882321ba",img: leandro, info:""}]


export default function About() {
  return (
    <div className='ml-3' >
      <span style={{textAlign: "center"}}>
        <h1 style={{ color: '#3f51b5', fontWeight: 'bold' }}>Somos Tech Store</h1>
        <h4> Lideres en Tecnologia </h4>
        <p> - </p>
      </span>
      

      <div style={{display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gridGap: "2em",
  gridAutoRows: "minmax(100px auto)"}}>


        { devs && devs.map(dev=> 
        
              <div className={s.imgNosotros} style={{ display: "flex",width: "auto",maxHeight: "250px",borderRadius: "2px",boxShadow: "1px 1px 4px 2px rgba(0, 0, 0, .2)"}}>
                <div style={{borderRight: "1px solid #ddd",padding: "20px",textAlign: "center", background: "#ecedee"}}>
                  <img src={dev.img} alt="dev" style={{heigth: "100px", width:"100px", borderRadius : "50%", boxShadow: "0 0 0 8px rgba(0, 0, 0, .06)",margin: "15px 20px" }}/>
                  <h5 style={{color: '#3f51b5'}}>{dev.name}</h5>
                  <p style={{fontSize:"10"}}>{dev.provincia}</p>
                </div>
                <div style={{background: "#fbfbfb",padding: "20px",textAlign: "center",position: "relative"}}>
                <p >{dev.stack}</p>
                  <p style={{margin: "20px 30px"}}>{dev.info}<br/>
                  </p>
                  <a href={dev.link} target="_blank">
                  <LinkedInIcon/>
                  </a>
                  
                </div>
              </div>


//   <Card style={{ width: '17.9rem' }}>
//     <Card.Img className='imgNosotros rounded-top' variant="top" src={dev.img} />
//   <Card.Body>
// <Card.Title style={{ color: '#3f51b5', fontWeight: 'bold' }}>{dev.name}</Card.Title>
//     <Card.Text class="col.sm">
//       {dev.stack} <br />
//               {dev.provincia}<br />
        
//               </Card.Text>
//             <a href={dev.link} target="_blank">
//               <Button variant="primary">Contactar</Button>
//             </a>
//           </Card.Body>
//         </Card>
        )}
        </div>

       

    </div>
  )
}