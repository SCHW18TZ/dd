
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import Register from './Pages/Register';
import Navbar from './Components/Navbar';
import Login from './Pages/Login'
import CreatePost from './Pages/CreatePost';

function App() {
  return (
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route  path="/new"  element={<CreatePost/>} />
      </Routes>
    </Router>
  );
}

export default App;
