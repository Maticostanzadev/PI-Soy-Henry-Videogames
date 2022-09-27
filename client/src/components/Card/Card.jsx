import React from 'react';
import './card.css'

export default function Card({ name, background_image, genres, rating }) {
  return (
    <div className='cardContainer'>
      <div className='cardHover'>
        <div className='cardHoverRating'>
          <p>{rating}</p>
          <i className="fa-solid fa-star"></i>
        </div>
        <h4 className='cardHoverName'>{name}</h4>
        <div className='cardHoverGenres'>
          {genres
            ? genres.map(g => {
              return <p key={genres.indexOf(g)} >{g}</p>
            })
            : ""}
        </div>
      </div>
      <img src={background_image} alt="Imagen" className='cardImg' />
      <img src="https://geekflare.com/wp-content/uploads/2021/09/520401-pure-black-background-wallpaper.jpg" alt='Black' className="bgImg" />
      <div className="cardInfo" >
        <div className="cardInfoPpal">
          <h3 className='cardName'>
            {name}
          </h3>
          <div className='cardRating'>
            <h4>{rating}</h4>
            <i className="fa-solid fa-star"></i>
          </div>
        </div>
        <div className='cardGenres'>
          {genres
            ? genres.map(g => {
              return <p key={genres.indexOf(g)} className='cardGenre'>{g}</p>
            })

            : "No se saben los géneros"}
        </div>
      </div >
    </div >
  )
}