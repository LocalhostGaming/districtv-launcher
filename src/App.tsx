import { appWindow } from '@tauri-apps/api/window';
import '@styles/app.css';

function App() {
  const handleOnMinimize = async () => {
    await appWindow.minimize();
  };
  const handleOnClose = async () => {
    await appWindow.close();
  };

  return (
    <div data-tauri-drag-region className="app">
      <button
        type="button"
        className="m-2 py-2 px-3 bg-dark-400 hover:bg-dark-300 transition-colors text-white rounded-lg"
        onClick={() => handleOnMinimize()}
      >
        minimize
      </button>

      <button
        type="button"
        className="m-2 py-2 px-3 bg-dark-400 hover:bg-dark-300 transition-colors text-white rounded-lg"
        onClick={() => handleOnClose()}
      >
        close
      </button>

      <h1 className="text-3xl text-light-100 font-bold underline m-2">
        Hello World
      </h1>
    </div>
  );
}

export default App;
