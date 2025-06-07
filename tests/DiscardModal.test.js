import DiscardModal from '../src/components/DiscardModal.js';
import { CrashOut } from '../src/components/cards/CrashOut.js';
import { FreeBoba } from '../src/components/cards/FreeBoba.js';
import Discard from '../src/components/Discard.js';
import Deck from '../src/components/Deck.js';
import { test } from '@jest/globals';
describe('DiscardModal', () => {
    let discardButton, discardModal, discardCardsDiv, closeDiscardModal, discardPile, modal;

    beforeEach(() => {
        // Set up DOM elements
        discardButton = document.createElement('button');
        discardModal = document.createElement('div');
        discardCardsDiv = document.createElement('div');
        closeDiscardModal = document.createElement('button');
        discardModal.style.display = 'none';
        discardModal.appendChild(discardCardsDiv);

        discardPile = new Discard();

        modal = new DiscardModal({
            discardButton,
            discardModal,
            discardCardsDiv,
            closeDiscardModal,
            discardPile
        });
    });

    test('shows "Discard pile is empty." when discard pile is empty', () => {
        discardPile.cards = [];
        discardButton.click();
        expect(discardCardsDiv.textContent).toBe('Discard pile is empty.');
        expect(discardModal.style.display).toBe('flex');
    });

    test('displays all cards in discard pile when modal is shown', () => {
        const card1 = new CrashOut();
        const card2 = new FreeBoba();
        discardPile.cards = [card1, card2];

        discardButton.click();

        expect(discardCardsDiv.children.length).toBe(2);
        expect(discardCardsDiv.children[0].outerHTML).toContain('crash-out');
        expect(discardCardsDiv.children[1].outerHTML).toContain('free-boba');
        expect(discardModal.style.display).toBe('flex');
    });

    test('removes all cards from modal when discard pile is reshuffled (emptied)', () => {
        discardPile.cards = [new CrashOut(), new FreeBoba()];
        discardButton.click();
        expect(discardCardsDiv.children.length).toBe(2);

        discardPile.cards = [];
        discardButton.click();
        expect(discardCardsDiv.textContent).toBe('Discard pile is empty.');
        expect(discardCardsDiv.children.length).toBe(0);
    });

    test('updates modal when a card is discarded after modal was shown', () => {
        discardPile.cards = [];
        discardButton.click();
        expect(discardCardsDiv.textContent).toBe('Discard pile is empty.');

        discardPile.cards = [new CrashOut()];
        discardButton.click();
        expect(discardCardsDiv.children.length).toBe(1);
        expect(discardCardsDiv.children[0].outerHTML).toContain('crash-out');
    });

    test('hides modal when close button is clicked', () => {
        discardPile.cards = [new CrashOut()];
        discardButton.click();
        expect(discardModal.style.display).toBe('flex');
        closeDiscardModal.click();
        expect(discardModal.style.display).toBe('none');
    });

    test('card clones in modal have pointerEvents set to none and margin set', () => {
        const card = new CrashOut();
        discardPile.cards = [card];
        discardButton.click();
        const clone = discardCardsDiv.children[0];
        expect(clone.style.pointerEvents).toBe('none');
        expect(clone.style.margin).toBe('8px');
    });

    test('shuffleDiscardIntoDeck moves all cards and clears discard', () => {
        const deck = new Deck();
        const card1 = new CrashOut();
        const card2 = new FreeBoba();
        discardPile.addCard(card1);
        discardPile.addCard(card2);
        discardButton.click();
        expect(discardCardsDiv.children.length).toBe(2);
        discardButton.click();
        discardPile.shuffleDiscardIntoDeck(deck);
        discardButton.click();
        expect(discardCardsDiv.textContent).toBe('Discard pile is empty.');

    });
});
