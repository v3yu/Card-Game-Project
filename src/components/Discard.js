
//not too sure if need to import from Cardmanager
import {Card} from './Card.js'
import {shuffle} from './CardManager.js'

class Discard extends HTMLElement {
    constructor() {
        this.discard = [];
    }

    addCard(card) {
        //Adds a card to the discard pile and checks beforehand if not card instance
        if(!(card instanceof Card)) return -1
        this.discard.push(card);
        return 0;
    }

    removeCard(card) {
        //Removes a card from the discard pile
        if(!(card instanceof Card)) return -1;
        const index = this.discard.indexOf(card);
        if (index===-1) return -1;
        return index;
    }

    clear() {
        //Clears the discard pile
        this.discard= [];
    }

    shuffleDiscardIntoDeck(deck) {
        // Moves all cards from the discard into the deck. 
        // Should call CardManager.js’s shuffle method
        if(!(deck instanceof HTMLElement)|| typeof deck.addCard !== 'function') return -1;
        const shuffler = shuffle(this.discard);
        shuffler.forEach( card => {
            deck.addCard(card);
        });
        this.clear();
        return 0;
    }

    renderDiscardHelper() {
        //Helper function to help render cards
        const body = document.querySelector('body');
        this.discard.forEavh(card => {
            card.render();
            body.append(card);
        });
    }
}

customElements.define('discard-pile', Discard);
export default Discard;