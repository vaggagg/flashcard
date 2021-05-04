import  AsyncStorage  from '@react-native-community/async-storage'
import   { decks }  from './data.js'

export const DECKS_KEY = 'decks'


function setDummyData () {
  AsyncStorage.setItem(DECKS_KEY, JSON.stringify(decks))
  return decks
}
export function formatDecks (results) {
  return results === null ?  setDummyData() : JSON.parse(results)
}