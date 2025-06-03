import { Player } from '../components/Player.js';

let player = null;

/**
 * Spawns a new player with the given parameters.
 * @param {number} maxHealth
 * @param {number} maxEnergy
 * @param {Deck} deck
 * @param {Hand} hand
 * @param {Discard} discard
 * @param {Array} effect
 * @returns {Player}
 */
export function spawnPlayer(maxHealth, maxEnergy, deck, hand, discard, effect = []) {
  player = new Player(maxHealth, maxEnergy, deck, hand, discard, effect);
  return player;
}

/**
 * Called at the start of the player's turn.
 * Resets energy and draws 5 cards.
 */
export function startTurn() {
  if (!player) return;
  player.resetEnergy();
  player.drawCards(5);
}

/**
 * Called at the end of the player's turn.
 * Discards the player's hand.
 */
export function endTurn() {
  if (!player) return;
  player.discardHand();
}

/**
 * Checks if the player is dead (0 HP).
 * If the player does not exist, returns null.
 * @returns {boolean}
 */
export function isPlayerDead(player) {
    if (!player) {
        return null;
    }
    return player.state.currentHealth <= 0;
}

export function deletePlayer() {
  player = null;
}

/**
 * Handles a player action (e.g., playing a card).
 * @param {string} action
 * @param {...any} args
 */
export function handlePlayerAction(action, ...args) {
  if (!player) return;
  // playing a card
  if (action === 'playCard') {
    const [card, target] = args;
    player.playCard(card, target);
  }
  // other actions like using a potion, etc. can be added below
}

//export the player instance
export function getPlayer() {
  return player;
}