import { Navigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUserByHandle } from '../api/linkoraAPI'
import Spinner from '../components/Spinner'
import HandleData from '../components/HandleData'

export default function HandleView() {
  const params = useParams()
  const handle = params.handle!

  const { data, isLoading, isError } = useQuery({
        queryKey: ['handle', handle],
        queryFn: () => getUserByHandle(handle),
        refetchOnWindowFocus: false,
        retry: 1,
      })
  
    if (isLoading) return <Spinner/>
    if(isError) return <Navigate to="/404"/>
    if (data) return <HandleData data={data} />

}
