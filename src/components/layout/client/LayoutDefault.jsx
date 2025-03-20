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
    </>
  )
}

export default LayoutDefault