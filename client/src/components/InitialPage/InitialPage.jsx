import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { resetPlatforms } from "../../redux/actions";
import './initialPage.css';

export default function InitialPage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetPlatforms())
  })

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