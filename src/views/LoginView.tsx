import { Link } from "react-router-dom"

export default function LoginView() {
  return (
    <>
        <nav>
            <span className="text-white mr-1">¿Aún no tienes cuenta?</span>
            <Link to="/auth/register" className="text-blue-500 hover:underline">
                Regístrate
            </Link>
        </nav>
    </>
  )
}
