import { Link } from "react-router-dom"

export default function HomeNavigation() {
  return (
    <div className="flex flex-row w-full md:w-auto gap-3 justify-center items-center min-w-0">
        <Link
            className="cursor-pointer text-sm text-white border border-white/20 px-5 py-2.5 font-medium rounded-lg hover:bg-white/10 transition-all duration-200 min-w-0 text-center"
            to="/auth/login"
        >
            Iniciar Sesión
        </Link> 

        <Link
            className="cursor-pointer bg-cyan-400 hover:bg-cyan-300 text-sm text-gray-900 px-5 py-2.5 font-semibold rounded-lg transition-all duration-200 min-w-0 text-center"
            to="/auth/register"
        >
            Registrarme
        </Link>
    </div>
  )
}