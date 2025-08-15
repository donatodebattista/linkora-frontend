import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import type { LoginCredentials } from "../types";
import ErrorMessage from "../components/ErrorMessage";
import api from "../config/axios";

export default function LoginView() {

  const initialValues: LoginCredentials = {
    email: "",
    password: "",
  };

  const {register, handleSubmit, formState: {errors}} = useForm({ defaultValues: initialValues });

  const navigate = useNavigate()

  const handleLogin = async (formData : LoginCredentials) => {
    try {
      const { data } = await api.post("/auth/login", formData);
      localStorage.setItem('AUTH_TOKEN', data)
      navigate('/admin')

    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    }
  }
  

  return (
    <>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="rounded-md space-y-6 p-6 md:p-8 max-w-lg w-full shadow-lg bg-white my-6"
      >
        <h1 className="text-3xl font-bold text-center">Iniciar Sesión</h1>
        <div className="grid grid-cols-1">
          <label htmlFor="email" className="text-lg text-zinc-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="bg-whitep-3 rounded-md border border-stone-300 placeholder-slate-400 w-full h-12 p-4 outline-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
          
            {...register("email", { 
                required: 'El E-mail es obligatorio',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
            },})}
          />

          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <div className="grid grid-cols-1">
          <label htmlFor="password" className="text-lg text-zinc-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="bg-whitep-3 rounded-md border border-stone-300 placeholder-slate-400 w-full h-12 p-4 outline-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
          
            {...register("password", { required: 'La contraseña es obligatoria',})}
          />

          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 hover:bg-cyan-500 p-3 text-s w-full text-black rounded-md font-medium cursor-pointer"
          value="Iniciar Sesión"
        />

        <nav className="text-center font-semibold text-sm">
          <span className="text-black mr-1">¿Aún no tienes cuenta?</span>          
          <Link to="/auth/register" className="text-blue-500 hover:underline">
            Regístrate
          </Link>
        </nav>
      </form>
    </>
  );
}
