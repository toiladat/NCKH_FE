import LayoutDefault from '~/components/layout/admin/LayoutDefault'
import Error404 from '~/pages/error/Error404'

export const AdmintRoute = [
  {
    path:'/admin',
    element: <LayoutDefault/>,
    children : [
      {
        // path:'/',
        // element:null
      }
    ]
  },
  {
    path:'*',
    element:<Error404/>
  }
]