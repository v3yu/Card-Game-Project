import Hand from '../src/components/Hand.js';
import CrashOut from '../src/components/cards/CrashOut.js';

if (!customElements.get('hand-component')) {
    customElements.define('hand-component', Hand);
}

// Fake discard pile
function createDiscardPile() {
    return {
        cards: [],
        addCard(card) {
            this.cards.push(card);
        }
    };
}

describe('Hand component', () => {
    let hand;
    let discardPile;

    beforeEach(() => {
        document.body.innerHTML = '';
        hand = document.createElement('hand-component');
        discardPile = createDiscardPile();
        hand.discardPile = discardPile;
        document.body.appendChild(hand);
    });

    test('addCard adds a CrashOut card to the hand', () => {
        const card = new CrashOut();
        hand.addCard(card);
        expect(hand.hand).toContain(card);
    });

    test('removeCard removes a CrashOut card from the hand', () => {
        const card = new CrashOut();
        hand.addCard(card);
        hand.removeCard(card);
        expect(hand.hand).not.toContain(card);
    });

    test('playCard plays CrashOut and removes it from the hand', () => {
        const card = new CrashOut();
        const enemy = {
            hp: 10,
            takeDamage(amount) {
                this.hp -= amount;
            }
        };
    
        hand.addCard(card);
        hand.playCard(card, enemy);
    
        expect(hand.hand).not.toContain(card);
        expect(enemy.hp).toBe(7);
    });

    test('discardCard removes CrashOut from hand and adds to discard pile', () => {
        const card = new CrashOut();
        hand.addCard(card);
        hand.discardCard(card);
    
        expect(hand.hand).not.toContain(card);
        expect(discardPile.cards).toContain(card);
    });

    test('discardHand discards all cards to discard pile', () => {
        const card1 = new CrashOut();
        const card2 = new CrashOut();
        hand.addCard(card1);
        hand.addCard(card2);
    
        hand.discardHand();
    
        expect(hand.hand.length).toBe(0);
        expect(discardPile.cards).toContain(card1);
        expect(discardPile.cards).toContain(card2);
    });
});
