import Hand from "../src/components/Hand.js";
import {CrashOut} from "../src/components/cards/CrashOut.js";

const body = document.querySelector('body')

const hand = new Hand();
body.append(hand)
hand.addCard(new CrashOut())
hand.renderHandHelper()