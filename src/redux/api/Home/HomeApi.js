import API from "../../../../config/api"

//Home-Car-Street_module
//************************************************* */
export const setModuleId = async(module_id)=>{
  const response = await API.post('/provider/assign_module' , {module_id} )
  return response.data
} 

export const getProviderState = async()=>{
  const response = await API.get('/provider/stats')
  return response.data
}

export const getProviderRate = async()=>{
  const response = await API.get('/provider/ratings')
  return response.data
}

export const getBookingNew = async()=>{
  const response = await API.get('/provider/bookings/new')
  return response.data
}

export const getBookingOngoing = async()=>{
  const response = await API.get('/provider/bookings/ongoing')
  return response.data
}

//property_module
//************************************************* */

export const getPropertiesAnalysis = async()=>{
  const response = await API.get('/properties/analysis')
  return response.data
}

export const getPropertiesTop = async()=>{
  const response = await API.get('/properties/top')
  return response.data
}

export const gettopThreeBookings = async()=>{
  const response = await API.get('/provider/topThreeBookings')
  return response.data
}

export const getconversationsLatestUnseen = async()=>{
  const response = await API.get('/provider/conversations/latest-unseen')
  return response.data
}