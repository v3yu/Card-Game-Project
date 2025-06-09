import Card from '../Card.js';



class StackOverflow extends Card {
  constructor() {
    super({
      name: 'Ctrl+C from StackOverflow',
      type: 'attack',
      cost: 1,
      description: 'That code’s been copied 5 times before you.',
      effect: 'Deal 4. Apply Shame (–1 energy)',
      image: '/src/img/StackOverflow.png',
    });
  }

  /**
   * @param {object} enemy - The target enemy.
   */
  play(enemy) {
    enemy.takeDamage(4);
    enemy.applyEffect('Shame', { energyLoss: 1 });
  }
}
if (!customElements.get('stack-overflow')) {
  customElements.define('stack-overflow', StackOverflow);
}


export {StackOverflow};