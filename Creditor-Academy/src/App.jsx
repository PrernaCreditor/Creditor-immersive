import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import { Navbar } from './components/navbar';
 // adjust the path based on your project structure

function App() {
  return (
    <>
    <Navbar/>
      
      <Routes>
        <Route path="/" element={<Landing/>} />
        {/* Add other routes here as needed */}
      </Routes>
    </>
  );
}

export default App;
