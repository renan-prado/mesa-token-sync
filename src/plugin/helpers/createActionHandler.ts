import { Action } from '@typings/common.types'

/**
 * This function aims to create an action handler.
 *
 * @param {Action} action - The action to be triggered.
 * @param {Function} handler - The handler to be called when the action is triggered.
 * @returns {Function} - The action handler.
 */
export function createActionHandler<T>(
  action: Action,
  handler: (payload: T) => void
) {
  return (ui: { action: string; payload: T }) => {
    if (ui.action === action) {
      handler(ui.payload)
    }
  }
}
