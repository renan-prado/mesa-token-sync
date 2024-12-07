import { SAY_HELLO_ACTION } from './actions';

figma.showUI(__html__);

figma.ui.onmessage = (ui) => {
  SAY_HELLO_ACTION(ui);
};
