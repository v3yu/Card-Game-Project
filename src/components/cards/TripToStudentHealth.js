import Card from "../components/Card";

class TripToStudentHealth extends Card {
  constructor() {
    super({
      name: "Trip to Student Health",
      type: "heal",
      cost: 2,
      description: "Take a break. You need it.",
      effect: "Heal 2 HP. Block 2 damage.",
      image: "src/img/StudentHealth.png",
    });
  }

  /**
   * @param {Object} player - The player receiving the effect.
   */
  play(player) {
    player.heal(2);
    player.applyBlock(2);
  }
}

export default TripToStudentHealth;
