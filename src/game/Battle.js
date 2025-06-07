// Battle.js
// Refactored battle system using the EventBus for decoupled event handling
import { EventBus } from './EventBus.js';
import {isPlayerDead} from './PlayerManager.js';

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
      this.eventBus.publish('checkGameOver');
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
   * Begin the battle by rendering characters and starting the first turn
   */
  startBattle() {
    document.querySelector('.player .character-container').append(this.player);
    document.querySelector('.enemies .character-container').append(this.enemy);
    document.querySelector('.hand-area').append(this.player.hand);
    this.eventBus.publish('startTurn');
  }

  /**
   * Handle player action phase: draw cards, render cards, and attach listeners
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
  enemyAction() {
    this.enemy.takeTurn(this.enemy.HP, this.enemy.maxHP, this.player.HP, this.player.maxHP);
    // check whether player is dead
    this.eventBus.publish('checkGameOver');
    this.eventBus.publish('endTurn');
  }

  /**
   * Internal handler for ending a turn: triggers effects, switches actor, and starts the next turn
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
   */
  startTurn() {

    if (this.battleOver) return;

    // update effect
    // this.eventBus.publish('onTurnStart', { actor: this.currentActor });

    if (this.currentActor === 'player') {
      this.waitForPlayerAction();
    } else {
      this.enemyAction();
    }
  }

  /**
   * if one of the player or enemy is dead, game over
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
   */
  destroy() {
    this.eventBus.unsubscribe('startTurn', this.startTurn);
    this.eventBus.unsubscribe('endTurn', this.handleTurnEnd);
    this.eventBus.unsubscribe('cardPlayed', this.player.playCard);
  }


}