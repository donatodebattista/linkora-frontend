import { Link } from "react-router-dom"

export default function RegisterView() {
  return (
    <>
        <div className="text-3xl">RegisterView</div>
        <nav>
            <Link to={"/auth/login"} className="text-blue-500 hover:underline">
                ¿Ya tienes cuenta? Inicia sesión
            </Link>
        </nav>
    </>
  )
}
