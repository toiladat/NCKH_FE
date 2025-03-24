import { useRoutes } from 'react-router-dom'
import { ClientRoute } from './client/ClientRoute'
import { AdmintRoute } from './admin/AdminRoute'

const AllRoute = () => {

  const allRoutes = [...ClientRoute, ...AdmintRoute] // Gộp 2 mảng route
  const RouteAll = useRoutes(allRoutes)
  return (
    <>
      {RouteAll}
    </>
  )
}
export default AllRoute