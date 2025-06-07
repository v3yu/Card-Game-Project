
import {CrashOut} from '../src/components/cards/CrashOut.js';
import Hand from '../src/components/Hand.js';
import Discard from '../src/components/Discard.js';
import Deck from '../src/components/Deck.js';
import {Player} from '../src/components/Player.js';
import {Powell} from '../src/components/Powell.js';
import {Battle} from '../src/game/Battle.js';





const deck = new Deck([new CrashOut(),new CrashOut(),new CrashOut(),new CrashOut(),new CrashOut(),new CrashOut(),new CrashOut(),new CrashOut()]);

console.log(deck.getCards());
const player = new Player(10000, 3,deck,new Hand(),new Discard());
const powell = new Powell(player);

const battle = new Battle(player, powell);
battle.startBattle();

// const hand_area  = document.querySelector('.hand-area');
// const hand = new Hand([new CrashOut()]);
// hand_area.append(hand);
// const discard = new Discard();
// console.log(hand.cards)
// hand.cards.forEach(card => {
//   card.addEventListener('click', ()=>{moveCard(card,hand,discard);
//   console.log(hand.cards);
//   console.log(discard.cards);
//   })
// });
// Discard modal references
const discardButton = document.querySelector('.discard-button');
const discardModal = document.querySelector('.discard-modal');
const discardCardsDiv = document.getElementById('discard-cards');
const closeDiscardModal = document.querySelector('.close-discard-modal');

const discardModalInstance = new DiscardModal({
    discardButton,
    discardModal,
    discardCardsDiv,
    closeDiscardModal,
    discardPile
});
