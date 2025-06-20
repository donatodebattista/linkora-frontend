import { Outlet, Link } from "react-router-dom"
export default function AuthLayout() {
  return (
    <div className="bg-black h-screen flex flex-col items-center justify-center gap-4">
      <Link to={'/'}><img className="w-38 mt-6" src="/logo.svg" alt="" /></Link> 
      
      <div className="bg-[#111111] p-8 flex flex-col items-center justify-center gap-4 w-full h-screen">
        <Outlet />
      </div>
    
    </div>
  )
}