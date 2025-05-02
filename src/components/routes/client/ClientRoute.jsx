import ContentDashboard from '~/components/contentDashboard/ContentDashboard'
import LayoutDefault from '~/components/layout/client/LayoutDefault'
import NeedHelpPoints from '~/components/needHelpPoint/NeedHelpPoints'
import Maps from '~/components/maps/Maps'


import Error404 from '~/pages/error/Error404'
import AddRescueHub from '~/components/addRescueHub/AddRescueHub'
import AddNeedHelp from '~/components/addNeedHelp/AddNeedHelp'

export const ClientRoute = [
  {
    path:'/',
    element: <LayoutDefault/>,
    children : [
      {
        index: true, // path mặc định của '/'
        element: <ContentDashboard/> // Trang chính nếu có, nếu không thì xoá dòng này
      },
      {
        path: 'needhelppoint',
        element: <NeedHelpPoints/>
      },
      {
        path: 'maps',
        element: <Maps/>
      },
      {
        path: 'addrescuehub',
        element: <AddRescueHub />
      },
      {
        path: 'addneedhelp',
        element: <AddNeedHelp />
      },
    ]
  },
  {
    path:'*',
    element:<Error404/>
  }
]