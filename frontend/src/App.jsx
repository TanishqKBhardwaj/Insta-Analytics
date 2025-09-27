import Login from "./components/Login"
import Home from "./components/Home"
import Register from "./components/Register"
import {Routes,Route,useNavigate } from "react-router-dom"
import { useUserStore } from "./store/user.store"
import { useEffect } from "react"
import { BackgroundLines } from "./components/acternity/background-lines"
import InfluencerRegister from "./components/InfluencerRegister"
import InfluencerDashBoard from "./components/InfluencerDashBoard"
import PostPage from "./components/PostPage"
import Post from "./components/Post"

 

function App() {
  const {username,resetIfExpired}=useUserStore((state)=>state)
  const navigate=useNavigate()
  useEffect(()=>{
    resetIfExpired()
   if(!username)
    navigate('/register')
  },[])
  return (

    <div className="bg-[#09090B]  ">

      <BackgroundLines>

       <Routes>
      <Route exact path="/register" element={<Register/>}/>
      <Route exact path="/login" element={<Login/>}/>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/influencer/register" element={<InfluencerRegister/>}/>
      <Route exact path="/influencer/dashboard" element={<InfluencerDashBoard/>}/>
      <Route exact path="/influencer/posts-analysis" element={<PostPage/>}/>
      <Route exact path="/influencer/posts-analysis/:id" element={<Post/>}/>
      
      </Routes>
      </BackgroundLines>
     
      

      
    </div>
  )
}

export default App
