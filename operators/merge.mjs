/**
 *
 * @typedef {ReadableStream | TransformStream} Stream
 * @param {Stream[]} streams
 * @returns {ReadableStream}
 */
export const merge = (streams) => {
  return new ReadableStream({
    async start(controler) {
      for (const stream of streams) {
        const reader = (stream.readable || stream).getReader()

        async function read() {
          const { done, value } = await reader.read()
          if (done) return
          if (!controler.desiredSize) return
          controler.enqueue(value)
          return read()
        }

        read()
      }
    },
  })
}