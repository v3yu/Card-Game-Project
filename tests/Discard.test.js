/**
 * @jest-environment jsdom
 */

import Discard from '../src/components/Discard.js';
import * as CardManager from '../src/game/CardManager.js';

// Mock shuffle to return array unchanged
//jest.spyOn(CardManager, 'shuffle').mockImplementation(arr => arr);

describe('Discard class tests with plain object cards', () => {
  let discard;
  let card1, card2, card3;

  beforeEach(() => {
    document.body.innerHTML = '<discard-pile></discard-pile>';
    discard = document.querySelector('discard-pile');

    // Use your object format
    card1 = { name: 'Free Boba', type: 'special', cost: 1 };
    card2 = { name: 'Early Submission', type: 'special', cost: 0 };
    card3 = { name: 'CS Crash Out', type: 'attack', cost: 1 };
  });

  test('should add a card to discard pile', () => {
    expect(discard.addCard(card1)).toBe(0);
    expect(discard.discard.length).toBe(1);
    expect(discard.discard[0]).toEqual(card1);
  });

  test('should reject invalid card (non-object)', () => {
    expect(discard.addCard("not-a-card")).toBe(-1);
    expect(discard.discard.length).toBe(0);
  });

  test('should remove a card correctly', () => {
    discard.addCard(card1);
    discard.addCard(card2);
    const index = discard.removeCard(card1);
    expect(index).toBe(0);
    expect(discard.discard).not.toContain(card1);
    expect(discard.discard).toContain(card2);
  });

  test('removeCard returns -1 for non-matching or invalid input', () => {
    discard.addCard(card2);
    expect(discard.removeCard("fake")).toBe(-1);
    expect(discard.removeCard(card3)).toBe(-1);
  });

  test('clear() should empty discard pile and DOM', () => {
    discard.addCard(card1);
    discard.renderDiscardHelper();
    expect(discard.children.length).toBe(1);
    discard.clear();
    expect(discard.discard.length).toBe(0);
    expect(discard.children.length).toBe(0);
  });

  test('renderDiscardHelper should append cards to DOM (with manual render)', () => {
    // Fake render() method
    card1.render = () => {
      const div = document.createElement('div');
      div.textContent = card1.name;
      card1.appendChild?.(div) ?? Object.assign(card1, div);
    };
    card2.render = () => {
      const div = document.createElement('div');
      div.textContent = card2.name;
      card2.appendChild?.(div) ?? Object.assign(card2, div);
    };

    discard.addCard(card1);
    discard.addCard(card2);
    discard.renderDiscardHelper();
    expect(discard.children.length).toBe(2);
  });

  test('shuffleDiscardIntoDeck moves cards and clears discard', async () => {
    // Dynamically import Deck
    const DeckModule = await import('../src/components/Deck.js');
    const Deck = DeckModule.default;

    const deck = new Deck();
    document.body.appendChild(deck);

    discard.addCard(card1);
    discard.addCard(card2);
    expect(deck.deckSize()).toBe(0);

    discard.shuffleDiscardIntoDeck(deck);
    expect(deck.deckSize()).toBe(2);
    expect(discard.discard.length).toBe(0);
    expect(discard.children.length).toBe(0);
  });

  test('shuffleDiscardIntoDeck returns -1 if input is not a deck', () => {
    discard.addCard(card1);
    const result = discard.shuffleDiscardIntoDeck({});
    expect(result).toBe(-1);
    expect(discard.discard.length).toBe(1);
  });
});
