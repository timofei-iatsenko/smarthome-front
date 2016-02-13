/**
 * =Create a Simple Event.
 *
 * ==Example usage:
 *
 * ```
 * class Foo {
 *
 *  constructor() {
 *    this.onChange = new SimplEvent();
 *    this.onDestroy = new SimplEvent();
 *  }
 *
 *  change() {
 *    this.onChange.trigger()
 *  }
 *
 *  destroy() {
 *   this.onDestroy.trigger()
 *  }
 * }
 *
 * const foo = new Foo();
 *
 * foo.onChange.bind(() => {
 *  console.log('foo is changed!')
 * })
 * ```
 * == Motivation
 * This approach work better with IDE static analysis, and don't make developers to write smth like this:
 *
 * onChange(fn) {
 *  this.on('change', fn)
 * }
 *
 * offChange(fn) {
 *  this.off('change', fn)
 * }
 *
 * This can reduce boilerplate code, and make classes cleaner.
 */
export class SimpleEvent {

  protected _handlers: Array<Function> = [];

  /**
   * Bind handler to this event
   * @param {function} fn
   * @return {function} unregister func
   */
  bind(fn: Function) {
    this._handlers.push(fn);

    return () => {
      this.unbind(fn);
    };
  }

  /**
   * Bind handler which will be triggered just once
   */
  bindOnce(fn: Function) {
    this.bind(function _onceHandler() {
      fn.apply(fn, arguments);
      this.unbind(fn);
    });
  }

  /**
   * Remove handler
   * @param {function} fn
   */
  unbind(fn: Function) {
    this._handlers.splice( this._handlers.indexOf(fn), 1);
  }

  /**
   * Remove all handlers from current event
   */
  unbindAll() {
    this._handlers.length = 0;
  }

  /**
   * Trigger current event
   * @param args
   */
  trigger(...args) {
    const length = this._handlers.length;
    for (let i = 0; i < length; i++) {
      this._handlers[i].apply(this, args);
    }
  }
}
