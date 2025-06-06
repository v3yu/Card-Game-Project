import Hand from '../src/components/Hand.js';
import {CrashOut} from '../src/components/cards/CrashOut.js';
import {FreeBoba} from '../src/components/cards/FreeBoba.js';
import {Enemy} from '../src/components/Enemy.js';
import {Player} from '../src/components/Player.js';
import { Powell } from '../src/components/Powell.js';

const handArea = document.querySelector('.hand-area');
const hand = new Hand();
handArea.append(hand);
const crashOutCard = new CrashOut();
const freeBobaCard = new FreeBoba();
const crashOutCard2 = new CrashOut();
const crashOutCard3 = new CrashOut();
const crashOutCard4 = new CrashOut();


hand.addCard(crashOutCard);
hand.addCard(crashOutCard2);
hand.addCard(freeBobaCard);
hand.addCard(crashOutCard3);
hand.addCard(crashOutCard4);

// Add this after you define discardPile:
const discardPile = document.querySelector('discard-pile');

// Example: Add some cards to the discard pile for testing
if (discardPile && typeof discardPile.addCard === 'function') {
    // Add a couple of cards to the discard pile
    const testCard1 = new CrashOut();
    const testCard2 = new FreeBoba();
    discardPile.addCard(testCard1);
    discardPile.addCard(testCard2);
}

const powell = new Powell();
document.querySelectorAll('.character-container')[1].append(powell);


const player = new Player(10, 3);
document.querySelector('.player').append(player);

// Modal references
const discardButton = document.querySelector('.discard-button');
const discardModal = document.getElementById('discard-modal');
const discardCardsDiv = document.getElementById('discard-cards');
const closeDiscardModal = document.getElementById('close-discard-modal');

discardButton.addEventListener('click', () => {
    discardCardsDiv.innerHTML = '';
    if (discardPile && typeof discardPile.getCards === 'function') {
        const cards = discardPile.getCards();
        if (!cards.length) {
            discardCardsDiv.textContent = 'Discard pile is empty.';
        } else {
            cards.forEach(card => {
                // Clone the card for display
                const cardClone = card.cloneNode(true);
                cardClone.style.pointerEvents = 'none';
                cardClone.style.margin = '8px';
                discardCardsDiv.appendChild(cardClone);
            });
        }
    }
    discardModal.style.display = 'flex';
});

closeDiscardModal.addEventListener('click', () => {
    discardModal.style.display = 'none';
});
