import {Player} from '../src/components/Player.js';
import {CrashOut} from "../src/components/cards/CrashOut.js";
import {EarlySubmission} from "../src/components/cards/EarlySubmission.js";
import Hand from "../src/components/Hand.js";
import Discard from "../src/components/Discard.js";
import Deck from "../src/components/Deck.js";
import hand from "../src/components/Hand.js";

describe('Player class', () => {
    let player;
    let card1;
    let card2;
    beforeEach(() => {
        player = new Player(
          100,   // maxHealth
          3,     // maxEnergy
          new Deck(), // deck
          new Hand(),    // hand
          new Discard(),    // discard
        );
        card1 = new CrashOut();
        card2 = new EarlySubmission();
        player.deck.addCard(card1);
        player.deck.addCard(card2);
    });

    test('initialization sets correct values', () => {
        expect(player.state.maxHealth).toBe(100);
        expect(player.state.currentHealth).toBe(100);
        expect(player.state.maxEnergy).toBe(3);
        expect(player.state.currentEnergy).toBe(3);
        expect(player.state.block).toBe(0);
        expect(player.isDead).toBe(false);
        expect(player.deck.size()).toBe(2);
        expect(player.hand.hand.length).toBe(0);
        expect(player.discard.size()).toBe(0);
        expect(player.state.effect.length).toBe(0);
    });

    test('takeDamage reduces health correctly without block', () => {
        player.takeDamage(30);
        expect(player.state.currentHealth).toBe(70);
    });

    test('takeDamage is reduced by block', () => {
        player.gainBlock(20);
        player.takeDamage(15);
        expect(player.state.block).toBe(5);
        expect(player.state.currentHealth).toBe(100);
    });

    test('takeDamage with block overflow deals correct damage', () => {
        player.gainBlock(10);
        player.takeDamage(15);
        expect(player.state.block).toBe(0);
        expect(player.state.currentHealth).toBe(95);
    });

    test('heal should not exceed maxHealth', () => {
        player.takeDamage(50);
        player.heal(100);
        expect(player.state.currentHealth).toBe(100);
    });

    test('spendEnergy returns true and decreases energy if enough', () => {
        const result = player.spendEnergy(2);
        expect(result).toBe(true);
        expect(player.state.currentEnergy).toBe(1);
    });

    test('spendEnergy returns false if not enough energy', () => {
        const result = player.spendEnergy(5);
        expect(result).toBe(false);
        expect(player.state.currentEnergy).toBe(3);
    });

    test('resetEnergy resets energy to maxEnergy', () => {
        player.spendEnergy(2);
        player.resetEnergy();
        expect(player.state.currentEnergy).toBe(player.state.maxEnergy);
    });



    test('drawCards draws correct number of cards', () => {
        const result = player.drawCards(2);
        expect(result).toBeUndefined(); // Currently no return unless failure
        expect(player.hand.size()).toBe(2);
    });

    test('drawCards returns -1 if not enough cards in deck', () => {
        const result = player.drawCards(3);
        expect(result).toBe(-1);
        expect(player.hand.size()).toBe(0);
    });

    test('discardCard moves card from hand to tempDiscard', () => {
        player.hand.addCard(card1);
        player.discardCard(card1);
        expect(player.hand.getCards()).not.toContain(card1);
        expect(player.tempDiscard.getCards()).toContain(card1);
    });

    test('discardHand moves all from hand to discard via tempDiscard', () => {
        player.hand.addCard(card1);
        player.hand.addCard(card2);
        player.hand.addCard(card1)
        player.discardHand();
        expect(player.hand.size()).toBe(0);
        expect(player.discard.getCards()).toContain(card1);
        expect(player.discard.getCards()).toContain(card2);
    });

    test('shuffleDiscardIntoDeck transfers and shuffles discard into deck', () => {
        player.discard.addCard(card1);
        player.discard.addCard(card2);

        player.shuffleDiscardIntoDeck();

        expect(player.deck.getCards()).toContain(card1);
        expect(player.deck.getCards()).toContain(card2);
        expect(player.discard.size()).toBe(0);
    });
});
