/**
 *
 * @param {string} value - The string representing a pixel value.
 * @return {number} The number value.
 */
export const formatPixelsToNumber = (value) => {
  return Number(value.replace('px', ''))
}