import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

function Navbar() {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Study Circle</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/materials">Materials</Link>
            </li>
            {currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/upload">Upload Material</Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/payment">Payment</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>
          <div className="navbar-nav">
            {!currentUser ? (
              <>
                <Link className="nav-link" to="/login">Login</Link>
                <Link className="nav-link" to="/register">Register</Link>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/profile">
                  <i className="bi bi-person-circle me-1"></i>
                  {currentUser.name || 'Profile'}
                </Link>
                <button
                  className="btn btn-link nav-link"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
