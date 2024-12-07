import React from 'react';
import './styles/ui.css';
import { useAction } from './hooks/useAction';

function App() {
  const { send } = useAction('say-hello-to-controller');
  const { message } = useAction('say-hello-to-ui');

  const sayToController = () => {
    send({ say: 'Hello controller' });
  };

  console.log('Controller response: ', message?.say);

  return (
    <div className="bg-orange-400">
      <button onClick={sayToController}>Say Hello to controller</button>
    </div>
  );
}

export default App;
