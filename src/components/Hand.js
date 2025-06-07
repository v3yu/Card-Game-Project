import {Pile} from './Pile.js';
import {Card} from './Card.js';

/**
 * @class Hand
 * @description The player's cards feature, including visual components and logic
 */
class Hand extends Pile {

  /**
   * use a pile of cards to initialize the cards
   *
   * @param {Card[]} cards - The cards to initialize the hand with
   */
  constructor(cards=[]) {
    super(cards);



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
            border-radius: 8px;           
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);  
            justify-content: flex-start; 
            align-items: center;    
          }  
            `;
    this.shadowRoot.append(this.handArea, style);


	this.cards = new Proxy(this.cards, {
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
   *
   * @param {Card} card - Card you want to add
   * @returns {number} - 1 for success -1 for failure
   */
  addCard(card) {
    const result = super.addCard(card);
    this.cards[this.size() - 1] = card; //
    return result;
  }

  /**
   * Override removeCard to trigger Proxy
   *
   * @param card
   * @returns {number}
   */

  removeCard(card) {
    if (!(card instanceof Card)) return -1;
    const index = this.cards.indexOf(card);
    if (index === -1) return -1;
    this.cards.splice(index, 1);
    return index;
  }

connectedCallback() {
    this.renderHandHelper();
  }


/*

  /!**
   * @deprecated move to Player.js
   * @param {Card} card - The card to discard.
   * @returns {void}
   *!/
  discardCard(card) {
    //Moves a card from the cards to the discard pile
    this.removeCard(card);
    this.discardPile.addCard(card);
  }

  /!**
   * @deprecated move to Player.js
   * @returns {void}
   *!/
  discardHand() {
    // Discards all cards in the cards,
    // called by playerManager at the end of a turn
    const cardsToDiscard = this.cards.filter(card => card instanceof Card);


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

    this.cards.forEach(card => {
      this.handArea.append(card);
    });
  }

}

export default Hand;
if (!customElements.get('hand-element')) {
  customElements.define('hand-element', Hand);
}

