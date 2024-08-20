/**
 *
 * @param {ReadableStream | TransformStream} stream
 * @returns {TransformStream}
 */

export const takeUntil = (stream) => {

  /**
   *
   * @param {ReadableStream | TransformStream} stream
   * @param {TransformStreamDefaultController} controller
   * @returns {Promise<void>} 
   */
  const readAndTerminate = async (stream, controller) => {
    const reader = (stream.readable || stream).getReader()
    const {value} = await reader.read()
    controller.enqueue(value)
    controller.terminate()
  }
  // const reader = (stream.readable || stream).getReader()
  return new TransformStream({
    start(controller) {
      readAndTerminate(stream, controller)
    },
    transform(chunk, controller) {
      controller.enqueue(chunk)
    }
  })
}