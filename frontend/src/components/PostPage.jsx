import { useEffect,useState } from "react"
import { TextGenerateEffect } from "./acternity/text-generate-effect"
import NavBar from "./Navbar"
import { getAllPosts } from "../api/posts"
import { Heart,MessageCircle,CalendarCheck2 } from "lucide-react"
import { useNavigate } from "react-router-dom"


function PostPage() {

const [posts,setPosts]=useState([])
const navigate=useNavigate()
useEffect(()=>{
    (async () => {
        setPosts(await getAllPosts());
    })()
},[])
  return (
    <div>
      <NavBar/>

      <h1 className="text-center  mt-10 font-bold"><TextGenerateEffect words={"Welcome to in depth Post-Analysis"} duration={1} className={"text-2xl md:text-4xl"} textColor={"text-pink-400"}/></h1>
       <h1 className="text-center  mt-2 font-bold"><TextGenerateEffect words={"Click on the post analysis button to see analysis of that post"} duration={1} className={" md:text-xl"} textColor={"text-gray-400"}/></h1>

       <div className="max-w-4xl mx-auto mt-20 flex flex-col gap-5 justify-center items-center ">

       {
        posts?.length>0?(

            
                posts.map((post,index)=>
                 <div className="flex w-full  flex-wrap shadow-xl/10 shadow-pink-400 border-none rounded-2xl p-2 items-center justify-between    mb-20 md:mb-0 " key={index}>
            <img src={
   post?.imageUrl
  } className="h-20 w-20  md:h-40 md:w-40 rounded-xl object-cover shadow-xl/30 shadow-pink-500"/>
            <div className="flex flex-col  items-start w-[50%]  gap-2">
                <h3 className=" w-full text-white"><span className="font-bold text-pink-400 underline-offset-4">Caption:</span>  {post.caption.length > 30 ? post.caption.substring(0, 30) + "..." : post?.caption}...</h3>

    <h3 className="text-white w-full"><span className="font-bold text-pink-400 underline-offset-4">Type: </span> {post?.type}</h3>
      <h3 className="flex w-fit  flex-wrap gap-1.5 p-2 justify-between text-white bg-[#1C1C22] rounded-xl">
          <Heart /> {post?.likesCount}
        </h3>



        <h3 className="flex w-fit flex-wrap  gap-1.5 p-2 justify-between text-white bg-[#1C1C22] rounded-xl">
          <MessageCircle /> {post?.commentsCount}
        </h3>
          
          <h3 className="flex gap-1 text-white"><span className="font-bold text-pink-400 underline-offset-4 decoration-pink-500"> Date: <CalendarCheck2 color={"pink-400"} /></span> {new Date(post?.postedAt).toLocaleDateString("en-GB")}</h3>

          <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-full" onClick={()=>navigate(`/influencer/posts-analysis/${post.postId}`)}>
  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
    Analyse
  </span>
</button>


            </div>
        </div>)
            


            ):(
            <div className="flex flex-col gap-2 justify-center items-cneter">
                <h1> We cannot see any post of yours at the moment .</h1>
                <p>Make your posts public or upload you posts on instagram and refresh our scraping data from the Home Page</p>

            </div>
        )
       }
        
        


       </div>
     
    </div>
  )
}

export default PostPage
