import React from "react";
import { Link } from "react-router-dom";
import CardsRecharge from "../Cards recharge/CardsRecharge";
import Filters from "../Filters/Filters";
import SearchBar from "../SearchBar/SearchBar";
import './navHome.css'

export default function NavHome() {
  return (
    <div className="navHomeContainer">
      <SearchBar />
      <CardsRecharge />
      <Filters />
    </div>
  )
}