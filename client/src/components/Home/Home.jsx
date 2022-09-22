import React from 'react';
import Cards from '../Cards/Cards';
import NavHome from '../NavHome/NavHome'

import './home.css'

export default function Home() {
  return (
    <div>
      <div className='homeContainer'>
        <NavHome />
        <Cards />
      </div>
    </div>
  )
}