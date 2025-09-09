import type { SocialNetwork, UserHandle } from "../types"
import {Link} from 'react-router-dom'

type HandleDataProps = {
    data: UserHandle
}

export default function HandleData({ data } : HandleDataProps) {
    const enabledLinks : SocialNetwork[] = JSON.parse(data.links).filter((link : SocialNetwork) => link.enabled === true)

    return (
        <div className="sm:pt-20 relative min-h-screen">

            {/* Fondo blur solo para sm y arriba */}
            {data.image && (
                <div
                    className="hidden sm:block absolute inset-0 w-full h-full -z-10"
                    style={{
                        backgroundImage: `url(${data.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(20px) brightness(0.6)',
                        opacity: 0.9,
                    }}
                />
            )}

        <div 
            className="
                        w-full sm:w-fit sm:border border-[#101010] mx-auto h-screen pb-10 text-white text-center space-y-4 flex flex-col items-center bg-[#000000]
                        sm:mb-10 sm:rounded-lg 
                        sm:py-15  
                        sm:px-10 md:px-14 lg:px-30
                    ">
           
            {data.image && (
                <div className="relative w-full sm:max-w-[320px] sm:rounded-sm overflow-hidden">
                    <img src={data.image} alt={data.name} className="w-full block" />
                    <div className="absolute bottom-0 left-0 w-full h-60 bg-gradient-to-t from-black/100 to-transparent flex items-end justify-center">
                        <span className="text-4xl sm:text-5xl font-black 0 text-white mb-2">{data.handle}</span>
                    </div>
                </div>
            )}

            <p className="font-bold text-sm sm:text-md lg:text-lg">{data.description}</p>

            <div className="flex flex-col gap-5 my-auto items-center justify-center">
                {enabledLinks.length ?  
                    enabledLinks.map( link => (
                        <a href={link.url}
                            key={link.name}
                            className="w-full bg-[#101010] hover:bg-[#202020] transition-colors px-10 py-2 flex items-center rounded-md border border-[#232323]"
                            target="_blank"
                            rel="noopener noreferrer"   
                        >
                            <img className="w-9 sm:w-11 mr-2" src={`/social/icon_${link.name}.svg`} alt={`logo${link.name}`} />
                            <p className="text-white">Visita mi <span className="font-bold capitalize">{link.name}</span></p>
                        </a>
                    ))
                    : <p>No hay links en esta página</p>
                }   
            </div>
        </div>

        <footer className="py-8 sm:py-12 bg-[#121212] sm:mt-20 flex flex-row items-center justify-center gap-6">
            <div>
                <Link to={'/'}><img className="w-26 sm:w-32" src="/logo.svg" alt="" /></Link>
            </div>           
            <div className="text-xs text-white font-semibold text-center">
                <p>Linkora © 2025</p>
                <p>Made by <a className="rounded px-1 text-cyan-400" href="https://donatodebattista.vercel.app/">donidevツ</a></p>
            </div>

        </footer>
        </div>
    )
}