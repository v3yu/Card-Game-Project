import Card from "card";
import Deck from "deck";

class Discard extends HTMLElement {
    /**
     * Initialize an empty discard pile.
     * @constructor
     */
    constructor() {
        super();
        this.discard = [];
    }

    /**
     * Adds a card to the discard pile.
     * @param {Card} card The card to add.
     */
    addCard(card) {
        this.discard.push(card);
    }

    /**
     * Removes a card from the discard pile.
     * @param {Card} card The card to discard.
     */
    removeCard(card) {
        this.discard = this.discard.filter(card => card.id !== card.id);
    }

    /**
     * Clears the discard pile.
     */
    clear() {
        this.discard.clear();
    }

    /**
     * Moves all cards from the discard into the deck.
     * @param {Deck} deck The destination deck for the discard pile.
     */
    shuffleDiscardIntoDeck(deck) {
        // TODO
    }

    /**
     * Helper function to help render cards
     */
    renderDiscardHelper() {
        // TODO
    }
}

export default Discard;