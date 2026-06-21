import API from "../../../../config/api"

export const getwaitlistAnalysis = async()=>{
  const response = await API.get('/provider/waitlist/analysis')
  return response.data
}