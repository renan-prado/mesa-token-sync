import type { Action, Payload } from '../../typings/common.types'

/**
 * This function aims to send a message to the plugin/app.
 *
 * @param {Action} action - The action to be triggered.
 * @param {Payload} payload - The payload to be sent.
 * @returns {void}
 */
export function sendMessage(action: Action, payload: Payload) {
  figma.ui.postMessage({
    action,
    payload,
  })
}
