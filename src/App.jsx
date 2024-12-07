// src/App.jsx
import CanvasComponent from './components/Canvas';

function App() {
  return (
    <div className="App">
      <div className="p-8">
        <h1 className="text-2xl font-semibold text-center mb-4">Image Annotation Tool</h1>
        <CanvasComponent />
      </div>
    </div>
  );
}

export default App;
