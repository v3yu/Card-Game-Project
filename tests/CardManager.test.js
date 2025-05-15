import {shuffle, draw, moveCard, filterCards} from '../src/game/CardManager.js' 

const cards = [
  { name: 'Free Boba', type: 'special', cost: 1 },
  { name: 'Early Submission', type: 'special', cost: 0 },
  { name: 'CS Crash Out', type: 'attack', cost: 1 }
];

const cardsAttack = [
    {name: 'Redbull Crashout', type: 'attack', cost: 0 },
    {name: 'CSE 110 Midterm', type: 'attack', cost: 1},
    {name: 'Freeze Ray', type: 'attack', cost: 2}
];

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
  
    
/*
testExample('shuffle', () => {
    let deck = ['Ace', '2', '3', '4', '5'];
    shuffle(deck);

    expect(cards.sort()).toEqual(original.sort());
});
*/

//filterCards function test (added ret empty if no match, 
test('filterCards filters by cost', () => {
    const result = filterCards(cards, card => card.cost === 0);

    expect(result).toEqual([
        { name: 'Early Submission', type: 'special', cost: 0 }
      ]);
});

test('filterCards filters by type', () => {
    const result = filterCards(cards, card => card.type === 'attack');
    
    expect(result).toEqual([
        { name: 'CS Crash Out', type: 'attack', cost: 1 }
      ]);
});

test('filterCards filters by type with multiple', ()=>{
    const result= filterCards(cardsAttack, card => card.type === 'attack');
    expect(result).toEqual([
        {name: 'Redbull Crashout', type: 'attack', cost: 0 },
        {name: 'CSE 110 Midterm', type: 'attack', cost: 1},
        {name: 'Freeze Ray', type: 'attack', cost: 2}
    ])
});

test('filterCards returns empty if no type match', () => {
    const result = filterCards(cards, card => card.type === 'healing');
    expect(result).toEqual([]);
});

test('filterCards returns empty if no cost match', () => {
    const result = filterCards(cards, card => card.cost === 6);
    expect(result).toEqual([]);
});

test('filterCards handles empty input', () => {
    const result = filterCards([], card => card.cost === 0);
    expect(result).toEqual([]);
});

test('filterCards handles a regular deck of cards', () =>{
    const gambleYAY = createStandardDeck();
    const blackCards = filterCards(gambleYAY, card =>
        card.suit === 'Clubs' || card.suit === 'Spades'
    );
    expect(blackCards.length).toBe(26);
    expect(blackCards.every(card=>
        card.suit === 'Spades' || card.suit === 'Clubs'
    )).toBe(true);
});


//moveCard function test
test('moveCard', () => { 
    let hand = cards;
    let deck = [
        { name: 'Severe Crashout', type: 'attack', cost: 1 },
        { name: 'Fake Sleep', type: 'defense', cost: 1 },
    ];

    //Makes sure nothing happens if the card is not in the deck
    moveCard({ name: 'X', type: 'X', cost: 0 }, hand, deck);
    //Keep note that the index changes with the deck being popped
    moveCard(deck[0], deck, hand); 
    moveCard(deck[0], deck, hand); 
    //Makes sure that nothing happens if nothing is in the deck
    moveCard(deck[0], deck, hand); 

    let expectHand = [
        cards[0], 
        cards[1], 
        cards[2], 
        { name: 'Severe Crashout', type: 'attack', cost: 1 },
        { name: 'Fake Sleep', type: 'defense', cost: 1 }
    ];
    let expectDeck = [];

    expect(deck).toEqual(expectDeck);
    expect(hand).toEqual(expectHand);

});

test('moveCard works with a standard deck to hand', ()=>{
    const deck = createStandardDeck();
    const hand= []

    const movedCard = deck.find(card=> card.rank === 'K' && card.suit === 'Diamonds')

    moveCard(movedCard, deck, hand);
    
    expect(hand).toContainEqual(movedCard);
    expect(deck).not.toContainEqual(movedCard);
    expect(deck.length).toBe(51);
    expect(hand.length).toBe(1);
})

//shuffle function test
test('shuffle check no card loss', () => {
    const deck = [1, 2, 3, 4, 5, 6];
    const shuffleDeck = shuffle(deck);
    expect(deck.sort()).toEqual(shuffleDeck.sort());
});

test('shuffle small deck', () => {
    const deck = [1, 2, 3, 4, 5, 6];
    const shuffleDeck = shuffle(deck);
    expect(shuffle).not.toEqual(deck);
});

test('shuffle large deck', () => {
    const deck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const shuffleDeck = shuffle(deck);
    expect(shuffle).not.toEqual(deck);
});

test('shuffle preserves original elements (len,amt,value)' , () =>{
    const cardA = {name: 'Sigma', type: 'special', cost: 1 };
    const cardB = {name: 'Lebron James', type: 'attack', cost: 0 };
    const cardC = {name: 'Thomas A Powell', type: 'special', cost: 2 };

    const goatDeck = [cardA, cardB, cardC];
    const shuffleDeck = shuffle(goatDeck);
    expect(Array.isArray(shuffleDeck)).toBe(true);
    expect(shuffleDeck.length).toBe(goatDeck.length);
    expect(shuffleDeck).toEqual(expect.arrayContaining([cardA, cardB, cardC]));
    expect(shuffleDeck).not.toEqual(goatDeck); //this is failing
});


