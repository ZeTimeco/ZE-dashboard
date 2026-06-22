import API from "../../../../config/api"

export const getwaitlistAnalysis = async()=>{
  const response = await API.get('/provider/waitlist/analysis')
  return response.data
}

export const getWaitingList = async(params = {})=>{
  const response = await API.get('/provider/waitlist/get', { params })
  return response.data
}

export const addWaitlist = async(formData)=>{
  const response = await API.post('/provider/waitlist/add',formData)
  return response.data
}