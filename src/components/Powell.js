import { Enemy } from './Enemy.js';

export class Powell extends Enemy {


  lastMove;

  /**
   * Powell constructor
   * Uses Enemy cosntructor to initialize enemy
   * Assigns couple of private variables for internal use
   * 
   * @param {Player} player - player object
   */
  constructor(player) {
    super({name: 'Prof. Powell', HP: 110, Img: '../src/img/powell_720.png'});
    this.player = player;
    this.attackBuff = 1;
    this.block = 0;
  }

  /**
   * Applies block to this enemy
   * 
   * @param {number} value - block value
   */
  gainBlock(value) {
    this.block = value;
  }

  /**
   * Attack function, which takes attack buff into account
   * 
   * @param {number} value - damage of the attack used
   */
  pAttack(value) {
    this.attack(this.player, value * this.attackBuff);
    this.attackBuff = 1;
  }

  /**
   * Magic missile attack
   */
  magicMissile() {
    this.pAttack(1);
    this.pAttack(1);
    this.pAttack(1);
    this.lastMove = this.magicMissile;
  }

  /**
   * Cringe dad joke attack
   */
  cringeDadJoke() {
    this.pAttack(2);
    //player.applyEffect('Stun');
    this.lastMove = this.cringeDadJoke;
  }

  /**
   * Ancient web spell attack
   */
  ancientWebSpell() {
    this.gainBlock(3);
    this.attackBuff = 1.5;
    this.lastMove = this.ancientWebSpell;
  }

  /**
   * Obscure reference attack
   */
  obscureReference() {
    //player.applyEffect('Confused', 2);
    this.lastMove = this.obscureReference;
  }

  /**
   * Jargon tornado attack
   */
  jargonTornado() {
    this.takeDamage(2);
    this.pAttack(4);
    this.lastMove = this.jargonTornado;
  }

  /**
   * CSE 110 midterm attack
   */
  cse110Midterm() {
    this.pAttack(11.0);
    //player.applyEffect('Confused');
    //player.applyEffect('Stun');
    //player.applyEffect('Bleeding');
    this.lastMove = this.cse110Midterm;
  }

  /**
   * Simple AI that decides which move to use based on the flow of the game
   * 
   * @param {number} enemyHP - current HP of this enemy
   * @param {number} enemyMaxHP - max HP of this enemy
   * @param {number} playerHP - current HP of player
   * @param {number} playerMaxHP - max HP of player
   */
  takeTurn(enemyHP, enemyMaxHP, playerHP, playerMaxHP) {
    const m = Math.random();
    if (m < 0.011) this.cse110Midterm(); //has 1.10% of triggering
    else if (playerHP <= 4 && enemyHP > 2) this.jargonTornado();
    else if (playerHP <= 2) this.cringeDadJoke();
    else if (playerHP <= 3) this.magicMissile();
    else if (this.lastMove == this.cringeDadJoke && (enemyHP / enemyMaxHP <= 0.3)) this.ancientWebSpell();
    else if (this.lastMove == this.ancientWebSpell && ((enemyHP - 2) / enemyMaxHP) >= 0.3) this.jargonTornado();
    else if (this.lastMove == this.ancientWebSpell) this.magicMissile();
    else if ((playerHP / playerMaxHP <= 0.3) && ((enemyHP - 2) / enemyMaxHP) >= 0.3) {
      const a = Math.floor(m * 3);
      if (a == 0) this.magicMissile();
      else if (a == 1) this.cringeDadJoke();
      else this.jargonTornado();
    } 
    else if (playerHP / playerMaxHP <= 0.3) {
      const a = Math.floor(m * 2);
      if (a == 0) this.magicMissile();
      else this.cringeDadJoke();
    }
    else {
      const a = Math.floor(m * 5);
      if (a == 0) this.magicMissile();
      else if (a == 1) this.cringeDadJoke();
      else if (a == 2) this.ancientWebSpell();
      else if (a == 3) this.obscureReference();
      else this.jargonTornado();
    }
  }
}

if(!customElements.get('powell-enemy')){
  customElements.define('powell-enemy', Powell);
}