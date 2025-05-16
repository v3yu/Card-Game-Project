import Card from "../components/Card";

class ScrollRUCSD extends Card {
  constructor() {
    super({
      name: "Scroll r/UCSD",
      type: "draw",
      cost: 1,
      description: "Memes > Midterms.",
      effect: "Draw 2 cards. Gain 'Sleep Deprived' status for 3 turns.",
      image: "src/img/ScrollRUCSD.png",
    });
  }

  /**
   * @param {Object} player - The player receiving the effect.
   */
  play(player) {
    player.drawCards(2);
    player.applyEffect("Sleep Deprived", { duration: 3 });
  }
}

export default ScrollRUCSD;
