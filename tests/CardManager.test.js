import {shuffle, draw, moveCard, filterCards} from '../src/game/CardManager.js' 

/*
testExample('shuffle', () => {
    let deck = ['Ace', '2', '3', '4', '5'];
    shuffle(deck);

    expect(cards.sort()).toEqual(original.sort());
});
*/

test('moveCard', () => {
    let deck1 = ['King', '2', '3', '4', '5'];

    let deck2 = ['Jack', 'Ace'];

    moveCard('King', deck1, deck2);

    let expectDeck_1 = ['2', '3', '4', '5'];

    let expectDeck_2 = ['Jack', 'Ace', 'King'];

    expect(deck1).toEqual(expectDeck_1);
    expect(deck2).toEqual(expectDeck_2);
});


