import Card from "../Card.js";



class LockIn extends Card {
    constructor() {
        super({
            name: "Lock In",
            type: "buff",
            cost: 1, 
            description: "You have 3 midterms next week. Get to Geisel and lock the hell in.",
            effect: "Your next 2 attacks deal +2 damage. Last 2 turns.",
            image: "/src/img/LockIn.png",
        });
    }

    /**
   * @param {Object} player - The player receiving the effect.
   */
  play(player) {
    player.applyEffect("Attack Boost", { damageIncrease: 2, duration: 2, uses: 2 });
  }
}

if (!customElements.get("lock-in")) {
  customElements.define("lock-in", LockIn);
}

export {LockIn};
