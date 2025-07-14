import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/linkoraAPI";
import Linkora from "../components/Linkora";



export default function AppLayout() {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        refetchOnWindowFocus: false,
        retry: 1,
    })

    //Restringir rutas de administrador
    if (isLoading) return 'Cargando...'
    if(isError) return <Navigate to="/auth/login" />
    if (data) return <Linkora data={data}/>

}