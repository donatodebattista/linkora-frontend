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
    <div className="flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-4 mb-4 bg-zinc-900 border border-zinc-800 p-4 shadow-lg rounded-xl w-full transition-shadow hover:shadow-xl">
        <div
            className="h-10 w-10 md:h-12 md:w-12 bg-center bg-contain bg-no-repeat flex-shrink-0"
            style={{ backgroundImage: `url(/social/icon_${item.name}.svg)` }}
        />
        <input 
            type="text" 
            className="flex-1 min-w-0 bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-700 rounded-lg p-2 md:p-3 text-sm md:text-base focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
            placeholder={`Ingresa tu link de ${item.name}`}
            value={item.url}
            onChange={onURLChange}
            name={item.name}        
        />
        <div className="flex-shrink-0 mt-2 md:mt-0">
          <Switch
              checked={item.enabled}
              onChange={() => onSwitchChange(item.name)}
              className={classNames(
                  item.enabled ? 'bg-cyan-500' : 'bg-zinc-700',
                  'relative inline-flex h-6 w-11 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-zinc-900'
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
    </div>
  )
}