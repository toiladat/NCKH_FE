import { useRoutes } from 'react-router-dom'
import { ClientRoute } from './client/ClientRoute'
import { AdminRoute } from './admin/AdminRoute'

const AllRoute = () => {

  const allRoutes = [...ClientRoute, ...AdminRoute] // Gộp 2 mảng route
  const RouteAll = useRoutes(allRoutes)
  return (
    <>
      {RouteAll}
    </>
  )
}
export default AllRoute