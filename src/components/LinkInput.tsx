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
    <div className="flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-4 mb-4 bg-white p-2 md:p-3 shadow-md rounded-sm w-full">
        <div
            className="h-10 w-10 md:h-12 md:w-12 bg-center bg-contain bg-no-repeat flex-shrink-0"
            style={{ backgroundImage: `url(/social/icon_${item.name}.svg)` }}
        />
        <input 
            type="text" 
            className="flex-1 min-w-0 border border-gray-100 rounded-md h-8 p-2 md:p-4 text-xs md:text-base"
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
                  item.enabled ? 'bg-blue-500' : 'bg-gray-200',
                  'relative inline-flex h-6 w-11 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
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