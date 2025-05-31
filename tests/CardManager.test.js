import {shuffle, draw, moveCard, filterCards} from '../src/game/CardManager.js'
import Card from "../src/components/Card.js";
import {Pile} from "../src/components/Pile.js";

/**
 * 
 * Sample Cards
 * 
 */

const cards = [
  new Card({ name: 'Free Boba', type: 'special', cost: 1 }),
  new Card( { name: 'Early Submission', type: 'special', cost: 0 }),
  new Card(  { name: 'CS Crash Out', type: 'attack', cost: 1 })
];
const cardPile = new Pile(cards);

const cardsAttack = [
  new Card({name: 'Redbull Crashout', type: 'attack', cost: 0 }),
  new Card( {name: 'CSE 110 Midterm', type: 'attack', cost: 1}),
  new Card({name: 'Freeze Ray', type: 'attack', cost: 2})
];
const attackPile = new Pile(cardsAttack);

function createStandardDeck() {
  const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  const ranks = [
  { rank: 'A', value: 1 },
  { rank: '2', value: 2 },
  { rank: '3', value: 3 },
  { rank: '4', value: 4 },
  { rank: '5', value: 5 },
  { rank: '6', value: 6 },
  { rank: '7', value: 7 },
  { rank: '8', value: 8 },
  { rank: '9', value: 9 },
  { rank: '10', value: 10 },
  { rank: 'J', value: 11 },
  { rank: 'Q', value: 12 },
  { rank: 'K', value: 13 }
  ];

  const deckoCards = [];

  for(const suit of suits) {
    for (const { rank, value } of ranks) {
      deckoCards.push({
      rank,
      suit,
      value,
      name: `${rank} of ${suit}`
      });
    }
  }
  return deckoCards;
} 

const gamblerDeck = createStandardDeck();

/**
 * 
 * filterCards() Function Tester
 * 
 */
test('filterCards filters by cost', () => {
  const result = filterCards(cardPile, card => card.cost === 0);

  expect(result).toEqual([
    new Card({ name: 'Early Submission', type: 'special', cost: 0 })
  ]);
});

test('filterCards filters by type', () => {
  const result = filterCards(cardPile, card => card.type === 'attack');

  expect(result).toEqual([
    new Card({ name: 'CS Crash Out', type: 'attack', cost: 1 })
  ]);
});

test('filterCards filters by type with multiple', ()=>{
  const result= filterCards(attackPile, card => card.type === 'attack');
  expect(result).toEqual(cardsAttack)
});

test('filterCards returns empty if no type match', () => {
  const result = filterCards(cardPile, card => card.type === 'healing');
  expect(result).toEqual([]);
});

test('filterCards returns empty if no cost match', () => {
  const result = filterCards(cardPile, card => card.cost === 6);
  expect(result).toEqual([]);
});

test('filterCards handles empty input', () => {
  const result = filterCards(new Pile(), card => card.cost === 0);
  expect(result).toEqual([]);
});



/**
 * 
 * moveCard() Function Tester
 * 
 */
test('moveCard works with objects', () => { 
  let hand = new Pile([... cards]) ;
  let deck =new Pile([
    new Card({ name: 'Severe Crashout', type: 'attack', cost: 1 }),
    new Card({ name: 'Fake Sleep', type: 'defense', cost: 1 }),
  ]) ;

  //Makes sure nothing happens if the card is not in the deck
  moveCard(new Card({ name: 'Free Boba', type: 'special', cost: 1 }), hand, deck);
  //Keep note that the index changes with the deck being popped
  moveCard(deck.getCards()[0], deck, hand);
  moveCard(deck.getCards()[0], deck, hand);
  //Makes sure that nothing happens if nothing is in the deck
  moveCard(deck.getCards()[0], deck, hand);

  let expectHand = [
    cards[0], 
    cards[1], 
    cards[2], 
    new Card({ name: 'Severe Crashout', type: 'attack', cost: 1 }),
    new Card({ name: 'Fake Sleep', type: 'defense', cost: 1 })
  ];
  /**
   *
   * @type {Card[]}
   */
  let expectDeck = [];

  expect(deck.getCards()).toEqual(expectDeck);
  expect(hand.getCards()).toEqual(expectHand);

});

test('moveCard with Card Duplicates', ()=> {
  let hand =new Pile([
    new Card({ name: 'Severe Crashout', type: 'attack', cost: 1 }),
    new Card({ name: 'Fake Sleep', type: 'defense', cost: 1 }),
    new Card({ name: 'Severe Crashout', type: 'attack', cost: 1 })
  ]) ;

  let deck = new Pile([...cards]);

  let expectHand = [
    new Card({ name: 'Severe Crashout', type: 'attack', cost: 1 }),
    new Card({ name: 'Fake Sleep', type: 'defense', cost: 1 })
  ];
  moveCard(hand.getCards()[2], hand, deck);

  expect(hand.getCards()[0]).toEqual(expectHand[0]);
  expect(hand.getCards()[1]).toEqual(expectHand[1]);
});



/**
 * 
 * shuffle() Function Tester
 * 
 */
test('shuffle check no card loss', () => {
  const deck = [1, 2, 3, 4, 5, 6];
  const original = [1, 2, 3, 4, 5, 6];
  shuffle(deck);
  expect(deck.sort()).toEqual(original.sort());
});


test('shuffle small deck', () => {
  const deck = [1, 2, 3, 4, 5, 6];
  const original = [1, 2, 3, 4, 5, 6];
  shuffle(deck);
  process.stdout.write('test case:shuffle small deck\n'+
                      JSON.stringify(deck)+'\n');
  expect(original).not.toEqual(deck);
});

test('shuffle large deck', () => {
  const deck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const origin = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  shuffle(deck);
  process.stdout.write('test case:shuffle large deck\n'+
                JSON.stringify(deck)+'\n');
  expect(origin).not.toEqual(deck);
});

test('shuffle preserves original elements (len,amt,value)' , () =>{
  const cardA = {name: 'Sigma', type: 'special', cost: 1 };
  const cardB = {name: 'Lebron James', type: 'attack', cost: 0 };
  const cardC = {name: 'Thomas A Powell', type: 'special', cost: 2 };

  const goatDeck = [cardA, cardB, cardC];
  const unchangedDeck = [cardA, cardB, cardC];
  shuffle(goatDeck);
  // TODO Directly view the shuffled array through output.
  process.stdout.write('test case:shuffle preserves original elements (len,amt,value):\n'+
                                  JSON.stringify(goatDeck)+'\n');
  expect(Array.isArray(goatDeck)).toBe(true);
  expect(goatDeck.length).toBe(unchangedDeck.length);
  expect(goatDeck).toEqual(expect.arrayContaining([cardA, cardB, cardC]));

});


