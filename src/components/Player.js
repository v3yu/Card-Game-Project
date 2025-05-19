//A player has: current health, max health, current energy,
// max energy, block, zero or more status effects, a deck, a hand, and a discard.
export class Player extends HTMLElement{
  constructor() {
    super();

  }
  takeDamage(amount){

  }
  gainBlock(amount){

  }
  heal(amount){

  }

  // Trigger an animation of the defeat
  die(){

  }
  spendEnergy(amount){

  }
  resetEnergy(){

  }
  drawCards(amount){

  }

  // TODO No effect in MVP
  applyEffect(name, effects){

  }
  discardCard(card){

  }
  shuffleDeck(){

  }
  shuffleDiscardIntoDeck(){

  }

}