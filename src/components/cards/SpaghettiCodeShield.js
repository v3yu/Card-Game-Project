import Card from '../Card.js';


class SpaghettiCodeShield extends Card {
    constructor() {
        super({
            name: 'Spaghetti Code Shield',
            type: 'defense',
            cost: 1,
            description: 'You vanished into callback hell. 7 nested if-loops deep. Untraceable.',
            effect: 'Block 5. +1 if you didn’t attack.',
            image: '/src/img/SpaghettiCodeShield.png',
        });
    }

    play(player) {
        player.gainBlock(5);
        if (!player.hasAttackedThisTurn()) {
            player.gainBlock(1);
        }
    }
}
if (!customElements.get('spaghetti-code-shield')) {
    customElements.define('spaghetti-code-shield', SpaghettiCodeShield);
}


export {SpaghettiCodeShield};