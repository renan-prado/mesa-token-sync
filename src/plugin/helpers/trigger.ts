import { Action } from '@typings/common.types'
import { getAction } from './getAction'
import { sendMessage } from './sendMessage'

/**
 * This function aims to create an action that the app/frontend can send data to itself,
 * with the purpose of creating events in the app/frontend.
 *
 * @param {any} ui - The user interface instance to interact with.
 * @param {Action} action - The action to be triggered.
 * @returns {void}
 */
export function trigger(ui: any, action: Action) {
  getAction<{ open: boolean }>(ui, action, ({ open }) =>
    sendMessage(action, { open })
  )
}
