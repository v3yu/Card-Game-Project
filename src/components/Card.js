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
    constructor({ name, type = null, cost = null, description = null, effect = null, image = null }) {
        super();
        this.name = name;
        this.type = type;
        this.cost = cost;
        this.description = description;
        this.effect = effect;
        this.image = image;

        //create the card element
        const shadow = this.attachShadow({ mode: 'open' });
        this.div = document.createElement('div');
        // const style = document.createElement('style');
        // style.textContent = ``;

        this.div.className = 'card';

        shadow.append(this.div);
        // shadow.append(style);

        this.shadowRoot.addEventListener('click', () => {
            // Dispatch a custom event that bubbles and crosses the shadow boundary
            this.dispatchEvent(new CustomEvent('card-clicked', {
                detail: this,      // pass the component instance itself
                bubbles: true,     // bubble up through the DOM
                composed: true     // cross the shadow boundary
            }));
        });
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
            <button class="card-type">${this.effect}</button>
            <div class="card-description">${this.description}</div>
        `;

        //card hover and click effect
        const cardTypeBtn = this.div.querySelector('.card-type');
        cardTypeBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            const isSelected = this.div.classList.contains('selected');
            //if card already selected, deselect it
            if (isSelected) {
                this.div.classList.remove('selected');
                cardTypeBtn.classList.remove('selected');
            } else {
                // Deselect all cards and buttons
                const handElement = document.querySelector('.hand-area hand-element');
                if (handElement && handElement.shadowRoot) {
                    // find the handArea container inside the shadow root
                    const handAreaDiv = handElement.shadowRoot.querySelector('.handArea');
                    if (handAreaDiv) {
                        // get all direct children (card custom elements)
                        handAreaDiv.childNodes.forEach(cardElem => {
                            // skip text nodes and only process element nodes
                            if (cardElem.nodeType !== Node.ELEMENT_NODE) return;
                            const shadow = cardElem.shadowRoot;
                            if (!shadow) return;
                            const cardDiv = shadow.querySelector('.card');
                            const btn = shadow.querySelector('.card-type');
                            if (cardDiv) cardDiv.classList.remove('selected');
                            if (btn) btn.classList.remove('selected');
                        });
                    }
                }
                // select this card
                this.div.classList.add('selected');
                cardTypeBtn.classList.add('selected');
            }
        });

        // // Schedule animation trigger in the next frame to ensure layout is updated
        // requestAnimationFrame(() => {
        //     // Add the 'dealing' class to start the dealCard animation
        //     this.div.classList.add('dealing');

        //     // Define a one-time callback to remove the class after the animation ends
        //     const onAnimationEnd = () => {
        //         this.div.classList.remove('dealing');

        //         // Remove class after animation ends (runs only once)
        //         this.div.removeEventListener('animationend', onAnimationEnd);
        //     };

        //     this.div.addEventListener('animationend', onAnimationEnd);
        // });

    }

    //auto render
    connectedCallback() {
        if (!this._rendered) {
            this.render();
            this._rendered = true;
            console.log('Card rendered:', this.name);
        }
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