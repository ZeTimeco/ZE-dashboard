import API from "../../../../config/api"

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