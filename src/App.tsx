import { RouterView } from '@router/index';
import { ControlButtons } from '@components/index';

import '@styles/app.css';

const App = () => {
  return (
    <div className="app">
      <div className="flex justify-end w-full p-2 absolute draggable">
        <ControlButtons className="not-draggable" />
      </div>

      <RouterView />
    </div>
  );
};

export default App;
