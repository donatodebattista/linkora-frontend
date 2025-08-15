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
    <form onSubmit={handleSubmit(SearchHandle)} className="space-y-5">
      <div className="relative flex items-center  bg-white  px-2">
        <label htmlFor="handle">linkora.com/</label>
        <input
          type="text"
          id="handle"
          className="border-none bg-transparent p-2 focus:ring-0 flex-1"
          placeholder="elonmusk, zuck, jeffbezos"
          {...register("handle", {
            required: "Un Nombre de Usuario es obligatorio",
          })}
        />
      </div>
      {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}

      <div className="">
        {mutation.isPending && <p className='text-center text-black font-bold'>Cargando...</p>}
        {mutation.error && <p className='text-center text-red-600 font-bold'>{mutation.error.message}</p>}
        {mutation.data && <p className='text-center text-black font-bold'>{mutation.data}, ir a <Link className='text-cyan-500' to={'/auth/register'} state={{handle: slugify(handle)}}>Registro</Link></p>}
      </div>

      <input
        type="submit"
        className="bg-cyan-400 hover:bg-cyan-500 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value="Obtener mi Linkora"
      />
    </form>
  );
}
