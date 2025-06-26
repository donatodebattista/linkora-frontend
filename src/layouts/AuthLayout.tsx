import { Outlet, Link } from "react-router-dom"
import {Toaster} from 'sonner'

export default function AuthLayout() {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center">
      <Link to={'/'}><img className="w-38 my-6" src="/logo.svg" alt="" /></Link> 

      <div className="bg-[#111111] flex-1 flex flex-col items-center justify-center w-full">
        <Outlet />
      </div>
      <footer className="text-white text-sm my-6 text-center">
        <p>Linkora © 2025</p>
        <p>Made by <a className="rounded px-1 text-cyan-500 font-bold" href="https://donatodebattista.github.io/">donidevツ</a></p>
      </footer>

      <Toaster position="top-right"/>
    </div>
  )
}