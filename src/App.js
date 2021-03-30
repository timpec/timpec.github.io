import './App.css';
import participantTable from './views/participantTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Logo">
        </div>
      </header>
      {participantTable()}
    </div>
  );
}

export default App;
