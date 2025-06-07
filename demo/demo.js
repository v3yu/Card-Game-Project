
import {Player} from '../src/components/Player.js';
import { Powell } from '../src/components/Powell.js';
import {Battle} from '../src/game/Battle.js';
import {CrashOut} from '../src/components/cards/CrashOut.js';
import {EarlySubmission} from '../src/components/cards/EarlySubmission.js';
import {FakeSleep} from '../src/components/cards/FakeSleep.js';
import {FreeBoba} from '../src/components/cards/FreeBoba.js';
import {InternshipBombard} from '../src/components/cards/InternshipBombard.js';
import {LockIn} from '../src/components/cards/LockIn.js';
import {PullAllNighter} from '../src/components/cards/PullAllNighter.js';
import {ScrollRUCSD} from '../src/components/cards/ScrollRUCSD.js';
import Deck from '../src/components/Deck.js';




const deck = new Deck([new CrashOut(),new EarlySubmission(),new FakeSleep(),new FreeBoba(),new InternshipBombard(),new LockIn(),new PullAllNighter(),new ScrollRUCSD()]);

console.log(deck.getCards());
const player = new Player(10000, 3,deck);
const powell = new Powell(player);

const battle = new Battle(player, powell);
battle.startBattle();
