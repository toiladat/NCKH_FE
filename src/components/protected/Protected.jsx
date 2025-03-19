import { useSelector } from 'react-redux'

import AccessMessage from './AccessMessage'

const Protected = ({ children }) => {
  const { currentUser } = useSelector(state => state.userReducer)

  return (
    currentUser ? children : <AccessMessage/>
  )
}

export default Protected