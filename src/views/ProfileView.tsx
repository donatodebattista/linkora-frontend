import { updateImage, updateProfile } from '../api/linkoraAPI';
import type { ProfileForm, User } from '../types';
import ErrorMessage from '../components/ErrorMessage';
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useQueryClient, useMutation } from '@tanstack/react-query'

export default function ProfileView() {
    
    //Recupera datos del usuario que ya estan en cache
    const queryClient = useQueryClient()
    const data : User = queryClient.getQueryData(['user'])!


    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)

            //Eliminar el cache de usuario para que se vuelva a cargar
            queryClient.invalidateQueries({queryKey: ['user']})
        }
    })

    const updateImageMutation = useMutation({
        mutationFn: updateImage,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            //QUERY OPTIMISTA => Actualiza el cache de usuario con la nueva imagen
            queryClient.setQueryData(['user'], (prevData: User) => {
                if (!prevData) return prevData;
                return {
                    ...prevData,
                    image: data
                }
            })

        }
    })

    const handleImageChange = ( e : React.ChangeEvent<HTMLInputElement> ) => {
        if(e.target.files) {
            updateImageMutation.mutate(e.target.files[0])
        }
    }

    const handleProfileUpdate = (formData : ProfileForm) =>  {
        updateProfileMutation.mutate(formData)
    }


    const {register, handleSubmit, formState: {errors}} = useForm({ defaultValues: {
        handle: data.handle,
        description: data.description
    }});


    return (
        <form 
            className="bg-white p-10 rounded-lg space-y-5"
            onSubmit={handleSubmit(handleProfileUpdate)}
        >
            <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="handle">Handle:</label>
                <input
                    type="text"
                    className="border-none bg-slate-200 rounded-lg p-2"
                    placeholder="handle o Nombre de Usuario"
                    {...register("handle", { 
                        required: 'El Handle es obligatorio',
                    })}/>

                    {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="description">Descripción:</label>
                <textarea
                    className="border-none bg-slate-200 rounded-lg p-2"
                    {...register("description")}/>
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="image">Imagen:</label>
                <input
                    id="image"
                    type="file"
                    name="image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                    <label
                        htmlFor="image"
                        className="border-none bg-slate-200 hover:bg-slate-300 hover:cursor-pointer rounded-lg p-2 text-center cursor-pointer"
                        style={{ display: 'inline-block' }}
                    >
                        Subir archivo
                    </label>
            </div>

            <input
                type="submit"
                className="bg-cyan-300 hover:bg-cyan-400 p-2 text-lg w-full uppercase text-black rounded-md font-semibold cursor-pointer"
                value='Guardar Cambios'
            />
        </form>
    )
}