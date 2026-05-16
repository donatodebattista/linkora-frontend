import type { SocialNetwork } from '../types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'



type LinkoraLinkProps = {
  item: SocialNetwork;
}

export default function LinkLinkora( {item} : LinkoraLinkProps) {
  const { attributes, listeners, setNodeRef, transform} = useSortable({
    id: item.id})

    const style = {
      transform: CSS.Transform.toString(transform)
    }

  return (

    <li 
        className='bg-zinc-800/80 backdrop-blur-sm border border-zinc-700 text-white px-5 py-3 rounded-xl flex items-center mb-3 cursor-pointer shadow-sm hover:bg-zinc-700/80 transition-colors'
        // Drag and Drop 
        style= {style}
        {...attributes}
        {...listeners}
        ref={setNodeRef}
    >

        <div className="h-10 w-10 bg-cover"
            style={{ backgroundImage: `url(/social/icon_${item.name}.svg)` }}>
        </div>
        <p className='ml-1 capitalize'>Visita mi <span className='font-bold'>{item.name}</span></p>
    </li>

  )
}