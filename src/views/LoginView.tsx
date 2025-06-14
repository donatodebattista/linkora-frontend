import { Link } from "react-router-dom"

export default function LoginView() {
  return (
    <>
        <div className="text-3xl">LoginView</div>

        <nav>
            <Link to="/auth/register" className="text-blue-500 hover:underline">
                ¿No tienes cuenta? Regístrate
            </Link>
        </nav>
    </>
  )
}
