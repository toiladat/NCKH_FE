const reducer = (state, action) => {
  switch (action.type) {
  case 'UPDATE_USER':
    return {
      ...state,
      currentUser: action.payload // Cập nhật currentUser bằng payload
    }
  default:
    throw new Error('no matched action')
  }
}
export default reducer