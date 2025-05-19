
class Hand extends HTMLElement {
    
    constructor() {
        this.hand = [];
    }

    addCard(card) {
        //Adds a card to the hand

    }

    removeCard(card) {
        //Removes a card from the hand

    }

    playCard(card, target) {
        // Plays a card from the hand. 
        // Should call the specific card’s own card.play, 
        // then this.removeCard(card)

    }

    discardCard(card) {
        //Moves a card from the hand to the discard pile

    }

    discardHand() {
        // Discards all cards in the hand, 
        // called by playerManager at the end of a turn

    }

    renderHandHelper() {
        //Helper function to help render cards

    }

}

export default Hand;