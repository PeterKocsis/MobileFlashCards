import { AsyncStorage } from 'react-native';

const DECKS_KEY = 'FlashCards:Decks'

export function _getDecks() {
  return AsyncStorage.getAllKeys()
    .then(keys => keys.filter(key => key === DECKS_KEY))
    .then((machingKeys) => {
      if (machingKeys.length > 0) {
        return AsyncStorage.getItem(DECKS_KEY)
          .then(result => JSON.parse(result));
      }
      else {
        return AsyncStorage.setItem(DECKS_KEY, "{}")
          .then(() => {
            return AsyncStorage.getItem(DECKS_KEY)
              .then(result => JSON.parse(result));
          });
      }
    });
}

export function _addDeck(deck) {
  return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify(
    {
      [deck.title]: deck
    }));
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

export function _deleteDeck(deckId) {
  return AsyncStorage.getItem(DECKS_KEY)
    .then((result) => {
      const data = JSON.parse(result);
      data[deckId] = undefined;
      delete data[deckId];
      AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data));
    })
}