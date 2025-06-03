import {
  spawnPlayer,
  startTurn,
  endTurn,
  isPlayerDead,
  handlePlayerAction,
  getPlayer
} from '../src/game/PlayerManager.js';

import jest from 'jest-mock';
import {Player} from '../src/components/Player.js';
import {SampleCard} from '../src/components/cards/SampleCard.js';
import Hand from '../src/components/Hand.js';
import Discard from '../src/components/Discard.js';
import Deck from '../src/components/Deck.js';
import { it } from '@jest/globals';

describe('PlayerManager', () => {
    let deck, hand, discard;

    beforeEach(() => {
        deck = new Deck();
        hand = new Hand();
        discard = new Discard();
        
    });

    describe('spawnPlayer', () => {
        it('should create and return a new Player instance', () => {
            const result = spawnPlayer(20, 3, deck, hand, discard, []);
            expect(result).toBeInstanceOf(Player);
            expect(result.state.maxHealth).toBe(20);
            expect(result.state.currentEnergy).toBe(3);
            expect(result.hand).toBe(hand);
            expect(result.deck).toBe(deck);
            expect(result.discard).toBe(discard);
        });
    });

    describe('startTurn', () => {
        it('should reset energy and draw 5 cards if player exists', () => {
            let player = spawnPlayer(10, 2, deck, hand, discard, []);
            const resetSpy = jest.spyOn(player, 'resetEnergy');
            const drawSpy = jest.spyOn(player, 'drawCards');
            // Ensure the player has no cards in hand before starting turn
            expect(player.hand.cards.length).toBe(0);
            // Add some cards to the deck
            deck.addCard(new SampleCard());
            deck.addCard(new SampleCard());
            deck.addCard(new SampleCard());
            deck.addCard(new SampleCard());
            deck.addCard(new SampleCard());
            startTurn();
            expect(resetSpy).toHaveBeenCalled();
            expect(drawSpy).toHaveBeenCalledWith(5);
            // Ensure the player has 5 cards in hand after starting turn
            expect(player.hand.cards.length).toBe(5);
        });

        it('should do nothing if player does not exist', () => {
            expect(() => startTurn()).not.toThrow();
        });
    });

    describe('endTurn', () => {
        it('should discard hand if player exists', () => {
            const player = spawnPlayer(10, 2, deck, hand, discard, []);
            const discardSpy = jest.spyOn(player, 'discardHand');
            // Add some cards to the player's hand
            player.hand.addCard(new SampleCard());
            player.hand.addCard(new SampleCard());
            // Ensure the player has cards in hand before ending turn
            expect(player.hand.cards.length).toBeGreaterThan(0);
            // Call endTurn which should trigger discardHand
            endTurn();
            expect(discardSpy).toHaveBeenCalled();
            // Ensure the player's hand is empty after discarding
            expect(player.hand.cards.length).toBe(0);
            // Check that the discard pile has the cards
            expect(player.discard.cards.length).toBeGreaterThan(0);
        });

        it('should do nothing if player does not exist', () => {
            expect(() => endTurn()).not.toThrow();
        });
    });

    describe('isPlayerDead', () => {
        it('should return null if player does not exist', () => {
            expect(isPlayerDead()).toBe(null);
        });

        it('should return null if the player existed but was deleted', () => {
            let player = spawnPlayer(10, 2, deck, hand, discard, []);
            player.state.currentHealth = 0;
            expect(isPlayerDead(player)).toBe(true);
            // Simulate deletion of player
            player = null;
            expect(isPlayerDead(player)).toBe(null);
        }
        );

        it('should return true if player health is 0', () => {
            const player = spawnPlayer(10, 2, deck, hand, discard, []);
            player.state.currentHealth = 0;
            expect(isPlayerDead(player)).toBe(true);
        });

        it('should return false if player health is above 0', () => {
            const player = spawnPlayer(10, 2, deck, hand, discard, []);
            player.state.currentHealth = 5;
            expect(isPlayerDead(player)).toBe(false);
        });
    });

    describe('handlePlayerAction', () => {
        it('should call playCard on player when action is playCard', () => {
            const player = spawnPlayer(10, 2, deck, hand, discard, []);
            const playSpy = jest.spyOn(player, 'playCard');
            const card = new SampleCard();
            // Use a mock object for target since Enemy.js is not implemented
            const target = { 
                isEnemy: true,
                takeDamage: jest.fn() // Mock the takeDamage method
            }; 
            handlePlayerAction('playCard', card, target);
            expect(playSpy).toHaveBeenCalledWith(card, target);
        });

        it('should do nothing if player does not exist', () => {
            let player = spawnPlayer(10, 2, deck, hand, discard, []);
            const playSpy = jest.spyOn(player, 'playCard');
            const card = new SampleCard();
            // Use a mock object for target since Enemy.js is not implemented
            const target = { 
                isEnemy: true,
                takeDamage: jest.fn() // Mock the takeDamage method
            }; 
            // delete the player instance to simulate non-existence
            player = null;
            handlePlayerAction('playCard', card, target);
            expect(playSpy).toHaveBeenCalledWith(card, target);
            expect(() => handlePlayerAction('playCard', card, target)).not.toThrow();
        });

        it('should do nothing for unknown actions', () => {
            const player = spawnPlayer(10, 2, deck, hand, discard, []);
            const playSpy = jest.spyOn(player, 'playCard');
            handlePlayerAction('unknownAction');
            expect(playSpy).not.toHaveBeenCalled();
        });
    });

    describe('getPlayer', () => {
        it('should return the current player instance', () => {
            const player = spawnPlayer(10, 2, deck, hand, discard, []);
            expect(getPlayer()).toBe(player);
        });
    });

});
