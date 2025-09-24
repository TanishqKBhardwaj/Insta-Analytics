// pages/Register.jsx
import React, { useState } from 'react'
import RegisterImg from '../assets/register.png'


export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Register data:', formData)
    // TODO: call your API
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-[#131316]/80 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden mx-4">
        {/* Left: Form */}
        <div className="flex-1 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-white mb-6">Create Account</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-focus duration-200 ease-in-out"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-focus duration-200 ease-in-out"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-focus duration-200 ease-in-out"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-br from-purple-700/30 via-pink-700/30 to-indigo-700/30
    backdrop-blur-md
    text-white font-semibold
    py-3 rounded-lg
    transition-all
    hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              Register
            </button>
          </form>
        </div>

        {/* Right: SVG Illustration */}
        <div className="flex-1 bg-gradient-to-br from-purple-700/20 via-pink-700/20 to-indigo-700/20 flex items-center justify-center p-8 md:p-12">
          <img src={RegisterImg} className="w-full h-full object-contain" />
        </div>
      </div>
    </div>
  )
}
