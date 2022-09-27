import React from "react";
import { Link } from "react-router-dom";
import './initialPage.css';

export default function InitialPage() {
  return (
    <div className="landingContainer">
      <Link to="/videogames">
        <button className="landingButton">
          <div className="landingIcon">
            <i className="fa-solid fa-circle-arrow-right"></i>
          </div>
          <span>COMENZAR</span>
        </button>
      </Link>
    </div>
  )
}