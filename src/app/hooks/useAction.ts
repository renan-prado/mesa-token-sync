import { useState, useEffect } from 'react';
import type { Action, Payload } from '../../typings/common.types';

export function useAction<Data extends Payload>(action: Action) {
  const [message, setMessage] = useState<Data | null>(null);

  const send = (payload: Data) => {
    parent.postMessage({ pluginMessage: { action, payload } }, '*');
  };

  useEffect(() => {
    const handleMessage = (event) => {
      const { action: type, payload } = event.data.pluginMessage || {};
      if (type === action) {
        setMessage(payload);
      }
    };

    window.addEventListener('message', handleMessage);

    // Cleanup
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [action]);

  return { message, send };
}
