import React from 'react'
import { Link } from 'react-router-dom'
import './estilos.css'


export default function Checkout(props) {
 
  return (
    <div className='checkoutsteps'>
      <div className={props.step1 ? 'active' : ''} >Shipping</div>
      <div className={props.step2 ? 'active' : ''} >Payment</div>
      <div className={props.step3 ? 'active' : ''} >Order</div>
    </div>
  )

}