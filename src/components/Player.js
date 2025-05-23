import {shuffle,draw,moveCard,filterCards} from '../game/CardManager.js'


//A player has: current health, max health, current energy,
// max energy, block, zero or more status effects, a deck, a hand, and a discard.
export class Player extends HTMLElement{

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
    super();
    // Dynamically proxy the element's state so that whenever
    // the following properties change, render() is automatically triggered to re-render.
    this.state = new Proxy({
      maxHealth : maxHealth,
      maxEnergy : maxEnergy,
      effect : effect,
      currentHealth : maxHealth,
      currentEnergy : maxEnergy,
      block : 0,
    }, {
      set: (target, prop, value) => {
        target[prop] = value;
        this.render();   // 自动触发
        return true;
      }
    });

    this.discard = discard;
    this.hand = hand;
    // initialize the block and death status
    this.isDead = false;
    this.deck = deck;
    // temporary discard pile
    this.tempDiscard = [];



  }

  /**
   * The character takes damage
   * @param {number} amount
   */
  takeDamage(amount) {
    const effectiveDamage = Math.max(amount - this.state.block, 0);
    this.state.block = Math.max(this.state.block - amount, 0);
    this.state.currentHealth -= effectiveDamage;

    if (this.state.currentHealth <= 0) {
      this.state.currentHealth = 0;
      this.die();
    }
  }

  /**
   * Gain block
   * @param {number} amount
   */
  gainBlock(amount) {
    this.state.block += amount;
  }

  /**
   * receive healing
   * @param {number} amount
   */
  heal(amount) {
    this.state.currentHealth = Math.min(this.state.currentHealth + amount, this.state.maxHealth);
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
    const nowEnergy = this.state.currentEnergy-amount;
    if(nowEnergy<0){
      return false;
    }
    this.state.currentEnergy = nowEnergy;
    return true;
  }

  /**
   * Reset energy to MaxEnergy
   */
  resetEnergy() {
    this.state.currentEnergy = this.state.maxEnergy;
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

  /**
   * render the player
   */
  render(){
    const{maxHealth,maxEnergy,effect,
      currentHealth,currentEnergy,block
    } = this.state


  }

  connectedCallback(){
    this.render();
  }

}

customElements.define('my-player',Player);