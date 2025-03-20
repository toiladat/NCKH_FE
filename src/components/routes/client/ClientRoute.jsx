import LayoutDefault from '~/components/layout/client/LayoutDefault'
import Error404 from '~/pages/error/Error404'

export const ClientRoute = [
  {
    path:'/',
    element: <LayoutDefault/>,
    children : [
      {
        path:'/',
        element:null
      }
    ]
  },
  {
    path:'*',
    element:<Error404/>
  }
]