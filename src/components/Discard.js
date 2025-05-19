
class Discard extends HTMLElement {
    constructor() {
        this.discard = [];
    }

    addCard(card) {
        //Adds a card to the discard pile

    }

    removeCard(card) {
        //Removes a card from the discard pile

    }

    clear() {
        //Clears the discard pile
    }

    shuffleDiscardIntoDeck(deck) {
        // Moves all cards from the discard into the deck. 
        // Should call CardManager.js’s shuffle method

    }

    renderDiscardHelper() {
        //Helper function to help render cards
    }
}

export default Discard;