import { Outlet } from "react-router-dom"
export default function AuthLayout() {
  return (
    <div className="bg-gray-800 h-screen flex flex-col items-center justify-center gap-4">
      <div className="bg-gray-900 p-8 rounded-lg flex flex-col items-center gap-4">
        <img className="w-32" src="/logo.svg" alt="" />
        <Outlet />
      </div>
    </div>
  )
}