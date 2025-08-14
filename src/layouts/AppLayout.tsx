import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/linkoraAPI";
import Linkora from "../components/Linkora";
import Spinner from "../components/Spinner";


export default function AppLayout() {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        refetchOnWindowFocus: false,
        retry: 2,
    })

    //Restringir rutas de administrador
    if (isLoading) return <div className="h-screen flex items-center justify-center bg-[#101010]"><Spinner /></div>
    if(isError) return <Navigate to="/auth/login" />
    if (data) return <Linkora data={data}/>

}