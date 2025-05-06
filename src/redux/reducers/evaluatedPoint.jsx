
const initialState = {
  location:{
    lng:105.8542, lat:21.0285, address:''
  },
  criteria :{
    fatalities: 0, // tử vong / mất tích
    injuries:0, // bị thương cần cấp cứu
    housingDamage: 0, // nhà bị hư hỏng nặng
    essentialNeeds: 0, // thiếu lương thực/nước/thuốc
    vulnerableGroups: 0, // người dễ tổn thương( trẻ em - người già)
    accessibility: 0 // mức độ cô lập
  }
}

const evaluatedPointReducer = (state = initialState, action ) => {
  switch (action.type) {
  case 'UPDATE_EVALUATE_POINT':
    return {
      ...state,
      location: action.payload
    }
  default:
    return state
  }
}
export default evaluatedPointReducer