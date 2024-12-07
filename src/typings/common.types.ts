export type Message<T extends Payload> = {
  action: string;
  payload: T;
};

export type Payload = {
  [key: string]: any;
};

export type Action = 'say-hello-to-ui' | 'say-hello-to-controller';
