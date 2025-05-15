import ContentDashboard from '~/components/contentDashboard/ContentDashboard'
import LayoutDefault from '~/components/layout/client/LayoutDefault'
// import NeedHelpPoints from '~/components/needHelpPoint/NeedHelpPoints'
import Maps from '~/components/maps/Maps'


import Error404 from '~/pages/error/Error404'
import AddRescueHub from '~/components/addRescueHub/AddRescueHub'
import AddNeedHelp from '~/components/addNeedHelp/AddNeedHelp'
import EvaluateLevel from '~/components/evaluateLevel/EvaluateLevel'
// import RescueHubPoints from '~/components/rescueHubPoint/RescueHubPoints'
import TabNeedHelpPoint from '../../needHelpPoint/TabNeedHelpPoint'
import TabRescueHubPoint from '../../rescueHubPoint/TabRescueHubPoint'
import Mission from '~/components/mission/Mission'


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
        element: <TabNeedHelpPoint/>
      },
      {
        path: 'maps',
        element: <Maps/>
      },
      {
        path: 'addrescuehub',
        element: <AddRescueHub/>
      },
      {
        path: 'addneedhelp',
        element: <AddNeedHelp />
      },
      {
        path: 'evaluate-level',
        element: <EvaluateLevel/>
      },
      {
        path: 'relief-program',
        element: <TabRescueHubPoint/>
      },
      {
        path: '/mission',
        element: <Mission/>
      }
    ]
  },
  {
    path:'*',
    element:<Error404/>
  }
]