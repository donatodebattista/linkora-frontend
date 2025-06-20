import { Link } from "react-router-dom";

export default function LoginView() {
  return (
    <>
      <form
        onSubmit={() => {}}
        className="rounded-md space-y-6 p10 md:p-8 max-w-lg mx-auto w-full"
      >

        <div className="grid grid-cols-1">
          <label htmlFor="email" className="text-lg text-zinc-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="bg-white border-none p-3 rounded-md placeholder-slate-400 w-full h-12 outline-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div className="grid grid-cols-1">
          <label htmlFor="password" className="text-lg text-zinc-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="bg-white border-none p-3 rounded-md placeholder-slate-400 w-full h-12 outline-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <input
          type="submit"
          className="bg-cyan-500 p-3 text-s w-full text-black rounded-md font-medium cursor-pointer hover:bg-cyan-700 transition-colors duration-200"
          value="Crear Cuenta"
        />
      </form>

      <nav>
        <span className="text-white mr-1">¿Aún no tienes cuenta?</span>
        <Link to="/auth/register" className="text-blue-500 hover:underline">
          Regístrate
        </Link>
      </nav>
    </>
  );
}
