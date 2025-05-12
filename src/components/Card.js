
class Card extends HTMLElement{
    constructor({ name, type, cost, description, image }) {
        super();
        this.name = name;
        this.type = type;
        this.cost = cost;
        this.description = description;
        this.image = image;

        const shadow = this.attachShadow({mode:'open'});
        const div = document.createElement('div');

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