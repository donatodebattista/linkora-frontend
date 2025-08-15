import { useEffect, useState } from "react"
import { social } from "../data/social"
import LinkInput from "../components/LinkInput"
import { isValidUrl } from "../utils"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateProfile } from "../api/linkoraAPI"
import type { User, SocialNetwork } from "../types"

export default function LinkTreeView() {

  const [LinkoraLinks, setLinkoraLinks] = useState(social)

  const queryClient = useQueryClient()
  const user : User = queryClient.getQueryData(["user"])!
  

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: ( error ) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success("Actualizado correctamente")
    }
  })

  useEffect(() => {
    const updatedData = LinkoraLinks.map( item => {
      const userLink = JSON.parse(user.links).find((link : SocialNetwork) => link.name === item.name) 
      if(userLink) {
        return {...item, url: userLink.url, enabled: userLink.enabled}
      }
      return item
    })
    setLinkoraLinks(updatedData)
  }, [])



  const handleURLChange = ( e : React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = LinkoraLinks.map(link => link.name === e.target.name ? {...link, url: e.target.value} : link)
    setLinkoraLinks(updatedLinks)
  }


  const links : SocialNetwork[] = JSON.parse(user.links)

  const handleSwitchChange = (socialNetwork : string) => {
    const updatedLinks = LinkoraLinks.map(link => {
      if ( link.name === socialNetwork ) {
        if( isValidUrl(link.url)) {
          return {...link, enabled: !link.enabled}
        } else {
          toast.error("URL no válida")
        }
      }
      return link
    })
    setLinkoraLinks(updatedLinks)

    let updatedItems : SocialNetwork[] = []
    const selectedSocialNetwork = updatedLinks.find(link => link.name === socialNetwork)

    if(selectedSocialNetwork?.enabled) {
      const id = links.filter(link => link.id).length + 1
      if(links.some(link => link.name === socialNetwork)){
        updatedItems = links.map(link => {
          if(link.name === socialNetwork) {
            return {
              ...link,
              enabled: true,
              id: id
            }
          } else {
            return link
          }
        })

      } else {
        const newItem = {
          ...selectedSocialNetwork,
          id: id
        }
        updatedItems = [...links, newItem]
      }



    } else {
      const indexToUpdate = links.findIndex(link => link.name === socialNetwork)
      
      updatedItems = links.map(link => {
        if (link.name === socialNetwork){
          return{
            ...link,
            id: 0,
            enabled: false
          }

        } else if(link.id > indexToUpdate && (indexToUpdate !== 0 && link.id === 1)){
          return {
            ...link,
            id: link.id - 1
          }

        } else {
          return link
        } 
      })
    }
    
    console.log(updatedItems)

    queryClient.setQueryData(["user"], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedItems)
      }
    })
  }
  
  return (
    <div>
      <div>{LinkoraLinks.map(item => {
        return(
          <LinkInput 
            key={item.name} 
            item={item}
            onURLChange={handleURLChange}
            onSwitchChange={handleSwitchChange}
          />
        )
      })}

      <button className="bg-cyan-400 hover:bg-cyan-500 text-slate-800 p-3 font-semibold text-sm rounded-sm cursor-pointer w-full" 
              onClick={() => mutate(queryClient.getQueryData(["user"])!)}>Actualizar
      </button>
      </div>
    </div>
  )
}
