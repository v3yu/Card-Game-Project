import {Player} from '../src/components/Player.js';


describe('Player class', () => {
    let player;
    let dummyCard;

    beforeEach(() => {
        dummyCard = { name: 'Strike' };
        player = new Player(
          100,   // maxHealth
          3,     // maxEnergy
          [dummyCard], // deck
          [],    // hand
          [],    // discard
          [],
        );
    });

    test('initialization sets correct values', () => {
        expect(player.state.maxHealth).toBe(100);
        expect(player.state.currentHealth).toBe(100);
        expect(player.state.maxEnergy).toBe(3);
        expect(player.state.currentEnergy).toBe(3);
        expect(player.state.block).toBe(0);
        expect(player.isDead).toBe(false);
        expect(player.deck.length).toBe(1);
        expect(player.hand.length).toBe(0);
        expect(player.discard.length).toBe(0);
        expect(player.state.effect.length).toBe(0);
    });

    test('takeDamage reduces health correctly without block', () => {
        player.takeDamage(30);
        expect(player.state.currentHealth).toBe(70);
    });

    test('takeDamage is reduced by block', () => {
        player.gainBlock(20);
        player.takeDamage(15);
        expect(player.state.block).toBe(5);
        expect(player.state.currentHealth).toBe(100);
    });

    test('takeDamage with block overflow deals correct damage', () => {
        player.gainBlock(10);
        player.takeDamage(15);
        expect(player.state.block).toBe(0);
        expect(player.state.currentHealth).toBe(95);
    });

    test('heal should not exceed maxHealth', () => {
        player.takeDamage(50);
        player.heal(100);
        expect(player.state.currentHealth).toBe(100);
    });

    test('spendEnergy returns true and decreases energy if enough', () => {
        const result = player.spendEnergy(2);
        expect(result).toBe(true);
        expect(player.state.currentEnergy).toBe(1);
    });

    test('spendEnergy returns false if not enough energy', () => {
        const result = player.spendEnergy(5);
        expect(result).toBe(false);
        expect(player.state.currentEnergy).toBe(3);
    });

    test('resetEnergy resets energy to maxEnergy', () => {
        player.spendEnergy(2);
        player.resetEnergy();
        expect(player.state.currentEnergy).toBe(player.state.maxEnergy);
    });

    test('moveTempDiscardToDiscard moves cards to discard', () => {
        const card = { name: 'TempCard' };
        player.tempDiscard.push(card);
        player.moveTempDiscardToDiscard();
        expect(player.discard).toContain(card);
        expect(player.tempDiscard.length).toBe(0);
    });

    test('Move discard to deck',()=>{
        const card = {name:'TempCard'};
        player.discard.push(card);
        const tempDiscard = [...player.discard];
        tempDiscard.push(dummyCard);
        player.shuffleDiscardIntoDeck();
        expect(player.deck).toEqual(expect.arrayContaining(tempDiscard));

    })
});
