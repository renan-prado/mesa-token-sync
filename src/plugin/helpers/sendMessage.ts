import type { Action, Payload } from '../../typings/common.types';

export function sendMessage(action: Action, payload: Payload) {
  figma.ui.postMessage({
    action,
    payload,
  });
}
