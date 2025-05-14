

export function shuffle(cards) {
  // Fisher-Yates shuffle algorithm
  for (let i = cards.length-1; i >= 0; i--) {
    const idToSwap = Math.floor(Math.random() * i);
    const spare = cards[idToSwap];
    cards[idToSwap] = cards[i];
    cards[i] = spare;
  }

  return cards;
}

export function draw(cards, number) {
    // Draw the specified number of cards from the deck
    //Should call Deck.draw() for a card then Hand.add() to the hand
    
}

export function moveCard(card, fromCollection, toCollection) {
    // Moving cards between deck, hand, discard, etc.
    const index = fromCollection.indexOf(card);

    if (index >= 0 && index < fromCollection.length) {
        fromCollection.splice(index, 1);
        toCollection.push(card);
    }
}

export function filterCards(cards, condition) {
    // Filter cards based on a condition (e.g., type, rarity, etc.)
    const result = [];

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        if (condition(card)) {
            result.push(card);
        }
    }
  
    return result;  
}
