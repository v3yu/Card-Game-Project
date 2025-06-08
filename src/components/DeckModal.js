export default class DeckModal {
    constructor({ deckButton, deckModal, deckCardsDiv, closeDeckModal, deck }) {
        this.deckButton = deckButton;
        this.deckModal = deckModal;
        this.deckCardsDiv = deckCardsDiv;
        this.closeDeckModal = closeDeckModal;
        this.deck = deck;

        this.attachEvents();
    }

    attachEvents() {
        this.deckButton.addEventListener('click', () => this.showModal());
        this.closeDeckModal.addEventListener('click', () => this.hideModal());
    }

    showModal() {
        this.deckCardsDiv.innerHTML = '';
        if (this.deck && typeof this.deck.getCards === 'function') {
            const cards = this.deck.getCards();
            if (!cards.length) {
                this.deckCardsDiv.textContent = 'Deck is empty.';
            } else {
                cards.forEach(card => {
                    const cardClone = card.cloneNode(true);
                    cardClone.style.pointerEvents = 'none';
                    cardClone.style.margin = '8px';
                    this.deckCardsDiv.appendChild(cardClone);
                });
            }
        }
        this.deckModal.style.display = 'flex';
    }

    hideModal() {
        this.deckModal.style.display = 'none';
    }
}