import Card from '../Card.js';

class SevereCrashOut extends Card {
    constructor() {

        super({
            name: 'Severe Crash Out',
            type: 'attack',
            cost: 1,
            description: 'You tried automating a 6-min task for 6 hours. Now you\'re questioning your major.',
            effect: 'Deal 5 damage.',
            image: '../src/img/SevereCrashOut.png',
        });
    }
    /**
     * @param {object} enemy - The target enemy.
     */
    play(enemy) {
        enemy.takeDamage(5);
    }
}

if (!customElements.get('severe-crash-out')) {

    customElements.define('severe-crash-out', SevereCrashOut);
}

export { SevereCrashOut };