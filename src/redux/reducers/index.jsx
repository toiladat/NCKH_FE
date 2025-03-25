import { combineReducers } from 'redux'
import userReducer from './user'
import utilReducer from './util'
import needHelpPointReducer from './needHelpPoint'
import rescueHubPointReducer from './rescueHubPoint'
import adminReducer from './admin'

const allReducers = combineReducers({
  userReducer,
  utilReducer,
  needHelpPointReducer,
  rescueHubPointReducer,
  adminReducer
})
export default allReducers