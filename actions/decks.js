export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK= 'DELETE_DECK'
export const EDIT_DECK ='EDIT_DECK'
export const ADD_QUESTION='ADD_QUESTION'
import { submitDeck } from '../utils/api.js'
 
export function addNewDeck(deck) {
    return {
      type: ADD_DECK,
      deck,
    }
  }
  export function deleteDeck(deck){
    return {
      type: DELETE_DECK, 
      decks
    }
  }
  export function editDeck(deck){
    return { 
      type: EDIT_DECK,
      deck
    }
  }
  export function addQuestion (deck) {
      return {
          type: ADD_QUESTION,
          deck
      }
  }
  
  export function addDeck( name, description ) {
    const uid = Date.now()
    const newDeck = 
    {
      [uid] : {
      'name': name,
      'Description': description,
      'Questions': []
      }
    }
    submitDeck (newDeck)
    return addNewDeck(newDeck)
  }
  export function formatQuestion ({question, answer, deck, id }) {
      const newQuestion = {
        'Question': question, 
        'Answer': answer
      }
      deck.Questions = [...deck.Questions, newQuestion]
      const formattedDeck = { [id]: deck } 
      submitDeck (formattedDeck)
      return addQuestion(formattedDeck)
  }
