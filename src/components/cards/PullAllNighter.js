import Card from "../Card.js";

class PullAllNighter extends Card {
    constructor() {
        super({
            name: "Pull All Nighter",
            type: "attack",
            cost: 1,
            description: "It's 3AM and the assignment's due at 8.",
            effect: "Deal 4 damage. Take 1 damage yourself.",
            image: "/src/img/PullAllNighter.png",
        });
    }

    play(player,enemy) {
        // Deal 4 damage to the enemy
        enemy.takeDamage(4);
        // Take 1 damage yourself
        player.takeDamage(1);
    }
}

if (!customElements.get("pull-all-nighter")) {
    customElements.define("pull-all-nighter", PullAllNighter);
}


export {PullAllNighter};