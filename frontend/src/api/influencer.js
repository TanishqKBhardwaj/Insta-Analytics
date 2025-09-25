import api from "../lib/axios.instance"

export const registerInfluencer=async(influencer)=>{
    try {
        let res=await api.get(`/influencers/check/${influencer}`)
        if(res?.data?.success){
            if(res?.data?.private)
                {toast.error("Profile found but is private")
                    return 
                }
                else{
                    toast.success("Profile found , let us scrape it..")
                    res=await api.post(`influencers/register/${influencer}`)
                    if(res?.data?.success)
                    {
                        toast.success("We have successfully fetched data of influencer")
                    }

                }

        }

        
    } catch (error) {
        console.log(error.response.data.message)
        toast.error("Something went wrong,please try again after few minutes")
        throw Error
    }
}
