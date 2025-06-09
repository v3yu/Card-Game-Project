import Card from '../Card.js';



class EarlySubmission extends Card {
    constructor() {
        super({
        name: 'Early Submission',
        type: 'buff',
        cost: 0,
        description: 'You actually turned something in early. Historic moment.',
        effect: 'Gain +1 energy.',
        image: '../src/img/EarlySubmission.png',
        });
    }

    /**
     * @param {object} player - The player receiving the effect.
     */
  play(player) {
    player.gainEnergy(1);
  }
}
if (!customElements.get('early-submission')) {
  customElements.define('early-submission', EarlySubmission);
}


export {EarlySubmission};
