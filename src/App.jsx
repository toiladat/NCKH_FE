import NavBar from './components/navBar/NavBar'
import Notification from './components/notification/Notification'
import NeedHelpPoint from './components/needHelpPoint/NeedHelpPoint'
import BottomNav from './components/bottomNav/BottomNav'
import Loading from './components/loading/Loading'
import Login from './components/navBar/login/Login'
import ContextProvider from './context/ContextProvider'
import { Route, Routes } from 'react-router-dom'
import DashBoard from './pages/client/dashboard/DashBoard'

function App() {
  return (
    <>
      <Routes>
        <Route path='/dashboard' element={<DashBoard/>}/>
      </Routes>

      <ContextProvider>
        <Loading/>
        <Notification/>
        <NavBar/>
        <Login/>
        <BottomNav/>
        <NeedHelpPoint/>
      </ContextProvider>
    </>
  )
}

export default App
