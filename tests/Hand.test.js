/**
* @jest-environment jsdom
*/

import { jest } from '@jest/globals';
import Hand from '../src/components/Hand.js';
import { CrashOut } from '../src/components/cards/CrashOut.js';

describe('Hand class functionality', () => {
	let hand;
	let discardPile;

	beforeEach(() => {
		hand = new Hand();
		discardPile = {
			cards: [],
			addCard(card) {
				this.cards.push(card);
			},
		};
		hand.discardPile = discardPile;
		document.body.appendChild(hand);
	});

	afterEach(() => {
		hand.remove();
	});

	test('addCard adds a card to the hand and calls renderHandHelper', () => {
		const card = new CrashOut();
		hand.addCard(card);
		expect(hand.hand).toContain(card);
		expect(hand.shadowRoot.querySelector('.handArea').children.length).toBe(1);
	});

	test('removeCard removes a card from the hand and updates render', () => {
		const card = new CrashOut();
		hand.addCard(card);
		hand.removeCard(card);
		expect(hand.hand).not.toContain(card);
		expect(hand.shadowRoot.querySelector('.handArea').children.length).toBe(0);
	});

	test('playCard plays the card and removes it from the hand', () => {
		const card = new CrashOut();
		const enemy = {
			hp: 10,
			takeDamage(n) {
				this.hp -= n;
			},
		};

		hand.addCard(card);
		hand.playCard(card, enemy);

		expect(hand.hand).not.toContain(card);
		expect(enemy.hp).toBe(7);
	});

	test('discardCard removes card from hand and adds to discardPile', () => {
		const card = new CrashOut();
		hand.addCard(card);
		hand.discardCard(card);

		expect(hand.hand).not.toContain(card);
		expect(discardPile.cards).toContain(card);
	});

	test('discardHand discards all cards in hand to discard pile', () => {
		const card1 = new CrashOut();
		const card2 = new CrashOut();
		hand.addCard(card1);
		hand.addCard(card2);

		hand.discardHand();

		expect(hand.hand.length).toBe(0);
		expect(discardPile.cards).toContain(card1);
		expect(discardPile.cards).toContain(card2);
	});

	test('renderHandHelper replaces innerHTML and appends rendered cards', () => {
		const card1 = new CrashOut();
		const card2 = new CrashOut();

		const mockRender1 = document.createElement('div');
		const mockRender2 = document.createElement('div');
		mockRender1.className = 'mock-card-1';
		mockRender2.className = 'mock-card-2';
		card1.render = jest.fn(() => mockRender1);
		card2.render = jest.fn(() => mockRender2);

		hand.hand = [card1, card2];
		hand.renderHandHelper();

		const handArea = hand.shadowRoot.querySelector('.handArea');
		expect(handArea.children.length).toBe(2);
		expect(handArea.querySelector('.mock-card-1')).not.toBeNull();
		expect(handArea.querySelector('.mock-card-2')).not.toBeNull();
	});
});
