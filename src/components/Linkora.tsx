import NavigationTabs from "./NavigationTabs"
import Header from "./Header";
import { Outlet, Link } from "react-router-dom";
import { Toaster } from "sonner";
import { DndContext, closestCenter } from '@dnd-kit/core'
import type {DragEndEvent} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import type {  SocialNetwork, User } from "../types";
import { useEffect, useState } from "react";
import LinkLinkora from "./LinkLinkora";
import { useQueryClient } from "@tanstack/react-query";

type LinkoraProps = {
    data: User
}

export default function Linkora({ data }: LinkoraProps) {
    const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled))


    const queryClient = useQueryClient()
    const handleDragEnd = (e: DragEndEvent) => {
        const {active, over} = e

        if (over && over.id) {
            const prevIndex = enabledLinks.findIndex(link => link.id === active.id);
            const newIndex = enabledLinks.findIndex(link => link.id === over.id);
            const order = arrayMove(enabledLinks, prevIndex, newIndex)
            
            setEnabledLinks(order)

            // 
            const disabledLinks : SocialNetwork[] = JSON.parse(data.links).filter((item: SocialNetwork) => !item.enabled)

            const links = order.concat(disabledLinks) 

            queryClient.setQueryData(['user'], (prevData: User) => {
                if (!prevData) return prevData;
                return {
                    ...prevData,
                    links: JSON.stringify(links)    
                }
            })
        }
    }

    useEffect(() => {
        setEnabledLinks(JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled))
    }, [data])

    return (
        <>
            <Header/>
            <div className="bg-gray-100  min-h-screen py-10">
                <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-0">

                    <NavigationTabs />
                    <div className="flex justify-end">
                        <Link
                            className="bg-cyan-400 hover:bg-cyan-500 text-slate-800 font-semibold text-sm p-1.5 md:p-2 rounded-xs min-w-0 text-center flex-shrink"
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
                        <div className="w-full md:w-96 px-4 pt-15 pb-10 bg-linear-to-b from-sky-400 to-black rounded-md space-y-6 flex flex-col mx-auto text-center text-white">
                            <p className="text-3xl font-bold">
                                {data.handle}
                            </p>

                            {data.image && <img className="w-full self-center max-w-[300px] rounded-md" src={data.image} alt="Imagen de Perfil" />}

                            <p className="text-lg font-semibold text-[#cecece]">{data.description}</p>

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
            <Toaster position="top-right" />
        </>
    )
}
