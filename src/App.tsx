import ReactLogo from '@assets/react.svg';
import './App.css';

function App() {
  return (
    <div data-tauri-drag-region className="App">
      <h1 className="text-3xl text-light-100 font-bold underline">
        Hello World
      </h1>
      <img src={ReactLogo} alt="" />
    </div>
  );
}

export default App;
