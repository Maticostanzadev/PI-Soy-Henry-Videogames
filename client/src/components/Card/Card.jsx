import React from 'react';
import './card.css'

export default function Card({ name, background_image, genres }) {
  return (
    <div className='cardContainer'>
      <img src={background_image} alt="Imagen" className='cardImg' />
      <div className="cardInfo">
        <div className='cardName'>
          {name}
        </div>
        <div className='cardGenres'>
          {genres
            ? genres.map(g => {
              return <div key={genres.indexOf(g)} className='cardGenre'>{g.name}</div>
            })

            : "No se saben los géneros"}
        </div>
      </div>
    </div>
  )
}