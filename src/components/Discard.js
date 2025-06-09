import {Pile} from './Pile.js';

/**
 * @class Discard
 * @description The player's discard feature, including visual components and logic
 */
class Discard extends Pile {
  /**
   * use a pile of cards to initialize Discard
   *
   * @class Crad
   * @param {Card[]} cards - cards array tp initialize the discard pile
   */
  constructor(cards=[]) {
    super(cards);
  }
  /**
   * Shuffle the discard pile into the given deck.
   *
   * @class Deck
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
export default Discard;
if (!customElements.get('discard-pile')) {
  customElements.define('discard-pile', Discard);
}