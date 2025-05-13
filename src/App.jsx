import Notification from './components/notification/Notification'
import Loading from './components/loading/Loading'
import ContextProvider from './context/ContextProvider'
import AllRoute from './components/routes/AllRoute'
import HelpPointsTabs from './components/needHelpPoint/TabNeedHelpPoint'

function App() {
  return (
    <>
      <ContextProvider>
        <AllRoute/>
        <Loading/>
        <Notification/>
      </ContextProvider>

    </>
  )
}

export default App
