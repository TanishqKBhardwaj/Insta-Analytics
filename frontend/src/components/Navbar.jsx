import { Home, BarChart2, LayoutDashboard,LogOut } from 'lucide-react'
import {Link,useNavigate} from "react-router-dom"
import { LogOutUser } from '../api/auth'


export default function GlassyNavbar() {

    const navigate=useNavigate()

    const logOut=async()=>{
        
            await LogOutUser()
            navigate('/login')
    }

    return (
        <nav
            className="
        fixed
md:top-4 md:left-4
bottom-4
left-1/2 
-translate-x-1/2 md:translate-x-0
md:flex-col flex-row
flex
items-center justify-around
gap-4
p-3
bg-gradient-to-br from-purple-700/30 via-pink-700/30 to-indigo-700/30
backdrop-blur-md
rounded-2xl
shadow-lg
z-50
w-full md:w-16
h-16 md:h-auto
my-4

      "
        >
            <Link to='/'>
            <Home className="text-white w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
            </Link>

            <Link to='/influencer/posts-analysis'>
            <BarChart2 className="text-white w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
            </Link>

            <Link to='/influencer/dashboard'>
             <LayoutDashboard className="text-white w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
            </Link>

             <button onClick={()=>logOut()}>
             <LogOut className="text-white w-6 h-6 cursor-pointer hover:scale-110 transition-transform" />
            </button>
            
           
            
        </nav>
    )
}
