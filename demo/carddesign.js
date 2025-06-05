import {SevereCrashOut} from '../src/components/cards/SevereCrashOut.js';
import {CrashOut} from '../src/components/cards/CrashOut.js';
import {EarlySubmission} from '../src/components/cards/EarlySubmission.js';
import {FakeSleep} from '../src/components/cards/FakeSleep.js';
import {FreeBoba} from '../src/components/cards/FreeBoba.js';
import {InternshipBombard} from '../src/components/cards/InternshipBombard.js';
import {LockIn} from '../src/components/cards/LockIn.js';
import {PullAllNighter} from '../src/components/cards/PullAllNighter.js';
import {ScrollRUCSD} from '../src/components/cards/ScrollRUCSD.js';
import {SpaghettiCodeShield} from '../src/components/cards/SpaghettiCodeShield.js';
import {StackOverflow} from '../src/components/cards/StackOverflow.js';
import {TripToStudentHealth} from '../src/components/cards/TripToStudentHealth.js';



const bodyElement = document.querySelector('body');

const crashOut = new CrashOut();
const severeCrashOutCard = new SevereCrashOut();
const earlySubmission = new  EarlySubmission();
const fakeSleep = new FakeSleep();
const freeBoba = new FreeBoba();
const intern = new InternshipBombard();
const lock = new LockIn();
const pull = new PullAllNighter();
const scroll = new ScrollRUCSD();
const spage = new SpaghettiCodeShield();
const stackOver = new StackOverflow();
const tripToStudentHealth = new TripToStudentHealth();

bodyElement.append(severeCrashOutCard);
bodyElement.append(crashOut);
bodyElement.append(earlySubmission);
bodyElement.append(fakeSleep);
bodyElement.append(freeBoba);
bodyElement.append(intern);
bodyElement.append(lock);
bodyElement.append(pull);
bodyElement.append(scroll);
bodyElement.append(spage);
bodyElement.append(stackOver);
bodyElement.append(tripToStudentHealth);