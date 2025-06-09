import { Powell } from '../src/components/Powell.js';
import { Player } from '../src/components/Player.js';
import { expect } from '@jest/globals';
import Hand from '../src/components/Hand.js';
import Discard from '../src/components/Discard.js';
import Deck from '../src/components/Deck.js';

describe('Instance of enemy - Powell', () => {
    let enemy;
    let player;

    beforeEach(() => {
        document.body.innerHTML = '';
        player = new Player(100, 3, new Deck(), new Hand(), new Discard());
        enemy = new Powell(player);
        document.body.appendChild(player);
        document.body.appendChild(enemy);
    });

    test('basic attack', () => {
        enemy.pAttack(10);
        expect(player.state.currentHealth).toBe(90);
    });



    test('magic missile attack', () => {
        enemy.magicMissile();
        expect(player.state.currentHealth).toBe(97);
        expect(enemy.lastMove).toBe(enemy.magicMissile);
    });

    test('cringe dad joke attack', () => {
        enemy.cringeDadJoke();
        expect(player.state.currentHealth).toBe(98);
        expect(enemy.lastMove).toBe(enemy.cringeDadJoke);
    });


    test('obscure reference attack', () => {
        enemy.obscureReference();
        expect(enemy.lastMove).toBe(enemy.obscureReference);
    });

    test('jargon tornado attack', () => {
        enemy.jargonTornado();
        expect(enemy.HP).toBe(108);
        expect(player.state.currentHealth).toBe(95);
        expect(enemy.lastMove).toBe(enemy.jargonTornado);
    });

    test('cse 110 midterm attack', () => {
        enemy.cse110Midterm();
        expect(player.state.currentHealth).toBe(89);
        expect(enemy.lastMove).toBe(enemy.cse110Midterm);
    });
});