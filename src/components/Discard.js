// src/components/Discard.js
import Card from './Card.js';
import { shuffle } from '../game/CardManager.js';
import {Pile} from "./Pile.js";

class Discard extends Pile {
  constructor() {
    super();
  }







  /**
   * Shuffle the discard pile into the given deck.
   * @param {Deck} deck - must have addCard method
   * @returns {number} 0 on success, -1 on invalid deck
   */
  shuffleDiscardIntoDeck(deck) {
    if (!(deck instanceof HTMLElement) || typeof deck.addCard !== 'function') return -1;
    this.shuffle();
    for (const card of this.getCards()) {
      deck.addCard(card);
    }
    this.clear();
    return 0;
  }


}

customElements.define('discard-pile', Discard);
export default Discard;
