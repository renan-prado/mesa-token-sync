# Figma Plugin with React and Tailwind Template

![figma-react-tailwind](https://github.com/user-attachments/assets/4a110be7-2fac-44d3-870c-e5b95ed7a230)

This template contains the basic structure for developing a Figma plugin with React and Typescript.

Some hooks and utilities have been added to the template to make it easier to manage the plugin with React.

To learn about the development possibilities, take a look at [Figma API Overview](https://www.figma.com/plugin-docs/api/api-overview/) and learn more about the library.

## Quickstart

Installation:

```shell
npm install
```

Run development mode:

```shell
npm run dev
```

To test your plugin in Figma do:

> Open **Figma** → **Plugins** → **Development** → **Import plugin from manifest...** and choose **manifest.json** file from this repo.

![image](https://github.com/user-attachments/assets/a763a67d-8d9f-4919-98bb-46c698192e18)

## Structure

The application is separated by `app` and `plugin`. The `app` is responsible for the entire **UI** part and the `plugin` for all interaction with [Figma`s APIs](https://www.figma.com/plugin-docs/api/api-overview/).

![image](https://github.com/user-attachments/assets/710a306f-1695-465a-b913-61877d7f0d41)


## Communication between App (UI) and Plugin (controller)

The `app` and the `plugin` are separated as if they were `frontend` and `backend`. Each one has a different context and responsibilities. And communication between them is the key to a sophisticated custom plugin.

For this, **Figma** created communication through `events`, in this case the chosen one was **`window.onmessage`**, so communication between `backend` and `frontend` is done through this channel.

So, some `useful functions` and some `react hooks` were implemented in this template to simplify the communication between the `backend` and `frontend`. These will communicate through **Actions** which will carry the action name and an optional payload.

```ts
export type Message<T extends Payload> = {
  action: string;
  payload: T;
};
```

## App directory

The `/app` directory is managed by `App.tsx`, a `react` file that will contain the application's UI content.

### useAction()

In the `/app` repository there is a hook folder that contains the `useAction()` hook which will assist in communication between the `UI (app)` and the `controller (plugin)`.

The hook contains only one prop which is the name of the action that needs to be manipulated:

```js
const { ... } = useAction('my-action-name');
```

And it contains a return object that has two attributes: `message` and `send`:

```js
const { message, send } = useAction('my-action-name');
```

### Sending data from UI to Controller

The **send** attribute is a function that will be responsible for sending a data to the `controller (plugin)` . The data must follow the `Payload` typing:

```js
const { send } = useAction('my-action-name');

send({ say: 'Hello controller' });
```

### Receiving data from the Controller in the UI

The `message` attribute is a `Payload` type object that will be responsible for receiving data in real time coming from the `controller (plugin)` side.

```js
const { message } = useAction('my-action-fired-in-the-controller');
console.log('Data sent by the Controller: ', message);
```

> You can use the same action to communicate between the UI and the Controller, or use multiple actions each with its own context.

## Plugin directory

The `/plugin` directory is managed by `controller.ts`. Responsible for manipulating Figma's resources.

> To learn more about what can be manipulated, see [Figma Controller Docs](https://www.figma.com/plugin-docs/creating-ui/).

### Receiving data from the UI in the Controller

> Unlike the App (UI), in the Controller the functions for receiving and sending data are separate.

### getAction()

The `getAction` is an independent function that will be responsible for receiving and typing our actions:

```ts
figma.ui.onmessage = (ui) => {
   getAction(ui,'my-action-name',(data) => {
      ...
   })
};
```

In the function, we pass three props, ui , which will come from figma.ui.onmessage, actionName , which is the name of the action you want to handle, and a function that will receive the Payload sent by the UI.

### Sending data from Controller to UI

> Unlike the App (UI), in the Controller the functions for receiving and sending data are separate.

### sendMessage()

The **sendMessage** is an independent function that will be responsible for sending data to the UI:

```ts
sendMessage('my-action-name', { say: 'Hello UI!' });
```

### Action Handle File

To make organization easier and separate each action into a separate file, the **createActionHandler** function was developed, which is responsible for doing something similar to getActions but within a file structure.

```ts
import type { Payload } from '../../typings/common.types';
import { createActionHandler } from '../helpers/createActionHandler';
import { sendMessage } from '../helpers/sendMessage';

// Defines the expected payload for this action
interface HelloPayload extends Payload {
  say: string;
}

// main function
function main({ say }: HelloPayload) {
  console.log('UI Message: ', say);
  sendMessage('say-hello-to-ui', { say: 'Hello UI!' });
}

// Export the action as default
export default createActionHandler<HelloPayload>('say-hello-to-controller', main);
```

We pass the name of our action and a `main` function to `createActionHandler`, and then `createActionHandler` will take the information from `ui` and send the data received by that action to the main function.

When importing this file, simply use the action in `controller.ts`:

```ts
figma.ui.onmessage = (ui) => {
  SAY_HELLO_ACTION(ui);
};
```

## Example in this template

> This template contains a practical example of communication between backend and frontend

## Build

To build just run:

```shell
npm run build
```

## Manifest

The manifest.json file will be read by Figma and contains the initialization settings as well as data about the plugin and permissions:

```json
{
  "name": "Figma Plugin Template",
  "id": "00000000",
  "api": "1.0.0",
  "main": "dist/code.js",
  "ui": "dist/ui.html",
  "editorType": ["figma", "figjam"]
}
```

> To learn more, read [The Manifest documentation](https://www.figma.com/plugin-docs/manifest/).

## Credits

> This template was inspired by the template created by [nirsky](https://github.com/nirsky) in the [Figma Plugin React Template](https://github.com/nirsky/figma-plugin-react-template) repository
