import { _getDecks, _addDeck, _addQuestion, _deleteDeck } from './../utils/api';

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const DELETE_DECK = 'DELETE_DECK';
export const ADD_QUESTION = 'ADD_QUESTION';

function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function handleReceiveDecks() {
  return(dispatch)=>{
    return _getDecks()
      .then((decks)=>{
        dispatch(receiveDecks(decks));
      })
  }
}

function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}

export function handleAddDeck(deck) {
  return(dispatch)=>{
    return _addDeck(deck)
      .then(()=>{
        dispatch(addDeck(deck));
      })
  }
}

export function addQuestion(deckId, question) {
  return {
    type: ADD_QUESTION,
    question,
    deckId,
  }
}

export function handleAddQuestion(deckId, question) {
  return(dispatch)=>{
    return _addQuestion(deckId, question)
      .then(()=>{
        dispatch(addQuestion(deckId, question));
      })
  }
}

function deleteDeck(deckId) {
  return {
    type: DELETE_DECK,
    deckId,
  }
}

export function handleDeleteDeck(deckId){
  return (dispatch) => {
    return _deleteDeck(deckId)
      .then(()=> dispatch(deleteDeck(deckId)));
  }
}