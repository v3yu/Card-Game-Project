import Hand from "../src/components/Hand.js";
import {CrashOut} from "../src/components/cards/CrashOut.js";
import {FreeBoba} from "../src/components/cards/FreeBoba.js"

const body = document.querySelector('body')
const handArea = document.querySelector('.hand-area');

const hand = new Hand();
handArea.append(hand)
const crashOutCard = new CrashOut();
const freeBobaCard = new FreeBoba();
const crashOutCard2 = new CrashOut();

hand.addCard(crashOutCard);
hand.addCard(crashOutCard2);
hand.addCard(freeBobaCard);

//remove
//hand.removeCard(freeBobaCard);

hand.renderHandHelper();