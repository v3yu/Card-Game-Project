/**
 * base card class
 *
 * @class
 */
export class Card extends HTMLElement {
    /**
     * Constructor of Card, extended from HTMLElement.
     *
     * @param {object} options - Configuration object for the card.
     * @param {string} options.name - Name of the card.
     * @param {string} [options.type] - Type of the card (optional).
     * @param {number} [options.cost] - Cost of the card (optional).
     * @param {string} [options.description] - Description of the card (optional).
     * @param {string} [options.effect] - Effect of the card (optional).
     * @param {string} [options.image] - Image of the card (optional).
     */
    constructor({name, type=null, cost=null, description=null, effect=null, image=null}) {
        super();
        this.name = name;
        this.type = type;
        this.cost = cost;
        this.description = description;
        this.effect = effect;
        this.image = image;

        //create the card element
        const shadow = this.attachShadow({mode: 'open'});
        this.div = document.createElement('div');
        // const style = document.createElement('style');
        // style.textContent = ``;

        this.div.className = 'card';

        shadow.append(this.div);
        // shadow.append(style);
    }


    /**
     * render the card in specific HtmlElement
     */
    render() {
//         this.article.innerHTML=`

//         <span class="cost">${this.cost}</span>
    
//         <header class="name">${this.name}</header>
    
//         <figure class="image-container">
//             <img src="${this.image}" alt="${this.name}">
//         </figure>
    
//         <section class="effect">${this.effect}</section>
    
//         <footer class="description">${this.description}</footer>
// `;
        this.div.innerHTML = `
            <link href="/src/styles/card.css" rel="stylesheet">
            <div class="card-banner">${this.name}</div>
            <div class="card-cost">${this.cost}</div>
            <img class="card-image" src="${this.image}" alt="${this.name}"/>
            <div class="card-type">${this.effect}</div>
            <div class="card-description">${this.description}</div>
        `;

        // Schedule animation trigger in the next frame to ensure layout is updated
        requestAnimationFrame(() => {
            // Add the 'dealing' class to start the dealCard animation
            this.article.classList.add('dealing');

            // Define a one-time callback to remove the class after the animation ends
            const onAnimationEnd = () => {
                this.article.classList.remove('dealing');

                // Remove class after animation ends (runs only once)
                this.article.removeEventListener('animationend', onAnimationEnd);
            };

            this.article.addEventListener('animationend', onAnimationEnd);
        });

    }

    //auto render
    connectedCallback(){
        this.render();
    }

    /**
     *
     * A virtual function to be overridden by subclasses.
     *
     * @abstract
     * @param {object} enemy -  The enemy to play the card against.
     */
    // TODO replace the enemy from object to enemy
    play(enemy) {
        void enemy;
    }

}

if (!customElements.get('my-card')) {
    customElements.define('my-card', Card);
}
export default Card;