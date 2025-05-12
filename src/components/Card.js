
class Card {
    constructor({ name, type, cost, description, image }) {
        this.name = name;
        this.type = type;
        this.cost = cost;
        this.description = description;
        this.image = image;
    }
}

/**
 * Rendering is determined by the specific properties of the subclass
 * Return a div element
 */
function render(){

}

/**
 * A virtual function to be overridden by subclasses.
 * @param enemy
 */
function play(enemy){

}

export default Card;