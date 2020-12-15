import React from 'react';
import BannerML from './BannerML/BannerML.jsx'
import Carrusel from './Carrusel'
import CarruselHeader from './CarruselHeader/CarruselHeader.jsx'
import style from './home.module.css'

export default function Home(){

  return (
    <div>
      <CarruselHeader/>
      <hr class="w-100"></hr>
      <BannerML />
      <hr class="w-100"></hr>
      <Carrusel/>
    </div>
  )
}