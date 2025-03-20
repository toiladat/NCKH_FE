const initialState = {
  openLogin:false,
  loading:false,
  alert: {
    open:false,
    severity:'infor',
    message:''
  }
}

const utilReducer = (state = initialState, action) => {
  switch (action.type) {

  case 'OPEN_LOGIN':
    return {
      ...state,
      openLogin: true
    }
  case 'CLOSE_LOGIN':
    return {
      ...state,
      openLogin:false
    }
  case 'UPDATE_ALERT':
    return {
      ...state,
      alert: action.payload
    }
  case 'START_LOADING':
    return {
      ...state,
      loading:true
    }
  case 'END_LOADING':
    return {
      ...state,
      loading:false
    }
  default:
    return state

  }
}
export default utilReducer