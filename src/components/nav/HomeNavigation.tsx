import { Link } from "react-router-dom"

export default function HomeNavigation() {
  return (
    <div>
        <Link
            className="bg-white text-sm text-black p-2 font-semibold mr-2 rounded-xs"
            to="/auth/login"
        >
            Iniciar Sesión
        </Link>

        <Link
            className="bg-cyan-400 text-sm text-black font-semibold p-2 rounded-xs"
            to="/auth/register"
        >
            Registrarme
        </Link>
    </div>
  )
}
