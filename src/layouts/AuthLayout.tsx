import { Outlet, Link } from "react-router-dom"
export default function AuthLayout() {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center">
      <Link to={'/'}><img className="w-38 my-6" src="/logo.svg" alt="" /></Link> 

      <div className="bg-[#111111] flex-1 flex items-center justify-center w-full">
        <Outlet />
      </div>
      <footer className="text-white text-sm my-6 text-center">
        <p>Linkora © 2023</p>
        <p>Made by <a className="bg-lime-400 rounded px-1 text-black font-bold" href="https://donatodebattista.github.io/">donidev</a></p>
      </footer>
    </div>
  )
}