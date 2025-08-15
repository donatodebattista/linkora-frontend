import { Link } from "react-router-dom"

export default function HomeNavigation() {
  return (
    <div className="flex flex-row w-full md:w-auto gap-2 justify-center items-center min-w-0">
        <Link
            className="cursor-pointer bg-white hover:bg-[#d1d1d1] text-xs md:text-sm text-black p-1.5 md:p-2 font-semibold rounded-xs transition-colors min-w-0 text-center flex-shrink"
            to="/auth/login"
        >
            Iniciar Sesión
        </Link> 

        <Link
            className="cursor-pointer bg-cyan-400 hover:bg-cyan-500 text-xs md:text-sm text-black font-semibold p-1.5 md:p-2 rounded-xs transition-colors min-w-0 text-center flex-shrink"
            to="/auth/register"
        >
            Registrarme
        </Link>
    </div>
  )
}
