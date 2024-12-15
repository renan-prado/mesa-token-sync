import { createActionHandler } from '../helpers/createActionHandler';

function main() {
  figma.closePlugin();
}

export default createActionHandler('close-plugin', main);
