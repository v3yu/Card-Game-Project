
//Function to shuffle cards (pass-by-reference)
export function shuffle(cards) {
  // Fisher-Yates shuffle algorithm
  for (let i = cards.length-1; i >= 0; i--) {
    const idToSwap = Math.floor(Math.random() * (i+1));
    const spare = cards[idToSwap];
    cards[idToSwap] = cards[i];
    cards[i] = spare;
  }
  return cards;
}

//Function to draw specific amount of cards (pass-by-reference)
export function draw(cards, number) {
  // Draw the specified number of cards from the deck
  //Should call Deck.draw() for a card then Hand.add() to the hand
  //**Plan do some sort of for loop for i=0, i<number and deck.length>0. 
  // have some const equal to deck.shift(if deck is top-first) 
  // and then push to the hand from the constant variable*/
  // TODO
  
}

//Function to move cards from one collection to another (pass-by-reference)
export function moveCard(card, fromCollection, toCollection) {
  // Moving cards between deck, hand, discard, etc.
  //Note: Use the reference of the card when using this function and not it's
  //actual value as it would cause issue with card duplicates.
  const index = fromCollection.indexOf(card); 

  if (index >= 0 && index < fromCollection.length) {
    fromCollection.splice(index, 1);
    toCollection.push(card);
  }
}

//Function to filter cards (pass-by-value)
export function filterCards(cards, condition) {
// Filter cards based on a condition (e.g., type, rarity, etc.)
//Note: parameter 'condition' is a function being passed in
  const result = [];

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    if (condition(card)) {
        result.push(card);
    }
  }

  return result;  
}
