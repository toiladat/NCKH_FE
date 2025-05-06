import RescueHubPoint from '~/components/rescueHubPoint/RescueHubPoint'
import BottomNav from '../../bottomNav/BottomNav'
import Login from '../../navBar/login/Login'
import NavBar from '../../navBar/NavBar'
import NeedHelpPoint from '../../needHelpPoint/NeedHelpPoint'

const LayoutDefault = () => {
  return (
    <>
      <NavBar/>
      <Login/>
      <BottomNav/>
      <NeedHelpPoint/>
      <RescueHubPoint/>
    </>
  )
}

export default LayoutDefault