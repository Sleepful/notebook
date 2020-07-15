const handler = (returnValue) => ({
  get: (target, name) => {
    return Object.prototype.hasOwnProperty.call(target, name) ? target[name] : returnValue(name)
  }
})

/**
 * 
 * @callback undefinedCallback
 * @param {string} key
 */

/**
 * Transforms an object. The returned object has the ability to handle access to undefined keys.
 * @param {Object} object - the object that you want to transform
 * @param {undefinedCallback} callback - called with the value of the undefined key
 * @returns {new Proxy} Transformed object
 */
export function handleUndefined(object, callback) {
  return new Proxy(object, handler(callback));
}