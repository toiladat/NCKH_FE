import RescueHubPoint from '~/components/rescueHubPoint/RescueHubPoint'
import Login from '../../navBar/login/Login'
import NavBar from '../../navBar/NavBar'
import NeedHelpPoint from '../../needHelpPoint/NeedHelpPoint'
import { Outlet } from 'react-router-dom'
// import TabNeedHelpPoint from '../../needHelpPoint/TabNeedHelpPoint'

const LayoutDefault = () => {
  return (
    <>
      <NavBar/>
      <Login/>
      <Outlet/>
      <NeedHelpPoint/>
      <RescueHubPoint/>
    </>
  )
}

export default LayoutDefault