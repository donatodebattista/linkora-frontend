import NavigationTabs from "./NavigationTabs"
import { Outlet, Link } from "react-router-dom";
import { Toaster } from "sonner";
import type { LinkoraLink, SocialNetwork, User } from "../types";
import { useEffect, useState } from "react";
import LinkLinkora from "./LinkLinkora";

type LinkoraProps = {
    data: User
}

export default function Linkora({ data }: LinkoraProps) {
    const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled))


    useEffect(() => {
        setEnabledLinks(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled))
    }, [data])

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
            <div className="bg-gray-100  min-h-screen py-10">
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

                        {/* Preview section */}
                        <div className="w-full md:w-96 px-4 pt-15 bg-[#000000] rounded-lg space-y-6 flex flex-col mx-auto text-center text-white">
                            <p className="text-3xl font-bold">
                                {data.handle}
                            </p>

                            {data.image && <img className="w-full self-center max-w-[300px] rounded-md" src={data.image} alt="Imagen de Perfil" />}

                            <p className="text-lg font-semibold text-[#bcbcbc]">{data.description}</p>

                            <div className="my-5">
                                {
                                    enabledLinks.map((link: SocialNetwork) => {
                                        return (
                                            <LinkLinkora
                                                key={link.name}
                                                item={link}
                                            />
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <Toaster position="top-right" />
        </>
    )
}
