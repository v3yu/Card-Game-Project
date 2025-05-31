import {Card} from "./Card.js";

/**
 * The Pile class provides a unified interface for defining card piles such as deck, hand, and discard.
 */
export class Pile extends HTMLElement{
  /**
   * Used to store all the cards.
   * @type {[Card]}
   */
  cards;

  /**
   *
   * @param {Card[]} cards
   */
  constructor(cards=[]) {
    super();
    this.cards=cards;
  }

  /**
   * add one card into the pile
   * @param {Card} card
   * @return {number} 1 for success,-1 for  failure
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
   * @param {[Card]} cards
   */
  addCards(cards){
    cards.forEach(card => {
      this.cards.push(card);
    });
  }

  /**
   * return cards array
   * @returns {Card[]}
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
   * @returns {number}
   */
  size() {
    return this.cards.filter(card => card instanceof Card).length;
  }

  /**
   * @param {Card} card - card that needs to be removed
   * @return {number} - index of the card that was removed, or -1 if card wasn't found (or card is not a card object)
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
  customElements.define('pile-element', Pile)
}
