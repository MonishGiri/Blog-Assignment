import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, setUser } from '../slice/userSlice';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/users/current-user', {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) {
          console.warn('User not authenticated or session expired');
          return;
        }

        // Safely parse JSON
        const data = await res.json();

        if (data?.data) {
          dispatch(setUser(data.data));
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
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">GemBlogs</Link>

      <div className="flex gap-4 items-center">
        {isAuthenticated ? (
          <>
            <span className="hidden sm:inline">Hi, {user?.fullName || user?.username}</span>
            <Link to="/allBlogs" className="hover:underline">All Blogs</Link>
            <Link to="/addBlog" className="hover:underline">Add Blog</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
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
};

export default Navbar;
