import {Card} from './Card.js';
import {Pile} from './Pile.js';

/**
 * @class Deck
 * @description deck. The parent class Pile already provides a cards array that can be used directly.
 */
class Deck extends Pile {

    /**
     * use a pile of cards to initialize Deck
     *
     * @param {Card[]} cards - cards to initialize the deck
     */
    constructor(cards = []) {
        super(cards);
    }




    /**
     * Pop a card from deck
     *
     * @returns {Card} - drawed card
     */
    drawCard() {
        return this.cards.pop();
    }

    


}

customElements.define('player-deck', Deck);

export default Deck;