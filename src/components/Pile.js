import {Card} from './Card.js';

/**
 * @description The Pile class provides a unified interface for defining card piles such as deck, cards, and discard.
 * @class Pile
 */
export class Pile extends HTMLElement{
  /**
   * Used to store all the cards.
   *
   * @type {Card[]}
   */
  cards;

  /**
   * Create a new Pile
   *
   * @param {Card[]} cards -  an array of cards to be added to the pile
   */
  constructor(cards=[]) {
    super();
    this.cards=cards;
  }

  /**
   * add one card into the pile
   *
   * @param {Card} card -  card to be added
   * @returns {number} 1 for success,-1 for  failure
   */
  addCard(card){
    if(!(card instanceof Card)){
      return -1;
    }
    this.cards.push(card);
    return 1;
  }

  /**
   * add cards into the pile
   *
   * @param {Card[]} cards - cards to be added
   */
  addCards(cards){
    cards.forEach(card => {
      this.cards.push(card);
    });
  }

  /**
   * return cards array
   *
   * @returns {Card[]} -  cards array
   */
  getCards() {
    return this.cards;
  }

  /**
   *  clear the pile
   */
  clear(){
    this.cards = [];
  }

  /**
   *  shuffle the pile
   *
   *  @returns {Card[]} - shuffled cards array
   */
  shuffle(){
    for (let i = this.cards.length-1; i >= 0; i--) {
      const idToSwap = Math.floor(Math.random() * (i+1));
      const spare = this.cards[idToSwap];
      this.cards[idToSwap] = this.cards[i];
      this.cards[i] = spare;
    }
    return this.cards;
  }

  /**
   * return the size of the pile
   *
   * @returns {number} -  size of the pile
   */
  size() {
    return this.cards.length;
  }

  /**
   * @param {Card} card - card that needs to be removed
   * @returns {number} - index of the card that was removed, or -1 if card wasn't found (or card is not a card object)
   */
  removeCard(card) {
    if (!(card instanceof Card)) return -1;
    let index = this.cards.indexOf(card);
    if(index===-1) return -1;
    this.cards.splice(index, 1);
    return index; //returns index of deleted card or -1 if no such card was found
  }

}

if(!customElements.get('pile-element')){
  customElements.define('pile-element', Pile);
}
