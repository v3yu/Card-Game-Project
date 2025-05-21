import Hand from '../src/components/Hand.js';
import CrashOut from '../src/components/cards/CrashOut.js';

describe('Hand (pure logic tests)', () => {
	let hand;
	let discardPile;

	beforeEach(() => {
		hand = new Hand();
		discardPile = {
			cards: [],
			addCard(card) {
				this.cards.push(card);
			}
		};
		hand.discardPile = discardPile;
	});

	test('addCard adds card to hand array', () => {
		const card = new CrashOut();
		hand.addCard(card);
		expect(hand.hand).toContain(card);
	});

	test('removeCard removes card from hand array', () => {
		const card = new CrashOut();
		hand.addCard(card);
		hand.removeCard(card);
		expect(hand.hand).not.toContain(card);
	});

	test('playCard calls play and removes card from hand', () => {
		const card = new CrashOut();
		const enemy = {
			hp: 10,
			takeDamage(n) {
				this.hp -= n;
			}
		};
		hand.addCard(card);
		hand.playCard(card, enemy);
		expect(hand.hand).not.toContain(card);
		expect(enemy.hp).toBe(7);
	});

	test('discardCard removes card and adds it to discard pile', () => {
		const card = new CrashOut();
		hand.addCard(card);
		hand.discardCard(card);
		expect(hand.hand).not.toContain(card);
		expect(discardPile.cards).toContain(card);
	});

	test('discardHand discards all cards to discard pile', () => {
		const card1 = new CrashOut();
		const card2 = new CrashOut();
		hand.addCard(card1);
		hand.addCard(card2);
		hand.discardHand();
		expect(hand.hand.length).toBe(0);
		expect(discardPile.cards).toContain(card1);
		expect(discardPile.cards).toContain(card2);
	});
});
