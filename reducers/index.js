import {ADD_DECK, ADD_QUESTION, DELETE_DECK, RECEIVE_ENTRIES} from '../actions/index'

function decks (state={}, action) {
  switch(action.type) {
    case ADD_DECK:{
      debugger
      return {
        ...state,
        [action.deck.title]: action.deck
      }
    }
    case ADD_QUESTION:
      return {
        ...state,
        [action.deckId] : {
          ...state[action.deckId],
          questions : state[action.deckId].questions.concat([action.question])
        }
      }
    case DELETE_DECK:{
      return state;
    }
    case RECEIVE_ENTRIES:{
      debugger
      return {
        ...action.decks
      }
    }
    default:
      return state;
  }
}

export default decks;