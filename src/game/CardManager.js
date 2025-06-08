import {Pile} from '../components/Pile.js';


/**
 * @deprecated Use Deck.shuffle() instead
 * @param {Card[]} cards - An array of cards to shuffle.
 * @returns {Card} -  The shuffled array of cards.
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



/**
 * move one card from one pile to another
 *
 * @class Card
 * @param {Card} card - the card to move
 * @param {Pile} fromCollection - the pile to move the card from
 * @param {Pile} toCollection -  the pile to move the card to
 */
export function moveCard(card, fromCollection, toCollection) {
  // Moving cards between deck, cards, discard, etc.
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
 *
 * @class Card
 * @param {Pile} pile - An array of cards to filter.
 * @param {Function} condition -  A function that returns true for cards that satisfy the condition.
 * @returns {Card[]} - An array of cards that satisfy the condition.
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
