import type { Payload } from '../../typings/common.types';
import { createActionHandler } from '../helpers/createActionHandler';
import { sendMessage } from '../helpers/sendMessage';

// Defines the expected payload for this action
interface HelloPayload extends Payload {
  say: string;
}

// Main function
function main({ say }: HelloPayload) {
  console.log('UI Message: ', say);
  sendMessage('say-hello-to-ui', { say: 'Hello UI!' });
}

// Export the action as default
export default createActionHandler<HelloPayload>('say-hello-to-controller', main);
