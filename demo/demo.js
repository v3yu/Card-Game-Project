import Hand from '../src/components/Hand.js';
import {CrashOut} from '../src/components/cards/CrashOut.js';
import {FreeBoba} from '../src/components/cards/FreeBoba.js';
import {Enemy} from '../src/components/Enemy.js';
// no
const handArea = document.querySelector('.hand-area');

const hand = new Hand();
handArea.append(hand);
const crashOutCard = new CrashOut();
const freeBobaCard = new FreeBoba();
const crashOutCard2 = new CrashOut();

hand.addCard(crashOutCard);
hand.addCard(crashOutCard2);
hand.addCard(freeBobaCard);

const enemy = new Enemy({name : 'Enemy', HP: 10, Img: '/src/img/sprite.png'});
document.querySelector('.character-container').append(enemy) ;
enemy.takeDamage(5);