export const createModifier = (action, callback) => {
  
  if (! action || ! callback) {
    throw new Error('A valid action and callback were expected.')
  }
  
  if (typeof callback !== 'function') {
    throw new Error('Callback is expected to be a function.')
  }
  
  return {
    action: action, 
    callback: callback
  }
  
}