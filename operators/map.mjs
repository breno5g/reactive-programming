/**
 * @param {function} fn 
 * @return {TransformStream}
 */
export const map = (fn) => {
  return new TransformStream({
    transform(chunk, controller) {
      controller.enqueue(fn.bind(this)(chunk))
    }
  })
}