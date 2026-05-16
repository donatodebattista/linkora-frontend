import { updateImage, updateProfile } from '../api/linkoraAPI';
import type { ProfileForm, User } from '../types';
import ErrorMessage from '../components/ErrorMessage';
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useQueryClient, useMutation } from '@tanstack/react-query'

export default function ProfileView() {

    const queryClient = useQueryClient()
    const data: User = queryClient.getQueryData(['user'])!


    const updateProfileMutation = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)

            //Eliminar el cache de usuario para que se vuelva a cargar
            queryClient.invalidateQueries({ queryKey: ['user'] })
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

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            updateImageMutation.mutate(e.target.files[0])
        }
    }

    const handleProfileUpdate = (formData : ProfileForm) =>  {
        const user : User = queryClient.getQueryData(['user'])!
        const updatedUser = {
            ...user,
            description: formData.description,
            handle: formData.handle
        }
        updateProfileMutation.mutate(updatedUser)
    }


    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            handle: data.handle,
            description: data.description
        }
    });


    return (
        <form
            className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl space-y-6 shadow-xl max-w-2xl mx-auto"
            onSubmit={handleSubmit(handleProfileUpdate)}
        >
            <legend className="text-2xl text-white font-bold text-center mb-6">Editar Información</legend>
            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="handle" className="text-zinc-300 font-medium text-sm">Handle:</label>
                <input
                    type="text"
                    className="bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                    placeholder="handle o Nombre de Usuario"
                    {...register("handle", {
                        required: 'El Handle es obligatorio',
                    })} />

                {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="description" className="text-zinc-300 font-medium text-sm">Descripción:</label>
                <textarea
                    className="bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all min-h-[120px] resize-y"
                    {...register("description")} />
            </div>

            <div className="grid grid-cols-1 gap-2">
                <label htmlFor="image" className="text-zinc-300 font-medium text-sm">Imagen de Perfil:</label>
                <input
                    className="bg-zinc-800 text-white border border-zinc-700 rounded-lg p-3 cursor-pointer file:bg-zinc-700 file:border-none file:text-white file:rounded-md file:px-4 file:py-1 file:mr-4 file:font-medium hover:file:bg-zinc-600 file:transition-colors file:cursor-pointer"
                    id="image"
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                />

            </div>

            <input
                type="submit"
                className="bg-cyan-400 hover:bg-cyan-500 text-black p-3 font-semibold text-sm rounded-lg cursor-pointer w-full mt-4 transition-colors shadow-lg"
                value='Guardar Cambios'
            />
        </form>
    )
}