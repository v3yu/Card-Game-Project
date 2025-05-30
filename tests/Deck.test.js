/**
 * @jest-environment jsdom
 */

import Deck from '../src/components/Deck.js';
import {CrashOut} from '../src/components/cards/CrashOut.js';

describe("Player's deck element", () => {
  beforeAll(() => {
    if (!customElements.get('player-deck')) {
      customElements.define('player-deck', Deck);
    }
  });

  test("creating an instance of Deck", () => {
    const deck = document.createElement('player-deck');
    expect(deck).toBeInstanceOf(Deck);
  });

  test("adding real card to the deck", () => {
    const testCard = new CrashOut();
    const deck = document.createElement('player-deck');
    const adding = deck.addCard(testCard);
    expect(adding).toBe(0);
    expect(JSON.stringify(deck.showDeck())).toBe(`[{"name":"Crash Out","type":"attack","cost":1,"description":"You've been debugging for 6 hours straight.","effect":"Deal 3 damage.","image":"/src/img/CrashOut.png","article":{}}]`);
  })

  test("adding fake card to the deck", () => {
    const fakeCard = "fake card";
    const deck = document.createElement('player-deck');
    const adding = deck.addCard(fakeCard);
    expect(adding).toBe(-1);
    expect(JSON.stringify(deck.showDeck())).toBe("[]");
  })

  test("removing real card from the deck", () => {
    const realCard = new CrashOut();
    const deck = document.createElement('player-deck');
    deck.addCard(realCard);
    expect(JSON.stringify(deck.showDeck())).toBe(`[{"name":"Crash Out","type":"attack","cost":1,"description":"You've been debugging for 6 hours straight.","effect":"Deal 3 damage.","image":"/src/img/CrashOut.png","article":{}}]`);
    const removing = deck.removeCard(realCard);
    expect(removing).toBe(0);
    expect(JSON.stringify(deck.showDeck())).toBe("[]");
  })

  test("removing fake card from the deck", () => {
    const realCard = new CrashOut();
    const deck = document.createElement('player-deck');
    deck.addCard(realCard);
    expect(JSON.stringify(deck.showDeck())).toBe(`[{"name":"Crash Out","type":"attack","cost":1,"description":"You've been debugging for 6 hours straight.","effect":"Deal 3 damage.","image":"/src/img/CrashOut.png","article":{}}]`);
    const removing = deck.removeCard("fake card");
    expect(removing).toBe(-1);
    expect(JSON.stringify(deck.showDeck())).toBe(`[{"name":"Crash Out","type":"attack","cost":1,"description":"You've been debugging for 6 hours straight.","effect":"Deal 3 damage.","image":"/src/img/CrashOut.png","article":{}}]`);
  })

  test("drawing from empty deck", () => {
    const deck = document.createElement('player-deck');
    const card = deck.drawCard();
    expect(card).toBe(undefined);
  })

  test("drawing from not empty deck", () => {
    const deck = document.createElement('player-deck');
    const testCard = new CrashOut();
    deck.addCard(testCard);
    const drawedCard = deck.drawCard();
    expect(drawedCard).toBe(testCard);
  })

  test("testing deck size", () => {
    const deck = document.createElement('player-deck');
    const testCard = new CrashOut();
    deck.addCard(testCard);
    deck.addCard(testCard);
    deck.addCard(testCard);
    deck.addCard(testCard);
    expect(deck.deckSize()).toBe(4);
  })

  test("testing showDeck", () => {
    const deck = document.createElement('player-deck');
    const testCard = new CrashOut();
    deck.addCard(testCard);
    deck.addCard(testCard);
    expect(JSON.stringify(deck.showDeck())).toBe(`[{"name":"Crash Out","type":"attack","cost":1,"description":"You've been debugging for 6 hours straight.","effect":"Deal 3 damage.","image":"/src/img/CrashOut.png","article":{}},{"name":"Crash Out","type":"attack","cost":1,"description":"You've been debugging for 6 hours straight.","effect":"Deal 3 damage.","image":"/src/img/CrashOut.png","article":{}}]`);
  })
});