import React from 'react';
import CardsRecharge from '../Cards recharge/CardsRecharge';
import Cards from '../Cards/Cards';
import SearchBar from '../SearchBar/SearchBar';
import Paginated from '../Paginated/Paginated';
import './home.css'

export default function Home() {


  return (
    <div>
      <SearchBar />
      <CardsRecharge />
      <Paginated />
      <div className='homeContainer'>
        <h1>Acá tienen que aparecer las cartas</h1>
        <Cards />
      </div>
    </div>
  )
}