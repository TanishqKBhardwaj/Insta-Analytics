import { useEffect, useState } from "react"
import NavBar from "./Navbar"
import { getPost,getPostAnalyzed } from "../api/posts"
import { useParams } from "react-router-dom"
import ImageCarousel from "./ImageCarousel"
import { TextGenerateEffect } from "./acternity/text-generate-effect"
import { Heart,Loader2,MessageCircle,Tag,Layers } from "lucide-react"
function Post() {
    const [post,setPost]=useState(null)
    const [postAnalysis,setPostAnalysis]=useState(null)
    const [disabled,setDisabled]=useState(false)
    const {id}=useParams()
    useEffect(()=>{
       (async () => {
        setPost(await getPost(id))
       })()
    },[])

   const getPostAnaylsis=async () => {
    try {
      setDisabled(true)
      setPostAnalysis(await getPostAnalyzed(post.postId))
    } catch (error) {
      
    }finally{
      setDisabled(false)
    }
    
   }
  return (
    <div className="max-w-6xl mx-auto">

       <h1 className='text-center w-full   font-bold   '><TextGenerateEffect words={" Welcome to your  Insta Analytics Dashboard"} duration={1} className={"text-3xl md:text-4xl "} textColor={"text-pink-400"} /></h1>

       <NavBar/>

       {
        post && <div className="w-full mt-20 flex flex-col  justify-between items-center gap-5 ">

          <div className="flex flex-wrap justify-between ">
            <img src={
     post?.imageUrl
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

 {
  postAnalysis?(
    <div className="flex flex-col gap-6 p-4">
  {/* Main Image Analysis */}
  {postAnalysis?.imageUrl && (
    <div className="flex flex-col gap-2">
      <h2 className="text-pink-400 font-bold text-xl md:text-3xl">ThumbNail Analysis ,Out of 5</h2>
      <p className="text-white suse-mono-uniquifier text-lg md:text-2xl">
        <strong>Vibe:</strong> {postAnalysis.imageUrl.analysis.vibe}
      </p>
      <div className="flex flex-col gap-1 ml-2">
        {postAnalysis.imageUrl.analysis.quality &&
          Object.entries(postAnalysis.imageUrl.analysis.quality).map(([key, value]) => (
            <p
              key={key}
              className="text-white suse-mono-uniquifier text-lg md:text-2xl"
            >
              <strong>{key}:</strong> {value}
            </p>
          ))}
      </div>
    </div>
  )}

  {/* Images Array Analysis */}
  {postAnalysis?.images && postAnalysis.images.length > 0 && (
  <div className="flex flex-col gap-4 mt-4">
  <h2 className="flex items-center gap-2 text-pink-400 font-bold text-xl md:text-3xl">
    <Layers className="w-6 h-6 text-pink-400" />
    Other Images
    <span className="text-white suse-mono-uniquifier text-lg md:text-2xl font-semibold">
      (out of 5)
    </span>
  </h2>

  <div className="flex flex-wrap gap-6">
    {postAnalysis.images.map((img, index) => (
      <div
        key={index}
        className="flex flex-col gap-2 p-3 border border-pink-400 rounded-xl w-full md:w-[45%] lg:w-[30%]"
      >
        <p className="text-white suse-mono-uniquifier text-lg md:text-2xl">
          <strong>Vibe:</strong> {img.analysis.vibe}
        </p>
        <div className="flex flex-col gap-1 ml-2">
          {img.analysis.quality &&
            Object.entries(img.analysis.quality).map(([key, value]) => (
              <p
                key={key}
                className="text-white suse-mono-uniquifier text-lg md:text-2xl"
              >
                <strong>{key}:</strong> {value}
              </p>
            ))}
        </div>
      </div>
    ))}
  </div>
</div>

  )}
</div>

  ):(
     <button disabled={disabled} className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 w-full" onClick={()=>getPostAnaylsis()}>
  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
    {disabled?<Loader2 className="animate-spin"/>:"Analyse Image"}
  </span>
</button>
  )
 }
  
  
</div>

            

          </div>
       }
      
    </div>
  )
}

export default Post
