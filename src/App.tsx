import { appWindow } from '@tauri-apps/api/window';
import { exit } from '@tauri-apps/api/process';
import '@styles/app.css';

function App() {
  const handleOnMinimize = async () => {
    await appWindow.minimize();
  };

  const handleOnClose = async () => {
    await appWindow.close();
    await exit();
  };

  // const handleOnSystemTray = async () => {
  //   appWindow.hide();
  // };

  return (
    <div className="app">
      <div data-tauri-drag-region className="flex justify-end w-full p-2">
        <div className="bg-dark-700 flex flex-wrap p-1 rounded-lg gap-1">
          <button
            type="button"
            className="h-[30px] w-[32px] hover:bg-dark-600 text-white rounded-lg"
            onClick={() => handleOnMinimize()}
          >
            _
          </button>
          <button
            type="button"
            className="h-[30px] w-[32px] hover:bg-dark-600 text-white rounded-lg"
            onClick={() => handleOnClose()}
          >
            x
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
