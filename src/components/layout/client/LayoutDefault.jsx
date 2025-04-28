// import BottomNav from '../../bottomNav/BottomNav'
import ContentDashboard from '~/components/contentDashboard/ContentDashboard'
import Login from '../../navBar/login/Login'
import NavBar from '../../navBar/NavBar'
import NeedHelpPoint from '../../needHelpPoint/NeedHelpPoint'
import NeedHelpPoints from '~/components/needHelpPoint/NeedHelpPoints'
import { Outlet } from 'react-router-dom'

const LayoutDefault = () => {
  return (
    <>
      <NavBar/>
      <Login/>
      {/* <ContentDashboard/>, */}
      {/* <NeedHelpPoints/>, */}
      {/* <BottomNav/> */}
      <Outlet/>
      <NeedHelpPoint/>
    </>
  )
}

export default LayoutDefault