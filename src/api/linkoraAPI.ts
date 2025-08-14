import { isAxiosError } from "axios";
import api from "../config/axios";
import type { User } from "../types";

//OBTENER USUARIOS
export async function getUser() {
  try {
    const { data } = await api.get<User>("/user");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

//ACTUALIZA PERFIL
export async function updateProfile(formData: User) {
  try {
    const { data } = await api.patch<string>("/user", formData)
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

//ACTUALIZA IMAGEN
export async function updateImage(file: File) {
  const form = new FormData()
  form.append('file', file)
  
  try {
    const { data : {image} } : {data: {image: string}} = await api.post("/user/image", form)
    return image
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}

export async function getUserByHandle(handle: string) {
  try {    
    const { data } = await api.get<User>(`/${handle}`)
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}


export async function searchByHandle(handle: string) {
  try {    
    const { data } = await api.post('/search/', {handle})
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error)
    }
  }
}
