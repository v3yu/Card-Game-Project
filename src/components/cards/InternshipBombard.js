import Card from "../Card.js";


class InternshipBombard extends Card {
    constructor() {
        super({
            name: "Internship Application Bombardment",
            type: "attack",
            cost: 1,
            description: "You send your resume to 60 companies. 0 of them got back to you.",
            effect: "Deal 2 damage to all enemies.",
            image: "/src/img/InternshipBombard.png",
        });
    }
    /**
    * @param {Object[]} enemies - Array of target enemies.
    */
    play(enemies) {
        enemies.forEach(enemy => {
            enemy.takeDamage(2);
        });
    }
}
if (!customElements.get("internship-bombard")) {
    customElements.define("internship-bombard", InternshipBombard);
}

export {InternshipBombard};