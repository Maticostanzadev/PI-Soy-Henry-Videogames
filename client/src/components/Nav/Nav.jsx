import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css'

export default function Nav() {
  return (
    <div className="navContainer">
      <Link className="linkInitial link" to="/">Inicio</Link>
      <Link className="linkHome link" to="/videogames">Página principal</Link>
      <Link className="linkCreate link" to="/videogames/create">Agregar juego</Link>
    </div>
  )
}
