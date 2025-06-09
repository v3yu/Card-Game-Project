import {moveCard} from '../game/CardManager.js';
import Deck from './Deck.js';
import Hand from './Hand.js';
import Discard from './Discard.js';
import {Pile} from './Pile.js';


//A player has: current health, max health, current energy,
// max energy, block, zero or more status effects, a deck, a cards, and a discard.
/**
 *  @description Represents a player in the game.
 *  @class Player
 */
export class Player extends HTMLElement{

  style=`
        body {
            font-family: sans-serif;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .player-ui {
            width: 300px;
            padding: 10px;
        }


        .block-row {
            display: flex;
            align-items: center;
            gap: 6px;
            margin-bottom: 8px;
            font-size: 16px;
        }
        .block-row  img{
            width: 20px;
        }


        #enemyImg{
            width: 100%;
            align-items: center;
        }

        .hp-bar-container {
            position: relative;
            height: 24px;
            border: 1px solid #aaa;
            border-radius: 6px;
            background-color: #ddd;
            overflow: hidden;
        }

        .hp-bar {
            height: 100%;
            width: 100%;
            background: linear-gradient(to right, #aef, #5cf);
            transition: width 0.3s ease;
        }

        .hp-text {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #000;
            text-shadow: 1px 1px #fff;
            pointer-events: none;
        }

        .effect-container{
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
        }
        .effectIcon{
            width: 10%;
        }

         @keyframes hitEffect {
        0%, 100% {
          transform: translateX(0);
          filter: none;
        }
        25%, 75% {
          transform: translateX(-8px);
          filter: brightness(0.5) sepia(1) hue-rotate(-50deg) saturate(4);
        }
        50% {
          transform: translateX(8px);
          filter: brightness(0.5) sepia(1) hue-rotate(-50deg) saturate(4);
        }
      }

      .hit {
        animation: hitEffect 0.4s ease-in-out;
      }
  `;

