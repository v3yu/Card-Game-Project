// Battle.js
// Refactored battle system using the EventBus for decoupled event handling
import { EventBus } from './EventBus.js';
import {isPlayerDead} from './PlayerManager.js';
import DiscardModal from '../components/DiscardModal.js';
import DeckModal from '../components/DeckModal.js';
import {lockUIDuring} from '../components/UIManager.js';

export class Battle {
  /**
   * @param {Player} player - The player instance
   * @param {Powell} enemy - The enemy instance
   * @param {EventBus} eventBus - Optional external event bus (for testing or shared bus)
   */
  constructor(player, enemy, eventBus = new EventBus()) {
    this.player = player;
    this.enemy = enemy;
    this.eventBus = eventBus;
    this.turnCount = 1;
    this.currentActor = 'player';
    this.battleOver = false;

    // Subscribe internal handlers
    this.eventBus.subscribe('startTurn', () => this.startTurn());
    this.eventBus.subscribe('endTurn', () => this.handleTurnEnd());
    this.eventBus.subscribe('checkGameOver', ()=>this.checkGameOver());
    this.eventBus.subscribe('cardPlayed', ({ card }) => {
    this.player.playCard(card, this.enemy);


    });

    this.onEndTurnClick = () => this.eventBus.publish('endTurn');

    // Bind a single event listener to the hand container once at initialization
    const handArea = document.querySelector('.hand-area');
    handArea.addEventListener('card-clicked', event => {
      const card = event.detail;
      // Publish the 'cardPlayed' event or directly invoke the playCard method
      this.eventBus.publish('cardPlayed', { card });
    });


  }

   /**
    * Starts the battle and initializes the UI.
    *
    * @returns {void}
    */
  startBattle() {
    document.querySelector('.player .character-container').append(this.player);
    document.querySelector('.enemies .character-container').append(this.enemy);
    document.querySelector('.hand-area').append(this.player.hand);
    this.eventBus.publish('startTurn');


    const discardButton = document.querySelector('.discard-button');
    const discardModal = document.querySelector('.discard-modal');
    const discardCardsDiv = document.getElementById('discard-cards');
    const closeDiscardModal = document.querySelector('.close-discard-modal');

    const deckButton = document.querySelector('.deck-button');
    const deckModal = document.querySelector('.deck-modal');
    const deckCardsDiv = document.getElementById('deck-cards');
    const closeDeckModal = document.querySelector('.close-deck-modal');

    /* eslint-disable no-unused-vars */
    const discardModalInstance = new DiscardModal({
      discardButton,
      discardModal,
      discardCardsDiv,
      closeDiscardModal,
      discardPile: this.player.discard
    });

    const deckModalInstance = new DeckModal({
      deckButton,
      deckModal,
      deckCardsDiv,
      closeDeckModal,
      deck: this.player.deck
    });
  }

   /**
    * Handles the player's turn logic.
    *
    * @returns {void}
    */
  waitForPlayerAction() {

    console.log(this.player.deck.size()+this.player.hand.size()+this.player.discard.size()+this.player.tempDiscard.size());
    try{

      if(this.player.drawCards(5)===-1){
        throw new Error('no enough cards');
      }
    }
    catch (e){
      console.log(e.message);
      this.player.shuffleDiscardIntoDeck();
      this.player.drawCards(5);
    }
    const endTurnBtn = document.querySelector('.end-turn-button');
    endTurnBtn.addEventListener('click', this.onEndTurnClick);

  }

  /**
   * Enemy AI turn logic, then ends turn
   */
  async enemyAction() {


     await this.enemy.takeTurn(
       this.enemy.HP,
       this.enemy.maxHP,
       this.player.state.currentHealth,
       this.player.state.maxHealth
     );

    this.eventBus.publish('checkGameOver');
    this.eventBus.publish('endTurn');
  }


  /**
   * Internal handler for ending a turn: triggers effects, switches actor, and starts the next turn
   *
   * @returns {void}
   */
  handleTurnEnd() {
    // Trigger end-of-turn effects
    // this.eventBus.publish('onTurnEnd', { actor: this.currentActor });

    // discard all cards if this is the end of player
    if(this.currentActor==='player'){
      console.log('end player turn');
      this.player.discardHand();
      this.player.resetEnergy();
      document.querySelector('.end-turn-button').removeEventListener('click', this.onEndTurnClick);
    }

    // Switch actor
    this.currentActor = this.currentActor === 'player' ? 'enemy' : 'player';

    // Increment overall turn count only when switching back to player
    if (this.currentActor === 'player') {
      this.turnCount++;
    }

    // Begin next turn
    this.eventBus.publish('startTurn');
  }

  /**
   * Start-of-turn logic: trigger effects and delegate to appropriate actor
   *
   * @returns {void}
   */
  async startTurn() {

    if (this.battleOver) return;

    // update effect
    // this.eventBus.publish('onTurnStart', { actor: this.currentActor });

    if (this.currentActor === 'player') {
      await lockUIDuring(() => this.showBanner('Player turn', this.turnCount));
      this.waitForPlayerAction();
    } else {
      await lockUIDuring(() => this.showBanner('Enemy turn', this.turnCount));
      await this.enemyAction();
    }
  }

  /**
   * if one of the player or enemy is dead, game over
   *
   * @returns {void}
   */
  checkGameOver() {
    if(isPlayerDead(this.player)){
      this.battleOver = true;
      this.player.die();
    }

    // TODO add enemy dead check
    // if(isEnemyDead(this.enemy)){
    //   this.battleOver = true;
    //   this.enemy.die();
    // }
  }

  /**
   * Clean up all event listeners (optional)
   *
   * @returns {void}
   */

      /**Add commentMore actions
   * Show a pop-up banner with a message and optional turn number
   * @param {string} message
   * @param {number} [turn]
   */
async showBanner(message, turn) {
  return new Promise(resolve => {

    const banner = document.querySelector('.turn-banner');
    if (!banner){
      resolve();
      return;
    }
    banner.textContent = turn ? `${message} - Turn ${turn}` : message;
    // Reset classes and display for animation replay
    banner.classList.remove('active', 'fade-out');
    banner.style.display = 'block';

    // Force reflow to restart animation
    void banner.offsetWidth;

    // Start slide-in animation
    banner.classList.add('active');

    // After visible duration, start fade-out
    setTimeout(() => {
      banner.classList.remove('active');
      banner.classList.add('fade-out');
      // After fade-out transition, hide and reset
      setTimeout(() => {
        banner.style.display = 'none';
        banner.classList.remove('fade-out');
        resolve();
      }, 500); // match fade-out transition duration
    }, 1200);


  });
}

  destroy() {
    this.eventBus.unsubscribe('startTurn', this.startTurn);
    this.eventBus.unsubscribe('endTurn', this.handleTurnEnd);
    this.eventBus.unsubscribe('cardPlayed', this.player.playCard);
  }
}