import type { SocialNetwork } from '../types'


type LinkoraLinkProps = {
  item: SocialNetwork;
}

export default function LinkLinkora( {item} : LinkoraLinkProps) {
  return (

    <li className='bg-white text-black px-5 py-2 rounded-lg flex items-center mb-2'>
        <div className="h-10 w-10 bg-cover"
            style={{ backgroundImage: `url(/social/icon_${item.name}.svg)` }}>
        </div>
        <p className='ml-1 capitalize'>Visita mi <span className='font-bold'>{item.name}</span></p>
    </li>

  )
}