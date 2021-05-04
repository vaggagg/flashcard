import { ADD_DECK, ADD_QUESTION, DELETE_DECK, EDIT_DECK } from '../actions/decks.js'
import { RECEIVE_DECKS } from '../actions/index.js'
function decks (state = {}, action) {
    switch (action.type) {
      case RECEIVE_DECKS :
        return {
          ...state,
          ...action.decks,
        }
      case ADD_DECK :
        return {
          ...state,
          ...action.deck
        }
      case DELETE_DECK :
          return {
            ...state,
            ...action.deck
          }
      case EDIT_DECK :
        return {
          ...state,
          ...action.deck
        }
        case ADD_QUESTION :
        return {
          ...state,
          ...action.deck
        }
      default :
        return state
    }
  }
  
  export default decks