import React from "react";
import CardsRecharge from "../Cards recharge/CardsRecharge";
import Filters from "../Filters/Filters";
import SearchBar from "../SearchBar/SearchBar";
import './navHome.css'

export default function NavHome() {
  return (
    <div className="navHomeContainer">
      <CardsRecharge />
      <SearchBar />
      <Filters />
    </div>
  )
}