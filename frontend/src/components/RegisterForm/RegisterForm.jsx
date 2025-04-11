import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/users/register", formData);
      alert("Registration successful!");
      console.log("Registered User: ", res.data);
    } catch (error) {
      console.error("Register error", error);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto p-4">
      <h2 className="text-xl mb-4">Register</h2>
      <input type="text" name="fullName" placeholder="Full Name" required onChange={handleChange} className="border p-2 w-full mb-3"/>
      <input type="text" name="username" placeholder="Username" required onChange={handleChange} className="border p-2 w-full mb-3"/>
      <input type="email" name="email" placeholder="Email" required onChange={handleChange} className="border p-2 w-full mb-3"/>
      <input type="password" name="password" placeholder="Password" required onChange={handleChange} className="border p-2 w-full mb-3"/>
      <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">Register</button>
    </form>
  );
};

export default RegisterForm;
