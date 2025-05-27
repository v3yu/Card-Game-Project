//I added imports just in case
/**
 * 
 */

import {Card} from './Card.js'
import {shuffle} from '/.CardManager.js'


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
        //Adds a card to the discard pile
        if(!(card instanceof Card)) return -1;
        this.discard.push(card);
        return 0;

    }

    /**
     * Removes a card from the discard pile.
     * @param {Card} card The card to discard.
     */
    removeCard(card) {
        //Removes a card from the discard pile
        if(!(card instanceof Card)) return -1;
        const idx = this.discard.indexOf(card);
        if (index === -1) return -1;
        this.discard.splice(index, 1); //starts at an index and removes by an amt (1)
        return index;   
    }

    /**
     * Clears the discard pile.
     */
    clear() {
        this.discard= [];
        this.innerHTML = ''; //clears DOM children from discard 
        //Clears the discard pile
    }

    /**
     * Moves all cards from the discard into the deck.
     * @param {Deck} deck The destination deck for the discard pile.
     */
    shuffleDiscardIntoDeck(deck) {
        // Moves all cards from the discard into the deck. 
        // Should call CardManager.js’s shuffle method
        if (!(deck instanceof HTMLElement) || typeof deck.addCard !== 'function') return -1;

        const shuffled = shuffle(this.discard);
        for (const card of shuffled) {
            deck.addCard(card);
        }

        this.clear();
        return 0;

    }

    /**
     * Helper function to help render cards
     */
    /** 
    renderDiscardHelper() {
        //Helper function to help render cards
        this.innerHTML = '';
        
        for(const card of this.discard){
            card.render(); //render the card element
            this.append(card); //attaches to discard-pile DOM
        }
    }
    */
}

customElements.define('discard-pile', Discard);
export default Discard;