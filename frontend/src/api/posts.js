import api from "../lib/axios.instance";
import { toast } from "react-hot-toast"

export const getAllPosts = async () => {
    try {
        const res = await api.get('/posts/')
        if (res?.data?.success) {

            toast.success(res?.data?.message)
            const postsData = res?.data?.posts.map((post) => {
                let customPost = {}

                for (let field in post) {
                    customPost[field] = typeof (post[field]) === "number" ? formatNumber(post[field]) : post[field]
                }
                return customPost
            }
            )

            return postsData

        }


    } catch (error) {
        console.log(error?.response?.data?.message)
        toast.error(error?.response?.data?.message)
        return []


    }
}


export const getPost=async (postId) => {
    try {
        console.log(postId)
        const res=await api.get(`/posts/${postId}`)
        if(res?.data?.success){
            toast.success(res?.data?.message)
            return res?.data?.post
        }
    } catch (error) {
        console.log(error?.response?.data?.message)
        toast.error(error?.response?.data?.message)
    }
}

function formatNumber(num, isAverage = false) {
    if (num === null || num === undefined || isNaN(num)) return "0";

    const absNum = Math.abs(num);
    let formatted;

    if (absNum >= 1e9) {
        formatted = (num / 1e9).toFixed(isAverage ? 2 : 1) + "B";
    } else if (absNum >= 1e6) {
        formatted = (num / 1e6).toFixed(isAverage ? 2 : 1) + "M";
    } else if (absNum >= 1e3) {
        formatted = (num / 1e3).toFixed(isAverage ? 2 : 1) + "K";
    } else {
        formatted = num.toFixed(isAverage ? 2 : 0);
    }

    // remove unnecessary .00 or .0
    return formatted.replace(/\.0+([KMB])/, "$1").replace(/\.00$/, "");
}

export  const getPostAnalyzed=async (postId) => {
    try {

        console.log("We reached getPostAnalyzed",postId)
        const res=await api.get(`/posts/analyze-post/${postId}`)
        if(res?.data?.success){
            console.log(res?.data?.result)
            toast.success(res?.data?.message)
            return res?.data?.result
        }
    } catch (error) {
        console.log(error?.response?.data?.message)
        toast.error(error?.response?.data?.message)
    }
}