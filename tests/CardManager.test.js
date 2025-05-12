testExample('shuffle', () => {
    let deck = ['Ace', '2', '3', '4', '5'];
    shuffle(deck);

    expect(cards.sort()).toEqual(original.sort());
});