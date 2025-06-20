import { Link } from "react-router-dom";
import {useForm} from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";

export default function RegisterView() {
  const { register, watch, handleSubmit, formState: {errors} } = useForm();


  console.log('Errores: ', errors);

  const handleRegister = () => {
    console.log("Desde handleRegister");
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="rounded-md space-y-6 p10 p-8 max-w-lg mx-auto w-full bg-white"
      >
        <div className="grid grid-cols-1">
          <label htmlFor="name" className="text-lg text-zinc-500">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className="bg-whitep-3 rounded-md border border-stone-300 placeholder-slate-400 w-full h-12 p-4 outline-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
          
            {...register("name", { required: 'El nombre es obligatorio' })} //react-hook-form
          />
                                            {/*Children prop*/}
          {errors.name && ( <ErrorMessage>{errors.name.message}</ErrorMessage>)}
        </div>
        <div className="grid grid-cols-1">
          <label htmlFor="email" className="text-lg text-zinc-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="bg-whitep-3 rounded-md border border-stone-300 placeholder-slate-400 w-full h-12 p-4 outline-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
          
            {...register("E-mail", { required: 'El E-mail es obligatorio' })}
          />
        </div>
        <div className="grid grid-cols-1">
          <label htmlFor="handle" className="text-lg text-zinc-500">
            Nombre de Usuario
          </label>
          <input
            id="handle"
            type="text"
            placeholder="Nombre de usuario"
            className="bg-whitep-3 rounded-md border border-stone-300 placeholder-slate-400 w-full h-12 p-4 outline-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
          
            {...register("handle", { required: 'El nombre de Usuario es obligatorio' })}
          />
        </div>
        <div className="grid grid-cols-1">
          <label htmlFor="password" className="text-lg text-zinc-500">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            className="bg-whitep-3 rounded-md border border-stone-300 placeholder-slate-400 w-full h-12 p-4 outline-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
          
            {...register("password", { required: 'La contraseña es obligatoria' })}
          />
        </div>

        <div className="grid grid-cols-1">
          <label
            htmlFor="password_confirmation"
            className="text-lg text-zinc-500"
          >
            Repetir contraseña
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repetir Contraseña"
            className="bg-whitep-3 rounded-md border border-stone-300 placeholder-slate-400 w-full h-12 p-4 outline-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
          
            {...register("password_confirmation", { required: 'El nombre es obligatorio' })}
          />
        </div>

        <input
          type="submit"
          className="bg-cyan-500 p-3 text-s w-full text-black rounded-md font-medium cursor-pointer hover:bg-cyan-400 transition-colors duration-100"
          value="Crear Cuenta"
        />

        <nav className="text-center">
          <span className="text-black mr-1">¿Ya tienes cuenta?</span>
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Inicia sesión
          </Link>
        </nav>
      </form>
    </>
  );
}
