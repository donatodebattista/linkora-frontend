import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export default function AdminNavigation() {
  const [text, setText] = useState('Cerrar Sesión')
  
  const queryClient = useQueryClient()
  const logout = () => {
    setText('Cerrando Sesión...')
    //Eliminar token
      localStorage.removeItem('AUTH_TOKEN')

    //Actualizar caché
    queryClient.invalidateQueries({queryKey: ['user']})
  }
  
  return (
        <button
            className=" bg-cyan-400 hover:bg-cyan-500 p-2 text-black uppercase font-semibold text-sm rounded-xs cursor-pointer"
            onClick={logout}
        >
            {text}
        </button>
  )
}
