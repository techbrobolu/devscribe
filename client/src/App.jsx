import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Post from './pages/Post';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="px-4 py-6 max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blogs/:slug" element={<Post />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
