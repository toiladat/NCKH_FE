import Login from '../../navBar/login/Login'
import NavBar from '../../navBar/NavBar'
import NeedHelpPoint from '../../needHelpPoint/NeedHelpPoint'
import { Outlet } from 'react-router-dom'

const LayoutDefault = () => {
  return (
    <>
      <NavBar/>
      <Login/>
      <Outlet/>
      <NeedHelpPoint/>
    </>
  )
}

export default LayoutDefault