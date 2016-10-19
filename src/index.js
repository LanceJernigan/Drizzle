import {createStore} from './api/createStore'
import modifiers from './modifiers'

/*
 * Setup our initial store with an initial state
 *
 * @params - modifiers (array) - a list of modifiers [{action: (string), callback: (function)}]
 *         - initialState (multi) - the initial state of the store
 */

const store = createStore(modifiers, {
  text: 'Initial'
})

/*
 * Setup our subscriber to listen for the 'test' action
 *
 * @params - action (string) - the action to listen for
 *         - callback (function) - the callback to pass the new state
 */

store.subscribe('test', state => document.getElementById('container').innerHTML = state.text)

/*
 * Dispatch the initial 'test' action
 * - We're just using this to trigger our subscriber and update the DOM in this example
 *
 * @params - task (obj) - the 'action' property is required, everything else is data for our modifier to handle
 */

store.dispatch({
  action: 'test',
  modify: false
})

/*
 * Dispatch a second 'test' action to show our modifier and subscriber in action
 *
 * @params - task (obj) - the 'action' property is required, everything else is data for our modifier to handle
 */

setTimeout(() => {
  
  store.dispatch({
    action: 'test',
    modify: true
  })
  
}, 2000)