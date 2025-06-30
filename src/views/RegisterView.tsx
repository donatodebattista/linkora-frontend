import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import type { RegisterCredentials } from "../types";
import ErrorMessage from "../components/ErrorMessage";
import api from "../config/axios";

export default function RegisterView() {
  const initialValues: RegisterCredentials = {
    name: "",
    email: "",
    handle: "",
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
      console.log(data);
      toast.success(data);
      reset();
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
        className="rounded-md space-y-5 p-6 md:p-8 max-w-lg w-full shadow-lg bg-white my-6"
      >
        <h1 className="text-3xl font-bold text-center">Registrate</h1>
        <div className="grid grid-cols-1">
          <label htmlFor="name" className="text-m text-zinc-500">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className="bg-whitep-3 rounded-md border border-stone-300 placeholder-slate-400 w-full h-10 p-4 outline-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
            {...register("name", { required: "El nombre es obligatorio" })} //react-hook-form
          />
          {/*Children prop*/}
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>

        <div className="grid grid-cols-1">
          <label htmlFor="email" className="text-m text-zinc-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="bg-whitep-3 rounded-md border border-stone-300 placeholder-slate-400 w-full h-10 p-4 outline-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
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

        <div className="grid grid-cols-1">
          <label htmlFor="handle" className="text-m text-zinc-500">
            Nombre de Usuario
          </label>
          <input
            id="handle"
            type="text"
            placeholder="Nombre de usuario"
            className="bg-whitep-3 rounded-md border border-stone-300 placeholder-slate-400 w-full h-10 p-4 outline-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
            {...register("handle", {
              required: "El nombre de Usuario es obligatorio",
            })}
          />
          {errors.handle && (
            <ErrorMessage>{errors.handle.message}</ErrorMessage>
          )}
        </div>

        <div className="grid grid-cols-1">
          <label htmlFor="password" className="text-m text-zinc-500">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            className="bg-whitep-3 rounded-md border border-stone-300 placeholder-slate-400 w-full h-10 p-4 outline-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
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

        <div className="grid grid-cols-1">
          <label
            htmlFor="passwordConfirmation"
            className="text-m text-zinc-500"
          >
            Repetir contraseña
          </label>
          <input
            id="passwordConfirmation"
            type="password"
            placeholder="Repetir Contraseña"
            className="bg-whitep-3 rounded-md border border-stone-300 placeholder-slate-400 w-full h-10 p-4 outline-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
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

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-s w-full text-black rounded-md font-medium cursor-pointer hover:bg-cyan-600 transition-colors duration-100"
          value="Crear Cuenta"
        />

        <nav className="text-center font-semibold text-sm">
          <span className="text-black mr-1">¿Ya tienes cuenta?</span>
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Inicia sesión
          </Link>
        </nav>
      </form>
    </>
  );
}
