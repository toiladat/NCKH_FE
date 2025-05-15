import ProtectedAdmin from '~/components/protected/ProtectedAdmin'
import DashBoard from '~/pages/admin/dashboard/DashBoard'
import Main from '~/pages/admin/dashboard/main/Main'
import AddUser from '~/pages/admin/dashboard/addUser/AddUser'
import NeedHelpPoints from '~/pages/admin/dashboard/needHelpPoints/NeedHelpPoints'
import RescueHubPoints from '~/pages/admin/dashboard/rescueHubPoints/RescueHubPoints'
import Users from '~/pages/admin/dashboard/users/Users'
import Login from '~/pages/admin/login/Login'
import Error404 from '~/pages/error/Error404'
import Regions from '~/pages/admin/dashboard/regions/Regions'

export const AdminRoute = [
  {
    path: '/admin',
    element: <ProtectedAdmin />, // Kiểm tra đăng nhập
    children: [
      {
        path: 'dashboard',
        element: <DashBoard />, // Layout Dashboard
        children: [
          { path: '', element: <Main /> },
          { path: 'users', element: <Users /> },
          { path: 'need-help-points', element: <NeedHelpPoints /> },
          { path: 'rescue-hub-points', element: <RescueHubPoints /> },
          { path: 'regions', element: <Regions /> },
          { path: 'create-user', element: <AddUser /> }
        ]
      }
    ]
  },
  {
    path: '/admin/login',
    element: <Login />
  },
  {
    path: '*',
    element: <Error404 />
  }
]
