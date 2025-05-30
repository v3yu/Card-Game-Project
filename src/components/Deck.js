import {Card} from './Card.js';

class Deck extends HTMLElement {
    
    #deck;
    
    constructor() {
        super();
        this.#deck = [];
    }

    /**
     * @param {Card} card - card that needs to be added
     * @returns {number} - -1 if card is not a card object, 0 on success
     */
    addCard(card) {
        if (!(card instanceof Card)) return -1;
        this.#deck.push(card);
        return 0;
    }

    /**
     * @param {Card} card - card that needs to be removed
     * @return {number} - index of the card that was removed, or -1 if card wasn't found (or card is not a card object)
     */
    removeCard(card) {
        if (!(card instanceof Card)) return -1;
        let index = this.#deck.indexOf(card);
        this.#deck.splice(index, index+1);
        return index; //returns index of deleted card or -1 if no such card was found
    }

    /**
     * 
     * @returns {Card} - drawed card
     */
    drawCard() {
        let drawedCard = this.#deck.pop();
        return drawedCard;
    }

    
    /**
     * 
     * @returns {number} - number of cards in the deck
     */
    deckSize() {
        return this.#deck.length;
    }

    /**
     * function to see the whole deck
     * @returns {Card[]} - current deck
     */
    showDeck() {
        return this.#deck;
    }
}

customElements.define('player-deck', Deck);

export default Deck;