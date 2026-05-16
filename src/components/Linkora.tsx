import NavigationTabs from "./NavigationTabs"
import Header from "./Header";
import { Outlet, Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { DndContext, closestCenter } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import type { SocialNetwork, User } from "../types";
import { useEffect, useState } from "react";
import LinkLinkora from "./LinkLinkora";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/linkoraAPI";

type LinkoraProps = {
    data: User
}

export default function Linkora({ data }: LinkoraProps) {
    const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled))


    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateProfile,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success("Orden actualizado")
        }
    })

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e

        if (over && over.id) {
            const prevIndex = enabledLinks.findIndex(link => link.id === active.id);
            const newIndex = enabledLinks.findIndex(link => link.id === over.id);
            const order = arrayMove(enabledLinks, prevIndex, newIndex)

            setEnabledLinks(order)

            // 
            const disabledLinks: SocialNetwork[] = JSON.parse(data.links).filter((item: SocialNetwork) => !item.enabled)

            const links = order.concat(disabledLinks)

            queryClient.setQueryData(['user'], (prevData: User) => {
                if (!prevData) return prevData;
                const updatedData = {
                    ...prevData,
                    links: JSON.stringify(links)
                }
                mutate(updatedData)
                return updatedData
            })
        }
    }

    useEffect(() => {
        setEnabledLinks(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled))
    }, [data])

    return (
        <>
            <Header />
            <div className="bg-[#0a0a0a] min-h-screen py-10">
                <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-0">

                    <NavigationTabs />
                    <div className="flex justify-end">
                        <Link
                            className="bg-cyan-400 hover:bg-cyan-500 text-black font-semibold text-sm py-2 px-4 rounded-lg transition-colors"
                            to={`/${data.handle}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >Mi Linkora: {data.handle}</Link>
                    </div>

                    <div className="flex flex-col md:flex-row gap-10 mt-4">
                        <div className="flex-1 ">
                            <Outlet />
                        </div>

                        {/* Preview section */}
                        <div className="w-full md:w-96 px-4 pt-15 pb-10 bg-zinc-900/40 border border-zinc-800 rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(34,211,238,0.15)] relative overflow-hidden backdrop-blur-xl flex flex-col mx-auto text-center text-white ring-1 ring-white/10">
                            {/* Phone notch mockup */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#0a0a0a] rounded-b-2xl border-b border-x border-zinc-800 z-10"></div>
                            
                            <p className="text-3xl font-black mt-4">
                                {data.handle}
                            </p>

                            {data.image && <img className="w-full self-center max-w-[150px] rounded-full aspect-square object-cover border-4 border-zinc-800 mt-4 shadow-xl" src={data.image} alt="Imagen de Perfil" />}

                            <p className="text-lg font-medium text-zinc-400 mt-4 px-4">{data.description}</p>

                            <DndContext
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >

                                <div className="my-5">
                                    <SortableContext
                                        strategy={verticalListSortingStrategy}
                                        items={enabledLinks}
                                    >
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
                                    </SortableContext>
                                </div>
                            </ DndContext >

                        </div>
                    </div>
                </main>
            </div>
            <Toaster position="top-right" theme="dark" />
        </>
    )
}
