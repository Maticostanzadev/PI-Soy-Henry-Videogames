import React from "react";
import { Link } from "react-router-dom";
import './initialPage.css';

export default function InitialPage() {
  return (
    <div className="container">
      <h1 className="title">BIENVENIDOS A LA PÁGINA DE LOS JUEGUITOS</h1>
      <Link to="/videogames">
        <button>Click aquí para ir a la página principal</button>
      </Link>
    </div>
  )
}