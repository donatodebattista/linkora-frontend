import type { LinkoraLink } from "../types"
import { Switch } from '@headlessui/react'
import { classNames } from "../utils"

type LinkoraInputProps = {
    item: LinkoraLink
    onURLChange: ( e : React.ChangeEvent<HTMLInputElement>) => void
    onSwitchChange: ( socialNetwork: string) => void
}

export default function LinkInput({ item, onURLChange, onSwitchChange }: LinkoraInputProps) {



  return (
    <div className="flex items-center gap-4 mb-4 bg-white p-3 shadow-md rounded-sm">
        <div className="h-12 w-12"
            style={{ backgroundImage: `url(/social/icon_${item.name}.svg)` }}>
        </div>
        <input 
            type="text" 
            className="flex-1 border border-gray-100 rounded-md h-8 p-4"
            placeholder={`Ingresa tu link de ${item.name}`}
            value={item.url}
            onChange={onURLChange}
            name={item.name}        
            />


        <Switch
            checked={item.enabled}
            onChange={() => onSwitchChange(item.name)}
            className={classNames(
                item.enabled ? 'bg-blue-500' : 'bg-gray-200',
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            )}
        >
            <span
                aria-hidden="true"
                className={classNames(
                    item.enabled ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                )}
            />
        </Switch>
    </div>

  )
}
