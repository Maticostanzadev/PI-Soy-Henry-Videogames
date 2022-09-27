import { CREATE_GAME, FILTER_BY_CREATED, FILTER_BY_GENRES, GET_GAMES, GET_GAME_DETAILS, GET_GENRES, GET_PLATFORMS, RESET_CREATE, RESET_FILTERS, RESET_GAMES, RESET_GAME_DETAIL, RESET_PLATFORMS, SET_PAGE, SORT_GAMES } from "../actions/index";

let initialState = {
  allGames: [],
  filteredGames: [],
  filtersApplied: {
    genres: "none",
    created: "none",
    sort: "nameAsc",
  },
  gameDetails: {},
  gameCreated: [],
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
        filteredGames: action.payload
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
    case CREATE_GAME:
      return {
        ...state,
        gameCreated: action.payload
      }


    case FILTER_BY_GENRES:
      let allGamesG

      if (state.filtersApplied.created === "All" || state.filtersApplied.created === "none") {
        allGamesG = state.allGames
      } else if (state.filtersApplied.created === "DB") {
        allGamesG = state.allGames.filter(g => g.created)
      } else {
        allGamesG = state.allGames.filter(g => !g.created)
      }

      let gamesFilteredsG = action.payload === "All"
        ? allGamesG
        : allGamesG.filter(g => g.genres.includes(action.payload))

      return {
        ...state,
        filteredGames: gamesFilteredsG,
        currentPage: 1,
        filtersApplied: {
          ...state.filtersApplied,
          genres: action.payload
        }
      }

    case FILTER_BY_CREATED:
      let allGamesC

      if (state.filtersApplied.genres === "All" || state.filtersApplied.genres === "none") {
        allGamesC = state.allGames
      } else {
        allGamesC = state.allGames.filter(g => g.genres.includes(state.filtersApplied.genres))
      }

      let gamesFilteredsC = action.payload === "All"
        ? allGamesC
        : action.payload === "DB"
          ? allGamesC.filter(g => g.created)
          : allGamesC.filter(g => !g.created)

      return {
        ...state,
        filteredGames: gamesFilteredsC,
        currentPage: 1,
        filtersApplied: {
          ...state.filtersApplied,
          created: action.payload
        }
      }

    case SORT_GAMES:
      let allGamesSort = state.filteredGames

      if (action.payload === "nameAsc")
        allGamesSort.sort((a, b) => a.name.localeCompare(b.name))
      if (action.payload === "nameDesc")
        allGamesSort.sort((b, a) => a.name.localeCompare(b.name))
      if (action.payload === "ratingAsc")
        allGamesSort.sort((a, b) => a.rating - b.rating)
      if (action.payload === "ratingDesc")
        allGamesSort.sort((a, b) => b.rating - a.rating)

      return {
        ...state,
        filteredGames: allGamesSort,
        currentPage: 1,
        filtersApplied: {
          ...state.filtersApplied,
          sort: action.payload
        }
      }

    case RESET_FILTERS:
      return {
        ...state,
        filtersApplied: {
          genres: "none",
          created: "none",
          sort: "nameAsc",
        }
      }

    case RESET_GAMES:
      return {
        ...state,
        allGames: action.payload,
        filteredGames: action.payload,
        currentPage: 1,
        filtersApplied: {
          genres: "none",
          created: "none",
          sort: "nameAsc",
        }
      }

    case RESET_CREATE:
      return {
        ...state,
        gameCreated: action.payload
      }

    case RESET_GAME_DETAIL:
      return {
        ...state,
        gameDetails: action.payload
      }

    case RESET_PLATFORMS:
      return {
        ...state,
        allPlatforms: action.payload
      }
    default:
      return state;
  }
}

export default rootReducer;