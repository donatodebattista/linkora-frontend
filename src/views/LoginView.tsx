import { Link } from "react-router-dom";
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

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

  const handleLogin = async (formData: LoginCredentials) => {
    try {
      const { data } = await api.post("/auth/login", formData);
      localStorage.setItem('AUTH_TOKEN', data)
      window.location.href = '/admin'

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
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl space-y-6 p-8 md:p-10 max-w-md w-full"
      >
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">Iniciar Sesión</h1>
          <p className="text-gray-500 text-sm">Accedé a tu panel de Linkora</p>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-gray-300">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="tu@email.com"
            className="bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 w-full h-12 px-4 text-sm outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-200"

            {...register("email", {
              required: 'El E-mail es obligatorio',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />

          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="text-sm font-medium text-gray-300">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 w-full h-12 px-4 text-sm outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-200"

            {...register("password", { required: 'La contraseña es obligatoria', })}
          />

          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-gray-900 font-semibold py-3 rounded-xl text-sm transition-all duration-300 cursor-pointer shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/30"
        >
          Iniciar Sesión
        </button>

        <p className="text-center text-sm text-gray-500">
          ¿Aún no tienes cuenta?{' '}
          <Link to="/auth/register" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
            Regístrate
          </Link>
        </p>
      </form>
    </>
  );
}
