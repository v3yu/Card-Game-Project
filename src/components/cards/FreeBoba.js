import Card from "../Card.js";



class FreeBoba extends Card {
  constructor() {
    super({
      name: "Free Boba",
      type: "support",
      cost: 1,
      description: "AS doing something useful for once.",
      effect: "Heal 1 HP. Draw 1 card.",
      image: "/src/img/FreeBoba.png",
    });
  }

  /**
   * @param {Object} player - The player receiving the effect.
   */
  play(player) {
    player.heal(1);
    player.drawCards(1);
  }
}

if (!customElements.get("free-boba")) {
  customElements.define("free-boba", FreeBoba);
}


export {FreeBoba};
