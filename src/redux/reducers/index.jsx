import { combineReducers } from 'redux'
import userReducer from './user'
import utilReducer from './util'
import needHelpPointReducer from './needHelpPoint'
import rescueHubPointReducer from './rescueHubPoint'

const allReducers = combineReducers({
  userReducer,
  utilReducer,
  needHelpPointReducer,
  rescueHubPointReducer
})
export default allReducers