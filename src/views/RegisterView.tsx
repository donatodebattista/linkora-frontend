import { Link } from "react-router-dom"

export default function RegisterView() {
  return (
    <>
    <nav>
        <span className="text-white mr-1">¿Ya tienes cuenta?</span>
        <Link to={"/auth/login"} className="text-blue-500 hover:underline">
             Inicia sesión
        </Link>
    </nav>
    </>
  )
}
