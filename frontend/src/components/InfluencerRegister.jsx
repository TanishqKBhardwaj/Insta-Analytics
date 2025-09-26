// pages/InfluencerRegister.jsx
import React, { useState } from 'react'
import SelfieGif from '../assets/selfie.gif'
import { Loader2Icon } from 'lucide-react'
import { BackgroundBeamsWithCollision } from './acternity/background-beams-with-collison'
import { registerInfluencer } from '../api/influencer'
import {useNavigate} from "react-router-dom"

export default function InfluencerRegister() {
  const [influencer, setInfluencer] = useState('')
  const [disableSubmit, setDisable] = useState(false)
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!influencer.trim()) return

    try {
      setDisable(true)
      const result =await registerInfluencer(influencer)
      if(result)
      navigate('/influencer/dashboard')
    } catch (error) {
      console.error(error)
    } finally {
      setDisable(false)
    }
  }

  return (
    <div className="h-full flex items-center justify-center">
      <BackgroundBeamsWithCollision className={'max-w-4xl w-full rounded-2xl'}>
        <div className="backdrop-blur-md shadow-xl w-full flex flex-col md:flex-row overflow-hidden mx-4">
          
          {/* Left: Form & Disclaimer */}
          <div className="flex-1 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Register Influencer Username
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              ⚠️ Once you set your Instagram username, it{' '}
              <span className="text-red-400 font-semibold">cannot be changed</span>.  
              We are using a limited credit scraping service for free, so please choose carefully.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="influencer"
                placeholder="Enter your Instagram username"
                value={influencer}
                onChange={(e) => setInfluencer(e.target.value)}
                className="p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-purple-500 
                           transition duration-200 ease-in-out"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-br from-purple-700/30 via-pink-700/30 to-indigo-700/30
                           backdrop-blur-md text-white font-semibold py-3 rounded-lg
                           transition-all hover:scale-105 hover:shadow-xl cursor-pointer"
                disabled={disableSubmit}
              >
                {disableSubmit ? (
                  <Loader2Icon className="w-full mx-auto animate-spin" />
                ) : (
                  'Confirm Username'
                )}
              </button>
            </form>
          </div>

          {/* Right: Illustration */}
          <div className="flex-1 bg-gradient-to-br from-purple-700/20 via-pink-700/20 to-indigo-700/20 flex items-center justify-center p-8 md:p-12">
            <img src={SelfieGif} alt="Selfie Illustration" className="w-full h-full object-contain" />
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  )
}
