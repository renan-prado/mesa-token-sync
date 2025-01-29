import { Message, Payload, Action } from '@typings/common.types'

/**
 * This function aims to get the action from the message.
 *
 * @param {Message<T>} ui - The user interface instance to interact with.
 * @param {Action} action - The action to be triggered.
 * @param {Function} callback - The callback to be called when the action is triggered.
 * @returns {void}
 */
export function getAction<T extends Payload>(
  ui: Message<T>,
  action: Action,
  callback: (payload: T) => void
) {
  if (ui.action === action) {
    callback(ui.payload)
  }
}
