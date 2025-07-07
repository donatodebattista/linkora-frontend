import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import NavigationTabs from '../components/NavigationTabs'
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/linkoraAPI";



export default function AppLayout() {

    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        refetchOnWindowFocus: false,
        retry: 1,
    })

    console.log('DATA DE USUARIO: ' , data);
    console.log('ERROR USE QUERY: ' , error?.message);
    console.log('LOADING USE QUERY: ' , isLoading);
    console.log('ES ERROR USE QUERY: ' , isError);
    
    return (
        <>
            <header className="bg-black py-5">
                <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
                    <div className="w-full p-5 lg:p-0 md:w-1/3">
                        <img src="/logo.svg" className="w-40 block" />
                    </div>
                    <div className="md:w-1/3 md:flex md:justify-end">
                        <button
                            className=" bg-cyan-400 p-2 text-slate-800 uppercase font-black text-xs rounded-xs cursor-pointer"
                            onClick={() => {}}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </header>
            <div className="bg-gray-100  min-h-screen py-10">
                <main className="mx-auto max-w-5xl p-10 md:p-0">

                    <NavigationTabs/>
                    <div className="flex justify-end">
                        <Link 
                            className="font-bold text-right text-slate-800 text-2xl"
                            to={''}
                            target="_blank"
                            rel="noreferrer noopener"
                        >Visitar Mi Perfil</Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        <div className="flex-1 ">
                            <Outlet />
                        </div>
                        <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">

                        </div>
                    </div>
                </main>
            </div>
            <Toaster position="top-right" />
        </>
    )
}