import { Action } from '@typings/common.types'

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
