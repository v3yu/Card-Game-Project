import {shuffle, draw, moveCard, filterCards} from '../src/game/CardManager.js' 

/*
testExample('shuffle', () => {
    let deck = ['Ace', '2', '3', '4', '5'];
    shuffle(deck);

    expect(cards.sort()).toEqual(original.sort());
});
*/

//filterCards function test
test('filterCards filters by cost', () => {
    const cards = [
        { name: 'Free Boba', type: 'special', cost: 1 },
        { name: 'Early Submission', type: 'special', cost: 0 }
    ];

    const result = filterCards(cards, card => card.cost === 0);

    expect(result).toEqual([
        { name: 'Early Submission', type: 'special', cost: 0 }
      ]);
});


