import React from "react";
import { Link } from "react-router-dom";
import CardsRecharge from "../Cards recharge/CardsRecharge";
import SearchBar from "../SearchBar/SearchBar";
import './nav.css'

export default function Home() {
  return (
    <div className="navCointainer">
      <SearchBar />
      <CardsRecharge />
      <Link className="link" to="/videogames/create">Agregar nuevo Juego</Link>
    </div>
  )
}