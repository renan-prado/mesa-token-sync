import { Message, Payload, Action } from '@typings/common.types'

export function getAction<T extends Payload>(
  ui: Message<T>,
  action: Action,
  callback: (payload: T) => void
) {
  if (ui.action === action) {
    callback(ui.payload)
  }
}
