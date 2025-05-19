import {shuffle,draw,moveCard,filterCards} from '../game/CardManager.js'


//A player has: current health, max health, current energy,
// max energy, block, zero or more status effects, a deck, a hand, and a discard.
export class Player {

  /**
   * Creates a player instance with health, energy, deck, hand, discard pile, and status effects and block.
   *
   * @param {number} maxHealth - The player's maximum health.
   * @param {number} maxEnergy - The player's maximum energy.
   * @param {Array} deck - The player's starting deck of cards.
   * @param {Array} hand - The player's starting hand of cards.
   * @param {Array} discard - The player's discard pile.
   * @param {Array} [effect=[]] - An array of status effects (e.g., poison, weaken). Defaults to an empty array.
   */
  constructor(maxHealth, maxEnergy, deck, hand, discard, effect = []) {
    this.maxHealth = maxHealth;
    this.maxEnergy = maxEnergy;
    this.deck = deck;
    this.hand = hand;
    this.discard = discard;
    this.effect = effect;
    this.currentHealth = maxHealth;
    this.currentEnergy = maxEnergy;

    // initialize the block and death status
    this.block = 0;
    this.isDead = false;

    // temporary discard pile
    this.tempDiscard = [];
  }

  /**
   * The character takes damage
   * @param {number} amount
   */
  takeDamage(amount) {
    const effectiveDamage = Math.max(amount - this.block, 0);
    this.block = Math.max(this.block - amount, 0);
    this.currentHealth -= effectiveDamage;

    if (this.currentHealth <= 0) {
      this.currentHealth = 0;
      this.die();
    }
  }

  /**
   * Gain block
   * @param {number} amount
   */
  gainBlock(amount) {
    this.block += amount;
  }

  /**
   * receive healing
   * @param {number} amount
   */
  heal(amount) {
    this.currentHealth = Math.min(this.currentHealth + amount, this.maxHealth);
  }


  die() {
    // TODO: Implement death logic (e.g. remove from battle, trigger animation, etc.)
  }

  /**
   * Attempts to spend a specified amount of energy.
   * If the player does not have enough energy, the operation fails and returns false.
   * Otherwise, deducts the energy and returns true.
   *
   * @param {number} amount - The amount of energy to spend.
   * @returns {boolean} - Returns true if the energy was successfully spent, false if not enough energy is available.
   */
  spendEnergy(amount) {
    const nowEnergy = this.currentEnergy-amount;
    if(nowEnergy<0){
      return false;
    }
    this.currentEnergy = nowEnergy;
    return true;
  }

  /**
   * Reset energy to MaxEnergy
   */
  resetEnergy() {
    this.currentEnergy = this.maxEnergy;
  }

  /**
   * Draw cards
   * @param {number} amount
   */
  drawCards(amount) {
    // TODO drawCards after deck.js and hand.js is completed
  }

  // TODO No effect in MVP
  applyEffect(name, effects) {

  }

  /**
   * Move all cards from the temporary discard pile into the main discard pile
   */
  moveTempDiscardToDiscard() {
    for(const card of this.tempDiscard){
      moveCard(card,this.tempDiscard,this.discard);
    }
    this.tempDiscard = [];
  }

  /**
   * Shuffle the deck
   */
  shuffleDeck() {
    shuffle(this.deck);
  }

  /**
   * Shuffle the discard pile into the deck
   */
  shuffleDiscardIntoDeck() {
    for(let card of this.discard){
      moveCard(card,this.discard,this.deck);
    }
    shuffle(this.deck);
    this.discard = [];
  }

}