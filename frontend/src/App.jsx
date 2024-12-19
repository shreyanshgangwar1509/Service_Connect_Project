import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
// import Allhunts from './Pages/Allhunts';

import Navbar from './Components/Navbar';
import LoginPage from './Pages/Auth/Login';
import RegisterPage from './Pages/Auth/Register';
import Home from './Pages/Home/Home';

function App() {
  return (
     
    <Router>
     
      <Navbar />
    
      
      <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            </Routes>
    </Router>
    
  );
}

export default App;
