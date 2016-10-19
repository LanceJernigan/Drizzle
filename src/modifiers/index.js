import {createModifier} from '../api/createModifier'

/*
 * Our example modifiers setup for testing
 * - Every modifier must follow the {action: (string), callback: (function)} structure
 */

let modifiers = [
  {
    action: 'test',
    callback: (state, task) => task.modify ? {text: 'Final'} : state
  }
]

/*
 * We can also use the createModifier helper function instead of writing the modifier ourself
 *
 * @params - action (string) - the action we want to trigger our modifier
 *         - callback (function) - the callback we want our modifier to use when triggered
 */

modifiers.push(createModifier('test2', (state, task) => console.log(state, task)))

export default modifiers