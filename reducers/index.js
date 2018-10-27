import {ADD_DECK, ADD_QUESTION, DELETE_DECK, RECEIVE_DECKS} from '../actions/index'

function decks (state={}, action) {
  switch(action.type) {
    case ADD_DECK:
      return {
        ...state,
        [action.deck.title]: action.deck
      }
    case ADD_QUESTION:
      return {
        ...state,
        [action.deckId] : {
          ...state[action.deckId],
          questions : state[action.deckId].questions.concat([action.question])
        }
      }
    case RECEIVE_DECKS:{
      return {...action.decks}
    }
    default:
      return state;
  }
}

export default decks;