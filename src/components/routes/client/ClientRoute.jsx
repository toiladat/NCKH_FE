import ContentDashboard from '~/components/contentDashboard/ContentDashboard'
import LayoutDefault from '~/components/layout/client/LayoutDefault'
import NeedHelpPoints from '~/components/needHelpPoint/NeedHelpPoints'
import Error404 from '~/pages/error/Error404'

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
      }
    ]
  },
  {
    path:'*',
    element:<Error404/>
  }
]