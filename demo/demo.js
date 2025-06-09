

//Test hand
import {CrashOut} from '../src/components/cards/CrashOut.js';
import { SpaghettiCodeShield } from '../src/components/cards/SpaghettiCodeShield.js';
import { TripToStudentHealth } from '../src/components/cards/TripToStudentHealth.js';
import { FreeBoba } from '../src/components/cards/FreeBoba.js';
import {SevereCrashOut} from '../src/components/cards/SevereCrashOut.js';

import Hand from '../src/components/Hand.js';
import Discard from '../src/components/Discard.js';
import Deck from '../src/components/Deck.js';
import {Player} from '../src/components/Player.js';
import {Powell} from '../src/components/Powell.js';
import {Battle} from '../src/game/Battle.js';

const deck = new Deck([new CrashOut(),new CrashOut(),new CrashOut(),new CrashOut(),new SevereCrashOut(), new SpaghettiCodeShield,new SpaghettiCodeShield,new SpaghettiCodeShield,new FreeBoba, new TripToStudentHealth()]);

console.log(deck.getCards());
const player = new Player(50, 3,deck,new Hand(),new Discard());
const powell = new Powell(player);

const battle = new Battle(player, powell);
battle.startBattle();