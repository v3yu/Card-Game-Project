import Card from "../Card.js";


class FakeSleep extends Card {
    constructor() {
        super({
            name: "Fake Sleep",
            type: "defense",
            cost: 1,
            description: "Prof. Powell is calling on your group. You’re suddenly very still.",
            effect: "Block 3 damage. Ignore 1 status effect.",
            image: "/src/img/FakeSleep.png",
        });
    }
    play(player) {
        player.gainBlock(3);
        player.ignoreStatusEffect(1);
    }
}

if (!customElements.get("fake-sleep")) {
    customElements.define("fake-sleep", FakeSleep);
}

export {FakeSleep};