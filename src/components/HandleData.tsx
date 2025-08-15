import type { SocialNetwork, UserHandle } from "../types"

type HandleDataProps = {
    data: UserHandle
}

export default function HandleData({ data } : HandleDataProps) {
    const enabledLinks : SocialNetwork[] = JSON.parse(data.links).filter((link : SocialNetwork) => link.enabled === true)

  return (
    <div className="text-white text-center mt-10 mb-10 space-y-4 flex flex-col items-center bg-[#101010] rounded-lg shadow-2xl/20 shadow-sky-800">
        <p className="text-5xl font-black">{data.handle}</p>
        {data.image && <img src={data.image} alt={data.name} className="max-w-[220px] rounded-sm"></img>}
        <p className="font-bold text-sm">{data.description}</p>
        <div className="flex flex-col gap-3 mt-4">
            {enabledLinks.length ?  
                enabledLinks.map( link => (
                    <a href={link.url}
                        key={link.name}
                        className="bg-white hover:bg-[#cfcfcf] transition-colors px-5 py-1 flex items-center gap-5 rounded-lg"
                        target="_blank"
                        rel="noopener noreferrer"   
                    >
                        <img className="w-12" src={`/social/icon_${link.name}.svg`} alt={`logo${link.name}`} />
                        <p className="text-black ">Visita mi <span className="font-bold capitalize">{link.name}</span></p>
                    </a>
                ))
                

                : <p>No hay links en esta página</p>

            }   
        </div>
    </div>
  )
}