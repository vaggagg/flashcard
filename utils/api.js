import AsyncStorage  from '@react-native-community/async-storage'
import { formatDecks, DECKS_KEY } from './_decks'

export function fetchDecks () {
    return AsyncStorage.getItem(DECKS_KEY)
      .then(formatDecks)
  }

  export function submitDeck( deck) {
    return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify( deck ))
  } 