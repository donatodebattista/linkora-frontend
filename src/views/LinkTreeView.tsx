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
  const user: User = queryClient.getQueryData(["user"])!


  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success("Actualizado correctamente")
    }
  })

  useEffect(() => {
    const updatedData = LinkoraLinks.map(item => {
      const userLink = JSON.parse(user.links).find((link: SocialNetwork) => link.name === item.name)
      if (userLink) {
        return { ...item, url: userLink.url, enabled: userLink.enabled }
      }
      return item
    })
    setLinkoraLinks(updatedData)
  }, [])



  const links: SocialNetwork[] = JSON.parse(user.links)

  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = LinkoraLinks.map(link => link.name === e.target.name ? { ...link, url: e.target.value } : link)
    setLinkoraLinks(updatedLinks)

    const updatedItems = links.map(link => {
      if (link.name === e.target.name) {
        return {
          ...link,
          url: e.target.value
        }
      }
      return link
    })

    queryClient.setQueryData(["user"], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedItems)
      }
    })
  }

  const handleSwitchChange = (socialNetwork: string) => {
    let hasError = false;
    const updatedLinks = LinkoraLinks.map(link => {
      if (link.name === socialNetwork) {
        if (!link.enabled) {
          // Intentando habilitar
          if (isValidUrl(link.url)) {
            return { ...link, enabled: true }
          } else {
            toast.error("URL no válida")
            hasError = true;
            return link
          }
        } else {
          // Intentando deshabilitar
          return { ...link, enabled: false }
        }
      }
      return link
    })

    if (hasError) return;

    setLinkoraLinks(updatedLinks)

    const selectedSocialNetwork = updatedLinks.find(link => link.name === socialNetwork)
    let updatedItems: SocialNetwork[] = []

    if (selectedSocialNetwork?.enabled) {
      const id = socialNetwork // use socialNetwork name as ID for drag and drop
      if (links.some(link => link.name === socialNetwork)) {
        updatedItems = links.map(link => {
          if (link.name === socialNetwork) {
            return {
              ...link,
              url: selectedSocialNetwork.url,
              enabled: true,
              id: id as unknown as number // Type casting to satisfy existing interface
            }
          }
          return link
        })
      } else {
        const newItem = {
          ...selectedSocialNetwork,
          id: id as unknown as number
        }
        updatedItems = [...links, newItem]
      }
    } else {
      updatedItems = links.map(link => {
        if (link.name === socialNetwork) {
          return {
            ...link,
            id: 0,
            enabled: false
          }
        }
        return link
      })
    }

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
        return (
          <LinkInput
            key={item.name}
            item={item}
            onURLChange={handleURLChange}
            onSwitchChange={handleSwitchChange}
          />
        )
      })}

        <button className="bg-cyan-400 hover:bg-cyan-500 text-black p-3 font-semibold text-sm rounded-lg cursor-pointer w-full mt-4 transition-colors shadow-lg"
          onClick={() => mutate(queryClient.getQueryData(["user"])!)}>Actualizar Cambios
        </button>
      </div>
    </div>
  )
}
