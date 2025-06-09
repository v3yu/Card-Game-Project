import {Player} from './Player.js';
/**
 * The enemy of game
 * An enemy has a name, HP, attack power, and abilities
 */
export class Enemy extends HTMLElement{

   template = (t)=> `
    <img src="${t.Img}" alt="enemy" id="enemyImg">
  <div class="hp-bar-container">
    <div class="hp-text">${t.HP}/${t.maxHP}</div>
    <div class="hp-bar"></div>
  </div>
  <div class="attack-dialog hidden">
    <p></p>
  </div>
   `;
  /**
   * css style of enemy
   *
   * @type {string}
   */
  style = `
  
        .enemy-ui {
    position: relative; 
    width: 300px;
    padding: 10px;
  }

  #enemyImg {
    width: 100%;
    display: block;
  }

  .hp-bar-container {
    position: absolute; 
    bottom: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
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
        
        .attack-dialog {
          position: absolute;
          top: -20%;
          left: -20%;
          transform: translate(10%, -10%);
          padding: 0.5rem 1rem;
          background: rgba(0, 0, 0, 0.8);
          color: #fff;
          border-radius: 0.25rem;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
      
        .attack-dialog.hidden {
          display: none;
        }
      
        .attack-dialog.show {
          display: block;
          opacity: 1;
          transform: translate(20%, -20%);
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

  /**
   * enemyUI
   */
  enemyUI;

  /**
   * Creates a new Enemy instance.*
   * This constructor initializes the enemy's name, current HP, maximum HP, and image.
   * It also sets up the Shadow DOM to visually display the enemy's status.
   *
   * @class
   * @param {object} options - The initialization options.
   * @param {string} options.name - The name of the enemy.
   * @param {number} options.HP - The initial health points (HP) of the enemy.
   * @param {string} options.Img - The image URL representing the enemy.
   */
  constructor({name,HP,Img}) {
    super();
    // initialize the enemy attribute
    this.name = name;
    this.HP=HP;
    this.Img = Img;
    this.maxHP=HP;
    // initialize the html
    const shadowRoot = this.attachShadow({mode: 'open'});
    const style = document.createElement('style');
    this.enemyUI = document.createElement('div');
    this.enemyUI.className = 'enemy-ui';
    style.innerText = this.style;
    shadowRoot.append(style);




  }

  /**
   * Animates a hit effect on the given element or selector.
   *
   *
   */
  animateHit() {
    const el = this.shadowRoot.querySelector('#enemyImg');
    el.classList.add('hit');
    el.addEventListener('animationend', () => el.classList.remove('hit'), { once: true });
  }


  /**
   *  Take damage
   *
   * @param {number} damage -  The amount of damage to take
   */
  takeDamage(damage) {
    this.HP = Math.max(this.HP - damage, 0);
    this.shadowRoot.querySelector( '.hp-bar').style.width = `${this.HP/this.maxHP*100}%`;
    this.shadowRoot.querySelector( '.hp-text').innerText = `${this.HP}/${this.maxHP}`;
    setTimeout(() => {
        this.animateHit();
    }, 0);
    if(this.HP===0){
      this.die();
    }
  }

  /**
   *  Die, direct to victorious page
   */
  die(){
    location.href = '/Card-Game-Project/src/endscreen/index.html';
  }

   /**
    * Attack
    *
    * @param {Player} player - The player being attacked.
    *  @param {number} amount -  The amount of damage to deal.
    */
  attack(player,amount){
    player.takeDamage(amount);

  }

  /**
   * apply some effects such as attack down or block down
   *
   * @param {object} effect - effect entity
   */
  applyEffect(effect){
    void effect;
    // TODO after we can run the battle we will implement effect system
  }

  /**
   * render the enemy
   */
  render(){
    this.enemyUI.innerHTML = this.template(this);
    this.shadowRoot.append(this.enemyUI);
  }

  connectedCallback() {
    this.render();
    this.imgEl = this.shadowRoot.querySelector('#powellImg');
  }
}

if(!customElements.get('custom-enemy')){
  customElements.define('custom-enemy',Enemy);
}