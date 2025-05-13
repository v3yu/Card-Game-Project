

export function shuffle(card) {
  // Fisher-Yates shuffle algorithm
  
}

export function draw(cards, number) {
    // Draw the specified number of cards from the deck
    //Should call Deck.draw() for a card then Hand.add() to the hand
    
}

export function moveCard(card, fromCollection, toCollection) {
    // Moving cards between deck, hand, discard, etc.
    
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
