import {Pile} from "../components/Pile.js";

/**
 * @deprecated Use Deck.shuffle() instead
 * @param {Card[]} cards
 * @returns {*}
 */
export function shuffle(cards) {
  // Fisher-Yates shuffle algorithm
  for (let i = cards.length-1; i >= 0; i--) {
    const idToSwap = Math.floor(Math.random() * (i+1));
    const spare = cards[idToSwap];
    cards[idToSwap] = cards[i];
    cards[i] = spare;
  }
  return cards;
}

//Function to draw specific amount of cards (pass-by-reference)
export function draw(cards, number) {
  // Draw the specified number of cards from the deck
  //Should call Deck.draw() for a card then Hand.add() to the hand
  //**Plan do some sort of for loop for i=0, i<number and deck.length>0. 
  // have some const equal to deck.shift(if deck is top-first) 
  // and then push to the hand from the constant variable*/
  // TODO
  
}

/**
 *
 * @param {Card} card
 * @param {Pile} fromCollection
 * @param {Pile} toCollection
 */
export function moveCard(card, fromCollection, toCollection) {
  // Moving cards between deck, hand, discard, etc.
  //Note: Use the reference of the card when using this function and not it's
  //actual value as it would cause issue with card duplicates.
  const index = fromCollection.cards.indexOf(card);

  if (index >= 0 && index < fromCollection.cards.length) {
    fromCollection.cards.splice(index, 1);
    toCollection.addCard(card);
  }
}

/**
 * Filters an array of cards based on a given condition.
 * @param {Pile} pile
 * @param condition
 * @returns {*[]}
 */
export function filterCards(pile, condition) {
// Filter cards based on a condition (e.g., type, rarity, etc.)
//Note: parameter 'condition' is a function being passed in
  if(pile.size()===0) return  [];
  const result = [];

  for (let i = 0; i < pile.size(); i++) {
    const card = pile.cards[i];
    if (condition(card)) {
        result.push(card);
    }
  }

  return result;  
}
