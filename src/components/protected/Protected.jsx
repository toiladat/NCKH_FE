import { useValue } from '~/context/ContextProvider'
import AccessMessage from './AccessMessage'

const Protected = ({ children }) => {
  const { currentUser } = useValue()
  return (
    currentUser ? children : <AccessMessage/>
  )
}

export default Protected