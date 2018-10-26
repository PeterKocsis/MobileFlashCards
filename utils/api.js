import {AsyncStorage} from 'react-native';

const DECKS_KEY = 'FlasCards:Decks'

export function _getDecks() {
  return AsyncStorage.getItem(DECKS_KEY)
    .then((results)=>{
      return JSON.parse(results);
    })
}

export function _InitStore(defaultDecks){
  return AsyncStorage.setItem(DECKS_KEY, JSON.stringify(defaultDecks));
}

export function _addDeck(deck) {
  const data = {
    [deck.title] : deck
  }
  return AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data));
}

export function _addQuestion(deck, question) {
  const questions = deck.questions.concat([question]);
  const modifiedDeck = {
    title: deck.title,
    questions
  }
  return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
    [deck.title]: modifiedDeck
  }));
}