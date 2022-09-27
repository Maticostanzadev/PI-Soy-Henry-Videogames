import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGames, getGenres } from '../../redux/actions';
import Cards from '../Cards/Cards';
import NavHome from '../NavHome/NavHome'

import './home.css'

export default function Home() {

  let allGames = useSelector(state => state.allGames)
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

  useEffect(() => {
    if (!allGames.length) {
      dispatch(getGames())
    }
  }, [])

  useEffect(() => {

  })

  return (
    <div className='homeContainer'>
      <NavHome />
      <Cards />
    </div>
  )
}