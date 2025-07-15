import NavigationTabs from "./NavigationTabs"
import { Outlet, Link } from "react-router-dom";
import { Toaster } from "sonner";
import type { User } from "../types";

type LinkoraProps = {
    data : User
}

export default function Linkora({ data }: LinkoraProps) {

    return (
        <>
            <header className="bg-black py-5">
                <div className="mx-auto max-w-5xl flex flex-row md:flex-row items-center md:justify-between">
                    <div className="w-full p-5 lg:p-0 md:w-1/3">
                        <img src="/logo.svg" className="w-40 block" />
                    </div>
                    <div className="md:w-1/3 md:flex md:justify-end">
                        <button
                            className=" bg-cyan-300 p-2 text-slate-800 uppercase font-black text-sm rounded-xs cursor-pointer"
                            onClick={() => { }}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </header>
            <div className="bg-gray-200  min-h-screen py-10">
                <main className="mx-auto max-w-5xl p-10 md:p-0">

                    <NavigationTabs />
                    <div className="flex justify-end">
                        <Link
                            className="font-semibold text-right text-black text-lg bg-cyan-300 px-4 py-2 rounded-lg hover:bg-cyan-400"
                            to={''}
                            target="_blank"
                            rel="noreferrer noopener"
                        >Visitar Mi Perfil: {data.handle}</Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 mt-10">
                        <div className="flex-1 ">
                            <Outlet />
                        </div>
                        <div className="w-full md:w-96 bg-[#111111] rounded-lg px-5 py-10 space-y-6 flex flex-col justify-center items-center text-center text-white">
                            <p className="text-3xl font-bold">{data.handle}</p>
                            {data.image && <img className="w-full max-w-[300px] rounded-md" src={data.image} alt="Imagen de Perfil" />}
                            <p className="text-lg">{data.description}</p>
                        </div>
                    </div>
                </main>
            </div>
            <Toaster position="top-right" />
        </>
    )
}
