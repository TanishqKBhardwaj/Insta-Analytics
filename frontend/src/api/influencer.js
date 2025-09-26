import api from "../lib/axios.instance"
import toast from "react-hot-toast"
import { useUserStore } from "../store/user.store"

export const registerInfluencer=async(influencer)=>{
    const {setInfluencer}=useUserStore.getState()
    try {
        let res=await api.get(`/influencers/check/${influencer}`)
        if(res?.data?.success){
           
                toast.success(res?.data?.message)
                 res=await api.post(`/influencers/register/${influencer}`)
                 if(res?.data?.success){
                   toast.success(res?.data?.message)
                   setInfluencer(res?.data?.influencer?._id)
                    return true
                   
                 }
                 
                   
                }
                

        }

        
     catch (error) {
        console.log(error?.response?.data?.message)
        toast.error(error?.response?.data?.message)
       return false
    }
}


export const getInfluencerDetails=async()=>{
   
   try {

      const res=await api.get('/influencers')
      if(res?.data?.success){
        toast.success(res?.data?.message)
       const influencerData={}
       for(let field in res?.data?.influencer){
         influencerData[field]= typeof (res?.data?.influencer[field]) ==="number" ?formatNumber(res?.data?.influencer[field]):res?.data?.influencer[field]
       }
       return influencerData
       
      }
      
   } catch (error) {
      toast.error(error?.response?.data?.message)
      console.log(error?.response?.data?.message)
      return null
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
