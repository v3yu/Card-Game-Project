/**
 * @jest-environment jsdom
 */

import Discard from '../src/components/Discard.js';
import { Card } from '../src/components/Card.js';
import * as CardManager from '../src/components/CardManager.js';

// Mock shuffle to return array unchanged for test predictability
jest.spyOn(CardManager, 'shuffle').mockImplementation(arr => arr);

describe('Discard class logic tests', () => {
  let discard, card1, card2;

  beforeEach(() => {
    document.body.innerHTML = '<discard-pile></discard-pile>';
    discard = document.querySelector('discard-pile');

    card1 = new Card('Free Boba', 'special', 1);
    card2 = new Card('Early Submission', 'special', 0);
  });

  test('addCard adds a valid card and returns 0', () => {
    const result = discard.addCard(card1);
    expect(result).toBe(0);
    expect(discard.discard).toContain(card1);
  });

  test('addCard returns -1 on invalid input', () => {
    expect(discard.addCard("not-a-card")).toBe(-1);
    expect(discard.discard.length).toBe(0);
  });

  test('removeCard removes a card and returns its index', () => {
    discard.addCard(card1);
    discard.addCard(card2);
    const index = discard.removeCard(card1);
    expect(index).toBe(0);
    expect(discard.discard).not.toContain(card1);
    expect(discard.discard).toContain(card2);
  });

  test('removeCard returns -1 for non-card or missing card', () => {
    discard.addCard(card2);
    expect(discard.removeCard("bad")).toBe(-1);
    const fakeCard = new Card('Fake', 'junk', 0);
    expect(discard.removeCard(fakeCard)).toBe(-1);
  });

  test('clear empties the discard pile', () => {
    discard.addCard(card1);
    discard.addCard(card2);
    discard.clear();
    expect(discard.discard.length).toBe(0);
  });

  test('shuffleDiscardIntoDeck moves all cards to deck and clears discard', async () => {
    const DeckModule = await import('../src/components/Deck.js');
    const Deck = DeckModule.default;
    const deck = new Deck();

    discard.addCard(card1);
    discard.addCard(card2);

    expect(deck.deckSize()).toBe(0);

    const result = discard.shuffleDiscardIntoDeck(deck);
    expect(result).toBe(0);
    expect(deck.deckSize()).toBe(2);
    expect(discard.discard.length).toBe(0);
  });

  test('shuffleDiscardIntoDeck returns -1 if deck is invalid', () => {
    discard.addCard(card1);
    const result = discard.shuffleDiscardIntoDeck({});
    expect(result).toBe(-1);
    expect(discard.discard.length).toBe(1);
  });
});
