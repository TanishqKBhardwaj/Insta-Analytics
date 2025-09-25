import api from "../lib/axios.instance";
import toast from "react-hot-toast";
import { useUserStore } from "../store/user.store";
const {setUser,clearUser}=useUserStore.getState()
export const registerUser=async (user) => {
 
    try {
        const res= await api.post('/users/register',{
            ...user
        })

        if(res?.data?.success){
         toast.success("Successfully registered")
         setUser(user)
        }
    } catch (error) {
        console.log(error?.response?.data?.message)
        toast.error(error?.response?.data?.message)  
        throw Error  
    }


    
}

export const LoginUser=async (user) => {
    try {
        const res=await api.post('/users/signIn',{
            ...user
        })
        if(res?.data?.success){
            toast.success("Login Successfully")
            setUser(res?.data?.user)

        }
        
    } catch (error) {
         console.log(error?.response?.data?.message)
        toast.error(error?.response?.data?.message) 
        throw Error
    }
    
}

export const LogOutUser=async () => {
    try {
        const res=await api.post('/users/signOut')
        if(res?.data?.success){
            toast.success("Logout successfully")
            clearUser()
        }
    } catch (error) {
        console.log(error?.response?.data?.message)
        toast.error(error?.response?.data?.message) 
    }
    
}