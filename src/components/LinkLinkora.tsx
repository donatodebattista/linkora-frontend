import type { SocialNetwork } from '../types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'



type LinkoraLinkProps = {
  item: SocialNetwork;
}

export default function LinkLinkora( {item} : LinkoraLinkProps) {
  const { attributes, listeners, setNodeRef, transform, transition} = useSortable({
    id: item.id})

    const style = {
      transform: CSS.Transform.toString(transform)
    }

  return (

    <li 
        className='bg-white text-black px-5 py-2 rounded-lg flex items-center mb-2 cursor-pointer'
        
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