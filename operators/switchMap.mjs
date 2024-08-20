/**
 * @typedef {function(): ReadableStream | TransformStream} StreamFunction
 *
 * @param {StreamFunction} fn
 * @param {object} options
 * @param {boolean} options.pairwise
 *
 * @return {TransformStream}
 */

export const switchMap = (fn, options = {pairwise: true}) => {
  return new TransformStream({
    transform(chunk, controller) {
      const stream = fn(chunk)
      const reader = (stream.readable || stream).getReader()
      
      async function read() {
        const { done, value } = await reader.read()
        if (done) return
        const results = options.pairwise ? [chunk, value] : value
        controller.enqueue(results)

        return read()
      }

      read()
    }
  })
}