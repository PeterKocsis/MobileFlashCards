import {AsyncStorage} from 'react-native';

const DECKS_KEY = 'FlasCards:Decks'

export function _getDecks() {
  return AsyncStorage.getItem(DECKS_KEY)
    .then((results)=>{
      debugger
      return JSON.parse(results);
    })
}

export function _InitStore(defaultDecks){
  return AsyncStorage.setItem(DECKS_KEY, JSON.stringify(defaultDecks));
}

export function _addDeck(deck) {
  // return AsyncStorage.getItem(DECKS_KEY)
  //   .then((results)=>{
  //     const data = JSON.parse(results);
  //     data[deck.title] = deck;
  //     AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data));
  //   })
  const data = {
    [deck.title] : deck
  }
  return AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data));
}

export function _addQuestion(deckId, question) {
  return AsyncStorage.getItem(DECKS_KEY)
    .then((results)=>{
      const data = JSON.parse(results);
      data[deckId].questions.push(question);
      AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data));
    });
}