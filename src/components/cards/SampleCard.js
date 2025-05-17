import Card from "../Card.js";


class SampleCard extends Card {
    constructor() {
        super({
            name: "Name of Card",
            type: "attack | defense | status | special",
            cost: 0,
            description: "Card description",
            effect: "Card effect",
            image: "/src/img/SampleCard.png",
        });
    }
    /**
    * @param {target} player/enemies/enemy - Target of ability
    * May be the player, an enemy, or all enemies.
    * The handlePlayerAction() function in PlayerManager.js checks if the player has enough energy to play the card.
    * So we don't need to check it here.
    */
    play(target) {
    }
}
if (!customElements.get("sample-card")) {
    customElements.define("sample-card", SampleCard);
}


export {SampleCard};