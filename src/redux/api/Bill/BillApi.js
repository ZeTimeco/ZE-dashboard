import API from "../../../../config/api"

export const getEarnings = async()=>{
  const response = await API.get(`/provider/parcel/company/earnings`)
  return response.data
}


export const withdrawParcel = async(formData)=>{
  const response = await API.post(`/company/parcel/withdraw` ,formData)
  return response.data
}


