
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Calling from './pages/Calling';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/room/:roomId' element={<Calling/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
