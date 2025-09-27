import { useEffect, useState } from "react"
import NavBar from "./Navbar"
import { getPost } from "../api/posts"
import { useParams } from "react-router-dom"
import ImageCarousel from "./ImageCarousel"
import { TextGenerateEffect } from "./acternity/text-generate-effect"
import { Heart,MessageCircle,Tag } from "lucide-react"
function Post() {
    const [post,setPost]=useState(null)
    const {id}=useParams()
    useEffect(()=>{
       (async () => {
        setPost(await getPost(id))
       })()
    },[])

   
  return (
    <div className="max-w-6xl mx-auto">

       <h1 className='text-center w-full   font-bold   '><TextGenerateEffect words={" Welcome to your  Insta Analytics Dashboard"} duration={1} className={"text-3xl md:text-4xl "} textColor={"text-pink-400"} /></h1>

       <NavBar/>

       {
        post && <div className="w-full mt-20 flex flex-col  justify-between items-center gap-5 ">

          <div className="flex flex-wrap justify-between ">
            <img src={
    post?.imageUrl
      ? `${import.meta.env.VITE_BACKEND_URL}/proxy-image?url=${encodeURIComponent(post.imageUrl)}`
      : "https://id-preview--e9fc7605-4fba-425e-a1e9-394971741dc0.lovable.app/assets/influencer-profile-CWMvux0e.jpg"
  } className={`  w-[40%]  h-fit    rounded-xl object-cover shadow-xl/30 shadow-pink-500`}/>

   {
    post.images.length>0 && <ImageCarousel images={post.images}/>
   }
            </div>
           <div className="flex flex-col w-full rounded-2xl gap-4 shadow-xl/30 shadow-pink-400 p-6 mb-20 hover:scale-105 duration-300 bg-[#1c1c22]">

  {/* Caption */}
  <h1 className="text-white suse-mono-uniquifier text-lg md:text-2xl">
    <span className="text-pink-400 font-bold text-xl md:text-3xl">Caption: </span>
    {post.caption}
  </h1>

  {/* Type */}
  <h1 className="text-white suse-mono-uniquifier text-lg md:text-2xl">
    <span className="text-pink-400 font-bold text-xl md:text-3xl">Type: </span>
    {post.type}
  </h1>

  {/* Likes & Comments */}
  <div className="flex flex-wrap gap-6 items-center">
    <h1 className="text-white suse-mono-uniquifier text-lg md:text-2xl flex items-center gap-2">
      <Heart className="text-pink-400 w-5 h-5" />
      <span>
        <span className="text-pink-400 font-bold text-xl md:text-3xl">Likes: </span>
        {post.likesCount}
      </span>
    </h1>
    <h1 className="text-white suse-mono-uniquifier text-lg md:text-2xl flex items-center gap-2">
      <MessageCircle className="text-pink-400 w-5 h-5" />
      <span>
        <span className="text-pink-400 font-bold text-xl md:text-3xl">Comments: </span>
        {post.commentsCount}
      </span>
    </h1>
  </div>

  {/* Tags */}
  <div className="flex flex-wrap gap-2 items-center">
    <Tag className="text-pink-400 w-5 h-5" />
    <span className="text-pink-400 font-bold text-xl md:text-3xl suse-mono-uniquifier">Tags: </span>
    {post.tags.map((tag, index) => (
      <span
        key={index}
        className="px-3 py-1 rounded-full text-sm md:text-base font-semibold text-white bg-[#1c1c22] border border-pink-400 suse-mono-uniquifier"
      >
        {tag}
      </span>
    ))}
  </div>

  {/* Posted At */}
  <h1 className="text-white suse-mono-uniquifier text-lg md:text-2xl flex items-center gap-2">
    <span className="text-pink-400 font-bold text-xl md:text-3xl">Posted At: </span>
    {new Date(post.postedAt).toLocaleDateString()}
  </h1>
  
  
</div>

            

          </div>
       }
      
    </div>
  )
}

export default Post
