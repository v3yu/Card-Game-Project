/**
* @jest-environment jsdom
*/

import { jest } from '@jest/globals';
import Hand from '../src/components/Hand.js';
import { CrashOut } from '../src/components/cards/CrashOut.js';
import {EarlySubmission} from "../src/components/cards/EarlySubmission.js";

describe('Hand class functionality', () => {
	let hand;
	let discardPile;

	beforeEach(() => {
		hand = new Hand();
		document.body.appendChild(hand);
	});

	afterEach(() => {
		hand.remove();
	});

	test('addCard adds a card to hand', () => {
		const card = new CrashOut();
		hand.addCard(card);
		expect(hand.hand).toContain(card);
		expect(hand.shadowRoot.querySelector('.handArea').children.length).toBe(1);
	});

	test('removeCard removes a card from the hand', () => {
		const card1 = new CrashOut();
		const card2 = new EarlySubmission();
		hand.addCard(card1);
		hand.addCard(card2)
		hand.removeCard(card1);
		expect(hand.hand).not.toContain(card1);
		expect(hand.shadowRoot.querySelector('.handArea').children.length).toBe(1);
	});

	test('removeCard removes the card and triggers compactHand', () => {
		const card1 = new CrashOut();
		const card2 = new CrashOut();

		hand.addCard(card1);
		hand.addCard(card2);

		const result = hand.removeCard(card1);

		expect(result).toBe(0);
		expect(hand.hand).not.toContain(card1);
		expect(hand.hand.length).toBe(1);
		expect(hand.hand[0]).toBe(card2);
		expect(hand.shadowRoot.querySelector('.handArea').children.length).toBe(1); // DOM 同步
	});

	test('removeCard returns -1 when card not found', () => {
		const card = new CrashOut();
		const result = hand.removeCard(card);
		expect(result).toBe(-1);
		expect(hand.hand.length).toBe(0);
	});

	test('compactHand removes undefined slots and reorders', () => {
		const card1 = new CrashOut();
		const card2 = new CrashOut();
		const card3 = new CrashOut();

		hand.addCard(card1);
		hand.addCard(card2);
		hand.addCard(card3);

		delete hand.hand[1];
		hand.compactHand();

		expect(hand.hand.length).toBe(2);
		expect(hand.hand[0]).toBe(card1);
		expect(hand.hand[1]).toBe(card3);
		expect(hand.hand).not.toContain(undefined);
		expect(hand.shadowRoot.querySelector('.handArea').children.length).toBe(2);
	});

	test('renderHandHelper updates handArea with new card', () => {
		const card1 = new CrashOut();
		const card2 = new CrashOut();
	
		hand.addCard(card1);
		hand.addCard(card2);

	
		const handArea = hand.shadowRoot.querySelector('.handArea');
		expect(handArea.children.length).toBe(2);
		expect(handArea.children[0]).toBe(card1);
		expect(handArea.children[1]).toBe(card2);
	});


});
