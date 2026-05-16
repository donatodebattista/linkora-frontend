import ErrorMessage from './ErrorMessage'
import { useMutation } from '@tanstack/react-query'
import {useForm} from 'react-hook-form'
import slugify from 'react-slugify'
import { searchByHandle } from '../api/linkoraAPI'
import { Link } from 'react-router-dom'

export default function HomeSearchForm() {

    const {register, handleSubmit, watch, formState: {errors}} = useForm( { defaultValues: {handle: ''} })

    const mutation = useMutation({
      mutationFn: searchByHandle
    })

    const handle = watch('handle')
    
    const SearchHandle = () => {
      const handleSlug = slugify(handle)
      mutation.mutate(handleSlug)
    }
    
  return (
    <form onSubmit={handleSubmit(SearchHandle)} className="space-y-4">
      <div className="relative flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-1 transition-all duration-300 focus-within:border-cyan-400/50 focus-within:bg-white/[0.07]">
        <label htmlFor="handle" className="text-cyan-400 font-medium text-sm whitespace-nowrap">linkora.com/</label>
        <input
          type="text"
          id="handle"
          className="border-none bg-transparent p-3 focus:ring-0 flex-1 text-white placeholder-gray-500 text-sm"
          placeholder="tu_nombre_de_usuario"
          {...register("handle", {
            required: "Un Nombre de Usuario es obligatorio",
          })}
        />
      </div>
      {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}

      <div className="min-h-[2rem] flex items-center justify-center">
        {mutation.isPending && <p className='text-center text-gray-400 font-medium text-sm animate-pulse'>Buscando disponibilidad...</p>}
        {mutation.error && <p className='text-center text-red-400 font-medium text-sm'>{mutation.error.message}</p>}
        {mutation.data && (
          <p className='text-center text-emerald-400 font-medium text-sm'>
            {mutation.data} — ir a{' '}
            <Link className='text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors' to={'/auth/register'} state={{handle: slugify(handle)}}>
              Registro
            </Link>
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-gray-900 font-semibold py-3.5 rounded-xl text-sm transition-all duration-300 cursor-pointer shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/30"
      >
        Obtener mi Linkora
      </button>
    </form>
  );
}
