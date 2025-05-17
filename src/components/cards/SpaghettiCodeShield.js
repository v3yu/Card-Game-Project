import Card from "../Card.js";


class SpaghettiCodeShield extends Card {
    constructor() {
        super({
            name: "Spaghetti Code Shield",
            type: "defense",
            cost: 1,
            description: "You disappeared into callback hell, 7 nested if-loops deep. No one can find you.",
            effect: "+5 Block. If you didn’t attack this turn, block +1 more.",
            image: "/src/img/SampleCard.png",
        });
    }

    play(player) {
        player.gainBlock(5);
        if (!player.hasAttackedThisTurn()) {
            player.gainBlock(1);
        }
    }
}
if (!customElements.get("spaghetti-code-shield")) {
    customElements.define("spaghetti-code-shield", SpaghettiCodeShield);
}


export {SpaghettiCodeShield};