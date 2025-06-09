/**
 * Locks the UI while `fn` runs (typically for an animation) and then unlocks it once it’s finished.
 *
 * @param {function(): Promise} fn - A function that returns a Promise
 */
export async function lockUIDuring(fn) {
  // Inject no-interaction style once
  if (!document.getElementById('no-interaction-style')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'no-interaction-style';
    styleEl.textContent = `
      .no-interaction,
      .no-interaction * {
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(styleEl);
  }

  // Add class to disable all pointer events
  document.body.classList.add('no-interaction');
  try {
    await fn();
  } finally {
    // Remove class to re-enable pointer events
    document.body.classList.remove('no-interaction');
  }
}