
import { Enemy } from '../src/components/Enemy.js';

/**
 * simulate the Player class
 */
class MockPlayer {
    constructor() {
        this.damageTaken = 0;
    }

    takeDamage(amount) {
        this.damageTaken += amount;
    }
}

describe('Enemy component', () => {
    let enemy;

    beforeEach(() => {
        document.body.innerHTML = '';
        enemy = new Enemy({ name: 'Powell', HP: 100, Img: '/src/img/powell_720.png' });
        document.body.appendChild(enemy);
    });

    test('should render enemy with full HP initially', () => {
        enemy.takeDamage(0);
        const hpText = enemy.shadowRoot.querySelector('.hp-text').innerText;
        expect(hpText).toBe('100/100');

        const hpBar = enemy.shadowRoot.querySelector('.hp-bar').style.width;
        expect(hpBar).toBe('100%');
    });

    test('should reduce HP when taking damage', () => {
        enemy.takeDamage(30);
        const hpText = enemy.shadowRoot.querySelector('.hp-text').innerText;
        expect(hpText).toBe('70/100');

        const hpBar = enemy.shadowRoot.querySelector('.hp-bar').style.width;
        expect(hpBar).toBe('70%');
    });

    test('should not have negative HP', () => {
        enemy.takeDamage(150);
        const hpText = enemy.shadowRoot.querySelector('.hp-text').innerText;
        expect(hpText).toBe('0/100');

        const hpBar = enemy.shadowRoot.querySelector('.hp-bar').style.width;
        expect(hpBar).toBe('0%');
    });



    test('should deal damage to player when attacking', () => {
        const mockPlayer = new MockPlayer();
        enemy.attack(mockPlayer, 25);
        expect(mockPlayer.damageTaken).toBe(25);
    });
});