  template = (t)=>`
    <img src="/src/img/sprite.png" alt="player" id="enemyImg">
   <div class="block-row">
        <img src="/src/img/shieldicon.png" alt="block">
        <span id="block">${t.state.block}</span>
        <img src="/src/img/energyicon.png" alt="energy">
        <span id="energy">${t.state.currentEnergy}/${t.state.maxEnergy}</span>
    </div>
    <div class="hp-bar-container">
        <div class="hp-text">${t.state.currentHealth}/${t.state.maxHealth}</div>
        <div class="hp-bar"></div>
    </div>
    <div class="effect-container">
<!--  example  -->
<!--        <img class="effectIcon" src="/src/img/attackUpIcon.png" alt="attackUp">-->
<!--        <img class="effectIcon" src="/src/img/defenseDownIcon.png" alt="defenseDown">-->
    </div>
  `;
  /**
   * Creates a player instance with health, energy, deck, cards, discard pile, and status effects and block.
   *
   * @param {number} maxHealth - The player's maximum health.
   * @param {number} maxEnergy - The player's maximum energy.
   * @param {Deck} deck - The player's starting deck of cards.
   * @param {Hand} hand - The player's starting cards of cards.
   * @param {Discard} discard - The player's discard pile.
   * @param {Array} [effect=[]] - An array of status effects (e.g., poison, weaken). Defaults to an empty array.
   */
  constructor(maxHealth, maxEnergy, deck=new Deck(), hand=new Hand(),
              discard=new Discard(), effect = []) {
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
      hasAttackedThisTurn: false,
    }, {
      set: (target, prop, value) => {
        target[prop] = value;
        this.render();
        return true;
      }
    });

    this.discard = discard;
    this.hand = hand;
    // initialize the block and death status
    this.isDead = false;
    this.deck = deck;

    // temporary discard pile
    this.tempDiscard = new Pile();

    // initial shadow root
    const shadowRoot = this.attachShadow({mode: 'open'});
    const style = document.createElement('style');
    style.innerHTML = this.style;
    shadowRoot.append(style);

    // create root div element
    this.div = document.createElement('div');
    this.div.className = 'player-ui';
    this.shadowRoot.append(this.div);

  }

  /**
   * Animates a hit effect on the given element or selector.
   *
   *
   */
  animateHit() {
    const el = this.imgEl;
    el.classList.add('hit');
    el.addEventListener('animationend', () => el.classList.remove('hit'), { once: true });
  }

  /**
   * The character takes damage
   *
   * @param {number} amount - The amount of damage to take.
   * @returns {void} - Returns nothing.
   */
  takeDamage(amount) {
    const effectiveDamage = Math.max(amount - this.state.block, 0);
    this.state.block = Math.max(this.state.block - amount, 0);
    this.state.currentHealth -= effectiveDamage;

    setTimeout(() => {
        this.animateHit();
    }, 0);

    if (this.state.currentHealth <= 0) {
      this.state.currentHealth = 0;
      this.die();
    }
  }

  /**
   * Gain block
   *
   * @param {number} amount - The amount of block to gain.
   * @returns {void}
   */
  gainBlock(amount) {
    this.state.block += amount;
    //
  }

  /**
   * receive healing
   *
   * @param {number} amount - The amount of healing to receive.
   * @returns {void}
   */
  heal(amount) {
    this.state.currentHealth = Math.min(this.state.currentHealth + amount, this.state.maxHealth);
  }

  die() {
    location.href = '/Card-Game-Project/src/endscreen/index.html';
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
    const nowEnergy = this.state.currentEnergy - amount;
    if (nowEnergy < 0) {
      return false;
    }
    this.state.currentEnergy = nowEnergy;
    return true;
  }

  gainEnergy(amount) {

    // Gain energy, but not exceeding maxEnergy
    this.state.currentEnergy = Math.min(this.state.currentEnergy + amount, this.state.maxEnergy);
  }


  /**
   * Reset energy to MaxEnergy
   *
   * @returns {void}
   */
  resetEnergy() {
    this.state.currentEnergy = this.state.maxEnergy;
  }

  /**
   * Draw cards
   *
   * @param {number} amount - The number of cards to draw.
   * @returns {number} - Returns the number of cards drawn, or -1 if there are not enough cards in the deck.
   */
  drawCards(amount) {
    if(amount>this.deck.size()) return -1;
    for(let i=0;i<amount;i++){
      this.hand.addCard(this.deck.drawCard());
    }
    return 1;
  }

  // TODO No effect in MVP
  // applyEffect(name, effects) {
  //
  // }

  

  /**
   * Shuffle the deck
   *
   * @returns {void}
   */
  shuffleDeck() {
    this.deck.shuffle();
  }

  /**
   * Shuffle the discard pile into the deck
   *
   * @returns {void}
   */
  shuffleDiscardIntoDeck() {
    while(this.discard.size()>0){
      moveCard(this.discard.getCards()[0],this.discard,this.deck);
    }
    this.deck.shuffle();
    this.discard.clear();
  }

  /**
   * Plays a card from the cards.
   *
   * @class Enemy
   * @param {Card} card - The card to play.
   * @param {Enemy} target - The enemy to play the card against.
   * @returns {void} - Returns nothing.
   */
  playCard(card, target) {

    // Should call the specific card’s own card.play,
    // then this.removeCard(card)
    try{
      if(!this.spendEnergy(card.cost)) throw new Error('You don\'t have enough energy!');
      this.state.hasAttackedThisTurn = true;
      card.play(target);
      this.discardCard(card);
    }
    catch (err){
      alert(err.message);
    }

  }

  /**
   * Discards a card from the cards.
   *
   * @class Card
   * @param {Card} card - The card to discard.
   * @returns {void}
   */
  discardCard(card) {
    //Moves a card from the cards to the discard pile
    moveCard(card,this.hand,this.tempDiscard);
  }

  /**
   * Discards all cards in the cards and tempDiscard.
   */
  discardHand() {
    // Discards all cards in the cards,
    // called by playerManager at the end of a turn

    while(this.hand.size()>0){
      this.discardCard(this.hand.getCards()[0]);
    }
    while(this.tempDiscard.size()>0){
      moveCard(this.tempDiscard.getCards()[0],this.tempDiscard,this.discard);
    }

  }
  /**
   * @description render the player
   * @returns {void}
   */
  render(){
    this.shadowRoot.querySelector('.player-ui').innerHTML = this.template(this);
    this.shadowRoot.querySelector('.hp-bar').style.width = `${this.state.currentHealth / this.state.maxHealth * 100}%`;
    
    this.imgEl = this.shadowRoot.querySelector('#enemyImg');
  }

  connectedCallback() {
    this.render();
    this.imgEl = this.shadowRoot.querySelector('#enemyImg');
  }

}

customElements.define('my-player',Player);