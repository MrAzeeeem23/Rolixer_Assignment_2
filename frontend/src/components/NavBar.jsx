import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-2xl font-bold">StoreApp</a>
        <div className="space-x-4">
          <a href="/" className="text-white hover:text-gray-200">Home</a>
          {token ? (
            <>
              <a href="/profile" className="text-white hover:text-gray-200">Profile</a>
              <button onClick={handleLogout} className="text-white hover:text-gray-200">
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="text-white hover:text-gray-200">Login</a>
              <a href="/register" className="text-white hover:text-gray-200">Register</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;