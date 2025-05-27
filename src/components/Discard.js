// src/components/Discard.js
import Card from './Card.js';
import { shuffle } from './CardManager.js';

class Discard extends HTMLElement {
  constructor() {
    super();
    this.discard = [];
  }

  /**
   * Add a card to the discard pile.
   * @param {Card} card
   * @returns {number} 0 on success, -1 on invalid input
   */
  addCard(card) {
    if (!(card instanceof Card)) return -1;
    this.discard.push(card);
    return 0;
  }

  /**
   * Remove a card from the discard pile.
   * @param {Card} card
   * @returns {number} index of removed card or -1 if not found/invalid
   */
  removeCard(card) {
    if (!(card instanceof Card)) return -1;
    const index = this.discard.indexOf(card);
    if (index === -1) return -1;
    this.discard.splice(index, 1);
    return index;
  }

  /**
   * Empty the discard pile.
   */
  clear() {
    this.discard = [];
  }

  /**
   * Shuffle the discard pile into the given deck.
   * @param {Deck} deck - must have addCard method
   * @returns {number} 0 on success, -1 on invalid deck
   */
  shuffleDiscardIntoDeck(deck) {
    if (!(deck instanceof HTMLElement) || typeof deck.addCard !== 'function') return -1;
    const shuffled = shuffle(this.discard);
    for (const card of shuffled) {
      deck.addCard(card);
    }
    this.clear();
    return 0;
  }
}

customElements.define('discard-pile', Discard);
export default Discard;
