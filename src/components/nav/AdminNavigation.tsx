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
            className="cursor-pointer bg-cyan-400 hover:bg-cyan-500 text-xs md:text-sm text-black font-semibold p-1.5 md:p-2 rounded-xs transition-colors min-w-0 text-center flex-shrink"
            onClick={logout}
        >
            {text}
        </button>
  )
}
