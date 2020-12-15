import React from 'react';
import camion from './camion.png';
import mercado from './mercado.png';
import gps from './gps.png'

export default function Home(){
  return (
<div class="card-group">
  <div class="card">
   
    <div class="card-body">
    <div class="row">
        <div class="col">
          <img src={mercado} alt="img" style={{height: 110 , width:120, marginLeft: 25}}/>
        </div>
        <div class="col">
      <h4 class="card-title">Metodos de Pago</h4>
      <p class="card-text">Todas las tarjetas.</p>
        </div>
      </div>
    </div>
  </div>
  <div class="card">
    
    <div class="card-body">
      <div class="row">
        <div class="col">
          <img src={camion} alt="img" style={{height: 70 , width:110, marginLeft: 25, marginTop:20  }}/>
        </div>
        <div class="col">
      <h4 class="card-title" style={{marginTop:20}}>Envio Gratis</h4>
      <p class="card-text">en todos los productos</p>
        </div>
      </div>
      
    </div>
  </div>
  <div class="card">
    
    <div class="card-body">
    <div class="row">
        <div class="col">
          <img src={gps} alt="img" style={{height: 70 , width:110, marginLeft: 25, marginTop:20  }}/>
        </div>
        <div class="col">
      <h4 class="card-title" style={{marginTop:20}}>Envios a todo el pais!</h4>

        </div>
      </div>
    </div>
  </div>
</div>
 
  )
}