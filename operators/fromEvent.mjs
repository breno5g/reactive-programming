/**
 * @param {HTMLElement} target
 * @param {string} eventName
 * @return {ReadableStream}
 */

export const fromEvent = (target, eventName) => {
  let _listener 
  return new ReadableStream({
    start(controller) {
      _listener = event => controller.enqueue(event)
      target.addEventListener(eventName, _listener)
    },
    cancel() {
      target.removeEventListener(eventName, _listener)
    }
  })
}