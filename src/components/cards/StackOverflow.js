import Card from "../Card.js";



class StackOverflow extends Card {
  constructor() {
    super({
      name: "Steal Code From StackOverflow",
      type: "attack",
      cost: 1,
      description: "Well, the user whose code you copied probably copied it from someone else too.",
      effect: "Deal 4 damage. Apply 'Shame' (target loses 1 energy next turn).",
      image: "/src/img/StackOverflow.png",
    });
  }

  /**
   * @param {Object} enemy - The target enemy.
   */
  play(enemy) {
    enemy.takeDamage(4);
    enemy.applyEffect("Shame", { energyLoss: 1 });
  }
}
if (!customElements.get("stack-overflow")) {
  customElements.define("stack-overflow", StackOverflow);
}


export {StackOverflow};