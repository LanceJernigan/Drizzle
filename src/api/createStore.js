/*
 * createStore - function - creates the store object for our application to use
 *
 * @params - modifiers (array) - list of modifiers called during dispatch
 *         - preloadedState (multi) - state to load into store
 */

export const createStore = (modifiers, initialState) => {

    let _modifiers = modifiers || []
    let _state = initialState
    let _subscribers = []
    let isDispatching = false

    /*
     *  subscribe - function - creates a subscriber to listen for the given action
     *
     *  @params - action (string) - the action to be listening
     *          - callback (function) - the function to be used as the callback
     */

    const subscribe = (action, callback) => {

        if (!action || !callback) {
          throw new Error('An action to subscribe to and a callback must be supplied.')
        }
        
        if (typeof callback !== 'function') {
          throw new Error('Expected the callback to be a function')
        }

        _subscribers.push({
            action: action,
            callback: callback
        })

    }
    
    const getState = () => _state
    
    /*
     * updateState - function - updates store state
     *
     * @params - state (multi)
     */
    
    const updateState = (state, action) => {
      
      _state = state
      
      contactSubscriber(state, action)
      
    }

    /*
     * contactSubscriber - function - contacts any subscriber listening for the specific task
     *
     * @params - task (string) - the task to search for subscribers
     *         - data (multiple) - the data to send to the subscriber
     */

    const contactSubscriber = (state, action) => {
      
      const subscribers = _subscribers.filter( subscriber => subscriber.action === action)

      subscribers.forEach( subscriber => {

        subscriber.callback(state)
        
      })

    }

    /*
     * dispatch - function - dispatches the given task
     *
     * @params - task (obj)
     */

    const dispatch = task => {
      
        if (isDispatching) {
          throw new Error('Cannot dispatch an action in the middle of another dispatch.')
        }
        
        if (typeof task !== 'object') {
          throw new Error('Dispatched task must be an object.')
        }
      
        if (typeof task.action === 'undefined') {
          throw new Error('Dispatched task is expected to have an action property.')
        }
        
        isDispatching = true;
        const modifiers = _modifiers.filter( modifier => modifier.action === task.action)
        
        updateState(modifiers.reduce( (state, modifier) => modifier.callback(state, task), _state ), task.action)
        
        isDispatching = false

    }

    return {subscribe, dispatch, getState}

}