/**
* @jest-environment jsdom
*/

class Hand extends HTMLElement {
    
    constructor() {
        super();
        this.hand = [];
        this.discardPile = null;
    }

    /**
    * @param {Card} card - The card to be added.
    * @returns {void}
    */
    addCard(card) {
        //Adds a card to the hand
        this.hand.push(card);
        this.renderHandHelper();
    }

    /**
    * @param {Card} card - The card to be removed.
    * @returns {void}
    */
    removeCard(card) {
        //Removes a card from the hand
        const index = this.hand.indexOf(card);

        //Index has been found
        if (index !== -1) {
            this.hand.splice(index, 1);
            this.renderHandHelper();
        }
    }
	
    /**
    * @param {Card} card - The card to be played.
    * @param {Object} target - The target for the card's effect (e.g. an enemy).
    * @returns {void}
    */
    playCard(card, target) {
        // Plays a card from the hand. 
        // Should call the specific card’s own card.play, 
        // then this.removeCard(card)
        card.play(target);
        this.removeCard(card);
    }

    /**
    * @param {Card} card - The card to discard.
    * @returns {void}
    */
    discardCard(card) {
        //Moves a card from the hand to the discard pile
        this.removeCard(card);
        this.discardPile.addCard(card);
    }

    /**
    * @returns {void}
    */
    discardHand() {
        // Discards all cards in the hand, 
        // called by playerManager at the end of a turn
        const cardsToDiscard = [];
        for (let i = 0; i < this.hand.length; i++) {
            cardsToDiscard.push(this.hand[i]);
        }
        
        for (let i = 0; i < cardsToDiscard.length; i++) {
            this.discardCard(cardsToDiscard[i]);
        }
    }
	
    /**
    * @returns {void}
    */
    renderHandHelper() {
        //Helper function to help render cards
        this.innerHTML = '';

        this.hand.forEach(card => {
            const cardElement = card.render();
            this.appendChild(cardElement);
        });
    }
}

export default Hand;
