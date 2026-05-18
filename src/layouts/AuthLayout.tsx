import { Outlet, Link } from "react-router-dom"
import {Toaster} from 'sonner'

export default function AuthLayout() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen flex flex-col items-center">
      <Link to={'/'}>
        <img className="w-38 mt-10" src="/logo.svg" alt="Linkora logo" />
      </Link> 

      <div className="flex-1 flex flex-col items-center w-full justify-center px-4">
        <Outlet />
      </div>

      <footer className="text-gray-600 text-xs my-6 text-center">
        <p>Linkora © {new Date().getFullYear()}</p>
        <p className="mt-1">
          Made by{' '}
          <a className="text-cyan-500 hover:text-cyan-400 font-medium transition-colors" href="https://donatodebattista.vercel.app/" target="_blank" rel="noopener noreferrer">
            donidevツ
          </a>
        </p>
      </footer>

      <Toaster position="top-right"/>
    </div>
  )
}