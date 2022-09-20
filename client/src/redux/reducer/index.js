import { CREATE_GAME, GET_GAMES, GET_GAME_DETAILS, GET_GENRES, GET_PLATFORMS } from "../actions/index";

let initialState = {
  allGames: [],
  allGamesCopy: [],
  gameDetails: {},
  allGenres: [],
  allPlatforms: [],
  filter: [],
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        allGames: action.payload,
        // allGamesCopy: action.payload
      }
    case GET_GAME_DETAILS:
      return {
        ...state,
        gameDetails: action.payload
      }
    case GET_GENRES:
      return {
        ...state,
        allGenres: action.payload
      }
    case GET_PLATFORMS:
      return {
        ...state,
        allPlatforms: action.payload
      }
    case CREATE_GAME:
      return {
        ...state
      }
    default:
      return state;
  }
}

export default rootReducer;