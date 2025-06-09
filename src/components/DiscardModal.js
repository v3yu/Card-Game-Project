export default class DiscardModal {
    constructor({ discardButton, discardModal, discardCardsDiv, closeDiscardModal, discardPile }) {
        this.discardButton = discardButton;
        this.discardModal = discardModal;
        this.discardCardsDiv = discardCardsDiv;
        this.closeDiscardModal = closeDiscardModal;
        this.discardPile = discardPile;

        this.attachEvents();
    }

    attachEvents() {
        this.discardButton.addEventListener('click', () => this.showModal());
        this.closeDiscardModal.addEventListener('click', () => this.hideModal());
    }

    showModal() {
        this.discardCardsDiv.innerHTML = '';
        if (this.discardPile && typeof this.discardPile.getCards === 'function') {
            const cards = this.discardPile.getCards();
            if (!cards.length) {
                this.discardCardsDiv.textContent = 'Discard pile is empty.';
            } else {
                cards.forEach(card => {
                    const cardClone = card.cloneNode(true);
                    cardClone.style.pointerEvents = 'none';
                    cardClone.style.margin = '8px';
                    this.discardCardsDiv.appendChild(cardClone);
                });
            }
        }
        this.discardModal.style.display = 'flex';
    }

    hideModal() {
        this.discardModal.style.display = 'none';
    }
}