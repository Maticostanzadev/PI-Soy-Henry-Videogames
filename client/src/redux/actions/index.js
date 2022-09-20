import axios from "axios";

export const GET_GAMES = "GET_GAMES"
export const GET_GAME_DETAILS = "GET_GAME_DETAILS"
export const GET_GENRES = "GET_GENRES"
export const GET_PLATFORMS = "GET_PLATFORMS"
export const CREATE_GAME = "CREATE_GAME"

export function getGames(game) {
  return function (dispatch) {
    return axios.get(`http://localhost:3001/videogames${game ? `?game=${game}` : ""}`)
      .then(response => {
        dispatch({ type: GET_GAMES, payload: response.data })
      })
  }
}

export function getGameDetails(id) {
  return function (dispatch) {
    return axios.get(`http://localhost:3001/videogame/${id}`)
      .then(response => {
        dispatch({ type: GET_GAME_DETAILS, payload: response.data })
      })
  }
}

export function getGenres() {
  return function (dispatch) {
    return axios.get(`http://localhost:3001/genres`)
      .then(response => {
        dispatch({ type: GET_GENRES, payload: response.data })
      })
  }
}

export function getPlatforms() {
  return function (dispatch) {
    return axios.get(`http://localhost:3001/platforms`)
      .then(response => {
        dispatch({ type: GET_PLATFORMS, payload: response.data })
      })
  }
}

export function createGame(info) {
  return function (dispatch) {
    return axios.post(`http://localhost:3001/videogame`, info)
      .then(response => {
        dispatch({ type: CREATE_GAME, payload: response.data })
      })
  }
}

