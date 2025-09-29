import NavBar from './Navbar'
import { TextGenerateEffect } from './acternity/text-generate-effect'
import { Spotlight } from './acternity/spotlight'
import { UsersRound,Camera,Star,TrendingUp,MessageCircle,Heart } from 'lucide-react'
import { useState,useEffect } from 'react'
import { getInfluencerDetails } from '../api/influencer'

function InfluencerDashBoard() {
 const [influencer,setInfluencer]=useState(null)
  useEffect(()=>{
    (async()=>{
        setInfluencer(await getInfluencerDetails())
    })()
  
  },[])
  return (
    <div className=' max-w-6xl h-full mx-auto sm:px-2 md:px-0 pt-10 space-y-2 '>
        <NavBar/>
        <h1 className='text-center w-full   font-bold   '><TextGenerateEffect words={" Welcome to your  Insta Analytics Dashboard"} duration={1} className={"text-3xl md:text-4xl "} textColor={"text-pink-400"} /></h1>
         <h1 className='text-center w-full '><TextGenerateEffect words={" Premium Instagram insights and engagement metrics"} duration={1}  textColor={"text-gray-400"} /></h1>
  <div className="bg-[#131316] relative border-2 border-[#414145] rounded-2xl p-10
 transition-all duration-300 ease-in-out
    hover:scale-105 hover:shadow-xl/20 hover:shadow-pink-400
    
    flex items-center justify-start flex-wrap gap-3">

        <Spotlight
        className=" absolute top-10  left-0 md:top-25 md:left-60"
        fill="white"
      />

    {/* Profile Image */}
    <img
      src={
      influencer?.profilePic
  }
      className="w-20 h-20 object-contain rounded-full"
    />

    {/* Profile Info */}
    <div className="flex flex-col gap-2">
      <h3 className="text-pink-400 font-bold text-xl md:text-2xl">
        {influencer?.fullname}
      </h3>
      <h3 className="text-pink-400">@{influencer?.username}</h3>

      {/* Stats */}
      <div className="flex flex-wrap gap-2 mt-2">
        <h3 className="flex gap-1.5 p-1 justify-between text-white bg-[#1C1C22] rounded-xl">
          <UsersRound /> {influencer?.followers} followers
        </h3>
        <h3 className="flex gap-1.5 p-1 justify-between text-white bg-[#1C1C22] rounded-xl">
          <Camera />{influencer?.postsCount} posts
        </h3>
        <h3 className="flex gap-1.5 p-1 justify-between text-white bg-[#1C1C22] rounded-xl">
          <Heart /> {influencer?.following} following
        </h3>
      </div>
    </div>
  </div>



   <div className=' w-full flex flex-col md:flex-row gap-3 justify-center items-center mt-10  
     '>
    <div className='flex flex-wrap justify-between items-center gap-2 p-4 w-80 h-30 bg-[#131316] transition-all duration-300 ease-in-out
    hover:scale-105 hover:shadow-xl/20 hover:shadow-pink-400 border-2 border-[#414145]  rounded-2xl  '>
      <div className='flex flex-col gap-2'>
      <h1 className='text-gray-400 font-bold'>Followers</h1>
      <h1 className='text-pink-400 text-2xl md:text-3xl font-bold'>{influencer?.followers}</h1>
      </div>

     <div className="h-10 w-10 rounded-2xl p-2 
                bg-gradient-to-br 
                from-pink-500 
                to-yellow-400 
                flex items-center justify-center">
  <UsersRound color="white" />
</div>


    </div>

    <div className='flex flex-wrap justify-between items-center gap-2 p-4 w-80 h-30 bg-[#131316] transition-all duration-300 ease-in-out
    hover:scale-105 hover:shadow-xl/20 hover:shadow-pink-400 border-2 border-[#414145]  rounded-2xl  '>
      <div className='flex flex-col gap-2'>
      <h1 className='text-gray-400 font-bold'>Posts</h1>
      <h1 className='text-pink-400 text-2xl md:text-3xl font-bold'>{influencer?.postsCount}</h1>
      </div>

     <div className="h-10 w-10 rounded-2xl p-2 
                bg-gradient-to-br 
                from-pink-500 
                to-yellow-400 
                flex items-center justify-center">
  <Camera color="white" />
</div>


    </div>

    <div className='flex flex-wrap justify-between items-center gap-2 p-4 w-80 h-30 bg-[#131316] transition-all duration-300 ease-in-out
    hover:scale-105 hover:shadow-xl/20 hover:shadow-pink-400 border-2 border-[#414145]  rounded-2xl  '>
      <div className='flex flex-col gap-2'>
      <h1 className='text-gray-400 font-bold'>Avg. Likes</h1>
      <h1 className='text-pink-400 text-2xl md:text-3xl font-bold'>{influencer?.avgLikes}</h1>
      </div>

     <div className="h-10 w-10 rounded-2xl p-2 
                bg-gradient-to-br 
                from-pink-500 
                to-yellow-400 
                flex items-center justify-center">
  <Heart  color="white" />
</div>


    </div>

    <div className='flex flex-wrap justify-between items-center gap-2 p-4 w-80 h-30 bg-[#131316] transition-all duration-300 ease-in-out
    hover:scale-105 hover:shadow-xl/20 hover:shadow-pink-400 border-2 border-[#414145]  rounded-2xl  '>
      <div className='flex flex-col gap-2'>
      <h1 className='text-gray-400 font-bold'>Avg. Comments</h1>
      <h1 className='text-pink-400 text-2xl md:text-3xl font-bold'>{influencer?.avgComments}</h1>
      </div>

     <div className="h-10 w-10 rounded-2xl p-2 
                bg-gradient-to-br 
                from-pink-500 
                to-yellow-400 
                flex items-center justify-center">
  <MessageCircle  color="white" />
</div>


    </div>

    
   </div>


  {/*Engagment Stats*/}
   <div className='bg-[#131316] border-2 border-[#414145] rounded-2xl p-10
 transition-all duration-300 ease-in-out
    hover:scale-105 hover:shadow-xl/20 hover:shadow-pink-400
    
    flex flex-col items-start justify-center w-full gap-3  mt-10'>
      <h1 className='flex  items-center gap-2 text-pink-400 font-bold text-2xl md:text-4xl'> <TrendingUp color={"white"} /> Engagment Analytics</h1>

      <div className='mt-10 w-full flex flex-col gap-5 items-start'>
        <div className='w-full space-y-2 p-1'>
         <h2 className='text-gray-300'>❤️ Average Comments per post </h2>
        <div className='w-full h-3 bg-[#1B1B1F] rounded-3xl '>
          <div className={`overflow-hidden rounded-3xl bg-pink-500 ${influencer?.avgComments?.includes('B')?"w-[90%]":influencer?.avgComments?.includes('M')?"w-[60%]":"w-[30%]"} h-full`}></div>
        </div>
        </div>

        <div className='w-full space-y-2 p-1'>
         <h2 className='text-gray-300'>❤️ Average Likes per post </h2>
        <div className='w-full h-3 bg-[#1B1B1F] rounded-3xl'>
          <div className={`overflow-hidden rounded-3xl bg-pink-500 ${influencer?.avgLikes?.includes('B')?"w-[90%]":influencer?.avgLikes?.includes('M')?"w-[60%]":"w-[30%]"} h-full`}></div>
        </div>
        </div>

        <div className='w-full space-y-2 p-1'>
         <h2 className='text-gray-300'>❤️ Engagment Rate % </h2>
        <div className='w-full h-3 bg-[#1B1B1F] rounded-3xl '>
          <div className={`overflow-hidden rounded-3xl bg-pink-500  h-full`} style={{ width: influencer?.engagementRate + '%' }}></div>
        </div>
        </div>
        


      </div>


      
   </div>

   {/*Summary*/}

   <div className='mt-10 p-10 w-full bg-[#131316] border-2 border-[#414145] rounded-2xl transition-all duration-300 ease-in-out
    hover:scale-105 hover:shadow-xl/20 hover:shadow-pink-400 space-y-10 mb-20 md:mb-10 '>
      <h1 className='text-pink-400 text-center w-full text-2xl md:text-4xl font-bold'>Performance Summary</h1>
      <div className='flex gap-5 flex-wrap justify-between'>
        <div className='flex flex-col gap-2'>
          <p className="font-bold text-pink-400 text-xl md:text-2xl">{influencer?.engagementRate}%</p>
          <p className="text-gray-300 text-sm">Engagment Rate</p>
          <p className={`${influencer?.engagementRate>60?"text-green-300":influencer?.engagementRate>30?"text-yellow-300":"text-red-300"}`}>{influencer?.engagementRate>60?"Amazing":influencer?.engagementRate>30?"Good":"Improve it"}</p>
        </div>

        <div className='flex flex-col gap-2'>
          <p className="font-bold text-pink-400 text-xl md:text-2xl">{influencer?.avgLikes}</p>
          <p className="text-gray-300 text-sm">Avg Likes</p>
          <p className={`${influencer?.avgLikes.includes('M')?"text-green-300":influencer?.avgLikes?.includes('K')?"text-yellow-300":"text-red-300"}`}> {influencer?.avgLikes.includes('M')?"High":influencer?.avgLikes?.includes('K')?"Good":"Low"}Performance</p>
        </div>

        <div className='flex flex-col gap-2'>
          <p className="font-bold text-pink-400 text-xl md:text-2xl">{influencer?.avgComments}</p>
          <p className="text-gray-300 text-sm">Avg Comments</p>
          <p className={`${influencer?.avgComments.includes('M')?"text-green-300":influencer?.avgComments?.includes('K')?"text-yellow-300":"text-red-300"}`}> {influencer?.avgComments.includes('M')?"High":influencer?.avgComments?.includes('K')?"Good":"Low"}Performance</p>
        </div>

      </div>

      

   </div>







      
    </div>
  )
}

export default InfluencerDashBoard
