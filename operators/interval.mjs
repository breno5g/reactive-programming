/**
 * @param {number} ms
 * @return {ReadableStream}
 */
export const interval = (ms) => {
  let _id
  return new ReadableStream({
    start(controller) {
      _id = setInterval(() => controller.enqueue(Date.now()), ms)
    },
    cancel() {
      clearInterval(_id)
    }
  })
}