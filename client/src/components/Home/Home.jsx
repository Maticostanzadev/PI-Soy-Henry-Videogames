import React from 'react';
import Cards from '../Cards/Cards';
import Nav from '../Nav/Nav'

import './home.css'

export default function Home() {


  return (
    <div>
      <div className='homeContainer'>
        <Nav />
        <Cards />
      </div>
    </div>
  )
}