import "./App.css";
import AudioRecorder from "./audio-recorder";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h2>React Hook for recording mp3 audio notes</h2>
        <AudioRecorder />
      </header>
    </div>
  );
};

export default App;
