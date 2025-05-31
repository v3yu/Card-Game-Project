/**
 * @jest-environment jsdom
 */
import {Pile} from "./Pile.js";
import {Card} from './Card.js'

class Hand extends Pile {

  constructor() {
    super();

    /**
     * @deprecated
     */
    this.discardPile = new Pile();

    this.attachShadow({ mode: 'open' });

    this.handArea = document.createElement('div');
    this.handArea.className = 'handArea';

    const style = document.createElement('style');
    style.innerText = `
          .handArea{
            display: flex;
            flex-direction: row;
            gap: 10px;                    
            padding: 12px;                
            background-color: #f5f5f5;    
            border-radius: 8px;           
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);  
            justify-content: flex-start; 
            align-items: center;    
          }  
            `;
    this.shadowRoot.append(this.handArea, style);


	this.hand = new Proxy(this.cards, {
		set: (target, prop, value) => {
			target[prop] = value;
			if (!isNaN(prop) || prop === 'length') {
				this.renderHandHelper();
			}
			return true;
		},
		deleteProperty: (target, prop) => {
			delete target[prop];
			this.renderHandHelper();
			return true;
		}
	});
}

  /**
   * Override addCard to trigger Proxy
   * @param card
   * @returns {number}
   */
  addCard(card) {
    const result = super.addCard(card);
    this.hand[this.size() - 1] = card; //
    return result;
  }

  /**
   * Override removeCard to trigger Proxy
   * @param card
   * @returns {number}
   */

  removeCard(card) {
    if (!(card instanceof Card)) return -1;
    const index = this.cards.indexOf(card);
    if (index === -1) return -1;
    delete this.hand[index];
    this.compactHand();
    return index;
  }

  /**
   * Compress the array and remove the empty slots.
   */
  compactHand() {
    const newHand = this.hand.filter(card => card instanceof Card);

    for (let i = 0; i < this.hand.length; i++) {
      delete this.hand[i];
    }

    this.cards.length = 0;

    
    newHand.forEach((card, index) => {
      this.hand[index] = card;
    });
  }


/*

  /!**
   * @deprecated move to Player.js
   * @param {Card} card - The card to discard.
   * @returns {void}
   *!/
  discardCard(card) {
    //Moves a card from the hand to the discard pile
    this.removeCard(card);
    this.discardPile.addCard(card);
  }

  /!**
   * @deprecated move to Player.js
   * @returns {void}
   *!/
  discardHand() {
    // Discards all cards in the hand,
    // called by playerManager at the end of a turn
    const cardsToDiscard = this.hand.filter(card => card instanceof Card);


    for (let i = 0; i < cardsToDiscard.length; i++) {
      this.discardCard(cardsToDiscard[i]);
    }
  }*/

  /**
   * @returns {void}
   */
  renderHandHelper() {
    //Helper function to help render cards
    this.handArea.innerHTML = '';

    this.hand.forEach(card => {
      this.handArea.append(card);
    });
  }

}

export default Hand;
if (!customElements.get('hand-element')) {
  customElements.define('hand-element', Hand);
}

