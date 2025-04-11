import React, { useState } from "react";
import { setUser } from "../slice/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin =  (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/users/login', {
        method: 'POST', // or 'PUT', 'PATCH'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password
        }),
      })
      .then(response => response.json())
      .then(res => {
        console.log('Success:', res.data.user);
        dispatch(setUser(res.data.user))
        navigate('/allBlogs')
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-4">
      <h2 className="text-xl mb-4">Login</h2>
      <input
        type="text"
        name="username"
        value={credentials.username}
        onChange={handleChange}
        placeholder="Username or Email"
        className="border p-2 w-full mb-3"
        required
      />
      <input
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
        placeholder="Password"
        className="border p-2 w-full mb-3"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
