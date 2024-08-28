/**
 * Generates a short, unique identifier.
 * @returns {string} A 6-character alphanumeric string.
 */
export function generateShortId(): string {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  const firstPart = (Math.random() * 46656) | 0;
  const secondPart = (Math.random() * 46656) | 0;
  const first = ('000' + firstPart.toString(36)).slice(-3);
  const second = ('000' + secondPart.toString(36)).slice(-3);
  return first + second;
}

/**
 * Generates a universally unique identifier (UUID) v4.
 * @returns {string} A 36-character UUID string.
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
