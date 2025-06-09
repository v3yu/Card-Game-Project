import Card from '../Card.js';



class LockIn extends Card {
    constructor() {
        super({
            name: 'Lock In',
            type: 'buff',
            cost: 1, 
            description: 'You have 3 midterms next week. Get to Geisel and lock the hell in.',
            effect: 'Focus up: next 2 attacks +2 dmg.',
            image: '../src/img/LockIn.png',
        });
    }

    /**
     * @param {object} player - The player receiving the effect.
     */
  play(player) {
    player.applyEffect('Attack Boost', { damageIncrease: 2, duration: 2, uses: 2 });
  }
}

if (!customElements.get('lock-in')) {
  customElements.define('lock-in', LockIn);
}

export {LockIn};
