import Navbar from './Navbar'
import { cn } from "../lib/utils";
import { TextGenerateEffect } from "./acternity/text-generate-effect";
import { useUserStore } from '../store/user.store';
import { Link } from 'react-router-dom';

function Home() {
  const {influencer} =useUserStore((state)=>state)
  return (
    <div className='flex  items-center justify-center  h-full '>
      <Navbar />
      <div className='  '>

      {/* Header Section */}
      <header className= { cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
        )+"  relative flex flex-col justify-center items-start w-full h-96 p-8 md:p-16  backdrop-blur-md rounded-3xl overflow-hidden"}>
        
        {/* Heading */}
        <h1 className="
          mb-4">
            <TextGenerateEffect words={" Welcome to Insta Analytics"} duration={1} className={"text-4xl md:text-6xl "} textColor={"text-pink-400"} />
         
        </h1>

        {/* Tagline */}
        <div className="text-lg md:text-xl">
          <TextGenerateEffect words={"Unlock the power of your Instagram profile. Track engagement, followers, and posts analytics in one sleek dashboard."} duration={0.3} delay={0.2} textColor={"text-white"}/>
        </div>

        {/* Get Started Button */}

        {
          influencer?
        (<Link to='/influencer/dashboard' className="absolute bottom-6 right-6
          bg-gradient-to-br from-purple-700/30 via-pink-700/30 to-indigo-700/30
          backdrop-blur-md text-white font-semibold py-3 px-6 rounded-2xl
          transition-all hover:scale-105 hover:shadow-xl">
          Visit your dashboard
        </Link>)
:
        ( <Link to='/influencer/register' className="absolute bottom-6 right-6
          bg-gradient-to-br from-purple-700/30 via-pink-700/30 to-indigo-700/30
          backdrop-blur-md text-white font-semibold py-3 px-6 rounded-2xl
          transition-all hover:scale-105 hover:shadow-xl">
          Get Started
        </Link>
        )
}
      </header>
      </div>
    </div>
  )
}

export default Home
