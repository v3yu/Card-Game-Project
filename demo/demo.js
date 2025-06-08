import Hand from '../src/components/Hand.js';
import {CrashOut} from '../src/components/cards/CrashOut.js';
import {FreeBoba} from '../src/components/cards/FreeBoba.js';
import {Player} from '../src/components/Player.js';
import { Powell } from '../src/components/Powell.js';
import Discard from '../src/components/Discard.js';
import DiscardModal from '../src/components/DiscardModal.js';

//Test hand
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

const discardPile = new Discard();
// add some cards to the discard pile for testing
if (discardPile && typeof discardPile.addCard === 'function') {
    const testCards = [
        new CrashOut(),
        new FreeBoba(),
        new CrashOut(),
        new CrashOut(),
        new FreeBoba(),
        new CrashOut(),
        new FreeBoba(),
        new CrashOut(),
        new CrashOut(),
        new FreeBoba(),
        new CrashOut(),
        new FreeBoba(),
        new CrashOut(),
        new CrashOut(),
        new FreeBoba(),
        new CrashOut(),
        new FreeBoba(),
        new CrashOut(),
        new CrashOut(),
        new FreeBoba()
    ];
    testCards.forEach(card => discardPile.addCard(card));
}

const powell = new Powell();
document.querySelectorAll('.character-container')[1].append(powell);


const player = new Player(10, 3);
document.querySelector('.player').append(player);

// Discard modal references
const discardButton = document.querySelector('.discard-button');
const discardModal = document.querySelector('.discard-modal');
const discardCardsDiv = document.getElementById('discard-cards');
const closeDiscardModal = document.querySelector('.close-discard-modal');

/* eslint-disable no-unused-vars */
const discardModalInstance = new DiscardModal({
    discardButton,
    discardModal,
    discardCardsDiv,
    closeDiscardModal,
    discardPile
});
