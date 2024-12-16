import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Route, Routes } from 'react-router-dom';
import Wheel1 from './wheel/Wheel1';
import Wheel2 from './wheel/Wheel2';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Wheel1 />} />
      <Route path="wheel2" element={<Wheel2 />} />
    </Routes>
  )
}

export default App;
