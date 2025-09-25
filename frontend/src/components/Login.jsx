// pages/Login.jsx
import React, { useState } from 'react'
import RegisterImg from '../assets/register.png' // Reuse the same image
import { Link } from 'react-router-dom'
import { LoginUser } from '../api/auth'
import { Loader2Icon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { BackgroundBeamsWithCollision } from './acternity/background-beams-with-collison'

export default function Login() {
   const navigate=useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [disableSubmit,setDisable]=useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async(e) => {
    try {
      setDisable(true)
       e.preventDefault()
       await LoginUser(formData)
       navigate('/')
      
    } catch (error) {
       navigate("/login")
       console.log(error);
      
    }finally{
     setDisable(false)
    }
    // TODO: call your API
  }

  return (
    <div className=" h-full flex items-center justify-center">
       <BackgroundBeamsWithCollision className={"max-w-4xl w-full rounded-2xl"}  >
      <div className=" backdrop-blur-md  shadow-xl w-full   flex flex-col md:flex-row overflow-hidden mx-4">
       
        {/* Left: Form */}
        <div className="flex-1 p-8 md:p-12">
          
          <h2 className="text-3xl font-bold text-white mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
    disabled={disableSubmit}
            >
             {disableSubmit?<Loader2Icon className='  w-full mx-auto animate-spin'/>:"Login"}
            </button>
          </form>

          {/* Register Link */}
          <p className="text-gray-400 text-sm mt-4">
            Don’t have an account?{' '}
            <Link
              to="/register"
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Register
            </Link>
          </p>
        </div>

        {/* Right: Illustration */}
        <div className="flex-1 bg-gradient-to-br from-purple-700/20 via-pink-700/20 to-indigo-700/20 flex items-center justify-center p-8 md:p-12">
          <img src={RegisterImg} className="w-full h-full object-contain" />
        </div>
       
      </div>

      </BackgroundBeamsWithCollision>
    </div>
  )
}
