import { combineReducers } from 'redux'
import userReducer from './user'
import utilReducer from './util'
import needHelpPointReducer from './needHelpPoint'
import rescueHubPointReducer from './rescueHubPoint'
import adminReducer from './admin'
import evaluatedPointReducer from './evaluatedPoint'

const allReducers = combineReducers({
  userReducer,
  utilReducer,
  needHelpPointReducer,
  rescueHubPointReducer,
  adminReducer,
  evaluatedPointReducer
})
export default allReducers