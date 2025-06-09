import { Enemy } from './Enemy.js';
import {lockUIDuring} from './UIManager.js';

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
    super({name: 'Prof. Powell', HP: 10, Img: '../src/img/powell_720.png'});
    this.player = player;
    this.attackBuff = 1;
    this.block = 0;
  }



  // TODO In the future, move this method into the UI utility class



  /**
   * show dialog block when powell attacks
   *
   * @param {string} message - message when attack
   * @param {number} duration - how long it will last
   * @returns {function(): Promise}
   */
  attackAnimation(message,duration=2000){
    return new Promise(resolve => {

      const element = this.shadowRoot.querySelector('.attack-dialog');
      element.classList.remove('hidden');
      void element.offsetWidth;
      element.querySelector('p').innerText = message;
      element.classList.add('show');
      setTimeout(() => {
        element.classList.remove('show');
        const onEnd = (e) => {
          if (e.propertyName === 'opacity') {
            element.removeEventListener('transitionend', onEnd);
            element.classList.add('hidden');
            resolve();
          }
        };
        element.addEventListener('transitionend', onEnd);
      }, duration);
    });

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
  async magicMissile() {
    this.pAttack(1);
    this.pAttack(1);
    this.pAttack(1);
    this.lastMove = this.magicMissile;
    await lockUIDuring(()=>this.attackAnimation('Magic Missile, fire! And if anyone still hasn’t turned' +
      ' in their homework, don’t even think about going home when class ends'));
  }

  /**
   * Cringe dad joke attack
   */
  async cringeDadJoke() {
    this.pAttack(2);
    //player.applyEffect('Stun');
    this.lastMove = this.cringeDadJoke;
    await lockUIDuring(()=>this.attackAnimation('I’d tell you a homework joke, but… you probably didn’t finish it anyway'));
  }

  /**
   * Ancient web spell attack
   */
  async ancientWebSpell() {
    this.gainBlock(3);
    this.attackBuff = 1.5;
    this.lastMove = this.ancientWebSpell;
    await lockUIDuring(()=>this.attackAnimation('Ancient Web Spell, I’m going to make you walk through time and space'));
  }

  /**
   * Obscure reference attack
   */
  async obscureReference() {
    //player.applyEffect('Confused', 2);
    this.lastMove = this.obscureReference;
    await lockUIDuring(()=>this.attackAnimation('Obscure Reference, I’m going to make you think in a language nobody knows'));
  }

  /**
   * Jargon tornado attack
   */
  async jargonTornado() {
    this.takeDamage(2);
    this.pAttack(4);
    this.lastMove = this.jargonTornado;
    await  lockUIDuring(()=>this.attackAnimation('Jargon Tornado, I’m going to make you think in a language nobody knows'));
  }

  /**
   * CSE 110 midterm attack
   */
  async cse110Midterm() {
    this.pAttack(11.0);
    //player.applyEffect('Confused');
    //player.applyEffect('Stun');
    //player.applyEffect('Bleeding');
    this.lastMove = this.cse110Midterm;
    await lockUIDuring(()=>this.attackAnimation('CSE 110 Midterm, I’m going to make you think in a language nobody knows'));
  }

  /**
   * Simple AI that decides which move to use based on the flow of the game
   * 
   * @param {number} enemyHP - current HP of this enemy
   * @param {number} enemyMaxHP - max HP of this enemy
   * @param {number} playerHP - current HP of player
   * @param {number} playerMaxHP - max HP of player
   */
  async takeTurn(enemyHP, enemyMaxHP, playerHP, playerMaxHP) {
    const m = Math.random();
    if (m < 0.011) await this.cse110Midterm(); //has 1.10% of triggering
    else if (playerHP <= 4 && enemyHP > 2) await this.jargonTornado();
    else if (playerHP <= 2) await this.cringeDadJoke();
    else if (playerHP <= 3) await this.magicMissile();
    else if (this.lastMove == this.cringeDadJoke && (enemyHP / enemyMaxHP <= 0.3)) await this.ancientWebSpell();
    else if (this.lastMove == this.ancientWebSpell && ((enemyHP - 2) / enemyMaxHP) >= 0.3) await this.jargonTornado();
    else if (this.lastMove == this.ancientWebSpell) await this.magicMissile();
    else if ((playerHP / playerMaxHP <= 0.3) && ((enemyHP - 2) / enemyMaxHP) >= 0.3) {
      const a = Math.floor(m * 3);
      if (a == 0) await this.magicMissile();
      else if (a == 1) await this.cringeDadJoke();
      else await this.jargonTornado();
    } 
    else if (playerHP / playerMaxHP <= 0.3) {
      const a = Math.floor(m * 2);
      if (a == 0) await this.magicMissile();
      else await this.cringeDadJoke();
    }
    else {
      const a = Math.floor(m * 5);
      if (a == 0) await this.magicMissile();
      else if (a == 1) await this.cringeDadJoke();
      else if (a == 2) await this.ancientWebSpell();
      else if (a == 3) await this.obscureReference();
      else await this.jargonTornado();
    }
  }
}

if(!customElements.get('powell-enemy')){
  customElements.define('powell-enemy', Powell);
}