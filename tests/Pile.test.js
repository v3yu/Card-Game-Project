// tests/Pile.test.js
import { Pile } from '../src/components/Pile.js';
import { Card } from '../src/components/Card.js';


describe('Pile class', () => {
  let pile,card1,card2;

  beforeEach(() => {
    pile = new Pile();
    card1 = new Card({ name: 'CrashOut' });
    card2 = new Card({ name: 'EarlySubmission' });
  });

  test('should start with empty card array', () => {
    expect(pile.getCards()).toEqual([]);
    expect(pile.size()).toBe(0);
  });

  test('addCard should add one card to the pile', () => {
    const card = new Card('me');
    pile.addCard(card);
    expect(pile.getCards()).toEqual([card]);
    expect(pile.size()).toBe(1);
  });

  test('addCards should add multiple cards', () => {
    const card1 = new Card('Strike');
    const card2 = new Card('Defend');
    pile.addCards([card1, card2]);
    expect(pile.getCards()).toEqual([card1, card2]);
    expect(pile.size()).toBe(2);
  });

  test('clear should remove all cards', () => {
    pile.addCard(new Card('A'));
    pile.addCard(new Card('B'));
    pile.clear();
    expect(pile.getCards()).toEqual([]);
    expect(pile.size()).toBe(0);
  });

  test('shuffle should randomize card order', () => {
    const cards = [
      new Card('A'),
      new Card('B'),
      new Card('C'),
      new Card('D'),
    ];
    pile.addCards(cards);

    const before = [...pile.getCards()];
    pile.shuffle();
    const after = pile.getCards();

    expect(after.length).toBe(before.length);

    expect(after).toEqual(expect.arrayContaining(before));
  });

  test('removes an existing card and returns correct index', () => {
    pile.addCard(card1);
    pile.addCard(card2);

    const index = pile.removeCard(card1);
    expect(index).toBe(0);
    expect(pile.cards).not.toContain(card1);
    expect(pile.cards).toContain(card2);
  });

  test('returns -1 when trying to remove a card not in the pile', () => {
    pile.addCard(card1);

    const result = pile.removeCard(card2); // card2 was never added
    expect(result).toBe(-1);
    expect(pile.cards.length).toBe(1);
    expect(pile.cards[0]).toBe(card1);
  });

  test('returns -1 when removing an invalid object (not a Card)', () => {
    pile.addCard(card1);

    const result = pile.removeCard("not a card");
    expect(result).toBe(-1);
    expect(pile.cards.length).toBe(1);
  });
});
