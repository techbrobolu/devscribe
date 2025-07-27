import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-blue-600">DevScribe</Link>

      <div className="flex items-center gap-4">
        <Link to="/" className="hover:underline">Home</Link>
        {token ? (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;