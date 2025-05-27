/**
 * @jest-environment jsdom
 */

import Discard from '../src/components/Discard.js';
import Card from '../src/components/Card.js';
import * as CardManager from '../src/components/CardManager.js';

jest.spyOn(CardManager, 'shuffle').mockImplementation(arr => arr); // no-op shuffle

let Deck;

beforeAll(async () => {
  const DeckModule = await import('../src/components/Deck.js');
  Deck = DeckModule.default;
});

describe('Discard tests with real Card and shuffle()', () => {
  let discard, card1, card2;

  beforeEach(() => {
    document.body.innerHTML = '<discard-pile></discard-pile>';
    discard = document.querySelector('discard-pile');

    card1 = new Card({
      name: 'Free Boba',
      type: 'special',
      cost: 1,
      description: 'A free drink!',
      effect: 'Refresh',
      image: 'boba.png'
    });

    card2 = new Card({
      name: 'Early Submission',
      type: 'special',
      cost: 0,
      description: 'Extra points!',
      effect: 'Win',
      image: 'early.png'
    });
  });

  test('addCard works for valid Card', () => {
    expect(discard.addCard(card1)).toBe(0);
    expect(discard.discard).toContain(card1);
  });

  test('addCard returns -1 for invalid input', () => {
    expect(discard.addCard("fake")).toBe(-1);
    expect(discard.discard.length).toBe(0);
  });

  test('removeCard works and returns index', () => {
    discard.addCard(card1);
    discard.addCard(card2);
    const index = discard.removeCard(card1);
    expect(index).toBe(0);
    expect(discard.discard).not.toContain(card1);
  });

  test('removeCard returns -1 for card not in pile', () => {
    expect(discard.removeCard(card1)).toBe(-1);
  });

  test('clear() empties the discard pile', () => {
    discard.addCard(card1);
    discard.clear();
    expect(discard.discard.length).toBe(0);
  });

  test('shuffleDiscardIntoDeck moves all cards and clears discard', () => {
    const deck = new Deck();
    discard.addCard(card1);
    discard.addCard(card2);

    expect(deck.deckSize()).toBe(0);
    const result = discard.shuffleDiscardIntoDeck(deck);
    expect(result).toBe(0);
    expect(deck.deckSize()).toBe(2);
    expect(discard.discard.length).toBe(0);
  });

  test('shuffleDiscardIntoDeck returns -1 for invalid deck', () => {
    discard.addCard(card1);
    const result = discard.shuffleDiscardIntoDeck({});
    expect(result).toBe(-1);
    expect(discard.discard.length).toBe(1);
  });
});
