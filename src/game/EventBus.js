// A simple pub/sub (publish-subscribe) event bus implementation
export class EventBus {
  constructor() {
    // Map of event names to arrays of listener callbacks
    this.listeners = {};
  }

  /**
   * Subscribe to an event.
   *
   * @param {string} event - The name of the event to listen for.
   * @param {Function} handler - Callback invoked when the event is published.
   */
  subscribe(event, handler) {
    // Initialize the listener array if it doesn't exist
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    // Add the handler to the list of listeners for this event
    this.listeners[event].push(handler);
  }

  /**
   * Unsubscribe a handler from an event.
   *
   * @param {string} event - The name of the event to stop listening to.
   * @param {Function} handler - The callback to remove.
   */
  unsubscribe(event, handler) {
    // If there are no listeners for this event, do nothing
    if (!this.listeners[event]) return;
    // Filter out the specified handler
    this.listeners[event] = this.listeners[event].filter(h => h !== handler);
  }

  /**
   * Publish (emit) an event to all subscribers.
   *
   * @param {string} event - The name of the event to publish.
   * @param {*} data - Optional data to pass to each listener.
   */
  publish(event, data) {
    // Retrieve listeners array, or empty array if none
    const handlers = this.listeners[event] || [];
    // Invoke each listener with the provided data
    handlers.forEach(h => h(data));
  }
}