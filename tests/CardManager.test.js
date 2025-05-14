import {shuffle, draw, moveCard, filterCards} from '../src/game/CardManager.js' 

const cards = [
  { name: 'Free Boba', type: 'special', cost: 1 },
  { name: 'Early Submission', type: 'special', cost: 0 },
  { name: 'CS Crash Out', type: 'attack', cost: 1 }
];

/*
testExample('shuffle', () => {
    let deck = ['Ace', '2', '3', '4', '5'];
    shuffle(deck);

    expect(cards.sort()).toEqual(original.sort());
});
*/

//filterCards function test
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
