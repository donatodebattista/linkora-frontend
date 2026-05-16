import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import type { RegisterCredentials } from "../types";
import ErrorMessage from "../components/ErrorMessage";
import api from "../config/axios";

export default function RegisterView() {

  const location = useLocation()
  const navigate = useNavigate()

  const initialValues: RegisterCredentials = {
    name: "",
    email: "",
    handle: location?.state?.handle || "",
    password: "",
    passwordConfirmation: "",
  };

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const password = watch("password");

  const handleRegister = async (formData: RegisterCredentials) => {
    try {
      const { data } = await api.post("/auth/register", formData);
      toast.success(data);
      reset();
      navigate('/auth/login')
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    }
  };


  return (
    <>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="mt-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl space-y-5 p-8 md:p-10 max-w-md w-full"
      >
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">Crear Cuenta</h1>
          <p className="text-gray-500 text-sm">Registrate y empezá a compartir tus redes</p>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="name" className="text-sm font-medium text-gray-300">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu nombre"
            className="bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 w-full h-11 px-4 text-sm outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-200"
            {...register("name", { required: "El nombre es obligatorio" })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-gray-300">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="tu@email.com"
            className="bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 w-full h-11 px-4 text-sm outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-200"
            {...register("email", {
              required: "El E-mail es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="handle" className="text-sm font-medium text-gray-300">
            Nombre de Usuario
          </label>
          <input
            id="handle"
            type="text"
            placeholder="tu_nombre_de_usuario"
            className="bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 w-full h-11 px-4 text-sm outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-200"
            {...register("handle", {
              required: "El nombre de Usuario es obligatorio",
            })}
          />
          {errors.handle && (
            <ErrorMessage>{errors.handle.message}</ErrorMessage>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="text-sm font-medium text-gray-300">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Mínimo 8 caracteres"
            className="bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 w-full h-11 px-4 text-sm outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-200"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="passwordConfirmation"
            className="text-sm font-medium text-gray-300"
          >
            Repetir contraseña
          </label>
          <input
            id="passwordConfirmation"
            type="password"
            placeholder="Repetir contraseña"
            className="bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 w-full h-11 px-4 text-sm outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-200"
            {...register("passwordConfirmation", {
              required: "La confirmación de contraseña es obligatoria",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
          />
          {errors.passwordConfirmation && (
            <ErrorMessage>{errors.passwordConfirmation.message}</ErrorMessage>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-gray-900 font-semibold py-3 rounded-xl text-sm transition-all duration-300 cursor-pointer shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/30"
        >
          Crear Cuenta
        </button>

        <p className="text-center text-sm text-gray-500">
          ¿Ya tienes cuenta?{' '}
          <Link to="/auth/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
            Inicia sesión
          </Link>
        </p>
      </form>
    </>
  );
}
