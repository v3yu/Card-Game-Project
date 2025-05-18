import Card from "../Card.js";

class CrashOut extends Card {
    constructor() {
        super({
            name: "Crash Out",
            type: "attack",
            cost: 1,
            description: "You've been debugging for 6 hours straight.",
            effect: "Deal 3 damage.",
            image: "/src/img/CrashOut.png",
        });
    }
    /**
    * @param {Object} enemy - The target enemy.
     * The handlePlayerAction() function in PlayerManager.js checks if the player has enough energy to play the card.
     * So we don't need to check it here.
     */
    play(enemy) {
        enemy.takeDamage(3);
    }
}
if (!customElements.get("crash-out")) {
    customElements.define("crash-out", CrashOut);
}

export { CrashOut };