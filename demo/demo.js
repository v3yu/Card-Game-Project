import Hand from '../src/components/Hand.js';
import {CrashOut} from '../src/components/cards/CrashOut.js';
import {FreeBoba} from '../src/components/cards/FreeBoba.js';
import {Enemy} from '../src/components/Enemy.js';
import {Player} from '../src/components/Player.js';
import { Powell } from '../src/components/Powell.js';

const handArea = document.querySelector('.hand-area');
const hand = new Hand();
handArea.append(hand);
const crashOutCard = new CrashOut();
const freeBobaCard = new FreeBoba();
const crashOutCard2 = new CrashOut();
const crashOutCard3 = new CrashOut();
const crashOutCard4 = new CrashOut();


hand.addCard(crashOutCard);
hand.addCard(crashOutCard2);
hand.addCard(freeBobaCard);
hand.addCard(crashOutCard3);
hand.addCard(crashOutCard4);


const powell = new Powell();
document.querySelectorAll('.character-container')[1].append(powell);


const player = new Player(10, 3);
document.querySelector('.player').append(player);
