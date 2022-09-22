import { FILTER_BY_CREATED, FILTER_BY_GENRES, GET_GAMES, GET_GAME_DETAILS, GET_GENRES, GET_PLATFORMS, RESET_GAMES, SET_PAGE, SORT_NAME } from "../actions/index";

let initialState = {
  allGames: [],
  filteredsGames: [],
  filtersApplied: {
    genres: "All",
    created: "All",
    sort: "none",
  },
  gameDetails: {},
  allGenres: [],
  allPlatforms: [],
  currentPage: 1
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GAMES:
      return {
        ...state,
        allGames: action.payload,
        filteredsGames: action.payload
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
    case SET_PAGE:
      return {
        ...state,
        currentPage: action.payload
      }
    case RESET_GAMES:
      return {
        ...state,
        allGames: action.payload
      }
    case FILTER_BY_GENRES:
      let allGamesG = state.filteredsGames
      let gamesFilteredsG = action.payload === "All"
        ? state.filteredsGames
        : allGamesG.filter(g => g.genres.includes(action.payload))
      return {
        ...state,
        allGames: gamesFilteredsG
      }
    case FILTER_BY_CREATED:
      let allGamesC = state.filteredsGames
      let gamesFilteredsC = action.payload === "All"
        ? state.filteredsGames
        : action.payload === "DB"
          ? allGamesC.filter(g => g.created)
          : allGamesC.filter(g => !g.created)
      return {
        ...state,
        allGames: gamesFilteredsC
      }
    // case SORT_NAME:
    //   // if (action.payload === "default") 
    //   //   action.payload === "asc" ?

    //   return {
    //     ...state,
    //     allGames:
    //   }
    default:
      return state;
  }
}

export default rootReducer;