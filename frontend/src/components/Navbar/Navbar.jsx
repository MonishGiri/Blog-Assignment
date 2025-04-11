import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, setUser } from '../slice/userSlice';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (res.ok) {
        dispatch(logoutUser());
        navigate('/login');
      } else {
        console.error("Logout failed:", res.statusText);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/users/current-user', {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) return;

        const data = await res.json();

        if (data?.data) {
          dispatch(setUser(data.data));
          navigate('/allBlogs');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (!isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated, dispatch]);

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold hover:text-blue-400 transition duration-300">
          BlogNest
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="hidden sm:inline text-sm text-gray-300">
                Hi, {user?.fullName || user?.username}
              </span>
              <Link to="/allBlogs" className="hover:text-blue-400 transition duration-300">
                All Blogs
              </Link>
              <Link to="/addBlog" className="hover:text-blue-400 transition duration-300">
                Add Blog
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1.5 rounded text-sm transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-400 transition duration-300">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-400 transition duration-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
